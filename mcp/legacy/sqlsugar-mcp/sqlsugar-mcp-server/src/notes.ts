/**
 * notes.ts — 純邏輯模組(不含 MCP server 設定、zod schemas、transport)
 *
 * 從 index.ts 搬移的所有檔案 I/O 與字串處理函式。
 * NOTES_DIR / EXAMPLES_DIR 改為惰性解析:每次呼叫時解析,以便測試可用環境變數切換。
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const CHARACTER_LIMIT = 25000;

export function resolveNotesDir(): string {
  const envDir = process.env.SQLSUGAR_NOTES_DIR;
  if (envDir && envDir.trim().length > 0) return path.resolve(envDir);
  const serverRoot = path.resolve(__dirname, "..");
  const bundled = path.join(serverRoot, "notes");
  try {
    if (
      fs.statSync(bundled).isDirectory() &&
      fs.readdirSync(bundled).some((n) => n.toLowerCase().endsWith(".md"))
    ) {
      return bundled;
    }
  } catch {
    /* ignore */
  }
  return path.resolve(serverRoot, "..");
}

export function resolveExamplesDir(): string {
  const env = process.env.SQLSUGAR_EXAMPLES_DIR;
  if (env && env.trim().length > 0) return path.resolve(env);
  const serverRoot = path.resolve(__dirname, "..");
  const bundled = path.join(serverRoot, "examples");
  try {
    if (fs.statSync(bundled).isDirectory()) return bundled;
  } catch {
    /* ignore */
  }
  return path.resolve(serverRoot, "..");
}

export const CODE_EXT = new Set([".cs", ".csproj", ".sln"]);
export const SKIP_DIRS = new Set(["bin", "obj", ".vs", ".git", "node_modules", "dist", "notes"]);

export interface CodeFile {
  rel: string;
  fullPath: string;
}

export function listCodeFiles(): CodeFile[] {
  const EXAMPLES_DIR = resolveExamplesDir();
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
        if (SKIP_DIRS.has(e.name)) continue;
        walk(path.join(dir, e.name), rel ? rel + "/" + e.name : e.name);
      } else if (CODE_EXT.has(path.extname(e.name).toLowerCase())) {
        const r = rel ? rel + "/" + e.name : e.name;
        out.push({ rel: r, fullPath: path.join(dir, e.name) });
      }
    }
  };
  walk(EXAMPLES_DIR, "");
  return out.sort((a, b) => a.rel.localeCompare(b.rel));
}

export function fenceLang(rel: string): string {
  if (rel.endsWith(".cs")) return "csharp";
  if (rel.endsWith(".csproj") || rel.endsWith(".sln")) return "xml";
  return "";
}

export function doListExamples(): string {
  const EXAMPLES_DIR = resolveExamplesDir();
  const files = listCodeFiles();
  if (!files.length) return "找不到範例原始碼。examples 資料夾:" + EXAMPLES_DIR;
  const byProj = new Map<string, string[]>();
  for (const f of files) {
    const proj = f.rel.split("/")[0];
    if (!byProj.has(proj)) byProj.set(proj, []);
    byProj.get(proj)!.push(f.rel);
  }
  const out: string[] = ["# 範例專案原始碼 (共 " + files.length + " 檔)", ""];
  for (const [proj, list] of byProj) {
    out.push("## " + proj + " (" + list.length + " 檔)");
    for (const r of list) out.push("- " + r);
    out.push("");
  }
  return truncateIfNeeded(out.join("\n"));
}

export function doReadCode(q: string): string {
  const files = listCodeFiles();
  const ql = q.trim().toLowerCase();
  let m = files.filter((f) => f.rel.toLowerCase() === ql);
  if (!m.length) m = files.filter((f) => f.rel.toLowerCase().endsWith(ql));
  if (!m.length) m = files.filter((f) => f.rel.toLowerCase().includes(ql));
  if (!m.length) return '找不到符合 "' + q + '" 的原始碼。用 sqlsugar_list_examples 查看清單。';
  if (m.length > 1) {
    return '"' + q + '" 符合多個檔,請更精確:\n\n' + m.map((f) => "- " + f.rel).join("\n");
  }
  const f = m[0];
  const body = readNoteContent({ filename: f.rel, fullPath: f.fullPath });
  return truncateIfNeeded("# " + f.rel + "\n\n\x60\x60\x60" + fenceLang(f.rel) + "\n" + body + "\n\x60\x60\x60");
}

