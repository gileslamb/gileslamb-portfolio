"""
Waveform peaks generator for Unstable Systems releases.

Reads a WAV file and outputs a normalised JSON array of 600 peak values
suitable for the waveform canvas on the release and listen pages.

Upload the output JSON to the R2 bucket alongside the audio files:
  rclone copy unstable-systems-001-peaks.json r2:pub-1c42ac5be9844cb9bd9cf16ce1ef9b94/

Usage:
  python scripts/make_peaks.py "Masters/unstable-systems-001.wav"

Output file is written next to the input WAV with a -peaks.json suffix.
"""

import json, sys, wave, struct
from pathlib import Path

PEAK_COUNT = 600

def generate_peaks(wav_path, output_path, peak_count=PEAK_COUNT):
    with wave.open(wav_path, "rb") as w:
        n_channels = w.getnchannels()
        sample_width = w.getsampwidth()
        n_frames = w.getnframes()
        frames_per_peak = max(1, n_frames // peak_count)

        peaks, max_seen = [], 0
        for i in range(peak_count):
            w.setpos(i * frames_per_peak)
            chunk = w.readframes(frames_per_peak)
            if not chunk:
                peaks.append(0.0); continue

            if sample_width == 2:
                samples = struct.unpack(f"<{len(chunk)//2}h", chunk)
            elif sample_width == 3:
                samples = []
                for j in range(0, len(chunk) - 2, 3):
                    b = chunk[j:j+3] + (b"\xff" if chunk[j+2] & 0x80 else b"\x00")
                    samples.append(struct.unpack("<i", b)[0])
            elif sample_width == 4:
                samples = struct.unpack(f"<{len(chunk)//4}i", chunk)
            else:
                samples = struct.unpack(f"<{len(chunk)}b", chunk)

            if n_channels == 2:
                samples = [(abs(samples[k]) + abs(samples[k+1])) / 2
                           for k in range(0, len(samples) - 1, 2)]
            else:
                samples = [abs(s) for s in samples]

            peak = max(samples) if samples else 0
            peaks.append(peak)
            max_seen = max(max_seen, peak)

        if max_seen > 0:
            peaks = [round(p / max_seen, 4) for p in peaks]

    with open(output_path, "w") as f:
        json.dump(peaks, f)
    print(f"Wrote {len(peaks)} peaks to {output_path}")

if __name__ == "__main__":
    wav = sys.argv[1]
    out = Path(wav).with_name(Path(wav).stem + "-peaks.json")
    generate_peaks(wav, str(out))
