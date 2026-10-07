# mcp-library

多個 MCP server 的統一目錄(monorepo)。文檔查詢類已收斂為單一**多語料** server [`mcpjungle/docs-mcp-server`](./mcpjungle/docs-mcp-server),統一透過 **MCPJungle** gateway 對外。**根目錄一個 `docker compose up` 即可拉起全部。**

## 結構 / 服務一覽

| 子目錄 | 角色 | 說明 |
| --- | --- | --- |
| [`mcpjungle/docs-mcp-server/`](./mcpjungle/docs-mcp-server) | docs server(多語料,推薦) | 一個 server 掛多本書(`sqlsugar-zh-tw` 74 + `fc-zh-tw` 133 + `nginx-en` 149);新增書 = 丟資料夾 + `corpus.json` |
| [`mcpjungle/`](./mcpjungle) | MCPJungle gateway 部署 | registrar(書本註冊由 `corpus.json` 自動產生)/ 非書本註冊檔(`registry/`) |

## 目錄結構

> 重整中(E-122):本節描述重整完成後的結構,各 Task 合併前實際路徑可能還是舊的。

```
mcp-library/
├─ .github/workflows/      ci.yml、docker-publish.yml
├─ README.md · CLAUDE.md · AGENTS.md
├─ compose.yaml            主檔:postgres + gateway + docs-mcp + registrar(現場 build)
├─ compose.pull.yaml       docs-mcp、registrar 改拉 ghcr 映像
├─ compose.attach.yaml     只起 docs-mcp + registrar,接現有 gateway
├─ .env.example · nginx.example.conf
└─ mcpjungle/
    ├─ gateway/            MCPJungle(源自上游 c2a2c8d,自 2026-10 起獨立維護)
    ├─ books/<書名>/
    │   ├─ source/         原稿與翻譯(不打包進映像)
    │   ├─ corpus/<id>/    語料:corpus.json + markdown(id = <書名>-<語言>)
    │   └─ import.ts       轉換腳本(需要時)
    ├─ docs-mcp-server/    多語料文檔 MCP server(不含語料)
    └─ registry/           非書本 MCP 註冊檔(filesystem/fetch/time…)+ registrar
```

worktree 一律放 repo 外:`E:\source\mcp-library-<短名>`。

## 加一本書

> 重整中(E-122):以下流程在 E-122 完成後生效。

只動 `mcpjungle/books/<書名>/` 一個資料夾,不改任何 `.ts`、compose 或註冊檔。

1. 原稿放 `mcpjungle/books/<書名>/source/`(選用)。
2. 建 `mcpjungle/books/<書名>/corpus/<書名>-<語言>/`,放 markdown 與 `corpus.json`(欄位見 [`mcpjungle/books/README.md`](mcpjungle/books/README.md))。`book` 要等於 `<書名>`,id 要等於 `<book>-<language 小寫>`。
3. 需要轉換時寫 `mcpjungle/books/<書名>/import.ts`(參考 `books/nginx/import.ts`),在 `mcpjungle/docs-mcp-server` 執行 `npx tsx ../books/<書名>/import.ts`。
4. 驗證:
   ```bash
   cd mcpjungle/docs-mcp-server && npm ci && npm test
   node ../registry/gen-book-configs.mjs ../books "$(mktemp -d)"   # 印出的 id 要包含新書
   ```
5. 開 PR。合併後重新部署(`docker compose up -d --build`),registrar 會自動註冊 `<id>`,工具名為 `<id>__docs_search` 等。

---

## 部署:一鍵起全部(推薦)

根 `compose.yaml` 起 `postgres` + `mcpjungle`(gateway)+ `docs-mcp` + `registrar`。**DB 內建、網路由 stack 自建**——不必自己準備 Postgres、不必 `docker network create`。

```bash
docker compose up -d --build   # 零設定,不必先 cp .env.example
```

