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
const CODE_EXT = new Set([".cs", ".csproj", ".sln", ".json", ".ts", ".js"]);
const CODE_SKIP_DIRS = new Set([...SKIP_DIRS, "bin", "obj", ".vs"]);

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

export interface CodeFile {
  path: string;     // 相對 examples/ 的路徑
  fullPath: string;
}

export interface CachedNote {
  content: string;
  mtimeMs: number;
}

export interface SymbolEntry { filename: string; text: string; level: number; lineStart: number }

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
// corpusDir -> 符號索引(以語料目錄 mtime 失效)
const symbolIndexCache = new Map<string, { mtimeMs: number; index: Map<string, SymbolEntry[]> }>();

/** 測試用:清空所有模組級快取 */
export function _clearCaches(): void {
  contentCache.clear();
  corporaCache = null;
  sourcesCache.clear();
  symbolIndexCache.clear();
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
        if (SKIP_DIRS.has(e.name) || e.name === "examples") continue;
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

export function resolveExamplesDir(corpus: Corpus): string {
  return path.join(corpus.dir, "examples");
}

/** 遞迴掃 examples/ 下白名單副檔名的源碼檔(跳 bin/obj/.vs)。 */
export function listCodeFiles(corpus: Corpus): CodeFile[] {
  const root = resolveExamplesDir(corpus);
  const out: CodeFile[] = [];
  const walk = (dir: string, rel: string) => {
    let entries: fs.Dirent[];
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries) {
      if (e.isDirectory()) {
        if (CODE_SKIP_DIRS.has(e.name)) continue;
        walk(path.join(dir, e.name), rel ? rel + "/" + e.name : e.name);
      } else if (CODE_EXT.has(path.extname(e.name).toLowerCase())) {
        const r = rel ? rel + "/" + e.name : e.name;
        out.push({ path: r, fullPath: path.join(dir, e.name) });
      }
    }
  };
  walk(root, "");
  return out.sort((a, b) => a.path.localeCompare(b.path));
}

