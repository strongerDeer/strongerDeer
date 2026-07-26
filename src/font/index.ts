import localFont from "next/font/local";

// 원본(PretendardVariable.woff2, 2MB)이 아니라 서브셋을 쓴다.
// 서브셋은 scripts/subset-font.mjs 가 predev/prebuild 에서 매번 생성하며 git 에 올리지 않는다.
export const pretendard = localFont({
  src: "./PretendardVariable.subset.woff2",
  display: "swap",
  weight: "100 900",
  fallback: [
    "-apple-system",
    "BlinkMacSystemFont",
    "system-ui",
    "Roboto",
    "Helvetica Neue",
    "Segoe UI",
    "Arial",
    "sans-serif",
  ],
  adjustFontFallback: "Arial",
  variable: "--font-pretendard",
});
