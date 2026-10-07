import { beforeEach, describe, expect, it } from "vitest";
import { doListCorpora, doSearch, doSymbol, _clearCaches } from "../src/corpus.js";

beforeEach(() => _clearCaches());

describe("opnsense 語料", () => {
  it("docs_list_corpora 列出 opnsense-en、opnsense-zh-tw 並標示符號查", () => {
    for (const id of ["opnsense-en", "opnsense-zh-tw"]) {
      const out = doListCorpora({ onlyId: id });
      expect(out).toMatch(new RegExp(id));
      expect(out).toMatch(/符號查/);
    }
  });

  it("docs_symbol 查 WireGuard 定位到同名標題段落", () => {
    const out = doSymbol("opnsense-en", "WireGuard", 8);
    expect(out).toMatch(/^## Wireguard$/m);
    expect(out).toMatch(/154 Virtual Private Networking\.md/);
    expect(out).toMatch(/https:\/\/docs\.opnsense\.org\/[^"\s]+\.html(?!")/);
  });

  it("docs_symbol 查篇名定位到該篇", () => {
    const out = doSymbol("opnsense-en", "WireGuard Site-to-Site Setup", 8);
    expect(out).toMatch(/155 WireGuard Site-to-Site Setup\.md/);
    expect(out).toMatch(/wireguard-s2s\.html(?!")/);
  });

  it("docs_search 查 防火牆 規則 有命中且無導覽列與本機圖片", () => {
    const out = doSearch("opnsense-zh-tw", "防火牆 規則", 10, 1);
    expect(out).toMatch(/防火牆/);
    expect(out).not.toMatch(/⬆ 目錄/);
    expect(out).not.toMatch(/\.\.\/images\//);
  });
});
