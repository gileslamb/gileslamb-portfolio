// Intensity strips for the reel players (/reels/*), made the catalogue's way.
//
//   node scripts/reel-intensity.mjs
//
// For every track URL on the reel pages:
//   1. decode the MP3 with ffmpeg to 8 kHz mono and take 800 [min, max] peak
//      pairs, as catalogue-pipeline's media.waveform_peaks does;
//   2. turn the peaks into intensity sections with scripts/intensity.mjs
//      (a verbatim copy of catalogue-site's), [[start_s, end_s, level 1-5], ...];
//   3. write them all to src/data/reel-intensity.json, keyed by track URL, so the
//      player fetches nothing at play time (the catalogue keeps them in data.js).
// Rerun after adding or replacing a reel track. Needs ffmpeg on the PATH.
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { spawn } from "node:child_process";
import { sections } from "./intensity.mjs";

const N_PEAKS = 800, SR = 8000;
const OUT = "src/data/reel-intensity.json";

// collect track URLs from the reel pages and the museum reel component
const files = [
  ...readdirSync("src/app/reels", { withFileTypes: true })
    .filter((d) => d.isDirectory()).map((d) => `src/app/reels/${d.name}/page.jsx`),
  "src/components/MuseumReelContent.jsx",
];
const urls = [];
for (const f of files) {
  let src; try { src = readFileSync(f, "utf8"); } catch { continue; }
  const base = (src.match(/const BASE = "([^"]+)"/) || [])[1] || "";
  for (const m of src.matchAll(/src:\s*(?:BASE \+ )?"([^"]+)"/g)) urls.push(m[1].startsWith("http") ? m[1] : base + m[1]);
}

function decode(url) {
  return new Promise((resolve, reject) => {
    const ff = spawn("ffmpeg", ["-v", "error", "-i", url, "-ac", "1", "-ar", String(SR), "-f", "f32le", "-"]);
    const chunks = [];
    ff.stdout.on("data", (c) => chunks.push(c));
    ff.on("close", (code) => {
      if (code) return reject(new Error(`ffmpeg ${code}: ${url}`));
      const b = Buffer.concat(chunks);
      resolve(new Float32Array(b.buffer, b.byteOffset, Math.floor(b.length / 4)));
    });
  });
}

function peaks(y) {
  // same blocking as media.waveform_peaks: N equal chunks, [min, max] each, 3 dp
  const chunk = Math.max(1, Math.floor(y.length / N_PEAKS));
  const out = [];
  for (let i = 0; i + chunk <= y.length && out.length < N_PEAKS; i += chunk) {
    let lo = Infinity, hi = -Infinity;
    for (let j = i; j < i + chunk; j++) { const v = y[j]; if (v < lo) lo = v; if (v > hi) hi = v; }
    out.push([Math.round(lo * 1000) / 1000, Math.round(hi * 1000) / 1000]);
  }
  return out;
}

const result = {};
let i = 0;
for (const url of [...new Set(urls)]) {
  i++;
  try {
    const y = await decode(url);
    const duration = y.length / SR;
    result[url] = sections(peaks(y), duration);
    console.log(`${i}/${urls.length} ${result[url].length} sections  ${decodeURIComponent(url.split("/").pop())}`);
  } catch (e) {
    console.log(`${i}/${urls.length} FAILED ${url}: ${e.message}`);
  }
}
writeFileSync(OUT, JSON.stringify(result, null, 0).replace(/\],"/g, '],\n"') + "\n");
console.log(`wrote ${Object.keys(result).length} tracks to ${OUT}`);
