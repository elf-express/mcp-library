# docs-mcp 領域工具 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在 docs-mcp-server 加 4 個 capability-gated 領域工具(`docs_outline` / `docs_code_search` / `docs_code_read` / `docs_symbol`),讓 fc/sqlsugar 領域 AI 真能用;工具數 4→8 但不隨語料膨脹。

**Architecture:** Node MCP server。純邏輯加在 `src/corpus.ts`(可單元測試的純函式),工具薄殼加在 `src/index.ts`(zod schema + 一行 handler),資料與能力宣告加在 `corpora/`。沿用既有 `docs_cheatsheet` 的 capability-gated 模式。不碰 `http.ts`、gateway、legacy server。

**Tech Stack:** TypeScript 5.7、Node ≥18、@modelcontextprotocol/sdk ^1.12、zod ^3、vitest ^4、tsx。

## Global Constraints

- 只動 `docs-mcp-server/src/{corpus.ts,index.ts}` 與 `docs-mcp-server/corpora/`;**不碰** `http.ts`、gateway、legacy server。
- capability-gated:工具對所有語料註冊,未啟用語料回友善提示(沿用 `doCheatsheet` 風格的字串)。
- 所有工具輸出走 `truncateIfNeeded`(25000 字元上限)。
- 新增快取一律 **mtime 失效**(比照 `contentCache` / `sourcesCache`);新快取也要在 `_clearCaches()` 裡清。
- 2 空格縮排、ESM(相對 import 帶 `.js`)、zod schema `.strict()`、工具帶 `READ_ONLY` annotations、`textResult()` 包裝輸出。
- TDD:每個純函式先寫失敗測試。測試用 vitest(`npm test`,即 `vitest run`),放 `tests/`。
- Conventional Commits(`feat:` / `test:` / `refactor:` / `chore:`)。
- 工具最終 8 個:現有 4(list_corpora/search/read/cheatsheet)+ outline + code_search + code_read + symbol。
- 命令一律在 `docs-mcp-server/` 目錄下執行。

---

### Task 1: capability 型別 + 共用標題解析(`extractHeadings` / `sliceSection`)

**Files:**
- Modify: `docs-mcp-server/src/corpus.ts`(擴 `CorpusCapabilities`;新增 `Heading`/`extractHeadings`/`sliceSection`;`extractCheatsheet` 改用 `sliceSection`)
- Test: `docs-mcp-server/tests/headings.test.ts`

**Interfaces:**
- Produces:
  - `interface CorpusCapabilities { cheatsheet?: boolean; examples?: boolean; symbol?: boolean }`
  - `interface Heading { text: string; level: number; lineStart: number }`
  - `extractHeadings(content: string): Heading[]` — 掃 `^#{2,3}\s+`,回標題文字/層級/行號
  - `sliceSection(lines: string[], startIdx: number): string` — 從 `lines[startIdx]` 標題切到下一個同級或更高級標題,trim
- Consumes: 既有 `extractCheatsheet`(改寫,行為不變)

- [ ] **Step 1: 寫失敗測試**

`docs-mcp-server/tests/headings.test.ts`:
```ts
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
```

- [ ] **Step 2: 跑測試確認失敗**

Run: `npm test -- headings`
Expected: FAIL（`extractHeadings`/`sliceSection` 尚未匯出）。

- [ ] **Step 3: 實作**

在 `src/corpus.ts` 把 `CorpusCapabilities` 改成:
```ts
export interface CorpusCapabilities {
  /** 是否啟用「速查表」抽取(文件需有 `## 速查表` 段落) */
  cheatsheet?: boolean;
  /** 啟用 docs_code_search / docs_code_read,讀 corpora/<id>/examples/ */
  examples?: boolean;
  /** 啟用 docs_symbol,從 md 的 ##/### 標題建符號索引 */
  symbol?: boolean;
}
```

在「工具邏輯」區塊上方新增:
```ts
export interface Heading {
  text: string;
  level: number;
  lineStart: number;
}

/** 掃 md 的 ## / ### 標題,回標題文字、層級(2 或 3)、行號 */
export function extractHeadings(content: string): Heading[] {
  const lines = content.split(/\r?\n/);
  const out: Heading[] = [];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^(#{2,3})\s+(.+?)\s*$/);
    if (m) out.push({ text: m[2].trim(), level: m[1].length, lineStart: i });
  }
  return out;
}

