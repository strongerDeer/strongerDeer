import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/strongerDeer",
  assetPrefix: "/strongerDeer/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
