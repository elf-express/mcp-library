/**
 * corpus.ts — 多語料純邏輯模組(不含 MCP server 設定、zod schema、transport)
 *
 * 一個「語料(corpus)」= corpora/<id>/ 下的一組 markdown(可含分類子目錄)。
 *   - 探索:掃描 CORPORA_DIR 下每個子目錄為一個語料。
 *   - 描述:每個語料可放一個 corpus.json(title / description / capabilities),省略則用目錄名。
 *   - 來源:每個語料可放一個 sources.json(相對路徑 -> 官方文件 URL)。
 *
 * 由 sqlsugar/notes.ts 與 fc/notes.ts 兩版合併一般化而來:
 *   - 遞迴掃描(filename = 相對語料根的路徑)取自 fc 版(sqlsugar 扁平版是其特例)。
 *   - 搜尋/讀取演算法兩版相同,這裡把寫死的工具名改為通用提示。
 *   - sourcesCache 由單一全域槽改為 Map<corpusDir, …>,避免多語料互相覆蓋。
 *   - contentCache 以 fullPath 為鍵,跨語料天生安全,原樣保留。
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const CHARACTER_LIMIT = 25000;

const SKIP_DIRS = new Set([".git", "node_modules", "dist"]);

// ---------------------------------------------------------------------------
// 型別
// ---------------------------------------------------------------------------

export interface CorpusCapabilities {
  /** 是否啟用「速查表」抽取(文件需有 `## 速查表` 段落) */
  cheatsheet?: boolean;
  /** 啟用 docs_code_search / docs_code_read,讀 corpora/<id>/examples/ */
  examples?: boolean;
  /** 啟用 docs_symbol,從 md 的 ##/### 標題建符號索引 */
  symbol?: boolean;
}

export interface Corpus {
  id: string;          // 目錄名,作為 docs_search 的 corpus 參數值
  title: string;       // 人類可讀名稱(corpus.json.title,省略則 = id)
  description: string; // 一句描述(corpus.json.description),供 docs_list_corpora 呈現
  dir: string;         // 語料根目錄絕對路徑
  capabilities: CorpusCapabilities;
}

export interface NoteFile {
  filename: string; // 相對語料根的路徑,如 "開發文檔/structure.md"
  fullPath: string;
}

export interface CachedNote {
  content: string;
  mtimeMs: number;
}

interface Manifest {
  title?: string;
  description?: string;
  capabilities?: CorpusCapabilities;
}

// ---------------------------------------------------------------------------
// 快取
// ---------------------------------------------------------------------------

export const contentCache = new Map<string, CachedNote>();
// 語料清單快取(以 corpora 根目錄 + 其 mtime 為鍵)
let corporaCache: { dir: string; mtimeMs: number; list: Corpus[] } | null = null;
// corpusDir -> sources.json 內容(以 mtime 失效)
const sourcesCache = new Map<string, { mtimeMs: number; map: Record<string, string> }>();

/** 測試用:清空所有模組級快取 */
export function _clearCaches(): void {
  contentCache.clear();
  corporaCache = null;
  sourcesCache.clear();
}

// ---------------------------------------------------------------------------
// 語料探索
// ---------------------------------------------------------------------------

/** 解析 corpora 根目錄:DOCS_CORPORA_DIR -> 打包的 corpora/ -> server 根上一層 */
export function resolveCorporaDir(): string {
  const envDir = process.env.DOCS_CORPORA_DIR;
  if (envDir && envDir.trim().length > 0) return path.resolve(envDir);
  const serverRoot = path.resolve(__dirname, "..");
  const bundled = path.join(serverRoot, "corpora");
  try {
    if (fs.statSync(bundled).isDirectory()) return bundled;
  } catch {
    /* ignore */
  }
  return path.resolve(serverRoot, "..");
}

function readManifest(dir: string): Manifest {
  try {
    const raw = fs.readFileSync(path.join(dir, "corpus.json"), "utf-8");
    return JSON.parse(raw) as Manifest;
  } catch {
    return {};
  }
}

