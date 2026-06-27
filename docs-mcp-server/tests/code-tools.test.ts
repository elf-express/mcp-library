import { beforeEach, describe, expect, it } from "vitest";
import { doCodeSearch, doCodeRead, _clearCaches } from "../src/corpus.js";

beforeEach(() => _clearCaches());

describe("docs_code_* gating", () => {
  it("未開 examples 的語料(fc)回友善提示", () => {
    expect(doCodeSearch("fc", "", 10, 2)).toMatch(/無代碼範例|未啟用/);
    expect(doCodeRead("fc", "Program.cs")).toMatch(/無代碼範例|未啟用/);
  });
});

describe("doCodeSearch(sqlsugar)", () => {
  it("空 query 列出範例檔清單", () => {
    const out = doCodeSearch("sqlsugar", "", 50, 2);
    expect(out).toMatch(/\.cs/);
  });
  it("有 query 回命中片段(含行號)", () => {
    const out = doCodeSearch("sqlsugar", "class", 10, 1);
    expect(out).toMatch(/class/);
  });
});

describe("doCodeRead(sqlsugar)", () => {
  it("模糊比對讀單檔", () => {
    const list = doCodeSearch("sqlsugar", "", 100, 0);
    const m = list.match(/([\w./-]+\.cs)/);
    expect(m).toBeTruthy();
    const out = doCodeRead("sqlsugar", m![1].split("/").pop()!);
    expect(out.length).toBeGreaterThan(0);
    expect(out).not.toMatch(/找不到/);
  });
});
