# books/ — 書本與語料目錄規範

這個目錄下的**每個子資料夾 = 一本書**;書的 `corpus/` 下**每個子資料夾 = 一個語料**。
`docs-mcp-server` 開發時掃描 `books/*/corpus/`,映像 build 時把它們併成 `corpora/`,
新增一本書 = 丟一個資料夾 + `corpus.json`,**不改任何 `.ts`**。

> 本檔是語料命名與目錄結構的**唯一權威版本**。完整的「新增知識庫」流程(驗證、註冊、部署、文件同步)
> 見團隊 skill **`elf-mcp-knowledge`**;本檔只放「這個目錄長什麼樣、檔案怎麼放」。

---

## 一、命名規則

**語料 id = 資料夾名 = MCPJungle server 名 = HTTP 路徑 `/mcp/<id>`**,四者是同一個字串。
格式固定為 **`<書名>-<語言>`**。

| 語言後綴 | 意思 | `corpus.json` 的 `language` | 使用時機 |
|---|---|---|---|
| `-en` | 英文 | `en` | 英文原文 |
| `-zh-tw` | 繁體中文 | `zh-TW` | 中文原文或繁中譯本 |
| `-zh-cn` | 簡體中文 | `zh-CN` | 簡中原文 |
| `-bi` | 中英混排 | `zh-TW`(或主要語言) | **只有**來源本身中英混排、無法拆開時 |

| 規則 | 說明 / 原因 |
|---|---|
| 只用小寫字母、數字、`-`,以字母開頭 | MCPJungle server 名只允許 `^[a-zA-Z0-9_-]+$`;URL 與 gateway 名稱分大小寫,一律小寫才不會出現兩套 |
| **不可**有底線 `_` | gateway 工具名是 `<id>__<tool>`,以 `__` 切分;不用底線就永遠不會踩到 |
| **不可**有點 `.` | 不在 MCPJungle 允許字元內(`vue3.5-en` ✗ → `vue35-en` 或 `vue-en`) |
| id 總長 ≤ 30 字元 | 工具名 `<id>__docs_code_search` 會變長,部分用戶端 / 模型 API 對工具名有約 64 字元上限 |
| 同一本書兩種語言 = **兩個語料** | 如 `opnsense-en`、`opnsense-zh-tw`,按字母排序自然相鄰 |
| **不可**再放第三份雙語合併版 | 同內容存三份、搜三次;要雙語就讓 AI 分別查兩個語料 |
| 書名本身可含 `-` | 如 `vue-router-en`;分辨書名與語言靠 `corpus.json` 的 `book` / `language`,**不靠**拆 id 字串 |
| 用領域名,不用泛名 | `docs`、`notes`、`kb`、`test`、`new` 禁用;AI 看到的是 `<id>__docs_search`,id 是它選工具的唯一線索 |
| id 在整台 gateway 唯一 | 不只在 `books/` 內唯一;`docs`(策略 B 整包)、`filesystem`、`fetch`、`time` 已被占用,以 `mcpjungle list servers` 為準 |

現有語料:

| id | book | language | 篇數 | capabilities |
|---|---|---|---|---|
| `fc-zh-tw` | `fc` | `zh-TW` | 133 | `symbol` |
| `nginx-en` | `nginx` | `en` | 149 | `symbol` |
| `opnsense-en` | `opnsense` | `en` | 378(377 篇 + `000 目錄.md`) | (無) |
| `opnsense-zh-tw` | `opnsense` | `zh-TW` | 378(377 篇 + `000 目錄.md`) | (無) |
| `sqlsugar-zh-tw` | `sqlsugar` | `zh-TW` | 74 | `cheatsheet`、`examples` |

---

## 二、目錄樹範例

```text
mcpjungle/books/
├── README.md                              # 本檔(不是書)
│
├── fc/
│   └── corpus/
│       └── fc-zh-tw/                      # 有分類子目錄的語料
│           ├── corpus.json
│           ├── sources.json               # 選用:覆寫自動抽取的來源連結
│           ├── 二次開發/
│           │   ├── 01项目介绍.md
│           │   └── 02目录结构.md
│           ├── 產品手冊/
│           │   └── 01界面布局.md
│           └── 開發文檔/
│               └── 11表单 API.md
│
├── nginx/                                 # 由匯入腳本從原稿產生語料的書
│   ├── import.ts                          # 在 docs-mcp-server 執行 npx tsx ../books/nginx/import.ts
│   ├── transform.ts
│   ├── source/
│   │   └── en/                            # 原稿;不進映像(mcpjungle/.dockerignore 排除 books/*/source)
│   └── corpus/
│       └── nginx-en/                      # 匯入腳本的產出,勿手改
│
├── opnsense/
│   ├── source/                            # 原稿與翻譯工作區
│   └── corpus/
│       ├── opnsense-en/                   # 同一本書的英文原文(扁平、檔名編號排序)
│       │   ├── corpus.json
│       │   ├── sources.json               # 由每篇 YAML front matter 的 source: 產生(見第五節)
│       │   ├── LICENSE                    # 上游授權全文(BSD-2-Clause),非 .md 不會被索引
│       │   ├── 000 目錄.md                # 章節目錄(唯一的階層導航)
│       │   ├── 01 Welcome to OPNsense’s documentation!.md
│       │   └── 137 Rules.md
│       └── opnsense-zh-tw/                # 同一本書的繁中譯本 → 另一個語料,與 -en 相鄰
│           ├── corpus.json
│           ├── sources.json
│           ├── LICENSE
│           ├── 000 目錄.md
│           └── 137 規則.md
│
└── sqlsugar/
    └── corpus/
        └── sqlsugar-zh-tw/                # 扁平 md + 範例原始碼
            ├── corpus.json
            ├── index.md                   # 選用:分類導航
            ├── Select用法.md
            └── examples/                  # 僅 capabilities.examples=true 時;不會被當成 md 文件
                └── SqlSugar-vs-EFCore效能測試-MySQL版/
                    └── ORMTEST/Program.cs
```

