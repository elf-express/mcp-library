import { describe, it, expect, beforeAll, afterAll } from "vitest";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { findNotes } from "../src/notes.js";

// Fixture 檔名
const FIXTURE_FILES = [
  "Where用法.md",
  "Where進階.md",
  "事務用法.md",
  "abc.md",
  "ABCdef.md",
];

describe("findNotes — 檔名比對行為", () => {
  let tmpDir: string;
  const originalEnv = process.env.SQLSUGAR_NOTES_DIR;

  beforeAll(() => {
    // 建立暫存目錄並寫入 fixture 檔案
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "findnotes-"));
    for (const name of FIXTURE_FILES) {
      fs.writeFileSync(path.join(tmpDir, name), `# ${name}\n`, "utf-8");
    }
    process.env.SQLSUGAR_NOTES_DIR = tmpDir;
  });

  afterAll(() => {
    // 還原環境變數
    if (originalEnv === undefined) {
      delete process.env.SQLSUGAR_NOTES_DIR;
    } else {
      process.env.SQLSUGAR_NOTES_DIR = originalEnv;
    }
    // 刪除暫存目錄
    try {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    } catch {
      /* ignore */
    }
  });

  // a. 精確檔名(含 .md)→ 只回傳該檔
  it("精確檔名(含 .md)→ 只回傳該筆記", () => {
    const result = findNotes("Where用法.md");
    expect(result).toHaveLength(1);
    expect(result[0].filename).toBe("Where用法.md");
  });

  // b. 省略 .md → 同上
  it("省略 .md → 同上精確命中", () => {
    const result = findNotes("Where用法");
    expect(result).toHaveLength(1);
    expect(result[0].filename).toBe("Where用法.md");
  });

  // c. 精確命中優先,不帶出其他前綴相同的檔
  it("精確命中存在時,不回傳其他前綴匹配的檔(Where用法 不帶出 Where進階)", () => {
    const result = findNotes("Where用法");
    const filenames = result.map((f) => f.filename);
    expect(filenames).toContain("Where用法.md");
    expect(filenames).not.toContain("Where進階.md");
  });

  // c2. abc vs ABCdef — 精確優先,只回 abc.md
  it("精確命中優先:abc → 只回 abc.md,不帶出 ABCdef.md", () => {
    const result = findNotes("abc");
    const filenames = result.map((f) => f.filename);
    expect(filenames).toContain("abc.md");
    expect(filenames).not.toContain("ABCdef.md");
  });

  // d. 無精確但有前綴 → 回傳所有前綴命中
  it("無精確但有前綴 → 回傳所有前綴命中(Where → Where用法.md + Where進階.md)", () => {
    const result = findNotes("Where");
    const filenames = result.map((f) => f.filename);
    expect(filenames).toContain("Where用法.md");
    expect(filenames).toContain("Where進階.md");
    expect(filenames).not.toContain("事務用法.md");
    expect(filenames).not.toContain("abc.md");
  });

  // e. 無精確無前綴但「包含」→ 回傳包含命中
  it("無精確無前綴但包含關鍵字 → 回傳包含命中(用法 → Where用法.md + 事務用法.md)", () => {
    const result = findNotes("用法");
    const filenames = result.map((f) => f.filename);
    expect(filenames).toContain("Where用法.md");
    expect(filenames).toContain("事務用法.md");
    expect(filenames).not.toContain("Where進階.md");
    expect(filenames).not.toContain("abc.md");
  });

  // f. 完全無符合 → 空陣列
  it("完全無符合 → 回傳空陣列", () => {
    const result = findNotes("完全不存在的關鍵字xyz");
    expect(result).toEqual([]);
  });

  // g. 大小寫不敏感
  it("大小寫不敏感:ABC 與 abc 等效(精確命中 abc.md)", () => {
    const lowerResult = findNotes("abc");
    const upperResult = findNotes("ABC");
    expect(lowerResult.map((f) => f.filename)).toEqual(
      upperResult.map((f) => f.filename)
    );
  });

  // g2. 大小寫不敏感(另一方向):小寫 query 命中大寫命名檔
  it("大小寫不敏感(另一方向):abcdef 應命中 ABCdef.md,ABCDEF 結果相同", () => {
    const lowerResult = findNotes("abcdef");
    const lowerFilenames = lowerResult.map((f) => f.filename);
    expect(lowerFilenames).toContain("ABCdef.md");

    const upperResult = findNotes("ABCDEF");
    const upperFilenames = upperResult.map((f) => f.filename);
    expect(upperFilenames).toContain("ABCdef.md");

    // 兩者結果一致
    expect(lowerFilenames).toEqual(upperFilenames);
  });

  // 回傳型別驗證:含 filename 與 fullPath
  it("回傳 NoteFile[] 且每筆包含 filename 與 fullPath 屬性", () => {
    const result = findNotes("Where用法");
    expect(result[0]).toHaveProperty("filename");
    expect(result[0]).toHaveProperty("fullPath");
  });

  // fullPath 指向實際存在的檔案
  it("fullPath 指向暫存目錄中實際存在的檔案", () => {
    const result = findNotes("事務用法");
    expect(result).toHaveLength(1);
    expect(fs.existsSync(result[0].fullPath)).toBe(true);
  });

  // 大寫副檔名(.MD)應等同小寫(.md)精確命中
  it('findNotes("Where用法.MD") 大寫副檔名應等同 "Where用法.md" 精確命中', () => {
    const upper = findNotes("Where用法.MD");
    const lower = findNotes("Where用法.md");
    expect(upper).toHaveLength(1);
    expect(upper[0].filename).toBe("Where用法.md");
    expect(upper.map((f) => f.filename)).toEqual(lower.map((f) => f.filename));
  });
});
