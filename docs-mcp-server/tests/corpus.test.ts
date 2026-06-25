/**
 * corpus.test.ts — 多語料行為測試
 *
 * 以 fs.mkdtempSync 建立一個臨時 corpora 根,內含兩個語料:
 *   alpha(cheatsheet:true)  — speedy.md(含速查表,Keyword×3)、plain.md(Keyword×1)、sub/nested.md
 *   beta (cheatsheet:false) — only.md(含 BetaOnly)
 * 透過 DOCS_CORPORA_DIR 指向它,驗證探索 / 隔離 / 跨語料 / capability gating / 相對路徑 / 來源連結。
 */

import { describe, it, expect, beforeAll, afterAll } from "vitest";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import {
  discoverCorpora,
  getCorpus,
  doSearch,
  doRead,
  doCheatsheet,
  doListCorpora,
  findNotes,
  listMarkdownFiles,
  extractSourceUrl,
  sourceLine,
  _clearCaches,
} from "../src/corpus.js";

const SPEEDY = `# Speedy

> Source: https://embedded.example/speedy-WRONG

Keyword 出現第一次。

## 速查表

| 方法 | 說明 |
| --- | --- |
| Go | 走 |

Keyword 再次出現。

## 其他章節

Keyword 第三次。這段尾巴不應出現在速查表結果中。
`;

const PLAIN = `# Plain

這裡只有一次 Keyword,沒有速查表段落。
`;

const NESTED = `# Nested

Nested 與 Keyword 同篇,位於子目錄。
`;

const ONLY = `# Only

Keyword 與 BetaOnly 都在這裡。
`;

// 只在內文寫來源(markdown 連結形式)、不放進 sources.json,用來驗證自動抽取。
const EMBED = `# Embed

> 📖 官方文件:[官方頁](https://embedded.example/embed)

這篇沒有那個關鍵字,僅測試來源自動抽取。
`;

let root: string;
const originalEnv = process.env.DOCS_CORPORA_DIR;

function write(rel: string, content: string) {
  const p = path.join(root, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content, "utf-8");
}

beforeAll(() => {
  root = fs.mkdtempSync(path.join(os.tmpdir(), "docs-corpora-"));

  // 語料 alpha(啟用 cheatsheet)
  write("alpha/corpus.json", JSON.stringify({
    title: "Alpha 書",
    description: "alpha 的一句描述",
    capabilities: { cheatsheet: true },
  }));
  write("alpha/sources.json", JSON.stringify({ "speedy.md": "https://example.com/speedy" }));
  write("alpha/speedy.md", SPEEDY);
  write("alpha/plain.md", PLAIN);
  write("alpha/sub/nested.md", NESTED);
  write("alpha/embed.md", EMBED);

  // 語料 beta(未啟用 cheatsheet,無 title 以驗證 fallback = id)
  write("beta/corpus.json", JSON.stringify({ capabilities: { cheatsheet: false } }));
  write("beta/only.md", ONLY);

  process.env.DOCS_CORPORA_DIR = root;
  _clearCaches();
});

afterAll(() => {
  if (originalEnv === undefined) delete process.env.DOCS_CORPORA_DIR;
  else process.env.DOCS_CORPORA_DIR = originalEnv;
  _clearCaches();
  try {
    fs.rmSync(root, { recursive: true, force: true });
  } catch {
    /* ignore */
  }
});

// ===========================================================================
// 探索
// ===========================================================================

describe("discoverCorpora / getCorpus", () => {
  it("找到兩個語料,依 id 排序(alpha 在 beta 之前)", () => {
    const ids = discoverCorpora().map((c) => c.id);
    expect(ids).toEqual(["alpha", "beta"]);
  });

  it("corpus.json 的 title/description/capabilities 生效", () => {
    const alpha = getCorpus("alpha")!;
    expect(alpha.title).toBe("Alpha 書");
    expect(alpha.description).toBe("alpha 的一句描述");
    expect(alpha.capabilities.cheatsheet).toBe(true);
  });

  it("缺 title → fallback 為 id;cheatsheet 預設關閉", () => {
    const beta = getCorpus("beta")!;
    expect(beta.title).toBe("beta");
    expect(beta.capabilities.cheatsheet).toBe(false);
  });

  it("getCorpus 不分大小寫;未知語料回 undefined", () => {
    expect(getCorpus("ALPHA")?.id).toBe("alpha");
    expect(getCorpus("nope")).toBeUndefined();
  });

  it("listMarkdownFiles 遞迴且 filename 為相對路徑", () => {
    const files = listMarkdownFiles(getCorpus("alpha")!).map((f) => f.filename);
    expect(files).toContain("speedy.md");
    expect(files).toContain("plain.md");
    expect(files).toContain("sub/nested.md");
    expect(files).toContain("embed.md");
    expect(files).toHaveLength(4);
  });
});

// ===========================================================================
// 隔離 / 跨語料搜尋
// ===========================================================================

