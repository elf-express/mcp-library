# mcp-library

多個 MCP server 的統一目錄(monorepo)。文檔查詢類已收斂為單一**多語料** server [`docs-mcp-server`](./docs-mcp-server),統一透過 **MCPJungle** gateway 對外。**根目錄一個 `docker compose up` 即可拉起全部。**

## 結構 / 服務一覽

| 子目錄 | 角色 | 說明 |
| --- | --- | --- |
| [`docs-mcp-server/`](./docs-mcp-server) | docs server(多語料,推薦) | 一個 server 掛多本書(`sqlsugar` 74 + `fc` 133);新增書 = 丟資料夾 + `corpus.json` |
| [`mcpjungle/`](./mcpjungle) | MCPJungle gateway 部署 | composes / registrar / 各 server 註冊檔(`servers/`) |
| [`shared-db/`](./shared-db) | (選用)內建 Postgres | 預設 DB 走**外部 IP**、用不到這個;想 stack 內建一顆 DB 才用 |
| [`sqlsugar-mcp/`](./sqlsugar-mcp/sqlsugar-mcp-server) · [`fc-designer-mcp/`](./fc-designer-mcp) | legacy standalone | 已被 docs-mcp 語料取代,保留可回退 |

---

## 部署:一鍵起全部(推薦)

根 `docker-compose.yml` 起 `mcpjungle`(gateway)+ `docs-mcp` + `registrar`。**DB 走外部 IP、網路由 stack 自建**——不必 `docker network create`、不含 Postgres。

```bash
cp .env.example .env          # 填 MCPJUNGLE_DATABASE_URL(host 用你 DB 的 IP)
docker compose up -d --build
```

* 起來的容器:`mcpjungle-server`(:18800)+ `docs-mcp-server` + 一次性 registrar;網路自動建 `<stack>_mcpjungl`(像 `immich_default` 那樣)。
* registrar 自動把 5 個 server 註冊上(`sqlsugar` / `fc` / `filesystem` / `fetch` / `time`)——**已沙盒實測約 15 秒**。
* `MCPJUNGLE_DATABASE_URL` 的 host 用你 DB 的 **IP**(例 `192.168.25.100:15432`),**不是**容器名。
* 用戶端連 `http://<host>:18800/mcp`(全部)或 `http://<host>:18800/mcp/<corpus>`。

**Dockhand**:新增 Git stack 指向本 repo、compose 路徑 `docker-compose.yml`,env 編輯器填 `MCPJUNGLE_DATABASE_URL` → 一鍵全起(網路 stack 自建,**不用先 `docker network create`**)。

> ⚠️ container 名是 `mcpjungle-server`:若你已有**同名的 gateway** 在跑,先停掉舊的再起這個(否則撞名)。
> 想把 docs 接進**現有** gateway(而非起新的)?見 [`mcpjungle/README.md`](./mcpjungle/README.md) 的 Dockhand 節。

### 兩種部署法:build 或 pull

| 方法 | 指令 | 何時用 |
| --- | --- | --- |
| **build**(預設) | `docker compose up -d --build` | git clone 後在 server 現場 build,總是最新原始碼 |
| **pull**(較快) | `docker compose -f docker-compose.pull.yml up -d` | 拉 GitHub Action 建好的 ghcr image,不在 server build |

`docs-mcp-server` image 由 [`.github/workflows/docker-publish.yml`](./.github/workflows/docker-publish.yml) 在 push 到 main 時自動 build + push 到 ghcr。pull 法把 compose 路徑改 `docker-compose.pull.yml` 即可(ghcr 是 private 的話,部署端先 `docker login ghcr.io`)。

### 備援架構

公司一套、家裡一套,兩網域各跑一份,任一邊斷線另一邊接手,最終都註冊到 MCPJungle 統一管理。

---

## legacy standalone

舊的 `sqlsugar-mcp` / `fc-designer-mcp` standalone server 已被 docs-mcp 的「語料」取代,不在根 compose 堆疊。要單獨跑就進各自資料夾 `docker compose up -d`(token 用 `MCP_AUTH_TOKEN` / `FC_MCP_AUTH_TOKEN`)。

## 開發單一服務

進各子目錄(如 [`docs-mcp-server/`](./docs-mcp-server)),依該目錄 README 操作。
