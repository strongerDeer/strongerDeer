export type I_CAREERS = {
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
};

export const CAREERS: I_CAREERS[] = [
  {
    id: 1,
    period: "2025.02~재직 중(1년 5개월)",
    company: "NOVERA",
    kor: "노베라",
    position: "프론트엔드 개발자",
    team: "플랫폼사업실 플랫폼사업팀",
    info: "아티스트 상품 판매, 이벤트 운영 등 팬덤 커뮤니티·커머스 서비스를 제공하는 기업",
    description: [
      "입사 초기 실시간 채팅 서비스 개발을 거쳐, 전담 기획자 없는 신규 커머스 TF에서 화면 정책 정리부터 UI 설계·개발·운영 검증까지 프론트엔드 전반을 주도",
      "디자인 시스템 구축: 신규 커머스의 UI·접근성·토큰 기준을 디자인 시스템으로 구조화해 사내 패키지로 배포 — 배포 모듈 23종 중 20종이 Shop에서 사용 중",
      "고객·운영 화면 개발: 상품 탐색·상세, 주문·클레임 고객 화면과 주문·배송·반품·이벤트 매출 관리 어드민 구현 — 로딩·오류·빈 화면 등 상태 기준 정의",
      "가입 흐름 개선: 가입 이탈 가설로 SNS 간편가입 제안·로그인 진입 화면 재설계 — 운영 오픈 후 7일간 신규 가입자의 79.4%가 간편가입 선택",
      "성능 개선: 어드민 업로드 압축·WebP 정책을 연결해 메인 이미지 전송량 94% 경량화",
      "성과·품질 측정 환경 구축: GA4·Search Console·어드민 데이터를 연결해 이벤트 성과와 성능·SEO 지표를 한곳에서 확인하는 대시보드 개발",
      "협업 기준 문서화: 화면 정책과 공통 UI, 성능·SEO 점검 기준, 코드·커밋 규칙을 정리해 협업과 온보딩에 활용",
      "실시간 채팅 웹앱(PWA) 단독 개발: Sendbird 기반 17종 메시지 UI와 Firebase FCM 알림·Service Worker 캐싱 구현",
    ],
    location: "서울",
  },
  {
    id: 2,
    period: "2022.04~2024.07(2년 4개월)",
    company: "Weniv",
    kor: "위니브",
    position: "프론트엔드 개발자",
    team: "개발팀",
    info: "ICT 교육 관련 온·오프라인 강의, 전자책, 웹 서비스, 콘퍼런스 등을 제공하는 기업",
    description: [
      "WeniVooks 웹 교안 서비스 구축 리드(4인 팀): Notion 교안의 학습 흐름 단절·실습 전환 비용·검색 미노출을 문제 정의하고, React SPA 중심 환경에서 신규 서비스에 Next.js(SSR)를 도입해 웹 교안으로 전환 — 런칭 3개월 만에 구글 검색 노출 31.7만 회(Search Console, 2024.05~07)",
      "서비스 통합 분석 대시보드 구축(디자인·프론트 100% 담당): 흩어진 서비스 운영 데이터를 한 기준으로 비교하는 사내 대시보드 — 데이터 담당자와 API 응답 구조 협의부터 설계, 서비스 유지·개선 우선순위 판단에 활용",
      "개발 환경 개선: Next.js, TypeScript, Storybook 도입으로 사내 코드 품질 향상 주도",
      "문서화·교육: 코드 컨벤션·프로젝트 문서 가이드 정비, 부트캠프 강의 및 교육 콘텐츠 제작",
    ],
    location: "제주",
  },
  {
    id: 3,
    period: "2019.03 ~ 2021.08 (2년 6개월)",
    company: "TeemStone",
    kor: "팀스톤",
    team: "연구개발센터 기획팀",
    position: "웹 디자이너&퍼블리셔 / 선임연구원(과장)",
    info: "기업용 IT 인프라 모니터링 및 성능 관리 솔루션 개발 전문기업",
    description: [
      "실시간 모니터링 솔루션 UI/UX 설계, 웹 대시보드 프로토타입 제작",
      "자사 홈페이지 리뉴얼 퍼블리싱, 제품 소개 자료·브로슈어·홍보 영상 디자인",
    ],
    location: "서울",
    images: [
      "/career/teemstone_1.jpg",
      "/career/teemstone_2.jpg",
      "/career/teemstone_3.jpg",
    ],
  },
  {
    id: 4,
    period: "2017.07 ~ 2018.12 (1년 6개월)",
    company: "Geryon",
    kor: "게리온",
    team: "브랜드 기획부 디자인팀",
    position: "웹 디자이너&퍼블리셔 / 대리(팀장)",
    info: "투자 상담 및 자문 서비스 제공 기업",
    description: [
      "브랜드 홈페이지 디자인·퍼블리싱, 투자 서비스 랜딩/콘텐츠 디자인",
      "광고 소재 제작, 디자인 업무 일정·품질 관리",
    ],
    location: "서울",
    images: [
      "/career/geryon_1.jpg",
      "/career/geryon_2.jpg",
      "/career/geryon_3.jpg",
    ],
  },
  {
    id: 5,
    period: "2016.03 ~ 2017.07 (1년 5개월)",
    company: "Dong-A Media N",
    kor: "동아미디어엔",
    team: "DBR/HBR사업팀",
    position: "웹 디자이너&퍼블리셔 / 대리",
    info: "동아미디어그룹의 방송솔루션 및 디지털서비스 운영 전문기업",
    description: [
      "DBR/HBR 등 서비스 웹·모바일 화면 디자인 및 퍼블리싱",
      "자사 홈페이지 운영, 이메일·프로모션 페이지 제작",
    ],
    location: "서울",
    images: [
      "/career/dunet_1.jpg",
      "/career/dunet_2.jpg",
      "/career/dunet_3.jpg",
    ],
  },
  {
    id: 6,
    period: "2013.09 ~ 2015.11 (2년 3개월)",
    company: "SkoInfo",
    kor: "스코인포(부산)",
    team: "디자인팀",
    position: "웹 디자이너&퍼블리셔 / 대리",
    info: "전자정부표준프레임워크 기반의 공공데이터 솔루션 개발 및 구축 전문기업",
    description: [
      "공공기관 웹·모바일 디자인 및 퍼블리싱, 웹 표준·웹 접근성 인증마크 프로젝트 참여",
      "반응형 화면과 콘텐츠 구조 개선",
    ],
    location: "부산",
    images: [
      "/career/skoinfo_1.jpg",
      "/career/skoinfo_2.jpg",
      "/career/skoinfo_3.jpg",
    ],
  },
  {
    id: 7,
    period: "2009.12 ~ 2012.11 (3년)",
    company: "Kidan Landscape Design Group",
    kor: "기단조경설계사무소",
    team: "설계팀",
    position: "조경설계사 / 기사",
    info: "",
    description: [
      "조경 설계 및 디자인",
      "CAD 도면 설계, Photoshop 2D 이미지 작업, SketchUp 3D 렌더링",
      "대학교 2학년 겨울방학부터 인턴 시작, 졸업 후 취업",
    ],
    location: "부산",
  },
];
