import { describe, expect, it } from "vitest";
import { directiveNames, isIncluded, transformPage } from "../scripts/nginx-transform.js";

describe("isIncluded", () => {
  it("收英文文件與模組頁", () => {
    expect(isIncluded("085 [01.01.03 http] Module ngx_http_proxy_module.md")).toBe(true);
    expect(isIncluded("023 [01.01 docs] Beginner’s Guide.md")).toBe(true);
    expect(isIncluded("028 [01.01.01 dev] Development guide.md")).toBe(true);
    expect(isIncluded("033 [01.01.02 faq] Why nginx.md")).toBe(true);
  });
  it("排除俄文、CHANGES、新聞、目錄", () => {
    expect(isIncluded("180 [02 ru] page.md")).toBe(false);
    expect(isIncluded("234 [02.01.01 http] Module ngx_http_hls_module.md")).toBe(false);
    expect(isIncluded("001 [01 en] page.md")).toBe(false);
    expect(isIncluded("021 [01 en] nginx books.md")).toBe(false);
    expect(isIncluded("357 nginx news.md")).toBe(false);
    expect(isIncluded("000 目錄.md")).toBe(false);
  });
});

describe("directiveNames", () => {
  it("markdown 表格列", () => {
    expect(directiveNames("| Syntax: | ``**proxy_pass** `*URL*`;`` |")).toEqual(["proxy_pass"]);
    expect(directiveNames("| Syntax: | `**internal**;` |")).toEqual(["internal"]);
  });
  it("HTML 表格列", () => {
    expect(directiveNames("<tr><th>Syntax:</th><td><code><strong>autoindex</strong> <code>on</code> | <code>off</code>;</code></td></tr>")).toEqual(["autoindex"]);
  });
  it("多種寫法（<br>）的同名指令只算一次", () => {
    expect(directiveNames("| Syntax: | ``**try_files** `*file*` ...;``<br>``**try_files** `*file*` =`*code*`;`` |")).toEqual(["try_files"]);
  });
  it("抽不到時回空陣列", () => {
    expect(directiveNames("| Syntax: | weird |")).toEqual([]);
  });
});

const MD_PAGE = [
  "---",
  'title: "Module ngx_http_proxy_module"',
  'source: "https://nginx.org/en/docs/http/ngx_http_proxy_module.html"',
  "---",
  "",
  "[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：x](<084 x.md>)",
  "",
  "# Module ngx_http_proxy_module",
  "",
  "> 章節：[en](<000 目錄.md#c-1>) › [http](<000 目錄.md#c-5>)",
  "",
  "#### Directives",
  "",
  "|   |   |",
  "| --- | --- |",
  "| Syntax: | ``**proxy_pass** `*URL*`;`` |",
  "| Default: | — |",
  "",
  "Sets the protocol.",
].join("\r\n");

const HTML_PAGE = [
  "#### Directives",
  "",
  "<table>",
  "<tr><th>Syntax:</th><td><code><strong>autoindex</strong> <code>on</code>;</code></td></tr>",
  "</table>",
].join("\n");

describe("transformPage", () => {
  it("在 markdown 指令表前插入 ### 指令名", () => {
    const r = transformPage(MD_PAGE);
    expect(r.directives).toEqual(["proxy_pass"]);
    expect(r.content).toContain("### proxy_pass\n\n|   |   |\n| --- | --- |\n| Syntax: |");
  });
  it("在 HTML 指令表前插入 ### 指令名", () => {
    const r = transformPage(HTML_PAGE);
    expect(r.directives).toEqual(["autoindex"]);
    expect(r.content).toContain("### autoindex\n\n<table>\n<tr><th>Syntax:");
  });
  it("#### 小節升為 ##", () => {
    const r = transformPage(MD_PAGE);
    expect(r.content).toContain("\n## Directives\n");
    expect(r.content).not.toMatch(/^#### /m);
  });
  it("移除導覽列與章節麵包屑、保留 frontmatter", () => {
    const r = transformPage(MD_PAGE);
    expect(r.content).not.toContain("[⬆ 目錄]");
    expect(r.content).not.toContain("> 章節：");
    expect(r.content.startsWith("---\ntitle:")).toBe(true);
  });
  it("source 去引號、換行統一為 LF", () => {
    const r = transformPage(MD_PAGE);
    expect(r.content).toContain("\nsource: https://nginx.org/en/docs/http/ngx_http_proxy_module.html\n");
    expect(r.content).not.toContain("\r");
  });
  it("抽不到指令名的 Syntax 列回報行號", () => {
    const r = transformPage("|   |   |\n| --- | --- |\n| Syntax: | weird |");
    expect(r.unparsed).toEqual([3]);
    expect(r.directives).toEqual([]);
  });
});
