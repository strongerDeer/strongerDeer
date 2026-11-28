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
// lineX·lineY: strongerDeer 한 줄이 됐을 때의 자리
type ClonePlace = {
  x: number;
  y: number;
  scale: number;
  meetX: number;
  lineX: number;
  lineY: number;
};

// 로고 조립 5단계: stronger가 내려와 Deer 앞에 붙어 strongerDeer 한 줄
const LINE_JOIN_TIMING: Timing = { start: TYPING_CARET_END, end: 0.95 };
// 5-3: Deer는 stronger보다 빨리 오른쪽으로 비켜 준다 (같이 움직이면 중간에 글자가 겹침)
const DEER_MAKE_ROOM_TIMING: Timing = { start: TYPING_CARET_END, end: 0.86 };
// 5-2: 합쳐지는 동안 12글자를 '흰색·보통 굵기' 한 줄로 맞춘다
// 도착할 로고(6단계)가 가는 글자라서, 굵은 Deer를 보통으로 내려 로고 쪽에 가깝게
// 코드 글꼴(Roboto Mono)이 가변 글꼴이라 굵기도 색처럼 서서히 바꿀 수 있다
const DEER_START_WEIGHT = 700; // 코드 화면의 Deer (font-bold)
const LINE_WEIGHT = 400; // 한 줄이 됐을 때 (보통)

