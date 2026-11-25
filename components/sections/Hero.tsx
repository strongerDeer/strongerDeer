'use client';

import { useEffect, useRef, useState } from 'react';

import { useScrollFrame } from '@/hooks/useScrollFrame';
import {
  ease,
  introDarkness,
  prefersReducedMotion,
  segment,
  type Timing,
} from '@/lib/motion';

const CAREERS = [
  { role: 'Designer', text: '디자인·퍼블리싱 7년 7개월' },
  { role: 'Developer', text: '프론트엔드 3년 11개월' },
];

type Tone = 'tag' | 'word' | 'accent';
const CODE_LINES: { text: string; tone: Tone }[][] = [
  [{ text: '<strong>', tone: 'tag' }],
  [
    { text: 'De', tone: 'word' },
    { text: '{sign||velop}', tone: 'accent' },
    { text: 'er', tone: 'word' },
  ],
  [{ text: '</strong>', tone: 'tag' }],
];
const TONE_CLASS: Record<Tone, string> = {
  tag: 'text-foreground-muted',
  word: '',
  accent: 'text-accent',
};

// 줄마다 [글자, 톤, 전체 순번]
const LINES = (() => {
  let index = 0;
  return CODE_LINES.map((parts) =>
    parts.flatMap(({ text, tone }) =>
      [...text].map((char) => ({ char, tone, index: index++ }))
    )
  );
})();
const TOTAL = LINES.flat().length;
const TYPE_INTERVAL = 70;

// 인트로 시간표 (스크롤한 화면 수 기준: 1 = 화면 높이만큼 내림)
const HINT_FADE_TIMING: Timing = { start: 0, end: 0.15 }; // '스크롤'·'||' 사라짐
const PILL_MEET_TIMING: Timing = { start: 0.05, end: 0.4 }; // 알약이 가운데로 모임
const PILL_SINK_TIMING: Timing = { start: 0.35, end: 0.65 }; // 모인 알약이 가라앉으며 사라짐
const PILL_SINK_PX = 90; // 가라앉는 거리
const PILL_SINK_SCALE = 0.15; // 가라앉으며 줄어드는 비율

type Offset = { x: number; y: number };

