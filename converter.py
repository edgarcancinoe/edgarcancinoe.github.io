#!/usr/bin/env python3
"""
python converter.py --url "https://www.youtube.com/watch?v=1AvmbjeHvxk" --start 0:02 --end 0:09 --width 320 --fps 8 --colors 64 -o out.gif
"""
from __future__ import annotations
import argparse, os, re, subprocess, sys, tempfile
from pathlib import Path

def parse_time(ts: str) -> float:
    ts = str(ts).strip()
    if re.fullmatch(r"\d+(\.\d+)?", ts):
        return float(ts)
    parts = [float(p) for p in ts.split(":")]
    if len(parts) == 2:  # MM:SS
        m, s = parts; return m*60 + s
    if len(parts) == 3:  # HH:MM:SS
        h, m, s = parts; return h*3600 + m*60 + s
    raise ValueError(f"Invalid time format: {ts}")

def has_ffmpeg() -> bool:
    try:
        subprocess.run(["ffmpeg","-version"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=False)
        return True
    except Exception:
        return False

def canonical_watch_url(url: str) -> str:
    # Normalize youtu.be/... → watch?v=...
    m = re.match(r"https?://youtu\.be/([A-Za-z0-9_-]{6,})", url)
    if m:
        video_id = m.group(1)
        return f"https://www.youtube.com/watch?v={video_id}"
    # Strip tracking params like si=...
    if "watch?v=" in url:
        base, *_ = url.split("&")
        return base
    return url

def download_with_ytdlp(url: str, outdir: Path) -> Path:
    """Download best MP4/MKV with yt-dlp and return the merged file path."""
    import yt_dlp
    outtmpl = str(outdir / "%(title).200B.%(ext)s")
    ydl_opts = {
        "quiet": True,
        "no_warnings": True,
        "noplaylist": True,
        # Prefer mp4 when possible; fall back to mkv if necessary
        "format": "bv*+ba/b",
        "merge_output_format": "mp4",
        "outtmpl": outtmpl,
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=True)
        filepath = ydl.prepare_filename(info)
        # If postprocessor remuxed to mp4, adjust extension
        if not filepath.lower().endswith(".mp4"):
            alt = Path(filepath).with_suffix(".mp4")
            if alt.exists():
                filepath = str(alt)
        return Path(filepath)

def make_gif_ffmpeg(in_video: Path, start_s: float, end_s: float, out_gif: Path,
                    width: int = 480, fps: int = 12, max_colors: int = 128, speed: float = 1.0):
    if end_s <= start_s:
        raise ValueError("end must be greater than start.")
    dur = end_s - start_s
    core = f"fps={fps},scale={width}:-1:flags=lanczos"
    if abs(speed - 1.0) > 1e-6:
        core = f"setpts=PTS/{speed},{core}"
    vf = f"{core},split[s0][s1];[s0]palettegen=max_colors={max_colors}[p];[s1][p]paletteuse=dither=bayer:bayer_scale=5"
    cmd = [
        "ffmpeg","-y",
        "-ss", f"{start_s:.3f}",
        "-i", str(in_video),
        "-t", f"{dur:.3f}",
        "-vf", vf,
        "-an",
        str(out_gif),
    ]
    subprocess.run(cmd, check=True)

def main():
    ap = argparse.ArgumentParser(description="YouTube range → lightweight GIF (yt-dlp + ffmpeg).")
    ap.add_argument("--url", required=True)
    ap.add_argument("--start", required=True, help="SS | MM:SS | HH:MM:SS")
    ap.add_argument("--end", required=True, help="SS | MM:SS | HH:MM:SS")
    ap.add_argument("-o","--output", default="clip.gif")
    ap.add_argument("--width", type=int, default=480)
    ap.add_argument("--fps", type=int, default=12)
    ap.add_argument("--colors", type=int, default=128)
    ap.add_argument("--speed", type=float, default=1.0)
    ap.add_argument("--keep-mp4", action="store_true")
    args = ap.parse_args()

    if not has_ffmpeg():
        print("ffmpeg not found on PATH.", file=sys.stderr)
        sys.exit(2)

    start_s = parse_time(args.start)
    end_s = parse_time(args.end)
    out_gif = Path(args.output).expanduser().resolve()
    url = canonical_watch_url(args.url)

    with tempfile.TemporaryDirectory() as td:
        td = Path(td)
        print("Downloading with yt-dlp…")
        src = download_with_ytdlp(url, td)
        print(f"Downloaded: {src.name}")
        print("Encoding GIF…")
        make_gif_ffmpeg(src, start_s, end_s, out_gif,
                        width=args.width, fps=args.fps,
                        max_colors=args.colors, speed=args.speed)
        print(f"Done: {out_gif}")
        if args.keep_mp4:
            kept = Path.cwd() / src.name
            src.replace(kept)
            print(f"Kept source MP4 at: {kept}")

if __name__ == "__main__":
    main()