export function doSearchCode(query: string, limit: number, ctx: number): string {
  const EXAMPLES_DIR = resolveExamplesDir();
  const keywords = query.split(/\s+/).map((k) => k.trim()).filter((k) => k.length > 0);
  if (keywords.length === 0) return "錯誤:請提供至少一個關鍵字。";
  const lk = keywords.map((k) => k.toLowerCase());
  const files = listCodeFiles();
  if (!files.length) return "找不到範例原始碼。examples 資料夾:" + EXAMPLES_DIR;
  interface Hit { rel: string; hitCount: number; snippets: string[]; }
  const hits: Hit[] = [];
  for (const file of files) {
    const content = readNoteContent({ filename: file.rel, fullPath: file.fullPath });
    const lower = content.toLowerCase();
    if (!lk.every((k) => lower.includes(k))) continue;
    const lines = content.split(/\r?\n/);
    const idxs: number[] = [];
    for (let i = 0; i < lines.length; i++) {
      if (lk.some((k) => lines[i].toLowerCase().includes(k))) idxs.push(i);
    }
    if (!idxs.length) continue;
    const ranges: Array<[number, number]> = [];
    for (const idx of idxs) {
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
    hits.push({ rel: file.rel, hitCount: idxs.length, snippets });
  }
  if (!hits.length) return "範例原始碼中找不到 [" + keywords.join(", ") + "]。";
  hits.sort((a, b) => b.hitCount - a.hitCount);
  const out: string[] = ["# 程式碼搜尋:[" + keywords.join(", ") + "]", "", "共 " + hits.length + " 檔命中。", ""];
  for (const h of hits.slice(0, limit)) {
    out.push("## " + h.rel + " (" + h.hitCount + " 處)");
    out.push("");
    for (const sn of h.snippets) {
      out.push("\x60\x60\x60");
      out.push(sn);
      out.push("\x60\x60\x60");
    }
    out.push('> 用 sqlsugar_read_code 讀完整檔:path="' + h.rel + '"');
    out.push("");
  }
  return truncateIfNeeded(out.join("\n"));
}

export interface NoteFile {
  filename: string;
  fullPath: string;
}

export interface CachedNote {
  content: string;
  mtimeMs: number;
}

export const contentCache = new Map<string, CachedNote>();

// filename -> 官方文件 URL,來自 NOTES_DIR/sources.json(快取)
let sourcesCache: { dir: string; map: Record<string, string>; mtimeMs: number } | null = null;

export function loadSources(): Record<string, string> {
  const NOTES_DIR = resolveNotesDir();
  const p = path.join(NOTES_DIR, "sources.json");
  let mtimeMs = 0;
  try {
    mtimeMs = fs.statSync(p).mtimeMs;
  } catch {
    return {};
  }
  if (sourcesCache && sourcesCache.mtimeMs === mtimeMs && sourcesCache.dir === p) return sourcesCache.map;
  try {
    const map = JSON.parse(fs.readFileSync(p, "utf-8")) as Record<string, string>;
    sourcesCache = { dir: p, map, mtimeMs };
    return map;
  } catch {
    return {};
  }
}

export function sourceUrlFor(filename: string): string | undefined {
  return loadSources()[filename];
}

export function sourceLine(filename: string): string {
  const url = sourceUrlFor(filename);
  return url ? "📖 官方文件來源:" + url : "";
}

export function listMarkdownFiles(): NoteFile[] {
  const NOTES_DIR = resolveNotesDir();
  let entries: fs.Dirent[];
  try {
    entries = fs.readdirSync(NOTES_DIR, { withFileTypes: true });
  } catch {
    return [];
  }
  return entries
    .filter((e) => e.isFile() && e.name.toLowerCase().endsWith(".md"))
    .map((e) => ({ filename: e.name, fullPath: path.join(NOTES_DIR, e.name) }))
    .sort((a, b) => a.filename.localeCompare(b.filename, "zh-Hant"));
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
  if (content.charCodeAt(0) === 0xfeff) content = content.slice(1);
  contentCache.set(file.fullPath, { content, mtimeMs });
  return content;
}

export function findNotes(query: string): NoteFile[] {
  const files = listMarkdownFiles();
  const q = query.trim().toLowerCase();
  const qNoExt = q.endsWith(".md") ? q.slice(0, -3) : q;
  const exact = files.filter(
    (f) => f.filename.toLowerCase() === q || f.filename.toLowerCase() === qNoExt + ".md"
  );
  if (exact.length) return exact;
  const starts = files.filter((f) => f.filename.toLowerCase().startsWith(qNoExt));
  if (starts.length) return starts;
  return files.filter((f) => f.filename.toLowerCase().includes(qNoExt));
}

export function truncateIfNeeded(text: string): string {
  if (text.length <= CHARACTER_LIMIT) return text;
  return (
    text.slice(0, CHARACTER_LIMIT) +
    "\n\n…(內容已截斷,超過 " + CHARACTER_LIMIT + " 字元。請用更精確的關鍵字或讀取特定檔案。)"
  );
}

export function extractCheatsheet(content: string): string | null {
  const lines = content.split(/\r?\n/);
  let start = -1;
  for (let i = 0; i < lines.length; i++) {
    if (/^#{1,6}\s+.*速查/.test(lines[i])) {
      start = i;
      break;
    }
  }
  if (start === -1) return null;
  const startLevel = (lines[start].match(/^#+/) ?? ["#"])[0].length;
  let end = lines.length;
  for (let i = start + 1; i < lines.length; i++) {
    const m = lines[i].match(/^(#{1,6})\s+/);
    if (m && m[1].length <= startLevel) {
      end = i;
      break;
    }
  }
  return lines.slice(start, end).join("\n").trim();
}

export function doSearch(query: string, limit: number, ctx: number): string {
  const NOTES_DIR = resolveNotesDir();
  const keywords = query.split(/\s+/).map((k) => k.trim()).filter((k) => k.length > 0);
  if (keywords.length === 0) return "錯誤:請提供至少一個關鍵字。";
  const lowerKeywords = keywords.map((k) => k.toLowerCase());
  const files = listMarkdownFiles();
  if (files.length === 0) {
    return "錯誤:在筆記資料夾找不到任何 .md 檔案。\n資料夾路徑:" + NOTES_DIR;
  }
  interface Hit {
    filename: string;
    hitCount: number;
    snippets: string[];
  }
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
    hits.push({ filename: file.filename, hitCount: matchedLineIdx.length, snippets });
  }
  if (hits.length === 0) {
    return "找不到同時包含 [" + keywords.join(", ") + "] 的筆記。\n建議:減少關鍵字數量,或改用 sqlsugar_list_notes 瀏覽所有筆記。";
  }
  hits.sort((a, b) => b.hitCount - a.hitCount);
  const limited = hits.slice(0, limit);
  const out: string[] = [
    "# 搜尋結果:[" + keywords.join(", ") + "]",
    "",
    "共 " + hits.length + " 篇命中" + (hits.length > limited.length ? "(顯示前 " + limited.length + " 篇)" : "") + "。",
    "",
  ];
  for (const h of limited) {
    out.push("## " + h.filename + " (" + h.hitCount + " 處命中)");
    const hsrc = sourceLine(h.filename);
    if (hsrc) out.push(hsrc);
    out.push("");
    for (const s of h.snippets) {
      out.push("\x60\x60\x60");
      out.push(s);
      out.push("\x60\x60\x60");
    }
    out.push('> 用 sqlsugar_read_note 讀取完整內容:filename="' + h.filename + '"');
    out.push("");
  }
  return truncateIfNeeded(out.join("\n"));
}

export function doRead(filename: string): string {
  const matches = findNotes(filename);
  if (matches.length === 0) {
    return '找不到符合 "' + filename + '" 的筆記。請用 sqlsugar_list_notes 查看可用檔名。';
  }
  if (matches.length > 1) {
    const list = matches.map((m) => "- " + m.filename).join("\n");
    return '"' + filename + '" 符合多篇筆記,請指定更精確的檔名:\n\n' + list;
  }
  const file = matches[0];
  const src = sourceLine(file.filename);
  const head = "# 檔案:" + file.filename + (src ? "\n\n> " + src : "") + "\n\n";
  return truncateIfNeeded(head + readNoteContent(file));
}

export function doList(filter: string | undefined, includeIndex: boolean): string {
  const NOTES_DIR = resolveNotesDir();
  let files = listMarkdownFiles();
  if (filter && filter.trim()) {
    const f = filter.trim().toLowerCase();
    files = files.filter((file) => file.filename.toLowerCase().includes(f));
  }
  if (files.length === 0) return "沒有符合的筆記。筆記資料夾:" + NOTES_DIR;
  const out: string[] = ["# SqlSugar 筆記清單 (共 " + files.length + " 篇)", ""];
  for (const file of files) out.push("- " + file.filename);
  if (includeIndex) {
    const indexFile = listMarkdownFiles().find((f) => f.filename.toLowerCase() === "index.md");
    if (indexFile) out.push("", "---", "", "# 分類導航 (index.md)", "", readNoteContent(indexFile));
  }
  return truncateIfNeeded(out.join("\n"));
}

export function doCheatsheet(filename: string): string {
  const matches = findNotes(filename);
  if (matches.length === 0) {
    return '找不到符合 "' + filename + '" 的筆記。請用 sqlsugar_list_notes 查看檔名。';
  }
  if (matches.length > 1) {
    const list = matches.map((m) => "- " + m.filename).join("\n");
    return '"' + filename + '" 符合多篇筆記,請指定更精確的檔名:\n\n' + list;
  }
  const file = matches[0];
  const cheat = extractCheatsheet(readNoteContent(file));
  if (!cheat) {
    return "「" + file.filename + '」沒有速查表段落。請改用 sqlsugar_read_note 讀取完整內容 (filename="' + file.filename + '")。';
  }
  const csrc = sourceLine(file.filename);
  return truncateIfNeeded("# " + file.filename + " — 速查表" + (csrc ? "\n\n> " + csrc : "") + "\n\n" + cheat);
}
