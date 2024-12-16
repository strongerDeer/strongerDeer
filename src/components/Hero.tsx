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
            className={`code ${nanumCoding.className}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="text-primary">{`<strong>`}</span>
            <wbr />
            <span className="font-bold">De</span>
            {`{`}
            <span className="text-point">sign</span>
            ||
            <span className="text-point">velop</span>
            {`}`}
            <span className="font-bold">er</span>
            <wbr />
            <span className="text-primary">{`<strong>`}</span>
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
            className="text-3xl leading-snug font-thin"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <span className=" border-b border-gray-500">
              0.3초의 짧은 인터랙션,
            </span>
            <br />
            디테일한 사용자 경험을 고민하는
            <br />
            <strong>강혜진</strong> 개발자입니다.
          </motion.p>
        </motion.section>
      </AnimatePresence>
    </div>
  );
}
