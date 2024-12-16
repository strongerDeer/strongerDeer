import JS from "@components/icon/JS";
import Sass from "@components/icon/Sass";
import TS from "@components/icon/TS";
import VE from "@components/icon/VE";
import { IconType } from "react-icons";
import {
  FaCss3Alt,
  FaFolderOpen,
  FaHtml5,
  FaMarkdown,
  FaNpm,
  FaReact,
} from "react-icons/fa";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";

export type DevIconName =
  | "HTML"
  | "CSS"
  | "React"
  | "JS"
  | "TS"
  | "Next"
  | "MD"
  | "npm"
  | "Sass"
  | "TW"
  | "VE"
  | "folder";

interface IconStyle {
  icon: IconType; // React 컴포넌트 타입
  color: string;
  size?: number;
}

export const DEV_ICON_MAP: Record<DevIconName, IconStyle> = {
  HTML: {
    icon: FaHtml5,
    color: "#E34F26",
    size: 16,
  },
  CSS: {
    icon: FaCss3Alt,
    color: "#1572B6",
    size: 16,
  },
  React: {
    icon: FaReact,
    color: "#61DAFB",
    size: 16,
  },
  JS: {
    icon: JS,
    color: "#F7DF1E",
    size: 16,
  },
  TS: {
    icon: TS,
    color: "#3178C6",
    size: 16,
  },
  Next: {
    icon: RiNextjsFill,
    color: "#d2d2d2",
    size: 18,
  },
  MD: {
    icon: FaMarkdown,
    color: "#a67b4c",
    size: 16,
  },
  npm: {
    icon: FaNpm,
    color: "#CB3837",
    size: 20,
  },
  Sass: {
    icon: Sass,
    color: "#CC6699",
    size: 16,
  },
  TW: {
    icon: RiTailwindCssFill,
    color: "#06B6D4",
    size: 18,
  },
  VE: {
    icon: VE,
    color: "#1572B6",
    size: 16,
  },
  folder: {
    icon: FaFolderOpen,
    color: "#ddb67a",
    size: 16,
  },
} as const;

interface I_SubItem {
  id: string;
  name: string;
  icon: DevIconName;
}

interface I_Tab {
  id: number;
  name: string;
  subItems?: I_SubItem[];
  icon: DevIconName;
}

// 프로그램 아이템 인터페이스
interface I_Program {
  id: number;
  name: string;
  image: string;
  description: string;
}

export const TABS: I_Tab[] = [
  {
    id: 2,
    name: "HTML.html",
    icon: "HTML",
  },
  {
    id: 3,
    name: "CSS",
    icon: "folder",
    subItems: [
      { id: "css", name: "CSS.css", icon: "CSS" },
      { id: "sass", name: "Sass.scss", icon: "Sass" },
      { id: "vanilla", name: "VanillaExtract.css.ts", icon: "VE" },
      { id: "tailwind", name: "tailwind.css", icon: "TW" },
    ],
  },
  {
    id: 4,
    name: "JavaScript",
    icon: "folder",
    subItems: [
      { id: "js", name: "JavaScript.js", icon: "JS" },
      { id: "ts", name: "TypeScript.ts", icon: "TS" },
    ],
  },
  {
    id: 5,
    name: "React",
    icon: "folder",
    subItems: [
      { id: "react", name: "React.jsx", icon: "React" },
      { id: "next", name: "Next.js", icon: "Next" },
    ],
  },
  {
    id: 6,
    name: "package.json",
    icon: "npm",
  },
];

export const PROGRAMS: I_Program[] = [
  {
    id: 1,
    name: "VS Code",
    image: "/program/vsc.jpg",
    description:
      "확장프로그램, 코드 스니펫, 다양한 설정들을 활용하여 개발합니다.",
  },
  {
    id: 2,
    name: "Chrome",
    image: "/program/chrome.jpg",
    description:
      "크롬, 사파리, 오페라, 파이어폭스 등 다양한 브라우저 웹 표준 작업 가능합니다.",
  },
  {
    id: 3,
    name: "Notion",
    image: "/program/notion.png",
    description:
      "문서작업은 노션을 주로 사용합니다. PPT, Word, Excel 등 다양한 문서 작업이 가능합니다.",
  },
  {
    id: 4,
    name: "Figma",
    image: "/program/figma.jpg",
    description: "프로토타입, 베리언트 기능 등 다양한 작업에 능숙합니다.",
  },
  {
    id: 5,
    name: "Photoshop",
    image: "/program/ps.jpg",
    description: "다양한 이미지 작업이 가능합니다.",
  },
  {
    id: 6,
    name: "Illustrator",
    image: "/program/ai.jpg",
    description: "다양한 벡터 이미지 작업이 가능합니다.",
  },
];