結構重點:

- 只有含 `corpus/` 的書會被掃到;`source/`、`import.ts` 等其他檔案不是語料。不同書的語料 id 仍須全域唯一(重複時保留先掃到的並警告)。
- 分類最多**一層**子目錄(`開發文檔/xx.md`)。`docs_outline` 以頂層目錄分組,更深的目錄會被歸到第一層;沒有子目錄的檔案歸在「(根)」。
- 檔名前綴編號(`01xxx.md`、`137 Rules.md`)保持閱讀順序。排序是字串排序(`localeCompare("zh-Hant")`),位數不一致時 `100` 會排在 `11` 前面。
- `examples/` 只放白名單副檔名 `.cs .csproj .sln .json .ts .js`;`bin/`、`obj/`、`.vs/` 會被略過,也不要提交。
- `node_modules/`、`dist/`、`.git/` 會被略過。

---

## 三、`corpus.json` 欄位參考

| 欄位 | 必填(團隊規定) | 程式是否讀取 | 說明 |
|---|---|---|---|
| `book` | ✅ | 否 | 書名(小寫、可含 `-`),同一本書的各語言語料用同一個值,如 `opnsense` |
| `language` | ✅ | 否 | BCP 47 語言標籤:`en`、`zh-TW`、`zh-CN`;`-bi` 語料填主要語言 |
| `source` | ✅ | 否 | 原始網址(官方文件首頁或 repo),如 `https://docs.opnsense.org` |
| `title` | ✅ | 是 | 人類可讀名稱,**用該語料的語言寫**;`docs_list_corpora` 會顯示。省略時 = 資料夾名 |
| `description` | ✅ | 是 | 一句話:這是什麼、涵蓋哪些主題、附不附範例、有沒有已知缺陷(機器翻譯、失效圖片連結…) |
| `capabilities` | ✅ | 是 | `{ "cheatsheet": bool, "examples": bool, "symbol": bool }`,只開內容真正支援的(見下表) |
| `license` | 選用 | 否 | 上游授權說明;需要保留授權聲明(如 BSD)時,另把全文放在語料根目錄的 `LICENSE` |

`capabilities` 對照:

| capability | 啟用的工具 | 語料必須具備 |
|---|---|---|
| (無條件) | `docs_list_corpora` `docs_search` `docs_read` `docs_outline` | `.md` 檔 |
| `cheatsheet` | `docs_cheatsheet` | 每篇有標題含「速查」的段落(慣例 `## 速查表`) |
| `examples` | `docs_code_search` `docs_code_read` | `examples/` 下有白名單副檔名原始碼 |
| `symbol` | `docs_symbol` | API / 組件名寫成 `#` / `##` / `###` 標題(`####` 以下不進索引) |

未啟用的能力工具仍然存在,只會回友善提示並建議改用哪個工具——工具數恆為 8,不隨語料增加。

完整範例(`opnsense-zh-tw/corpus.json`):

```json
{
  "book": "opnsense",
  "language": "zh-TW",
  "source": "https://docs.opnsense.org",
  "license": "BSD-2-Clause(OPNsense 官方文件,https://github.com/opnsense/docs/blob/master/LICENSE;全文見 LICENSE)。繁中為機器翻譯衍生作品",
  "title": "OPNsense 說明文件(繁體中文)",
  "description": "OPNsense 防火牆官方文件繁體中文機器翻譯版(docs.opnsense.org,377 篇,2026-09-26 擷取;Google 翻譯,未經人工校稿,術語以 opnsense-en 原文為準):安裝、介面、防火牆規則/NAT、VPN(IPsec/OpenVPN/WireGuard)、路由、服務、外掛、疑難排解、版本說明。檔案扁平、以編號排序;「000 目錄.md」為章節目錄。僅含文字:圖片連結(../images/…)與指向已排除「000 全書」合併檔的連結刻意保留為失效連結。",
  "capabilities": { "cheatsheet": false, "examples": false, "symbol": false }
}
```

選用的 `sources.json`(相對語料根的路徑 → 官方網址),**優先於**自動抽取:

```json
{
  "137 規則.md": "https://docs.opnsense.org/manual/firewall.html"
}
```

---

## 四、新增一本書(檢查清單)

