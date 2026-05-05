// Deterministic image enhancement: upscale + unsharp mask + contrast/levels.
// Runs in browser via Canvas. Does NOT regenerate text (unlike a generative model).

export interface EnhanceOptions {
  scale?: number; // upscale factor, e.g. 2
  minWidth?: number; // ensure final width >= this
  maxWidth?: number; // cap final width to avoid excessive memory
  sharpenAmount?: number; // 0..2 typical
  sharpenRadius?: number; // pixels (1 typical)
  contrast?: number; // 0..1, e.g. 0.15 = +15%
  textCrispness?: number; // 0..1 darkens text edges and cleans light backgrounds
  autoCrop?: boolean; // remove blank outer margins before upscaling
}

async function loadImage(src: string | Blob): Promise<HTMLImageElement> {
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.decoding = "async";
  const url = typeof src === "string" ? src : URL.createObjectURL(src);
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = url;
  });
  return img;
}

function unsharpMask(
  src: ImageData,
  radius: number,
  amount: number
): ImageData {
  const { width: w, height: h, data } = src;
  // Simple separable box blur as approximation of gaussian
  const blurred = new Uint8ClampedArray(data);
  const tmp = new Uint8ClampedArray(data.length);
  const r = Math.max(1, Math.round(radius));

  // Horizontal pass
  for (let y = 0; y < h; y++) {
    for (let c = 0; c < 3; c++) {
      let sum = 0;
      for (let x = -r; x <= r; x++) {
        const xx = Math.min(w - 1, Math.max(0, x));
        sum += blurred[(y * w + xx) * 4 + c];
      }
      const denom = r * 2 + 1;
      for (let x = 0; x < w; x++) {
        tmp[(y * w + x) * 4 + c] = sum / denom;
        const xOut = x - r;
        const xIn = x + r + 1;
        const xOutI = Math.min(w - 1, Math.max(0, xOut));
        const xInI = Math.min(w - 1, Math.max(0, xIn));
        sum += blurred[(y * w + xInI) * 4 + c] - blurred[(y * w + xOutI) * 4 + c];
      }
    }
  }
  // Vertical pass
  for (let x = 0; x < w; x++) {
    for (let c = 0; c < 3; c++) {
      let sum = 0;
      for (let y = -r; y <= r; y++) {
        const yy = Math.min(h - 1, Math.max(0, y));
        sum += tmp[(yy * w + x) * 4 + c];
      }
      const denom = r * 2 + 1;
      for (let y = 0; y < h; y++) {
        blurred[(y * w + x) * 4 + c] = sum / denom;
        const yOut = y - r;
        const yIn = y + r + 1;
        const yOutI = Math.min(h - 1, Math.max(0, yOut));
        const yInI = Math.min(h - 1, Math.max(0, yIn));
        sum += tmp[(yInI * w + x) * 4 + c] - tmp[(yOutI * w + x) * 4 + c];
      }
    }
  }

  // Sharpen: out = orig + amount * (orig - blurred)
  const out = new Uint8ClampedArray(data.length);
  for (let i = 0; i < data.length; i += 4) {
    for (let c = 0; c < 3; c++) {
      const o = data[i + c];
      const b = blurred[i + c];
      const v = o + amount * (o - b);
      out[i + c] = v < 0 ? 0 : v > 255 ? 255 : v;
    }
    out[i + 3] = data[i + 3];
  }
  return new ImageData(out, w, h);
}

function applyContrast(img: ImageData, contrast: number): ImageData {
  // contrast in -1..1
  const f = (259 * (contrast * 255 + 255)) / (255 * (259 - contrast * 255));
  const d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    d[i] = clamp(f * (d[i] - 128) + 128);
    d[i + 1] = clamp(f * (d[i + 1] - 128) + 128);
    d[i + 2] = clamp(f * (d[i + 2] - 128) + 128);
  }
  return img;
}

function clamp(v: number) {
  return v < 0 ? 0 : v > 255 ? 255 : v;
}

function isBlankMarginPixel(r: number, g: number, b: number) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;
  return lum > 238 && max - min < 24;
}

