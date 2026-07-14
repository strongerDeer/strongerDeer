"use client";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { HERO_KEYWORDS } from "@data/introduce";

import Logo from "./shared/Logo";

const Hero = () => {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = (delay: number) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.3, delay },
        };

  return (
    <div className="wrap" id="hero">
      <AnimatePresence mode="wait">
        <motion.section
          {...(shouldReduceMotion
            ? {}
            : {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -20 },
                transition: { duration: 0.3 },
              })}
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
          <motion.p
            className="text-2xl leading-snug font-normal sm:text-3xl"
            {...fadeUp(0.4)}
          >
            <span className="border-b border-gray-500">
              0.1초의 피드백을
              <br />
              데이터로 증명하는
            </span>
            <br />
            <strong>강혜진</strong> 개발자입니다.
          </motion.p>
          <motion.p
            className="mt-6 w-full text-base sm:text-lg leading-relaxed text-gray-700 font-normal text-balance break-keep"
            {...fadeUp(0.5)}
          >
            0.1초의 빠른 반응부터 복잡한 상태의 명확한 안내까지, 사용자가
            머뭇거리는 지점을 줄입니다.
            <br /> 상품 탐색·주문/클레임·운영 어드민의 흐름을 이해하기 쉬운 UI로
            정리하고, 성능·SEO·행동 데이터로 개선 효과를 검증합니다.
          </motion.p>
          <motion.ul
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8"
            {...fadeUp(0.6)}
          >
            {HERO_KEYWORDS.map(({ title, description, icon: Icon }) => (
              <li
                key={title}
                className="flex flex-col gap-2 p-4 rounded-xl border border-gray-150"
              >
                <Icon className="w-5 h-5 text-point" />
                <strong className="text-base">{title}</strong>
                <p className="text-sm text-balance break-keep text-gray-600 font-normal leading-relaxed">
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
