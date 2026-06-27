# docs-mcp 領域工具(capability-gated)設計

- 日期:2026-06-27
- 狀態:Draft(待 user 審查)
- 工作目錄:worktree `docs-mcp-domain-tools`,分支 `worktree-docs-mcp-domain-tools`
- 影響範圍:**只動 `docs-mcp-server/src/`**(不碰 gateway、不碰 legacy server)

---

## 1. 背景與目標

docs-mcp 多語料把工具收斂成固定 4 個(`docs_list_corpora` / `docs_search` / `docs_read` / `docs_cheatsheet`),好處是工具數不隨語料膨脹。但對 sqlsugar / fc 這種**特定領域**,純「全文搜尋 + 讀整篇」偏弱:

- **fc** 的 `corpus.json` 沒開 `cheatsheet`,在單書視角(`/mcp/fc` 或 gateway `fc__`)實際只有 `docs_search` + `docs_read` **兩個**有效工具——AI 對這套表單設計器使不上力。
- **sqlsugar** 收斂時丟掉了舊 standalone server 的「C# 範例程式碼搜尋」(`list_examples` / `read_code` / `search_code`)。

**目標**:加領域工具讓 AI 真能用 sqlsugar / fc,**同時不破壞「工具數不隨語料數膨脹」的收斂主軸**。

**手段**:沿用現有 `docs_cheatsheet` 的 **capability-gated** 模式——工具對所有語料「存在」,只對 `corpus.json` 宣告啟用的語料生效,其餘回友善提示。

## 2. 現況(已查證)

| 項目 | 事實 | 依據 |
|---|---|---|
| 現有工具 | `docs_list_corpora` / `docs_search` / `docs_read` / `docs_cheatsheet`,皆唯讀 | `src/index.ts` |
| capability 機制 | 已存在:`corpus.json` 的 `capabilities.cheatsheet`,`docs_cheatsheet` 對未啟用語料回提示 | `src/corpus.ts` `CorpusCapabilities` / `doCheatsheet` |
| 純邏輯分層 | `corpus.ts` = 多語料純邏輯(掃描/搜尋/讀取/快取);`index.ts` = 工具註冊薄殼;`http.ts` = transport | `src/*.ts` |
| sqlsugar | `capabilities.cheatsheet: true` | `corpora/sqlsugar/corpus.json` |
| fc | `capabilities.cheatsheet: false` → 單書僅 search/read | `corpora/fc/corpus.json` |
| 舊 sqlsugar code 工具 | `list_examples`/`read_code`/`search_code`,資料源 `sqlsugar-mcp-server/examples/`(SqlSugar vs EF Core 的 `.cs`/`.csproj`/`.sln`),邏輯 `doListExamples`/`doReadCode`/`doSearchCode` | `sqlsugar-mcp/sqlsugar-mcp-server/src/index.ts` |
| fc 文檔結構 | `開發文檔`(79)/`產品手冊`(45)/`二次開發`(9),「編號+一篇一主題」,如 `11表单 API.md`、`30扩展组件.md`、`37扩展表单 API.md`,檔名即天然目錄 | `corpora/fc/` |
| 快取慣例 | `contentCache`/`corporaCache`/`sourcesCache` 皆以 **mtime 失效** | `src/corpus.ts` |
| 既有測試 | `tests/corpus.test.ts`,vitest,25 passed(基線) | worktree 實跑 |

## 3. 架構與主軸

**沿用 capability-gated 模式**,新增 3 種領域能力、共 4 個工具。工具總數 **4 → 8**,恆定、不隨語料數膨脹。

| 新工具 | capability gate | 資料來源 | 初期啟用 |
|---|---|---|---|
| `docs_outline` | **無條件**(所有語料) | 目錄樹 + 每篇 md 的 `##`/`###` 標題 | 全部 |
| `docs_code_search` | `examples` | `corpora/<id>/examples/` | sqlsugar |
| `docs_code_read` | `examples` | 同上 | sqlsugar |
| `docs_symbol` | `symbol` | 各 md 的 `##`/`###` 標題建索引 | fc |

**資料自包含**(延續多語料哲學):範例碼搬進 `corpora/sqlsugar/examples/`;能力用 `corpus.json` 的 `capabilities` 宣告。新增語料要不要這些能力,只改 `corpus.json`,不碰程式碼。

**型別擴充**(`corpus.ts` 的 `CorpusCapabilities`):

```ts
export interface CorpusCapabilities {
  cheatsheet?: boolean;
  examples?: boolean;   // 啟用 docs_code_search / docs_code_read,讀 corpora/<id>/examples/
  symbol?: boolean;     // 啟用 docs_symbol,從 md 標題建符號索引
}
```

