import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Assets are pre-compressed; skip sharp optimization (OOM on this machine)
  images: { unoptimized: true },
};

export default nextConfig;
