#!/usr/bin/env python3
import json
import sys
from pathlib import Path

import yt_dlp


def convert_to_mp3(url: str, out_dir: str) -> dict:
    out_path = Path(out_dir).expanduser().resolve()
    out_path.mkdir(parents=True, exist_ok=True)

    # Output template BEFORE postprocessing. yt-dlp will download to a temp ext
    # then FFmpegExtractAudio will create the final .mp3.
    output_template = str(out_path / "%(title)s.%(ext)s")

    ydl_opts = {
        "format": "bestaudio/best",
        "outtmpl": output_template,
        "noplaylist": True,
        "quiet": True,
        # Convert to mp3 via ffmpeg
        "postprocessors": [
            {
                "key": "FFmpegExtractAudio",
                "preferredcodec": "mp3",
                "preferredquality": "192",
            }
        ],
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=True)

        title = info.get("title") or "output"
        video_id = info.get("id") or ""

        # Best-effort final path: yt-dlp sanitizes the title for filenames,
        # but for exact output path you'd typically use yt-dlp hooks.
        output_mp3 = out_path / f"{title}.mp3"

        return {
            "ok": True,
            "title": title,
            "id": video_id,
            "outputPath": str(output_mp3),
        }


def main():
    # Expected args: convert.py <url> <out_dir>
    if len(sys.argv) < 3:
        print(json.dumps({"ok": False, "error": "Usage: convert.py <url> <out_dir>"}))
        sys.exit(2)

    url = sys.argv[1].strip()
    out_dir = sys.argv[2].strip()

    try:
        result = convert_to_mp3(url, out_dir)
        print(json.dumps(result))
        sys.exit(0)
    except Exception as e:
        print(json.dumps({"ok": False, "error": str(e)}))
        sys.exit(1)


if __name__ == "__main__":
    main()
