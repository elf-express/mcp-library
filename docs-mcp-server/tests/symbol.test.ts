import { beforeEach, describe, expect, it } from "vitest";
import { doSymbol, _clearCaches } from "../src/corpus.js";

beforeEach(() => _clearCaches());

describe("docs_symbol gating", () => {
  it("未開 symbol 的語料(sqlsugar)回友善提示", () => {
    expect(doSymbol("sqlsugar", "查詢", 8)).toMatch(/未啟用 symbol|無符號索引/);
  });
});

describe("doSymbol(fc)", () => {
  it("命中某個 ## 標題並回該段落 + 來源篇", () => {
    const out = doSymbol("fc", "表单 API", 8);
    expect(out).toMatch(/表单 API/);
    expect(out).toMatch(/\[fc\]/);
  });
  it("未命中時建議改用 docs_search", () => {
    expect(doSymbol("fc", "絕對不存在的符號xyz", 8)).toMatch(/docs_search/);
  });
});
