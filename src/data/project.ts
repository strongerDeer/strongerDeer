import {
  Binary,
  Book,
  BookOpenText,
  Building,
  ChartSpline,
  Cpu,
  Link,
  LucideIcon,
  Tent,
} from "lucide-react";

export const SKILL = [
  "HTML",
  "CSS",
  "Sass",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Design",
] as const;

export type SkillType = (typeof SKILL)[number];

export interface I_PROJECTS {
  type: "개인" | "업무";
  thumb: string;
  title: string;
  kor: string;
  description: string;
  longDesc: string;
  tags: SkillType[];
  icon: LucideIcon;
  metrics: string[];
  url: string;
  github?: string;

  skills: string[];
  person: string;
  role: string;
  insights: string[];
  jobs: string[];
}

export const PROJECTS: I_PROJECTS[] = [
  {
    type: "개인",
    title: "page0127.",
    thumb: "/project_page0127.jpg",
    kor: "페이지 읽다",
    description: "독서 기록 및  온라인 책장",
    longDesc: "",
    tags: ["TypeScript", "Next.js", "Sass", "Design"],
    skills: [
      "Next.js",
      "TypeScript",
      "React-Query",
      "Recoil",
      "Sass(scss)",
      "VanillaExtract",
      "Firebase",
      "Vercel",
    ],
    icon: Book,
    metrics: [
      "Next.js SSR을 활용한 초기 로딩 성능 및 SEO 최적화",
      "React Query 도입으로 데이터 캐싱 구현 및 서버 부하 감소",
      "무한 스크롤과 페이지네이션을 활용한 대용량 데이터 처리 최적화",
      "TypeScript 적용으로 코드 안정성 및 유지보수성 향상",
    ],
    url: "https://page0127.vercel.app/",
    github: "https://github.com/strongerDeer/page0127",

    person: "1인",
    role: "UI/UX 디자인, 프론트엔드 개발 , 백엔드(Firebase)",

    insights: [
      "Next.js 13의 새로운 App Router 아키텍처 학습 및 적용",
      "무한스크롤, 페이지네이션, 반응형 등 UI/UX 개선",
      "외부 오픈 API(알라딘) 연동",
    ],
    jobs: [
      "도서 검색 및 개인 책장 등록",
      "읽은 책 기록 및 평점 시스템",
      "실시간 좋아요 및 독서 통계",
      "반응형 웹 디자인",
      "무한 스크롤 및 페이지네이션",
    ],
  },
  {
    type: "업무",
    title: "Weniv Analytics",
    thumb: "/project_analytics.jpg",
    kor: "위니브 분석 대시보드",
    description: "자사 데이터 분석 대시보드",
    longDesc: "",

    tags: ["TypeScript", "Next.js", "Sass", "Design"],
    skills: ["TypeScript", "Next.js", "Sass(scss)"],

    person: "2인(디자인/프론트개발 1명, 백엔드/데이터분석 1명)",
    role: "UI/UX 디자인, 프론트엔드 개발",

    jobs: [
      "직관적인 UI/UX 디자인 설계 및 구현",
      "디자인 시안 없이 웹사이트 제작",
      "다양한 차트 라이브러리를 활용한 데이터 시각화",
      "SQL 코드 에디터 기능 구현",
    ],
    icon: ChartSpline,
    metrics: [
      "디자인, 프론트엔드 주도, 디자인 시안 작업 없이 빠르게 진행하여 프로젝트 일정 단축",
      "자사의 데이터를 시각화함(Chart.js 사용)으로 데이터 기반의 의사결정 지원",
      "자사 프로젝트 처음으로 TypeScript 도입, 코드 품질 향상 및 타입 안전성 강화",
    ],
    insights: [
      "TypeScript 학습을 통한 프론트엔드 개발 역량 강화",
      "데이터 엔지니어와의 협업으로 데이터 처리 및 커뮤니케이션 스킬 향상",
    ],
    url: "https://main.d393vrk35k9yt8.amplifyapp.com/",
  },
  {
    type: "업무",
    title: "WeniVooks",
    thumb: "/project_wenivooks.jpg",
    kor: "위니북스",
    description: "개발 입문자들을 위한 온라인 개발 교안 서비스",
    longDesc: "",
    tags: ["Next.js", "JavaScript", "Sass"],
    skills: ["Next.js", "JavaScript", "Sass"],
    icon: BookOpenText,
    metrics: [
      "React SPA 기술을 사용하던 회사에  Next.js 기술 도입, 검색엔진 최적화로 사용자 유입 증가",
      "인터랙티브 코드 예제 도입으로 학습자 참여도 증가",
      "반응형, 테마 적용, 접근성 작업을 통해 다양한 사용자 환경 지원",
    ],
    url: "https://www.books.weniv.co.kr/",
    person: "4인(프론트엔드 3명, 디자인 1명)",
    role: "프로젝트 팀장, UI/UX 기획, 프론트엔드 개발",
    insights: [],
    jobs: [],
  },
  {
    type: "업무",
    title: "2024 Jeju AI Conference",
    thumb: "/project_jeju_ai_conf.jpg",
    kor: "제주 AI 컨퍼런스",
    description:
      "AI로 문제를 해결한 실제 경험과 통찰을 공유하는 컨퍼런스 사이트",
    longDesc: "",
    tags: ["Next.js", "TypeScript", "Sass"],
    skills: ["Next.js", "TypeScript", "Sass(scss)", "GitHub Actions"],
    icon: Cpu,
    metrics: [
      "짧은 기간 내에 사이트 제작 완료(약 3일)",
      "유지 보수를 고려한 사이트 컨텐츠 JSON 데이터 처리",
      "비 개발직군의 팀을 위한 매뉴얼 작성 및 공유",
    ],
    url: "https://jejuai.kr/",
    github: "https://github.com/weniv/jejuai-conf",

    person: "2인(프론트엔드 1명, 디자인 1명)",
    role: "프로젝트 팀장, 프론트엔드 개발",
    insights: [],
    jobs: [],
  },

  {
    type: "업무",
    title: "Weniv Link",
    kor: "위니브 링크",
    thumb: "/project_wenivlink.jpg",
    description: "URL 단축 서비스. QR 코드 생성 및 다운로드 기능 제공",
    longDesc: "",
    tags: ["HTML", "Sass", "JavaScript", "Design"],
    skills: ["HTML", "Sass", "JavaScript"],
    icon: Link,
    metrics: [
      "캐릭터를 활용한 애니메이션 UI 디자인으로 친근하고 재미있는 사용자 경험 제공",
      "QR 코드 생성 및 다운로드 기능 구현 (QRCode.js 사용)",
      "hover, click 등의 인터랙션을 통해 재미있고 디테일한 UX 디자인 적용",
    ],
    url: "https://weniv.link/",

    person: "2인(프론트엔드 1명, 백엔드 1명)",
    role: "UI/UX 디자인, 프론트엔드 개발",

    insights: [],
    jobs: [],
  },
  {
    type: "업무",
    title: "Weniv Bootcamp",
    kor: "위니브 부트캠프",
    thumb: "/project_bootcamp.jpg",
    description: "위니브 온라인 개발 강의 소개 및 수강생 모집용 홍보 사이트",
    longDesc: "",
    tags: ["Next.js", "Sass"],
    skills: ["Next.js", "JavaScript", "Sass(scss)"],
    icon: Tent,
    metrics: [
      "Next.js를 이용한 정적 사이트 제작 SEO 최적화 작업",
      "컴포넌트 모듈화 및 콘텐츠 데이터 json 처리를 통한 콘텐츠 효율적 관리",
      "반응형 및 사용자의 화면모드(라이트/다크)를 고려한 CSS 작업",
    ],
    url: "https://bootcamp.weniv.co.kr/",
    github: "https://github.com/weniv/bootcamp",

    person: "2인(프론트엔드 1명, 디자인 1명)",
    role: "프로젝트 팀장, 프론트엔드 개발",
    insights: [],
    jobs: [],
  },
  {
    type: "업무",
    title: "Jeju Algorithm Basecamp",
    kor: "제주 알고리즘 베이스 캠프",
    thumb: "/project_jeju_algorithm_basecamp.jpg",
    description: "제주 알고리즘 베이스 캠프 소개 사이트",
    longDesc: "",
    tags: ["HTML", "Sass", "JavaScript", "Design"],
    skills: ["HTML", "Sass", "JavaScript"],
    icon: Binary,
    metrics: ["스크롤에 따라 움직이는 애니메이션 구현(anime.js 사용)", ""],
    url: "https://jejualcam.co.kr/",
    github: "https://github.com/weniv/AlgorithmCamp",
    person: "1인",
    role: "UI/UX 디자인, 프론트엔드 개발",
    insights: [],
    jobs: [],
  },
  {
    type: "업무",
    title: "TeemStone",
    kor: "팀스톤",
    thumb: "/project_teemstone.jpg",
    description: "TeemStone 회사 사이트",
    longDesc: "",
    tags: ["HTML", "CSS", "JavaScript", "Design"],
    skills: ["HTML", "CSS", "JavaScript", "jQuery"],
    icon: Building,
    metrics: [
      "한국, 미국, 호주 글로벌 홈페이지 리뉴얼",
      "SEO(검색엔진최적화) 개선",
    ],
    url: "https://ontune.co.kr/",
    person: "1인",
    role: "UI/UX 디자인, 프론트엔드 개발",
    insights: [],
    jobs: [],
  },
];