describe("doSearch — 語料隔離與跨語料", () => {
  it("指定 corpus=alpha → 只命中 alpha 的檔,不含 beta 的 only.md", () => {
    const r = doSearch("alpha", "Keyword", 10, 0);
    expect(r).toContain("speedy.md");
    expect(r).toContain("plain.md");
    expect(r).toContain("nested.md");
    expect(r).not.toContain("only.md");
    expect(r).not.toContain("[beta]");
  });

  it("省略 corpus → 跨所有語料,含 [alpha] 與 [beta] 來源標註", () => {
    const r = doSearch(undefined, "Keyword", 50, 0);
    expect(r).toContain("[alpha]");
    expect(r).toContain("[beta]");
    expect(r).toContain("only.md");
    expect(r).toContain("speedy.md");
  });

  it("BetaOnly 只存在 beta:在 alpha 搜尋找不到,在 beta 找得到", () => {
    expect(doSearch("alpha", "BetaOnly", 10, 0)).toContain("找不到");
    expect(doSearch("beta", "BetaOnly", 10, 0)).toContain("only.md");
  });

  it("命中次數降冪:speedy(3)排在 plain(1)之前", () => {
    const r = doSearch("alpha", "Keyword", 10, 0);
    expect(r.indexOf("speedy.md")).toBeLessThan(r.indexOf("plain.md"));
  });

  it("未知語料 → 提示找不到語料並列出可用清單", () => {
    const r = doSearch("nope", "Keyword", 10, 0);
    expect(r).toContain('找不到語料 "nope"');
    expect(r).toContain("alpha");
    expect(r).toContain("beta");
  });

  it("空白 query → 錯誤訊息", () => {
    expect(doSearch("alpha", "   ", 10, 0)).toBe("錯誤:請提供至少一個關鍵字。");
  });
});

// ===========================================================================
// doRead
// ===========================================================================

describe("doRead — 讀取與來源連結", () => {
  it("讀 alpha/speedy → 含 [alpha] 標頭與 sources.json 的官方連結", () => {
    const r = doRead("alpha", "speedy");
    expect(r).toContain("# [alpha] speedy.md");
    expect(r).toContain("https://example.com/speedy"); // 標頭來源來自 sources.json
  });

  it("子目錄檔可用「檔名」或「相對路徑」讀到", () => {
    expect(doRead("alpha", "nested")).toContain("位於子目錄");
    expect(doRead("alpha", "sub/nested.md")).toContain("位於子目錄");
  });

  it("未知檔名 → 提示找不到;未知語料 → 提示語料", () => {
    expect(doRead("alpha", "xxoo不存在")).toContain("找不到符合");
    expect(doRead("nope", "speedy")).toContain('找不到語料 "nope"');
  });
});

// ===========================================================================
// 來源抽取 / 覆寫
// ===========================================================================

describe("sourceLine — 自動從內文抽取,sources.json 優先覆寫", () => {
  it("embed.md 不在 sources.json,來源自動從內文 markdown 連結抽取", () => {
    const r = doRead("alpha", "embed");
    expect(r).toContain("https://embedded.example/embed");
  });

  it("extractSourceUrl 支援兩種格式(裸 URL / markdown 連結),無來源回 undefined", () => {
    expect(extractSourceUrl("# t\n\n> Source: https://a.example/x\n")).toBe("https://a.example/x");
    expect(extractSourceUrl("# t\n\n> 📖 官方文件:[頁](https://b.example/y)\n")).toBe("https://b.example/y");
    expect(extractSourceUrl("# t\n\n一般內文,沒有來源行。\n")).toBeUndefined();
  });

  it("sourceLine:speedy.md 有 sources.json → 用它覆寫內文的來源(不取 WRONG)", () => {
    const line = sourceLine(getCorpus("alpha")!, "speedy.md");
    expect(line).toContain("https://example.com/speedy");
    expect(line).not.toContain("speedy-WRONG");
  });

  it("sourceLine:embed.md 不在 sources.json → 回退到內文抽取", () => {
    expect(sourceLine(getCorpus("alpha")!, "embed.md")).toContain("https://embedded.example/embed");
  });
});

// ===========================================================================
// doCheatsheet — capability gating
// ===========================================================================

describe("doCheatsheet — capability gating", () => {
  it("alpha 啟用 + speedy 有速查表 → 回速查表段落,且不含尾段", () => {
    const r = doCheatsheet("alpha", "speedy");
    expect(r).toContain("速查表");
    expect(r).toContain("Go");
    expect(r).not.toContain("這段尾巴不應出現在速查表結果中");
  });

  it("alpha 啟用 + plain 無速查表 → 提示沒有速查表段落", () => {
    expect(doCheatsheet("alpha", "plain")).toContain("沒有速查表段落");
  });

  it("beta 未啟用 cheatsheet → 提示未啟用,引導改用 docs_read", () => {
    const r = doCheatsheet("beta", "only");
    expect(r).toContain("未啟用速查表功能");
    expect(r).toContain("docs_read");
  });
});

// ===========================================================================
// doListCorpora
// ===========================================================================

describe("doListCorpora", () => {
  it("列出兩個語料、各自文件數,alpha 標出「速查表」能力", () => {
    const r = doListCorpora();
    expect(r).toContain("共 2 個");
    expect(r).toContain("alpha");
    expect(r).toContain("beta");
    expect(r).toContain("文件數:4");
    expect(r).toContain("文件數:1");
    expect(r).toContain("· 速查表"); // alpha 的能力標記
  });

  it("onlyId 過濾 → 只列該語料(供單書端點)", () => {
    const r = doListCorpora({ onlyId: "alpha" });
    expect(r).toContain("共 1 個");
    expect(r).toContain("alpha");
    expect(r).not.toContain("## beta");
  });

  it("filter 子字串過濾", () => {
    const r = doListCorpora({ filter: "beta" });
    expect(r).toContain("beta");
    expect(r).not.toContain("## alpha");
  });
});

// ===========================================================================
// findNotes
// ===========================================================================

describe("findNotes — 相對路徑比對", () => {
  it("精確相對路徑、純檔名、包含,三種命中", () => {
    const alpha = getCorpus("alpha")!;
    expect(findNotes(alpha, "sub/nested.md").map((f) => f.filename)).toEqual(["sub/nested.md"]);
    expect(findNotes(alpha, "nested").map((f) => f.filename)).toEqual(["sub/nested.md"]);
    expect(findNotes(alpha, "speedy").map((f) => f.filename)).toEqual(["speedy.md"]);
  });
});
