import './globals.css';

import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { Footer } from '@/components/common/Footer';
import { Header } from '@/components/common/Header';

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  weight: '45 920',
  display: 'swap',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: '강혜진 | 프론트엔드 개발자',
  description: '사용자가 머뭇거리는 0.1초가 궁금한 프론트엔드 개발자',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang='ko' className={`${pretendard.variable} h-full antialiased`}>
      <body className='flex min-h-full flex-col'>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
