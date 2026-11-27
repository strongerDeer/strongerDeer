'use client';

import { NAV_SECTION_IDS, SECTION_NAV } from '@/data/sectionNav';
import { useActiveSection } from '@/hooks/useActiveSection';

// PC 전용 점 목차: 화면 오른쪽 가운데. 지금 섹션은 점이 진하고 커진다
// 마우스를 올리거나 키보드로 고르면 이름이 보인다
export function SectionDots() {
  const activeId = useActiveSection(NAV_SECTION_IDS);

  return (
    <nav
      aria-label='섹션 바로가기'
      className='fixed top-1/2 right-4 z-20 hidden -translate-y-1/2 lg:block'
    >
      <ul className='flex flex-col items-end gap-3'>
        {SECTION_NAV.map((item) => {
          const isActive =
            activeId !== null && item.sectionIds.includes(activeId);
          return (
            <li key={item.targetId}>
              <a
                href={`#${item.targetId}`}
                aria-current={isActive ? 'location' : undefined}
                className='group flex items-center gap-2 py-0.5'
              >
                <span className='rounded-pill bg-background-card px-2 py-0.5 text-xs font-bold opacity-0 shadow-card transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100'>
                  {item.label}
                </span>
                <span
                  aria-hidden='true'
                  className='size-2 rounded-full bg-line transition group-hover:bg-foreground-muted group-aria-[current]:scale-125 group-aria-[current]:bg-accent'
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