/** 掃描 corpora 根目錄,每個子目錄 = 一個語料。結果以 mtime 快取。 */
export function discoverCorpora(): Corpus[] {
  const root = resolveCorporaDir();
  let mtimeMs = 0;
  try {
    mtimeMs = fs.statSync(root).mtimeMs;
  } catch {
    return [];
  }
  if (corporaCache && corporaCache.dir === root && corporaCache.mtimeMs === mtimeMs) {
    return corporaCache.list;
  }
  let entries: fs.Dirent[];
  try {
    entries = fs.readdirSync(root, { withFileTypes: true });
  } catch {
    return [];
  }
  const list: Corpus[] = [];
  for (const e of entries) {
    if (!e.isDirectory() || SKIP_DIRS.has(e.name)) continue;
    const dir = path.join(root, e.name);
    const m = readManifest(dir);
    list.push({
      id: e.name,
      title: m.title?.trim() || e.name,
      description: m.description?.trim() || "",
      dir,
      capabilities: m.capabilities ?? {},
    });
  }
  list.sort((a, b) => a.id.localeCompare(b.id));
  corporaCache = { dir: root, mtimeMs, list };
  return list;
}

export function getCorpus(id: string): Corpus | undefined {
  const want = (id ?? "").trim().toLowerCase();
  if (!want) return undefined;
  return discoverCorpora().find((c) => c.id.toLowerCase() === want);
}

export function corpusIdList(): string {
  const ids = discoverCorpora().map((c) => c.id);
  return ids.length ? ids.join(", ") : "(無)";
}

export function corporaCount(): number {
  return discoverCorpora().length;
}

export function totalDocCount(): number {
  return discoverCorpora().reduce((n, c) => n + listMarkdownFiles(c).length, 0);
}

// ---------------------------------------------------------------------------
// 單一語料的檔案 I/O
// ---------------------------------------------------------------------------

/** 遞迴掃描語料目錄下所有 .md(保留分類子目錄,filename 為相對路徑) */
export function listMarkdownFiles(corpus: Corpus): NoteFile[] {
  const out: NoteFile[] = [];
  const walk = (dir: string, rel: string) => {
    let entries: fs.Dirent[];
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries) {
      if (e.isDirectory()) {
        if (SKIP_DIRS.has(e.name)) continue;
        walk(path.join(dir, e.name), rel ? rel + "/" + e.name : e.name);
      } else if (e.name.toLowerCase().endsWith(".md")) {
        const r = rel ? rel + "/" + e.name : e.name;
        out.push({ filename: r, fullPath: path.join(dir, e.name) });
      }
    }
  };
  walk(corpus.dir, "");
  return out.sort((a, b) => a.filename.localeCompare(b.filename, "zh-Hant"));
}

export function readNoteContent(file: NoteFile): string {
  let mtimeMs = 0;
  try {
    mtimeMs = fs.statSync(file.fullPath).mtimeMs;
  } catch {
    return "";
  }
  const cached = contentCache.get(file.fullPath);
  if (cached && cached.mtimeMs === mtimeMs) return cached.content;
  let content = fs.readFileSync(file.fullPath, "utf-8");
  if (content.charCodeAt(0) === 0xfeff) content = content.slice(1); // 去 BOM
  contentCache.set(file.fullPath, { content, mtimeMs });
  return content;
}

export function loadSources(corpus: Corpus): Record<string, string> {
  const p = path.join(corpus.dir, "sources.json");
  let mtimeMs = 0;
  try {
    mtimeMs = fs.statSync(p).mtimeMs;
  } catch {
    return {};
  }
  const cached = sourcesCache.get(corpus.dir);
  if (cached && cached.mtimeMs === mtimeMs) return cached.map;
  try {
    const map = JSON.parse(fs.readFileSync(p, "utf-8")) as Record<string, string>;
    sourcesCache.set(corpus.dir, { mtimeMs, map });
    return map;
  } catch {
    return {};
  }
}

