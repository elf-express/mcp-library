/**
 * tools.test.ts
 * 行為測試:doSearch / doList / doCheatsheet
 * fixture 目錄以 fs.mkdtempSync 建立,beforeAll/afterAll 清理。
 */

import { describe, it, expect, beforeAll, afterAll } from "vitest";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { doSearch, doList, doCheatsheet, contentCache } from "../src/notes.js";

// ---------------------------------------------------------------------------
// Fixture 檔案內容設計
// alpha.md  : 含「SqlSugar」3 次 + 「## 速查表」段落
// beta.md   : 含「SqlSugar」1 次,無速查表,供降冪排序驗證
// gamma.md  : 含「SqlSugar」AND「Lambda」—— 雙關鍵字 AND 命中
// delta.md  : 只含「Lambda」,不含「SqlSugar」—— 雙關鍵字 AND 不命中
// omega.md  : 含「SqlSugar」1 次,備 limit 測試第 3 篇用
// index.md  : 做為分類導航,供 doList(includeIndex=true) 驗證
// ---------------------------------------------------------------------------

const ALPHA_CONTENT = `# Alpha 筆記

SqlSugar 是一個 ORM 框架。

## 速查表

| 方法 | 說明 |
| --- | --- |
| Select | 查詢 |
| Insert | 新增 |

SqlSugar 支援多種資料庫。

## 其他章節

SqlSugar 的其他用法請參考官方文件。

不應出現在速查表結果中的文字。
`;

const BETA_CONTENT = `# Beta 筆記

Beta 說明文件,提及 SqlSugar 一次。

## 用法

這裡只有一般說明,沒有速查表段落。
`;

const GAMMA_CONTENT = `# Gamma 筆記

SqlSugar 搭配 Lambda 表達式使用。

## 說明

這篇同時包含兩個關鍵字。
`;

const DELTA_CONTENT = `# Delta 筆記

Lambda 表達式的應用。

## 說明

這裡只有 Lambda 語法,沒有其他 ORM 關鍵字。
`;

const OMEGA_CONTENT = `# Omega 筆記

SqlSugar 的進階設定。
`;

const INDEX_CONTENT = `# SqlSugar 筆記索引

## 分類一

- alpha.md
- beta.md

## 分類二

- gamma.md
`;

const FIXTURE_FILES: Record<string, string> = {
  "alpha.md": ALPHA_CONTENT,
  "beta.md": BETA_CONTENT,
  "gamma.md": GAMMA_CONTENT,
  "delta.md": DELTA_CONTENT,
  "omega.md": OMEGA_CONTENT,
  "index.md": INDEX_CONTENT,
};

// ---------------------------------------------------------------------------
// 共用 beforeAll / afterAll
// ---------------------------------------------------------------------------

let tmpDir: string;
const originalEnv = process.env.SQLSUGAR_NOTES_DIR;

beforeAll(() => {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "sqlsugar-tools-"));
  for (const [name, content] of Object.entries(FIXTURE_FILES)) {
    fs.writeFileSync(path.join(tmpDir, name), content, "utf-8");
  }
  process.env.SQLSUGAR_NOTES_DIR = tmpDir;
  // 清除 content cache 以確保讀到 fixture 檔
  contentCache.clear();
});

afterAll(() => {
  if (originalEnv === undefined) {
    delete process.env.SQLSUGAR_NOTES_DIR;
  } else {
    process.env.SQLSUGAR_NOTES_DIR = originalEnv;
  }
  contentCache.clear();
  try {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  } catch {
    /* ignore */
  }
});

// ===========================================================================
// doSearch
// ===========================================================================

describe("doSearch — 搜尋行為", () => {
  // --- 空白 query ---
  it("query 全空白 → 回傳「錯誤:請提供至少一個關鍵字。」", () => {
    const result = doSearch("   ", 10, 0);
    expect(result).toBe("錯誤:請提供至少一個關鍵字。");
  });

  // --- 單關鍵字命中 ---
  it("單關鍵字 SqlSugar → 命中含 SqlSugar 的多篇筆記(alpha/beta/gamma/omega)", () => {
    const result = doSearch("SqlSugar", 10, 0);
    expect(result).toContain("alpha.md");
    expect(result).toContain("beta.md");
    expect(result).toContain("gamma.md");
    expect(result).toContain("omega.md");
    // delta 不含 SqlSugar,不應出現
    expect(result).not.toContain("delta.md");
  });

  // --- 雙關鍵字 AND ---
  it("雙關鍵字 AND:SqlSugar Lambda → 只命中 gamma.md(同時含兩詞)", () => {
    const result = doSearch("SqlSugar Lambda", 10, 0);
    expect(result).toContain("gamma.md");
    // alpha/beta/omega 不含 Lambda,不應出現
    expect(result).not.toContain("alpha.md");
    expect(result).not.toContain("beta.md");
    expect(result).not.toContain("omega.md");
    // delta 不含 SqlSugar,不應出現
    expect(result).not.toContain("delta.md");
  });

  // --- 命中次數降冪排序 ---
  it("命中次數降冪排序:alpha(3 次) 排在 beta(1 次) 之前", () => {
    const result = doSearch("SqlSugar", 10, 0);
    const idxAlpha = result.indexOf("alpha.md");
    const idxBeta = result.indexOf("beta.md");
    expect(idxAlpha).toBeGreaterThanOrEqual(0);
    expect(idxBeta).toBeGreaterThanOrEqual(0);
    expect(idxAlpha).toBeLessThan(idxBeta);
  });

  // --- 輸出含檔名與「處命中」字樣 ---
  it("輸出含「處命中」字樣", () => {
    const result = doSearch("SqlSugar", 10, 0);
    expect(result).toContain("處命中");
  });

  // --- 輸出含 sqlsugar_read_note 提示 ---
  it("輸出含 sqlsugar_read_note 提示", () => {
    const result = doSearch("SqlSugar", 10, 0);
    expect(result).toContain("sqlsugar_read_note");
  });

  // --- 無命中 ---
  it("無命中 → 回傳訊息含「找不到同時包含」", () => {
    const result = doSearch("完全不存在的字xyz", 10, 0);
    expect(result).toContain("找不到同時包含");
  });

  // --- limit 生效 ---
  it("limit=1 且 3 篇命中時,輸出含「顯示前 1 篇」", () => {
    // SqlSugar 命中 alpha/beta/gamma/omega(4篇),limit=1
    const result = doSearch("SqlSugar", 1, 0);
    expect(result).toContain("顯示前 1 篇");
  });

  // --- 大小寫不敏感 ---
  it("大小寫不敏感:小寫 sqlsugar 可命中內文大寫 SqlSugar", () => {
    const result = doSearch("sqlsugar", 10, 0);
    expect(result).toContain("alpha.md");
    expect(result).toContain("beta.md");
  });
});

