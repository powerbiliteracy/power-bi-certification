// Deterministic image enhancement: upscale + unsharp mask + contrast/levels.
// Runs in browser via Canvas. Does NOT regenerate text (unlike a generative model).

export interface EnhanceOptions {
  scale?: number; // upscale factor, e.g. 2
  minWidth?: number; // ensure final width >= this
  sharpenAmount?: number; // 0..2 typical
  sharpenRadius?: number; // pixels (1 typical)
  contrast?: number; // 0..1, e.g. 0.15 = +15%
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

export async function enhanceImageLocally(
  source: string | Blob,
  opts: EnhanceOptions = {}
): Promise<Blob> {
  const {
    scale = 2,
    minWidth = 1800,
    sharpenAmount = 0.9,
    sharpenRadius = 1,
    contrast = 0.18,
  } = opts;

  const img = await loadImage(source);
  let targetW = Math.max(img.width * scale, minWidth);
  // Cap to avoid huge memory
  if (targetW > 3200) targetW = 3200;
  const ratio = targetW / img.width;
  const targetH = Math.round(img.height * ratio);

  // High-quality upscale
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(targetW);
  canvas.height = targetH;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Canvas context unavailable");
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  let imgData: ImageData;
  try {
    imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  } catch {
    throw new Error("Image is CORS-protected; cannot enhance.");
  }

  imgData = unsharpMask(imgData, sharpenRadius, sharpenAmount);
  imgData = applyContrast(imgData, contrast);
  ctx.putImageData(imgData, 0, 0);

  const blob: Blob = await new Promise((resolve, reject) =>
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("toBlob failed"))),
      "image/png"
    )
  );
  return blob;
}
