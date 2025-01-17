import type { Metadata } from "next";

import "./globals.scss";
import "./styles.scss";
import { pretendard } from "@font";
import { ModalContextProvider } from "@contexts/ModalContext";
import GA from "@utils/GA";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://strongerdeer.github.io/"
  ),
  title: "강혜진 | 프론트엔드 개발자",
  description:
    "0.3초의 짧은 인터랙션, 디테일한 사용자 경험을 고민하는 강혜진 개발자입니다.",

  icons: { icon: "/strongerDeer/favicon.ico" },
  openGraph: {
    type: "website",
    title: "강혜진 | 프론트엔드 개발자",
    description:
      "0.3초의 짧은 인터랙션, 디테일한 사용자 경험을 고민하는 강혜진 개발자입니다.",
    locale: "ko_KR",
    siteName: "강혜진 | 프론트엔드 개발자",
    images: ["/strongerDeer/og-image.jpg"],
  },
  twitter: {
    card: "summary",
    title: "강혜진 | 프론트엔드 개발자",
    description:
      "0.3초의 짧은 인터랙션, 디테일한 사용자 경험을 고민하는 강혜진 개발자입니다.",
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
