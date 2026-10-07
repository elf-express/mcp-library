import { describe, expect, it } from "vitest";
import { isIncluded, transformPage } from "../../books/opnsense/transform.js";

describe("isIncluded", () => {
  it("收編號篇", () => {
    expect(isIncluded("01 Welcome to OPNsense’s documentation!.md")).toBe(true);
    expect(isIncluded("155 WireGuard Site-to-Site Setup.md")).toBe(true);
  });
  it("排除 000 與非 md", () => {
    expect(isIncluded("000 目錄.md")).toBe(false);
    expect(isIncluded("000 全書 (docs.opnsense.org) en.md")).toBe(false);
    expect(isIncluded("README.md")).toBe(false);
    expect(isIncluded("01 x.txt")).toBe(false);
  });
});

const NAV = "[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：介紹](<02 介紹.md>)　｜　[下一篇：發布 ➡](<04 發布.md>)";

describe("transformPage", () => {
  it("移除頂端與結尾導覽列", () => {
    const { content } = transformPage(["# 安全", "", NAV, "", "內文", "", "---", "", NAV].join("\n"));
    expect(content).not.toMatch(/⬆ 目錄/);
    expect(content).toMatch(/內文/);
  });

  it("移除章節麵包屑", () => {
    const raw = ["# WireGuard", "", "> 章節：[VPN](<000 目錄.md#c-32>) › [Wireguard](<000 目錄.md#c-33>)", "", "## Introduction"].join("\n");
    const { content } = transformPage(raw);
    expect(content).not.toMatch(/章節：/);
    expect(content).not.toMatch(/000 目錄/);
    expect(content).toMatch(/## Introduction/);
  });

  it("source 去引號、其餘 frontmatter 保留", () => {
    const raw = [
      "---",
      'title: "安全"',
      'source: "https://docs.opnsense.org/security.html"',
      'lang: "zh-TW"',
      'translated_by: "google_v2"',
      "---",
    ].join("\n");
    const { content } = transformPage(raw);
    expect(content).toMatch(/^source: https:\/\/docs\.opnsense\.org\/security\.html$/m);
    expect(content).toMatch(/^title: "安全"$/m);
    expect(content).toMatch(/^lang: "zh-TW"$/m);
    expect(content).toMatch(/^translated_by: "google_v2"$/m);
  });

  it("包外層連結的圖轉純連結（含引用區塊內）", () => {
    const { content, leftovers } = transformPage(
      "> [![../_images/a.png](<../images/bc1-a.png>)](https://docs.opnsense.org/_images/a.png)",
    );
    expect(content).toBe("> [圖：../_images/a.png](https://docs.opnsense.org/_images/a.png)");
    expect(leftovers).toEqual([]);
  });

  it("行中裸圖換成 alt 文字", () => {
    const { content } = transformPage("Now press ![apply](<../images/ca819e9a-applybtn.png>) to activate");
    expect(content).toBe("Now press apply to activate");
  });

  it("alt 為路徑的裸圖移除", () => {
    const { content } = transformPage("![_images/docs-deciso-header.jpg](<../images/fe1e0149-docs-deciso-header.jpg>)");
    expect(content).toBe("");
  });

  it("空 alt", () => {
    expect(transformPage("![](<../images/x.png>)").content).toBe("");
    expect(transformPage("[![](<../images/x.png>)](https://u/x.png)").content).toBe("[圖](https://u/x.png)");
  });

  it("一行多張圖", () => {
    const { content, leftovers } = transformPage(
      "a [![../_images/a.png](<../images/1-a.png>)](https://u/a.png) b ![ok](<../images/2-ok.png>) c",
    );
    expect(content).toBe("a [圖：../_images/a.png](https://u/a.png) b ok c");
    expect(leftovers).toEqual([]);
  });

  it("篇間連結保留", () => {
    const { content } = transformPage("見 [防火牆](<52 防火牆.md>)");
    expect(content).toBe("見 [防火牆](<52 防火牆.md>)");
  });

  it("CRLF 統一為 LF", () => {
    expect(transformPage("a\r\n" + NAV + "\r\nb").content).toBe("a\nb");
  });

  it("殘留 ../images/ 回報行號", () => {
    const { leftovers } = transformPage("a\nb\nsee ../images/x.png");
    expect(leftovers).toEqual([3]);
  });
});
