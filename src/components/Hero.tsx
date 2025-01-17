"use client";
import { nanumCoding } from "@font";
import Logo from "./shared/Logo";
import { AnimatePresence, motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="wrap">
      <AnimatePresence mode="wait">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className={`code ${nanumCoding.className} `}
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
            <span className="text-primaryA11y">{`<strong>`}</span>
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
              0.3초의 짧은 인터랙션,
            </span>
            <br />
            디테일한 사용자 경험을 고민하는
            <br />
            <strong>강혜진</strong> 개발자입니다.
          </motion.p>
          <motion.div
            className="text-lg font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <h4 className="font-bold mt-4">
              디자인 역량과 개발 스킬을 겸비한 UX 전문 개발자
            </h4>
            <p>
              웹 디자이너 및 퍼블리셔로 일하면서 UX 개선의 한계를 느꼈기에,
              프론트엔드 개발 역량을 확장하여 기술로 보다 나은 사용자 경험을
              구현하고자 합니다.
            </p>
            <p>
              사용자 경험에 대한 깊이 있는 이해를 바탕으로 프론트엔드 개발, 성능
              최적화, 디자인 시스템 구축 등 다양한 영역의 경험을 쌓아왔습니다.{" "}
            </p>
            <p>
              웹 표준, 접근성, 반응형 등의 기술을 활용하여 완성도 높은
              프로젝트를 수행할 수 있습니다.
            </p>
          </motion.div>
        </motion.section>
      </AnimatePresence>
    </div>
  );
}
