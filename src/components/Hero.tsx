"use client";
import Logo from "./shared/Logo";
import { AnimatePresence, motion } from "framer-motion";
import { HERO_KEYWORDS } from "@data/introduce";

export default function Hero() {
  return (
    <div className="wrap" id="hero">
      <AnimatePresence mode="wait">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="code font-mono"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Logo className="text-6xl sm:text-8xl md:text-9xl" />
          </motion.div>
          <motion.p
            className="text-xl mt-10 mb-4 font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            👋 안녕하세요
          </motion.p>
          <motion.p
            className="text-2xl leading-snug font-thin sm:text-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
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
            className="mt-6 max-w-3xl text-base sm:text-lg leading-relaxed text-gray-600 font-light text-balance break-keep"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            0.1초는 사용자가 화면의 반응을 즉각적이라고 느끼는 기준입니다.
            커머스의 상품 탐색, 주문/클레임, 운영 어드민처럼 상태가 복잡한
            화면을 사용자가 이해하기 쉬운 흐름으로 정리하고, 성능·SEO·이벤트
            지표로 개선 결과를 확인합니다.
          </motion.p>
          <motion.ul
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            {HERO_KEYWORDS.map(({ title, description, icon: Icon }) => (
              <li
                key={title}
                className="flex flex-col gap-2 p-4 rounded-xl border border-gray-150"
              >
                <Icon className="w-5 h-5 text-point" />
                <strong className="text-base">{title}</strong>
                <p className="text-sm text-balance break-keep text-gray-500 font-light leading-relaxed">
                  {description}
                </p>
              </li>
            ))}
          </motion.ul>
        </motion.section>
      </AnimatePresence>
    </div>
  );
}
