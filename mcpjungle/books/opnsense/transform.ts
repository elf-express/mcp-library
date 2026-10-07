/**
 * OPNsense 官方文件 → docs-mcp 語料 opnsense-en / opnsense-zh-tw 的篩選與轉換(純函式,供匯入腳本與測試使用)。
 */

/** 檔名是否屬收錄範圍(`NN 標題.md`;排除 `000 目錄`、`000 全書`) */
export function isIncluded(filename: string): boolean {
  return /^\d+ .*\.md$/.test(filename) && !filename.startsWith("000 ");
}

export interface TransformResult {
  content: string;
  /** 轉換後仍含 `../images/` 的原稿行(行號從 1 起算) */
  leftovers: number[];
}

/** `[![alt](<../images/x>)](url)` */
const LINKED_IMAGE = /\[!\[([^\]]*)\]\(<?\.\.\/images\/[^)>]*>?\)\]\((https?:\/\/[^)\s]+)\)/g;
/** `![alt](<../images/x>)` */
const BARE_IMAGE = /!\[([^\]]*)\]\(<?\.\.\/images\/[^)>]*>?\)/g;

/**
 * 轉換單篇:
 *  - 移除導覽列(`[⬆ 目錄]…`,頂端與結尾各一)與章節麵包屑(`> 章節：…`)
 *  - frontmatter 的 `source: "url"` 去引號
 *  - 包外層連結的圖改為 `[圖：alt](url)`(空 alt 為 `[圖](url)`)
 *  - 裸圖:alt 是一般文字時換成 alt,alt 為空或是路徑時移除
 *  - 換行統一為 \n
 */
export function transformPage(raw: string): TransformResult {
  const out: string[] = [];
  const leftovers: number[] = [];
  const lines = raw.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith("[⬆ 目錄]") || line.startsWith("> 章節：")) continue;
    const src = line.match(/^source: "(.+)"$/);
    const converted = src
      ? `source: ${src[1]}`
      : line
          .replace(LINKED_IMAGE, (_, alt: string, url: string) => (alt ? `[圖：${alt}](${url})` : `[圖](${url})`))
          .replace(BARE_IMAGE, (_, alt: string) => (alt && !alt.includes("/") ? alt : ""));
    out.push(converted);
    if (converted.includes("../images/")) leftovers.push(i + 1);
  }
  return { content: out.join("\n"), leftovers };
}
