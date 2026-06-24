/**
 * notes.ts — 純邏輯模組(不含 MCP server 設定、zod schemas、transport)
 *
 * FcDesigner Pro 文件查詢的檔案 I/O 與字串處理函式。
 * 文件以「相對路徑」為識別(保留分類子目錄,如 "開發文檔/structure.md")。
 * NOTES_DIR 惰性解析:每次呼叫時解析,以便測試可用環境變數切換。
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const CHARACTER_LIMIT = 25000;

const SKIP_DIRS = new Set([".git", "node_modules", "dist"]);

export function resolveNotesDir(): string {
  const envDir = process.env.FC_DOCS_DIR;
  if (envDir && envDir.trim().length > 0) return path.resolve(envDir);
  const serverRoot = path.resolve(__dirname, "..");
  const bundled = path.join(serverRoot, "notes");
  try {
    if (fs.statSync(bundled).isDirectory()) return bundled;
  } catch {
    /* ignore */
  }
  return path.resolve(serverRoot, "..");
}

export interface NoteFile {
  filename: string; // 相對路徑,如 "開發文檔/structure.md"
  fullPath: string;
}

export interface CachedNote {
  content: string;
  mtimeMs: number;
}

export const contentCache = new Map<string, CachedNote>();

/** 遞迴掃描 NOTES_DIR 下所有 .md(保留分類子目錄,檔名為相對路徑) */
export function listMarkdownFiles(): NoteFile[] {
  const NOTES_DIR = resolveNotesDir();
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
  walk(NOTES_DIR, "");
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
  if (content.charCodeAt(0) === 0xfeff) content = content.slice(1);
  contentCache.set(file.fullPath, { content, mtimeMs });
  return content;
}

// filename(相對路徑) -> 官方文件 URL,來自 NOTES_DIR/sources.json(快取)
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

/** 依 query 找文件:① 完整相對路徑 ② 路徑結尾(只給檔名) ③ 路徑包含 */
export function findNotes(query: string): NoteFile[] {
  const files = listMarkdownFiles();
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

export function doSearch(query: string, limit: number, ctx: number): string {
  const NOTES_DIR = resolveNotesDir();
  const keywords = query.split(/\s+/).map((k) => k.trim()).filter((k) => k.length > 0);
  if (keywords.length === 0) return "錯誤:請提供至少一個關鍵字。";
  const lowerKeywords = keywords.map((k) => k.toLowerCase());
  const files = listMarkdownFiles();
  if (files.length === 0) {
    return "錯誤:在文件資料夾找不到任何 .md 檔案。\n資料夾路徑:" + NOTES_DIR;
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
    return "找不到同時包含 [" + keywords.join(", ") + "] 的文件。\n建議:減少關鍵字數量,或改用 fc_list_docs 瀏覽所有文件。";
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
    out.push('> 用 fc_read_doc 讀取完整內容:filename="' + h.filename + '"');
    out.push("");
  }
  return truncateIfNeeded(out.join("\n"));
}

export function doRead(filename: string): string {
  const matches = findNotes(filename);
  if (matches.length === 0) {
    return '找不到符合 "' + filename + '" 的文件。請用 fc_list_docs 查看可用檔名。';
  }
  if (matches.length > 1) {
    const list = matches.map((m) => "- " + m.filename).join("\n");
    return '"' + filename + '" 符合多篇文件,請指定更精確的路徑:\n\n' + list;
  }
  const file = matches[0];
  const src = sourceLine(file.filename);
  const head = "# 檔案:" + file.filename + (src ? "\n\n> " + src : "") + "\n\n";
  return truncateIfNeeded(head + readNoteContent(file));
}

export function doList(filter: string | undefined): string {
  const NOTES_DIR = resolveNotesDir();
  let files = listMarkdownFiles();
  if (filter && filter.trim()) {
    const f = filter.trim().toLowerCase();
    files = files.filter((file) => file.filename.toLowerCase().includes(f));
  }
  if (files.length === 0) return "沒有符合的文件。文件資料夾:" + NOTES_DIR;
  const byCat = new Map<string, string[]>();
  for (const file of files) {
    const parts = file.filename.split("/");
    const cat = parts.length > 1 ? parts[0] : "(其他)";
    if (!byCat.has(cat)) byCat.set(cat, []);
    byCat.get(cat)!.push(file.filename);
  }
  const out: string[] = ["# FcDesigner Pro 文件清單 (共 " + files.length + " 篇)", ""];
  for (const [cat, list] of byCat) {
    out.push("## " + cat + " (" + list.length + " 篇)");
    for (const fn of list) out.push("- " + fn);
    out.push("");
  }
  return truncateIfNeeded(out.join("\n"));
}