**痛點解法驗證**:fc 開 `symbol`(+無條件 outline)→ 單書 `search`/`read`/`outline`/`symbol` **4 個**;sqlsugar 開 `examples`(已有 cheatsheet)→ `search`/`read`/`cheatsheet`/`outline`/`code_search`/`code_read` **6 個**。

## 4. `docs_outline`(結構大綱)

**職責**:回傳某一本書的內部目錄(分類資料夾 + 每篇檔名,可選展開篇內標題)。填補發現性空缺——`search` 要先有關鍵字、`read` 要先知檔名,`outline` 是「還不知道有什麼」時的入口。與 `docs_list_corpora`(列出有哪些書)分工不重疊(outline 是某本書內部)。

**capability**:無條件。

**參數**:
- `corpus`(string,選填;單書端點 / `DOCS_SCOPE` 下可省)
- `path`(string,選填):只展開某分類,如 `開發文檔`
- `headings`(boolean,選填,預設 `false`):`true` 才展開每篇的 `##`/`###` 標題(會讀全部檔案、較重)

**資料**:複用現成 `listMarkdownFiles(corpus)`(已遞迴掃描、給相對路徑)。`headings=true` 時對每篇 `readNoteContent` + `extractHeadings`(見 §6 共用)。

**輸出**(fc、`headings=false`):
```
# fc 結構大綱(133 篇 · 3 類)
## 二次開發 (9 篇)
- 01项目介绍 · 02目录结构 · 03添加新组件 …
## 開發文檔 (79 篇)
- 11表单 API · 30扩展组件 · 37扩展表单 API …
## 產品手冊 (45 篇)
- …
> 要看某類細目:docs_outline(corpus="fc", path="開發文檔", headings=true)
```

**邊界**:空語料→提示無內容;`path` 不中→列出可用分類;無 `corpus`(`/mcp` 全語料端點)→提示先用 `docs_list_corpora` 選書。

## 5. 代碼範例(`docs_code_search` + `docs_code_read`,capability `examples`)

**職責**:對語料附帶的程式碼範例做「搜 + 讀」,收編舊 sqlsugar 的 `list_examples`/`read_code`/`search_code`。採二元設計,與現有 `docs_search`/`docs_read` 對稱。

**資料**:把 `sqlsugar-mcp-server/examples/` 內容搬進 **`corpora/sqlsugar/examples/`**。邏輯收編舊 `doListExamples`/`doSearchCode`/`doReadCode`,泛化成吃 `corpus` 參數、掃該語料的 `examples/` 子目錄(副檔名白名單:`.cs`/`.csproj`/`.sln`/`.json`/`.ts`/`.js`,可調)。`examples/` 不被 `listMarkdownFiles`(只掃 `.md`)涵蓋,兩者互不干擾。

**`docs_code_search`**:
- 參數:`corpus`(選填)、`query`(選填:**空 = 列出有哪些範例檔**,按子目錄分組;非空 = 關鍵字 AND 搜代碼)、`limit`(預設 10)、`context_lines`(預設 2)
- 輸出:空 query → 範例檔清單;有 query → 命中檔 + 片段(行號),沿用舊 `doSearchCode` 格式

**`docs_code_read`**:
- 參數:`corpus`(選填)、`path`(必填:檔名或相對路徑,結尾/包含模糊比對)
- 輸出:單一代碼檔完整內容(程式碼框)

**capability**:`examples`。未開的語料呼叫 → 「該語料無代碼範例,請改用 docs_search」。

**邊界**:`path`/`query` 沒中→友善提示;無 `corpus`→代碼跨語料搜意義不大,提示指定 `corpus`。

## 6. `docs_symbol`(API 精確查,capability `symbol`)

**職責**:AI 已知某個 API/方法/組件名(如 `扩展表单 API`、`$inject`、`onSubmit`),要直接定位到講它的段落,而非全文搜一堆。按名查「符號」,回該標題段落 + 來源篇。

**索引**:掃語料所有 md,抽 `##`/`###` 標題為「符號」,建 `符號 → { filename, level, lineStart }`。首次查詢時建、以語料目錄 mtime 失效(新增 `symbolIndexCache: Map<corpusDir, …>`,比照 `sourcesCache`)。

**共用底層 `extractHeadings(content)`**:回傳 `Array<{ text, level, lineStart }>`(掃 `^#{2,3}\s+`)。`docs_outline(headings=true)` 與 `docs_symbol` 共用此函式,避免重複解析邏輯。

**匹配**:`name` 對標題做「精確(忽略大小寫/全半形空白)→ 包含」兩階,比照現有 `findNotes` 策略。

