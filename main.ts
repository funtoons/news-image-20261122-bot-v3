// News22 v3 — one-page newspaper layout, 1024x1024, deterministic.
// Draws: identity strip, masthead, stat strip, region bar, 3 hero stories,
// 12-card grid, dot map + also-on list, BY THE CLOCK, DATE CHECK, footer.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { Canvas, encodePNG, rgb, type RGB } from './render.ts';
import { drawText, drawTextAligned, measure, wrap } from './font.ts';
import { HEROES, GRID, ALSO, STATS, REGIONS, CLOCK, DATE_CHECK, SOURCES, SUBHEAD, WIRE_TIME } from './data.ts';
import { heroCOP31, heroBahrain, heroSinaloa, thumb, MAP_ROWS, MAP_PINS } from './scenes.ts';

const W = 1024, H = 1024;
const L = 14, R = 1010, CW = R - L; // content width 996
const PAPER: RGB = rgb('#F5EFE3');
const INK: RGB = rgb('#1A1A1A');
const INK2: RGB = rgb('#5A5A5A');
const RED: RGB = rgb('#A61C1C');
const NAVY: RGB = rgb('#1F3A5F');
const GOLD: RGB = rgb('#C77B21');
const RULE: RGB = rgb('#8A744F');
const LRULE: RGB = rgb('#D9D2C0');
const WHITE: RGB = rgb('#FFFFFF');

const warns: string[] = [];
function fitSize(text: string, start: number, maxW: number, opts: { bold?: boolean; italic?: boolean } = {}): number {
  let s = start;
  while (s > 6 && measure(text, s, opts) > maxW) s -= 1;
  return s;
}
function linesFor(text: string, size: number, maxW: number, maxLines: number, label: string, opts: { bold?: boolean } = {}): string[] {
  const lines = wrap(text, size, maxW, opts);
  if (lines.length > maxLines) warns.push(`${label}: ${lines.length} lines (max ${maxLines}) — "${text}"`);
  return lines.slice(0, maxLines);
}