function findContentCrop(img: HTMLImageElement) {
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;
  ctx.drawImage(img, 0, 0);

  let data: Uint8ClampedArray;
  try {
    data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  } catch {
    return null;
  }

  const step = Math.max(1, Math.floor(Math.max(canvas.width, canvas.height) / 1400));
  let minX = canvas.width;
  let minY = canvas.height;
  let maxX = 0;
  let maxY = 0;

  for (let y = 0; y < canvas.height; y += step) {
    for (let x = 0; x < canvas.width; x += step) {
      const i = (y * canvas.width + x) * 4;
      if (!isBlankMarginPixel(data[i], data[i + 1], data[i + 2])) {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
  }

  if (minX >= maxX || minY >= maxY) return null;

  const pad = Math.round(Math.max(canvas.width, canvas.height) * 0.008);
  const x = Math.max(0, minX - pad);
  const y = Math.max(0, minY - pad);
  const width = Math.min(canvas.width - x, maxX - minX + pad * 2);
  const height = Math.min(canvas.height - y, maxY - minY + pad * 2);

  const removedX = 1 - width / canvas.width;
  const removedY = 1 - height / canvas.height;
  if (removedX < 0.025 && removedY < 0.025) return null;

  return { x, y, width, height };
}

function applyTextCrispness(img: ImageData, strength: number): ImageData {
  const d = img.data;
  const s = Math.max(0, Math.min(1, strength));
  for (let i = 0; i < d.length; i += 4) {
    const r = d[i];
    const g = d[i + 1];
    const b = d[i + 2];
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    const saturation = Math.max(r, g, b) - Math.min(r, g, b);

    if (lum < 96) {
      const factor = 1 - 0.28 * s;
      d[i] = clamp(r * factor);
      d[i + 1] = clamp(g * factor);
      d[i + 2] = clamp(b * factor);
    } else if (lum < 170 && saturation > 18) {
      const factor = 1 - 0.14 * s;
      d[i] = clamp(r * factor);
      d[i + 1] = clamp(g * factor);
      d[i + 2] = clamp(b * factor);
    } else if (lum > 224 && saturation < 30) {
      d[i] = clamp(r + (255 - r) * 0.42 * s);
      d[i + 1] = clamp(g + (255 - g) * 0.42 * s);
      d[i + 2] = clamp(b + (255 - b) * 0.42 * s);
    }
  }
  return img;
}

export async function enhanceImageLocally(
  source: string | Blob,
  opts: EnhanceOptions = {}
): Promise<Blob> {
  const {
    scale = 3,
    minWidth = 2600,
    maxWidth = 4200,
    sharpenAmount = 1.35,
    sharpenRadius = 1,
    contrast = 0.26,
    textCrispness = 0.85,
    autoCrop = true,
  } = opts;

  const img = await loadImage(source);
  const crop = autoCrop ? findContentCrop(img) : null;
  const sourceW = crop?.width ?? img.width;
  const sourceH = crop?.height ?? img.height;
  let targetW = Math.max(sourceW * scale, minWidth);
  targetW = Math.min(targetW, maxWidth);
  const ratio = targetW / sourceW;
  const targetH = Math.round(sourceH * ratio);

  // High-quality upscale
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(targetW);
  canvas.height = targetH;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Canvas context unavailable");
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(
    img,
    crop?.x ?? 0,
    crop?.y ?? 0,
    sourceW,
    sourceH,
    0,
    0,
    canvas.width,
    canvas.height
  );

  let imgData: ImageData;
  try {
    imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  } catch {
    throw new Error("Image is CORS-protected; cannot enhance.");
  }

  imgData = unsharpMask(imgData, sharpenRadius, sharpenAmount);
  imgData = applyContrast(imgData, contrast);
  imgData = applyTextCrispness(imgData, textCrispness);
  ctx.putImageData(imgData, 0, 0);

  const blob: Blob = await new Promise((resolve, reject) =>
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("toBlob failed"))),
      "image/png"
    )
  );
  return blob;
}
