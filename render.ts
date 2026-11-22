// News22 v3 — renderer: supersampled canvas + PNG encoder (Node stdlib only).
// Written fresh for this entry. All coordinates are in FINAL 1024-space; the
// canvas renders at 2x and downsamples, so edges and text stay smooth.
import { deflateSync } from 'node:zlib';

export const W = 1024;
export const H = 1024;
export const SS = 2; // supersample factor

export type RGB = [number, number, number];

export const PAPER: RGB = [247, 241, 227];
export const PAPER2: RGB = [242, 235, 216];
export const INK: RGB = [26, 26, 26];
export const INK2: RGB = [68, 68, 68];
export const RED: RGB = [168, 28, 28];
export const RED2: RGB = [139, 21, 21];
export const NAVY: RGB = [31, 58, 95];
export const NAVY2: RGB = [22, 42, 71];
export const GOLD: RGB = [201, 162, 39];
export const TEAL: RGB = [46, 125, 122];
export const CREAM_LINE: RGB = [210, 198, 170];

export function rgb(hex: string): RGB {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export class Canvas {
  readonly w = W * SS;
  readonly h = H * SS;
  readonly buf: Uint8ClampedArray;
  constructor() {
    this.buf = new Uint8ClampedArray(this.w * this.h * 3);
  }
  fill(c: RGB) {
    const [r, g, b] = c;
    for (let i = 0; i < this.buf.length; i += 3) {
      this.buf[i] = r; this.buf[i + 1] = g; this.buf[i + 2] = b;
    }
  }
  set(px: number, py: number, c: RGB) {
    if (px < 0 || py < 0 || px >= this.w || py >= this.h) return;
    const i = (py * this.w + px) * 3;
    this.buf[i] = c[0]; this.buf[i + 1] = c[1]; this.buf[i + 2] = c[2];
  }
  // x,y,w,h in final-space coordinates (scaled by SS internally)
  rect(x: number, y: number, w: number, h: number, c: RGB) {
    const x0 = Math.max(0, Math.round(x * SS));
    const y0 = Math.max(0, Math.round(y * SS));
    const x1 = Math.min(this.w, Math.round((x + w) * SS));
    const y1 = Math.min(this.h, Math.round((y + h) * SS));
    for (let py = y0; py < y1; py++) {
      let i = (py * this.w + x0) * 3;
      for (let px = x0; px < x1; px++, i += 3) {
        this.buf[i] = c[0]; this.buf[i + 1] = c[1]; this.buf[i + 2] = c[2];
      }
    }
  }
  // vertical gradient, final-space coords
  gradV(x: number, y: number, w: number, h: number, c1: RGB, c2: RGB) {
    const x0 = Math.max(0, Math.round(x * SS));
    const y0 = Math.max(0, Math.round(y * SS));
    const x1 = Math.min(this.w, Math.round((x + w) * SS));
    const y1 = Math.min(this.h, Math.round((y + h) * SS));
    const span = Math.max(1, y1 - y0);
    for (let py = y0; py < y1; py++) {
      const t = (py - y0) / span;
      const r = Math.round(c1[0] + (c2[0] - c1[0]) * t);
      const g = Math.round(c1[1] + (c2[1] - c1[1]) * t);
      const b = Math.round(c1[2] + (c2[2] - c1[2]) * t);
      let i = (py * this.w + x0) * 3;
      for (let px = x0; px < x1; px++, i += 3) {
        this.buf[i] = r; this.buf[i + 1] = g; this.buf[i + 2] = b;
      }
    }
  }
  circle(cx: number, cy: number, r: number, c: RGB) {
    const R = r * SS;
    const x0 = Math.max(0, Math.floor((cx - r) * SS));
    const x1 = Math.min(this.w - 1, Math.ceil((cx + r) * SS));
    const y0 = Math.max(0, Math.floor((cy - r) * SS));
    const y1 = Math.min(this.h - 1, Math.ceil((cy + r) * SS));
    const ccx = cx * SS, ccy = cy * SS;
    for (let py = y0; py <= y1; py++) {
      for (let px = x0; px <= x1; px++) {
        const dx = px + 0.5 - ccx, dy = py + 0.5 - ccy;
        if (dx * dx + dy * dy <= R * R) {
          const i = (py * this.w + px) * 3;
          this.buf[i] = c[0]; this.buf[i + 1] = c[1]; this.buf[i + 2] = c[2];
        }
      }
    }
  }
  // thick line, final-space coords, width in final px
  line(x1: number, y1: number, x2: number, y2: number, wd: number, c: RGB) {
    const w = Math.max(0.6, wd * SS);
    const ax = x1 * SS, ay = y1 * SS, bx = x2 * SS, by = y2 * SS;
    const dx = bx - ax, dy = by - ay;
    const len = Math.hypot(dx, dy);
    if (len < 0.01) { this.circle(x1, y1, wd / 2, c); return; }
    const nx = -dy / len, ny = dx / len;
    const hw = w / 2;
    const pts: [number, number][] = [
      [ax + nx * hw, ay + ny * hw],
      [bx + nx * hw, by + ny * hw],
      [bx - nx * hw, by - ny * hw],
      [ax - nx * hw, ay - ny * hw],
    ];
    this.fillPolyPx(pts, c);
    this.circle(x1, y1, wd / 2, c);
    this.circle(x2, y2, wd / 2, c);
  }
  // polygon fill; points in final-space coords
  poly(pts: [number, number][], c: RGB) {
    this.fillPolyPx(pts.map(([x, y]) => [x * SS, y * SS] as [number, number]), c);
  }
  fillPolyPx(pts: [number, number][], c: RGB) {
    if (pts.length < 3) return;
    let minY = Infinity, maxY = -Infinity;
    for (const [, y] of pts) { minY = Math.min(minY, y); maxY = Math.max(maxY, y); }
    const y0 = Math.max(0, Math.floor(minY));
    const y1 = Math.min(this.h - 1, Math.ceil(maxY));
    for (let py = y0; py <= y1; py++) {
      const y = py + 0.5;
      const xs: number[] = [];
      for (let i = 0; i < pts.length; i++) {
        const [x1, y1p] = pts[i];
        const [x2, y2p] = pts[(i + 1) % pts.length];
        if ((y1p <= y && y2p > y) || (y2p <= y && y1p > y)) {
          xs.push(x1 + ((y - y1p) / (y2p - y1p)) * (x2 - x1));
        }
      }
      xs.sort((a, b) => a - b);
      for (let k = 0; k + 1 < xs.length; k += 2) {
        const xa = Math.max(0, Math.ceil(xs[k]));
        const xb = Math.min(this.w - 1, Math.floor(xs[k + 1]));
        let idx = (py * this.w + xa) * 3;
        for (let px = xa; px <= xb; px++, idx += 3) {
          this.buf[idx] = c[0]; this.buf[idx + 1] = c[1]; this.buf[idx + 2] = c[2];
        }
      }
    }
  }
  // polyline with round joins, width in final px
  stroke(pts: [number, number][], wd: number, c: RGB) {
    for (let i = 0; i + 1 < pts.length; i++) {
      this.line(pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], wd, c);
    }
  }
  // downsample 2x -> 1024x1024 RGB
  downsample(): Uint8Array {
    const out = new Uint8Array(W * H * 3);
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        let r = 0, g = 0, b = 0;
        for (let dy = 0; dy < SS; dy++) {
          for (let dx = 0; dx < SS; dx++) {
            const i = ((y * SS + dy) * this.w + (x * SS + dx)) * 3;
            r += this.buf[i]; g += this.buf[i + 1]; b += this.buf[i + 2];
          }
        }
        const o = (y * W + x) * 3, n = SS * SS;
        out[o] = Math.round(r / n); out[o + 1] = Math.round(g / n); out[o + 2] = Math.round(b / n);
      }
    }
    return out;
  }
}

