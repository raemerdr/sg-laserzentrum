import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Source photography is at most 2400px wide, so never ask the optimizer
    // to upscale past that — a 3840 variant only costs time and bytes.
    deviceSizes: [640, 750, 828, 1080, 1200, 1600, 2048],
    imageSizes: [256, 384, 512],
    // AVIF first: noticeably smaller than WebP for the large photography, which
    // shortens the largest paint on every page; WebP stays as the fallback.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
