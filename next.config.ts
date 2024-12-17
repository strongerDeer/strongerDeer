import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/strongerDeer",
  assetPrefix: "/strongerDeer",
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
