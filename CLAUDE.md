# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 專案定位

MCP server 的 **monorepo**。核心價值不是單一 web app,而是**用 Docker Compose + MCPJungle gateway 把多個 MCP server 整合成單一入口部署**。

精簡的 AI 部署速查另見 [AGENTS.md](AGENTS.md);各子專案有自己的 README,**要改某個 server 的行為,先讀它目錄下的 README,別直接動根 compose**。本檔聚焦「需讀多個檔案才懂的架構與機制」。

五個層次:

- [`mcpjungle/books/<書名>/`](mcpjungle/books) — 書。`source/` 是原稿與翻譯工作區(`opnsense`/`nginx`/`portabase`/`multica`,各含 `en/`、`zh-TW/`、`en+zh-TW/` 等語言版本),**不會被 server 直接讀取、不進映像**;`corpus/<書名>-<語言>/` 才是 server 讀的語料(目前 `sqlsugar-zh-tw` + `fc-zh-tw` + `nginx-en` + `opnsense-en` + `opnsense-zh-tw`,映像 build 時併入)。`nginx-en` 由在 `mcpjungle/docs-mcp-server` 執行 `npx tsx ../books/nginx/import.ts` 從 `mcpjungle/books/nginx/source/en` 產生;`opnsense-en`、`opnsense-zh-tw` 由 `npx tsx ../books/opnsense/import.ts` 從 `mcpjungle/books/opnsense/source/{en,zh-TW}` 產生;皆勿手改。
- [`mcpjungle/docs-mcp-server/`](mcpjungle/docs-mcp-server) — **核心**。多語料(corpus)文檔 MCP server,一個 server 掛多本「書」;本身不含語料。
- [`mcpjungle/gateway/`](mcpjungle/gateway) — **自行維護的 MCPJungle(源自上游 c2a2c8d)**,從源碼 build,非 pull 官方映像;把各 server 註冊進來、對用戶端只開一個入口。
- [`mcpjungle/registry/`](mcpjungle/registry) — 一次性 `registrar` 容器:書本註冊由 `corpus.json` 自動產生,加上非書本註冊檔(`filesystem`/`fetch`/`time`)。
- 根 `compose*.yaml` — [`compose.yaml`](compose.yaml) 一鍵把 postgres + gateway + docs-mcp + registrar 全拉起;`compose.pull.yaml`(docs-mcp、registrar 拉 ghcr 映像)、`compose.attach.yaml`(接現有 gateway)。compose 只有這 3 份。

## 常用命令

### 部署(根目錄,推薦入口)

```bash
cp .env.example .env                 # 選用;DB 內建,改接外部 DB 才填 MCPJUNGLE_DATABASE_URL(host 用 DB 的「IP」)
docker compose up -d --build         # build 法:現場 build,總是最新源碼
docker compose -f compose.pull.yaml up -d             # pull 法:docs-mcp 與 registrar 拉 ghcr 映像,gateway 仍現場 build
docker compose -f compose.attach.yaml up -d --build   # 只起 docs-mcp + registrar,接「現有」gateway
docker compose exec mcpjungle /mcpjungle list servers  # 看 gateway 已註冊的 server
```

並存測試(與正式堆疊同時跑,`down -v` 一定要帶 `-p mcp-test`):

```powershell
$env:MCPJUNGLE_HOST_PORT="18900"; $env:IMAGE_TAG="mcp-test"
docker compose -p mcp-test up -d --build
docker compose -p mcp-test down -v
```

### docs-mcp-server 開發(核心,`cd mcpjungle/docs-mcp-server`)

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
$env:DOCS_SCOPE="sqlsugar-zh-tw"; npm run dev   # stdio 鎖定單一語料
```

### mcpjungle gateway / registrar(根目錄)

```bash
docker compose up -d --build                           # 主檔(gateway + docs-mcp + registrar + postgres)
docker compose -f compose.pull.yaml up -d              # docs-mcp、registrar 拉 ghcr 映像
docker compose -f compose.attach.yaml up -d --build    # 只起 docs-mcp + registrar,接現有 gateway
docker compose -p mcp-test up -d --build               # 並存測試堆疊(先設 MCPJUNGLE_HOST_PORT=18900、IMAGE_TAG=mcp-test)
docker compose run --rm registrar                      # 手動重跑註冊(可加 -e REGISTER_LIST=...)
node --test "mcpjungle/registry/*.test.mjs"            # gen-book-configs / registrar.sh 測試(需 sh,Windows 用 Git Bash)
(cd mcpjungle/gateway && bash scripts/build-dashboard.sh && go build ./... && go test ./...)   # gateway;dashboard 以 go:embed 內嵌,需先 build
```

## 安裝 / 接入 AI(docs-mcp)

讓 Claude / 任何 MCP 用戶端用上 fc/sqlsugar 文檔查詢,四種接法:

- **A. 本機 stdio(最簡單)** — 先在 `mcpjungle/docs-mcp-server` 執行 `npm install && npm run build`,工作目錄建 `.mcp.json`:
  ```json
  { "mcpServers": { "docs": { "command": "node", "args": ["<repo>/mcpjungle/docs-mcp-server/dist/index.js"] } } }
  ```
  只掛單一本書加 `"env": { "DOCS_SCOPE": "fc-zh-tw" }`。npm 套件已停止發布。
- **B. 本機原始碼** — `cd mcpjungle/docs-mcp-server && npm install && npm run build`,再 stdio `npm run dev` 或 HTTP `$env:TRANSPORT="http"; npm start`(:5690,`/health` 驗)。
- **C. 遠端 / 雲端 HTTP** — 映像內建 `TRANSPORT=http`;設 `MCP_AUTH_TOKEN`、對外開 :5690、走 HTTPS。Claude 端 Settings → Connectors 填 `https://網域/mcp`(全語料)或 `/mcp/<corpus>`(單書),token 填 `Bearer <token>`。
- **D. 經 gateway** — 根 `docker compose up -d --build` 一鍵起,用戶端連 `http://<host>:18800/mcp`(詳見上方「部署」)。

