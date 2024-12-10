import localFont from "next/font/local";
import { Raleway, Nanum_Gothic_Coding } from "next/font/google";

export const raleway = Raleway({ subsets: ["latin"] });

export const nanumCoding = Nanum_Gothic_Coding({
  weight: ["400", "700"],
  preload: true,
  subsets: ["latin"],
});

export const pretendard = localFont({
  src: "./PretendardVariable.woff2",
  display: "swap",
  preload: true,
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