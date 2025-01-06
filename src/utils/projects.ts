import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { I_PROJECTS } from "@data/project";
import { remark } from "remark";
import { visit } from "unist-util-visit";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { Heading, Root } from "mdast";
import { Element } from "hast";
import { h } from "hastscript";
import remarkDirective from "remark-directive";
import rehypePrettyCode from "rehype-pretty-code";
const projectsDirectory = path.join(process.cwd(), "projects");

function adjustHeadingLevel() {
  return (tree: Root) => {
    visit(tree, "heading", (node: Heading) => {
      // h1(#)를 h3로 변경
      if (node.depth === 1) {
        node.depth = 3;
      } else if (node.depth === 2) {
        node.depth = 4;
      } else if (node.depth === 3) {
        node.depth = 5;
      }

      const headingText = node.children
        .map((child) => (child.type === "text" ? child.value : ""))
        .join("");

      if (headingText === "🤔 배경") {
        node.data = { ...node.data, hProperties: { id: "section1" } };
      } else if (headingText === "📝 기획") {
        node.data = { ...node.data, hProperties: { id: "section2" } };
      } else if (headingText === "🛠️ 기술 스택") {
        node.data = { ...node.data, hProperties: { id: "section3" } };
      } else if (headingText === "🔍 기능") {
        node.data = { ...node.data, hProperties: { id: "section4" } };
      } else if (headingText === "🚨 트러블슈팅") {
        node.data = { ...node.data, hProperties: { id: "section5" } };
      } else if (headingText === "🎯 성과 및 기여") {
        node.data = { ...node.data, hProperties: { id: "section6" } };
      } else if (headingText === "💡 인사이트") {
        node.data = { ...node.data, hProperties: { id: "section7" } };
      } else if (headingText === "📈 향후 개선 계획") {
        node.data = { ...node.data, hProperties: { id: "section8" } };
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

export async function getAllProjects() {
  const fileNames = fs.readdirSync(projectsDirectory);

  const allProjectsData = await Promise.all(
    fileNames.map(async (fileName) => {
      const id = fileName.replace(/\.md$/, "");
      const fullPath = path.join(projectsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const matterResult = matter(fileContents);

      // MD -> HTML 전환
      const processedContent = await remark()
        .use(adjustHeadingLevel)
        .use(remarkRehype)
        .use(addClasses)
        .use(rehypeStringify)
        .process(matterResult.content);

      const contentHtml = processedContent.toString();

      return {
        id,
        ...(matterResult.data as Omit<I_PROJECTS, "id">),
        content: contentHtml,
      };
    })
  );

  return allProjectsData;
}

export async function getProject(fileName: string) {
  const fullPath = path.join(projectsDirectory, `${fileName}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  // MD -> HTML 전환
  const processedContent = await remark()
    .use(adjustHeadingLevel)
    .use(remarkDirective) // 확장구문 사용
    .use(myRemarkPlugin) // 확장구문 사용
    .use(remarkRehype)
    .use(addClasses)
    .use(rehypePrettyCode, {
      theme: "github-light",
    })
    .use(rehypeStringify)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();

  return {
    id: fileName,
    ...(matterResult.data as Omit<I_PROJECTS, "id">),
    content: contentHtml,
  };
}

function myRemarkPlugin() {
  return function (tree: Root) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
