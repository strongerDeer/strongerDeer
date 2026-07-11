import localFont from "next/font/local";

export const pretendard = localFont({
  src: "./PretendardVariable.woff2",
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
