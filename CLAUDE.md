# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 專案定位

MCP server 的 **monorepo**。核心價值不是單一 web app,而是**用 Docker Compose + MCPJungle gateway 把多個 MCP server 整合成單一入口部署**。

精簡的 AI 部署速查另見 [AGENTS.md](AGENTS.md);各子專案有自己的 README,**要改某個 server 的行為,先讀它目錄下的 README,別直接動根 compose**。本檔聚焦「需讀多個檔案才懂的架構與機制」。

四個層次:

- [`docs-mcp-server/`](docs-mcp-server) — **核心**。多語料(corpus)文檔 MCP server,一個 server 掛多本「書」(目前種子語料 `sqlsugar` + `fc`,打包進映像)。
- [`mcpjungle/`](mcpjungle) — gateway 部署層,把各 server 註冊進 MCPJungle、對用戶端只開一個入口。內含一份 **vendored 的 [MCPJungle fork 原始碼](mcpjungle/MCPJungle)**(從源碼 build,非 pull 官方映像)。
- [`docker-compose.yml`](docker-compose.yml) — 根入口,一鍵把 gateway + docs-mcp + registrar 全拉起(`include` 了 `mcpjungle/docker-compose.mcpjungle.yml`)。
- [`sqlsugar-mcp/`](sqlsugar-mcp/sqlsugar-mcp-server) · [`fc-designer-mcp/`](fc-designer-mcp) — **legacy** standalone server,已被 docs-mcp 的語料取代,保留可回退,**不在根 compose 堆疊**。

## 常用命令

### 部署(根目錄,推薦入口)

```bash
cp .env.example .env                 # 必填 MCPJUNGLE_DATABASE_URL(host 用 DB 的「IP」,非容器名)
docker compose up -d --build         # build 法:現場 build,總是最新源碼
docker compose -f docker-compose.pull.yml up -d   # pull 法:拉 ghcr 既建映像,不在 server build
```

### docs-mcp-server 開發(核心,`cd docs-mcp-server`)

```bash
npm install
npm run build                        # tsc -> dist/(本專案沒有獨立 lint,型別檢查即 build)
npm test                             # vitest run(多語料隔離 / 跨語料 / capability gating)
npm run test:watch
npx vitest run -t "關鍵字"           # 跑單一測試;或 npx vitest run tests/corpus.test.ts
npm run dev                          # tsx watch,stdio 模式
```

HTTP / scope 模式(本機 Windows PowerShell 環境注意:用 `$env:VAR="..."`,**不是** bash 的 `VAR=... cmd`):

```powershell
$env:TRANSPORT="http"; npm start     # 本機跑 HTTP(預設 PORT 5690),curl /health 驗證
$env:DOCS_SCOPE="sqlsugar"; npm run dev   # stdio 鎖定單一語料
```

### mcpjungle gateway(`cd mcpjungle`)

```bash
docker compose -f docker-compose.mcpjungle.yml up -d --build   # 正式:gateway + docs-mcp + registrar
docker compose -f docker-compose.localtest.yml up -d           # 自包含測試(內含 postgres + 自建網路)
docker compose -f docker-compose.dockhand.yml up -d            # 只起 docs-mcp + registrar,接「現有」gateway
REGISTRY=http://localhost:18800 ./register.sh                  # 手動註冊(需先裝官方 mcpjungle CLI)
```

### E2E(根目錄)

```bash
npm run test:e2e                     # cypress run(注意:cypress/ 目前多為腳手架預設範例,非真實業務 E2E)
npm run cypress                      # cypress open
```

## 安裝 / 接入 AI(docs-mcp)

讓 Claude / 任何 MCP 用戶端用上 fc/sqlsugar 文檔查詢,四種接法:

- **A. 本機 stdio(最簡單)** — 工作目錄建 `.mcp.json`:
  ```json
  { "mcpServers": { "docs": { "command": "npx", "args": ["-y", "@elf-express/docs-mcp-server"] } } }
  ```
  只掛單一本書加 `"env": { "DOCS_SCOPE": "fc" }`;未發 npm 時改 `"command": "node", "args": ["<repo>/docs-mcp-server/dist/index.js"]`(先 `npm install && npm run build`)。
