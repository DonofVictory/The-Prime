// Generates the engraved (guilloche) background patterns in public/patterns/.
// Run: node scripts/make-patterns.mjs
// Both are drawn in the text colour; the site sets their opacity, so they read as faint engraving on black.
import { mkdirSync, writeFileSync } from "node:fs";

const INK = "#f3f1ec";
const f = (n) => Math.round(n * 10) / 10;
mkdirSync("public/patterns", { recursive: true });

/* 1. Seamless lattice tile: two families of sine waves crossing, like banknote background engraving. */
{
  const W = 240; // one full wave period, so the tile repeats seamlessly sideways
  const H = 48;
  const LINES = 6; // spacing 8px; phase steps by 2π/LINES so the tile also repeats vertically
  const amp = 7;
  const paths = [];
  for (const dir of [1, -1]) {
    for (let i = 0; i <= LINES; i++) {
      const y0 = (i * H) / LINES;
      const phase = (dir * i * 2 * Math.PI) / LINES;
      let d = "";
      for (let x = 0; x <= W; x += 4) {
        const y = y0 + amp * Math.sin((x / W) * 2 * Math.PI * dir + phase);
        d += `${x === 0 ? "M" : "L"}${x} ${f(y)}`;
      }
      paths.push(`<path d="${d}"/>`);
    }
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><g fill="none" stroke="${INK}" stroke-width="0.6">${paths.join("")}</g></svg>`;
  writeFileSync("public/patterns/lattice.svg", svg);
}

/* 2. Rosette: a wavy ring repeated and rotated, the classic watch-dial guilloche. */
{
  const S = 800;
  const c = S / 2;
  const COPIES = 18;
  const POINTS = 160;
  const ring = (R, a, k) => {
    const out = [];
    for (let n = 0; n < COPIES; n++) {
      const rot = (n / COPIES) * ((2 * Math.PI) / k);
      let d = "";
      for (let p = 0; p <= POINTS; p++) {
        const t = (p / POINTS) * 2 * Math.PI;
        const r = R + a * Math.sin(k * t);
        const x = c + r * Math.cos(t + rot);
        const y = c + r * Math.sin(t + rot);
        d += `${p === 0 ? "M" : "L"}${Math.round(x)} ${Math.round(y)}`;
      }
      out.push(`<path d="${d}Z"/>`);
    }
    return out.join("");
  };
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}"><g fill="none" stroke="${INK}" stroke-width="0.8">${ring(330, 26, 12)}${ring(220, 18, 9)}</g></svg>`;
  writeFileSync("public/patterns/rosette.svg", svg);
}

console.log("patterns written to public/patterns/");
