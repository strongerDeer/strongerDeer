// 섹션 바로가기 목록 (PC 점 목차·모바일 헤더 목차가 같이 쓴다)
// targetId: 누르면 이동할 섹션 / sectionIds: 이 칸을 '지금 보는 중'으로 칠할 섹션들
export type SectionNavItem = {
  label: string;
  targetId: string;
  sectionIds: string[];
};

export const SECTION_NAV: SectionNavItem[] = [
  { label: '소개', targetId: 'hero', sectionIds: ['hero', 'stronger-deer'] },
  {
    label: '밸런스 게임',
    targetId: 'balance-game',
    sectionIds: ['balance-game'],
  },
  { label: '개발 책장', targetId: 'book', sectionIds: ['book'] },
  {
    label: '0.1초 체험',
    targetId: 'response-time',
    sectionIds: ['response-time'],
  },
  { label: '간단 체험', targetId: 'demo', sectionIds: ['demo'] },
  { label: '같이 일하면', targetId: 'together', sectionIds: ['together'] },
  { label: '연락', targetId: 'contact', sectionIds: ['contact'] },
];

// 지켜볼 섹션 id 전체 (모듈 상수라 렌더마다 새로 만들어지지 않는다)
export const NAV_SECTION_IDS = SECTION_NAV.flatMap((item) => item.sectionIds);
