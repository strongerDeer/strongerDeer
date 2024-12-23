import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { I_PROJECTS } from "@data/project";
import { remark } from "remark";
import { visit } from "unist-util-visit";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

const projectsDirectory = path.join(process.cwd(), "projects");

function adjustHeadingLevel() {
  return (tree: any) => {
    visit(tree, "heading", (node) => {
      // h2(##)를 h4로 변경
      if (node.depth === 2) {
        node.depth = 4;
      }
    });
  };
}

function addClasses() {
  return (tree: any) => {
    visit(tree, "element", (node) => {
      if (node.tagName === "ul") {
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
