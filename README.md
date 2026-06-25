# mcp-library

多個 MCP server 的統一目錄(monorepo)。文檔查詢類已收斂為單一**多語料** server [`docs-mcp-server`](./docs-mcp-server),統一透過 **MCPJungle** gateway 對外。**根目錄一個** `**docker compose up**` **即可拉起全部。**

## 結構 / 服務一覽

| 子目錄 | 角色 | 說明 |
| --- | --- | --- |
| [`docs-mcp-server/`](./docs-mcp-server) | docs server(多語料,推薦) | 一個 server 掛多本書(`sqlsugar` 74 + `fc` 133);新增書 = 丟資料夾 + `corpus.json` |
| [`mcpjungle/`](./mcpjungle) | MCPJungle gateway 部署 | composes / registrar / 各 server 註冊檔(`servers/`) |
| [`shared-db/`](./shared-db) | 共用 Postgres | gateway 的 DB,在 `shared-db` 網路上 |
| [`sqlsugar-mcp/`](./sqlsugar-mcp/sqlsugar-mcp-server) · [`fc-designer-mcp/`](./fc-designer-mcp) | legacy standalone | 已被 docs-mcp 語料取代,保留可回退 |

---

## 部署:一鍵起全部(推薦)

根 `docker-compose.yml` 用 `include` 疊起 `shared-db`(Postgres)+ `mcpjungle`(gateway + docs-mcp + registrar)。

```
docker network create shared-db mcpjungl    # 一次
cp .env.example .env                         # 填 POSTGRES_PASSWORD 與 MCPJUNGLE_DATABASE_URL(密碼兩處一致)
docker compose up -d --build
```

*   起來的容器:`shared-postgres` + `mcpjungle-server`(:18800)+ `docs-mcp-server` + 一次性 registrar。
*   registrar 自動把 5 個 server 註冊上(`sqlsugar` / `fc` / `filesystem` / `fetch` / `time`)——**已沙盒實測約 18 秒**。
*   用戶端連 `http://<host>:18800/mcp`(全部)或 `http://<host>:18800/mcp/<corpus>`。
*   gateway 啟動時若 DB 還沒 ready 會短暫 `Restarting`,DB healthy 後自動接上(`restart: always`),屬正常。

**Dockhand**:新增 Git stack 指向本 repo、compose 路徑 `docker-compose.yml`,env 編輯器填 `POSTGRES_PASSWORD` 與 `MCPJUNGLE_DATABASE_URL` → git clone 後一鍵全起。(網路 `shared-db`/`mcpjungl` 需先 `docker network create` 一次。)

> 各 stack 也可**單獨部署**:詳見 [`mcpjungle/README.md`](./mcpjungle/README.md)(gateway / Dockhand 接現有 gateway / ghcr 推送)、[`shared-db/`](./shared-db)(DB)。

### 兩種部署法:build 或 pull

| 方法 | 指令 | 何時用 |
|---|---|---|
| **build**(預設) | `docker compose up -d --build` | Dockhand git clone 後在 server 現場 build;總是最新原始碼 |
| **pull**(較快) | `docker compose -f docker-compose.pull.yml up -d` | 拉 GitHub Action 已 build 好的 ghcr image,不在 server build |

`docs-mcp-server` 的 image 由 [`.github/workflows/docker-publish.yml`](./.github/workflows/docker-publish.yml) 在 push 到 main 時自動 build + push 到 `ghcr.io/elf-express/docs-mcp-server`(用內建 `GITHUB_TOKEN`,免 PAT)。Dockhand 要走 pull 法,把 stack 的 compose 路徑改成 `docker-compose.pull.yml` 即可。

> ghcr 套件預設 private:部署端(TrueNAS)pull 前需 `docker login ghcr.io`,或在 GitHub 把該 package 設 public。

### 備援架構

公司一套、家裡一套,兩網域各跑一份,任一邊斷線另一邊接手,最終都註冊到 MCPJungle 統一管理。

---

## legacy standalone

舊的兩個 standalone server(`sqlsugar-mcp` / `fc-designer-mcp`)已被 docs-mcp 的「語料」取代,不在根 compose 堆疊。若仍要單獨跑,進各自資料夾 `docker compose up -d`(token 用 `MCP_AUTH_TOKEN` / `FC_MCP_AUTH_TOKEN`,留空則公開)。

## 開發單一服務

進各子目錄(如 [`docs-mcp-server/`](./docs-mcp-server)),依該目錄 README 操作。