/** 從 lines[startIdx] 的標題切到下一個「同級或更高級」標題(不含),trim 後回傳 */
export function sliceSection(lines: string[], startIdx: number): string {
  const startLevel = (lines[startIdx].match(/^#+/) ?? ["#"])[0].length;
  let end = lines.length;
  for (let i = startIdx + 1; i < lines.length; i++) {
    const m = lines[i].match(/^(#{1,6})\s+/);
    if (m && m[1].length <= startLevel) {
      end = i;
      break;
    }
  }
  return lines.slice(startIdx, end).join("\n").trim();
}
```

把既有 `extractCheatsheet` 改寫成複用 `sliceSection`(行為不變):
```ts
export function extractCheatsheet(content: string): string | null {
  const lines = content.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    if (/^#{1,6}\s+.*速查/.test(lines[i])) return sliceSection(lines, i);
  }
  return null;
}
```

- [ ] **Step 4: 跑測試確認通過**

Run: `npm test -- headings` 然後 `npm test`
Expected: headings.test.ts 全 PASS;既有 `corpus.test.ts` 仍全 PASS(extractCheatsheet 行為不變)。

- [ ] **Step 5: Commit**

```bash
git add docs-mcp-server/src/corpus.ts docs-mcp-server/tests/headings.test.ts
git commit -m "feat(docs-mcp): add extractHeadings/sliceSection + examples/symbol capabilities"
```

---

### Task 2: `docs_outline`(結構大綱)

**Files:**
- Modify: `docs-mcp-server/src/corpus.ts`(新增 `doOutline`)
- Modify: `docs-mcp-server/src/index.ts`(註冊 `docs_outline`)
- Test: `docs-mcp-server/tests/outline.test.ts`

**Interfaces:**
- Consumes(Task 1):`extractHeadings`;既有 `discoverCorpora`/`getCorpus`/`listMarkdownFiles`/`corpusIdList`/`truncateIfNeeded`
- Produces:`doOutline(corpusId: string | undefined, path: string | undefined, headings: boolean): string`

- [ ] **Step 1: 寫失敗測試**

`docs-mcp-server/tests/outline.test.ts`:
```ts
import { beforeEach, describe, expect, it } from "vitest";
import { doOutline, _clearCaches } from "../src/corpus.js";

beforeEach(() => _clearCaches());

describe("doOutline", () => {
  it("無 corpus 時提示先選書", () => {
    const out = doOutline(undefined, undefined, false);
    expect(out).toMatch(/docs_list_corpora/);
  });
  it("列出 fc 的分類與篇名(預設不展開標題)", () => {
    const out = doOutline("fc", undefined, false);
    expect(out).toMatch(/開發文檔/);
    expect(out).toMatch(/11表单 API/);
    expect(out).not.toMatch(/^### /m); // headings=false 不展開篇內標題
  });
  it("path 過濾只剩該分類", () => {
    const out = doOutline("fc", "二次開發", false);
    expect(out).toMatch(/二次開發/);
    expect(out).not.toMatch(/開發文檔/);
  });
  it("找不到 corpus 時回提示", () => {
    expect(doOutline("nope", undefined, false)).toMatch(/找不到語料/);
  });
});
```

- [ ] **Step 2: 跑測試確認失敗**

Run: `npm test -- outline`
Expected: FAIL（`doOutline` 未定義）。

- [ ] **Step 3: 實作 `doOutline`**(加在 `src/corpus.ts` 工具邏輯區)

```ts
/**
 * 結構大綱:列某語料的分類目錄 + 篇名(headings=true 才展開篇內 ##/### 標題)。
 * path 給定 → 只展開該頂層分類。corpusId 省略 → 提示先用 docs_list_corpora。
 */
export function doOutline(corpusId: string | undefined, path: string | undefined, headings: boolean): string {
  if (!corpusId || !corpusId.trim()) {
    return `請指定 corpus(用 docs_list_corpora 查看可用語料:${corpusIdList()}),或改用單書端點 /mcp/<corpus>。`;
  }
  const c = getCorpus(corpusId);
  if (!c) return `找不到語料 "${corpusId}"。可用語料:${corpusIdList()}。`;

  const files = listMarkdownFiles(c);
  // 依頂層目錄分組(無子目錄者歸 "(根)")
  const groups = new Map<string, typeof files>();
  for (const f of files) {
    const top = f.filename.includes("/") ? f.filename.split("/")[0] : "(根)";
    if (!groups.has(top)) groups.set(top, []);
    groups.get(top)!.push(f);
  }

  const wantPath = path?.trim();
  if (wantPath && !groups.has(wantPath)) {
    return `語料 "${corpusId}" 沒有分類 "${wantPath}"。可用分類:${[...groups.keys()].join(", ")}。`;
  }

  const out: string[] = [`# ${c.id} 結構大綱(${files.length} 篇 · ${groups.size} 類)`, ""];
  for (const [top, fs] of groups) {
    if (wantPath && top !== wantPath) continue;
    out.push(`## ${top} (${fs.length} 篇)`);
    for (const f of fs) {
      const name = f.filename.includes("/") ? f.filename.split("/").slice(1).join("/") : f.filename;
      const display = name.replace(/\.md$/i, "");
      if (headings) {
        out.push(`- ${display}`);
        for (const h of extractHeadings(readNoteContent(f))) {
          out.push(`  ${"  ".repeat(h.level - 2)}- ${h.text}`);
        }
      } else {
        out.push(`- ${display}`);
      }
    }
    out.push("");
  }
  if (!headings) {
    out.push(`> 要展開篇內標題:docs_outline(corpus="${c.id}", path="<分類>", headings=true)`);
  }
  return truncateIfNeeded(out.join("\n"));
}
```

- [ ] **Step 4: 跑測試確認通過**

Run: `npm test -- outline`
Expected: PASS（4 passed）。

- [ ] **Step 5: 註冊 `docs_outline` 工具**(`src/index.ts`)

在 import 區把 `doOutline` 加進從 `./corpus.js` 的具名匯入。新增 schema(放在其他 schema 旁):
```ts
const OutlineInputSchema = z
  .object({
    corpus: z.string().max(100).optional()
      .describe("語料 id(用 docs_list_corpora 取得)。單書端點 /mcp/<corpus> 或 DOCS_SCOPE 下可省略。"),
    path: z.string().max(200).optional()
      .describe("只展開某個頂層分類(如 \"開發文檔\")。省略則列全部分類。"),
    headings: z.boolean().default(false)
      .describe("true 才展開每篇的 ##/### 標題(會讀全部檔案、較重)。預設 false。"),
  })
  .strict();
```
在 `createServer` 內、其他 `registerTool` 之後新增:
```ts
server.registerTool(
  "docs_outline",
  {
    title: "語料結構大綱",
    description:
      "列出某個語料的內部目錄(分類資料夾 + 每篇檔名,可選展開篇內 ##/### 標題)。\n\n" +
      "用途:當你還不知道某本「書」裡有什麼時的入口——比 docs_search(要先有關鍵字)、docs_read(要先知檔名)更早一步。\n\n" +
      "參數:\n" +
      "  - corpus (string):語料 id。\n" +
      "  - path (string,選填):只展開某個分類。\n" +
      "  - headings (boolean,選填):true 展開篇內標題,預設 false。" +
      scopeNote,
    inputSchema: OutlineInputSchema.shape,
    annotations: READ_ONLY,
  },
  async (p) => textResult(doOutline(scope ?? p.corpus, p.path, p.headings))
);
```

- [ ] **Step 6: build + 全測 + Commit**

Run: `npm run build && npm test`
Expected: tsc 無錯;全測 PASS。
```bash
git add docs-mcp-server/src/corpus.ts docs-mcp-server/src/index.ts docs-mcp-server/tests/outline.test.ts
git commit -m "feat(docs-mcp): add docs_outline tool"
```

---

### Task 3: 搬入範例碼 + `examples` 能力的檔案層(`resolveExamplesDir` / `listCodeFiles`)

**Files:**
- Create: `docs-mcp-server/corpora/sqlsugar/examples/`（從 legacy 複製源碼)
- Modify: `docs-mcp-server/corpora/sqlsugar/corpus.json`（加 `examples: true`)
- Modify: `docs-mcp-server/src/corpus.ts`（`resolveExamplesDir`/`listCodeFiles`/`readCodeFileContent`)
- Test: `docs-mcp-server/tests/code-files.test.ts`

**Interfaces:**
- Produces:
  - `interface CodeFile { path: string; fullPath: string }`
  - `resolveExamplesDir(corpus: Corpus): string` — `<corpus.dir>/examples`
  - `listCodeFiles(corpus: Corpus): CodeFile[]` — 遞迴掃 examples/,副檔名白名單,跳 bin/obj/.vs
  - `readCodeFileContent(file: CodeFile): string`
- Consumes:既有 `Corpus`、`contentCache` 慣例、`SKIP_DIRS`

- [ ] **Step 1: 複製源碼(排除建置產物)**

先看來源結構,只複製源碼,排除 `bin`/`obj`/`.vs`:
```bash
ls sqlsugar-mcp/sqlsugar-mcp-server/examples
mkdir -p docs-mcp-server/corpora/sqlsugar/examples
# 用 rsync 排除建置產物(無 rsync 則 cp 後刪 bin/obj/.vs)
rsync -a --exclude bin --exclude obj --exclude .vs \
  sqlsugar-mcp/sqlsugar-mcp-server/examples/ docs-mcp-server/corpora/sqlsugar/examples/
```
> 用「複製」非「移動」:legacy `sqlsugar-mcp-server` 仍要能獨立運作(spec §10),不可動它的 `examples/`。

- [ ] **Step 2: corpus.json 加 examples 能力**

`docs-mcp-server/corpora/sqlsugar/corpus.json` 改為:
```json
{
  "title": "SqlSugar ORM",
  "description": "SqlSugar .NET ORM 用法筆記:查詢/更新/交易/多租戶/導航/分頁/效能等,多附官方來源與「速查表」段落;另含 C# 範例專案(examples)。",
  "capabilities": { "cheatsheet": true, "examples": true }
}
```

- [ ] **Step 3: 寫失敗測試**

`docs-mcp-server/tests/code-files.test.ts`:
```ts
import { beforeEach, describe, expect, it } from "vitest";
import { getCorpus, listCodeFiles, _clearCaches } from "../src/corpus.js";

beforeEach(() => _clearCaches());

describe("listCodeFiles(sqlsugar)", () => {
  it("掃到 examples/ 的源碼檔(.cs/.csproj/.sln),且不含 bin/obj", () => {
    const c = getCorpus("sqlsugar")!;
    const files = listCodeFiles(c);
    expect(files.length).toBeGreaterThan(0);
    expect(files.every((f) => /\.(cs|csproj|sln|json|ts|js)$/i.test(f.path))).toBe(true);
    expect(files.some((f) => /\/(bin|obj|\.vs)\//.test(f.path))).toBe(false);
  });
});
```

- [ ] **Step 4: 跑測試確認失敗**

Run: `npm test -- code-files`
Expected: FAIL（`listCodeFiles` 未定義）。

- [ ] **Step 5: 實作檔案層**(`src/corpus.ts`)

```ts
export interface CodeFile {
  path: string;      // 相對 examples/ 的路徑
  fullPath: string;
}

const CODE_EXT = new Set([".cs", ".csproj", ".sln", ".json", ".ts", ".js"]);
const CODE_SKIP_DIRS = new Set([...SKIP_DIRS, "bin", "obj", ".vs"]);

export function resolveExamplesDir(corpus: Corpus): string {
  return path.join(corpus.dir, "examples");
}

/** 遞迴掃 examples/ 下白名單副檔名的源碼檔(跳 bin/obj/.vs)。 */
export function listCodeFiles(corpus: Corpus): CodeFile[] {
  const root = resolveExamplesDir(corpus);
  const out: CodeFile[] = [];
  const walk = (dir: string, rel: string) => {
    let entries: fs.Dirent[];
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries) {
      if (e.isDirectory()) {
        if (CODE_SKIP_DIRS.has(e.name)) continue;
        walk(path.join(dir, e.name), rel ? rel + "/" + e.name : e.name);
      } else if (CODE_EXT.has(path.extname(e.name).toLowerCase())) {
        const r = rel ? rel + "/" + e.name : e.name;
        out.push({ path: r, fullPath: path.join(dir, e.name) });
      }
    }
  };
  walk(root, "");
  return out.sort((a, b) => a.path.localeCompare(b.path));
}

export function readCodeFileContent(file: CodeFile): string {
  let mtimeMs = 0;
  try {
    mtimeMs = fs.statSync(file.fullPath).mtimeMs;
  } catch {
    return "";
  }
  const cached = contentCache.get(file.fullPath);
  if (cached && cached.mtimeMs === mtimeMs) return cached.content;
  let content = fs.readFileSync(file.fullPath, "utf-8");
  if (content.charCodeAt(0) === 0xfeff) content = content.slice(1);
  contentCache.set(file.fullPath, { content, mtimeMs });
  return content;
}
```

- [ ] **Step 6: 跑測試確認通過 + Commit**

Run: `npm test -- code-files`
Expected: PASS。
```bash
git add docs-mcp-server/corpora/sqlsugar/examples docs-mcp-server/corpora/sqlsugar/corpus.json docs-mcp-server/src/corpus.ts docs-mcp-server/tests/code-files.test.ts
git commit -m "feat(docs-mcp): vendor sqlsugar code examples + listCodeFiles layer"
```

---

### Task 4: `docs_code_search` + `docs_code_read`(capability `examples`)

**Files:**
- Modify: `docs-mcp-server/src/corpus.ts`（`doCodeSearch`/`doCodeRead`)
- Modify: `docs-mcp-server/src/index.ts`（註冊兩個工具)
- Test: `docs-mcp-server/tests/code-tools.test.ts`

**Interfaces:**
- Consumes(Task 3):`listCodeFiles`/`readCodeFileContent`/`resolveExamplesDir`;既有 `getCorpus`/`corpusIdList`/`truncateIfNeeded`
- Produces:
  - `doCodeSearch(corpusId: string | undefined, query: string, limit: number, ctx: number): string`（query 空 = 列檔)
  - `doCodeRead(corpusId: string | undefined, p: string): string`
- 共用 gating helper:`requireExamples(corpusId) → Corpus | string`(回字串代表錯誤訊息)

- [ ] **Step 1: 寫失敗測試**

`docs-mcp-server/tests/code-tools.test.ts`:
```ts
import { beforeEach, describe, expect, it } from "vitest";
import { doCodeSearch, doCodeRead, _clearCaches } from "../src/corpus.js";

beforeEach(() => _clearCaches());

describe("docs_code_* gating", () => {
  it("未開 examples 的語料(fc)回友善提示", () => {
    expect(doCodeSearch("fc", "", 10, 2)).toMatch(/無代碼範例|未啟用/);
    expect(doCodeRead("fc", "Program.cs")).toMatch(/無代碼範例|未啟用/);
  });
});

describe("doCodeSearch(sqlsugar)", () => {
  it("空 query 列出範例檔清單", () => {
    const out = doCodeSearch("sqlsugar", "", 50, 2);
    expect(out).toMatch(/\.cs/);
  });
  it("有 query 回命中片段(含行號)", () => {
    const out = doCodeSearch("sqlsugar", "class", 10, 1);
    expect(out).toMatch(/class/);
  });
});

describe("doCodeRead(sqlsugar)", () => {
  it("模糊比對讀單檔", () => {
    const list = doCodeSearch("sqlsugar", "", 100, 0);
    const m = list.match(/([\w./-]+\.cs)/);
    expect(m).toBeTruthy();
    const out = doCodeRead("sqlsugar", m![1].split("/").pop()!);
    expect(out.length).toBeGreaterThan(0);
    expect(out).not.toMatch(/找不到/);
  });
});
```

- [ ] **Step 2: 跑測試確認失敗**

Run: `npm test -- code-tools`
Expected: FAIL（函式未定義）。

- [ ] **Step 3: 實作**(`src/corpus.ts`)

```ts
/** examples 能力 gate:回 Corpus 或錯誤訊息字串。 */
function requireExamples(corpusId: string | undefined): Corpus | string {
  if (!corpusId || !corpusId.trim()) {
    return `請指定 corpus(可用:${corpusIdList()})。`;
  }
  const c = getCorpus(corpusId);
  if (!c) return `找不到語料 "${corpusId}"。可用語料:${corpusIdList()}。`;
  if (!c.capabilities.examples) {
    return `語料 "${corpusId}" 無代碼範例(未啟用 examples)。請改用 docs_search 查文檔。`;
  }
  return c;
}

/** query 空 → 列範例檔(按頂層目錄分組);有 query → 關鍵字 AND 搜代碼。 */
export function doCodeSearch(corpusId: string | undefined, query: string, limit: number, ctx: number): string {
  const c = requireExamples(corpusId);
  if (typeof c === "string") return c;
  const files = listCodeFiles(c);
  if (files.length === 0) return `語料 "${c.id}" 的 examples/ 沒有源碼檔。`;

  const keywords = query.split(/\s+/).map((k) => k.trim()).filter((k) => k.length > 0);
  if (keywords.length === 0) {
    const out: string[] = [`# ${c.id} 範例源碼(${files.length} 檔)`, ""];
    let lastTop = "";
    for (const f of files) {
      const top = f.path.includes("/") ? f.path.split("/")[0] : "(根)";
      if (top !== lastTop) { out.push(`## ${top}`); lastTop = top; }
      out.push(`- ${f.path}`);
    }
    out.push("", `> 讀單檔:docs_code_read(corpus="${c.id}", path="…");搜尋:docs_code_search(corpus="${c.id}", query="…")`);
    return truncateIfNeeded(out.join("\n"));
  }

  const lower = keywords.map((k) => k.toLowerCase());
  interface CodeHit { path: string; hitCount: number; snippets: string[] }
  const hits: CodeHit[] = [];
  for (const file of files) {
    const content = readCodeFileContent(file);
    const lc = content.toLowerCase();
    if (!lower.every((k) => lc.includes(k))) continue;
    const lines = content.split(/\r?\n/);
    const idxs: number[] = [];
    for (let i = 0; i < lines.length; i++) {
      if (lower.some((k) => lines[i].toLowerCase().includes(k))) idxs.push(i);
    }
    if (idxs.length === 0) continue;
    const ranges: Array<[number, number]> = [];
    for (const idx of idxs) {
      const lo = Math.max(0, idx - ctx), hi = Math.min(lines.length - 1, idx + ctx);
      const last = ranges[ranges.length - 1];
      if (last && lo <= last[1] + 1) last[1] = Math.max(last[1], hi);
      else ranges.push([lo, hi]);
    }
    const snippets = ranges.slice(0, 4).map(([lo, hi]) => {
      const block: string[] = [];
      for (let i = lo; i <= hi; i++) block.push(String(i + 1).padStart(4) + ": " + lines[i]);
      return block.join("\n");
    });
    hits.push({ path: file.path, hitCount: idxs.length, snippets });
  }
  if (hits.length === 0) {
    return `在 "${c.id}" 範例源碼中找不到同時含 [${keywords.join(", ")}] 的檔。建議減少關鍵字,或 docs_code_search(corpus="${c.id}", query="") 看有哪些檔。`;
  }
  hits.sort((a, b) => b.hitCount - a.hitCount);
  const out: string[] = [`# 範例源碼搜尋:[${keywords.join(", ")}](${c.id})`, "", `共 ${hits.length} 檔命中。`, ""];
  for (const h of hits.slice(0, limit)) {
    out.push(`## ${h.path} (${h.hitCount} 處)`);
    for (const s of h.snippets) { out.push("```"); out.push(s); out.push("```"); }
    out.push(`> 讀全檔:docs_code_read(corpus="${c.id}", path="${h.path}")`, "");
  }
  return truncateIfNeeded(out.join("\n"));
}

/** 依 path 模糊比對讀單一範例源碼檔(結尾 / 包含)。 */
export function doCodeRead(corpusId: string | undefined, p: string): string {
  const c = requireExamples(corpusId);
  if (typeof c === "string") return c;
  const q = p.trim().toLowerCase();
  const files = listCodeFiles(c);
  let m = files.filter((f) => f.path.toLowerCase() === q);
  if (m.length === 0) m = files.filter((f) => f.path.toLowerCase().endsWith("/" + q) || f.path.toLowerCase() === q);
  if (m.length === 0) m = files.filter((f) => f.path.toLowerCase().includes(q));
  if (m.length === 0) return `在 "${c.id}" 範例中找不到符合 "${p}" 的源碼檔。用 docs_code_search(corpus="${c.id}", query="") 看清單。`;
  if (m.length > 1) return `"${p}" 符合多檔,請更精確:\n\n` + m.map((f) => "- " + f.path).join("\n");
  const file = m[0];
  const ext = path.extname(file.path).replace(".", "") || "";
  return truncateIfNeeded(`# [${c.id}] ${file.path}\n\n\`\`\`${ext}\n` + readCodeFileContent(file) + "\n```");
}
```

- [ ] **Step 4: 跑測試確認通過**

Run: `npm test -- code-tools`
Expected: PASS。

- [ ] **Step 5: 註冊兩個工具**(`src/index.ts`,匯入 `doCodeSearch`/`doCodeRead`)

```ts
const CodeSearchInputSchema = z
  .object({
    corpus: z.string().max(100).optional().describe("語料 id。單書端點/DOCS_SCOPE 下可省。"),
    query: z.string().max(200).default("").describe("關鍵字(空白分隔為 AND)。留空 = 列出有哪些範例檔。"),
    limit: z.number().int().min(1).max(30).default(10).describe("最多回傳幾檔(預設 10)"),
    context_lines: z.number().int().min(0).max(6).default(2).describe("片段上下文行數(預設 2)"),
  })
  .strict();

const CodeReadInputSchema = z
  .object({
    corpus: z.string().max(100).optional().describe("語料 id。單書端點/DOCS_SCOPE 下可省。"),
    path: z.string().min(1).max(300).describe("源碼檔路徑或檔名(結尾/包含模糊比對)。"),
  })
  .strict();
```
```ts
server.registerTool(
  "docs_code_search",
  {
    title: "搜尋範例源碼",
    description:
      "在某語料附帶的程式碼範例中搜尋(query 留空則列出有哪些範例檔)。\n\n" +
      "僅對啟用 examples 能力的語料有效(否則提示改用 docs_search)。\n\n" +
      "參數:corpus、query(空=列檔)、limit、context_lines。" + scopeNote,
    inputSchema: CodeSearchInputSchema.shape,
    annotations: READ_ONLY,
  },
  async (p) => textResult(doCodeSearch(scope ?? p.corpus, p.query, p.limit, p.context_lines))
);

server.registerTool(
  "docs_code_read",
  {
    title: "讀取範例源碼",
    description:
      "依路徑讀某語料的單一範例源碼檔(含程式碼框)。僅對啟用 examples 的語料有效。\n\n" +
      "參數:corpus、path(模糊比對)。" + scopeNote,
    inputSchema: CodeReadInputSchema.shape,
    annotations: READ_ONLY,
  },
  async (p) => textResult(doCodeRead(scope ?? p.corpus, p.path))
);
```

- [ ] **Step 6: build + 全測 + Commit**

Run: `npm run build && npm test`
Expected: 全 PASS。
```bash
git add docs-mcp-server/src/corpus.ts docs-mcp-server/src/index.ts docs-mcp-server/tests/code-tools.test.ts
git commit -m "feat(docs-mcp): add docs_code_search + docs_code_read (examples capability)"
```

---

### Task 5: `docs_symbol`(API 精確查,capability `symbol`)

**Files:**
- Modify: `docs-mcp-server/src/corpus.ts`（`buildSymbolIndex`/`doSymbol` + `symbolIndexCache` + `_clearCaches`)
- Modify: `docs-mcp-server/src/index.ts`（註冊 `docs_symbol`)
- Modify: `docs-mcp-server/corpora/fc/corpus.json`（加 `symbol: true`)
- Test: `docs-mcp-server/tests/symbol.test.ts`

**Interfaces:**
- Consumes(Task 1):`extractHeadings`/`sliceSection`;既有 `getCorpus`/`listMarkdownFiles`/`readNoteContent`/`sourceLine`/`corpusIdList`/`truncateIfNeeded`
- Produces:
  - `interface SymbolEntry { filename: string; text: string; level: number; lineStart: number }`
  - `buildSymbolIndex(corpus: Corpus): Map<string, SymbolEntry[]>`（key = 小寫標題文字;mtime 快取)
  - `doSymbol(corpusId: string | undefined, name: string, limit: number): string`

- [ ] **Step 1: 寫失敗測試**

`docs-mcp-server/tests/symbol.test.ts`:
```ts
import { beforeEach, describe, expect, it } from "vitest";
import { doSymbol, _clearCaches } from "../src/corpus.js";

beforeEach(() => _clearCaches());

describe("docs_symbol gating", () => {
  it("未開 symbol 的語料(sqlsugar)回友善提示", () => {
    expect(doSymbol("sqlsugar", "查詢", 8)).toMatch(/未啟用 symbol|無符號索引/);
  });
});

describe("doSymbol(fc)", () => {
  it("命中某個 ## 標題並回該段落 + 來源篇", () => {
    const out = doSymbol("fc", "表单 API", 8);
    expect(out).toMatch(/表单 API/);
    expect(out).toMatch(/\[fc\]/);
  });
  it("未命中時建議改用 docs_search", () => {
    expect(doSymbol("fc", "絕對不存在的符號xyz", 8)).toMatch(/docs_search/);
  });
});
```

- [ ] **Step 2: 跑測試確認失敗**

Run: `npm test -- symbol`
Expected: FAIL（`doSymbol` 未定義)。

- [ ] **Step 3: corpus.json 加 symbol 能力**

`docs-mcp-server/corpora/fc/corpus.json` 改為:
```json
{
  "title": "FcDesigner Pro",
  "description": "FcDesigner Pro 表單設計器文件:二次開發、產品手冊、開發文檔(擴展組件/事件/表單 API/渲染等),依分類子目錄組織。",
  "capabilities": { "cheatsheet": false, "symbol": true }
}
```

- [ ] **Step 4: 實作索引 + 查詢**(`src/corpus.ts`)

在快取宣告區加(並在 `_clearCaches` 內 `symbolIndexCache.clear()`):
```ts
export interface SymbolEntry { filename: string; text: string; level: number; lineStart: number }
// corpusDir -> { mtimeMs, index }
const symbolIndexCache = new Map<string, { mtimeMs: number; index: Map<string, SymbolEntry[]> }>();
```
在 `_clearCaches()` 內加一行 `symbolIndexCache.clear();`。

工具邏輯區新增:
```ts
/** 掃語料所有 md,以 ##/### 標題建「小寫標題 → SymbolEntry[]」索引,以語料目錄 mtime 失效。 */
export function buildSymbolIndex(corpus: Corpus): Map<string, SymbolEntry[]> {
  let mtimeMs = 0;
  try { mtimeMs = fs.statSync(corpus.dir).mtimeMs; } catch { /* ignore */ }
  const cached = symbolIndexCache.get(corpus.dir);
  if (cached && cached.mtimeMs === mtimeMs) return cached.index;
  const index = new Map<string, SymbolEntry[]>();
  for (const f of listMarkdownFiles(corpus)) {
    for (const h of extractHeadings(readNoteContent(f))) {
      const key = h.text.toLowerCase();
      const entry: SymbolEntry = { filename: f.filename, text: h.text, level: h.level, lineStart: h.lineStart };
      if (!index.has(key)) index.set(key, []);
      index.get(key)!.push(entry);
    }
  }
  symbolIndexCache.set(corpus.dir, { mtimeMs, index });
  return index;
}

/** 按符號名(標題)精確→包含比對,回該標題段落 + 來源篇。 */
export function doSymbol(corpusId: string | undefined, name: string, limit: number): string {
  if (!corpusId || !corpusId.trim()) {
    return `請指定 corpus(可用:${corpusIdList()})。`;
  }
  const c = getCorpus(corpusId);
  if (!c) return `找不到語料 "${corpusId}"。可用語料:${corpusIdList()}。`;
  if (!c.capabilities.symbol) {
    return `語料 "${corpusId}" 未啟用 symbol(無符號索引)。請改用 docs_search 或 docs_outline。`;
  }
  const index = buildSymbolIndex(c);
  const q = name.trim().toLowerCase();
  if (!q) return "請提供要查的符號名(API/方法/組件名)。";

  // 精確命中
  let matches: SymbolEntry[] = index.get(q) ?? [];
  // 否則包含比對(跨所有 key)
  if (matches.length === 0) {
    for (const [key, entries] of index) {
      if (key.includes(q)) matches.push(...entries);
    }
  }
  if (matches.length === 0) {
    return `語料 "${corpusId}" 找不到符號 "${name}"。建議改用 docs_search(corpus="${corpusId}", query="${name}") 全文搜尋,或 docs_outline 看有哪些標題。`;
  }
  if (matches.length > limit) {
    const list = matches.slice(0, limit).map((m) => `- [${corpusId}] ${m.text}  (${m.filename})`).join("\n");
    return `符號 "${name}" 在 "${corpusId}" 有 ${matches.length} 個候選(顯示前 ${limit}):\n\n${list}\n\n請用更精確的名稱,或 docs_read 讀整篇。`;
  }
  const out: string[] = [];
  for (const m of matches) {
    const file = listMarkdownFiles(c).find((f) => f.filename === m.filename);
    if (!file) continue;
    const lines = readNoteContent(file).split(/\r?\n/);
    const section = sliceSection(lines, m.lineStart);
    const src = sourceLine(c, m.filename);
    out.push(`# [${corpusId}] ${m.text}  ·  ${m.filename}` + (src ? `\n> ${src}` : "") + "\n\n" + section);
    out.push("");
  }
  return truncateIfNeeded(out.join("\n"));
}
```

- [ ] **Step 5: 跑測試確認通過**

Run: `npm test -- symbol`
Expected: PASS。

- [ ] **Step 6: 註冊 `docs_symbol`**(`src/index.ts`,匯入 `doSymbol`)

```ts
const SymbolInputSchema = z
  .object({
    corpus: z.string().max(100).optional().describe("語料 id。單書端點/DOCS_SCOPE 下可省。"),
    name: z.string().min(1).max(120).describe("要查的符號名(API/方法/組件名,對標題精確→包含比對)。"),
    limit: z.number().int().min(1).max(30).default(8).describe("候選上限(預設 8)"),
  })
  .strict();
```
```ts
server.registerTool(
  "docs_symbol",
  {
    title: "API/符號精確查",
    description:
      "在某語料中按名字(API/方法/組件)精確定位到對應的標題段落,比全文搜尋更準。\n\n" +
      "僅對啟用 symbol 能力的語料有效(否則提示改用 docs_search/docs_outline)。\n\n" +
      "參數:corpus、name(對 ##/### 標題比對)、limit。" + scopeNote,
    inputSchema: SymbolInputSchema.shape,
    annotations: READ_ONLY,
  },
  async (p) => textResult(doSymbol(scope ?? p.corpus, p.name, p.limit))
);
```

- [ ] **Step 7: build + 全測 + Commit**

Run: `npm run build && npm test`
Expected: tsc 無錯;全測 PASS(所有檔)。
```bash
git add docs-mcp-server/src/corpus.ts docs-mcp-server/src/index.ts docs-mcp-server/corpora/fc/corpus.json docs-mcp-server/tests/symbol.test.ts
git commit -m "feat(docs-mcp): add docs_symbol tool (symbol capability, fc enabled)"
```

---

## Self-Review(plan 對 spec)

- **§3 capability 型別**:Task 1 擴 `CorpusCapabilities`(examples/symbol)✅
- **§4 docs_outline**:Task 2(無條件、path、headings、無 corpus 提示)✅
- **§5 examples(二元)**:Task 3(搬資料 + 檔案層)+ Task 4(search 空=list、read、gating)✅
- **§6 docs_symbol**:Task 5(標題索引、精確→包含、段落輸出、gating、mtime 快取)✅
- **§7 錯誤處理**:各工具的 gating 字串 + 未命中建議 ✅;`truncateIfNeeded` 全覆蓋 ✅
- **§8 元件邊界**:corpus.ts 純函式 + index.ts 薄殼;`extractHeadings`/`sliceSection` 共用(Task 1 → 2/5)✅
- **§9 測試**:每個純函式 TDD;gating 用既有 fc/sqlsugar 語料驗 ✅
- **§10 YAGNI**:不碰 http.ts/gateway/legacy;symbol 只用標題;examples 用複製不動 legacy ✅
- **型別一致**:`Heading`/`CodeFile`/`SymbolEntry` 跨 task 命名一致;`scope`/`scopeNote`/`READ_ONLY`/`textResult` 沿用 index.ts 既有 ✅
- **缺口**:`docs_outline` 在 `/mcp` 全語料端點 `scope=undefined` 且使用者沒給 corpus → Task 2 已回提示 ✅
