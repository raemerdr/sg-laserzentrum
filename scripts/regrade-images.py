"""
Regrade the placeholder photography from the old sage palette to warm stone.

Only pixels in the green/teal hue band are moved (to a nude/stone hue with
calmer saturation), so skin tones, wood and cream fabrics are left alone.
A light global desaturation keeps everything inside the black/white/nude
brand palette.

    python3 scripts/regrade-images.py <source-dir> public/images

The ungraded sage originals are in git history (commit fc2cc91), e.g.
    mkdir -p /tmp/sg-originals && for f in public/images/*.jpg; do
      git show "fc2cc91:$f" > "/tmp/sg-originals/$(basename "$f")"; done

Requires Pillow and numpy.
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image

TARGET_HUE = 30 / 360  # warm nude / stone
GREEN_SAT = 0.72       # saturation kept on former greens
GLOBAL_SAT = 0.84      # overall saturation after the hue move


def rgb_to_hsv(rgb):
    r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
    maxc = rgb.max(axis=-1)
    minc = rgb.min(axis=-1)
    delta = maxc - minc
    safe = np.maximum(delta, 1e-6)
    s = np.where(maxc > 0, delta / np.maximum(maxc, 1e-6), 0)
    rc, gc, bc = (maxc - r) / safe, (maxc - g) / safe, (maxc - b) / safe
    h = np.where(r == maxc, bc - gc, np.where(g == maxc, 2.0 + rc - bc, 4.0 + gc - rc))
    h = np.where(delta > 0, (h / 6.0) % 1.0, 0)
    return np.stack([h, s, maxc], axis=-1)


def hsv_to_rgb(hsv):
    h, s, v = hsv[..., 0], hsv[..., 1], hsv[..., 2]
    i = np.floor(h * 6.0).astype(int) % 6
    f = h * 6.0 - np.floor(h * 6.0)
    p, q, t = v * (1 - s), v * (1 - s * f), v * (1 - s * (1 - f))
    r = np.choose(i, [v, q, p, p, t, v])
    g = np.choose(i, [t, v, v, q, p, p])
    b = np.choose(i, [p, p, t, v, v, q])
    return np.stack([r, g, b], axis=-1)


def regrade(src: Path, dst: Path):
    img = Image.open(src).convert("RGB")
    a = np.asarray(img).astype(np.float32) / 255.0
    h, s, v = np.moveaxis(rgb_to_hsv(a), -1, 0)
    deg = h * 360
    # 1 inside the green/teal band, feathered at both ends
    w = np.clip((deg - 45) / 15, 0, 1) * np.clip((220 - deg) / 20, 0, 1)
    h2 = h * (1 - w) + TARGET_HUE * w
    s2 = s * (1 - w) + s * GREEN_SAT * w
    out = hsv_to_rgb(np.stack([h2, s2, v], axis=-1))
    lum = (0.2126 * out[..., 0] + 0.7152 * out[..., 1] + 0.0722 * out[..., 2])[..., None]
    out = lum + (out - lum) * GLOBAL_SAT
    Image.fromarray((np.clip(out, 0, 1) * 255).round().astype(np.uint8)).save(dst, quality=88, optimize=True, progressive=True)


if __name__ == "__main__":
    src_dir, dst_dir = Path(sys.argv[1]), Path(sys.argv[2])
    for f in sorted(src_dir.glob("*.jpg")):
        regrade(f, dst_dir / f.name)
        print("regraded", f.name)
