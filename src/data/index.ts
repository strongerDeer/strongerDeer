import { BarChart, Book, Code2, Layout, LucideIcon, Users } from "lucide-react";

type IconName = "BarChart" | "Book" | "Layout" | "Code2" | "Users";

export interface I_PROJECTS {
  type: string;
  thumb: string;
  title: string;
  kor: string;
  description: string;
  longDesc: string;
  tags: string[];
  icon: IconName;
  metrics: string[];
  url: string;
  github?: string;
}

export const ICON_MAP: Record<IconName, LucideIcon> = {
  BarChart: BarChart,
  Book: Book,
  Layout: Layout,
  Code2: Code2,
  Users: Users,
} as const;

export const SKILL = {
  language: ["TypeScript", "JavaScript"],
  front: ["Next.js", "Recoil", "React-Query", "Sass", "CSS", "Tailwind CSS"],
  back: ["Firebase"],
  DevOps: ["AWS", "Vercel"],
};
export const PROJECTS: I_PROJECTS[] = [
  {
    type: "개인",
    title: "page0127.",
    thumb: "",
    kor: "페이지 읽다",
    description: "나만의 온라인 책장",
    longDesc: "",
    tags: [
      "TypeScript",
      "Next.js",
      "React-Query",
      "Recoil",
      "Sass(scss)",
      "VanillaExtract",
      "Firebase",
      "Design",
    ],
    icon: "Book",
    metrics: ["성과1", "성과2"],
    url: "https://page0127.vercel.app/",
    github: "https://github.com/strongerDeer/page0127",
  },
  {
    type: "업무",
    title: "Weniv Analytics",
    thumb: "/project_analytics.jpg",
    kor: "위니브 분석 대시보드",
    description: "자사 데이터 분석 대시보드",
    longDesc: "",
    tags: ["TypeScript", "Next.js", "Sass(scss)", "Design"],
    icon: "Layout",
    metrics: [
      "디자인, 프론트엔드 주도, 디자인 시안 작업 없이 빠르게 진행하여 프로젝트 일정 단축",
      "자사의 데이터를 시각화함(Chart.js 사용)으로 데이터 기반의 의사결정 지원",
      "자사 프로젝트 처음으로 TypeScript 도입, 코드 품질 향상 및 타입 안전성 강화",
    ],
    url: "https://main.d393vrk35k9yt8.amplifyapp.com/",
  },
  {
    type: "업무",
    title: "WeniVooks",
    thumb: "/project_wenivooks.png",
    kor: "위니북스",
    description: "개발 입문자들을 위한 온라인 개발 교안 서비스",
    longDesc: "",
    tags: ["Next.js", "Sass(scss)"],
    icon: "Layout",
    metrics: [
      "React SPA 기술을 사용하던 회사에  Next.js 기술 도입, 검색엔진 최적화로 사용자 유입 증가",
      "인터랙티브 코드 예제 도입으로 학습자 참여도 증가",
      "반응형, 테마 적용, 접근성 작업을 통해 다양한 사용자 환경 지원",
    ],
    url: "https://www.books.weniv.co.kr/",
  },
  {
    type: "업무",
    title: "2024 Jeju AI Conference",
    thumb: "/project_jeju_ai_conf.png",
    kor: "제주 AI 컨퍼런스",
    description:
      "AI로 문제를 해결한 실제 경험과 통찰을 공유하는 컨퍼런스 사이트",
    longDesc: "",
    tags: ["Next.js", "TypeScript", "Sass(scss)", "GitHub Action"],
    icon: "BarChart",
    metrics: [
      "짧은 기간 내에 사이트 제작 완료(약 3일)",
      "유지보수를 고려한 사이트 컨텐츠 JSON 데이터 처리",
      "비 개발직군의 팀을 위한 매뉴얼 작성 및 공유",
    ],
    url: "https://jejuai.kr/",
    github: "https://github.com/weniv/jejuai-conf",
  },

  {
    type: "업무",
    title: "Weniv Link",
    kor: "위니브 링크",
    thumb: "/project_wenivlink.png",
    description: "URL 단축 서비스. QR 코드 생성 및 다운로드 기능 제공",
    longDesc: "초당 1000건 이상의 데이터 실시간 처리 및 시각화",
    tags: ["HTML", "Sass(scss)", "JavaScript", "Design"],
    icon: "BarChart",
    metrics: [
      "캐릭터를 활용한 애니메이션 UI 디자인으로 친근하고 재미있는 사용자 경험 제공",
      "QR 코드 생성 및 다운로드 기능 구현 (QRCode.js 사용)",
      "hover, click 등의 인터랙션을 통해 재미있고 디테일한 UX 디자인 적용",
    ],
    url: "https://weniv.link/",
  },
  {
    type: "업무",
    title: "Weniv Bootcamp",
    kor: "위니브 부트캠프",
    thumb: "/project_bootcamp.png",
    description: "위니브 온라인 개발 강의 소개 및 수강생 모집용 홍보 사이트",
    longDesc: "",
    tags: ["Next.js", "Sass(scss)"],
    icon: "BarChart",
    metrics: ["", ""],
    url: "https://bootcamp.weniv.co.kr/",
    github: "https://github.com/weniv/bootcamp",
  },
  {
    type: "업무",
    title: "Jeju Algorithm Basecamp",
    kor: "제주 알고리즘 베이스 캠프",
    thumb: "/project_jeju_algorithm_basecamp.png",
    description: "제주 알고리즘 베이스 캠프 소개 사이트",
    longDesc: "",
    tags: ["HTML", "Sass(scss)", "JavaScript"],
    icon: "BarChart",
    metrics: ["스크롤에 따라 움직이는 애니메이션 구현(anime.js 사용)", ""],
    url: "https://jejualcam.co.kr/",
    github: "https://github.com/weniv/AlgorithmCamp",
  },
  {
    type: "업무",
    title: "TeemStone",
    kor: "팀스톤",
    thumb: "/project_teemstone.png",
    description: "TeemStone 회사 사이트",
    longDesc: "",
    tags: ["HTML", "CSS", "JavaScript", "jQuery", "Design"],
    icon: "BarChart",
    metrics: ["", ""],
    url: "https://ontune.co.kr/",
  },
];
export const ACHIEVEMENTS = [
  {
    title: "다양한 IT 경험",
    items: [
      "많은 홈페이지 구축 및 다양한 디자인 경험",
      "디자인 팀장 경험",
      "업무 확장성 보유",
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
    period: "2022.04 - 2024.07 (2년 3개월)",
    company: "Weniv",
    kor: "위니브",
    position: "프론트엔드 개발자 / 프로젝트 팀장",
    description: [
      "Next.js와 TypeScript 도입으로 회사 내 코드 품질 향상",
      "SEO(검색엔진최적화)작업을 통한 회사 웹 콘텐츠 검색 노출 개선",
      "자사 서비스 웹 제작 및 UI/UX 디자인 개선",
      "자사 맞춤형 분석 대시보드 개발",
      "디자인/퍼블리싱 노하우로 초보 개발자를 위한 시각적, 실무 중심 학습 자료 제작",
    ],
    location: "제주",
  },
  {
    id: 2,
    period: "2019.03  2021.08 (2년 7개월)",
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
      "웹/앱 디자인 및 퍼블리싱(웹표준, 웹접근성)",
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
