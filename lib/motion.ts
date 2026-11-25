// 사용자가 기기에서 '동작 줄이기'를 켰는지 (켰으면 애니메이션 없이 결과만 보여 줌)
// window를 쓰므로 useEffect 안에서만 호출
export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
