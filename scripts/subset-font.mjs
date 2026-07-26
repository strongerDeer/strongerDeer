// PretendardVariable 서브셋 생성 (빌드 전 자동 실행: package.json 의 predev/prebuild)
//
// 원본은 한글 전체 글리프를 담아 2MB 다. 이 사이트가 실제로 쓰는 문자는 700자 남짓이라
// 대부분이 낭비다. 빌드마다 콘텐츠에서 문자를 다시 수집해 서브셋을 만들므로
// 본문을 고쳐도 폰트가 낡지 않는다.
//
// 문자 수집은 소스에서 한다 — 빌드 산출물(out/*.html)만 보면
// `{showAll ? "접기" : text}` 처럼 한쪽 분기만 렌더된 문자열을 놓친다.

import { readFile, writeFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import subsetFont from "subset-font";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(root, "src/font/PretendardVariable.woff2");
const OUT = path.join(root, "src/font/PretendardVariable.subset.woff2");

// 콘텐츠가 들어 있는 곳. src 전체 + 마크다운 원고.
const SCAN_DIRS = [path.join(root, "src"), path.join(root, "projects")];
const SCAN_EXT = new Set([".ts", ".tsx", ".md", ".scss", ".json"]);

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === "font") continue;
      yield* walk(p);
    } else if (SCAN_EXT.has(path.extname(entry.name))) {
      yield p;
    }
  }
}

// 안전마진: 받침 없는 음절 399자(초성 19 × 중성 21)만 더한다.
// 스크립트가 돌지 않은 채 원고를 고쳐 보는 경우(예: npm run dev 대신 next dev 직결)
// 새 글자가 폴백 폰트로 튀는 걸 가장 흔한 경우부터 덮는다.
//
// 마진 크기별 실측 — 원본 2009KB 기준:
//   마진 없음        888자 → 159KB
//   +399자(현재)    1103자 → 195KB
//   +상용 2350자 근사 3113자 → 538KB
// 마진을 늘릴수록 비용이 급격히 커져 399자에서 끊었다. 빌드마다 재생성되므로
// 정상 경로에서는 마진이 쓰일 일이 없다 — 순수 보험이다.
function hangulSafetyMargin() {
  const s = new Set();
  for (let cho = 0; cho < 19; cho++) {
    for (let jung = 0; jung < 21; jung++) {
      s.add(String.fromCharCode(0xac00 + (cho * 21 + jung) * 28));
    }
  }
  return s;
}

const chars = new Set();

// 1) 소스에서 수집
for (const dir of SCAN_DIRS) {
  try {
    await stat(dir);
  } catch {
    continue;
  }
  for await (const file of walk(dir)) {
    for (const ch of await readFile(file, "utf8")) chars.add(ch);
  }
}
const fromSource = chars.size;

// 2) 라틴·숫자·구두점 전체(U+0020–U+00FF)와 자주 쓰는 기호
for (let c = 0x20; c <= 0xff; c++) chars.add(String.fromCharCode(c));
for (const ch of "―—–·…‘’“”→←↑↓↔※□■○●◆★☆✓✔✕✖") chars.add(ch);

// 3) 한글 안전마진
for (const ch of hangulSafetyMargin()) chars.add(ch);

// 폰트가 담지 않는 것들은 빼둔다(이모지는 시스템 폰트가 그린다).
const text = [...chars]
  .filter((ch) => {
    const cp = ch.codePointAt(0);
    return cp > 0x1f && cp < 0x1f000 && ch !== "";
  })
  .join("");

const original = await readFile(SRC);
const subset = await subsetFont(original, text, {
  targetFormat: "woff2",
  // 가변 축(wght 100–900)을 유지한다 — 로고가 font-weight 를 애니메이션하므로
  // 축이 고정되면 굵기 그라데이션이 전부 같은 두께로 무너진다.
  variationAxes: { wght: { min: 100, max: 900 } },
});

await writeFile(OUT, subset);

const kb = (b) => `${(b / 1024).toFixed(0)}KB`;
console.log(
  `[subset-font] ${kb(original.length)} → ${kb(subset.length)} ` +
    `(${(100 - (subset.length / original.length) * 100).toFixed(1)}% 감소)\n` +
    `             문자 ${text.length}자 = 소스 수집 ${fromSource}자 + 라틴·기호 + 한글 안전마진 399자`
);
