'use client';

import { type Ref, useEffect, useRef, useState } from 'react';

import { useScrollFrame } from '@/hooks/useScrollFrame';
import {
  ease,
  introDarkness,
  lerp,
  prefersReducedMotion,
  segment,
  type Timing,
} from '@/lib/motion';

const CAREERS = [
  { role: 'Designer', text: '디자인·퍼블리싱 7년 7개월' },
  { role: 'Developer', text: '프론트엔드 3년 11개월' },
];

type Tone = 'tag' | 'word' | 'accent';
// keep: 로고(strongerDeer)에 쓰이는 글자. 나머지는 스크롤하면 떨어져 사라진다
const CODE_LINES: { text: string; tone: Tone; keep?: boolean }[][] = [
  [
    { text: '<', tone: 'tag' },
    { text: 'strong', tone: 'tag', keep: true },
    { text: '>', tone: 'tag' },
  ],
  [
    { text: 'De', tone: 'word', keep: true },
    { text: '{sign||velop}', tone: 'accent' },
    { text: 'er', tone: 'word', keep: true },
  ],
  [{ text: '</strong>', tone: 'tag' }],
];
const TONE_CLASS: Record<Tone, string> = {
  tag: 'text-foreground-muted',
  word: '',
  accent: 'text-accent',
};

// 줄마다 [글자, 톤, 로고에 쓰는지, 몇 번째 줄인지, 전체 순번]
const LINES = (() => {
  let index = 0;
  return CODE_LINES.map((parts, line) =>
    parts.flatMap(({ text, tone, keep = false }) =>
      [...text].map((char) => ({ char, tone, keep, line, index: index++ }))
    )
  );
})();
const ALL_CHARS = LINES.flat();
const TOTAL = ALL_CHARS.length;
const TYPE_INTERVAL = 70;

const TAG_LINE = 0; // 윗줄 (<strong>)
const MAIN_LINE = 1; // 가운데 큰 줄 (De{sign||velop}er)
const MAIN_FONT_SIZE = 'text-[clamp(30px,9.2vw,104px)] leading-tight';

// 인트로 시간표 (스크롤한 화면 수 기준: 1 = 화면 높이만큼 내림)
const HINT_FADE_TIMING: Timing = { start: 0, end: 0.15 }; // '스크롤'·'||' 사라짐
const PILL_MEET_TIMING: Timing = { start: 0.05, end: 0.4 }; // 알약이 가운데로 모임
const PILL_SINK_TIMING: Timing = { start: 0.35, end: 0.65 }; // 모인 알약이 가라앉으며 사라짐
const PILL_SINK_PX = 90; // 가라앉는 거리
const PILL_SINK_SCALE = 0.15; // 가라앉으며 줄어드는 비율

// 로고 조립 1단계: 안 쓰는 글자가 떨어지며 사라짐
const FALL_START = 0.35; // 첫 글자가 떨어지기 시작하는 지점
const FALL_DURATION = 0.2; // 글자 하나가 다 떨어지는 데 걸리는 구간
const FALL_STAGGER = 0.015; // 글자마다 늦게 출발하는 간격
const FALL_STAGGER_GROUP = 7; // 7글자마다 늦는 정도를 처음부터 다시 (34글자가 한 줄로 차례를 서면 너무 길어짐)
const FALL_DROP_PX = 80; // 떨어지는 거리
const FALL_TILT_DEG = 14; // 떨어지며 기울어지는 각도

// 글자마다 떨어지는 구간: 순번에 따라 조금씩 늦게 시작
const fallTiming = (index: number): Timing => {
  const start = FALL_START + (index % FALL_STAGGER_GROUP) * FALL_STAGGER;
  return { start, end: start + FALL_DURATION };
};

// 로고 조립 2단계: 남은 글자를 화면에 고정된 복제본으로 바꿔치기
// 복제본이어야 다른 섹션(이름 장면)의 로고 자리까지 자유롭게 날아갈 수 있다
const KEPT_CHARS = ALL_CHARS.filter(({ keep }) => keep);
const CLONE_START = 0.5; // 이 지점부터 원본 대신 복제본이 보임

// 로고 조립 4단계: strong 뒤에 커서가 깜빡이다가 er을 타이핑해서 stronger
const TYPE_E_AT = 0.58; // e가 쳐지는 지점
const TYPE_R_AT = 0.66; // r이 쳐지는 지점
const TYPING_CARET_END = 0.76; // 다음 단계(한 줄로 합치기)가 시작되면 커서를 숨긴다

// 복제본 = 로고 글자 12개 (stronger + Deer)
// from: 출발하는 원본 글자의 순번 / typedAt: 원본 없이 새로 타이핑되는 글자(er)가 쳐지는 지점
type LogoLetter = {
  char: string;
  tone: Tone;
  line: number;
  from?: number;
  typedAt?: number;
};
const keptLettersOf = (line: number): LogoLetter[] =>
  KEPT_CHARS.filter((kept) => kept.line === line).map(
    ({ char, tone, index }) => ({ char, tone, line, from: index })
  );
