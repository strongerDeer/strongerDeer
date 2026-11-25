// 값을 0 ~ 1 사이로 자른다 (스크롤 진행률이 범위를 넘지 않게)
export const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

// 사용자가 기기에서 '동작 줄이기'를 켰는지 (켰으면 애니메이션 없이 결과만 보여 줌)
// window를 쓰므로 useEffect 안에서만 호출
export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
