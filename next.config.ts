import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    agentFeedback: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },

  // 빌드 결과 정적 html로 (Github Pages 용)
  output: "export",
  // GitHub Pages는 서버 없는 정적 호스팅이라, 서버가 필요한 PPR 계열 기능은 끈다.
  // 켜 두면 `output: "export"` 빌드가 실패함 (PPR cannot be enabled in export mode)
  // partialPrefetching은 cacheComponents에 의존해서 같이 끔
  cacheComponents: false,
  partialPrefetching: false,

  // 이미지 자동 최적화 끄기
  images: { unoptimized: true },

  basePath: "/strongerDeer",
};

export default nextConfig;
