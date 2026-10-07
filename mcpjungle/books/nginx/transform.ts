/**
 * nginx 官方文件 → docs-mcp 語料 nginx-en 的篩選與轉換(純函式,供匯入腳本與測試使用)。
 */

/** 收錄的章節標籤(檔名 `NNN [標籤] 標題.md` 中的標籤) */
export const INCLUDED_CHAPTERS = new Set([
  "01.01 docs",
  "01.01.01 dev",
  "01.01.02 faq",
  "01.01.03 http",
  "01.01.04 mail",
  "01.01.05 njs",
  "01.01.06 stream",
]);

/** 檔名是否屬收錄範圍(英文文件;排除俄文、CHANGES、新聞、目錄等) */
export function isIncluded(filename: string): boolean {
  const m = filename.match(/^\d{3} \[([^\]]+)\] .+\.md$/);
  return !!m && INCLUDED_CHAPTERS.has(m[1]);
}

const SYNTAX_ROW = /^\| Syntax: \||^<tr><th>Syntax:<\/th>/;

/** 從一列 Syntax 抽出指令名(去重、保序);markdown 用 **名**,HTML 用 <strong>名</strong> */
export function directiveNames(syntaxLine: string): string[] {
  const names: string[] = [];
  for (const m of syntaxLine.matchAll(/\*\*([^*]+)\*\*|<strong>([^<]+)<\/strong>/g)) {
    const name = (m[1] ?? m[2]).replace(/\\/g, "").trim();
    if (name && !names.includes(name)) names.push(name);
  }
  return names;
}

export interface TransformResult {
  content: string;
  /** 插入標題的指令名 */
  directives: string[];
  /** 抽不到指令名的 Syntax 列(行號從 1 起算) */
  unparsed: number[];
}

/**
 * 轉換單篇:
 *  - 移除頂端導覽列(`[⬆ 目錄]…`)與章節麵包屑(`> 章節：…`)
 *  - frontmatter 的 `source: "url"` 去引號
 *  - `####` 小節升為 `##`
 *  - 每個指令表(markdown 表頭或 `<table>`)前插入 `### 指令名`
 *  - 換行統一為 \n
 */
export function transformPage(raw: string): TransformResult {
  const lines = raw.split(/\r?\n/);
  const out: string[] = [];
  const directives: string[] = [];
  const unparsed: number[] = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith("[⬆ 目錄]") || line.startsWith("> 章節：")) continue;
    if (SYNTAX_ROW.test(line)) {
      const names = directiveNames(line);
      if (names.length === 0) {
        unparsed.push(i + 1);
      } else {
        out.splice(tableStart(out), 0, ...names.flatMap((n) => [`### ${n}`, ""]));
        directives.push(...names);
      }
    }
    const src = line.match(/^source: "(.+)"$/);
    if (src) out.push(`source: ${src[1]}`);
    else if (line.startsWith("#### ")) out.push("## " + line.slice(5));
    else out.push(line);
  }
  return { content: out.join("\n"), directives, unparsed };
}

/** 往回找指令表起點:緊鄰的 `<table>`,或連續的 markdown 表格列 */
function tableStart(out: string[]): number {
  let j = out.length;
  if (j > 0 && out[j - 1].trim() === "<table>") return j - 1;
  while (j > 0 && out[j - 1].startsWith("|")) j--;
  return j;
}
