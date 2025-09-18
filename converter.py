#!/usr/bin/env python3
"""
Example:
python converter.py --url "https://www.youtube.com/watch?v=1AvmbjeHvxk" \
    --start 0:02 --end 0:09 --width 320 --fps 8 -o out --quality high
→ Produces out.mp4 and out.webm
"""
import argparse, re, subprocess, sys, tempfile
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
        subprocess.run(["ffmpeg","-version"],
                       stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        return True
    except Exception:
        return False

def canonical_watch_url(url: str) -> str:
    m = re.match(r"https?://youtu\.be/([A-Za-z0-9_-]{6,})", url)
    if m:
        return f"https://www.youtube.com/watch?v={m.group(1)}"
    if "watch?v=" in url:
        base, *_ = url.split("&")
        return base
    return url

def download_with_ytdlp(url: str, outdir: Path) -> Path:
    import yt_dlp
    outtmpl = str(outdir / "%(title).200B.%(ext)s")
    ydl_opts = {
        "quiet": True, "no_warnings": True, "noplaylist": True,
        "format": "bv*+ba/b", "merge_output_format": "mp4", "outtmpl": outtmpl,
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=True)
        filepath = Path(ydl.prepare_filename(info))
        if not filepath.suffix.lower() == ".mp4":
            alt = filepath.with_suffix(".mp4")
            if alt.exists():
                filepath = alt
        return filepath

def make_videos(in_video: Path, start: float, end: float, out_base: Path,
                width: int, fps: int, speed: float, quality: str):
    dur = end - start
    if dur <= 0: raise ValueError("end must be greater than start.")

    core = f"fps={fps},scale={width}:trunc(ow/a/2)*2:flags=lanczos"
    if abs(speed - 1.0) > 1e-6:
        core = f"setpts=PTS/{speed},{core}"

    # Quality presets
    if quality == "low":
        mp4_crf, webm_crf, preset = "28", "34", "faster"
    elif quality == "medium":
        mp4_crf, webm_crf, preset = "23", "30", "medium"
    else:  # high
        mp4_crf, webm_crf, preset = "18", "28", "slow"

    # MP4
    mp4_out = out_base.with_suffix(".mp4")
    cmd_mp4 = [
        "ffmpeg","-y","-nostdin",
        "-ss", f"{start:.3f}","-i", str(in_video),"-t", f"{dur:.3f}",
        "-vf", core,"-an",
        "-c:v","libx264","-pix_fmt","yuv420p",
        "-preset", preset,"-crf", mp4_crf,
        "-movflags","faststart", str(mp4_out)
    ]
    subprocess.run(cmd_mp4, check=True)

    # WebM
    webm_out = out_base.with_suffix(".webm")
    cmd_webm = [
        "ffmpeg","-y","-nostdin",
        "-ss", f"{start:.3f}","-i", str(in_video),"-t", f"{dur:.3f}",
        "-vf", core,"-an",
        "-c:v","libvpx-vp9","-b:v","0","-crf", webm_crf,"-preset", preset,
        str(webm_out)
    ]
    subprocess.run(cmd_webm, check=True)

def main():
    ap = argparse.ArgumentParser(description="YouTube range → MP4 + WebM clip")
    ap.add_argument("--url", required=True)
    ap.add_argument("--start", required=True, help="SS | MM:SS | HH:MM:SS")
    ap.add_argument("--end", required=True, help="SS | MM:SS | HH:MM:SS")
    ap.add_argument("-o","--output", default="clip")
    ap.add_argument("--width", type=int, default=480)
    ap.add_argument("--fps", type=int, default=12)
    ap.add_argument("--speed", type=float, default=1.0)
    ap.add_argument("--quality", choices=["low","medium","high"], default="medium")
    ap.add_argument("--keep-mp4", action="store_true")
    args = ap.parse_args()

    if not has_ffmpeg():
        print("ffmpeg not found on PATH.", file=sys.stderr); sys.exit(2)

    start_s = parse_time(args.start); end_s = parse_time(args.end)
    out_base = Path(args.output).expanduser().resolve()
    url = canonical_watch_url(args.url)

    with tempfile.TemporaryDirectory() as td:
        td = Path(td)
        print("Downloading with yt-dlp…")
        src = download_with_ytdlp(url, td)
        print(f"Downloaded: {src.name}")
        print(f"Encoding MP4 + WebM at {args.quality} quality…")
        make_videos(src, start_s, end_s, out_base,
                    width=args.width, fps=args.fps,
                    speed=args.speed, quality=args.quality)
        print(f"Done: {out_base.with_suffix('.mp4')} and {out_base.with_suffix('.webm')}")
        if args.keep_mp4:
            kept = Path.cwd() / src.name
            src.replace(kept)
            print(f"Kept source MP4 at: {kept}")

if __name__ == "__main__":
    main()




