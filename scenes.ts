// News22 v3 — flat vector illustrations + navy dot world map, drawn fresh in code.
// All helpers take final-space rects. No external images, no copied art.
import type { Canvas, RGB } from './render.ts';
import { rgb } from './render.ts';

const SKY1: RGB = rgb('#D8E6F0');
const SKY2: RGB = rgb('#F2E7CE');
const DUSK1: RGB = rgb('#4A3358');
const DUSK2: RGB = rgb('#C65D3B');
const DUSK3: RGB = rgb('#E8A04C');
const SEA: RGB = rgb('#1E3A5C');
const SEA2: RGB = rgb('#2C5378');
const FLAME: RGB = rgb('#E86A1C');
const FLAME2: RGB = rgb('#F2B705');
const SMOKE: RGB = rgb('#8A8F98');
const SMOKE2: RGB = rgb('#6E747E');

// ---- HERO 1: COP31 summit table + globe + clock ----
export function heroCOP31(cv: Canvas, x: number, y: number, w: number, h: number): void {
  cv.gradV(x, y, w, h, SKY1, SKY2);
  // wall panel + floor
  cv.rect(x, y + h * 0.72, w, h * 0.28, rgb('#C9B48A'));
  cv.rect(x, y + h * 0.72, w, 3, rgb('#8A744F'));
  // globe (left)
  const gx = x + w * 0.17, gy = y + h * 0.42, gr = h * 0.26;
  cv.circle(gx, gy, gr, rgb('#2E6EA6'));
  cv.poly([[gx - gr * 0.5, gy - gr * 0.4], [gx - gr * 0.1, gy - gr * 0.55], [gx + gr * 0.3, gy - gr * 0.3], [gx + gr * 0.1, gy], [gx - gr * 0.3, gy - gr * 0.1]], rgb('#5A9E4B'));
  cv.poly([[gx - gr * 0.4, gy + gr * 0.35], [gx - gr * 0.1, gy + gr * 0.15], [gx + gr * 0.45, gy + gr * 0.3], [gx + gr * 0.5, gy + gr * 0.6], [gx, gy + gr * 0.65], [gx - gr * 0.5, gy + gr * 0.55]], rgb('#5A9E4B'));
  // globe stand
  cv.rect(gx - 3, gy + gr - 2, 6, h * 0.12, rgb('#7A5C2E'));
  cv.rect(gx - gr * 0.45, gy + gr + h * 0.1, gr * 0.9, 4, rgb('#7A5C2E'));
  // delegates at table (5 figures)
  const tableY = y + h * 0.66;
  const cols: RGB[] = [rgb('#1F3A5F'), rgb('#2E7D4F'), rgb('#8C2F2F'), rgb('#C77B21'), rgb('#2E7D7A')];
  const skins: RGB[] = [rgb('#E8B98A'), rgb('#C98A5E'), rgb('#F0CBA0'), rgb('#D9A06B'), rgb('#E8B98A')];
  for (let i = 0; i < 5; i++) {
    const fx = x + w * (0.42 + i * 0.11);
    cv.poly([[fx - 13, tableY], [fx - 9, tableY - 26], [fx + 9, tableY - 26], [fx + 13, tableY]], cols[i]);
    cv.circle(fx, tableY - 34, 8, skins[i]);
    cv.poly([[fx - 8, tableY - 26], [fx, tableY - 30], [fx + 8, tableY - 26]], rgb('#F5EFE3'));
  }
  // table
  cv.rect(x + w * 0.36, tableY, w * 0.6, 12, rgb('#6B4A2A'));
  cv.rect(x + w * 0.36, tableY + 12, w * 0.6, 3, rgb('#4A3018'));
  // clock (on the wall, between globe and flags — clear of chips and heads)
  const cx = x + w * 0.33, cy = y + h * 0.24, cr = h * 0.14;
  cv.circle(cx, cy, cr, rgb('#F5EFE3'));
  cv.circle(cx, cy, cr - 3, rgb('#F5EFE3'));
  cv.line(cx, cy - cr + 2, cx, cy - cr + 7, 2, rgb('#1A1A1A'));
  cv.line(cx, cy + cr - 7, cx, cy + cr - 2, 2, rgb('#1A1A1A'));
  cv.line(cx - cr + 2, cy, cx - cr + 7, cy, 2, rgb('#1A1A1A'));
  cv.line(cx + cr - 7, cy, cx + cr - 2, cy, 2, rgb('#1A1A1A'));
  cv.line(cx, cy, cx + cr * 0.55, cy, 3, rgb('#A61C1C'));
  cv.line(cx, cy, cx, cy - cr * 0.6, 3, rgb('#1A1A1A'));
  cv.circle(cx, cy, 3, rgb('#A61C1C'));
  // small flags on wall
  for (let i = 0; i < 3; i++) {
    const fx = x + w * (0.56 + i * 0.07);
    cv.line(fx, y + h * 0.16, fx, y + h * 0.3, 2, rgb('#5A4632'));
    cv.rect(fx, y + h * 0.16, 14, 9, [rgb('#2E5A88'), rgb('#A61C1C'), rgb('#2E7D4F')][i]);
  }
}