- **B. 本機原始碼** — `cd docs-mcp-server && npm install && npm run build`,再 stdio `npm run dev` 或 HTTP `$env:TRANSPORT="http"; npm start`(:5690,`/health` 驗)。
- **C. 遠端 / 雲端 HTTP** — 映像內建 `TRANSPORT=http`;設 `MCP_AUTH_TOKEN`、對外開 :5690、走 HTTPS。Claude 端 Settings → Connectors 填 `https://網域/mcp`(全語料)或 `/mcp/<corpus>`(單書),token 填 `Bearer <token>`。
- **D. 經 gateway** — 根 `docker compose up -d --build` 一鍵起,用戶端連 `http://<host>:18800/mcp`(詳見上方「部署」)。

接上後對 AI 說「列出可用語料」即可探索(`docs_list_corpora` 會標 sqlsugar=速查表/代碼範例、fc=符號查)。

## 架構重點(讀多檔才懂的部分)

### docs-mcp-server:多語料機制(`src/corpus.ts` + `src/index.ts`)

- 一個**語料 = `corpora/<id>/` 下一組 markdown**(可含分類子目錄)+ 一個選填 `corpus.json`(`title` / `description` / `capabilities`)。能力旗標:`cheatsheet`、`examples`(語料附 `examples/` 程式碼)、`symbol`(從標題建符號索引)。
- **新增一本書不改任何 `.ts`**:丟資料夾 + `corpus.json`,重啟(本機)或重新部署(雲端)即出現在 `docs_list_corpora`。
- 工具**固定 8 個且全唯讀**,**`corpus` 是參數不是新工具**(領域再多、工具數不變);**capability-gated**——工具對所有語料都「在」,只對宣告該能力的語料生效,其餘回友善提示:
  - 無條件(所有語料):`docs_list_corpora`(探索入口)/ `docs_search` / `docs_read` / `docs_outline`(結構大綱)
  - `cheatsheet` 能力:`docs_cheatsheet`(抽速查表段落)
  - `examples` 能力:`docs_code_search` / `docs_code_read`(查語料附帶的程式碼範例,如 sqlsugar 的 C#)
  - `symbol` 能力:`docs_symbol`(按 API/組件名精確定位標題段落;索引含 `#`/`##`/`###`,並去 U+200B 零寬字元)
  - 目前:`sqlsugar` 開 `cheatsheet`+`examples`、`fc` 開 `symbol`;`docs_list_corpora` 會標每語料的能力 + 可用工具。
- `corpus` 參數型別是 `z.string()` 而非 enum(語料是執行期動態資料),未知語料在 runtime 給友善提示。
- **corpora 根目錄解析順序**(`resolveCorporaDir`):`DOCS_CORPORA_DIR` → 打包的 `corpora/` → server 根的上一層。
- **來源連結**:優先讀語料的 `sources.json`(明確覆寫);否則**自動從每篇 MD 前 15 行抽取** `> Source: https://…` 或 `> 📖 官方文件:[文字](https://…)`。
- 快取(`corporaCache` / `contentCache` / `sourcesCache`)以 **mtime 失效**,改檔即時生效;搜尋是多關鍵字 AND、命中數排序、輸出截斷在 25000 字元。

### HTTP 端點與 scope(`src/http.ts`,「模型 B」:一份部署、每本書各自網址)

| 端點 | 行為 |
|---|---|
| `POST /mcp` | 全語料,AI 用 `corpus` 參數選書 |
| `POST /mcp/<corpus>` | `createServer(corpus)` 鎖定單一書,`corpus` 參數被忽略;未知 corpus 回 **404** |
| `GET /health` | 免驗證,回 `{status, corpora, docs}` |

- 鎖單一語料有兩條路:HTTP 的 `/mcp/<corpus>` 與 stdio 的 `DOCS_SCOPE`(供 Claude Desktop 每本書一條設定)。
- 每個 session 一個 transport,以 `mcp-session-id` 為鍵;`GET`/`DELETE` 靠 session id 找 transport,與 scope 無關。
- `MCP_AUTH_TOKEN` 設了之後 `/mcp*` 需帶 `Authorization: Bearer <token>`(`/health` 永遠公開)。

### MCPJungle gateway 與註冊(`mcpjungle/`)

- compose 內含一次性 **`registrar` 容器**:等 gateway 就緒 → 自動註冊 `REGISTER_LIST`(預設 `sqlsugar fc filesystem fetch time`)→ 結束(`Exited (0)` 屬正常)。`registrar.sh` 含**重試 + 冪等**,redeploy 安全。
- 註冊檔在 [`mcpjungle/servers/*.json`](mcpjungle/servers)。兩種策略:**A**(推薦)每本書各自註冊(`sqlsugar.json` + `fc.json` → 工具 `sqlsugar__docs_search`),可在 gateway 對每本書分組/權限;**B** 整包一個 `docs-all.json` → `docs__docs_search`(用 `corpus` 參數),新增書不動 gateway。
- **兩個位址別搞混**:`--registry http://…:18800` 是 **CLI → gateway**;`servers/*.json` 裡的 `http://docs-mcp-server:5690/mcp/<corpus>` 是 **gateway → docs server**(用**容器名**,在 `mcpjungl` 網路內解析)。
- MCPJungle 本身**沒有內建工具**,工具都來自註冊的 server;`filesystem`/`fetch`/`time` 是註冊的官方 stdio reference server。

### 部署拓樸:DB / 網路 / build vs pull

- `MCPJUNGLE_DATABASE_URL` 的 host 填 DB 的**外部 IP**(例 `192.168.25.100:15432`),**不是容器名**;根 compose **不含 Postgres**。要自包含一顆 DB 才用 `mcpjungle/docker-compose.localtest.yml` 或 [`shared-db/`](shared-db)。
- 網路 `mcpjungl` 由 stack **自建**(`<project>_mcpjungl`),**不必先 `docker network create`**。
- gateway 映像 = vendored fork 從源碼 build:context `./MCPJungle`、`Dockerfile.fullbuild`、tag `mcpjungle-fork:latest`。
- docs-mcp 映像由 `.github/workflows/docker-publish.yml` 在 push main 時自動 build + push 到 `ghcr.io/elf-express/docs-mcp-server:latest`(pull 法用的就是它)。

## 易踩雷

- **容器名固定 `mcpjungle-server`**:已有同名 gateway 在跑會撞名,先停舊的;要接「現有」gateway 用 `docker-compose.dockhand.yml`(別再起新 gateway)。
- **跨目錄 build**:`mcpjungle/docker-compose.mcpjungle.yml` 的 docs-mcp 服務 `build: ../docs-mcp-server` — 從 `mcpjungle/` 觸發卻 build 上一層,改 docs server 的 Dockerfile 會連帶影響這裡。
- **server 名稱全域唯一(常踩)**:gateway 一啟動,`registrar` 已自動註冊 `sqlsugar fc filesystem fetch time`(`REGISTER_LIST` 預設值)。**再用 dashboard UI / CLI 註冊同名 server 會報 `duplicate key value violates unique constraint "idx_mcp_servers_name" (SQLSTATE 23505)`**——要嘛換 `name`,要嘛先在 Servers 清單把舊的 deregister。`servers/*.json` **看不出 DB 裡實際註冊了什麼**,以 gateway 執行時清單為準。
- **legacy 與多語料的關係**:舊 `sqlsugar-mcp-server` 曾有 7 個工具(notes 文檔 4 + C# 程式碼搜尋 3)。docs-mcp 已把**文檔**泛化(`docs_search`/`docs_read`/`docs_list_corpora`/`docs_cheatsheet`),並把**程式碼搜尋**以 `examples` capability 收編成 `docs_code_search`/`docs_code_read`(範例碼複製進 `corpora/sqlsugar/examples/`,legacy 的 `examples/` 保留不動);另加 `docs_outline`/`docs_symbol`。舊 standalone server 仍可獨立回退。
- Windows / PowerShell 環境:README 範例多為 bash,設環境變數請改 `$env:VAR="..."`;`docs-mcp-server` 的 `npm run clean`(`rm -rf`)在 PowerShell 不通。

## CI / commit 規範

- [`.github/workflows/ci.yml`](.github/workflows/ci.yml):`basics`(**Conventional Commits** PR 檢查、>5MB 大檔擋、機密掃描)+ `build-test` matrix + PR 時 docker build verify。
- `build-test` matrix **目前只涵蓋 `fc-designer-mcp` 與 `sqlsugar-mcp`**;核心 `docs-mcp-server` 的 vitest 不在此 matrix,改它後請在本機 `npm test`。
- 提交訊息走 **Conventional Commits**(`feat:` / `fix:` / `deploy:` …),否則 PR 會被擋。
