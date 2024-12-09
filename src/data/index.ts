export interface I_PROJECTS {
  type: string;
  title: string;
  description: string;
  longDesc: string;
  tags: string[];
  icon: string;
  metrics: string[];
}
export const SKILL = {
  language: ["TypeScript", "JavaScript"],
  front: [
    "Next.js",
    "React",
    "Recoil",
    "React-Query",
    "Sass",
    "CSS",
    "Tailwind CSS",
  ],
  back: ["Firebase"],
  DevOps: ["AWS", "Vercel"],
};
export const PROJECTS = [
  {
    type: "개인",
    title: "page0127.",
    description: "온라인 서재",
    longDesc: "초기 로딩 시간 60% 감소, Lighthouse 점수 95점 달성",
    tags: [
      "TypeScript",
      "JavaScript",
      "Next.js",
      "React-Query",
      "Recoil",
      "Sass",
      "firebase",
    ],
    icon: "Cpu",
    metrics: [
      "페이지 로드 시간 2.5초 → 1초",
      "코어 웹 바이탈 지표 모두 Green",
      "사용자 체류시간 30% 증가",
    ],
  },
  {
    type: "업무",
    title: "마이크로 프론트엔드 아키텍처 설계",
    description: "레거시 모노리스 시스템의 점진적 현대화",
    longDesc: "Module Federation을 활용한 마이크로 프론트엔드 아키텍처 구축",
    tags: ["Architecture", "Webpack", "TypeScript"],
    icon: "Layout",
    metrics: [
      "배포 주기 2주 → 2일로 단축",
      "프론트엔드 테스트 커버리지 92%",
      "코드 재사용률 80% 달성",
    ],
  },
  {
    type: "업무",
    title: "실시간 데이터 시각화 대시보드",
    description: "WebSocket을 활용한 대규모 데이터 실시간 모니터링",
    longDesc: "초당 1000건 이상의 데이터 실시간 처리 및 시각화",
    tags: ["WebSocket", "D3.js", "React"],
    icon: "BarChart",
    metrics: [
      "데이터 처리 지연시간 300ms → 50ms",
      "동시 접속자 3000명 처리",
      "시스템 안정성 99.9% 달성",
    ],
  },
];
export const ACHIEVEMENTS = [
  {
    title: "기술 성과",
    items: [
      "GitHub 컨트리뷰션 1,200+",
      "오픈소스 프로젝트 3개 메인테이너",
      "기술 블로그 월 방문자 5,000+",
    ],
    icon: "Code2",
  },
  {
    title: "프로젝트 임팩트",
    items: [
      "대규모 서비스 성능 60% 개선",
      "모바일 전환율 25% 증가",
      "레거시 코드 현대화 리드",
    ],
    icon: "BarChart",
  },
  {
    title: "팀 협업",
    items: [
      "5인 개발팀 리드 경험",
      "코드 리뷰 문화 정착",
      "주니어 개발자 멘토링",
    ],
    icon: "Users",
  },
];

export interface I_CAREERS {
  id: number;
  period: string;
  company: string;
  position: string;
  description: string[];
  location: string;
}

export const CAREERS = [
  {
    id: 1,
    period: "2022.04 - 2024.07 (2년 3개월)",
    company: "위니브",
    position: "프론트엔드 개발자",
    description: ["웹 서비스 유지보수", "UI 컴포넌트 개발"],
    location: "제주",
  },
  {
    id: 2,
    period: "019.03  2021.08 (2년 7개월)",
    company: "팀스톤",
    position: "웹 디자이너&퍼블리셔",
    description: ["Vue.js 프로젝트 개발", "반응형 웹 디자인 구현"],
    location: "서울",
  },
  {
    id: 3,
    period: "2017.07 ~ 2018.12 (1년 6개월)",
    company: "게리온 / 브랜드기획부 디자인팀",
    position: "웹 디자이너&퍼블리셔",
    description: [
      "React 기반 웹 애플리케이션 개발",
      "UI/UX 개선 및 성능 최적화",
    ],
    location: "서울",
  },
  {
    id: 4,
    period: "2016.03 ~ 2017.07 (1년 5개월)",
    company: "디유넷 / DBR,HBR 사업팀",
    position: "웹 디자이너&퍼블리셔",
    description: [
      "React 기반 웹 애플리케이션 개발",
      "UI/UX 개선 및 성능 최적화",
    ],
    location: "서울",
  },
  {
    id: 5,
    period: "2013.09 ~ 2015.11 (2년 3개월)",
    company: "스코인포 부산 / 디자인팀",
    position: "웹 디자이너&퍼블리셔",

    description: [
      "React 기반 웹 애플리케이션 개발",
      "UI/UX 개선 및 성능 최적화",
    ],
    location: "부산",
  },
  ,
  {
    id: 6,
    period: "2009.12 ~ 2012.11(3년)",
    company: "기단조경기술사 사무소 / 설계팀",

    position: "조경기사",
    description: [
      "React 기반 웹 애플리케이션 개발",
      "UI/UX 개선 및 성능 최적화",
    ],
    location: "부산",
  },
];
