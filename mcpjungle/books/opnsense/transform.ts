/**
 * OPNsense 官方文件 → docs-mcp 語料 opnsense-en / opnsense-zh-tw 的篩選與轉換(純函式,供匯入腳本與測試使用)。
 */

/** 檔名是否屬收錄範圍(`NN 標題.md`;排除 `000 目錄`、`000 全書`) */
export function isIncluded(filename: string): boolean {
  return /^\d+ .*\.md$/.test(filename) && !filename.startsWith("000 ");
}

export interface TransformResult {
  content: string;
  /** 無法轉換的原稿行(行號從 1 起算):仍含 `../images/`、空連結 `[](`,或包圖的外層連結不是 http */
  leftovers: number[];
}

/** 本機圖片路徑:`<../images/x>`(角括號內可含括號)或 `../images/x` */
const IMAGE_PATH = String.raw`(?:<\.\.\/images\/[^>]*>|\.\.\/images\/[^)\s]*)`;
/** `[![alt](<../images/x>)](url)` */
const LINKED_IMAGE = new RegExp(String.raw`\[!\[([^\]]*)\]\(${IMAGE_PATH}\)\]\((https?:\/\/[^)\s]+)\)`, "g");
/** 換完 LINKED_IMAGE 後仍剩的包連結圖(外層不是 http 連結) */
const UNCONVERTED_LINKED = new RegExp(String.raw`\[!\[[^\]]*\]\(${IMAGE_PATH}\)\]\(`);
/** `![alt](<../images/x>)` */
const BARE_IMAGE = new RegExp(String.raw`!\[([^\]]*)\]\(${IMAGE_PATH}\)`, "g");

const isNav = (line: string) => line.startsWith("[⬆ 目錄]") || line.startsWith("> 章節：");
/** alt 是一般文字(非空、不是路徑) */
const isTextAlt = (alt: string) => alt !== "" && !alt.includes("/");

/**
 * 轉換單篇:
 *  - 移除導覽列(`[⬆ 目錄]…`,頂端與結尾各一)與章節麵包屑(`> 章節：…`),連同其後空行與檔尾的 `---`
 *  - frontmatter 的 `source: "url"` 去引號
 *  - 包外層連結的圖改為 `[圖：alt](url)`(alt 為空或是路徑時為 `[圖](url)`)
 *  - 裸圖:alt 是一般文字時換成 alt,否則移除
 *  - 換行統一為 \n
 */
export function transformPage(raw: string): TransformResult {
  const lines = raw.split(/\r?\n/);
  const out: string[] = [];
  const leftovers: number[] = [];
  const hasFrontmatter = lines[0] === "---";
  let frontmatterEnd = -1;
  let skipBlank = false;
  let navRemoved = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (isNav(line)) {
      skipBlank = navRemoved = true;
      continue;
    }
    if (skipBlank && line.trim() === "") continue;
    skipBlank = false;

    const inFrontmatter = hasFrontmatter && i > 0 && frontmatterEnd < 0;
    if (inFrontmatter && line === "---") frontmatterEnd = out.length;
    const src = inFrontmatter ? line.match(/^source: "(.+)"$/) : null;
    let converted: string;
    let unconverted = false;
    if (src) converted = `source: ${src[1]}`;
    else {
      converted = line.replace(LINKED_IMAGE, (_, alt: string, url: string) => (isTextAlt(alt) ? `[圖：${alt}](${url})` : `[圖](${url})`));
      unconverted = UNCONVERTED_LINKED.test(converted);
      converted = converted.replace(BARE_IMAGE, (_, alt: string) => (isTextAlt(alt) ? alt : ""));
    }
    out.push(converted);
    if (unconverted || converted.includes("../images/") || converted.includes("[](")) leftovers.push(i + 1);
  }

  const trimEnd = () => {
    while (out.length && out[out.length - 1].trim() === "") out.pop();
  };
  trimEnd();
  if (navRemoved && out.length - 1 > frontmatterEnd && out[out.length - 1] === "---") {
    out.pop();
    trimEnd();
  }
  return { content: out.join("\n"), leftovers };
}