// ===========================================================================
// doList
// ===========================================================================

describe("doList — 清單行為", () => {
  // --- 無 filter → 列出所有 .md 檔,含「共 N 篇」 ---
  it("無 filter → 列出所有 .md 檔,輸出含「共 N 篇」", () => {
    const result = doList(undefined, false);
    expect(result).toMatch(/共 \d+ 篇/);
    expect(result).toContain("alpha.md");
    expect(result).toContain("beta.md");
    expect(result).toContain("gamma.md");
    expect(result).toContain("delta.md");
    expect(result).toContain("omega.md");
    expect(result).toContain("index.md");
  });

  // --- filter 符合 ---
  it("filter='gamma' → 只列出 gamma.md", () => {
    const result = doList("gamma", false);
    expect(result).toContain("gamma.md");
    expect(result).not.toContain("alpha.md");
    expect(result).not.toContain("beta.md");
  });

  // --- filter 大小寫不敏感 ---
  it("filter 大小寫不敏感:filter='ALPHA' 應命中 alpha.md", () => {
    const result = doList("ALPHA", false);
    expect(result).toContain("alpha.md");
    expect(result).not.toContain("beta.md");
  });

  // --- filter 無符合 ---
  it("filter 無符合 → 回傳含「沒有符合的筆記」", () => {
    const result = doList("完全不存在xyzxyz", false);
    expect(result).toContain("沒有符合的筆記");
  });

  // --- includeIndex=true → 含分類導航 ---
  it("includeIndex=true → 輸出含「分類導航 (index.md)」與 index.md 內容", () => {
    const result = doList(undefined, true);
    expect(result).toContain("分類導航 (index.md)");
    // index.md 的內容片段
    expect(result).toContain("SqlSugar 筆記索引");
  });

  // --- includeIndex=false → 不含分類導航 ---
  it("includeIndex=false → 輸出不含「分類導航」", () => {
    const result = doList(undefined, false);
    expect(result).not.toContain("分類導航");
  });
});

// ===========================================================================
// doCheatsheet
// ===========================================================================

describe("doCheatsheet — 速查表行為", () => {
  // --- 有速查表段落 ---
  it("alpha.md 有「## 速查表」→ 回傳含「速查表」標頭與段落內容", () => {
    const result = doCheatsheet("alpha.md");
    expect(result).toContain("## 速查表");
    // 速查表內容
    expect(result).toContain("Select");
    expect(result).toContain("Insert");
  });

  // --- 速查表段落不含後續段落 ---
  it("alpha.md 速查表結果不含「其他章節」後面的內容", () => {
    const result = doCheatsheet("alpha.md");
    expect(result).not.toContain("不應出現在速查表結果中的文字");
  });

  // --- 無速查表段落 ---
  it("beta.md 沒有速查段落 → 回傳含「沒有速查表段落」與「sqlsugar_read_note」", () => {
    const result = doCheatsheet("beta.md");
    expect(result).toContain("沒有速查表段落");
    expect(result).toContain("sqlsugar_read_note");
  });

  // --- 模糊檔名多筆符合 ---
  it("模糊查詢多筆符合 → 回傳含「符合多篇筆記」與候選清單", () => {
    // query "md" 不精確、不是任何檔的前綴,
    // 但所有 .md 檔名均 includes("md"),故全部命中 → 多筆 → 「符合多篇筆記」
    const result = doCheatsheet("md");
    expect(result).toContain("符合多篇筆記");
    // 候選清單應含至少兩個已知檔名
    expect(result).toContain("alpha.md");
    expect(result).toContain("beta.md");
  });

  // --- 找不到 ---
  it("找不到符合 → 回傳含「找不到符合」", () => {
    const result = doCheatsheet("完全不存在的檔名xyz");
    expect(result).toContain("找不到符合");
  });
});
