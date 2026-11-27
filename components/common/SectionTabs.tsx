'use client';

import { NAV_SECTION_IDS, SECTION_NAV } from '@/data/sectionNav';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useHideOnScrollDown } from '@/hooks/useHideOnScrollDown';

// 모바일 전용 섹션 바로가기: 헤더 바로 아래에 겹쳐 뜨는 알약 버튼들
// 내리면 숨고 올리면 나타난다. 내용 위에 겹쳐 뜨므로 헤더 높이(--header-h)는 그대로
export function SectionTabs() {
  const activeId = useActiveSection(NAV_SECTION_IDS);
  const { isHidden, hideNow } = useHideOnScrollDown();

  return (
    <nav
      aria-label='섹션 바로가기'
      className={`absolute inset-x-0 top-full border-b border-line bg-(--background) py-2 transition duration-200 lg:hidden ${
        isHidden ? 'invisible -translate-y-2 opacity-0' : ''
      }`}
    >
      {/* 알약을 글자처럼(inline-block) 늘어놓아야 text-balance로 줄 길이를 고르게 나눌 수 있다
          (flex 아이템에는 text-balance가 먹지 않음) */}
      <ul className='px-4 text-center text-balance'>
        {SECTION_NAV.map((item) => {
          const isActive =
            activeId !== null && item.sectionIds.includes(activeId);
          return (
            // 지금 탭도 굵게 하지 않는다: 굵어지면 알약 폭이 바뀌어 줄 나눔이 왔다 갔다 한다
            <li key={item.targetId} className='m-0.5 inline-block'>
              <a
                href={`#${item.targetId}`}
                aria-current={isActive ? 'location' : undefined}
                onClick={hideNow}
                className='block rounded-pill border border-line px-2.5 py-0.5 text-xs whitespace-nowrap text-foreground-muted transition-colors aria-[current]:border-accent aria-[current]:bg-accent aria-[current]:text-on-accent'
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