// 로고 조립 6단계: 한 줄이 이름 장면의 로고(strongerDeer) 자리로 날아가 바꿔치기
// 이름 장면이 아래에서 올라오는 동안 날아가서, 거의 다 올라왔을 때 도착
const FLY_TIMING: Timing = { start: 1.0, end: 1.72 };
// 6-2: 도착한 뒤 복제본은 흐려지고 진짜 로고는 선명해진다 (크로스페이드)
// 한 번에 바꾸면 글꼴이 달라(코드 글꼴 → Pretendard) 툭 바뀌어 보여서 겹쳐 넘긴다
// 날아가는 도중에 겹치면 두 글자가 어긋나 보여서, 로고 위에 다 내려앉은 뒤에 시작한다
// 겹쳐 보이는 시간이 길면 지저분해서 짧게 (스크롤 0.04화면 ≈ 휠 한 번)
const LANDING_FADE_TIMING: Timing = { start: FLY_TIMING.end, end: 1.76 };
// 6-3: 날아가는 한 줄이 검정 배경에서 흰 배경(이름 장면)으로 넘어가는 순간 코드 글꼴 → 로고 글꼴(Pretendard)
// 글꼴은 굵기처럼 서서히 바꿀 수 없어서, 배경이 바뀌는 순간에 바꿔 눈에 덜 띄게 한다
// 1.3 = 1280·390 화면 모두에서 한 줄이 흰 배경 경계를 지나는 때 (화면으로 확인한 값)
const LOGO_FONT_SWITCH_AT = 1.3;
const LOGO_FONT = 'var(--font-pretendard)';

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
        places.push({ x: 0, y: 0, scale: 1, meetX: 0, lineX: 0, lineY: 0 });
        return;
      }
      const rect = char.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      places.push({
        x,
        y: rect.top + rect.height / 2,
        scale: fontSizeOf(char) / mainFontSize,
        meetX: x,
        lineX: 0, // 아래에서 채운다
        lineY: 0,
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

    // strongerDeer 한 줄 자리: 12글자를 화면 가운데 기준으로, 큰 글자 간격만큼 나란히
    // 높이는 Deer가 있는 줄
    const screenCenterX = window.innerWidth / 2;
    const lineMiddle = (LOGO_LETTERS.length - 1) / 2; // 12글자면 5.5번째가 가운데
    const deerY = places[deerOrders[0]].y;
    places.forEach((place, order) => {
      place.lineX = screenCenterX + (order - lineMiddle) * letterGap;
      place.lineY = deerY;
    });

    return places;
  };

  // 이름 장면 로고 글자마다 화면 어디에 있는지 잰다
  // 이름 장면이 스크롤에 따라 올라오는 중이라, 처음 한 번이 아니라 매 프레임 다시 잰다
  const measureLogoTargets = (cloneFontSize: number) => {
    const logoLetters =
      document.querySelectorAll<HTMLElement>('[data-logo-letter]');
    if (logoLetters.length !== LOGO_LETTERS.length) return null;
    return [...logoLetters].map((letter) => {
      const rect = letter.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        scale: fontSizeOf(letter) / cloneFontSize, // 로고 글자 크기에 맞춘 비율
        weight: Number(getComputedStyle(letter).fontWeight), // 로고 글자 굵기 (가는 200)
      };
    });
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
    const lineJoin = ease(segment(scrolledScreens, LINE_JOIN_TIMING));
    const deerMakeRoom = ease(segment(scrolledScreens, DEER_MAKE_ROOM_TIMING));

    // 6단계: 로고 자리로 날아가기
    const fly = ease(segment(scrolledScreens, FLY_TIMING));
    // 6-2: 도착 직전에 복제본 → 진짜 로고로 서서히 넘긴다 (0 = 복제본만, 1 = 로고만)
    const landingFade = segment(scrolledScreens, LANDING_FADE_TIMING);
    const firstClone = cloneRefs.current[0];
    const logoTargets =
      fly > 0 && firstClone ? measureLogoTargets(fontSizeOf(firstClone)) : null;
    // 복제본이 떠 있는 동안 로고는 숨겼다가, 도착 구간에서 서서히 보인다
    // (CSS 변수로 이름 장면에 알려 준다. 복제본 전에는 원래대로 1)
    const logoReveal = showClones ? landingFade : 1;
    document.documentElement.style.setProperty(
      '--logo-reveal',
      String(logoReveal)
    );
    LOGO_LETTERS.forEach(({ from, typedAt, line }, order) => {
      if (from !== undefined) {
        const char = charRefs.current[from];
        if (char) char.style.opacity = showClones ? '0' : '';
      }
      const clone = cloneRefs.current[order];
      if (!clone) return;
      // 타이핑 글자는 쳐진 뒤부터 보인다 (원본에서 온 글자는 처음부터)
      const appeared = typedAt === undefined || scrolledScreens >= typedAt;
      // 로고가 선명해지는 만큼 복제본은 흐려진다 (둘을 더하면 항상 1)
      const cloneOpacity = showClones && appeared ? 1 - landingFade : 0;
      clone.style.opacity = String(cloneOpacity);
      if (!showClones || !places) return;

      const { x, y, scale, meetX, lineX, lineY } = places[order];
      const afterMeetX = lerp(x, meetX, deerMeet); // 3단계: 원래 자리 → Deer 자리
      // 5단계: 그 자리 → 한 줄 자리. 작은 stronger는 커지면서 내려온다
      const joinX = line === MAIN_LINE ? deerMakeRoom : lineJoin; // Deer만 먼저 비켜 준다
      const currentX = lerp(afterMeetX, lineX, joinX);
      const currentY = lerp(y, lineY, lineJoin);
      const currentScale = lerp(scale, 1, lineJoin);
      // 6단계: 한 줄 자리 → 로고 글자 자리 (로고 위치를 못 찾으면 한 줄 자리에 그대로)
      const target = logoTargets?.[order];
      const flyX = target ? lerp(currentX, target.x, fly) : currentX;
      const flyY = target ? lerp(currentY, target.y, fly) : currentY;
      const flyScale = target
        ? lerp(currentScale, target.scale, fly)
        : currentScale;
      // translate(-50%, -50%): 복제본의 가운데를 (flyX, flyY)에 맞춘다
      clone.style.transform = `translate(${flyX}px, ${flyY}px) translate(-50%, -50%) scale(${flyScale})`;

      // 색: 5단계에서 stronger만 회색 → 흰색 (Deer는 원래 흰색)
      const lineColor =
        line === TAG_LINE
          ? `color-mix(in srgb, var(--foreground) ${lineJoin * 100}%, var(--foreground-muted))`
          : 'var(--foreground)';
      // 6단계에서 전부 흰색 → 로고 글자색 (밝은 이름 장면 위에서도 보이게)
      clone.style.color = `color-mix(in srgb, var(--page-foreground) ${fly * 100}%, ${lineColor})`;
      // 굵기 5단계: 가운데 줄에서 온 글자(Deer)만 굵게 → 보통 (stronger는 원래 보통)
      const lineWeight =
        line === MAIN_LINE
          ? lerp(DEER_START_WEIGHT, LINE_WEIGHT, lineJoin)
          : LINE_WEIGHT;
      // 굵기 6단계: 보통 → 로고 글자 굵기 (겹칠 때 굵은 복제본이 가는 로고 위에 진하게 남지 않게)
      const weight = target ? lerp(lineWeight, target.weight, fly) : lineWeight;
      clone.style.fontWeight = String(Math.round(weight));
      // 글꼴: 날아가기 시작하면 로고와 같은 글꼴로 (빈 값 = 원래 클래스의 코드 글꼴)
      const useLogoFont = scrolledScreens >= LOGO_FONT_SWITCH_AT;
      clone.style.fontFamily = useLogoFont ? LOGO_FONT : '';
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
      {/* pt-(--header-h): 헤더가 위를 덮으므로, 헤더 아래 남은 영역의 가운데에 오게 */}
      <div className='sticky top-0 flex h-svh flex-col items-center justify-center gap-6 px-4 pt-(--header-h) text-center motion-reduce:static motion-reduce:min-h-[calc(100svh-var(--header-h))]'>
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
                className='rounded-pill border border-line bg-background-card px-3.5 py-1.5 text-sm text-foreground-muted'
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