接上後對 AI 說「列出可用語料」即可探索(`docs_list_corpora` 會標 sqlsugar-zh-tw=速查表/代碼範例、fc-zh-tw=符號查)。

## 架構重點(讀多檔才懂的部分)

### docs-mcp-server:多語料機制(`src/corpus.ts` + `src/index.ts`)

- 一個**語料 = `mcpjungle/books/<書名>/corpus/<id>/` 下一組 markdown**(可含分類子目錄)+ 一個選填 `corpus.json`(`title` / `description` / `capabilities`)。能力旗標:`cheatsheet`、`examples`(語料附 `examples/` 程式碼)、`symbol`(從標題建符號索引)。
- **新增一本書不改任何 `.ts`**:丟資料夾 + `corpus.json`,重啟(本機)或重新部署(雲端)即出現在 `docs_list_corpora`。命名(`<書名>-<語言>`)、目錄樹、`corpus.json` 欄位(`book`/`language`/`source`/…)與內容規則見 [`mcpjungle/books/README.md`](mcpjungle/books/README.md)。
- 工具**固定 8 個且全唯讀**,**`corpus` 是參數不是新工具**(領域再多、工具數不變);**capability-gated**——工具對所有語料都「在」,只對宣告該能力的語料生效,其餘回友善提示:
  - 無條件(所有語料):`docs_list_corpora`(探索入口)/ `docs_search` / `docs_read` / `docs_outline`(結構大綱)
  - `cheatsheet` 能力:`docs_cheatsheet`(抽速查表段落)
  - `examples` 能力:`docs_code_search` / `docs_code_read`(查語料附帶的程式碼範例,如 sqlsugar-zh-tw 的 C#)
  - `symbol` 能力:`docs_symbol`(按 API/組件名精確定位標題段落;索引含 `#`/`##`/`###`,並去 U+200B 零寬字元)
  - 目前:`sqlsugar-zh-tw` 開 `cheatsheet`+`examples`、`fc-zh-tw`、`nginx-en`、`opnsense-en`、`opnsense-zh-tw` 開 `symbol`;`docs_list_corpora` 會標每語料的能力 + 可用工具。
- `corpus` 參數型別是 `z.string()` 而非 enum(語料是執行期動態資料),未知語料在 runtime 給友善提示。
- **corpora 根目錄解析順序**(`resolveCorporaDirs`):`DOCS_CORPORA_DIR`(可用 `path.delimiter` 分隔多個)→ 打包的 `corpora/` → `../books/*/corpus/`;同 id 出現在多個根時保留先掃到的並警告。
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

- compose 內含一次性 **`registrar` 容器**:由 `mcpjungle/registry/gen-book-configs.mjs` 依各書 `corpus.json` 產生書本註冊設定 → 等 gateway 就緒 → 註冊全部書本 + `mcpjungle/registry/*.json`(filesystem/fetch/time)→ 結束(`Exited (0)` 屬正常)。`REGISTER_LIST` 有值時只註冊它列的名稱,`REGISTER_EXTRAS=0` 只註冊書本(`compose.attach.yaml` 預設)。註冊前先驗證(語料不合法、與 registry 同名、清單指到不存在的設定)→ exit 1 且不註冊任何 server;含**重試 + 冪等**,redeploy 安全。
- 書本註冊設定**不手寫**,由 `corpus.json` 自動產生;非書本註冊檔在 [`mcpjungle/registry/*.json`](mcpjungle/registry)。兩種策略:**A**(預設)每本書各自註冊(server 名 = 語料 id → 工具 `sqlsugar-zh-tw__docs_search`),可在 gateway 對每本書分組/權限;**B** 整包一個 `docs` → `docs__docs_search`(用 `corpus` 參數):設 `REGISTER_LIST=docs`(設定在 `registry/optional/docs.json`)。
- **兩個位址別搞混**:`--registry http://…:18800` 是 **CLI → gateway**;註冊設定裡的 `http://docs-mcp-server:5690/mcp/<corpus>`(`DOCS_MCP_URL` 可覆寫)是 **gateway → docs server**(用**容器名**,在 `mcpjungl` 網路內解析)。
- MCPJungle 本身**沒有內建工具**,工具都來自註冊的 server;`filesystem`/`fetch`/`time` 是註冊的官方 stdio reference server。

### 部署拓樸:DB / 網路 / build vs pull

- **DB 內建**:根 compose 含 `postgres` service(`postgres:16-alpine`,volume `pgdata`,不對外開 port)。gateway 以 `depends_on: condition: service_healthy` 等它就緒。零設定即可 `docker compose up -d --build`。
- 要改接**既有的外部 DB**:在 `.env` 設 `MCPJUNGLE_DATABASE_URL`(host 填 DB 的 IP,不是容器名)覆寫預設值即可。改內建 DB 密碼要同時改 `POSTGRES_PASSWORD` 與 `MCPJUNGLE_DATABASE_URL` 兩處。
- 網路 `mcpjungl` 由 stack **自建**(`<project>_mcpjungl`),**不必先 `docker network create`**。
- gateway 映像 = 自行維護的 MCPJungle(源自上游 c2a2c8d)從源碼 build:context `./mcpjungle/gateway`、`Dockerfile.fullbuild`、tag `mcpjungle-fork:${IMAGE_TAG:-latest}`。
- docs-mcp 映像由 `.github/workflows/docker-publish.yml` 在 push main 時自動 build + push 到 `ghcr.io/elf-express/docs-mcp-server:latest`(pull 法用的就是它)。

## 易踩雷

- **沒有 `container_name`**:容器名由 compose 依 project 產生(如 `mcp-library-mcpjungle-1`);升級時舊的固定名容器會被重建,`pgdata` volume 不變。進容器用 `docker compose exec <服務名>`;要接「現有」gateway 用 `compose.attach.yaml`(別再起新 gateway)。可覆寫 `MCPJUNGLE_HOST_PORT`(預設 18800)、`IMAGE_TAG`(預設 latest)、`MCPJUNGLE_DATA_DIR`。
- **build context**:docs-mcp 與 registrar 的 build context 都是 `mcpjungle/`(Dockerfile 分別是 `docs-mcp-server/Dockerfile`、`registry/Dockerfile`),`books/*/source` 由 `mcpjungle/.dockerignore` 排除;gateway 的 context 是 `mcpjungle/gateway/`。
- **server 名稱全域唯一(常踩)**:gateway 一啟動,`registrar` 已自動註冊全部書本(`sqlsugar-zh-tw fc-zh-tw nginx-en opnsense-en opnsense-zh-tw`)與 `filesystem fetch time`。**再用 dashboard UI / CLI 註冊同名 server 會報 `duplicate key value violates unique constraint "idx_mcp_servers_name" (SQLSTATE 23505)`**——要嘛換 `name`,要嘛先在 Servers 清單把舊的 deregister。repo 內的設定**看不出 DB 裡實際註冊了什麼**,以 gateway 執行時清單為準:`docker compose exec mcpjungle /mcpjungle list servers`。
- Windows / PowerShell 環境:README 範例多為 bash,設環境變數請改 `$env:VAR="..."`;`docs-mcp-server` 的 `npm run clean`(`rm -rf`)在 PowerShell 不通。

## CI / commit 規範

- [`.github/workflows/ci.yml`](.github/workflows/ci.yml) 五個 job:
  - `basics`:**Conventional Commits** PR 檢查、compose 驗證(只准 3 份、不准 `container_name`)、>5MB 大檔擋、機密掃描
  - `gateway`:`mcpjungle/gateway` 的 dashboard build + `go build` / `go test` / golangci-lint
  - `registry`:`node --test "mcpjungle/registry/*.test.mjs"`
  - `build-test`:docs-mcp-server 的 build + vitest
  - `docker-build`:PR 時 build 映像驗證(不推)
- [`.github/workflows/docker-publish.yml`](.github/workflows/docker-publish.yml):push main 時 build + push `docs-mcp-server`、`docs-registrar` 到 ghcr。
- 提交訊息走 **Conventional Commits**(`feat:` / `fix:` / `deploy:` …),否則 PR 會被擋。
- worktree 放 repo 外的 `E:\source\mcp-library-<短名>`(見 [AGENTS.md](AGENTS.md) 的 Worktree 一節)。
