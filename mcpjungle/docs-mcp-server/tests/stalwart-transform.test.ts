import { describe, expect, it } from "vitest";
import { isIncluded, planCorpus, slugOf, sourceUrl, splitFrontMatter, transformBody } from "../../books/stalwart/transform.js";

describe("isIncluded", () => {
  it("收 md / mdx,排除 `_` 開頭的片段與非文件", () => {
    expect(isIncluded("auth/backend/ldap.md")).toBe(true);
    expect(isIncluded("server/index.mdx")).toBe(true);
    expect(isIncluded("install/platform/_next-steps.md")).toBe(false);
    expect(isIncluded("auth/_meta.yml")).toBe(false);
    expect(isIncluded("management/cli/example-bulk-plan.ndjson")).toBe(false);
  });
});

describe("slugOf / sourceUrl", () => {
  it("index 取目錄、底線轉連字號", () => {
    expect(slugOf("auth/authentication/index.md")).toBe("auth/authentication");
    expect(slugOf("spamfilter/settings/domain_lists.md")).toBe("spamfilter/settings/domain-lists");
    expect(sourceUrl("ref/object/account.md")).toBe("https://stalw.art/docs/ref/object/account/");
    expect(sourceUrl("faq.md")).toBe("https://stalw.art/docs/faq/");
  });
});

describe("splitFrontMatter", () => {
  it("解析帶引號與不帶引號的值", () => {
    const { data, body } = splitFrontMatter('---\r\ntitle: "Over \\"view\\""\r\ndescription: Plain text\r\nsidebar_position: 2\r\n---\r\n\r\nBody');
    expect(data).toEqual({ title: 'Over "view"', description: "Plain text", sidebar_position: "2" });
    expect(body.trim()).toBe("Body");
  });
});

describe("transformBody", () => {
  it("MDX 元件轉成 markdown,程式碼區塊內不動", () => {
    const body = [
      "import { Tabs, TabItem } from '@astrojs/starlight/components';",
      "",
      "<CardGrid>",
      '<LinkCard title="Auto Ban" href="./auto-ban/" />',
      "</CardGrid>",
      '<Tabs syncKey="source">',
      '<TabItem label="Older Stalwart">',
      "Text",
      "</TabItem>",
      "</Tabs>",
      '<video src="/img/setup.mp4" autoplay  ></video>',
      "```ts",
      'import { plan } from "./plan";',
      "<Tabs>",
      "```",
    ].join("\n");
    const r = transformBody(body, "server/index.mdx");
    expect(r.leftovers).toEqual([]);
    expect(r.content).toBe(
      ["- [Auto Ban](https://stalw.art/docs/server/auto-ban/)", "#### Older Stalwart", "Text", "```ts", 'import { plan } from "./plan";', "<Tabs>", "```", ""].join("\n"),
    );
  });

  it("移除 svg 圖示、<code> 轉反引號、站內連結轉絕對網址", () => {
    const line = 'under <svg class="x"><rect /></svg> Management › Groups<svg><path d="M1" /></svg> Directory, see [Domain](/docs/ref/object/domain) and <code>Id&lt;</code>';
    const r = transformBody(line, "ref/object/account.md");
    expect(r.content.trim()).toBe(
      "under Management › Groups Directory, see [Domain](https://stalw.art/docs/ref/object/domain) and `Id<`",
    );
  });

  it("相對連結:index 頁以目錄為基準,一般頁以上層為基準", () => {
    expect(transformBody("[CalDAV](caldav)", "migration/import-export/import/index.md").content.trim()).toBe(
      "[CalDAV](https://stalw.art/docs/migration/import-export/import/caldav)",
    );
    expect(transformBody("[WebDAV](webdav)", "migration/import-export/import/carddav.md").content.trim()).toBe(
      "[WebDAV](https://stalw.art/docs/migration/import-export/import/webdav)",
    );
  });

  it("無法轉換的元件列入 leftovers", () => {
    expect(transformBody("text\n<LinkCard title='x' />", "a.md").leftovers).toEqual([2]);
  });
});

describe("planCorpus", () => {
  const fm = (title: string, pos?: number) => `---\ntitle: "${title}"\n${pos !== undefined ? `sidebar_position: ${pos}\n` : ""}---\n\nBody of ${title}\n`;
  const files = [
    { rel: "faq.md", raw: fm("FAQ") },
    { rel: "auth/index.md", raw: fm("Overview") },
    { rel: "auth/backend/index.md", raw: fm("Overview") },
    { rel: "auth/backend/sql.md", raw: fm("SQL", 2) },
    { rel: "auth/backend/ldap.md", raw: fm("LDAP", 1) },
    { rel: "install/index.md", raw: fm("Welcome") },
    { rel: "install/_partial.md", raw: "no front matter" },
  ];
  const metas = { auth: { label: "Access Control", order: 6 }, "auth/backend": { label: "Backends", order: 1 }, install: { label: "Getting started", order: 1 } };

  it("依 order 排分類、攤平子目錄、重複標題加上層 label", () => {
    const { pages, errors } = planCorpus(files, metas);
    expect(errors).toEqual([]);
    expect(pages.map((p) => p.out)).toEqual([
      "01 Getting started/001 Welcome.md",
      "02 Access Control/001 Access Control - Overview.md",
      "02 Access Control/002 Backends - Overview.md",
      "02 Access Control/003 LDAP.md",
      "02 Access Control/004 SQL.md",
      "001 FAQ.md",
    ]);
  });

  it("每篇有 front matter 來源、# 標題與章節路徑", () => {
    const ldap = planCorpus(files, metas).pages.find((p) => p.out.endsWith("LDAP.md"))!;
    expect(ldap.content).toBe(
      ['---', 'title: "LDAP"', "source: https://stalw.art/docs/auth/backend/ldap/", "---", "", "# LDAP", "", "> Section: Access Control › Backends", "", "Body of LDAP", ""].join("\n"),
    );
  });

  it("缺 title 回報錯誤", () => {
    expect(planCorpus([{ rel: "a.md", raw: "---\nsidebar_position: 1\n---\nx" }], {}).errors).toEqual(["a.md:front matter 沒有 title"]);
  });
});
