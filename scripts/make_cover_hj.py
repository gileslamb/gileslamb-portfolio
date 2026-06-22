"""
Cover compositor for Hemispheric Joy.

Identical layout to make_cover.py (Orbital Fifths) except the third text
line shows the release title rather than "SESSION NNN".
"""

from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
import sys as _sys

ARTIST   = "GILES LAMB"
SERIES   = "UNSTABLE SYSTEMS"
LOCATION = "GLASGOW"
TEXT_COLOR       = (216, 207, 184)   # #d8cfb8 cream
BACKGROUND_COLOR = (8, 8, 16)

FONT_PATH_MACOS = "/System/Library/Fonts/Supplemental/Courier New.ttf"
FONT_PATH_LINUX = "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf"
FONT_PATH = FONT_PATH_MACOS if _sys.platform == "darwin" else FONT_PATH_LINUX


def make_cover(
    input_image_path: str,
    output_image_path: str,
    title: str,
    record_date: str,
    output_size: int = 3000,
):
    img = Image.open(input_image_path).convert("RGB")
    w, h = img.size
    side = min(w, h)
    left = (w - side) // 2
    top  = (h - side) // 2
    img  = img.crop((left, top, left + side, top + side))
    if side != output_size:
        img = img.resize((output_size, output_size), Image.LANCZOS)

    draw = ImageDraw.Draw(img)

    size_name    = int(output_size * 0.036)
    size_series  = int(output_size * 0.028)
    size_title   = int(output_size * 0.028)
    size_meta    = int(output_size * 0.022)

    font_name    = ImageFont.truetype(FONT_PATH, size_name)
    font_series  = ImageFont.truetype(FONT_PATH, size_series)
    font_title   = ImageFont.truetype(FONT_PATH, size_title)
    font_meta    = ImageFont.truetype(FONT_PATH, size_meta)

    margin_x      = int(output_size * 0.07)
    margin_bottom = int(output_size * 0.075)

    gap_after_name   = int(size_name   * 1.8)
    gap_after_series = int(size_series * 1.3)
    gap_after_title  = int(size_title  * 1.8)
    total_block_height = (
        size_name   + gap_after_name
        + size_series + gap_after_series
        + size_title  + gap_after_title
        + size_meta
    )

    y = output_size - margin_bottom - total_block_height

    draw.text((margin_x, y), ARTIST, font=font_name, fill=TEXT_COLOR)
    y += size_name + gap_after_name

    draw.text((margin_x, y), SERIES, font=font_series, fill=TEXT_COLOR)
    y += size_series + gap_after_series

    draw.text((margin_x, y), title.upper(), font=font_title, fill=TEXT_COLOR)
    y += size_title + gap_after_title

    meta_color = tuple(int(c * 0.80) for c in TEXT_COLOR)
    draw.text((margin_x, y), f"{LOCATION} · {record_date}", font=font_meta, fill=meta_color)

    img.save(output_image_path, "PNG", optimize=True)
    print(f"Saved: {output_image_path}")
    print(f"Size:  {img.size}")


if __name__ == "__main__":
    make_cover(
        input_image_path="artwork/hemispheric-joy-wedge.png",
        output_image_path="artwork/hemispheric-joy-cover.png",
        title="Hemispheric Joy",
        record_date="22.05.2026",
        output_size=3000,
    )
