"""Render the BVN monogram app icons into public/. Run: python3 -I scripts/make-icons.py"""
import os
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONT = "/System/Library/Fonts/Supplemental/Impact.ttf"
NAVY, WHITE = (10, 26, 54), (243, 245, 248)


def icon(size, pad_ratio=0.16):
    scale = 4
    s = size * scale
    im = Image.new("RGB", (s, s), NAVY)
    d = ImageDraw.Draw(im)
    target = s * (1 - 2 * pad_ratio)
    fs = int(s * 0.6)
    while True:
        font = ImageFont.truetype(FONT, fs)
        l, t, r, b = d.textbbox((0, 0), "BVN", font=font)
        if r - l <= target:
            break
        fs -= 4
    w, h = r - l, b - t
    d.text(((s - w) / 2 - l, (s - h) / 2 - t), "BVN", font=font, fill=WHITE)
    bar = max(scale, int(s * 0.035))
    d.rectangle([s * pad_ratio, s - s * 0.2, s - s * pad_ratio, s - s * 0.2 + bar], fill=(76, 195, 224))
    return im.resize((size, size), Image.LANCZOS)


out = os.path.join(ROOT, "public")
icon(32, 0.06).save(os.path.join(out, "favicon-32.png"))
icon(180).save(os.path.join(out, "apple-touch-icon.png"))
icon(192).save(os.path.join(out, "icon-192.png"))
icon(512).save(os.path.join(out, "icon-512.png"))
icon(256, 0.06).save(os.path.join(out, "favicon.ico"), sizes=[(16, 16), (32, 32), (48, 48)])
print("icons written")
