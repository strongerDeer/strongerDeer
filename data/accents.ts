export type AccentId = 'purple' | 'blue' | 'green' | 'orange';

export type Accent = {
  id: AccentId;
  name: string;
  // 고르는 칸에 보여 줄 색 (라이트 기준). 실제 적용 색은 globals.css의 data-accent 규칙
  color: string;
};

export const ACCENTS: Accent[] = [
  { id: 'purple', name: '퍼플', color: '#615EF0' },
  { id: 'blue', name: '블루', color: '#1F6FD1' },
  { id: 'green', name: '그린', color: '#0E7F58' },
  { id: 'orange', name: '오렌지', color: '#C2410C' },
];
