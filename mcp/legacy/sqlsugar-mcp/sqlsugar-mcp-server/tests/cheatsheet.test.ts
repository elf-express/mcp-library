import { describe, it, expect } from "vitest";
import { extractCheatsheet } from "../src/notes.js";

describe("extractCheatsheet", () => {
  it("找不到速查標題時回傳 null", () => {
    const content = "# 介紹\n\n一些內容\n\n## 使用方式\n\n更多內容";
    expect(extractCheatsheet(content)).toBeNull();
  });

  it("找到速查標題,回傳從該行起到下一個同級標題前的內容", () => {
    const content = [
      "# 主標題",
      "",
      "## 速查表",
      "",
      "| 語法 | 說明 |",
      "| ---- | ---- |",
      "| A    | B    |",
      "",
      "## 下一節",
      "",
      "其他內容",
    ].join("\n");
    const result = extractCheatsheet(content);
    expect(result).not.toBeNull();
    expect(result).toContain("## 速查表");
    expect(result).toContain("| A    | B    |");
    expect(result).not.toContain("## 下一節");
  });

  it("速查段落在檔尾(沒有後續標題)時取到檔尾", () => {
    const content = [
      "# 主標題",
      "",
      "一些前言",
      "",
      "## 速查表",
      "",
      "速查內容行一",
      "速查內容行二",
    ].join("\n");
    const result = extractCheatsheet(content);
    expect(result).not.toBeNull();
    expect(result).toContain("速查內容行一");
    expect(result).toContain("速查內容行二");
  });

  it("子標題(更深層級)不截斷段落", () => {
    const content = [
      "## 速查表",
      "",
      "### 子分類一",
      "",
      "內容一",
      "",
      "### 子分類二",
      "",
      "內容二",
      "",
      "## 其他章節",
      "",
      "不應包含",
    ].join("\n");
    const result = extractCheatsheet(content);
    expect(result).not.toBeNull();
    expect(result).toContain("### 子分類一");
    expect(result).toContain("### 子分類二");
    expect(result).toContain("內容一");
    expect(result).toContain("內容二");
    expect(result).not.toContain("## 其他章節");
    expect(result).not.toContain("不應包含");
  });

  it("更高層級標題會截斷段落", () => {
    const content = [
      "## 速查表",
      "",
      "速查內容",
      "",
      "# 頂層標題",
      "",
      "不應包含",
    ].join("\n");
    const result = extractCheatsheet(content);
    expect(result).not.toBeNull();
    expect(result).toContain("速查內容");
    expect(result).not.toContain("# 頂層標題");
    expect(result).not.toContain("不應包含");
  });

  it("回傳結果已 trim", () => {
    const content = "## 速查表\n\n   \n內容\n\n";
    const result = extractCheatsheet(content);
    expect(result).not.toBeNull();
    expect(result).toBe(result!.trim());
  });
});
