export type Choice = 'a' | 'b';

type Card = {
  image: string; // public/images/balance/balance-<image>.webp
  text: string;
};

export type Game = {
  id: string;
  title: string; // 화면에는 "Feat. " 을 붙여서 보여 줌
  a: Card;
  b: Card;
  hj: Choice; // 혜진의 선택
  talk: string; // 혜진의 한마디 (결과 화면)
};

export const GAMES: Game[] = [
  {
    id: '1',
    title: '출근길',
    a: { image: '01a', text: '지옥철 타고 30분 컷' },
    b: { image: '01b', text: '자리 보장 90분 컷' },
    hj: 'a',
    talk: '자리 보장도 해봤는데 왕복 3시간은 힘들더라고요. 굵고 짧게 갑니다!',
  },
  {
    id: '2',
    title: '연봉은 똑같다',
    a: { image: '02a', text: '집 앞 10분 거리 회사' },
    b: { image: '02b', text: '삼시 세끼 다 주는 회사' },
    hj: 'b',
    talk: '회사는 적당히 멀어야 한다고 생각합니다...',
  },
  {
    id: '3',
    title: '사무실 내 자리',
    a: { image: '03a', text: '햇살 가득 창가' },
    b: { image: '03b', text: '에어컨 바로 밑' },
    hj: 'b',
    talk: '기미는 못 참죠. 여름엔 후드에 담요 필수!',
  },
  {
    id: '4',
    title: '점심시간 1시간',
    a: { image: '04a', text: '웨이팅 30분 맛집' },
    b: { image: '04b', text: '5분 컷 단골집 + 산책' },
    hj: 'b',
    talk: '점심시간을 매일 조마조마하게 보낼 순 없어요.',
  },
  {
    id: '5',
    title: '좋은 아이디어가 떠올랐다',
    a: { image: '05a', text: '한 문단으로 정리해 먼저 공유' },
    b: { image: '05b', text: '작은 화면으로 만들어 먼저 공유' },
    hj: 'b',
    talk: '눈으로 보여주지 않으면 다들 조금씩 다르게 이해하더라고요.',
  },
  {
    id: '6',
    title: '일할 때 BGM',
    a: { image: '06a', text: '잔잔한 플레이리스트' },
    b: { image: '06b', text: '신나는 노동요' },
    hj: 'b',
    talk: '둠칫둠칫, 졸음 방지용이에요.',
  },
  {
    id: '7',
    title: '퇴근 후 취미',
    a: { image: '07a', text: '하나를 오래, 깊게' },
    b: { image: '07b', text: '이것저것 다 해보기' },
    hj: 'b',
    talk: '그림, 클라이밍, 러닝, 킥복싱, 폴댄스, 해금, MMA… 요즘은 스피닝·재봉·독서 중이에요.',
  },
];