// ---- HERO 2: Bahrain harbour strike at dusk ----
export function heroBahrain(cv: Canvas, x: number, y: number, w: number, h: number): void {
  cv.gradV(x, y, w, h * 0.62, DUSK1, DUSK2);
  cv.rect(x, y + h * 0.62, w, h * 0.38, SEA);
  // sun low
  cv.circle(x + w * 0.8, y + h * 0.5, 13, rgb('#F2C879'));
  // storage tanks (left)
  for (let i = 0; i < 2; i++) {
    const tx = x + w * (0.1 + i * 0.17), tw = w * 0.13, th = h * 0.3, ty = y + h * 0.62 - th;
    cv.rect(tx, ty, tw, th, rgb('#E8E2D2'));
    cv.poly([[tx, ty], [tx + tw / 2, ty - 8], [tx + tw, ty]], rgb('#C9C2AE'));
    // flames on tank tops
    cv.poly([[tx + tw * 0.25, ty - 6], [tx + tw * 0.4, ty - 26], [tx + tw * 0.55, ty - 6]], FLAME);
    cv.poly([[tx + tw * 0.55, ty - 6], [tx + tw * 0.68, ty - 20], [tx + tw * 0.82, ty - 6]], FLAME2);
    // smoke columns (stacked puffs, vertical)
    cv.circle(tx + tw * 0.4, ty - 34, 9, SMOKE);
    cv.circle(tx + tw * 0.46, ty - 48, 11, SMOKE2);
    cv.circle(tx + tw * 0.52, ty - 62, 8, SMOKE);
  }
  // tanker (right)
  const sx = x + w * 0.52, sy = y + h * 0.66;
  cv.poly([[sx, sy], [sx + w * 0.36, sy], [sx + w * 0.33, sy + h * 0.13], [sx + w * 0.03, sy + h * 0.13]], rgb('#2A2A2E'));
  cv.rect(sx + w * 0.2, sy - h * 0.1, w * 0.07, h * 0.1, rgb('#E8E2D2'));
  cv.rect(sx + w * 0.2, sy - h * 0.16, w * 0.03, h * 0.06, rgb('#A61C1C'));
  cv.poly([[sx + w * 0.05, sy - 4], [sx + w * 0.09, sy - 20], [sx + w * 0.13, sy - 4]], FLAME);
  cv.circle(sx + w * 0.09, sy - 28, 7, SMOKE);
  cv.circle(sx + w * 0.12, sy - 40, 9, SMOKE2);
  // wave lines
  for (let i = 0; i < 3; i++) {
    const wy = y + h * (0.78 + i * 0.07);
    cv.line(x + w * 0.05, wy, x + w * 0.3, wy, 2, SEA2);
    cv.line(x + w * 0.55, wy + 3, x + w * 0.9, wy + 3, 2, SEA2);
  }
}

