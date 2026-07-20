import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { I_PROJECTS, ProjectHeading } from "@data/project";
import { remark } from "remark";
import { visit } from "unist-util-visit";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { Heading, PhrasingContent, Root } from "mdast";
import { Element } from "hast";
import { h } from "hastscript";
import remarkDirective from "remark-directive";
import rehypePrettyCode from "rehype-pretty-code";
const projectsDirectory = path.join(process.cwd(), "projects");

function getNodeText(node: PhrasingContent): string {
  if ("value" in node && typeof node.value === "string") {
    return node.value;
  }

  if ("children" in node && Array.isArray(node.children)) {
    return node.children
      .map((child) => getNodeText(child as PhrasingContent))
      .join("");
  }

  return "";
}

function getHeadingText(node: Heading): string {
  return node.children.map(getNodeText).join("");
}

/**
 * 마크다운의 H1(#) 헤딩을 순서대로 추출해 앵커 id를 자동 부여한다.
 * - id: `section1`, `section2` … (등장 순서 기반)
 * - 추출한 목록은 Nav 렌더에 재사용하므로, 프로젝트를 추가해도 코드 수정이 필요 없다.
 * 헤딩 레벨은 페이지 문맥에 맞춰 h1→h2, h2→h3, h3→h4로 낮춘다(페이지 제목이 h1이므로 그 하위 섹션은 h2부터 시작).
 */
function adjustHeadingLevel(headings: ProjectHeading[]) {
  return (tree: Root) => {
    visit(tree, "heading", (node: Heading) => {
      const isSection = node.depth === 1;

      if (node.depth === 1) {
        node.depth = 2;
      } else if (node.depth === 2) {
        node.depth = 3;
      } else if (node.depth === 3) {
        node.depth = 4;
      }

      if (isSection) {
        const id = `section${headings.length + 1}`;
        headings.push({ id, text: getHeadingText(node) });
        node.data = { ...node.data, hProperties: { id } };
      }
    });
  };
}

function addClasses() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName === "ul") {
        node.properties = node.properties || {};
        node.properties.className = ["list"];
      }
    });
  };
}

/**
 * 외부 링크(http로 시작)를 새 탭에서 열고, 링크임을 알리는 클래스를 부여한다.
 * - target="_blank"에는 보안상 rel="noopener noreferrer"를 함께 붙인다.
 * - 스타일 훅으로 external 클래스를 달아, 상세 페이지 CSS에서 밑줄·외부 링크 아이콘을 붙인다.
 */
function externalLinks() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName !== "a") return;
      const href = node.properties?.href;
      if (typeof href !== "string" || !/^https?:\/\//.test(href)) return;

      node.properties = node.properties || {};
      node.properties.target = "_blank";
      node.properties.rel = "noopener noreferrer";
      const prev = node.properties.className;
      const classes = Array.isArray(prev) ? prev : prev ? [String(prev)] : [];
      node.properties.className = [...classes, "external"];
    });
  };
}

export async function getAllProjects() {
  const allProjectsData = await Promise.all(
    getProjectIds().map(async (id) => {
      const project = await getProject(id);
      return project;
    })
  );

  return allProjectsData.sort((a, b) => a.index - b.index);
}

export function getProjectIds() {
  return fs
    .readdirSync(projectsDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""))
    .sort();
}

export async function getProject(fileName: string) {
  const fullPath = path.join(projectsDirectory, `${fileName}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  // 파싱 중 H1 헤딩을 순서대로 수집한다(Nav 목차에 재사용)
  const headings: ProjectHeading[] = [];

  // MD -> HTML 전환
  const processedContent = await remark()
    .use(adjustHeadingLevel, headings)
    .use(remarkDirective) // 확장구문 사용
    .use(myRemarkPlugin) // 확장구문 사용
    .use(remarkRehype)
    .use(addClasses)
    .use(externalLinks)
    .use(rehypePrettyCode, {
      theme: "github-light",
    })
    .use(rehypeStringify)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();

  return {
    id: fileName,
    ...(matterResult.data as Omit<I_PROJECTS, "id" | "headings" | "content">),
    headings,
    content: contentHtml,
  };
}

function myRemarkPlugin() {
  return function (tree: Root) {
    visit(tree, function (node: any) {
      if (
        node.type === "containerDirective" ||
        node.type === "leafDirective" ||
        node.type === "textDirective"
      ) {
        const data = node.data || (node.data = {});

        const hast = h(node.name, node.attributes || {});

        // @ts-expect-error Hast properties mismatch
        data.hName = hast.tagName;
        // @ts-expect-error Hast properties mismatch
        data.hProperties = hast.properties;
      }
    });
  };
}