export function Hero() {
  const [typed, setTyped] = useState(0);
  const done = typed >= TOTAL;

  const careersRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const orRef = useRef<HTMLSpanElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);
  // 알약마다 '가운데까지 거리'. 한 번 재고 저장해 둔다
  const pillOffsets = useRef<Offset[] | null>(null);

  useEffect(() => {
    if (done) return;
    const reduce = prefersReducedMotion();
    const timer = setTimeout(
      () => setTyped(reduce ? TOTAL : (n) => n + 1),
      reduce ? 0 : TYPE_INTERVAL
    );
    return () => clearTimeout(timer);
  }, [typed, done]);

  // 알약마다 '묶음 가운데까지 거리'를 잰다
  // 움직이는 중이면 transform 때문에 위치가 틀어지므로, 잠깐 지우고 잰 뒤 되돌린다
  const measurePillOffsets = (): Offset[] | null => {
    const careers = careersRef.current;
    const pills = pillRefs.current;
    if (!careers) return null;

    const savedTransforms = pills.map((pill) => pill?.style.transform ?? '');
    pills.forEach((pill) => {
      if (pill) pill.style.transform = '';
    });

    const box = careers.getBoundingClientRect();
    const centerX = box.left + box.width / 2;
    const centerY = box.top + box.height / 2;
    const offsets = pills.map((pill) => {
      if (!pill) return { x: 0, y: 0 };
      const rect = pill.getBoundingClientRect();
      return {
        x: centerX - (rect.left + rect.width / 2),
        y: centerY - (rect.top + rect.height / 2),
      };
    });

    pills.forEach((pill, index) => {
      if (pill) pill.style.transform = savedTransforms[index];
    });
    return offsets;
  };

  useScrollFrame(() => {
    const viewportHeight = window.innerHeight;

    // 스크롤할수록 인트로를 어둡게: CSS 변수 --intro-dark(0 ~ 1)만 바꾸고 색 계산은 CSS가 한다
    const darkness = introDarkness(window.scrollY, viewportHeight);
    document.documentElement.style.setProperty(
      '--intro-dark',
      darkness.toFixed(3)
    );

    const scrolledScreens = window.scrollY / viewportHeight;

    // '스크롤' 안내와 가운데 '||'는 내리자마자 사라진다
    const hintOpacity = String(1 - segment(scrolledScreens, HINT_FADE_TIMING));
    if (hintRef.current) hintRef.current.style.opacity = hintOpacity;
    if (orRef.current) orRef.current.style.opacity = hintOpacity;

    // 알약: 가운데로 모였다가(meet) → 아래로 가라앉으며 사라진다(sink)
    pillOffsets.current ??= measurePillOffsets();
    const offsets = pillOffsets.current;
    if (!offsets) return;

    const meet = ease(segment(scrolledScreens, PILL_MEET_TIMING));
    const sink = segment(scrolledScreens, PILL_SINK_TIMING);
    pillRefs.current.forEach((pill, index) => {
      if (!pill) return;
      const { x, y } = offsets[index];
      const moveX = x * meet;
      const moveY = y * meet + PILL_SINK_PX * ease(sink);
      const scale = 1 - PILL_SINK_SCALE * sink;
      pill.style.transform = `translate(${moveX}px, ${moveY}px) scale(${scale})`;
      pill.style.opacity = String(1 - sink);
    });
  });

  return (
    <section
      id='hero'
      aria-label='소개'
      className='intro-scene -mt-(--header-h) h-[295svh] motion-reduce:mt-0 motion-reduce:h-auto'
    >
      <div className='sticky top-0 flex h-svh flex-col items-center justify-center gap-6 px-4 text-center motion-reduce:static motion-reduce:min-h-[calc(100svh-var(--header-h))]'>
        <p className='font-mono'>
          <span className='sr-only'>De{'{sign||velop}'}er</span>
          <code
            aria-hidden='true'
            className='flex flex-col items-center gap-[0.1em]'
          >
            {LINES.map((line, li) => (
              <span
                key={li}
                className={
                  li === 1
                    ? 'text-[clamp(30px,9.2vw,104px)] leading-tight font-bold tracking-tight'
                    : 'text-[clamp(16px,3.4vw,30px)]'
                }
              >
                {line.map(({ char, tone, index }) => (
                  <span key={index}>
                    {index === typed && <Caret />}
                    <span
                      className={`${TONE_CLASS[tone]} ${index < typed ? '' : 'invisible'}`}
                    >
                      {char}
                    </span>
                    {done && index === TOTAL - 1 && <Caret />}
                  </span>
                ))}
              </span>
            ))}
          </code>
        </p>

        <div
          ref={careersRef}
          className={`flex flex-col items-center justify-center gap-2 transition duration-600 sm:flex-row ${
            done ? 'opacity-100' : 'translate-y-2.5 opacity-0'
          }`}
        >
          {CAREERS.map(({ role, text }, index) => (
            <span key={role} className='contents'>
              {index > 0 && (
                <span
                  ref={orRef}
                  aria-hidden='true'
                  className='font-mono font-bold text-accent'
                >
                  ||
                </span>
              )}
              <span
                ref={(el) => {
                  pillRefs.current[index] = el;
                }}
                className='rounded-full border border-line bg-background-card px-3.5 py-1.5 text-sm text-foreground-muted'
              >
                <b className='text-foreground'>{role}</b> {text}
              </span>
            </span>
          ))}
        </div>

        <p ref={hintRef} className='text-sm'>
          <span aria-hidden='true'>↓ </span>스크롤
        </p>
      </div>
    </section>
  );
}

function Caret() {
  return (
    <span className='relative'>
      <span className='absolute top-[0.1em] -left-px h-[1em] w-[0.08em] animate-blink bg-accent' />
    </span>
  );
}