export function readCodeFileContent(file: CodeFile): string {
  let mtimeMs = 0;
  try {
    mtimeMs = fs.statSync(file.fullPath).mtimeMs;
  } catch {
    return "";
  }
  const cached = contentCache.get(file.fullPath);
  if (cached && cached.mtimeMs === mtimeMs) return cached.content;
  let content = fs.readFileSync(file.fullPath, "utf-8");
  if (content.charCodeAt(0) === 0xfeff) content = content.slice(1);
  contentCache.set(file.fullPath, { content, mtimeMs });
  return content;
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

/**
 * 掃 md 標題,回標題文字、層級、行號。
 * minLevel 預設 2:只抓 ##/###(outline/cheatsheet 行為不變)。
 * 傳 1 則納入 # 一級:供 buildSymbolIndex 用,使一級標題也進符號索引。
 */
export function extractHeadings(content: string, minLevel = 2): Heading[] {
  const lines = content.split(/\r?\n/);
  const out: Heading[] = [];
  const re = new RegExp(`^(#{${minLevel},3})\\s+(.+?)\\s*$`);
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(re);
    if (m) out.push({ text: m[2].replace(/[​﻿]/g, "").trim(), level: m[1].length, lineStart: i });
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

/** examples 能力 gate:回 Corpus 或錯誤訊息字串。 */
function requireExamples(corpusId: string | undefined): Corpus | string {
  if (!corpusId || !corpusId.trim()) {
    return `請指定 corpus(用 docs_list_corpora 查看可用語料:${corpusIdList()}),或改用單書端點 /mcp/<corpus>。`;
  }
  const c = getCorpus(corpusId);
  if (!c) return `找不到語料 "${corpusId}"。可用語料:${corpusIdList()}。`;
  if (!c.capabilities.examples) {
    return `語料 "${corpusId}" 無代碼範例(未啟用 examples)。請改用 docs_search 查文檔。`;
  }
  return c;
}

/** query 空 → 列範例檔(按頂層目錄分組);有 query → 關鍵字 AND 搜代碼。 */
export function doCodeSearch(corpusId: string | undefined, query: string, limit: number, ctx: number): string {
  const c = requireExamples(corpusId);
  if (typeof c === "string") return c;
  const files = listCodeFiles(c);
  if (files.length === 0) return `語料 "${c.id}" 的 examples/ 沒有源碼檔。`;

  const keywords = query.split(/\s+/).map((k) => k.trim()).filter((k) => k.length > 0);
  if (keywords.length === 0) {
    const out: string[] = [`# ${c.id} 範例源碼(${files.length} 檔)`, ""];
    let lastTop = "";
    for (const f of files) {
      const top = f.path.includes("/") ? f.path.split("/")[0] : "(根)";
      if (top !== lastTop) { out.push(`## ${top}`); lastTop = top; }
      out.push(`- ${f.path}`);
    }
    out.push("", `> 讀單檔:docs_code_read(corpus="${c.id}", path="…");搜尋:docs_code_search(corpus="${c.id}", query="…")`);
    return truncateIfNeeded(out.join("\n"));
  }

  const lower = keywords.map((k) => k.toLowerCase());
  interface CodeHit { path: string; hitCount: number; snippets: string[] }
  const hits: CodeHit[] = [];
  for (const file of files) {
    const content = readCodeFileContent(file);
    const lc = content.toLowerCase();
    if (!lower.every((k) => lc.includes(k))) continue;
    const lines = content.split(/\r?\n/);
    const idxs: number[] = [];
    for (let i = 0; i < lines.length; i++) {
      if (lower.some((k) => lines[i].toLowerCase().includes(k))) idxs.push(i);
    }
    if (idxs.length === 0) continue;
    const ranges: Array<[number, number]> = [];
    for (const idx of idxs) {
      const lo = Math.max(0, idx - ctx), hi = Math.min(lines.length - 1, idx + ctx);
      const last = ranges[ranges.length - 1];
      if (last && lo <= last[1] + 1) last[1] = Math.max(last[1], hi);
      else ranges.push([lo, hi]);
    }
    const snippets = ranges.slice(0, 4).map(([lo, hi]) => {
      const block: string[] = [];
      for (let i = lo; i <= hi; i++) block.push(String(i + 1).padStart(4) + ": " + lines[i]);
      return block.join("\n");
    });
    hits.push({ path: file.path, hitCount: idxs.length, snippets });
  }
  if (hits.length === 0) {
    return `在 "${c.id}" 範例源碼中找不到同時含 [${keywords.join(", ")}] 的檔。建議減少關鍵字,或 docs_code_search(corpus="${c.id}", query="") 看有哪些檔。`;
  }
  hits.sort((a, b) => b.hitCount - a.hitCount);
  const out: string[] = [`# 範例源碼搜尋:[${keywords.join(", ")}](${c.id})`, "", `共 ${hits.length} 檔命中。`, ""];
  for (const h of hits.slice(0, limit)) {
    out.push(`## ${h.path} (${h.hitCount} 處)`);
    for (const s of h.snippets) { out.push("```"); out.push(s); out.push("```"); }
    out.push(`> 讀全檔:docs_code_read(corpus="${c.id}", path="${h.path}")`, "");
  }
  return truncateIfNeeded(out.join("\n"));
}

/** 依 path 模糊比對讀單一範例源碼檔(結尾 / 包含)。 */
export function doCodeRead(corpusId: string | undefined, p: string): string {
  const c = requireExamples(corpusId);
  if (typeof c === "string") return c;
  const q = p.trim().toLowerCase();
  const files = listCodeFiles(c);
  let m = files.filter((f) => f.path.toLowerCase() === q);
  if (m.length === 0) m = files.filter((f) => f.path.toLowerCase().endsWith("/" + q) || f.path.toLowerCase() === q);
  if (m.length === 0) m = files.filter((f) => f.path.toLowerCase().includes(q));
  if (m.length === 0) return `在 "${c.id}" 範例中找不到符合 "${p}" 的源碼檔。用 docs_code_search(corpus="${c.id}", query="") 看清單。`;
  if (m.length > 1) return `"${p}" 符合多檔,請更精確:\n\n` + m.map((f) => "- " + f.path).join("\n");
  const file = m[0];
  const ext = path.extname(file.path).replace(".", "") || "";
  return truncateIfNeeded(`# [${c.id}] ${file.path}\n\n\`\`\`${ext}\n` + readCodeFileContent(file) + "\n```");
}

/**
 * 結構大綱:列某語料的分類目錄 + 篇名(headings=true 才展開篇內 ##/### 標題)。
 * path 給定 → 只展開該頂層分類。corpusId 省略 → 提示先用 docs_list_corpora。
 */
export function doOutline(corpusId: string | undefined, filterPath: string | undefined, headings: boolean): string {
  if (!corpusId || !corpusId.trim()) {
    return `請指定 corpus(用 docs_list_corpora 查看可用語料:${corpusIdList()}),或改用單書端點 /mcp/<corpus>。`;
  }
  const c = getCorpus(corpusId);
  if (!c) return `找不到語料 "${corpusId}"。可用語料:${corpusIdList()}。`;

  const files = listMarkdownFiles(c);
  // 依頂層目錄分組(無子目錄者歸 "(根)")
  const groups = new Map<string, typeof files>();
  for (const f of files) {
    const top = f.filename.includes("/") ? f.filename.split("/")[0] : "(根)";
    if (!groups.has(top)) groups.set(top, []);
    groups.get(top)!.push(f);
  }

  const wantPath = filterPath?.trim();
  if (wantPath && !groups.has(wantPath)) {
    return `語料 "${corpusId}" 沒有分類 "${wantPath}"。可用分類:${[...groups.keys()].join(", ")}。`;
  }

  const out: string[] = [`# ${c.id} 結構大綱(${files.length} 篇 · ${groups.size} 類)`, ""];
  for (const [top, fs] of groups) {
    if (wantPath && top !== wantPath) continue;
    out.push(`## ${top} (${fs.length} 篇)`);
    for (const f of fs) {
      const name = f.filename.includes("/") ? f.filename.split("/").slice(1).join("/") : f.filename;
      const display = name.replace(/\.md$/i, "");
      if (headings) {
        out.push(`- ${display}`);
        for (const h of extractHeadings(readNoteContent(f))) {
          out.push(`  ${"  ".repeat(h.level - 2)}- ${h.text}`);
        }
      } else {
        out.push(`- ${display}`);
      }
    }
    out.push("");
  }
  if (!headings) {
    out.push(`> 要展開篇內標題:docs_outline(corpus="${c.id}", path="<分類>", headings=true)`);
  }
  return truncateIfNeeded(out.join("\n"));
}

/** 掃語料所有 md,以 #/##/### 標題建「小寫標題 → SymbolEntry[]」索引,以語料目錄 mtime 失效。 */
export function buildSymbolIndex(corpus: Corpus): Map<string, SymbolEntry[]> {
  let mtimeMs = 0;
  try { mtimeMs = fs.statSync(corpus.dir).mtimeMs; } catch { /* ignore */ }
  const cached = symbolIndexCache.get(corpus.dir);
  if (cached && cached.mtimeMs === mtimeMs) return cached.index;
  const index = new Map<string, SymbolEntry[]>();
  for (const f of listMarkdownFiles(corpus)) {
    for (const h of extractHeadings(readNoteContent(f), 1)) {
      const key = h.text.toLowerCase();
      const entry: SymbolEntry = { filename: f.filename, text: h.text, level: h.level, lineStart: h.lineStart };
      if (!index.has(key)) index.set(key, []);
      index.get(key)!.push(entry);
    }
  }
  symbolIndexCache.set(corpus.dir, { mtimeMs, index });
  return index;
}

/** 按符號名(標題)精確→包含比對,回該標題段落 + 來源篇。 */
export function doSymbol(corpusId: string | undefined, name: string, limit: number): string {
  if (!corpusId || !corpusId.trim()) {
    return `請指定 corpus(用 docs_list_corpora 查看可用語料:${corpusIdList()}),或改用單書端點 /mcp/<corpus>。`;
  }
  const c = getCorpus(corpusId);
  if (!c) return `找不到語料 "${corpusId}"。可用語料:${corpusIdList()}。`;
  if (!c.capabilities.symbol) {
    return `語料 "${corpusId}" 未啟用 symbol(無符號索引)。請改用 docs_search 或 docs_outline。`;
  }
  const index = buildSymbolIndex(c);
  const q = name.trim().toLowerCase();
  if (!q) return "請提供要查的符號名(API/方法/組件名)。";

  // 精確命中
  let matches: SymbolEntry[] = index.get(q) ?? [];
  // 否則包含比對(跨所有 key)
  if (matches.length === 0) {
    for (const [key, entries] of index) {
      if (key.includes(q)) matches.push(...entries);
    }
  }
  if (matches.length === 0) {
    return `語料 "${corpusId}" 找不到符號 "${name}"。建議改用 docs_search(corpus="${corpusId}", query="${name}") 全文搜尋,或 docs_outline 看有哪些標題。`;
  }
  if (matches.length > limit) {
    const list = matches.slice(0, limit).map((m) => `- [${corpusId}] ${m.text}  (${m.filename})`).join("\n");
    return `符號 "${name}" 在 "${corpusId}" 有 ${matches.length} 個候選(顯示前 ${limit}):\n\n${list}\n\n請用更精確的名稱,或 docs_read 讀整篇。`;
  }
  const out: string[] = [];
  const allFiles = listMarkdownFiles(c);
  for (const m of matches) {
    const file = allFiles.find((f) => f.filename === m.filename);
    if (!file) continue;
    const lines = readNoteContent(file).split(/\r?\n/);
    const section = sliceSection(lines, m.lineStart);
    const src = sourceLine(c, m.filename);
    out.push(`# [${corpusId}] ${m.text}  ·  ${m.filename}` + (src ? `\n> ${src}` : "") + "\n\n" + section);
    out.push("");
  }
  return truncateIfNeeded(out.join("\n"));
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
