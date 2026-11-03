#!/usr/bin/env python3
"""
prepare-media.py — turns raw photos and drone videos into web-ready files.

Run from the project root:
    python3 scripts/prepare-media.py

What it does
1. Photos   : media-source/photos/<name>.jpg  ->  public/images/<folder>/<name>.webp (max 1920px, plus a 800px "-sm" version)
2. Videos   : compresses each drone video to 540p H.264 (+ poster JPG) in public/videos/
3. Frames   : slices the homepage scroll-film chapters into WebP frames in public/frames/<chapter>/
              (this is the Scroll Site Generator's frame-scrubbing technique)

Needs: ffmpeg on your PATH and Pillow  (pip install pillow)
Raw files in media-source/ are NOT committed to GitHub (see .gitignore) — they are too large.
"""
import json, subprocess, shutil, sys, tempfile
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "media-source"
PUB = ROOT / "public"

# ---------- 1. PHOTOS: source file -> (output folder, seo-friendly name) ----------
PHOTOS = {
    "nursery-frame.jpg":        ("projects", "nursery-shade-net-frame-footings-nagpur"),
    # "transformation.jpg" is a collage — its before/after halves are cropped by crop_before_after() below
    "pond-session.jpg":         ("gallery",  "nature-education-session-lined-pond"),
    "drip-saplings.jpg":        ("forest",   "native-saplings-drip-irrigation-rows"),
    "pipeline-trench.jpg":      ("projects", "drip-irrigation-mainline-trench"),
    "sapling-stake.jpg":        ("forest",   "native-sapling-with-stake-drip-line"),
    "gabion-wall.jpg":          ("projects", "gabion-structure-forest-drainage-line"),
    "aerial-plantation.jpg":    ("forest",   "aerial-view-native-plantation-trenches"),
    "check-dam.jpg":            ("projects", "check-dam-overflow-water-conservation"),
    "volunteers-gabion.jpg":    ("gallery",  "volunteers-building-gabion-structure"),
    "sunset-plantation.jpg":    ("forest",   "sunset-over-restored-plantation-nagpur"),
}

# ---------- 2. VIDEOS ----------
VIDEOS = {
    "Gabion.mp4":   "nisargavedh-drone-gabion-to-plantation",
    "DJI_0192.MP4": "drone-overhead-planned-park-layout",
}

# ---------- 3. SCROLL-FILM CHAPTERS: (video, start s, end s, fps) ----------
FILM = {
    "restore": ("Gabion.mp4",   2, 26, 5),   # gabion bund -> drone rises over plantation
    "evidence": ("DJI_0192.MP4", 1, 25, 5),  # overhead orbit of the planned park grid
}
FRAME_WIDTH = 1120
FRAME_QUALITY = 52


def run(cmd):
    subprocess.run(cmd, check=True)


def photos():
    for src, (folder, name) in PHOTOS.items():
        p = SRC / "photos" / src
        if not p.exists():
            print("  skip (missing):", p); continue
        out = PUB / "images" / folder
        out.mkdir(parents=True, exist_ok=True)
        im = Image.open(p).convert("RGB")
        for suffix, maxw in (("", 1920), ("-sm", 800)):
            c = im.copy(); c.thumbnail((maxw, maxw * 2))
            c.save(out / f"{name}{suffix}.webp", "WEBP", quality=78, method=6)
        print("  photo ->", folder, name, im.size)


def crop_before_after():
    """Cut the two photos out of the 'Transformation' collage for the before/after slider."""
    p = SRC / "photos" / "transformation.jpg"
    if not p.exists():
        return
    im = Image.open(p).convert("RGB")
    before = im.crop((80, 245, 480, 690))
    after = im.crop((526, 210, 944, 680)).resize(before.size)
    for suffix in ("", "-sm"):  # the source is small, so both sizes are the same file
        before.save(PUB / f"images/projects/nursery-site-before{suffix}.webp", quality=82)
        after.save(PUB / f"images/projects/nursery-site-after-shade-net{suffix}.webp", quality=82)
    print("  before/after crops saved")


def videos():
    out = PUB / "videos"; out.mkdir(parents=True, exist_ok=True)
    for src, name in VIDEOS.items():
        p = SRC / "videos" / src
        if not p.exists():
            print("  skip (missing):", p); continue
        run(["ffmpeg", "-v", "error", "-y", "-i", str(p), "-an", "-vf", "scale=-2:540",
             "-c:v", "libx264", "-preset", "veryfast", "-crf", "31", "-pix_fmt", "yuv420p",
             "-movflags", "+faststart", str(out / f"{name}.mp4")])
        run(["ffmpeg", "-v", "error", "-y", "-ss", "5", "-i", str(p), "-frames:v", "1",
             "-vf", "scale=-2:720", "-q:v", "4", str(out / f"{name}-poster.jpg")])
        print("  video ->", name)


def frames():
    for chapter, (src, a, b, fps) in FILM.items():
        p = SRC / "videos" / src
        if not p.exists():
            print("  skip (missing):", p); continue
        out = PUB / "frames" / chapter
        shutil.rmtree(out, ignore_errors=True); out.mkdir(parents=True)
        with tempfile.TemporaryDirectory() as tmp:
            run(["ffmpeg", "-v", "error", "-ss", str(a), "-to", str(b), "-i", str(p),
                 "-vf", f"fps={fps},scale={FRAME_WIDTH}:-2", f"{tmp}/f_%03d.png"])
            files = sorted(Path(tmp).glob("f_*.png"))
            for i, f in enumerate(files, 1):
                Image.open(f).convert("RGB").save(out / f"f_{i:03d}.webp", "WEBP",
                                                  quality=FRAME_QUALITY, method=4)
        manifest = {"count": len(files), "pattern": f"/frames/{chapter}/f_%03d.webp"}
        (out / "manifest.json").write_text(json.dumps(manifest))
        size = sum(f.stat().st_size for f in out.glob("*.webp")) / 1e6
        print(f"  frames -> {chapter}: {len(files)} frames, {size:.1f} MB")


if __name__ == "__main__":
    steps = sys.argv[1:] or ["photos", "crop_before_after", "videos", "frames"]
    for s in steps:
        print(f"[{s}]"); globals()[s]()