* 起來的服務:`mcpjungle`(gateway,:18800)+ `docs-mcp-server` + 一次性 `registrar`;網路自動建 `<stack>_mcpjungl`(像 `immich_default` 那樣)。
* registrar 自動把 6 個 server 註冊上(`sqlsugar-zh-tw` / `fc-zh-tw` / `nginx-en` / `filesystem` / `fetch` / `time`)——**已沙盒實測約 15 秒**。
* DB 是內建的 `postgres` 服務(volume `pgdata`,不對外開 port);gateway 等它 healthy 才啟動。要改接既有外部 DB 才在 `.env` 設 `MCPJUNGLE_DATABASE_URL`。
* 用戶端連 `http://<host>:18800/mcp`(全部)或 `http://<host>:18800/mcp/<corpus>`。

**Dockhand**:新增 Git stack 指向本 repo、compose 路徑 `compose.yaml` → 一鍵全起(env 可全部留空;網路與 DB 都由 stack 自建,**不用先 `docker network create`**)。

> 容器名由 compose 依 project 產生(如 `mcp-library-mcpjungle-1`);升級時舊的固定名容器會被重建,`pgdata` volume 不變。
> 想把 docs 接進**現有** gateway(而非起新的)?用 `compose.attach.yaml`,見 [`mcpjungle/README.md`](./mcpjungle/README.md) 的 Dockhand 節。

### 兩種部署法:build 或 pull

| 方法 | 指令 | 何時用 |
| --- | --- | --- |
| **build**(預設) | `docker compose up -d --build` | git clone 後在 server 現場 build,總是最新原始碼 |
| **pull**(較快) | `docker compose -f compose.pull.yaml up -d` | docs-mcp 與 registrar 拉 GitHub Action 建好的 ghcr image(gateway 沒有發布映像,仍現場 build) |

`docs-mcp-server` 與 `docs-registrar` image 由 [`.github/workflows/docker-publish.yml`](./.github/workflows/docker-publish.yml) 在 push 到 main 時自動 build + push 到 ghcr。pull 法把 compose 路徑改 `compose.pull.yaml` 即可(ghcr 是 private 的話,部署端先 `docker login ghcr.io`)。

### 備援架構

公司一套、家裡一套,兩網域各跑一份,任一邊斷線另一邊接手,最終都註冊到 MCPJungle 統一管理。

## 並存測試

用 `-p mcp-test` 另起一份完整堆疊(含自家 gateway),port 與映像 tag 都和正式堆疊錯開,兩者可同時跑:

```powershell
# PowerShell(在 repo 根目錄)
$env:MCPJUNGLE_HOST_PORT = "18900"; $env:IMAGE_TAG = "mcp-test"; $env:MCPJUNGLE_DATA_DIR = "$PWD\mcpjungle\books"
docker compose -p mcp-test up -d --build
docker compose -p mcp-test ps -a                       # registrar 應為 Exited (0),其餘 running/healthy
docker compose -p mcp-test logs registrar              # 應註冊 6 個:sqlsugar-zh-tw fc-zh-tw nginx-en filesystem fetch time
docker compose -p mcp-test exec mcpjungle /mcpjungle list servers
curl.exe -s -o NUL -w "%{http_code}`n" http://localhost:18900/health   # 預期 200
docker compose -p mcp-test down -v
docker image rm mcpjungle-fork:mcp-test ghcr.io/elf-express/docs-mcp-server:mcp-test ghcr.io/elf-express/docs-registrar:mcp-test
Remove-Item Env:MCPJUNGLE_HOST_PORT, Env:IMAGE_TAG, Env:MCPJUNGLE_DATA_DIR
```

`down -v` 一定要帶 `-p mcp-test`,否則刪到的是正式堆疊的 `pgdata`。

---

## 開發單一服務

進各子目錄(如 [`mcpjungle/docs-mcp-server/`](./mcpjungle/docs-mcp-server)),依該目錄 README 操作。
