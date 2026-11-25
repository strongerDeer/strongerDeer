// 값을 0 ~ 1 사이로 자른다 (스크롤 진행률이 범위를 넘지 않게)
export const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

// 연출 구간: 전체 진행률 중 어디서 시작해서 어디서 끝나는지
export type Timing = { start: number; end: number };

// 전체 진행률이 start ~ end 사이를 지나는 동안 0 → 1
export const segment = (progress: number, { start, end }: Timing) =>
  clamp01((progress - start) / (end - start));

// 0 ~ 1 값을 처음과 끝은 천천히, 가운데는 빠르게 (smoothstep)
export const ease = (progress: number) =>
  progress * progress * (3 - 2 * progress);

// 인트로가 어두워지는 정도: 스크롤 0에서 시작해 화면 높이의 0.6배만큼 내리면 완전히 어두움
const DARKEN_DISTANCE = 0.6;
export const introDarkness = (scrollY: number, viewportHeight: number) =>
  ease(clamp01(scrollY / (viewportHeight * DARKEN_DISTANCE)));

// 사용자가 기기에서 '동작 줄이기'를 켰는지 (켰으면 애니메이션 없이 결과만 보여 줌)
// window를 쓰므로 useEffect 안에서만 호출
export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
