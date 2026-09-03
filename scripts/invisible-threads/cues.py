"""Regenerate src/app/releases/invisible-threads/cues.json.

Per-track start offsets in the STREAM m4a (the ten CD masters concatenated),
found by normalised cross-correlation of two 5 s probes from each CD WAV
against the decoded stream. Titles are read from the printed sleeve PDF.
Nothing is hand-entered.

Inputs (decode first, mono 44.1 k s16le):
  ffmpeg -i STREAM.m4a -ac 1 -ar 44100 -f s16le stream.raw
  ffmpeg -i "NN Title.wav" -ac 1 -ar 44100 -f s16le tNN.raw
Usage: python cues.py <rawdir> <sleeve.pdf> <out.json>
"""
import glob, json, os, re, sys
import numpy as np, pymupdf

RAW, PDF, OUT = sys.argv[1:4]
SR = 44100
stream = np.fromfile(f"{RAW}/stream.raw", dtype=np.int16).astype(np.float32)
tracks = sorted(glob.glob(f"{RAW}/t??.raw"))

# Titles, in printed order, from the sleeve back panel (numbered rows)
page = pymupdf.open(PDF)[0]
rows = {}
for b in page.get_text("dict")["blocks"]:
    for l in b.get("lines", []):
        for s in l["spans"]:
            t = s["text"].strip()
            if re.fullmatch(r"\d{1,2}", t):
                rows.setdefault(round(s["origin"][1]), {})["n"] = int(t)
            elif t and s["size"] > 8 and s["size"] < 9:
                rows.setdefault(round(s["origin"][1]), {})["title"] = re.sub(r"\s*\*$", "", t)
titles = [r["title"] for _, r in sorted(rows.items()) if "n" in r and "title" in r]
assert len(titles) == len(tracks) == 10, (titles, tracks)

def ncc(a, b):
    a = a - a.mean(); b = b - b.mean()
    d = np.linalg.norm(a) * np.linalg.norm(b)
    return float(np.dot(a, b) / d) if d > 0 else 0.0

def locate(probe, guess, win):
    lo = max(0, guess - win); hi = min(len(stream) - len(probe), guess + win)
    best = (-2.0, lo)
    for s in range(lo, hi, 64):
        c = ncc(probe[:SR], stream[s:s + SR])
        if c > best[0]: best = (c, s)
    s0 = best[1]
    for s in range(max(lo, s0 - 64), min(hi, s0 + 64)):
        c = ncc(probe, stream[s:s + len(probe)])
        if c > best[0]: best = (c, s)
    return best

out, cursor = [], 0
for title, t in zip(titles, tracks):
    x = np.fromfile(t, dtype=np.int16).astype(np.float32)
    found = []
    for p in (20, 60):
        p0 = min(p * SR, len(x) - 6 * SR)
        c, s = locate(x[p0:p0 + 5 * SR], cursor + p0, SR)
        found.append((s - p0, c))
    start = max(found, key=lambda f: f[1])[0]   # the probe with the stronger match
    spread = max(f[0] for f in found) - min(f[0] for f in found)
    print(f"{title:20s} start {start:9d} samples = {start / SR:9.3f} s   probes spread {spread} samples, ncc {found[0][1]:.3f}/{found[1][1]:.3f}")
    out.append({"title": title, "startSeconds": round(start / SR, 3)})
    cursor = start + len(x)

json.dump(out, open(OUT, "w"), indent=2); open(OUT, "a").write("\n")
print("wrote", OUT)