function main(): void {
  const cv = new Canvas();
  cv.fill(PAPER);

  // ---- 1. Identity strip ----
  cv.rect(L, 4, CW, 2, INK);
  drawText(cv, 'THE WORLD IN ONE DAY', L, 19, 13, RED, { bold: true });
  drawTextAligned(cv, '40 STORIES \u00b7 7 REGIONS \u00b7 EVERY ONE DATED SUNDAY 22 NOVEMBER 2026', R, 19, 11, NAVY, { bold: true, align: 'right' });
  cv.rect(L, 24, CW, 1, RULE);

  // ---- 2. Masthead (auto-fit) ----
  const mast = 'Sunday 22 November 2026';
  const mSize = fitSize(mast, 92, 980, { bold: true });
  drawTextAligned(cv, mast, 512, 92, mSize, INK, { bold: true, align: 'center' });

  // ---- 3. Sub-headline (bold red, not italic — italics blur at small size) ----
  const subSize = fitSize(SUBHEAD, 16, 980, { bold: true });
  drawTextAligned(cv, SUBHEAD, 512, 116, subSize, RED, { bold: true, align: 'center' });

  // ---- 4. Stat strip (6 numbers) ----
  cv.rect(L, 126, CW, 2, INK);
  const cellW = CW / 6;
  STATS.forEach(([num, cap], i) => {
    const cx = L + cellW * i + cellW / 2;
    drawTextAligned(cv, num, cx, 154, 32, RED, { bold: true, align: 'center' });
    drawTextAligned(cv, cap, cx, 169, 10.5, INK2, { align: 'center' });
    if (i > 0) cv.rect(L + cellW * i, 132, 1, 36, LRULE);
  });
  cv.rect(L, 173, CW, 1, RULE);

  // ---- 5. Region bar ----
  let rx = L;
  const total = REGIONS.reduce((a, r) => a + r[1], 0);
  REGIONS.forEach(([name, count, hex]) => {
    const segW = (count / total) * CW;
    cv.rect(rx, 178, segW, 18, rgb(hex));
    const label = `${name} ${count}`;
    const tSize = fitSize(label, 9.5, segW - 4, { bold: true });
    drawTextAligned(cv, label, rx + segW / 2, 191, tSize, WHITE, { bold: true, align: 'center' });
    rx += segW;
  });

  // ---- 6. Heroes (3 columns) ----
  const heroDraw = [heroCOP31, heroBahrain, heroSinaloa];
  const hx = [L, 350, 686], hw = 324, hy = 204, hh = 128;
  HEROES.forEach((s, i) => {
    const x = hx[i];
    heroDraw[i](cv, x, hy, hw, hh);
    // kicker chip (top-left, red)
    const kW = measure(s.chip, 10.5, { bold: true }) + 12;
    cv.rect(x, hy, kW, 18, RED);
    drawTextAligned(cv, s.chip, x + kW / 2, hy + 13, 10.5, WHITE, { bold: true, align: 'center' });
    // stat chip (top-right, white + navy border)
    if (s.stat) {
      const tW = measure(s.stat, 10.5, { bold: true }) + 12;
      cv.rect(x + hw - tW, hy, tW, 18, WHITE);
      cv.rect(x + hw - tW, hy, tW, 1, NAVY);
      cv.rect(x + hw - tW, hy + 17, tW, 1, NAVY);
      cv.rect(x + hw - tW, hy, 1, 18, NAVY);
      drawTextAligned(cv, s.stat, x + hw - tW / 2, hy + 13, 10.5, NAVY, { bold: true, align: 'center' });
    }
    // source chip (bottom-left, navy)
    const sW = measure(s.src, 9) + 10;
    cv.rect(x, hy + hh - 16, sW, 16, NAVY);
    drawTextAligned(cv, s.src, x + sW / 2, hy + hh - 4, 9, WHITE, { align: 'center' });
    // location line
    drawText(cv, `${s.n} ${s.loc} \u00b7 ${s.topic}`, x, hy + hh + 16, 11, RED, { bold: true });
    // headline (max 2 lines)
    const hLines = linesFor(s.head, 21, hw, 2, `hero ${s.n} headline`, { bold: true });
    hLines.forEach((ln, j) => drawText(cv, ln, x, hy + hh + 40 + j * 22, 21, INK, { bold: true }));
    // summary (max 3 lines)
    const sLines = linesFor(s.sum, 11, hw, 3, `hero ${s.n} summary`);
    sLines.forEach((ln, j) => drawText(cv, ln, x, hy + hh + 82 + j * 12.5, 11, INK2));
  });
  cv.rect(L, 446, CW, 1, RULE);

  // ---- 7. Grid: 12 cards, 6 x 2 ----
  const gw = 157, gg = 10, gh = 44;
  const gridY = [452, 572];
  GRID.forEach((s, i) => {
    const col = i % 6, row = Math.floor(i / 6);
    const x = L + col * (gw + gg), y = gridY[row];
    thumb(cv, s.n, x, y, gw, gh);
    // number circle (top-left of illustration)
    cv.circle(x + 10, y + 10, 8, NAVY);
    drawTextAligned(cv, String(s.n), x + 10, y + 13.5, 10, WHITE, { bold: true, align: 'center' });
    // chip label (bottom-left of illustration)
    const cW = measure(s.chip, 8.5, { bold: true }) + 8;
    cv.rect(x, y + gh - 14, cW, 14, WHITE);
    cv.rect(x, y + gh - 14, cW, 1, RED);
    cv.rect(x, y + gh - 1, cW, 1, RED);
    cv.rect(x + cW - 1, y + gh - 14, 1, 14, RED);
    drawTextAligned(cv, s.chip, x + cW / 2, y + gh - 4, 8.5, RED, { bold: true, align: 'center' });
    // location line
    drawText(cv, `${s.loc} \u00b7 ${s.topic}`, x, y + gh + 13, 9.5, RED, { bold: true });
    // headline (max 2 lines)
    const hLines = linesFor(s.head, 13, gw, 2, `grid ${s.n} headline`, { bold: true });
    hLines.forEach((ln, j) => drawText(cv, ln, x, y + gh + 28 + j * 13, 13, INK, { bold: true }));
    // summary (max 2 lines)
    const sLines = linesFor(s.sum, 9.5, gw, 2, `grid ${s.n} summary`);
    sLines.forEach((ln, j) => drawText(cv, ln, x, y + gh + 54 + j * 11, 9.5, INK2));
  });

  // ---- 8. Bottom band: map + also-on ----
  cv.rect(L, 690, CW, 1, RULE);
  drawText(cv, 'WHERE IT HAPPENED \u2014 EVERY PIN IS A STORY', L, 706, 12, NAVY, { bold: true });
  drawText(cv, 'ALSO ON SUNDAY 22 NOVEMBER \u2014 25 MORE STORIES', 346, 706, 12, RED, { bold: true });
  // dot map
  const mx = L, my = 712, mw = 316, mh = 150;
  const cellW2 = mw / 64, cellH2 = mh / 30;
  for (let r = 0; r < 30; r++) {
    const rowStr = (MAP_ROWS[r] + '.'.repeat(64)).slice(0, 64);
    for (let c = 0; c < 64; c++) {
      if (rowStr[c] === '#') cv.circle(mx + (c + 0.5) * cellW2, my + (r + 0.5) * cellH2, 1.9, NAVY);
    }
  }
  MAP_PINS.forEach((p) => {
    const tx = mx + (p.col + 0.5) * cellW2, ty = my + (p.row + 0.5) * cellH2;
    const px = mx + ((p.px ?? p.col) + 0.5) * cellW2, py = my + ((p.py ?? p.row) + 0.5) * cellH2;
    if (p.px !== undefined || p.py !== undefined) {
      cv.circle(tx, ty, 2, NAVY);
      cv.line(tx, ty, px, py, 1, NAVY);
    }
    cv.circle(px, py, 7.5, GOLD);
    drawTextAligned(cv, String(p.n), px, py + 3.5, 9, WHITE, { bold: true, align: 'center' });
  });
  drawText(cv, 'Pins 1\u201315 match the stories above.', L, 876, 8.5, INK2);
  // also-on list, 2 columns
  const alsoCols: [number, number][] = [[346, 322], [678, 332]];
  ALSO.forEach((a, i) => {
    const [cx0, cw0] = alsoCols[Math.floor(i / 13)];
    const row = i % 13;
    const y = 726 + row * 13;
    let x = cx0;
    x = drawText(cv, `${a.n} `, x, y, 9.5, NAVY, { bold: true });
    x = drawText(cv, `${a.loc}: `, x, y, 9.5, INK, { bold: true });
    x = drawText(cv, `${a.text} `, x, y, 9.5, INK);
    drawText(cv, a.src, x, y, 9.5, INK2);
    const lineW = measure(`${a.n} ${a.loc}: ${a.text} ${a.src}`, 9.5);
    if (lineW > cw0) warns.push(`also-on ${a.n}: ${lineW.toFixed(0)}px > ${cw0}px`);
  });

  // ---- 9. BY THE CLOCK ----
  cv.rect(L, 888, CW, 1, RULE);
  drawText(cv, 'BY THE CLOCK', L, 906, 11, RED, { bold: true });
  const clockItems = CLOCK.map(([t, e]) => `${t} ${e}`);
  const half = clockItems.slice(0, 4).join('  \u00b7  ');
  const half2 = clockItems.slice(4).join('  \u00b7  ');
  drawText(cv, half, 132, 906, 9, INK);
  drawText(cv, half2, 132, 919, 9, INK);
  if (measure(half, 9) > CW - 118) warns.push('clock line 1 too wide');
  if (measure(half2, 9) > CW - 118) warns.push('clock line 2 too wide');

  // ---- 10. DATE CHECK ----
  const dcY = 928;
  const dcLines = wrap(DATE_CHECK, 9.5, 960);
  const dcH = 20 + dcLines.length * 12.5 + 8;
  cv.rect(L, dcY, CW, 2, RED);
  cv.rect(L, dcY + dcH - 2, CW, 2, RED);
  cv.rect(L, dcY, 2, dcH, RED);
  cv.rect(R - 2, dcY, 2, dcH, RED);
  drawText(cv, 'DATE CHECK', L + 8, dcY + 15, 11, RED, { bold: true });
  dcLines.forEach((ln, j) => drawText(cv, ln, L + 8, dcY + 30 + j * 12.5, 9.5, INK));
  if (dcLines.length > 3) warns.push(`date check: ${dcLines.length} lines`);

  // ---- 11. Sources footer ----
  const fY = dcY + dcH + 10;
  const fLines = wrap(SOURCES, 8.5, CW);
  fLines.forEach((ln, j) => drawText(cv, ln, L, fY + j * 11, 8.5, INK2));
  if (fLines.length > 2) warns.push(`sources footer: ${fLines.length} lines`);

  // ---- 12. Bottom bar ----
  const bY = 1008;
  cv.rect(0, bY, W, 16, NAVY);
  drawText(cv, 'THE WORLD IN ONE DAY', L, bY + 11.5, 9, WHITE, { bold: true });
  drawTextAligned(cv, `SUNDAY 22 NOVEMBER 2026 \u00b7 ONE PAGE \u00b7 40 STORIES \u00b7 WIRES READ ${WIRE_TIME}`, R, bY + 11.5, 9, WHITE, { bold: true, align: 'right' });

  const png = encodePNG(cv.downsample(), W, H);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || './output';
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, 'entry.png');
  writeFileSync(outPath, png);
  console.log('wrote', outPath, png.length, 'bytes');
  if (warns.length) { console.log('LAYOUT WARNINGS:'); warns.forEach((w) => console.log(' -', w)); }
  else console.log('layout: no warnings');
}

main();
