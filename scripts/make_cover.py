"""
Cover compositor for Unstable Systems releases.

Takes a wedge artwork image and composites the four-line text block
(name, series, session, location/date) onto the bottom-left.

Reusable for future sessions — update SESSION_NUMBER, RECORD_DATE, and
the input/output paths in the __main__ block below.

Usage (Session 001 example):
  python scripts/make_cover.py

Requirements:
  pip install Pillow

The font path below assumes macOS. On Linux use:
  /usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf
"""

from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

# Brand constants — keep identical across all sessions
ARTIST = "GILES LAMB"
SERIES = "UNSTABLE SYSTEMS"
LOCATION = "GLASGOW"
TEXT_COLOR = (216, 207, 184)       # #d8cfb8 — cream from the site palette
BACKGROUND_COLOR = (8, 8, 16)      # #080810 — used only for padding if needed

# Font — DejaVuSansMono is available on most systems without extra installs
FONT_PATH_MACOS = "/System/Library/Fonts/Supplemental/Courier New.ttf"
FONT_PATH_LINUX = "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf"
import sys as _sys
FONT_PATH = FONT_PATH_MACOS if _sys.platform == "darwin" else FONT_PATH_LINUX


def make_cover(
    input_image_path: str,
    output_image_path: str,
    session_number: str,
    record_date: str,
    output_size: int = 3000,
):
    """
    Composite the four-line text block onto the artwork.

    Args:
        input_image_path: Path to the wedge artwork PNG
        output_image_path: Where to save the final cover
        session_number: e.g. "001"
        record_date: e.g. "18.05.2026"
        output_size: Final canvas size (square). Default 3000.
    """
    img = Image.open(input_image_path).convert("RGB")
    w, h = img.size
    side = min(w, h)
    left = (w - side) // 2
    top = (h - side) // 2
    img = img.crop((left, top, left + side, top + side))

    if side != output_size:
        img = img.resize((output_size, output_size), Image.LANCZOS)

    draw = ImageDraw.Draw(img)

    size_name    = int(output_size * 0.028)
    size_series  = int(output_size * 0.022)
    size_session = int(output_size * 0.022)
    size_meta    = int(output_size * 0.017)

    font_name    = ImageFont.truetype(FONT_PATH, size_name)
    font_series  = ImageFont.truetype(FONT_PATH, size_series)
    font_session = ImageFont.truetype(FONT_PATH, size_session)
    font_meta    = ImageFont.truetype(FONT_PATH, size_meta)

    margin_x      = int(output_size * 0.07)
    margin_bottom = int(output_size * 0.075)

    gap_after_name    = int(size_name    * 1.8)
    gap_after_series  = int(size_series  * 1.3)
    gap_after_session = int(size_session * 1.8)
    total_block_height = (
        size_name    + gap_after_name
        + size_series  + gap_after_series
        + size_session + gap_after_session
        + size_meta
    )

    y = output_size - margin_bottom - total_block_height

    draw.text((margin_x, y), ARTIST, font=font_name, fill=TEXT_COLOR)
    y += size_name + gap_after_name

    series_color = tuple(int(c * 0.88) for c in TEXT_COLOR)
    draw.text((margin_x, y), SERIES, font=font_series, fill=series_color)
    y += size_series + gap_after_series

    draw.text((margin_x, y), f"SESSION {session_number}", font=font_session, fill=series_color)
    y += size_session + gap_after_session

    meta_color = tuple(int(c * 0.65) for c in TEXT_COLOR)
    meta_text  = f"{LOCATION} · {record_date}"
    draw.text((margin_x, y), meta_text, font=font_meta, fill=meta_color)

    img.save(output_image_path, "PNG", optimize=True)
    print(f"Saved: {output_image_path}")
    print(f"Size:  {img.size}")


if __name__ == "__main__":
    # Update these for each new session
    make_cover(
        input_image_path="Music Releases/Unstable Systems_001/Artwork/18th_May_untitled_cover.png",
        output_image_path="Music Releases/Unstable Systems_001/Artwork/unstable-systems-001-cover.png",
        session_number="001",
        record_date="18.05.2026",
        output_size=3000,
    )
