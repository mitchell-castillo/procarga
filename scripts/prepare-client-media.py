"""Prepare the client's original fleet media without retouching vehicle details.

Requires Pillow and imageio-ffmpeg. Images retain their complete composition;
website object-fit/object-position provide the reversible display framing.
"""

from __future__ import annotations

import argparse
import json
import subprocess
from pathlib import Path

from PIL import Image, ImageOps


PHOTOS = [
    ("eae22ec3-2aee-4652-8eb2-d11e9eee3c5b.jpg", "suburban-panorama", "50% 42%"),
    ("WhatsApp Image 2026-10-14 at 6.30.33 PM.jpeg", "suburban-front", "50% 43%"),
    ("WhatsApp Image 2026-10-14 at 6.32.14 PM.jpeg", "suburban-garden", "10% 40%"),
    ("WhatsApp Image 2026-10-14 at 6.34.28 PM.jpeg", "suburban-coast", "75% 48%"),
    ("WhatsApp Image 2026-10-14 at 6.35.36 PM.jpeg", "suv-lineup", "55% 55%"),
    ("WhatsApp Image 2026-10-14 at 6.42.16 PM.jpeg", "toyota-hiace-front", "50% 49%"),
    ("WhatsApp Image 2026-10-14 at 6.42.16 PM (1).jpeg", "toyota-hiace-side", "50% 54%"),
    ("WhatsApp Image 2026-10-14 at 6.42.17 PM.jpeg", "toyota-hiace-rear", "50% 50%"),
    ("WhatsApp Image 2026-10-14 at 6.42.17 PM (1).jpeg", "toyota-hiace-interior-angle", "50% 53%"),
    ("WhatsApp Image 2026-10-14 at 6.42.17 PM (2).jpeg", "toyota-hiace-interior-rows", "50% 50%"),
]

VIDEOS = [
    ("WhatsApp Video 2026-10-14 at 6.29.30 PM.mp4", "suburban-cabin", 14, 8, 18),
    ("WhatsApp Video 2026-10-14 at 6.32.48 PM.mp4", "suburban-arrival", 0, 4.23, 2),
    ("WhatsApp Video 2026-10-14 at 6.34.00 PM.mp4", "suburban-walkaround", 0, 6.5, 4),
]


def run(command: list[str]) -> None:
    result = subprocess.run(command, capture_output=True, text=True)
    if result.returncode:
        raise RuntimeError(result.stderr)


def webp(image: Image.Image, destination: Path, max_edge: int) -> None:
    image = ImageOps.exif_transpose(image).convert("RGB")
    image.thumbnail((max_edge, max_edge), Image.Resampling.LANCZOS)
    image.save(destination, "WEBP", quality=78, method=6)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source", type=Path, default=Path.home() / "Desktop" / "procargoMedia")
    parser.add_argument("--output", type=Path, default=Path(__file__).resolve().parents[1] / "dist" / "assets" / "fleet")
    args = parser.parse_args()
    args.output.mkdir(parents=True, exist_ok=True)
    manifest: dict[str, list] = {"images": [], "videos": []}

    for source_name, name, object_position in PHOTOS:
        source = args.source / source_name
        with Image.open(source) as original:
            webp(original, args.output / f"{name}.webp", 1400)
            webp(original, args.output / f"{name}-640.webp", 640)
        with Image.open(args.output / f"{name}.webp") as prepared:
            dimensions = list(prepared.size)
        manifest["images"].append({
            "source": source_name, "file": f"{name}.webp", "small": f"{name}-640.webp",
            "dimensions": dimensions, "suggestedObjectPosition": object_position,
            "bytes": (args.output / f"{name}.webp").stat().st_size,
        })

    import imageio_ffmpeg
    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
    for source_name, name, start, duration, poster_time in VIDEOS:
        source = args.source / source_name
        video = args.output / f"{name}.mp4"
        run([ffmpeg, "-hide_banner", "-y", "-ss", str(start), "-i", str(source),
             "-t", str(duration), "-an", "-map_metadata", "-1", "-vf", "scale='min(720,iw)':-2,fps=24",
             "-c:v", "libx264", "-preset", "medium", "-crf", "26", "-pix_fmt", "yuv420p",
             "-movflags", "+faststart", str(video)])
        poster = args.output / f"{name}-poster.webp"
        run([ffmpeg, "-hide_banner", "-y", "-ss", str(poster_time), "-i", str(source),
             "-frames:v", "1", "-vf", "scale='min(960,iw)':-2", "-quality", "84", str(poster)])
        manifest["videos"].append({
            "source": source_name, "file": video.name, "poster": poster.name,
            "sourceStartSeconds": start, "durationSeconds": duration,
            "audio": False, "bytes": video.stat().st_size,
        })

    (args.output / "manifest.json").write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(json.dumps(manifest, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
