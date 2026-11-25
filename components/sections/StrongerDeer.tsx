'use client';

import { useRef } from 'react';

import { ButtonLink } from '@/components/common/ButtonLink';
import { useScrollFrame } from '@/hooks/useScrollFrame';
import { clamp01, introDarkness, segment, type Timing } from '@/lib/motion';

// stronger는 글자마다 200 → 900 계단, Deer는 900
const LETTERS = [...'strongerDeer'].map((char, index) => ({
  char,
  weight: index < 8 ? 200 + index * 100 : 900,
}));
const MIN_WEIGHT = 200;
const MAX_WEIGHT = 900;

// 이름 장면 시간표 (progress 0 ~ 1 기준)
const SWAP_TIMING: Timing = { start: 0.1, end: 0.45 }; // 해 → 혜
const GROW_TIMING: Timing = { start: 0.2, end: 0.8 }; // 글자 굵어짐
// 바뀔 때 위아래로 움직이는 거리(px)
const NAME_SLIDE_PX = 12;
const LITTLE_BY_LITTLE_SLIDE_PX = 8; // '조금씩'은 글자가 작아서 덜 움직임

// 헤더가 다시 밝아지는 구간: 밝은 이 장면 윗변이 헤더 아래선 48px 위까지 오면 시작해서, 아래선에 닿으면 끝
const HEADER_BRIGHTEN_PX = 48;

export function StrongerDeer() {
  const sectionRef = useRef<HTMLElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const haeRef = useRef<HTMLSpanElement>(null);
  const hyeRef = useRef<HTMLSpanElement>(null);
  const littleByLittleRef = useRef<HTMLSpanElement>(null);
  const weightRef = useRef<HTMLElement>(null);

  // 진행률(0 ~ 1)을 받아 화면에 그린다
  const paint = (progress: number) => {
    const swap = segment(progress, SWAP_TIMING);
    const grow = segment(progress, GROW_TIMING);

    // 해·'조금씩'은 위로 사라지고, 혜는 아래에서 올라온다
    const move = (el: HTMLElement | null, opacity: number, y: number) => {
      if (!el) return;
      el.style.opacity = String(opacity);
      el.style.transform = `translateY(${y}px)`;
    };
    move(haeRef.current, 1 - swap, -NAME_SLIDE_PX * swap);
    move(
      littleByLittleRef.current,
      1 - swap,
      -LITTLE_BY_LITTLE_SLIDE_PX * swap
    );
    move(hyeRef.current, swap, NAME_SLIDE_PX * (1 - swap));

    // 글자마다 목표 굵기가 달라서, 200에서 각자 목표까지 grow 비율만큼
    letterRefs.current.forEach((el, index) => {
      if (!el) return;
      const target = LETTERS[index].weight;
      el.style.fontWeight = String(
        Math.round(MIN_WEIGHT + (target - MIN_WEIGHT) * grow)
      );
    });

    if (weightRef.current) {
      weightRef.current.textContent = String(
        Math.round(MIN_WEIGHT + (MAX_WEIGHT - MIN_WEIGHT) * grow)
      );
    }
  };

  // 헤더: 인트로를 따라 어두워졌다가, 밝은 이 장면이 헤더에 닿기 직전부터 다시 밝아진다
  const paintHeader = (sectionTop: number) => {
    // 헤더 아래선 = 헤더 높이 (--header-h, sticky라 항상 화면 맨 위에 있음)
    const headerBottom = document.querySelector('header')?.offsetHeight ?? 0;
    const distanceToHeader = sectionTop - headerBottom;
    const brighten = clamp01(1 - distanceToHeader / HEADER_BRIGHTEN_PX);
    const headerDarkness =
      introDarkness(window.scrollY, window.innerHeight) * (1 - brighten);
    document.documentElement.style.setProperty(
      '--header-dark',
      headerDarkness.toFixed(3)
    );
  };

  useScrollFrame(() => {
    const section = sectionRef.current;
    if (!section) return;

    const sectionTop = section.getBoundingClientRect().top;
    paintHeader(sectionTop);

    // 무대가 화면에 붙어 있는 거리 = 섹션 높이 - 화면 높이
    const stickyDistance = section.offsetHeight - window.innerHeight;
    if (stickyDistance <= 0) return;

    // 섹션 윗변이 화면 위로 올라간 만큼 = 지나간 거리
    const passed = -sectionTop;
    paint(clamp01(passed / stickyDistance));
  });

  return (
    <section
      ref={sectionRef}
      id='stronger-deer'
      aria-labelledby='hero-title'
      className='relative z-10 mt-[-100svh] h-[240svh] bg-background text-center motion-reduce:mt-0 motion-reduce:h-auto'
    >
      <div className='sticky top-(--header-h) flex h-[calc(100svh-var(--header-h))] flex-col items-center justify-center gap-5 px-4 py-10 motion-reduce:static'>
        <p className='text-[clamp(28px,6vw,48px)] tracking-tight'>
          <span className='sr-only'>strongerDeer</span>
          <span aria-hidden='true'>
            {LETTERS.map(({ char }, index) => (
              <span
                key={index}
                ref={(el) => {
                  letterRefs.current[index] = el;
                }}
                style={{ fontWeight: MIN_WEIGHT }}
              >
                {char}
              </span>
            ))}
          </span>
        </p>
        <h1
          id='hero-title'
          aria-label='조금씩 강해진 개발자, 강혜진입니다.'
          className='flex flex-col items-center text-[clamp(44px,10vw,104px)] leading-[1.1] font-black tracking-[-0.04em]'
        >
          <span
            ref={littleByLittleRef}
            aria-hidden='true'
            className='text-[0.45em] font-bold tracking-[-0.02em] text-foreground-muted'
          >
            조금씩
          </span>
          <span aria-hidden='true'>
            강{/* 해와 혜를 같은 칸에 겹쳐 두고 투명도로 바꾼다 */}
            <span className='inline-grid'>
              <span ref={haeRef} className='[grid-area:1/1]'>
                해
              </span>
              <span
                ref={hyeRef}
                className='text-accent opacity-0 [grid-area:1/1]'
              >
                혜
              </span>
            </span>
            진 개발자.
          </span>
        </h1>
        <div className='mt-2 flex flex-wrap justify-center gap-2.5'>
          <ButtonLink href='#balance-game' variant='solid'>
            밸런스 게임 시작
          </ButtonLink>
          <ButtonLink href='#shop'>장바구니 담으러 가기</ButtonLink>
        </div>
        <span
          aria-hidden='true'
          className='absolute inset-x-0 bottom-[8%] font-mono text-sm text-foreground-muted tabular-nums'
        >
          font-weight:{' '}
          <b ref={weightRef} className='text-foreground'>
            200
          </b>
          ;
        </span>
      </div>
    </section>
  );
}
