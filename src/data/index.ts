import { BarChart, Book, Code2, Layout, LucideIcon, Users } from "lucide-react";

export type IconName = "BarChart" | "Book" | "Layout" | "Code2" | "Users";

export interface I_PROJECTS {
  type: "개인" | "업무";
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

  skills: string[];
  person: string;
  roles: string[];
  insights: string[];
  jobs: string[];
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