// ---- PNG encoder (RGB, 8-bit, per-row filter selection) ----
const CRC_TABLE = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();
function crc32(buf: Uint8Array): number {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 255] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function chunk(type: string, data: Uint8Array): Uint8Array {
  const out = new Uint8Array(12 + data.length);
  const dv = new DataView(out.buffer);
  dv.setUint32(0, data.length);
  for (let i = 0; i < 4; i++) out[4 + i] = type.charCodeAt(i);
  out.set(data, 8);
  dv.setUint32(8 + data.length, crc32(out.subarray(4, 8 + data.length)));
  return out;
}
function paeth(a: number, b: number, c: number): number {
  const p = a + b - c;
  const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
  return pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
}
export function encodePNG(rgb: Uint8Array, w: number, h: number): Uint8Array {
  const stride = w * 3;
  const raw = new Uint8Array(h * (stride + 1));
  const prev = new Uint8Array(stride);
  for (let y = 0; y < h; y++) {
    const row = rgb.subarray(y * stride, (y + 1) * stride);
    let bestF = 0, bestScore = Infinity;
    let best = new Uint8Array(stride);
    for (let f = 0; f < 5; f++) {
      const out = new Uint8Array(stride);
      let score = 0;
      for (let i = 0; i < stride; i++) {
        const a = i >= 3 ? row[i - 3] : 0;
        const b = prev[i];
        const cc = i >= 3 ? prev[i - 3] : 0;
        let v: number;
        if (f === 0) v = row[i];
        else if (f === 1) v = row[i] - a;
        else if (f === 2) v = row[i] - b;
        else if (f === 3) v = row[i] - ((a + b) >> 1);
        else v = row[i] - paeth(a, b, cc);
        out[i] = v & 255;
        const s = v & 255;
        score += s < 128 ? s : 256 - s;
      }
      if (score < bestScore) { bestScore = score; bestF = f; best = out; }
    }
    raw[y * (stride + 1)] = bestF;
    raw.set(best, y * (stride + 1) + 1);
    prev.set(row);
  }
  const ihdr = new Uint8Array(13);
  const dv = new DataView(ihdr.buffer);
  dv.setUint32(0, w); dv.setUint32(4, h);
  ihdr[8] = 8; ihdr[9] = 2; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  const idat = deflateSync(raw, { level: 9 });
  const sig = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]);
  const parts = [sig, chunk('IHDR', ihdr), chunk('IDAT', idat), chunk('IEND', new Uint8Array(0))];
  const total = parts.reduce((s, p) => s + p.length, 0);
  const png = new Uint8Array(total);
  let off = 0;
  for (const p of parts) { png.set(p, off); off += p.length; }
  return png;
}
