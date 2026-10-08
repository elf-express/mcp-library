import { beforeEach, describe, expect, it } from "vitest";
import { doListCorpora, doOutline, doSearch, doSymbol, _clearCaches } from "../src/corpus.js";

beforeEach(() => _clearCaches());

describe("stalwart-en 語料", () => {
  it("docs_list_corpora 列出 stalwart-en 並標示符號查", () => {
    const out = doListCorpora({ onlyId: "stalwart-en" });
    expect(out).toMatch(/stalwart-en/);
    expect(out).toMatch(/符號查/);
  });

  it("docs_symbol 查 Account 定位到 Schema reference 物件頁與官方網址", () => {
    const out = doSymbol("stalwart-en", "Account", 8);
    expect(out).toMatch(/19 Schema reference\/004 Account\.md/);
    expect(out).toMatch(/https:\/\/stalw\.art\/docs\/ref\/object\/account\/(?!")/);
  });

  it("docs_search 查 DKIM signing 命中 MTA 設定,且無 MDX 殘留", () => {
    const out = doSearch("stalwart-en", "DKIM signing", 10, 1);
    expect(out).toMatch(/09 MTA settings/);
    expect(out).not.toMatch(/<LinkCard|<TabItem|<svg/);
  });

  it("docs_outline 依官網側欄分成 19 個分類", () => {
    const out = doOutline("stalwart-en", undefined, false);
    expect(out).toMatch(/01 Getting started/);
    expect(out).toMatch(/19 Schema reference/);
  });
});
