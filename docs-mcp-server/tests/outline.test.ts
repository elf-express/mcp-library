import { beforeEach, describe, expect, it } from "vitest";
import { doOutline, _clearCaches } from "../src/corpus.js";

beforeEach(() => _clearCaches());

describe("doOutline", () => {
  it("無 corpus 時提示先選書", () => {
    const out = doOutline(undefined, undefined, false);
    expect(out).toMatch(/docs_list_corpora/);
  });
  it("列出 fc 的分類與篇名(預設不展開標題)", () => {
    const out = doOutline("fc", undefined, false);
    expect(out).toMatch(/開發文檔/);
    expect(out).toMatch(/11表单 API/);
    expect(out).not.toMatch(/^### /m); // headings=false 不展開篇內標題
  });
  it("path 過濾只剩該分類", () => {
    const out = doOutline("fc", "二次開發", false);
    expect(out).toMatch(/二次開發/);
    expect(out).not.toMatch(/開發文檔/);
  });
  it("找不到 corpus 時回提示", () => {
    expect(doOutline("nope", undefined, false)).toMatch(/找不到語料/);
  });
});