const STRONG_LETTERS = keptLettersOf(TAG_LINE); // s t r o n g
const LOGO_LETTERS: LogoLetter[] = [
  ...STRONG_LETTERS,
  { char: 'e', tone: 'tag', line: TAG_LINE, typedAt: TYPE_E_AT },
  { char: 'r', tone: 'tag', line: TAG_LINE, typedAt: TYPE_R_AT },
  ...keptLettersOf(MAIN_LINE), // D e e r
];

// 복제본 자리: 화면 기준 글자 가운데 좌표 + 큰 글자 대비 크기 비율
// meetX: De·er이 만나 Deer가 됐을 때의 x (strong 글자는 제자리 그대로)
type ClonePlace = { x: number; y: number; scale: number; meetX: number };

// 로고 조립 3단계: De는 오른쪽, er은 왼쪽으로 와서 가운데서 만나 Deer
const DEER_MEET_TIMING: Timing = { start: CLONE_START, end: 0.72 };

// strong 글자 사이 간격 (s → t). 고정폭 글꼴이라 윗줄 글자 간격은 모두 같다
const strongLetterGap = (places: ClonePlace[]) => places[1].x - places[0].x;

const fontSizeOf = (element: HTMLElement) =>
  parseFloat(getComputedStyle(element).fontSize);

type Offset = { x: number; y: number };

