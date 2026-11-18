// Copied verbatim from catalogue-site/scripts/intensity.mjs (main) so the reel
// players draw the same intensity strip as the catalogue. Keep the two in step.

// Intensity sections for the player's tone bar, from a track's waveform peaks.
//
//   sections(peaks, duration) -> [[start_s, end_s, level], ...]   level 1 (quietest) .. 5 (loudest)
//
// peaks: the catalogue-assets waveform JSON's `peaks` ([[min, max] × N], evenly spread
// over the track). Steps:
//   1. Loudness envelope: mean energy (peak²) over a ~6 s window, in dB.
//   2. Scale to the track's own range: 10th..98th percentile of the bins that aren't
//      near-silent (so a fade-out or silent tail doesn't stretch the scale), never
//      narrower than MIN_RANGE_DB, so a steady track doesn't get its wobbles blown up.
//   3. Quantise to 5 levels with hysteresis: the level only moves when the envelope
//      clears the band edge by a margin (a clear step, not flicker at a boundary).
//   4. Runs of one level become sections; any section shorter than MIN_SECTION_S is
//      merged into the neighbour closest in level, repeatedly, then equal neighbours join.

export const LEVELS = 5;
const WINDOW_S = 6;          // smoothing window for the envelope
const SILENCE_DB = 40;       // bins this far below the loudest are left out of the range
const MIN_RANGE_DB = 12;     // a track's range is treated as at least this wide
const HYSTERESIS = 0.12;     // fraction of the range the envelope must clear to change level
export const MIN_SECTION_S = 5;

export function sections(peaks, duration) {
  const n = Array.isArray(peaks) ? peaks.length : 0;
  if (!n || !(duration > 0)) return null;
  const bin = duration / n;
  if (duration < MIN_SECTION_S) return [[0, round(duration), 3]];

  // 1. energy per bin, smoothed over ~WINDOW_S, in dB
  const e = peaks.map(([lo, hi]) => { const a = Math.max(Math.abs(lo), Math.abs(hi)); return a * a; });
  const half = Math.max(1, Math.round(WINDOW_S / bin / 2));
  const prefix = [0]; for (const v of e) prefix.push(prefix[prefix.length - 1] + v);
  const db = e.map((_, i) => {
    const a = Math.max(0, i - half), b = Math.min(n, i + half + 1);
    return 10 * Math.log10(Math.max((prefix[b] - prefix[a]) / (b - a), 1e-10));
  });

  // 2. the track's own range
  const top = Math.max(...db);
  const sorted = db.filter((v) => v > top - SILENCE_DB).sort((a, b) => a - b);
  const pct = (p) => sorted[Math.min(sorted.length - 1, Math.floor(p * sorted.length))];
  let lo = pct(0.10), hi = pct(0.98);
  if (hi - lo < MIN_RANGE_DB) { const mid = (hi + lo) / 2; lo = mid - MIN_RANGE_DB / 2; hi = mid + MIN_RANGE_DB / 2; }
  const x = db.map((v) => Math.min(1, Math.max(0, (v - lo) / (hi - lo))));

  // 3. quantise with hysteresis
  const bandOf = (v) => Math.min(LEVELS, 1 + Math.floor(v * LEVELS));
  let level = bandOf(x[0]);
  const lv = x.map((v) => {
    const lower = (level - 1) / LEVELS - HYSTERESIS, upper = level / LEVELS + HYSTERESIS;
    if (v < lower || v > upper) level = bandOf(v);
    return level;
  });

  // 4. runs -> sections (in bins), then merge short ones
  let segs = [];
  for (let i = 0; i < n; i++) {
    const last = segs[segs.length - 1];
    if (last && last.level === lv[i]) last.end = i + 1; else segs.push({ start: i, end: i + 1, level: lv[i] });
  }
  const minBins = MIN_SECTION_S / bin;
  const join = () => {   // neighbours of the same level become one
    const out = [];
    for (const s of segs) { const l = out[out.length - 1]; if (l && l.level === s.level) l.end = s.end; else out.push({ ...s }); }
    segs = out;
  };
  for (;;) {
    join();
    if (segs.length < 2) break;
    let k = -1, shortest = Infinity;
    segs.forEach((s, i) => { const len = s.end - s.start; if (len < minBins && len < shortest) { shortest = len; k = i; } });
    if (k < 0) break;
    const s = segs[k], prev = segs[k - 1], next = segs[k + 1];
    const pick = !prev ? next : !next ? prev
      : Math.abs(prev.level - s.level) !== Math.abs(next.level - s.level)
        ? (Math.abs(prev.level - s.level) < Math.abs(next.level - s.level) ? prev : next)
        : ((prev.end - prev.start) >= (next.end - next.start) ? prev : next);
    if (pick === prev) prev.end = s.end; else next.start = s.start;
    segs.splice(k, 1);
  }
  return segs.map((s, i) => [round(s.start * bin), i === segs.length - 1 ? round(duration) : round(s.end * bin), s.level]);
}

const round = (v) => Math.round(v * 10) / 10;
