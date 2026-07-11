#!/usr/bin/env python3
"""Generate the research-areas bubble diagram (JAIST georgiev1.jpg style).

Writes research-areas-bubbles.svg next to this script. If Inkscape is
available, also renders research-areas-bubbles.png at PNG_WIDTH pixels.

Edit BUBBLES to change wording, colours, or layout, then rerun:

    python3 make_research_areas_bubbles.py

Each bubble is a dict with:
    colour  hex colour for rim, gradient, and text
    cx, cy  circle centre (canvas is roughly 0-1000 in both axes)
    lines   list of (text, font_size, bold, y) tuples; y is absolute
"""

import shutil
import subprocess
from pathlib import Path

RADIUS = 232
PNG_WIDTH = 1800
OUT = Path(__file__).with_name("research-areas-bubbles")

# Palette validated for colour-vision-deficiency separation and
# 3:1 contrast on white (dataviz six-checks validator, 2026-07-11).
BUBBLES = [
    {
        "colour": "#1D4ED8",  # blue, top
        "cx": 500, "cy": 240,
        "lines": [
            ("Creativity", 52, True, 192),
            ("in LLMs, multi-", 28, False, 232),
            ("agent systems, and", 28, False, 272),
            ("generative AI", 42, True, 318),
        ],
    },
    {
        "colour": "#EA580C",  # orange, right
        "cx": 772, "cy": 425,
        "lines": [
            ("Human–AI", 42, True, 372),
            ("co-creation", 46, True, 418),
            ("and", 26, False, 452),
            ("context engineering", 34, True, 492),
        ],
    },
    {
        "colour": "#7C3AED",  # violet, bottom right
        "cx": 668, "cy": 758,
        "lines": [
            ("Agentic AI", 48, True, 732),
            ("and", 26, False, 766),
            ("Agentic Engineering", 34, True, 806),
        ],
    },
    {
        "colour": "#BE185D",  # magenta, bottom left
        "cx": 305, "cy": 770,
        "lines": [
            ("AI-accelerated", 36, True, 742),
            ("science", 50, True, 792),
            ("and Meta-science", 30, False, 830),
        ],
    },
    {
        "colour": "#0D9488",  # teal, left
        "cx": 215, "cy": 415,
        "lines": [
            ("Generative AI", 36, True, 366),
            ("literacy", 48, True, 414),
            ("and AI engineering", 26, False, 448),
            ("education", 38, True, 490),
        ],
    },
]


def gradient(index, colour):
    return (
        f'    <radialGradient id="g{index}" cx="42%" cy="38%" r="72%">\n'
        f'      <stop offset="0%" stop-color="{colour}" stop-opacity="0.03"/>\n'
        f'      <stop offset="70%" stop-color="{colour}" stop-opacity="0.10"/>\n'
        f'      <stop offset="100%" stop-color="{colour}" stop-opacity="0.32"/>\n'
        f'    </radialGradient>'
    )


def circle(index, bubble):
    return (
        f'  <circle cx="{bubble["cx"]}" cy="{bubble["cy"]}" r="{RADIUS}" '
        f'fill="url(#g{index})" stroke="{bubble["colour"]}" '
        f'stroke-width="8" stroke-opacity="0.85"/>'
    )


def label(bubble):
    rows = []
    for text, size, bold, y in bubble["lines"]:
        weight = "" if bold else ' font-weight="normal"'
        rows.append(
            f'    <text x="{bubble["cx"]}" y="{y}" font-size="{size}"{weight}>{text}</text>'
        )
    body = "\n".join(rows)
    return (
        f'  <g fill="{bubble["colour"]}" text-anchor="middle" font-weight="bold">\n'
        f"{body}\n  </g>"
    )


def build_svg():
    # viewBox leaves margin so rims are not clipped at the canvas edge
    parts = [
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="-32 -8 1064 1030" '
        'font-family="Helvetica, Arial, sans-serif">',
        "  <defs>",
        *(gradient(i, b["colour"]) for i, b in enumerate(BUBBLES)),
        "  </defs>",
        "",
        '  <rect x="-32" y="-8" width="1064" height="1030" fill="#ffffff"/>',
        "",
        *(circle(i, b) for i, b in enumerate(BUBBLES)),
        "",
        *(label(b) for b in BUBBLES),
        "</svg>",
    ]
    return "\n".join(parts) + "\n"


def main():
    svg_path = OUT.with_suffix(".svg")
    svg_path.write_text(build_svg(), encoding="utf-8")
    print(f"wrote {svg_path}")

    if shutil.which("inkscape"):
        png_path = OUT.with_suffix(".png")
        subprocess.run(
            ["inkscape", str(svg_path), "-w", str(PNG_WIDTH), "-o", str(png_path)],
            check=True,
        )
        print(f"wrote {png_path}")
    else:
        print("inkscape not found, skipped PNG render")


if __name__ == "__main__":
    main()
