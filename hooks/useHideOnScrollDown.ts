import { useCallback, useEffect, useRef, useState } from 'react';

// 손가락 떨림 같은 아주 작은 스크롤은 무시한다
const DIRECTION_THRESHOLD_PX = 8;
// 맨 위 근처에서는 항상 보여 준다
const ALWAYS_SHOW_UNTIL_PX = 80;
// 바로가기로 이동하는 동안(부드러운 스크롤)은 방향 판단을 쉰다
const NAV_SCROLL_LOCK_MS = 800;

// 아래로 내리면 숨김(true), 위로 올리면 보임(false)
// hideNow: 바로가기를 누른 직후처럼 바로 숨기고 싶을 때
export function useHideOnScrollDown() {
  const [isHidden, setIsHidden] = useState(false);
  const lastYRef = useRef(0);
  const lockedUntilRef = useRef(0);

  useEffect(() => {
    lastYRef.current = window.scrollY;

    const handleScroll = () => {
      const y = window.scrollY;
      const delta = y - lastYRef.current;

      if (Date.now() < lockedUntilRef.current) {
        lastYRef.current = y;
        return;
      }
      if (y < ALWAYS_SHOW_UNTIL_PX) {
        setIsHidden(false);
      } else if (delta > DIRECTION_THRESHOLD_PX) {
        setIsHidden(true);
      } else if (delta < -DIRECTION_THRESHOLD_PX) {
        setIsHidden(false);
      } else {
        return; // 움직임이 작으면 기준점(lastY)을 그대로 두고 쌓이게 한다
      }
      lastYRef.current = y;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const hideNow = useCallback(() => {
    lockedUntilRef.current = Date.now() + NAV_SCROLL_LOCK_MS;
    setIsHidden(true);
  }, []);

  return { isHidden, hideNow };
}
