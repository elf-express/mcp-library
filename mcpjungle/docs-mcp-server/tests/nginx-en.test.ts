import { beforeEach, describe, expect, it } from "vitest";
import { doListCorpora, doSearch, doSymbol, _clearCaches } from "../src/corpus.js";

beforeEach(() => _clearCaches());

describe("nginx-en 語料", () => {
  it("docs_list_corpora 列出 nginx-en 並標示符號查", () => {
    const out = doListCorpora({ onlyId: "nginx-en" });
    expect(out).toMatch(/nginx-en/);
    expect(out).toMatch(/符號查/);
  });

  it("docs_symbol 查 proxy_pass 定位到 ngx_http_proxy_module 的指令段落", () => {
    const out = doSymbol("nginx-en", "proxy_pass", 8);
    expect(out).toMatch(/Module ngx_http_proxy_module\.md/);
    expect(out).toMatch(/Syntax:/);
    expect(out).toMatch(/ngx_http_proxy_module\.html(?!")/);
  });

  it("docs_symbol 段落不吞進下一個指令", () => {
    const out = doSymbol("nginx-en", "proxy_allow_upstream", 8);
    expect(out).toMatch(/proxy_allow_upstream/);
    expect(out).not.toMatch(/### proxy_bind/);
  });

  it("docs_search 查 limit_req zone 有命中且無俄文頁", () => {
    const out = doSearch("nginx-en", "limit_req zone", 10, 1);
    expect(out).toMatch(/ngx_http_limit_req_module/);
    expect(out).not.toMatch(/\[02 ru\]/);
  });
});
