// next/script 는 서버 컴포넌트에서 쓸 수 있다. window.* 는 <Script> 안의
// 문자열이라 이 컴포넌트에서 실행되지 않으므로 "use client" 가 필요 없다.
import Script from "next/script";

const GA = () => {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  if (!gaId) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      ></Script>
      <Script id="google-analytics" strategy="afterInteractive">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
};

export default GA;