// ---- HERO 3: Sinaloa street, night raid ----
export function heroSinaloa(cv: Canvas, x: number, y: number, w: number, h: number): void {
  cv.gradV(x, y, w, h * 0.6, rgb('#2B2140'), rgb('#B4552D'));
  // mountains
  cv.poly([[x, y + h * 0.6], [x + w * 0.2, y + h * 0.3], [x + w * 0.42, y + h * 0.6]], rgb('#4A3358'));
  cv.poly([[x + w * 0.35, y + h * 0.6], [x + w * 0.62, y + h * 0.26], [x + w * 0.9, y + h * 0.6]], rgb('#3A2A4E'));
  // street
  cv.rect(x, y + h * 0.6, w, h * 0.4, rgb('#2E2A28'));
  cv.line(x, y + h * 0.8, x + w, y + h * 0.8, 3, rgb('#E8D44F'));
  // buildings
  cv.rect(x + w * 0.04, y + h * 0.32, w * 0.2, h * 0.28, rgb('#5A4632'));
  cv.rect(x + w * 0.78, y + h * 0.28, w * 0.18, h * 0.32, rgb('#4A3A2E'));
  for (let i = 0; i < 3; i++) {
    cv.rect(x + w * 0.07 + i * w * 0.06, y + h * 0.38, 8, 10, rgb('#F2C879'));
    cv.rect(x + w * 0.81 + i * w * 0.05, y + h * 0.34, 7, 9, rgb('#F2C879'));
  }
  // police SUV (centre)
  const vx = x + w * 0.36, vy = y + h * 0.66;
  cv.poly([[vx, vy], [vx + 8, vy - 16], [vx + 52, vy - 16], [vx + 62, vy], [vx + 62, vy + 10], [vx, vy + 10]], rgb('#1F2A3A'));
  cv.rect(vx + 12, vy - 26, 34, 12, rgb('#2C3E55'));
  cv.rect(vx + 24, vy - 31, 14, 5, rgb('#A61C1C'));
  cv.rect(vx + 38, vy - 31, 14, 5, rgb('#2E5A88'));
  cv.circle(vx + 14, vy + 10, 7, rgb('#141414'));
  cv.circle(vx + 48, vy + 10, 7, rgb('#141414'));
  // headlight beams
  cv.poly([[vx + 60, vy + 2], [vx + w * 0.3, vy - 8], [vx + w * 0.3, vy + 14]], rgb('#F2E3A0'));
  // burning roadblock (right)
  const bx = x + w * 0.72, by = y + h * 0.82;
  cv.poly([[bx, by], [bx + 8, by - 24], [bx + 16, by]], FLAME);
  cv.poly([[bx + 12, by], [bx + 20, by - 18], [bx + 28, by]], FLAME2);
  cv.circle(bx + 8, by - 30, 7, SMOKE);
  cv.circle(bx + 14, by - 42, 9, SMOKE2);
  cv.rect(bx - 14, by, 44, 5, rgb('#141414'));
  // helicopter silhouette
  const hx = x + w * 0.82, hy = y + h * 0.16;
  cv.line(hx - 18, hy, hx + 18, hy, 3, rgb('#141414'));
  cv.poly([[hx - 8, hy], [hx + 10, hy], [hx + 6, hy + 8], [hx - 6, hy + 8]], rgb('#141414'));
  cv.poly([[hx - 4, hy + 8], [hx - 14, hy + 34], [hx + 2, hy + 34]], rgb('#F2E3A0'));
}

