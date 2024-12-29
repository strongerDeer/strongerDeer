import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { I_PROJECTS } from "@data/project";
import { remark } from "remark";
import { visit } from "unist-util-visit";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { Root } from "mdast";
import { Element } from "hast";
import { h } from "hastscript";
import remarkDirective from "remark-directive";
import rehypePrettyCode from "rehype-pretty-code";
const projectsDirectory = path.join(process.cwd(), "projects");

function adjustHeadingLevel() {
  return (tree: Root) => {
    visit(tree, "heading", (node) => {
      // h1(#)를 h3로 변경
      if (node.depth === 1) {
        node.depth = 3;
      } else if (node.depth === 2) {
        node.depth = 4;
      } else if (node.depth === 3) {
        node.depth = 5;
      }
    });
  };
}

function addClasses() {
  return (tree: Root) => {
    visit(
      tree,
      "element",
      (node: Element, index: number, parent: Element | null) => {
        if (node.tagName === "h4" && parent) {
          // 현재 노드 이후의 요소들을 수집
          const nextElements = [];
          let currentIndex = index + 1;

          while (
            currentIndex < parent.children.length &&
            (parent.children[currentIndex] as Element).tagName !== "h3" &&
            (parent.children[currentIndex] as Element).tagName !== "h4"
          ) {
            nextElements.push(parent.children[currentIndex]);
            currentIndex++;
          }

          // 새로운 div 요소 생성
          if (nextElements.length > 0) {
            const wrapperDiv: Element = {
              type: "element",
              tagName: "div",
              properties: { className: ["items"] },
              children: [node, ...nextElements],
            };

            // 원래 요소들을 div로 교체
            parent.children.splice(index, nextElements.length + 1, wrapperDiv);
          }
        }
      }
    );

    visit(tree, "element", (node: Element) => {
      if (node.tagName === "ul") {
        node.properties = node.properties || {};
        node.properties.className = ["list"];
      }
    });

    visit(tree, "element", (node: Element) => {
      if (node.tagName === "section") {
        // section의 첫 번째 자식이 div인지 확인
        const firstChild = node.children[0] as Element;
        if (firstChild?.tagName === "div") {
          // div의 첫 번째 자식이 h4인지 확인
          const h4Element = firstChild.children[0] as Element;
          if (
            h4Element?.tagName === "h4" &&
            h4Element.children[0]?.type === "text" &&
            h4Element.children[0]?.value === "Next.js"
          ) {
            node.properties = node.properties || {};
            const existingClasses =
              (node.properties.className as string[]) || [];
            node.properties.className = [...existingClasses, "skill"];
          }
        }
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
