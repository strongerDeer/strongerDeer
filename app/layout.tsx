import './globals.css';

import type { Metadata } from 'next';
import { Roboto_Mono } from 'next/font/google';
import localFont from 'next/font/local';

import { Footer } from '@/components/common/Footer';
import { Header } from '@/components/common/Header';
import { SectionDots } from '@/components/common/SectionDots';
import { Toaster } from '@/components/common/Toaster';
import { DISPLAY_SETTINGS_SCRIPT } from '@/lib/displaySettingsScript';

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  weight: '45 920',
  display: 'swap',
  variable: '--font-pretendard',
});

// 인트로 코드 글자용 고정폭 글꼴. 가변 글꼴(100~700)이라 굵기를 부드럽게 바꿀 수 있고,
// 기기마다 다른 기본 고정폭 글꼴(Menlo·Consolas 등) 대신 어디서나 같은 모양으로 보인다
const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
});

export const metadata: Metadata = {
  title: '강혜진 | 프론트엔드 개발자',
  description: '사용자가 머뭇거리는 0.1초가 궁금한 프론트엔드 개발자',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    // 스크립트가 React보다 먼저 data-*를 붙이므로, 서버 HTML과 다르다는 경고를 html에서만 끈다
    <html
      lang='ko'
      suppressHydrationWarning
      className={`${pretendard.variable} ${robotoMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: DISPLAY_SETTINGS_SCRIPT }} />
      </head>
      <body className='flex min-h-full flex-col'>
        <Header />
        <SectionDots />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
