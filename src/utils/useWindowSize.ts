"use client";
import { useEffect, useState } from "react";

type WindowSize = {
  width: number;
  height: number;
};

const getWindowSize = (): WindowSize => {
  const defaultSize = { width: 1200, height: 1200 };

  if (typeof window === "undefined") {
    return defaultSize;
  }

  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
};

const useWindowSize = () => {
  // 초기 상태를 null로 설정
  const [windowSize, setWindowSize] = useState<WindowSize | null>(null);

  useEffect(() => {
    function handleResize() {
      setWindowSize(getWindowSize());
    }

    const initialFrame = window.requestAnimationFrame(handleResize);
    window.addEventListener("resize", handleResize);
    return () => {
      window.cancelAnimationFrame(initialFrame);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // windowSize가 null이면 기본값 반환
  return windowSize || getWindowSize();
};

export default useWindowSize;
