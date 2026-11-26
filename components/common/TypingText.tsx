'use client';

import { useEffect, useRef, useState } from 'react';

import { prefersReducedMotion } from '@/lib/motion';

const TYPE_INTERVAL = 70; // 한 글자 치는 간격(ms). 첫 화면 인트로 타이핑과 같은 속도
const START_VISIBLE_RATIO = 0.6; // 문장이 60% 이상 보이면 치기 시작

type TypingTextProps = {
  text: string;
};

// 화면에 들어오면 한 글자씩 쳐지는 글자 (한 번만)
// 아직 안 친 글자도 invisible로 자리를 잡아 두어서, 치는 동안 줄바꿈이 흔들리지 않는다
export function TypingText({ text }: TypingTextProps) {
  const chars = [...text];
  const [started, setStarted] = useState(false);
  const [typed, setTyped] = useState(0);
  const done = typed >= chars.length;
  const rootRef = useRef<HTMLSpanElement>(null);

  // 1. 화면에 충분히 보이면 시작 신호. 한 번 시작하면 더 볼 필요가 없어서 관찰을 끊는다
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setStarted(true);
        observer.disconnect();
      },
      { threshold: START_VISIBLE_RATIO }
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  // 2. 시작했으면 한 글자씩 (동작 줄이기 설정이면 한 번에 전부)
  useEffect(() => {
    if (!started || done) return;
    const reduce = prefersReducedMotion();
    const timer = setTimeout(
      () => setTyped(reduce ? chars.length : (n) => n + 1),
      reduce ? 0 : TYPE_INTERVAL
    );
    return () => clearTimeout(timer);
  }, [started, typed, done, chars.length]);

  return (
    <span ref={rootRef}>
      {/* 스크린 리더는 처음부터 문장 전체를 읽는다 */}
      <span className='sr-only'>{text}</span>
      <span aria-hidden='true'>
        {chars.map((char, index) => {
          const isTyped = index < typed;
          const caretBefore = index === 0 && typed === 0; // 아직 한 글자도 안 쳤으면 맨 앞
          const caretAfter = index === typed - 1; // 마지막으로 친 글자 바로 뒤
          return (
            // 커서가 붙은 글자만 nowrap으로 묶어 커서 혼자 다음 줄로 떨어지지 않게 한다
            // (모든 글자에 걸면 띄어쓰기에서도 줄바꿈이 막혀 문장이 한 줄로 늘어난다)
            <span
              key={index}
              className={caretAfter ? 'whitespace-nowrap' : undefined}
            >
              {caretBefore && <Caret />}
              <span className={isTyped ? '' : 'invisible'}>{char}</span>
              {caretAfter && <Caret />}
            </span>
          );
        })}
      </span>
    </span>
  );
}

// 자리를 차지하지 않는 커서 (폭 0인 상자 안에 절대 위치로 띄운다)
function Caret() {
  return (
    <span className='relative'>
      <span className='absolute top-[0.15em] -left-px h-[1em] w-[0.06em] animate-blink bg-accent' />
    </span>
  );
}
