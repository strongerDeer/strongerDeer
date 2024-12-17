import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/strongerDeer",
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
