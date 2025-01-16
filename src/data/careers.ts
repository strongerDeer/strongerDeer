export interface I_CAREERS {
  id: number;
  period: string;
  team?: string;
  kor: string;
  company: string;
  position: string;
  info: string;
  description: string[];
  location: string;
  images?: string[];
}

export const CAREERS: I_CAREERS[] = [
  {
    id: 1,
    period: "2022.04 ~ 2024.07 (2년 4개월)",
    company: "Weniv",
    kor: "위니브",
    position: "프론트엔드 개발자",
    info: "ICT 교육 관련 온·오프라인 강의, 전자책, 웹 서비스, 콘퍼런스 등을 제공하는 기업",
    description: [
      "Next.js, TypeScript, Storybook 등 신규 기술 도입으로 사내 개발 환경 개선 및 코드 품질 향상 주도",
      "자사 서비스 SEO 개선 작업을 통해 구글 검색 노출 개선",
      "서비스 통합 모니터링이 가능한 맞춤형 데이터 분석 대시보드 개발",
      "코드 컨벤션, SEO 개선 매뉴얼, 프로젝트 문서 작성 가이드 등 다양한 사내 개발 문서화",
      "개발자 교육 콘텐츠 제작 및 부트캠프 강의 진행",
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
    info: "기업용 IT 인프라 모니터링 및 성능 관리 솔루션 개발 전문기업",
    description: [
      "실시간 모니터링 솔루션 UI/UX 디자인",
      "자사 디자인 관련 모든 업무(홈페이지, 브로슈어, 홍보영상, PPT)",
      "웹퍼블리싱(자사 홈페이지 리뉴얼, 웹대시보드 프로토타입 등)",
    ],
    location: "서울",
    images: [
      "/career/teemstone_1.jpg",
      "/career/teemstone_2.jpg",
      "/career/teemstone_3.jpg",
    ],
  },
  {
    id: 3,
    period: "2017.07 ~ 2018.12 (1년 6개월)",
    company: "Geryon",
    kor: "게리온",
    team: "브랜드기획부 디자인팀",
    position: "웹 디자이너&퍼블리셔 / 팀장(대리)",
    info: "투자 상담 및 자문 서비스 제공 기업",
    description: [
      "자사 브랜드 홈페이지 제작 / 기타 광고디자인 / 자사 디자인 업무 총괄",
      "자사 브랜드 홈페이지 디자인 및 퍼블리싱 / 기타 광고디자인 / 자사 디자인 업무 총괄",
    ],
    location: "서울",
    images: [
      "/career/geryon_1.jpg",
      "/career/geryon_2.jpg",
      "/career/geryon_3.jpg",
    ],
  },
  {
    id: 4,
    period: "2016.03 ~ 2017.07 (1년 5개월)",
    company: "DNUNET",
    kor: "디유넷(현: 동아미디어엔)",
    team: "DBR,HBR 사업팀",
    position: "웹 디자이너&퍼블리셔 / 대리",
    info: "동아미디어그룹의 방송솔루션 및 디지털서비스 운영 전문기업",
    description: [
      "동아미디어 관련 웹,모바일 디자인 및 퍼블리싱/ 자사 홈페이지 관리 등",
      "주요 프로젝트: DBR(동아비즈니스리뷰), 대한간호협회 에듀센터, 동아 인턴UP, 도담촌 등",
    ],
    location: "서울",
    images: [
      "/career/dunet_1.jpg",
      "/career/dunet_2.jpg",
      "/career/dunet_3.jpg",
    ],
  },
  {
    id: 5,
    period: "2013.09 ~ 2015.11 (2년 3개월)",
    company: "SkoInfo",
    kor: "스코인포(부산)",
    team: "디자인팀",
    position: "웹 디자이너&퍼블리셔 / 대리",
    info: "전자정부표준프레임워크 기반의 공공데이터 솔루션 개발 및 구축 전문기업",
    description: [
      "공공기관 웹/모바일 디자인 및 퍼블리싱, 웹표준, 웹접근성 인증마크 프로젝트 등",
      "웹 접근성 인증마크 프로젝트: 고성군청, 거제시청, 모바일 부산, 부산진구청, 군산시청 등",
    ],
    location: "부산",
    images: [
      "/career/skoinfo_1.jpg",
      "/career/skoinfo_2.jpg",
      "/career/skoinfo_3.jpg",
    ],
  },
  {
    id: 6,
    period: "2009.12 ~ 2012.11(3년)",
    company: "Kidan Landscape Design Group",
    kor: "기단 조경기술사 사무소",
    team: "설계팀",
    position: "조경설계사 / 기사",
    info: "",
    description: [
      "조경 설계 및 디자인",
      "CAD 도면 설계, Photoshop 2D 이미지 작업, SketchUp 3D 렌더링",
    ],
    location: "부산",
  },
];