// ---- GRID THUMBNAILS (story n -> tiny flat scene) ----
export function thumb(cv: Canvas, n: number, x: number, y: number, w: number, h: number): void {
  const sky = (c1: RGB, c2: RGB) => cv.gradV(x, y, w, h, c1, c2);
  switch (n) {
    case 4: { // Ukraine night: skyline + drones (straight trails) + fires
      sky(rgb('#101B30'), rgb('#2C3E55'));
      cv.rect(x, y + h * 0.55, w, h * 0.45, rgb('#0C1424'));
      for (let i = 0; i < 5; i++) {
        const bx = x + 8 + i * (w / 5.4), bh = 14 + ((i * 13) % 22);
        cv.rect(bx, y + h * 0.55 - bh, w / 7, bh, rgb('#1B2A44'));
        cv.rect(bx + 3, y + h * 0.55 - bh + 4, 3, 4, rgb('#F2C879'));
      }
      for (let i = 0; i < 3; i++) {
        const dx = x + w * (0.25 + i * 0.25), dy = y + h * (0.2 + i * 0.08);
        cv.line(dx, dy, dx - 22, dy + 14, 1.5, rgb('#E8E2D2'));
        cv.circle(dx, dy, 2.5, rgb('#F5EFE3'));
      }
      cv.poly([[x + w * 0.15, y + h], [x + w * 0.2, y + h * 0.78], [x + w * 0.25, y + h]], FLAME);
      cv.poly([[x + w * 0.6, y + h], [x + w * 0.65, y + h * 0.82], [x + w * 0.7, y + h]], FLAME2);
      break;
    }
    case 5: { // Sparta II: sea + burning ship
      sky(rgb('#BFD6E8'), rgb('#E8D9B0'));
      cv.rect(x, y + h * 0.6, w, h * 0.4, rgb('#2C5378'));
      cv.poly([[x + w * 0.15, y + h * 0.6], [x + w * 0.85, y + h * 0.6], [x + w * 0.78, y + h * 0.78], [x + w * 0.22, y + h * 0.78]], rgb('#2A2A2E'));
      cv.rect(x + w * 0.55, y + h * 0.42, w * 0.08, h * 0.18, rgb('#E8E2D2'));
      cv.poly([[x + w * 0.3, y + h * 0.6], [x + w * 0.36, y + h * 0.3], [x + w * 0.42, y + h * 0.6]], FLAME);
      cv.circle(x + w * 0.36, y + h * 0.22, 6, SMOKE);
      cv.circle(x + w * 0.4, y + h * 0.1, 8, SMOKE2);
      break;
    }
    case 6: { // coalition talks: flags + podium
      sky(rgb('#E8DFC8'), rgb('#F5EFE3'));
      for (let i = 0; i < 2; i++) {
        const fx = x + w * (0.2 + i * 0.45);
        cv.line(fx, y + h * 0.15, fx, y + h * 0.7, 2, rgb('#5A4632'));
        cv.rect(fx, y + h * 0.15, w * 0.22, h * 0.22, i === 0 ? rgb('#2E5A88') : rgb('#2E7D4F'));
      }
      cv.rect(x + w * 0.35, y + h * 0.62, w * 0.3, h * 0.3, rgb('#6B4A2A'));
      cv.circle(x + w * 0.5, y + h * 0.5, 7, rgb('#E8B98A'));
      break;
    }
    case 7: { // Gaza: ruins + aid truck
      sky(rgb('#E8C9A0'), rgb('#F2DDBB'));
      cv.poly([[x, y + h], [x, y + h * 0.4], [x + w * 0.25, y + h * 0.55], [x + w * 0.3, y + h]], rgb('#8A7A62'));
      cv.poly([[x + w * 0.55, y + h], [x + w * 0.6, y + h * 0.35], [x + w * 0.95, y + h * 0.5], [x + w, y + h]], rgb('#7A6A52'));
      cv.rect(x + w * 0.3, y + h * 0.68, w * 0.34, h * 0.2, rgb('#F5EFE3'));
      cv.circle(x + w * 0.38, y + h * 0.9, 4, rgb('#141414'));
      cv.circle(x + w * 0.56, y + h * 0.9, 4, rgb('#141414'));
      cv.circle(x + w * 0.85, y + h * 0.18, 7, rgb('#F2C879'));
      break;
    }
    case 8: { // Iran power cuts: dark building + moon
      sky(rgb('#0E1B2E'), rgb('#1F3A5F'));
      cv.circle(x + w * 0.8, y + h * 0.2, 8, rgb('#F2E3A0'));
      cv.rect(x + w * 0.12, y + h * 0.3, w * 0.7, h * 0.7, rgb('#141C2A'));
      for (let i = 0; i < 3; i++) for (let j = 0; j < 2; j++)
        cv.rect(x + w * (0.2 + i * 0.2), y + h * (0.4 + j * 0.22), 5, 6, i === 1 && j === 0 ? rgb('#F2C879') : rgb('#2A3648'));
      cv.line(x, y + h * 0.22, x + w * 0.4, y + h * 0.1, 1.5, rgb('#8A8F98'));
      cv.line(x + w * 0.4, y + h * 0.1, x + w * 0.45, y + h * 0.28, 1.5, rgb('#8A8F98'));
      break;
    }
    case 9: { // Nvidia SEC probe: falling chart + magnifier
      sky(rgb('#F5EFE3'), rgb('#E8DFC8'));
      cv.line(x + w * 0.1, y + h * 0.25, x + w * 0.9, y + h * 0.25, 1, rgb('#C9C2AE'));
      cv.line(x + w * 0.1, y + h * 0.5, x + w * 0.9, y + h * 0.5, 1, rgb('#C9C2AE'));
      cv.line(x + w * 0.1, y + h * 0.75, x + w * 0.9, y + h * 0.75, 1, rgb('#C9C2AE'));
      cv.stroke([[x + w * 0.12, y + h * 0.3], [x + w * 0.35, y + h * 0.45], [x + w * 0.55, y + h * 0.4], [x + w * 0.8, y + h * 0.72]], 3, rgb('#A61C1C'));
      cv.circle(x + w * 0.68, y + h * 0.35, 11, rgb('#1F3A5F'));
      cv.circle(x + w * 0.68, y + h * 0.35, 8, rgb('#F5EFE3'));
      cv.line(x + w * 0.76, y + h * 0.45, x + w * 0.86, y + h * 0.58, 3, rgb('#1F3A5F'));
      break;
    }
    case 10: { // Bolsonaro ICU: bed + monitor + cross
      sky(rgb('#E8F0E8'), rgb('#F5EFE3'));
      cv.rect(x + w * 0.08, y + h * 0.12, w * 0.2, h * 0.2, rgb('#F5EFE3'));
      cv.rect(x + w * 0.13, y + h * 0.14, 4, h * 0.16, rgb('#A61C1C'));
      cv.rect(x + w * 0.09, y + h * 0.18, w * 0.12, 4, rgb('#A61C1C'));
      cv.rect(x + w * 0.1, y + h * 0.62, w * 0.55, h * 0.14, rgb('#2E5A88'));
      cv.rect(x + w * 0.55, y + h * 0.5, w * 0.12, h * 0.12, rgb('#F5EFE3'));
      cv.circle(x + w * 0.61, y + h * 0.5, 5, rgb('#E8B98A'));
      cv.rect(x + w * 0.72, y + h * 0.2, w * 0.2, h * 0.3, rgb('#141C2A'));
      cv.stroke([[x + w * 0.74, y + h * 0.35], [x + w * 0.78, y + h * 0.3], [x + w * 0.82, y + h * 0.42], [x + w * 0.86, y + h * 0.28], [x + w * 0.9, y + h * 0.35]], 2, rgb('#4ADE80'));
      break;
    }
    case 11: { // AUKUS submarine
      sky(rgb('#BFD6E8'), rgb('#E8D9B0'));
      cv.rect(x, y + h * 0.55, w, h * 0.45, rgb('#2C5378'));
      cv.poly([[x + w * 0.12, y + h * 0.55], [x + w * 0.2, y + h * 0.42], [x + w * 0.7, y + h * 0.42], [x + w * 0.88, y + h * 0.55], [x + w * 0.8, y + h * 0.68], [x + w * 0.2, y + h * 0.68]], rgb('#1F2A3A'));
      cv.rect(x + w * 0.42, y + h * 0.3, w * 0.12, h * 0.14, rgb('#1F2A3A'));
      cv.line(x + w * 0.46, y + h * 0.3, x + w * 0.46, y + h * 0.18, 2, rgb('#1F2A3A'));
      cv.line(x + w * 0.1, y + h * 0.78, x + w * 0.35, y + h * 0.78, 2, rgb('#7FB2D9'));
      cv.line(x + w * 0.6, y + h * 0.85, x + w * 0.9, y + h * 0.85, 2, rgb('#7FB2D9'));
      break;
    }
    case 12: { // India cricket: field + stumps + bat + ball
      sky(rgb('#7FB069'), rgb('#A8C686'));
      cv.rect(x, y + h * 0.35, w, h * 0.3, rgb('#D9C08A'));
      for (let i = 0; i < 3; i++) cv.line(x + w * (0.2 + i * 0.03), y + h * 0.3, x + w * (0.2 + i * 0.03), y + h * 0.45, 2, rgb('#F2C879'));
      cv.poly([[x + w * 0.6, y + h * 0.25], [x + w * 0.68, y + h * 0.25], [x + w * 0.62, y + h * 0.6], [x + w * 0.56, y + h * 0.6]], rgb('#8A5A2E'));
      cv.circle(x + w * 0.8, y + h * 0.3, 4, rgb('#A61C1C'));
      cv.circle(x + w * 0.15, y + h * 0.8, 3, rgb('#F5EFE3'));
      break;
    }
    case 13: { // Hong Kong ballot box
      sky(rgb('#D8E6F0'), rgb('#F5EFE3'));
      for (let i = 0; i < 3; i++) {
        const bx = x + w * (0.1 + i * 0.28);
        cv.rect(bx, y + h * (0.3 + (i % 2) * 0.1), w * 0.2, h * 0.5, rgb('#5A6A7A'));
        for (let j = 0; j < 3; j++) cv.rect(bx + 4, y + h * (0.36 + j * 0.14), w * 0.12, 3, rgb('#F2C879'));
      }
      cv.rect(x + w * 0.3, y + h * 0.55, w * 0.4, h * 0.3, rgb('#2E5A88'));
      cv.rect(x + w * 0.42, y + h * 0.5, w * 0.16, 4, rgb('#141414'));
      cv.rect(x + w * 0.46, y + h * 0.34, w * 0.08, h * 0.16, rgb('#F5EFE3'));
      break;
    }
    case 14: { // F1 Las Vegas: car + checkered flag
      sky(rgb('#2B2140'), rgb('#5B3A6E'));
      cv.rect(x, y + h * 0.6, w, h * 0.4, rgb('#2E2A28'));
      cv.line(x, y + h * 0.8, x + w, y + h * 0.8, 2, rgb('#F5EFE3'));
      cv.poly([[x + w * 0.15, y + h * 0.6], [x + w * 0.25, y + h * 0.42], [x + w * 0.6, y + h * 0.42], [x + w * 0.75, y + h * 0.6]], rgb('#A61C1C'));
      cv.circle(x + w * 0.28, y + h * 0.62, 6, rgb('#141414'));
      cv.circle(x + w * 0.62, y + h * 0.62, 6, rgb('#141414'));
      for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++)
        cv.rect(x + w * (0.82 + i * 0.06), y + h * (0.12 + j * 0.1), w * 0.06, h * 0.1, (i + j) % 2 === 0 ? rgb('#141414') : rgb('#F5EFE3'));
      break;
    }
    case 15: { // Estonia border: barrier + flag
      sky(rgb('#D8E6F0'), rgb('#F5EFE3'));
      cv.rect(x, y + h * 0.65, w, h * 0.35, rgb('#6A6A6A'));
      cv.line(x, y + h * 0.82, x + w, y + h * 0.82, 2, rgb('#F5EFE3'));
      cv.line(x + w * 0.15, y + h * 0.3, x + w * 0.15, y + h * 0.65, 3, rgb('#5A4632'));
      cv.line(x + w * 0.85, y + h * 0.3, x + w * 0.85, y + h * 0.65, 3, rgb('#5A4632'));
      for (let i = 0; i < 4; i++)
        cv.rect(x + w * (0.15 + i * 0.18), y + h * 0.32, w * 0.09, 7, i % 2 === 0 ? rgb('#A61C1C') : rgb('#F5EFE3'));
      cv.rect(x + w * 0.5, y + h * 0.08, w * 0.2, h * 0.1, rgb('#2E5A88'));
      cv.rect(x + w * 0.5, y + h * 0.18, w * 0.2, h * 0.1, rgb('#141414'));
      cv.rect(x + w * 0.5, y + h * 0.28, w * 0.2, h * 0.1, rgb('#F5EFE3'));
      break;
    }
    default: {
      sky(rgb('#D8E6F0'), rgb('#F5EFE3'));
      cv.circle(x + w / 2, y + h / 2, 10, rgb('#2E5A88'));
    }
  }
}

