// Client-side image quality checks for page summaries.
// Heuristics tuned for dense infographic-style images that contain small text.

export interface QCIssue {
  code: string;
  severity: "warn" | "fail";
  message: string;
}

export interface QCResult {
  ok: boolean; // true if no fail-level issues
  width: number;
  height: number;
  bytes: number;
  sharpnessScore: number; // 0..1 (variance of laplacian, normalized)
  contrastScore: number; // 0..1
  issues: QCIssue[];
}

const MIN_WIDTH = 1800; // dense text needs high resolution
const RECOMMENDED_WIDTH = 2400;
const MIN_BYTES = 450 * 1024; // <450KB likely heavily compressed for dense text
const MIN_SHARPNESS = 0.08;
const MIN_CONTRAST = 0.2;
const MIN_PIXELS_PER_DETAIL = 2_600_000;

async function loadImage(src: string | Blob): Promise<HTMLImageElement> {
  const url = typeof src === "string" ? src : URL.createObjectURL(src);
  try {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.decoding = "async";
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = url;
    });
    return img;
  } finally {
    // Revoke later, after analysis (caller doesn't need it)
  }
}

function analyzePixels(img: HTMLImageElement): {
  sharpness: number;
  contrast: number;
} {
  // Downscale to a manageable size for analysis
  const maxDim = 600;
  const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
  const w = Math.max(1, Math.round(img.width * scale));
  const h = Math.max(1, Math.round(img.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return { sharpness: 1, contrast: 1 };
  ctx.drawImage(img, 0, 0, w, h);
  let data: Uint8ClampedArray;
  try {
    data = ctx.getImageData(0, 0, w, h).data;
  } catch {
    // CORS-tainted canvas; cannot read pixels
    return { sharpness: 1, contrast: 1 };
  }

  // Convert to grayscale + compute mean/std for contrast
  const gray = new Float32Array(w * h);
  let sum = 0;
  for (let i = 0, p = 0; i < data.length; i += 4, p++) {
    const g = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    gray[p] = g;
    sum += g;
  }
  const mean = sum / gray.length;
  let variance = 0;
  for (let i = 0; i < gray.length; i++) {
    const d = gray[i] - mean;
    variance += d * d;
  }
  variance /= gray.length;
  const stdDev = Math.sqrt(variance);
  const contrast = Math.min(1, stdDev / 80); // 80 std ≈ great contrast

  // Laplacian variance for sharpness
  let lapSum = 0;
  let lapSqSum = 0;
  let count = 0;
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const i = y * w + x;
      const v =
        -4 * gray[i] +
        gray[i - 1] +
        gray[i + 1] +
        gray[i - w] +
        gray[i + w];
      lapSum += v;
      lapSqSum += v * v;
      count++;
    }
  }
  const lapMean = lapSum / count;
  const lapVar = lapSqSum / count - lapMean * lapMean;
  // Normalize: typical sharp infographic ~ 400+, blurry < 50
  const sharpness = Math.min(1, lapVar / 400);

  return { sharpness, contrast };
}

export async function runImageQC(input: string | Blob, knownBytes?: number): Promise<QCResult> {
  const issues: QCIssue[] = [];
  let bytes = knownBytes ?? 0;

  if (typeof input === "string" && !knownBytes) {
    try {
      const head = await fetch(input, { method: "HEAD" });
      const len = head.headers.get("content-length");
      if (len) bytes = Number(len);
    } catch {
      // ignore
    }
  } else if (input instanceof Blob) {
    bytes = input.size;
  }

  const img = await loadImage(input);
  const { width, height } = img;

  if (width < MIN_WIDTH) {
    issues.push({
      code: "low_resolution",
      severity: "fail",
      message: `Resolution ${width}×${height} is too low for legible text (need ≥ ${MIN_WIDTH}px wide).`,
    });
  } else if (width < RECOMMENDED_WIDTH) {
    issues.push({
      code: "below_recommended",
      severity: "warn",
      message: `Resolution ${width}×${height} is below recommended ${RECOMMENDED_WIDTH}px width.`,
    });
  }

  if (width * height < MIN_PIXELS_PER_DETAIL) {
    issues.push({
      code: "low_detail_budget",
      severity: "fail",
      message: `Image has too few total pixels for dense small text; upload/export a larger original.`,
    });
  }

  if (bytes && bytes < MIN_BYTES) {
    issues.push({
      code: "small_file",
      severity: "warn",
      message: `File is only ${(bytes / 1024).toFixed(0)}KB — likely over-compressed; text may be unclear.`,
    });
  }

  const { sharpness, contrast } = analyzePixels(img);

  if (sharpness < MIN_SHARPNESS) {
    issues.push({
      code: "blurry",
      severity: "fail",
      message: `Image looks blurry or soft (sharpness ${(sharpness * 100).toFixed(0)}%).`,
    });
  } else if (sharpness < MIN_SHARPNESS * 2) {
    issues.push({
      code: "soft",
      severity: "warn",
      message: `Image is slightly soft (sharpness ${(sharpness * 100).toFixed(0)}%); small text may be hard to read.`,
    });
  }

  if (contrast < MIN_CONTRAST) {
    issues.push({
      code: "low_contrast",
      severity: "warn",
      message: `Low contrast (${(contrast * 100).toFixed(0)}%); text may be hard to read.`,
    });
  }

  const ok = !issues.some((i) => i.severity === "fail");
  return { ok, width, height, bytes, sharpnessScore: sharpness, contrastScore: contrast, issues };
}