export function Hero() {
  const [typed, setTyped] = useState(0);
  const done = typed >= TOTAL;

  const careersRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const orRef = useRef<HTMLSpanElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const caretRef = useRef<HTMLSpanElement>(null);
  const cloneRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const typingCaretRef = useRef<HTMLSpanElement>(null);
  // 복제본마다 '원본 글자가 있는 자리'. 한 번 재고 저장해 둔다
  const clonePlaces = useRef<ClonePlace[] | null>(null);
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

  // 창 크기가 바뀌면 알약·글자 위치도 바뀌므로, 저장해 둔 값을 버리고 다음 프레임에 다시 잰다
  useEffect(() => {
    const resetMeasurements = () => {
      pillOffsets.current = null;
      clonePlaces.current = null;
    };
    window.addEventListener('resize', resetMeasurements);
    return () => window.removeEventListener('resize', resetMeasurements);
  }, []);

  // 남은 글자마다 화면 어디에 있는지 잰다
  // 복제본은 모두 큰 글자 크기로 만들어 두고, 작은 글자는 scale로 줄여서 맞춘다
  // (나중에 크기가 바뀔 때 font-size 대신 transform만 바꾸려고)
  const measureClonePlaces = (): ClonePlace[] | null => {
    const firstMainChar = charRefs.current[LINES[MAIN_LINE][0].index];
    if (!firstMainChar) return null;
    const mainFontSize = fontSizeOf(firstMainChar);

    const places: ClonePlace[] = [];
    LOGO_LETTERS.forEach(({ from }, order) => {
      // 타이핑 글자(er)는 원본이 없으니, 바로 앞 글자에서 한 칸 오른쪽에 놓는다
      if (from === undefined) {
        const previous = places[order - 1];
        const x = previous.x + strongLetterGap(places);
        places.push({ ...previous, x, meetX: x });
        return;
      }

      const char = charRefs.current[from];
      if (!char) {
        places.push({ x: 0, y: 0, scale: 1, meetX: 0 });
        return;
      }
      const rect = char.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      places.push({
        x,
        y: rect.top + rect.height / 2,
        scale: fontSizeOf(char) / mainFontSize,
        meetX: x,
      });
    });

    // Deer 자리: De와 er 사이 한가운데를 기준으로, 글자 간격만큼 나란히 놓는다
    const deerOrders = LOGO_LETTERS.flatMap(({ line }, order) =>
      line === MAIN_LINE ? [order] : []
    );
    const firstX = places[deerOrders[0]].x; // D
    const lastX = places[deerOrders[deerOrders.length - 1]].x; // r
    const centerX = (firstX + lastX) / 2;
    const letterGap = places[deerOrders[1]].x - firstX; // 고정폭 글꼴이라 글자 간격이 모두 같다
    const middlePosition = (deerOrders.length - 1) / 2; // 4글자면 1.5번째가 가운데
    deerOrders.forEach((order, position) => {
      places[order].meetX = centerX + (position - middlePosition) * letterGap;
    });

    return places;
  };

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

    // 로고에 안 쓰는 글자는 아래로 떨어지며 사라진다 (글자마다 조금씩 늦게 출발)
    ALL_CHARS.forEach(({ keep, index }) => {
      const char = charRefs.current[index];
      if (keep || !char) return;
      const fall = segment(scrolledScreens, fallTiming(index));
      const drop = FALL_DROP_PX * fall * fall; // 제곱: 처음엔 천천히, 갈수록 빠르게 (중력처럼)
      const tilt = (index % 2 === 0 ? -1 : 1) * FALL_TILT_DEG * fall; // 짝수 순번은 왼쪽, 홀수는 오른쪽으로
      char.style.transform = `translateY(${drop}px) rotate(${tilt}deg)`;
      char.style.opacity = String(1 - fall);
    });

    // 글자가 떨어지기 시작하면 커서도 숨긴다
    // 깜빡임 애니메이션이 opacity를 쓰고 있어서, 겹치지 않게 visibility로 숨김
    if (caretRef.current) {
      caretRef.current.style.visibility =
        scrolledScreens >= FALL_START ? 'hidden' : '';
    }

    // 복제본 바꿔치기: CLONE_START부터 원본은 숨기고, 같은 자리에 복제본을 보인다
    // 눈으로는 아무 변화가 없어야 성공
    const showClones = scrolledScreens >= CLONE_START;
    if (showClones) clonePlaces.current ??= measureClonePlaces();
    const places = clonePlaces.current;
    const deerMeet = ease(segment(scrolledScreens, DEER_MEET_TIMING));
    LOGO_LETTERS.forEach(({ from, typedAt }, order) => {
      if (from !== undefined) {
        const char = charRefs.current[from];
        if (char) char.style.opacity = showClones ? '0' : '';
      }
      const clone = cloneRefs.current[order];
      if (!clone) return;
      // 타이핑 글자는 쳐진 뒤부터 보인다 (원본에서 온 글자는 처음부터)
      const appeared = typedAt === undefined || scrolledScreens >= typedAt;
      clone.style.opacity = showClones && appeared ? '1' : '0';
      if (!showClones || !places) return;

      const { x, y, scale, meetX } = places[order];
      const currentX = lerp(x, meetX, deerMeet); // 원래 자리 → Deer 자리
      // translate(-50%, -50%): 복제본의 가운데를 (currentX, y)에 맞춘다
      clone.style.transform = `translate(${currentX}px, ${y}px) translate(-50%, -50%) scale(${scale})`;
    });

    // 타이핑 커서: strong 뒤에서 깜빡이다가, 글자가 쳐질 때마다 한 칸씩 오른쪽으로
    const typingCaret = typingCaretRef.current;
    if (typingCaret && places) {
      const typedCount = LOGO_LETTERS.filter(
        ({ typedAt }) => typedAt !== undefined && scrolledScreens >= typedAt
      ).length;
      const lastLetter = places[STRONG_LETTERS.length - 1 + typedCount]; // 지금 맨 끝 글자 (g → e → r)
      const caretX = lastLetter.x + strongLetterGap(places) / 2; // 그 글자 오른쪽 끝
      const showCaret = showClones && scrolledScreens < TYPING_CARET_END;
      typingCaret.style.opacity = showCaret ? '1' : '0';
      typingCaret.style.transform = `translate(${caretX}px, ${lastLetter.y}px) translate(-50%, -50%) scale(${lastLetter.scale})`;
    }

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
                    ? `${MAIN_FONT_SIZE} font-bold tracking-tight`
                    : 'text-[clamp(16px,3.4vw,30px)]'
                }
              >
                {line.map(({ char, tone, index }) => (
                  <span key={index}>
                    {index === typed && <Caret ref={caretRef} />}
                    <span
                      ref={(el) => {
                        charRefs.current[index] = el;
                      }}
                      // transform은 inline 요소에 적용되지 않아서 inline-block으로
                      className={`inline-block ${TONE_CLASS[tone]} ${index < typed ? '' : 'invisible'}`}
                    >
                      {char}
                    </span>
                    {done && index === TOTAL - 1 && <Caret ref={caretRef} />}
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

      {/* 복제본 층: 화면에 고정(fixed). sticky 무대 밖에 두어야 이름 장면보다 위에 보인다 */}
      <div
        aria-hidden='true'
        className='pointer-events-none fixed inset-0 z-40 font-mono'
      >
        {LOGO_LETTERS.map(({ char, tone, line }, order) => (
          <span
            key={order}
            ref={(el) => {
              cloneRefs.current[order] = el;
            }}
            className={`absolute top-0 left-0 opacity-0 ${MAIN_FONT_SIZE} ${
              line === MAIN_LINE ? 'font-bold tracking-tight' : ''
            } ${TONE_CLASS[tone]}`}
          >
            {char}
          </span>
        ))}
        <span
          ref={typingCaretRef}
          className={`absolute top-0 left-0 opacity-0 ${MAIN_FONT_SIZE}`}
        >
          <span className='block h-[1em] w-[0.08em] animate-blink bg-accent' />
        </span>
      </div>
    </section>
  );
}

function Caret({ ref }: { ref?: Ref<HTMLSpanElement> }) {
  return (
    <span ref={ref} className='relative'>
      <span className='absolute top-[0.1em] -left-px h-[1em] w-[0.08em] animate-blink bg-accent' />
    </span>
  );
}