// ---- NAVY DOT WORLD MAP (64 x 30 cells) ----
export const MAP_ROWS: string[] = [
  '........##..........##....................#####...................',
  '....#############..####..............########################......',
  '...###############..................########################....',
  '..#################............#####.######################.....',
  '....##############...........#########.###################......',
  '.....#############...........#########.##################.##....',
  '......############...........##########..################........',
  '.......##########............########.#####..##########.........',
  '........######...............############..#####..######...........',
  '...........####..............###########...#####.................',
  '............####.............###########...#####...####...........',
  '............#######...........##########.........######..........',
  '............########..........#########..........########........',
  '.............#######...........#######............########.......',
  '.............#######...........#######..........................',
  '.............######............######...........................',
  '..............#####...........######...........................',
  '..............####............#####...........................',
  '..............####............####...##........................',
  '..............###.............###....##.........................',
  '..............###...............................................',
  '...............##..............................................',
  '...............##.................................#######.......',
  '..................................................########.......',
  '...................................................######........',
  '....................................................####...##....',
  '...........................................................##....',
  '............................................................',
  '............................................................',
  '............................................................',
];

export interface MapPin { col: number; row: number; n: number; px?: number; py?: number }
// col/row = true location; px/py = display cell (nudged apart where pins crowd,
// with a leader line back to the true dot — drawn in main.ts).
export const MAP_PINS: MapPin[] = [
  { col: 37, row: 9, n: 1, px: 35, py: 8 }, { col: 41, row: 11, n: 2, px: 44, py: 12 }, { col: 13, row: 11, n: 3, px: 11, py: 12 },
  { col: 38, row: 6, n: 4 }, { col: 36, row: 4, n: 5, px: 33, py: 2 }, { col: 38, row: 10, n: 6, px: 35, py: 12 },
  { col: 37, row: 11, n: 7, px: 39, py: 12 }, { col: 41, row: 9, n: 8, px: 44, py: 8 }, { col: 18, row: 8, n: 9 },
  { col: 24, row: 21, n: 10 }, { col: 58, row: 25, n: 11, px: 57, py: 24 }, { col: 61, row: 27, n: 12, px: 62, py: 27 },
  { col: 52, row: 12, n: 13 }, { col: 12, row: 9, n: 14, px: 13, py: 8 }, { col: 36, row: 4, n: 15, px: 39, py: 3 },
];
