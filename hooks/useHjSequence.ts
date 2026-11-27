import { useEffect, useRef, useState } from 'react';

import type { HjFace } from '@/components/sections/demoSections/HjFigure';
import { prefersReducedMotion } from '@/lib/motion';

// 코딩하다 → 아이디어 번쩍 → 노래 들으며 둠칫둠칫, 다시 처음으로
const HJ_SEQUENCE: { face: HjFace; durationMs: number; caption: string }[] = [
  { face: 'focus', durationMs: 2200, caption: '코딩 중…' },
  { face: 'idea', durationMs: 1300, caption: '앗, 아이디어!' },
  { face: 'smile', durationMs: 3200, caption: '둠칫둠칫 ♪' },
];

// 그림이 40% 이상 보일 때만 돌린다 (안 보일 땐 타이머를 멈춰 둔다)
const VISIBLE_THRESHOLD = 0.4;

export function useHjSequence<T extends Element>() {
  const targetRef = useRef<T>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // 1) 화면에 보이는지 지켜본다. 다시 보이면 처음 표정부터
  useEffect(() => {
    const target = targetRef.current;
    if (!target || prefersReducedMotion()) return; // '동작 줄이기'면 첫 표정 그대로

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) setStepIndex(0);
      },
      { threshold: VISIBLE_THRESHOLD }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  // 2) 보이는 동안, 지금 표정의 시간이 지나면 다음 표정으로
  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      setStepIndex((index) => (index + 1) % HJ_SEQUENCE.length);
    }, HJ_SEQUENCE[stepIndex].durationMs);
    return () => clearTimeout(timer);
  }, [isVisible, stepIndex]);

  function restart() {
    setStepIndex(0);
  }

  const { face, caption } = HJ_SEQUENCE[stepIndex];
  return { targetRef, face, caption, restart };
}