**參數**:`corpus`(選填)、`name`(必填,符號名)、`limit`(候選上限,預設 8)

**輸出**:
- 單一命中:該標題段落(從該 `##`/`###` 到下一個 **同級或更高級**標題,複用 `extractCheatsheet` 既有的「依標題層級切段」邏輯,抽成通用 `sliceSection(lines, startIdx)`)+ 來源篇 + `sourceLine`
- 多命中:候選清單(`[篇] 標題`),提示縮小 `name` 或用 `docs_read`
- 未命中:建議改用 `docs_search`

**capability**:`symbol`(fc 開;任何標題結構化的語料皆可開,由 `corpus.json` 決定)。

**邊界**:未開 `symbol`→提示;無 `corpus`→可跨語料查(結果標 `[id]`),但建議指定 `corpus` 收斂。

## 7. 錯誤處理(統一慣例)

- **capability 未開**:比照現有 `doCheatsheet` 的提示風格,回「語料 X 未啟用 〈能力〉,請改用 〈替代工具〉」。
- **缺 `corpus`(全語料端點且該工具需指定)**:比照現有 `needCorpus()`,列出可用語料 id。
- **未命中**:一律給「下一步建議」(改關鍵字 / 改用 `docs_search` / `docs_list_corpora`)。
- **輸出截斷**:所有新工具輸出走現有 `truncateIfNeeded`(25000 字元上限)。

## 8. 元件邊界與資料流(設計給隔離測試)

**`src/corpus.ts`**(純邏輯,新增;每個都是可獨立單元測試的純函式):
- `extractHeadings(content) → Heading[]`(共用)
- `sliceSection(lines, startIdx) → string`(由現有 `extractCheatsheet` 抽出的通用版)
- `doOutline(corpusId?, path?, headings) → string`
- `listExampleFiles(corpus) / doCodeSearch(corpusId?, query, limit, ctx) / doCodeRead(corpusId?, path) → string`
- `resolveExamplesDir(corpus)`(語料內 `examples/`)、`listCodeFiles(corpus)`(副檔名白名單)
- `buildSymbolIndex(corpus) → Map<string, SymbolEntry[]>`(mtime 快取)、`doSymbol(corpusId?, name, limit) → string`
- `CorpusCapabilities` 加 `examples?` / `symbol?`

**`src/index.ts`**(薄殼,新增 4 個 `registerTool`):各自 zod schema + 一行 handler 呼叫 `corpus.ts` 對應函式;capability 檢查在 handler(scope 已知 corpus 時直接查該語料 capability)。

**`http.ts` / transport / gateway**:**不動**。新工具自動出現在 `/mcp` 與 `/mcp/<corpus>`。

## 9. 測試策略

- vitest,擴充 `tests/`(可新增 `tests/domain-tools.test.ts`,與 `corpus.test.ts` 並列)。
- **種子資料**:用現有 `sqlsugar`/`fc` 語料;`examples` 測試用搬入的 `corpora/sqlsugar/examples/`;另建一個極小的測試語料(temp dir + `DOCS_CORPORA_DIR`)驗 capability gating。
- **覆蓋**:
  - `docs_outline`:分類分組、`path` 過濾、`headings` 展開、空語料、無 corpus
  - `docs_code_*`:空 query=list、關鍵字命中、`read` 模糊比對、**未開 `examples` 的語料回提示**
  - `docs_symbol`:精確/包含命中、多命中候選、未命中、**未開 `symbol` 回提示**、mtime 重建索引
  - `extractHeadings`/`sliceSection` 純函式邊界(無標題、巢狀層級)
- 每個能力的純函式先寫測試(TDD),工具薄殼靠 typecheck + 純函式測試覆蓋。

## 10. 範圍外(YAGNI)

- 不碰 gateway、`http.ts`、legacy standalone server。
- `docs_symbol` 只用 md 標題;**不**解析程式碼塊內的函數簽名。
- `examples` 只搬 sqlsugar 現有 C# 範例;不為 fc 製造範例。
- 不做 `outline` 的全篇標題預先索引(僅 `headings=true` 時即時讀)。
- 不改 `docs_search`/`docs_read`/`docs_cheatsheet`/`docs_list_corpora` 既有行為。

## 11. 待 user 確認的決策點

1. 工具形態:**二元** `docs_code_search`+`docs_code_read`(本 spec 採用)vs 單一 `docs_examples`(action)。
2. `docs_symbol` 索引粒度:`##` + `###`(本 spec 採用)是否足夠,要不要含 `####`。
3. `examples` 是否也替 **fc** 開(目前只 sqlsugar);`symbol` 是否也替 **sqlsugar** 開(目前只 fc)。
