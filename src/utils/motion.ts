export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// scrollIntoView({ behavior: "smooth" }) 는 CSS 의 scroll-behavior 를 덮어쓰기 때문에,
// 전역 @media (prefers-reduced-motion) 규칙만으로는 막히지 않는다. 여기서 직접 분기한다.
export const scrollIntoViewSafely = (el: Element | null | undefined) => {
  el?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
};
