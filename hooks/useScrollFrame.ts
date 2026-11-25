import { useEffect, useRef } from 'react';

// 스크롤할 때 onFrame을 실행한다
// 스크롤 이벤트는 한 프레임에도 여러 번 올 수 있어서, requestAnimationFrame으로 묶어 한 프레임에 한 번만 실행
export function useScrollFrame(onFrame: () => void) {
  // 매 렌더마다 최신 onFrame을 담아 둔다 (리스너는 한 번만 등록하고, 실행할 땐 최신 함수를 부름)
  const latestOnFrame = useRef(onFrame);
  useEffect(() => {
    latestOnFrame.current = onFrame;
  });

  useEffect(() => {
    let frameRequested = false;

    const onScroll = () => {
      if (frameRequested) return;
      frameRequested = true;
      requestAnimationFrame(() => {
        latestOnFrame.current();
        frameRequested = false;
      });
    };

    latestOnFrame.current(); // 첫 화면도 한 번 그린다
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
}
