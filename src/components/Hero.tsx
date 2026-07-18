"use client";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { HERO_KEYWORDS } from "@data/introduce";

import Logo from "./shared/Logo";

const Hero = () => {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = (delay: number) =>
    shouldReduceMotion
      ? {}
      : {
          initial: false as const,
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.3, delay },
        };

  return (
    <div className="wrap" id="hero">
      <AnimatePresence mode="wait">
        <motion.section
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -20 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div className="code font-mono" {...fadeUp(0.1)}>
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
          </motion.div>

          <motion.div {...fadeUp(0.2)}>
            <Logo className="text-[clamp(2.75rem,10vw,8rem)] leading-none" />
          </motion.div>
          <motion.p className="text-xl mt-10 mb-4 font-medium" {...fadeUp(0.3)}>
            👋 안녕하세요
          </motion.p>
          <motion.h1
            className="text-2xl leading-snug font-normal sm:text-3xl"
            {...fadeUp(0.4)}
          >
            <span className="border-b border-gray-500">
              사용자가 머뭇거리는
              <br />
              0.1초를 제품의 규칙으로 줄이는
            </span>
            <br />
            <strong>강혜진</strong> 개발자입니다.
          </motion.h1>
          <motion.p
            className="mt-6 w-full text-base sm:text-lg leading-relaxed text-gray-700 font-normal text-balance break-keep"
            {...fadeUp(0.5)}
          >
            7년 7개월의 디자인·웹퍼블리싱 경험과 React·TypeScript 구현력을
            바탕으로, 반응형·키보드·로딩·접근성 기준을 공통 컴포넌트에
            담습니다.
            <br /> Figma의 디자인 규칙을 토큰과 타입으로 연결하고,
            Storybook·테스트·문서화로 좋은 UX가 제품에서 일관되게 구현되는
            환경을 만듭니다.
          </motion.p>
          <motion.div {...fadeUp(0.6)}>
            <Link
              href="/nds"
              className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full bg-point px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-[1.02]"
            >
              NDS 설계·운영 과정 보기
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
          <motion.ul
            className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mt-6"
            {...fadeUp(0.6)}
          >
            {HERO_KEYWORDS.map(({ title, description, icon: Icon }) => (
              <li
                key={title}
                className="flex flex-col gap-1.5 p-3 rounded-xl border border-gray-150"
              >
                <Icon className="w-5 h-5 text-point" />
                <strong className="text-sm sm:text-base">{title}</strong>
                <p className="text-xs sm:text-sm text-balance break-keep text-gray-600 font-normal leading-relaxed">
                  {description}
                </p>
              </li>
            ))}
          </motion.ul>
        </motion.section>
      </AnimatePresence>
    </div>
  );
};

export default Hero;
