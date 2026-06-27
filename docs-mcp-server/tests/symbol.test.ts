import { beforeEach, describe, expect, it } from "vitest";
import { doSymbol, buildSymbolIndex, getCorpus, _clearCaches } from "../src/corpus.js";

beforeEach(() => _clearCaches());

describe("docs_symbol gating", () => {
  it("未開 symbol 的語料(sqlsugar)回友善提示", () => {
    expect(doSymbol("sqlsugar", "查詢", 8)).toMatch(/未啟用 symbol|無符號索引/);
  });
});

describe("doSymbol(fc) — ## 標題命中", () => {
  it("命中 ## 標題 API方法 並回段落 + [fc]", () => {
    const out = doSymbol("fc", "API方法", 8);
    expect(out).toMatch(/API方法/);
    expect(out).toMatch(/\[fc\]/);
  });
});

describe("doSymbol(fc) — # 一級標題索引", () => {
  it("表單 API(一級標題)真實被索引，查詢非空", () => {
    // 表單 API 是 fc/開發文檔/11表单 API.md 裡的 # 一級標題
    // minLevel=1 索引後能被包含比對找到
    const out = doSymbol("fc", "表單 API", 8);
    // 確認命中而非「找不到符號」提示
    expect(out).not.toMatch(/找不到符號/);
    expect(out).toMatch(/\[fc\]/);
  });

  it("# 一級標題進入索引(buildSymbolIndex level=1 有項目)", () => {
    const corpus = getCorpus("fc");
    expect(corpus).toBeDefined();
    const index = buildSymbolIndex(corpus!);
    // 直接確認索引中有 level=1 的 entry
    let hasLevelOne = false;
    for (const entries of index.values()) {
      if (entries.some((e) => e.level === 1)) { hasLevelOne = true; break; }
    }
    expect(hasLevelOne).toBe(true);
  });
});

describe("doSymbol(fc) — 未命中與 gating", () => {
  it("未命中時建議改用 docs_search", () => {
    expect(doSymbol("fc", "絕對不存在的符號xyz", 8)).toMatch(/docs_search/);
  });
});
