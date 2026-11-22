export type SpeedStep = {
  label: string;
  doneLabel: string;
  delay: number;
};

// 단계마다 반응이 늦어짐: 0 → 3초. 마지막은 실제로 이메일 복사
export const SPEED_STEPS: SpeedStep[] = [
  { label: '♡ 좋아요', doneLabel: '♥ 좋아요', delay: 0 },
  { label: '팔로우', doneLabel: '팔로잉 ✓', delay: 100 },
  { label: '장바구니 담기', doneLabel: '담김 ✓', delay: 200 },
  { label: '다음 페이지 →', doneLabel: '2페이지 ✓', delay: 300 },
  { label: '저장하기', doneLabel: '저장됨 ✓', delay: 500 },
  { label: '구독하기', doneLabel: '구독 중 ✓', delay: 700 },
  { label: '알림 받기', doneLabel: '알림 켜짐 ✓', delay: 1000 },
  { label: '쿠폰 받기', doneLabel: '받음 ✓', delay: 1500 },
  { label: '새로고침', doneLabel: '최신 ✓', delay: 2000 },
  { label: '강혜진 이메일 복사', doneLabel: '복사됨 ✓', delay: 3000 },
];
