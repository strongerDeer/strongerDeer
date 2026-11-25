'use client';

import { useEffect, useState } from 'react';

import { prefersReducedMotion } from '@/lib/motion';

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

export function Hero() {
  const [typed, setTyped] = useState(0);
  const done = typed >= TOTAL;

  useEffect(() => {
    if (done) return;
    const reduce = prefersReducedMotion();
    const timer = setTimeout(
      () => setTyped(reduce ? TOTAL : (n) => n + 1),
      reduce ? 0 : TYPE_INTERVAL
    );
    return () => clearTimeout(timer);
  }, [typed, done]);

  return (
    <section id='hero' aria-label='소개' className='px-4 text-center'>
      <div className='flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center gap-6'>
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
          className={`flex flex-col items-center justify-center gap-2 transition duration-600 sm:flex-row ${
            done ? 'opacity-100' : 'translate-y-2.5 opacity-0'
          }`}
        >
          {CAREERS.map(({ role, text }, index) => (
            <span key={role} className='contents'>
              {index > 0 && (
                <span
                  aria-hidden='true'
                  className='font-mono font-bold text-accent'
                >
                  ||
                </span>
              )}
              <span className='rounded-full border border-line bg-background-card px-3.5 py-1.5 text-sm text-foreground-muted'>
                <b className='text-foreground'>{role}</b> {text}
              </span>
            </span>
          ))}
        </div>

        <p className='text-sm'>
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
