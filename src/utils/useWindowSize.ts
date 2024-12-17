"use client";
import { useEffect, useState } from "react";

interface WindowSize {
  width: number;
  height: number;
}

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

export default function useWindowSize() {
  // 초기 상태를 null로 설정
  const [windowSize, setWindowSize] = useState<WindowSize | null>(null);

  useEffect(() => {
    // 컴포넌트 마운트 시 즉시 크기 설정
    setWindowSize(getWindowSize());

    function handleResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // windowSize가 null이면 기본값 반환
  return windowSize || getWindowSize();
}
