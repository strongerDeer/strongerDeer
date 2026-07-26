import { HERO_KEYWORDS } from "@data/introduce";

import Logo from "./shared/Logo";

// Framer Motion 을 걷어냈다. initial={false} 라 진입 모션이 없었고,
// AnimatePresence 안의 section 은 언마운트될 일이 없어 exit 도 발동하지 않았다.
// 즉 화면상 아무 효과가 없으면서 번들만 차지했다.
const Hero = () => {
  return (
    <div className="wrap" id="hero">
      <section>
        <div className="code font-mono">
          <span className="text-primaryA11y">{`<strong>`}</span>
          <wbr />
          <span className="font-bold">De</span>
          {`{`}
          <span className="text-point">sign</span>
          ||
          <span className="text-point">velop</span>
          {`}`}
          <span className="font-bold">er</span>
          <wbr />
          <span className="text-primaryA11y">{`</strong>`}</span>
        </div>

        <div>
          <Logo className="text-[clamp(2.75rem,10vw,8rem)] leading-none" />
        </div>
        <p className="text-xl mt-10 mb-4 font-medium">👋 안녕하세요</p>
        <h1
          id="hero-heading"
          tabIndex={-1}
          className="skipTarget text-2xl leading-snug font-normal sm:text-3xl"
        >
          <span className="border-b border-ink-faint">
            사용자가 머뭇거리는
            <br />
            0.1초를 찾아 줄이는
          </span>
          <br />
          <strong>강혜진</strong> 개발자입니다.
        </h1>
        <p className="mt-6 w-full text-base sm:text-lg leading-relaxed text-ink-body font-normal text-balance break-keep">
          상품 탐색부터 주문·클레임, 운영 도구까지 구축하고
          <br />
          사용자 행동과 성능 데이터로 개선 결과를 확인합니다
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mt-6">
          {HERO_KEYWORDS.map(({ title, description, icon: Icon }) => (
            <li
              key={title}
              className="flex flex-col gap-1.5 p-3 rounded-xl border border-line"
            >
              <Icon className="w-5 h-5 text-point" />
              <strong className="text-sm sm:text-base">{title}</strong>
              <p className="text-xs sm:text-sm text-balance break-keep text-ink-soft font-normal leading-relaxed">
                {description}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Hero;
