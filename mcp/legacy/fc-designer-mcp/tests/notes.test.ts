import { describe, it, expect, beforeAll } from "vitest";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import {
  listMarkdownFiles,
  loadSources,
  findNotes,
  doSearch,
  doRead,
  doList,
} from "../src/notes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

beforeAll(() => {
  // 強制指向 bundled notes/(不依賴 server 根 fallback)
  process.env.FC_DOCS_DIR = path.resolve(__dirname, "..", "notes");
});

describe("fc-docs notes", () => {
  it("遞迴讀到 133 篇文件", () => {
    expect(listMarkdownFiles().length).toBe(133);
  });

  it("檔名為相對路徑、保留分類子目錄", () => {
    const files = listMarkdownFiles();
    expect(files.every((f) => f.filename.includes("/"))).toBe(true);
    expect(files.some((f) => f.filename.startsWith("開發文檔/"))).toBe(true);
    expect(files.some((f) => f.filename.startsWith("二次開發/"))).toBe(true);
    expect(files.some((f) => f.filename.startsWith("產品手冊/"))).toBe(true);
  });

  it("sources.json 對照 133 條 https URL", () => {
    const src = loadSources();
    expect(Object.keys(src).length).toBe(133);
    expect(Object.values(src).every((u) => u.startsWith("https://"))).toBe(true);
  });

  it("findNotes 支援只給檔名(結尾比對)", () => {
    const m = findNotes("01TS类型定义");
    expect(m.length).toBe(1);
    expect(m[0].filename).toBe("開發文檔/01TS类型定义.md");
  });

  it("doSearch 命中關鍵字並回片段", () => {
    const r = doSearch("表單", 5, 1);
    expect(r).toContain("命中");
    expect(r).toContain("fc_read_doc");
  });

  it("doRead 回傳全文並附官方來源", () => {
    const r = doRead("開發文檔/01TS类型定义.md");
    expect(r).toContain("pro.form-create.com");
    expect(r.length).toBeGreaterThan(100);
  });

  it("doList 依分類分組顯示", () => {
    const r = doList(undefined);
    expect(r).toContain("二次開發");
    expect(r).toContain("產品手冊");
    expect(r).toContain("開發文檔");
    expect(r).toContain("共 133 篇");
  });
});
