from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parent
files = sorted((root / "frames").glob("*.png"))
assert len(files) == 32, f"Expected 32 frames; found {len(files)}"
frames = [Image.open(f).convert("RGB") for f in files]
palette = frames[0].quantize(colors=96)
frames = [f.quantize(palette=palette, dither=Image.Dither.NONE) for f in frames]
frames[0].save(root.parent / "embedded-banner.gif", save_all=True,
               append_images=frames[1:], duration=125, loop=0,
               optimize=True, disposal=1)
