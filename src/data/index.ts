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
      "Firebase",
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
    description: "자사 서비스 맞춤형 데이터 분석 대시보드",
    longDesc: "",
    tags: ["TypeScript", "Next.js", "React", "Chart.js", "Sass(scss)"],
    icon: "Layout",
    metrics: ["성과1", "성과2"],
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
      "배포 주기 2주 → 2일로 단축",
      "프론트엔드 테스트 커버리지 92%",
      "코드 재사용률 80% 달성",
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
    longDesc: "초당 1000건 이상의 데이터 실시간 처리 및 시각화",
    tags: ["React"],
    icon: "BarChart",
    metrics: [
      "데이터 처리 지연시간 300ms → 50ms",
      "동시 접속자 3000명 처리",
      "시스템 안정성 99.9% 달성",
    ],
    url: "https://jejuai.kr/",
    github: "https://github.com/weniv/jejuwebconf",
  },

  {
    type: "업무",
    title: "Weniv Link",
    kor: "위니브 링크",
    thumb: "/project_wenivlink.png",
    description:
      "긴 URL를 짧게 단축시켜주는 서비스. QR 코드 생성 및 다운로드 기능 제공",
    longDesc: "초당 1000건 이상의 데이터 실시간 처리 및 시각화",
    tags: ["HTML", "Sass(scss)", "JavaScript"],
    icon: "BarChart",
    metrics: [
      "디자인 시안 없이 직접 UI/UX, 개발을 동시 진행하여 제작 기간 단축",
      "단하고 직관적인 UI/UX 구현",
    ],
    url: "https://weniv.link/",
  },
  {
    type: "업무",
    title: "Weniv Bootcamp",
    kor: "위니브 부트캠프",
    thumb: "/project_bootcamp.png",
    description: "온라인 개발 강의 소개 및 수강생 모집용 홍보 사이트.",
    longDesc: "",
    tags: ["Next.js", "React", "Sass(scss)"],
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
    description: "온라인 개발 강의 소개 및 수강생 모집용 홍보 사이트.",
    longDesc: "",
    tags: ["HTML", "CSS", "JavaScript", "anime.js"],
    icon: "BarChart",
    metrics: ["", ""],
    url: "https://jejualcam.co.kr/",
    github: "https://github.com/weniv/AlgorithmCamp",
  },
  {
    type: "업무",
    title: "TeemStone",
    kor: "팀스톤",
    thumb: "/project_teemstone.png",
    description: "온라인 개발 강의 소개 및 수강생 모집용 홍보 사이트.",
    longDesc: "",
    tags: ["HTML", "CSS", "JavaScript", "jQuery"],
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
      "웹 퍼블리싱(HTML,CSS,Sass,Javascript)",
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
      "웹 퍼블리싱(HTML,CSS,Sass,Javascript)",
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
      "DBR 홈페이지 리뉴얼",
      "웹,모바일 디자인 및 퍼블리싱/ 자사 홈페이지 관리 등",
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
      "웹/모바일 디자인 및 퍼블리싱, 웹표준, 웹접근성 등",
      "웹 접근성 참여 이력 : 고성군청/거제시청/모바일 부산/부산진구청/군산시청 외 다수",
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
    description: ["조경 설계 "],
    location: "부산",
  },
];
