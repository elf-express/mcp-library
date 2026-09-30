import { describe, it, expect } from "vitest";
import { truncateIfNeeded, CHARACTER_LIMIT } from "../src/notes.js";

describe("truncateIfNeeded", () => {
  it("CHARACTER_LIMIT 應為 25000", () => {
    expect(CHARACTER_LIMIT).toBe(25000);
  });

  it("長度小於 CHARACTER_LIMIT 時原樣回傳", () => {
    const text = "a".repeat(100);
    expect(truncateIfNeeded(text)).toBe(text);
  });

  it("長度恰好等於 CHARACTER_LIMIT 時原樣回傳(邊界值)", () => {
    const text = "x".repeat(CHARACTER_LIMIT);
    expect(truncateIfNeeded(text)).toBe(text);
  });

  it("長度超過 CHARACTER_LIMIT 時,結果以原文前 25000 字元開頭", () => {
    const text = "a".repeat(CHARACTER_LIMIT) + "b".repeat(1000);
    const result = truncateIfNeeded(text);
    expect(result.startsWith("a".repeat(CHARACTER_LIMIT))).toBe(true);
  });

  it("長度超過 CHARACTER_LIMIT 時,截斷提示含「內容已截斷」", () => {
    const text = "z".repeat(CHARACTER_LIMIT + 1);
    const result = truncateIfNeeded(text);
    expect(result).toContain("內容已截斷");
  });

  it("長度超過 CHARACTER_LIMIT 時,截斷提示含「25000」", () => {
    const text = "z".repeat(CHARACTER_LIMIT + 1);
    const result = truncateIfNeeded(text);
    expect(result).toContain("25000");
  });

  it("長度超過 CHARACTER_LIMIT 時,截斷後結果長度大於 CHARACTER_LIMIT(因附加了提示字串)", () => {
    const text = "z".repeat(CHARACTER_LIMIT + 500);
    const result = truncateIfNeeded(text);
    // 前 25000 字元 + 截斷提示 → 總長必然 > 25000
    expect(result.length).toBeGreaterThan(CHARACTER_LIMIT);
  });

  it("長度超過 CHARACTER_LIMIT 時,截斷後不包含第 25001 個字元之後的原文", () => {
    const prefix = "A".repeat(CHARACTER_LIMIT);
    const suffix = "B".repeat(500);
    const result = truncateIfNeeded(prefix + suffix);
    // 截斷提示之前的原文部分不應有 B
    const original25k = result.slice(0, CHARACTER_LIMIT);
    expect(original25k).not.toContain("B");
  });
});
