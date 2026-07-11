import type { Metadata } from "next";

import "./globals.scss";
import "./styles.scss";
import { pretendard } from "@font";
import { ModalContextProvider } from "@contexts/ModalContext";
import GA from "@utils/GA";

const SITE_TITLE = "강혜진 | 프론트엔드 개발자";
const SITE_DESCRIPTION =
  "0.1초의 피드백을 데이터로 증명하는 강혜진 개발자입니다. 사용자가 머뭇거리는 순간을 지표로 찾아 줄입니다.";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://strongerdeer.github.io/"
  ),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,

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
        <ModalContextProvider>{children}</ModalContextProvider>
        <GA />
      </body>
    </html>
  );
}