/**
 * 從文件內文抽出官方來源 URL。掃描前 15 行,挑「引用區塊(>)或含 source/来源/來源/官方 字樣」的行,
 * 優先取 markdown 連結 [文字](url),否則取裸 URL。支援兩種常見格式:
 *   sqlsugar: `> 📖 官方文件:[果糖網…](https://…)`
 *   fc:       `> Source: https://…`
 */
export function extractSourceUrl(content: string): string | undefined {
  const lines = content.split(/\r?\n/).slice(0, 15);
  for (const line of lines) {
    if (!/^\s*>/.test(line) && !/source|来源|來源|官方/i.test(line)) continue;
    const md = line.match(/\]\((https?:\/\/[^)\s]+)\)/);
    if (md) return md[1];
    const bare = line.match(/(https?:\/\/[^\s)]+)/);
    if (bare) return bare[1];
  }
  return undefined;
}

/**
 * 來源連結。優先用 sources.json(明確覆寫),否則自動從該文件內文抽取。
 * 兩者皆無則回空字串。
 */
export function sourceLine(corpus: Corpus, filename: string): string {
  let url: string | undefined = loadSources(corpus)[filename];
  if (!url) {
    const f = listMarkdownFiles(corpus).find((x) => x.filename === filename);
    if (f) url = extractSourceUrl(readNoteContent(f));
  }
  return url ? "📖 官方文件來源:" + url : "";
}

/** 依 query 找文件:① 完整相對路徑 ② 路徑結尾(只給檔名) ③ 路徑包含 */
export function findNotes(corpus: Corpus, query: string): NoteFile[] {
  const files = listMarkdownFiles(corpus);
  const q = query.trim().toLowerCase();
  const qNoExt = q.endsWith(".md") ? q.slice(0, -3) : q;
  let m = files.filter(
    (f) => f.filename.toLowerCase() === q || f.filename.toLowerCase() === qNoExt + ".md"
  );
  if (m.length) return m;
  m = files.filter((f) => {
    const fn = f.filename.toLowerCase();
    return fn === qNoExt + ".md" || fn.endsWith("/" + qNoExt + ".md");
  });
  if (m.length) return m;
  return files.filter((f) => f.filename.toLowerCase().includes(qNoExt));
}

export function truncateIfNeeded(text: string): string {
  if (text.length <= CHARACTER_LIMIT) return text;
  return (
    text.slice(0, CHARACTER_LIMIT) +
    "\n\n…(內容已截斷,超過 " + CHARACTER_LIMIT + " 字元。請用更精確的關鍵字或讀取特定檔案。)"
  );
}

export interface Heading {
  text: string;
  level: number;
  lineStart: number;
}

/** 掃 md 的 ## / ### 標題,回標題文字、層級(2 或 3)、行號 */
export function extractHeadings(content: string): Heading[] {
  const lines = content.split(/\r?\n/);
  const out: Heading[] = [];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^(#{2,3})\s+(.+?)\s*$/);
    if (m) out.push({ text: m[2].trim(), level: m[1].length, lineStart: i });
  }
  return out;
}

