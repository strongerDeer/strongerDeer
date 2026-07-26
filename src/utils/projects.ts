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

/**
 * 마크다운의 ![alt](….mp4) 를 <video> 로 바꾼다.
 *
 * 원래 GIF 였으나 자동 재생·무한 반복에 정지 수단이 없어 WCAG 2.2.2(Pause, Stop, Hide)
 * 를 만족하지 못했다. <video controls> 는 네이티브 재생/정지 컨트롤을 주므로
 * 클라이언트 JS 없이 해결된다.
 * - preload="none": 재생을 누르기 전까지 영상을 받지 않는다(포스터만 로드)
 * - poster: 같은 이름의 .webp(첫 프레임)
 * - alt 텍스트는 aria-label 로 옮겨 접근 가능한 이름을 유지한다
 *
 * 새 영상을 추가할 때는 mp4 와 같은 이름의 포스터 .webp 를 함께 넣어야 한다:
 *   ffmpeg -i in.gif -movflags faststart -pix_fmt yuv420p \
 *     -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" -c:v libx264 -crf 28 -preset slow -an out.mp4
 *   (포스터는 첫 프레임을 webp 로 저장)
 */
function videoFromMarkdownImage() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName !== "img") return;
      const src = node.properties?.src;
      if (typeof src !== "string" || !src.endsWith(".mp4")) return;

      const alt = node.properties?.alt;
      node.tagName = "video";
      node.properties = {
        controls: true,
        preload: "none",
        poster: src.replace(/\.mp4$/, ".webp"),
        ...(typeof alt === "string" && alt ? { "aria-label": alt } : {}),
      };
      node.children = [
        h("source", { src, type: "video/mp4" }),
        { type: "text", value: "이 브라우저는 video 태그를 지원하지 않습니다." },
      ];
    });
  };
}

/**
 * 마크다운 본문 이미지에 지연 로딩을 붙인다.
 *
 * next/image 로 넣은 썸네일과 달리 마크다운에서 온 <img> 는 아무 속성이 없어
 * 화면 밖 이미지까지 전부 즉시 내려받았다(Lighthouse "Defer offscreen images" 206KiB).
 * 본문 이미지는 sticky 헤더·핵심 결과·대표 썸네일 아래에 있어 첫 화면에 걸리지 않으므로
 * 전부 lazy 로 돌려도 LCP 후보를 늦추지 않는다.
 */
function lazyLoadImages() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName !== "img") return;
      node.properties = {
        ...node.properties,
        loading: "lazy",
        decoding: "async",
      };
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
    // 순서 주의 — video 변환을 먼저 해야 mp4 가 img 로 남아 lazy 속성을 받지 않는다.
    .use(videoFromMarkdownImage)
    .use(lazyLoadImages)
    .use(rehypePrettyCode, {
      // github-light 는 주석·문자열 토큰이 대비 3.17~4.38 로 AA 미달이라
      // 동일 계열의 고대비 테마를 쓴다.
      // 라이트/다크 두 테마를 함께 내보내면 각 토큰에 --shiki-light/--shiki-dark 가
      // 붙어 CSS 에서 골라 쓸 수 있다(globals.scss 의 pre 규칙 참고).
      // 단일 테마로 두면 다크 모드에서 배경만 어두워지고 토큰 색은 라이트용이라 대비가 무너진다.
      theme: {
        light: "github-light-high-contrast",
        dark: "github-dark-high-contrast",
      },
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