完整步驟、指令與驗證方式以 skill **`elf-mcp-knowledge`**(第 3 節 Step 0–7、第 5 節檢查清單)為準。以下是在本 repo 內要做的事:

- [ ] **選 id**:`<書名>-<語言>`,符合第一節所有規則;`ls mcpjungle/books/*/corpus/ mcpjungle/servers/` 與 `docker exec mcpjungle-server /mcpjungle list servers` 確認不撞名
- [ ] **建資料夾** `mcpjungle/books/<書名>/corpus/<id>/`,只放 `.md`(第六節規則:純文字、不放合併全書)
- [ ] **每篇 md**:`# 標題` 開頭,前 15 行內有來源行 `> 📖 官方文件:[文字](https://…)` 或 `> Source: https://…`;做不到時(例如 YAML front matter)改用 `sources.json`,或由匯入腳本把 `source: "…"` 去掉引號(如 `nginx-en`)
- [ ] **`corpus.json`**:`book` / `language` / `source` / `title` / `description` / `capabilities` 都寫;capabilities 與內容相符
- [ ] 單檔 < 5 MB,不含連線字串 / 密碼 / token
- [ ] **smoke test**:複製 skill 的 `templates/corpus-smoke.test.ts` 成 `mcpjungle/docs-mcp-server/tests/<id>.test.ts`,換成語料的**真實**標題與關鍵字(不可放寬比對)
- [ ] `cd mcpjungle/docs-mcp-server && npm run build && npm test`:既有測試全過、數量不減
- [ ] 本機起 server,實際呼叫 `docs_list_corpora` / `docs_search` / `docs_read` / `docs_outline`,`/health` 的 corpora / docs 數正確
- [ ] **註冊**:新增 `mcpjungle/servers/<id>.json`(`url` = `http://docs-mcp-server:5690/mcp/<id>`,`description` 列出所有有效工具)
- [ ] **`REGISTER_LIST`** 兩處:`mcpjungle/registrar.sh` 預設值、`mcpjungle/docker-compose.dockhand.yml` 預設值(`mcpjungle/register.sh` 的 per-book 清單也同步)
- [ ] **文件**:本檔「現有語料」表、根 `README.md`、根 `CLAUDE.md`、`mcpjungle/docs-mcp-server/README.md`、`mcpjungle/README.md`
- [ ] 部署後驗證 gateway:`list tools | grep '<id>__'` 與一次 `invoke <id>__docs_search`

改名既有語料時:registrar 只會新增、不會移除,已部署的 gateway 要手動 `mcpjungle deregister <舊名>`。

---

## 五、來源連結與 front matter

`docs_read` / `docs_search` 會附「📖 官方文件來源」。取得順序:

1. `sources.json` 有該檔 → 用它。
2. 否則掃該檔前 15 行,認 `> 📖 官方文件:[文字](url)` 或 `> Source: url`。

以 YAML front matter 擷取的文件(如 OPNsense:`source: "https://…"`)**不符合**第 2 條的格式——自動抽取會把結尾的 `"` 一起吃進網址。
這類語料一律從 front matter 產生 `sources.json`,md 內容保持與擷取來源一致,方便日後重新同步。

例外:語料由匯入腳本產生時(如 `nginx-en` 的 `npx tsx ../books/nginx/import.ts`),可在轉換時把 `source: "https://…"` 改成不帶引號的 `source: https://…`,自動抽取即可取得正確網址,不必另產 `sources.json`;重新同步時重跑匯入腳本即可。此類語料的 md 以 YAML front matter 開頭、其後才是 `# 標題`,亦符合本節「`# 標題` 開頭」的要求。

---

## 六、內容規則

- **只放文字**:`.md`(以及 `examples/` 白名單原始碼、`corpus.json`、`sources.json`、`LICENSE`)。**不放圖片**(png / jpg / svg / gif…)。
  md 內的圖片連結(如 `../images/xxx.png`)會變成失效連結——這是可接受的,但要在 `corpus.json` 的 `description` 註明。
- **不放合併檔**:「全書」「整本書」「all-in-one」這類把所有頁面串成一檔的 md 是重複內容,會讓每次搜尋都多命中一篇超大檔,**一律排除**。
  目錄 / 索引頁(只有連結、沒有正文)可以保留,因為它是唯一的階層導航。
- **不放第三份雙語版**:見第一節。
- **容量上限**:`books/*/corpus/` 總量約 **200 MB** 以內。語料會打包進 `docs-mcp-server` 的 Docker image,也在每次 clone 時下載;
  超過時把大型語料拆到獨立 repo(以 `DOCS_CORPORA_DIR` 掛載),不要繼續塞進本 repo。
  目前總量:約 11.4 MB(`opnsense-en` 4.9 MB、`opnsense-zh-tw` 4.7 MB、`fc-zh-tw` 1.0 MB、`sqlsugar-zh-tw` 0.8 MB)。
- 單檔 < 5 MB(CI 會擋);不放任何機密——機密掃描**不掃** `examples/`。
- 上游授權要求保留聲明時(BSD、MIT…),在語料根目錄放 `LICENSE` 全文,並在 `corpus.json` 的 `license` 註明。
