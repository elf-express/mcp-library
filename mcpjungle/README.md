# mcpjungle —— 整個 library 的 MCPJungle gateway 部署

[MCPJungle](https://github.com/mcpjungle/MCPJungle) 是自架的 MCP gateway:把多個 MCP server 註冊進去,對用戶端只開一個入口,並負責命名空間(`<server>__<tool>`)、分組與存取控制。

本資料夾是**整個 mcp-library 的 gateway 部署**(站在所有 server 之上,不屬於任何單一 server):

```
mcpjungle/
  docker-compose.mcpjungle.yml   正式:gateway + docs-mcp + registrar(DB 走外部 IP、網路自建)
  docker-compose.localtest.yml   本機自包含測試(內含 postgres、自建網路)
  docker-compose.dockhand.yml    只部署 docs-mcp + registrar,接「現有」gateway(Dockhand 用)
  .env.example                   機密範本(複製成 .env)
  register.sh                    手動註冊(host 上用官方 mcpjungle CLI)
  registrar.sh                   一次性自動註冊容器用的腳本
  servers/                       各 server 的註冊設定檔(*.json)
```

> docs-mcp 的 image 由 `../docs-mcp-server` 建置(compose 內 `build: ../docs-mcp-server`)。

## 網路 / DB

- **網路 `mcpjungl` 由本 stack 自建**(部署時自動建 `<project>_mcpjungl`,像 `immich_default` 那樣),**不必先 `docker network create`**。gateway / docs-mcp / registrar 都在這個網路。
- **DB 走外部 IP**:`MCPJUNGLE_DATABASE_URL` 的 host 填你 DB 的 **IP**(例 `192.168.25.100:15432`),本 compose **不含 Postgres**。

## 一、一鍵起

```bash
cd mcpjungle
cp .env.example .env                        # 填 MCPJUNGLE_DATABASE_URL(host 用你 DB 的 IP)
docker compose -f docker-compose.mcpjungle.yml up -d --build
```

網路自建、DB 走 IP、registrar 自動註冊都**已沙盒實測**(sqlsugar / fc / filesystem / fetch / time 共 5 個)。

> ⚠️ container 名 `mcpjungle-server`:已有同名 gateway 在跑要先停掉(否則撞名)。

> 想全自包含測試(內含 postgres)?用 [`docker-compose.localtest.yml`](./docker-compose.localtest.yml)。
> 要把 docs 接進你**現有**的 gateway?見下方 Dockhand 節。

## 二、註冊(自動 / 手動)

`up` 後 `registrar` 容器會**自動註冊**(見下方 GitOps)。要手動就裝官方 CLI:

```bash
brew install mcpjungle/mcpjungle/mcpjungle      # 或 GitHub Releases 下載 binary
REGISTRY=http://localhost:18800 ./register.sh   # 預設:sqlsugar + fc + 官方工具(filesystem/fetch/time)
# 手動等同:mcpjungle --registry http://localhost:18800 register -c ./servers/sqlsugar.json
```

> **別搞混兩個位址**:`--registry`(=18800)是 **CLI → gateway**;`servers/*.json` 裡的 `http://docs-mcp-server:5690/...` 是 **gateway → docs server**(容器名,gateway 在 `mcpjungl` 網路內解析)。

兩種策略:

- **A. 每本書各自註冊**(推薦):`servers/sqlsugar.json` + `servers/fc.json` → 工具 `sqlsugar__docs_search`、`fc__docs_search`。可在 gateway 對「每本書」分組/權限。
- **B. 整包一個 `docs`**:改註冊 `servers/docs-all.json` → `docs__docs_search`(用 `corpus` 參數選書)。新增書不必動 gateway。

## 三、官方 stdio 工具(filesystem / fetch / time)

> **MCPJungle 本身沒有內建工具**——工具都來自註冊的 server。`-stdio` image 內含 npx/uvx,可跑官方 reference server。`register.sh` 預設一起註冊這三個(`WITH_TOOLS=0` 可略過):

| 設定檔 | 命令 | 說明 |
|---|---|---|
| `servers/filesystem.json` | `npx @modelcontextprotocol/server-filesystem /host` | 讀 gateway 容器內 `/host`(= `MCPJUNGLE_DATA_DIR` 掛載,唯讀) |
| `servers/fetch.json` | `uvx mcp-server-fetch` | 抓網頁轉 markdown |
| `servers/time.json` | `uvx mcp-server-time --local-timezone=Asia/Taipei` | 目前時間 / 時區轉換 |

要 **github** 等**需 token** 的:照 stdio 格式加 `env` 欄位放進 `servers/`(沒進自動註冊,以免無 token 失敗):

```json
{ "name": "github", "transport": "stdio", "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-github"],
  "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "你的PAT" } }
```

## 四、GitOps 自動部署(Portainer / Komodo / Dockge…)

compose 內含一次性 `registrar` 容器:`docker compose up` 後它等 gateway 就緒、自動註冊所有 server,然後結束(`Exited (0)` 正常)。**已實測約 20 秒內自動註冊 5 個,免手動 `register.sh`。**

1. 新增 Git stack,指向本 repo,compose 路徑填 `mcpjungle/docker-compose.mcpjungle.yml`。
2. 環境變數 UI 填機密(`.env` 不進 git):至少 `MCPJUNGLE_DATABASE_URL`。
3. 部署;之後 `git push` → 自動重佈,registrar 重跑(已註冊略過)。

調整註冊清單:`registrar` 的 `REGISTER_LIST`(預設 `sqlsugar fc filesystem fetch time`)。

## 五、Dockhand(接你「現有」的 gateway)

你已有一台 MCPJungle 在跑,就**不要再起 gateway**——用 [`docker-compose.dockhand.yml`](./docker-compose.dockhand.yml) 只部署 `docs-mcp` + `registrar`,註冊進現有 gateway(**已實測,含 redeploy 冪等**)。

1. Dockhand → 新增 Git stack,compose 路徑填 `mcpjungle/docker-compose.dockhand.yml`。
2. env:`MCPJUNGLE_NETWORK`(現有 gateway 網路完整名;沒設 `name:` 通常是 `<專案>_mcpjungl`)、`REGISTRY_URL`(預設 `http://mcpjungle-server:8080`)、(選)`REGISTER_LIST`(預設 `sqlsugar fc`)。
3. 開 webhook。

> registrar 內建**重試**(等 docs-mcp 開始監聽才註冊,避免 race)+ **冪等**(已註冊略過),redeploy 安全。

## 六、建置 / 推送 image 到 ghcr.io

自 build 的 image 為 `ghcr.io/elf-express/<name>:latest`(`docs-mcp-server` / `sqlsugar-mcp` / `fc-designer-mcp`);`mcpjungle`/`postgres` 是官方 image 不推。

```bash
echo "$GHCR_PAT" | docker login ghcr.io -u <github 帳號> --password-stdin   # PAT 需 packages:write 權限
docker compose -f docker-compose.mcpjungle.yml build docs-mcp
docker compose -f docker-compose.mcpjungle.yml push docs-mcp
```

推完別處即可 `docker pull ghcr.io/elf-express/docs-mcp-server:latest`;部署端要「只 pull 不 build」就把 `docs-mcp` 服務的 `build:` 移除。

## 存取控制 / 認證

| 連線 | 怎麼帶 |
|---|---|
| gateway → docs server | `servers/*.json` 的 `bearer_token` = docs server 的 `MCP_AUTH_TOKEN`(兩邊一致;dev 都不設) |
| 用戶端 → gateway | dev 開放;enterprise 用 `mcpjungle create mcp-client X --allow "sqlsugar"` 限定每 client 能用哪些 server(需採策略 A) |

用戶端連 gateway:`http://<host>:18800/mcp`(全部),或工具分組端點 `http://<host>:18800/v0/groups/<group>/mcp`。

> 重點:**模型 B 的 `/mcp/<corpus>` 子端點 + MCPJungle = 一份部署,卻能在 gateway 把每本書當成獨立服務做命名空間與權限**。
