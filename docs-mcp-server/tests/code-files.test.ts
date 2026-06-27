import { beforeEach, describe, expect, it } from "vitest";
import { getCorpus, listCodeFiles, listMarkdownFiles, _clearCaches } from "../src/corpus.js";

beforeEach(() => _clearCaches());

describe("listCodeFiles(sqlsugar)", () => {
  it("掃到 examples/ 的源碼檔(.cs/.csproj/.sln),且不含 bin/obj", () => {
    const c = getCorpus("sqlsugar")!;
    const files = listCodeFiles(c);
    expect(files.length).toBeGreaterThan(0);
    expect(files.every((f) => /\.(cs|csproj|sln|json|ts|js)$/i.test(f.path))).toBe(true);
    expect(files.some((f) => /\/(bin|obj|\.vs)\//.test(f.path))).toBe(false);
  });
});

describe("listMarkdownFiles(sqlsugar) — examples/ 不含在 md 清單", () => {
  it("listMarkdownFiles 結果不含以 examples/ 開頭的路徑", () => {
    const c = getCorpus("sqlsugar")!;
    const files = listMarkdownFiles(c);
    expect(files.every((f) => !f.filename.startsWith("examples/"))).toBe(true);
  });
});
