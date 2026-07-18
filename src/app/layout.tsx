import type { Metadata } from "next";

import "./globals.scss";
import "./styles.scss";
import { pretendard } from "@font";
import GA from "@utils/GA";

const SITE_TITLE = "강혜진 | 프론트엔드 개발자";
const SITE_DESCRIPTION =
  "사용자가 머뭇거리는 0.1초를 찾아 줄이는 프론트엔드 개발자 강혜진입니다. Product UI를 설계하고 성능·SEO·행동 데이터로 개선을 검증합니다.";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://strongerdeer.github.io/"
  ),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },

  openGraph: {
    type: "website",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "ko_KR",
    siteName: SITE_TITLE,
    images: ["/strongerDeer/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/strongerDeer/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko-KR" className={pretendard.variable}>
      <body>
        {children}
        <GA />
      </body>
    </html>
  );
}
