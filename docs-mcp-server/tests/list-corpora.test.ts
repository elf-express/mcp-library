/**
 * list-corpora.test.ts — 能力標註 + 可用領域工具提示測試
 *
 * 驗證 doListCorpora() 輸出:
 *   fc (symbol:true)           — 標題含「符號查」badge,有 docs_symbol / docs_outline 提示
 *   sqlsugar (cheatsheet+examples) — 標題含「速查表」「代碼範例」badges,有 docs_code_search / docs_outline 提示
 *   所有語料                    — 有 docs_outline 提示
 */

import { describe, it, expect, beforeAll, afterAll } from "vitest";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { doListCorpora, _clearCaches } from "../src/corpus.js";

let root: string;
const originalEnv = process.env.DOCS_CORPORA_DIR;

function write(rel: string, content: string) {
  const p = path.join(root, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content, "utf-8");
}

beforeAll(() => {
  root = fs.mkdtempSync(path.join(os.tmpdir(), "docs-list-corpora-"));

  // fc: symbol only
  write("fc/corpus.json", JSON.stringify({
    title: "FcDesigner Pro",
    description: "fc 描述",
    capabilities: { cheatsheet: false, symbol: true },
  }));
  write("fc/intro.md", "# 介紹\n\n## API方法\n\n說明\n");

  // sqlsugar: cheatsheet + examples
  write("sqlsugar/corpus.json", JSON.stringify({
    title: "SqlSugar ORM",
    description: "sqlsugar 描述",
    capabilities: { cheatsheet: true, examples: true },
  }));
  write("sqlsugar/query.md", "# 查詢\n\n## 速查表\n\n| 方法 | 說明 |\n| --- | --- |\n| Query | 查 |\n");
  // 建一個 examples/ 資料夾讓語料有效
  write("sqlsugar/examples/Demo.cs", "// Demo\n");

  process.env.DOCS_CORPORA_DIR = root;
  _clearCaches();
});

afterAll(() => {
  if (originalEnv === undefined) delete process.env.DOCS_CORPORA_DIR;
  else process.env.DOCS_CORPORA_DIR = originalEnv;
  _clearCaches();
  try {
    fs.rmSync(root, { recursive: true, force: true });
  } catch { /* ignore */ }
});

describe("doListCorpora — 能力 badges", () => {
  it("fc(symbol=true) 標題含「符號查」badge", () => {
    const r = doListCorpora();
    // fc 的標題行要有「· 符號查」
    expect(r).toContain("· 符號查");
  });

  it("fc(symbol=true) 標題不含「速查表」或「代碼範例」badge", () => {
    const r = doListCorpora();
    // 取出 fc 區塊(## fc 到下一個 ## 之前)來驗證
    const fcBlock = extractBlock(r, "## fc");
    expect(fcBlock).not.toContain("速查表");
    expect(fcBlock).not.toContain("代碼範例");
  });

  it("sqlsugar(cheatsheet+examples) 標題含「速查表」與「代碼範例」badges", () => {
    const r = doListCorpora();
    const block = extractBlock(r, "## sqlsugar");
    expect(block).toContain("速查表");
    expect(block).toContain("代碼範例");
  });

  it("sqlsugar 標題不含「符號查」badge", () => {
    const r = doListCorpora();
    const block = extractBlock(r, "## sqlsugar");
    expect(block).not.toContain("符號查");
  });
});

describe("doListCorpora — 領域工具提示(所有語料都有 docs_outline)", () => {
  it("fc 區塊包含 docs_outline 提示", () => {
    const r = doListCorpora();
    const block = extractBlock(r, "## fc");
    expect(block).toContain('docs_outline(corpus="fc"');
  });

  it("sqlsugar 區塊包含 docs_outline 提示", () => {
    const r = doListCorpora();
    const block = extractBlock(r, "## sqlsugar");
    expect(block).toContain('docs_outline(corpus="sqlsugar"');
  });
});

describe("doListCorpora — 領域工具提示(能力相關工具)", () => {
  it("fc(symbol=true) 區塊含 docs_symbol 提示", () => {
    const r = doListCorpora();
    const block = extractBlock(r, "## fc");
    expect(block).toContain('docs_symbol(corpus="fc"');
  });

  it("fc(symbol=true) 區塊不含 docs_code_search 提示", () => {
    const r = doListCorpora();
    const block = extractBlock(r, "## fc");
    expect(block).not.toContain("docs_code_search");
  });

  it("sqlsugar(examples=true) 區塊含 docs_code_search 提示", () => {
    const r = doListCorpora();
    const block = extractBlock(r, "## sqlsugar");
    expect(block).toContain('docs_code_search(corpus="sqlsugar"');
  });

  it("sqlsugar(examples=true) 區塊不含 docs_symbol 提示", () => {
    const r = doListCorpora();
    const block = extractBlock(r, "## sqlsugar");
    expect(block).not.toContain("docs_symbol");
  });
});

// ---------------------------------------------------------------------------
// 輔助:從全文抽出 startMarker 到下一個 ## 之間的文字
// ---------------------------------------------------------------------------
function extractBlock(text: string, startMarker: string): string {
  const startIdx = text.indexOf(startMarker);
  if (startIdx === -1) return "";
  // 找下一個 ## 標題(與 startMarker 本身不同的行首 ##)
  const afterStart = text.indexOf("\n", startIdx);
  if (afterStart === -1) return text.slice(startIdx);
  const nextSection = text.indexOf("\n## ", afterStart);
  return nextSection === -1
    ? text.slice(startIdx)
    : text.slice(startIdx, nextSection);
}
