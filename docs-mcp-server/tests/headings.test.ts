import { describe, expect, it } from "vitest";
import { extractHeadings, sliceSection, extractCheatsheet } from "../src/corpus.js";

describe("extractHeadings", () => {
  it("回傳空陣列當無 ##/### 標題", () => {
    expect(extractHeadings("# 只有一級\n內文\n普通行")).toEqual([]);
  });
  it("抽出 ## 與 ### 的文字/層級/行號", () => {
    const md = "# T\n\n## 表单 API\n內文\n### onSubmit\n更多";
    expect(extractHeadings(md)).toEqual([
      { text: "表单 API", level: 2, lineStart: 2 },
      { text: "onSubmit", level: 3, lineStart: 4 },
    ]);
  });
  it("不抽 #、####", () => {
    expect(extractHeadings("# a\n#### b\n## c")).toEqual([
      { text: "c", level: 2, lineStart: 2 },
    ]);
  });
});

describe("sliceSection", () => {
  it("切到下一個同級標題", () => {
    const lines = ["## A", "a1", "a2", "## B", "b1"];
    expect(sliceSection(lines, 0)).toBe("## A\na1\na2");
  });
  it("子標題(更深)留在段內,遇更高級才停", () => {
    const lines = ["## A", "### A1", "x", "# Top", "y"];
    expect(sliceSection(lines, 0)).toBe("## A\n### A1\nx");
  });
});

describe("extractCheatsheet 行為不變", () => {
  it("抽出含『速查』的標題段落", () => {
    const md = "# 文件\n\n## 速查表\n- a\n- b\n\n## 其他\nx";
    expect(extractCheatsheet(md)).toBe("## 速查表\n- a\n- b");
  });
  it("無速查段落回 null", () => {
    expect(extractCheatsheet("# 文件\n## 介紹\nx")).toBeNull();
  });
});
