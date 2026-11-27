import { useEffect, useState } from 'react';

// 화면 위에서 40% 높이에 가로선을 하나 긋고, 그 선에 걸친 섹션을 '지금 보는 섹션'으로 친다
// rootMargin으로 관찰 영역을 그 선 한 줄로 줄인다 (위 40%·아래 60%를 잘라냄)
const ACTIVE_LINE_MARGIN = '-40% 0px -60% 0px';

// 지금 보고 있는 섹션의 id를 돌려준다. sectionIds는 바뀌지 않는 상수로 넘길 것
export function useActiveSection(sectionIds: string[]) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: ACTIVE_LINE_MARGIN }
    );

    for (const id of sectionIds) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}