/** 從 lines[startIdx] 的標題切到下一個「同級或更高級」標題(不含),trim 後回傳 */
export function sliceSection(lines: string[], startIdx: number): string {
  const startLevel = (lines[startIdx].match(/^#+/) ?? ["#"])[0].length;
  let end = lines.length;
  for (let i = startIdx + 1; i < lines.length; i++) {
    const m = lines[i].match(/^(#{1,6})\s+/);
    if (m && m[1].length <= startLevel) {
      end = i;
      break;
    }
  }
  return lines.slice(startIdx, end).join("\n").trim();
}

export function extractCheatsheet(content: string): string | null {
  const lines = content.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    if (/^#{1,6}\s+.*速查/.test(lines[i])) return sliceSection(lines, i);
  }
  return null;
}

// ---------------------------------------------------------------------------
// 工具邏輯(由 index.ts 的工具呼叫)
// ---------------------------------------------------------------------------

interface Hit {
  corpusId: string;
  filename: string;
  hitCount: number;
  snippets: string[];
}

function searchCorpus(corpus: Corpus, lowerKeywords: string[], ctx: number): Hit[] {
  const files = listMarkdownFiles(corpus);
  const hits: Hit[] = [];
  for (const file of files) {
    const content = readNoteContent(file);
    const lower = content.toLowerCase();
    if (!lowerKeywords.every((k) => lower.includes(k))) continue;
    const lines = content.split(/\r?\n/);
    const matchedLineIdx: number[] = [];
    for (let i = 0; i < lines.length; i++) {
      const ll = lines[i].toLowerCase();
      if (lowerKeywords.some((k) => ll.includes(k))) matchedLineIdx.push(i);
    }
    if (matchedLineIdx.length === 0) continue;
    const ranges: Array<[number, number]> = [];
    for (const idx of matchedLineIdx) {
      const lo = Math.max(0, idx - ctx);
      const hi = Math.min(lines.length - 1, idx + ctx);
      const last = ranges[ranges.length - 1];
      if (last && lo <= last[1] + 1) last[1] = Math.max(last[1], hi);
      else ranges.push([lo, hi]);
    }
    const snippets: string[] = [];
    for (const [lo, hi] of ranges.slice(0, 4)) {
      const block: string[] = [];
      for (let i = lo; i <= hi; i++) block.push(String(i + 1).padStart(4) + ": " + lines[i]);
      snippets.push(block.join("\n"));
    }
    hits.push({ corpusId: corpus.id, filename: file.filename, hitCount: matchedLineIdx.length, snippets });
  }
  return hits;
}

/**
 * 搜尋。corpusId 給定 → 只搜該語料;省略/空 → 跨所有語料(結果標註來源語料)。
 */
export function doSearch(corpusId: string | undefined, query: string, limit: number, ctx: number): string {
  const keywords = query.split(/\s+/).map((k) => k.trim()).filter((k) => k.length > 0);
  if (keywords.length === 0) return "錯誤:請提供至少一個關鍵字。";
  const lowerKeywords = keywords.map((k) => k.toLowerCase());

  let targets: Corpus[];
  if (corpusId && corpusId.trim()) {
    const c = getCorpus(corpusId);
    if (!c) return `找不到語料 "${corpusId}"。可用語料:${corpusIdList()}。請先用 docs_list_corpora 查看。`;
    targets = [c];
  } else {
    targets = discoverCorpora();
    if (targets.length === 0) return "錯誤:找不到任何語料。corpora 目錄:" + resolveCorporaDir();
  }

  let hits: Hit[] = [];
  for (const c of targets) hits = hits.concat(searchCorpus(c, lowerKeywords, ctx));

  if (hits.length === 0) {
    const scope = corpusId && corpusId.trim() ? `語料 "${corpusId}"` : "所有語料";
    return `在${scope}中找不到同時包含 [${keywords.join(", ")}] 的文件。\n建議:減少關鍵字數量,或用 docs_list_corpora 瀏覽語料。`;
  }
  hits.sort((a, b) => b.hitCount - a.hitCount);
  const limited = hits.slice(0, limit);

  const scopeLabel = corpusId && corpusId.trim() ? `語料 ${corpusId}` : `${targets.length} 個語料`;
  const out: string[] = [
    `# 搜尋結果:[${keywords.join(", ")}](${scopeLabel})`,
    "",
    "共 " + hits.length + " 篇命中" + (hits.length > limited.length ? "(顯示前 " + limited.length + " 篇)" : "") + "。",
    "",
  ];
  for (const h of limited) {
    const corpus = getCorpus(h.corpusId);
    out.push(`## [${h.corpusId}] ${h.filename} (${h.hitCount} 處命中)`);
    if (corpus) {
      const hsrc = sourceLine(corpus, h.filename);
      if (hsrc) out.push(hsrc);
    }
    out.push("");
    for (const s of h.snippets) {
      out.push("```");
      out.push(s);
      out.push("```");
    }
    out.push(`> 用 docs_read 讀取完整內容:corpus="${h.corpusId}", filename="${h.filename}"`);
    out.push("");
  }
  return truncateIfNeeded(out.join("\n"));
}

export function doRead(corpusId: string, filename: string): string {
  const c = getCorpus(corpusId);
  if (!c) return `找不到語料 "${corpusId}"。可用語料:${corpusIdList()}。請先用 docs_list_corpora 查看。`;
  const matches = findNotes(c, filename);
  if (matches.length === 0) {
    return `在語料 "${corpusId}" 找不到符合 "${filename}" 的文件。請用 docs_search 或 docs_list_corpora 查可用檔名。`;
  }
  if (matches.length > 1) {
    const list = matches.map((m) => "- " + m.filename).join("\n");
    return `"${filename}" 在語料 "${corpusId}" 符合多篇,請指定更精確的路徑:\n\n` + list;
  }
  const file = matches[0];
  const src = sourceLine(c, file.filename);
  const head = `# [${corpusId}] ${file.filename}` + (src ? "\n\n> " + src : "") + "\n\n";
  return truncateIfNeeded(head + readNoteContent(file));
}

export function doCheatsheet(corpusId: string, filename: string): string {
  const c = getCorpus(corpusId);
  if (!c) return `找不到語料 "${corpusId}"。可用語料:${corpusIdList()}。請先用 docs_list_corpora 查看。`;
  if (!c.capabilities.cheatsheet) {
    return `語料 "${corpusId}" 未啟用速查表功能。請改用 docs_read 讀取完整內容(corpus="${corpusId}", filename="${filename}")。`;
  }
  const matches = findNotes(c, filename);
  if (matches.length === 0) {
    return `在語料 "${corpusId}" 找不到符合 "${filename}" 的文件。請用 docs_search 查可用檔名。`;
  }
  if (matches.length > 1) {
    const list = matches.map((m) => "- " + m.filename).join("\n");
    return `"${filename}" 在語料 "${corpusId}" 符合多篇,請指定更精確的路徑:\n\n` + list;
  }
  const file = matches[0];
  const cheat = extractCheatsheet(readNoteContent(file));
  if (!cheat) {
    return `「${file.filename}」沒有速查表段落。請改用 docs_read 讀取完整內容(corpus="${corpusId}", filename="${file.filename}")。`;
  }
  const csrc = sourceLine(c, file.filename);
  return truncateIfNeeded(`# [${corpusId}] ${file.filename} — 速查表` + (csrc ? "\n\n> " + csrc : "") + "\n\n" + cheat);
}

/**
 * 列出語料。onlyId 給定 → 只列該語料(供 /mcp/:corpus scoped 端點);
 * filter 給定 → 以 id/title 子字串過濾。
 */
export function doListCorpora(opts?: { filter?: string; onlyId?: string }): string {
  let corpora = discoverCorpora();
  const onlyId = opts?.onlyId?.trim().toLowerCase();
  if (onlyId) {
    corpora = corpora.filter((c) => c.id.toLowerCase() === onlyId);
  }
  const filter = opts?.filter?.trim().toLowerCase();
  if (filter) {
    corpora = corpora.filter(
      (c) => c.id.toLowerCase().includes(filter) || c.title.toLowerCase().includes(filter)
    );
  }
  if (corpora.length === 0) {
    return onlyId
      ? `找不到語料 "${opts?.onlyId}"。`
      : "目前沒有語料。corpora 目錄:" + resolveCorporaDir();
  }
  const out: string[] = ["# 可用語料 (共 " + corpora.length + " 個)", ""];
  for (const c of corpora) {
    const count = listMarkdownFiles(c).length;
    const caps = c.capabilities.cheatsheet ? " · 速查表" : "";
    out.push(`## ${c.id}${caps}`);
    if (c.title && c.title !== c.id) out.push(`**${c.title}**`);
    if (c.description) out.push(c.description);
    out.push(`- 文件數:${count}`);
    out.push(`- 搜尋此語料:docs_search(corpus="${c.id}", query="…")`);
    out.push("");
  }
  return truncateIfNeeded(out.join("\n"));
}
