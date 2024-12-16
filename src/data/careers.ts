export interface I_CAREERS {
  id: number;
  period: string;
  team?: string;
  kor: string;
  company: string;
  position: string;
  description: string[];
  location: string;
}

export const CAREERS = [
  {
    id: 1,
    period: "2022.04 ~ 2024.07 (2년 3개월)",
    company: "Weniv",
    kor: "위니브",
    position: "프론트엔드 개발자 / 프로젝트 팀장",
    description: [
      "Next.js와 TypeScript 도입으로 회사 내 코드 품질 향상",
      "SEO(검색엔진최적화)작업을 통한 회사 웹 콘텐츠 검색 노출 개선",
      "자사 서비스 웹 제작 및 UI/UX 디자인 개선",
      "자사 맞춤형 분석 대시보드 개발",
      "디자인/퍼블리싱 경험 바탕으로 초보 개발자를 위한 시각적, 실무 중심 학습 자료 제작",
    ],
    location: "제주",
  },
  {
    id: 2,
    period: "2019.03 ~ 2021.08 (2년 7개월)",
    company: "TeemStone",
    kor: "팀스톤",
    team: "기획팀",
    position: "웹 디자이너&퍼블리셔 / 선임연구원(과장)",
    description: [
      "자사 디자인 관련 모든 업무 (홈페이지, 소프트웨어 UI/UX, 브로슈어, 동영상)",
      "웹 퍼블리싱: 자사 홈페이지 리뉴얼, 대시보드",
    ],
    location: "서울",
  },
  {
    id: 3,
    period: "2017.07 ~ 2018.12 (1년 6개월)",
    company: "Geryon",
    kor: "게리온",
    team: "브랜드기획부 디자인팀",
    position: "웹 디자이너&퍼블리셔 / 팀장(대리)",
    description: [
      "자사 브랜드 홈페이지 제작 / 기타 광고디자인 / 자사 디자인 업무 총괄",
      "웹 퍼블리싱",
    ],
    location: "서울",
  },
  {
    id: 4,
    period: "2016.03 ~ 2017.07 (1년 5개월)",
    company: "DNUNET",
    kor: "디유넷",
    team: "DBR,HBR 사업팀",
    position: "웹 디자이너&퍼블리셔 / 대리",
    description: [
      "웹/앱 디자인 및 퍼블리싱, 자사 홈페이지 관리 등",
      "주요 프로젝트: DBR(동아비즈니스리뷰), 대한간호협회 에듀센터, 동아 인턴UP",
    ],
    location: "서울",
  },
  {
    id: 5,
    period: "2013.09 ~ 2015.11 (2년 3개월)",
    company: "SkoInfo",
    kor: "스코인포(부산)",
    team: "디자인팀",
    position: "웹 디자이너&퍼블리셔 / 대리",
    description: [
      "웹/앱 디자인 및 퍼블리싱(웹 표준, 웹 접근성)",
      "웹 접근성 참여: 고성군청, 거제시청, 모바일 부산, 부산진구청, 군산시청 등",
    ],
    location: "부산",
  },
  ,
  {
    id: 6,
    period: "2009.12 ~ 2012.11(3년)",
    company: "Kidan Landscape Design Group",
    kor: "기단 조경기술사 사무소",
    team: "설계팀",
    position: "조경설계사 / 기사",
    description: [
      "조경 설계 및 디자인",
      "CAD 도면 설계, Photoshop 2D 이미지 작업, SketchUp 3D 렌더링",
    ],
    location: "부산",
  },
];
