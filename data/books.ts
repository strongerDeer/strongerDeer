export type Book = {
  id: string; // YES24 상품번호 = 표지 파일 이름
  title: string;
  author: string;
  category: 'dev' | 'design';
  shortTitle?: string; // 화면·추천 비교용 짧은 이름 (없으면 title 사용)
};

export const BOOKS: Book[] = [
  {
    id: '123161563',
    title: '모던 리액트 Deep Dive',
    author: '김용찬',
    category: 'dev',
  },
  {
    id: '92742567',
    title: '모던 자바스크립트 Deep Dive',
    author: '이웅모',
    category: 'dev',
  },
  {
    id: '141402589',
    title: '대규모 리액트 웹 앱 개발',
    author: '애디 오스마니, 하산 지르데',
    category: 'dev',
  },
  {
    id: '130271536',
    title: '리액트 인터뷰 가이드',
    author: '수디르 조나, 앤드류 바이스덴',
    category: 'dev',
  },
  {
    id: '125977771',
    title: '코드 작성 가이드',
    author: '이시가와 무네토시',
    category: 'dev',
  },
  {
    id: '67350256',
    title: '함께 자라기',
    author: '김창준',
    category: 'dev',
  },
  {
    id: '148184184',
    title: '코드 너머, 회사보다 오래 남을 개발자',
    author: '김상기 외',
    category: 'dev',
    shortTitle: '코드 너머',
  },
  {
    id: '97919905',
    title: '오늘도 개발자가 안 된다고 말했다',
    author: '김중철, 김수지',
    category: 'dev',
  },
  {
    id: '150011529',
    title: '데이터 삽질 끝에 UX가 보였다',
    author: '이미진',
    category: 'design',
  },
  {
    id: '95520735',
    title: '마이크로카피 2/e',
    author: '킨너렛 이프라',
    category: 'design',
  },
  {
    id: '15238736',
    title: '사용자를 생각하게 하지 마!',
    author: '스티브 크룩',
    category: 'design',
    shortTitle: '사용자를 생각하게 하지 마',
  },
  {
    id: '17735828',
    title: '마이크로인터랙션',
    author: '댄 새퍼',
    category: 'design',
    shortTitle: '마이크로 인터랙션',
  },
  {
    id: '134305285',
    title: '실전 예제로 알아보는 서점직원의 실전 UI/UX',
    author: '서점직원',
    category: 'design',
    shortTitle: '서점직원의 실전 UI/UX',
  },
  {
    id: '101556918',
    title: '사용자를 끌어들이는 UX/UI의 비밀',
    author: '제니퍼 티드웰 외',
    category: 'design',
  },
  {
    id: '109651824',
    title: '훅: 일상을 사로잡는 제품의 비밀',
    author: '니르 이얄',
    category: 'design',
    shortTitle: '훅',
  },
  {
    id: '124335169',
    title: '웹/모바일 접근성, 모두를 위한 비즈니스 확장',
    author: '수크리티 차다',
    category: 'design',
    shortTitle: '웹/모바일 접근성',
  },
];
