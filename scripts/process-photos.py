"""Build the site's responsive photo set from the team's original files.

Usage: python3 -I scripts/process-photos.py <originals_dir> <raw_previews_dir>

Originals are never modified. Output goes to public/photos/ and the manifest
to src/data/photos.json. Add or remove a photo by editing PHOTOS below.
"""
import json
import os
import sys

from PIL import Image, ImageEnhance, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(ROOT, "public", "photos")
MANIFEST = os.path.join(ROOT, "src", "data", "photos.json")

# (source, slug, alt, focal point "x% y%", group, lift)
# source prefix "raw:" means a preview rendered from a Canon RAW file; those
# come out underexposed and get a gentle levels + brightness lift.
PHOTOS = [
    ("IMG_2446.JPG", "attack-over-the-block", "A BVN attacker wearing No. 16 swings over a double block at the net", "35% 40%", "season", False),
    ("IMG_2365.JPG", "huddle-hands-raised", "BVN players raise their hands together in a huddle before a match", "50% 55%", "season", False),
    ("IMG_2355.JPG", "medal-ceremony", "The team lines up with their medals and coach after a tournament", "50% 45%", "season", False),
    ("raw:s4.jpg", "state-tournament-huddle", "Players reach in together between points at the 2026 state tournament", "55% 50%", "state", True),
    ("raw:s0453.jpg", "state-tournament-attack", "A BVN hitter elevates for an attack during state tournament pool play", "45% 45%", "state", True),
    ("raw:s7.jpg", "state-tournament-high-fives", "Teammates trade high fives after winning a rally at the state tournament", "50% 50%", "state", True),
    ("raw:s3.jpg", "state-tournament-jump-serve", "A BVN server tosses for a jump serve at the state tournament", "45% 40%", "state", True),
    ("raw:s0528.jpg", "state-tournament-celebration", "BVN players celebrate a point together at the state tournament", "60% 50%", "state", True),
    ("IMG_1456.JPG", "spike-at-the-net", "A BVN outside hitter attacks the ball high above the net", "35% 40%", "season", False),
    ("IMG_1523.JPG", "attack-number-21", "BVN No. 21 attacks from the left side as teammates cover", "50% 35%", "season", False),
    ("IMG_1494.JPG", "attack-with-coverage", "A BVN attacker swings while No. 16 and No. 18 cover behind him", "50% 40%", "season", False),
    ("IMG_3459.JPG", "timeout-with-coach", "Players gather around the coach during a timeout", "50% 45%", "season", False),
    ("IMG_1537.JPG", "arms-around-huddle", "Teammates huddle with arms around each other between sets", "50% 45%", "season", False),
    ("IMG_0714.JPG", "team-circle", "The team circles up courtside before warmups", "50% 40%", "season", False),
    ("IMG_1577.JPG", "jersey-number-15", "The back of a BV North No. 15 jersey as a player watches the play", "55% 40%", "season", False),
    ("IMG_1681.JPG", "jersey-number-21", "A player in the BV North No. 21 jersey waits at the net", "50% 35%", "season", False),
    ("IMG_1489.JPG", "libero-number-3", "The libero in the white No. 3 jersey looks across the court", "50% 30%", "season", False),
    ("ok.JPG", "bench-applause", "Players applaud a teammate's point from the court", "55% 30%", "season", False),
    ("IMG_1872.JPG", "teammates-on-court", "Two BVN teammates look toward the bench between rallies", "60% 35%", "season", False),
    ("IMG_2623.JPG", "libero-walk-on", "The libero walks onto the court in front of the crowd", "55% 40%", "season", False),
    ("IMG_2779.JPG", "pregame-huddle", "BVN players huddle with arms raised before the first serve", "45% 60%", "season", False),
    ("IMG_1383.JPG", "pregame-handshake", "BVN players shake hands with opponents before a match", "55% 50%", "season", False),
    ("IMG_2388.JPG", "attack-at-the-antenna", "BVN No. 16 attacks at the antenna in a packed gym", "75% 40%", "season", False),
]

HERO_SLUGS = {"attack-over-the-block"}
WIDTHS = [480, 960, 1600]
HERO_WIDTHS = [640, 1280, 1920, 2560]


def load(src, originals, raws, lift):
    path = os.path.join(raws, src[4:]) if src.startswith("raw:") else os.path.join(originals, src)
    im = ImageOps.exif_transpose(Image.open(path)).convert("RGB")
    if lift:
        im = ImageOps.autocontrast(im, cutoff=0.5)
        im = ImageEnhance.Brightness(im).enhance(1.22)
        im = ImageEnhance.Color(im).enhance(1.05)
    return im


def main():
    originals, raws = sys.argv[1], sys.argv[2]
    os.makedirs(OUT_DIR, exist_ok=True)
    os.makedirs(os.path.dirname(MANIFEST), exist_ok=True)
    manifest = {}
    for src, slug, alt, focal, group, lift in PHOTOS:
        im = load(src, originals, raws, lift)
        w, h = im.size
        widths = [x for x in (HERO_WIDTHS if slug in HERO_SLUGS else WIDTHS) if x <= w] or [w]
        for tw in widths:
            th = round(h * tw / w)
            im.resize((tw, th), Image.LANCZOS).save(
                os.path.join(OUT_DIR, f"bvn-volleyball-{slug}-{tw}.webp"), "WEBP", quality=78, method=6
            )
        manifest[slug] = {
            "alt": alt,
            "width": w,
            "height": h,
            "widths": widths,
            "focal": focal,
            "group": group,
            "orientation": "portrait" if h > w else "landscape",
        }
        print(slug, w, h, widths)

    # Social share image: 1200x630 JPEG cropped from the hero
    hero = load(PHOTOS[0][0], originals, raws, False)
    w, h = hero.size
    th = round(w * 630 / 1200)
    top = max(0, round(h * 0.18))
    og = hero.crop((0, top, w, min(h, top + th))).resize((1200, 630), Image.LANCZOS)
    og.save(os.path.join(ROOT, "public", "og-image.jpg"), "JPEG", quality=84, optimize=True, progressive=True)

    with open(MANIFEST, "w") as f:
        json.dump(manifest, f, indent=2)


if __name__ == "__main__":
    main()
