# mcpjungle —— 整個 library 的 MCPJungle gateway 部署

[MCPJungle](https://github.com/mcpjungle/MCPJungle) 是自架的 MCP gateway:把多個 MCP server 註冊進去,對用戶端只開一個入口,並負責命名空間(`<server>__<tool>`)、分組與存取控制。

本資料夾是**整個 mcp-library 的 gateway 部署**(站在所有 server 之上,不屬於任何單一 server):

```
mcpjungle/
  register.sh                    手動註冊(host 上用官方 mcpjungle CLI)
  registrar.sh                   一次性自動註冊容器用的腳本
  servers/                       各 server 的註冊設定檔(*.json)
  docs-mcp-server/               多語料 docs MCP server 原始碼
  books/                         書本原稿(source/)與語料(corpus/<id>/)
  gateway/                       MCPJungle 原始碼(自行維護)
```

> compose 檔都在 repo 根目錄:`compose.yaml`(正式:postgres + gateway + docs-mcp + registrar)、`compose.pull.yaml`(docs-mcp 與 registrar 改拉 ghcr)、`compose.attach.yaml`(只部署 docs-mcp + registrar,接「現有」gateway)。`.env.example` 也在根目錄。
>
> docs-mcp 的 image 以 `mcpjungle/` 為 build context、`docs-mcp-server/Dockerfile` 建置,把 `books/*/corpus/` 併成映像內的 `corpora/`;`books/*/source` 由 `.dockerignore` 排除。

## 網路 / DB

- **網路 `mcpjungl` 由本 stack 自建**(部署時自動建 `<project>_mcpjungl`,像 `immich_default` 那樣),**不必先 `docker network create`**。gateway / docs-mcp / registrar 都在這個網路。
- **DB 內建**:根 `compose.yaml` 含 `postgres` service(volume `pgdata`、不對外開 port),gateway 以 healthcheck 等它就緒。要改接既有外部 DB 才在 `.env` 設 `MCPJUNGLE_DATABASE_URL`。

## 一、一鍵起

```bash
# 在 repo 根目錄;零設定即可跑,要改預設值才 cp .env.example .env
docker compose up -d --build
```

網路自建、DB 走 IP、registrar 自動註冊都**已沙盒實測**(sqlsugar / fc / filesystem / fetch / time 共 5 個;語料現已改名為 `sqlsugar-zh-tw` / `fc-zh-tw`)。

> 容器名由 compose 依 project 產生(如 `mcp-library-mcpjungle-1`);升級時舊的固定名容器會被重建,`pgdata` volume 不變。

> 想另起一份完整堆疊測試、又不動正式堆疊?用 `docker compose -p mcp-test`,見根 [README](../README.md) 的「並存測試」。
> 要把 docs 接進你**現有**的 gateway?見下方 Dockhand 節。

## 二、註冊(自動 / 手動)

`up` 後 `registrar` 容器會**自動註冊**(見下方 GitOps)。要手動就裝官方 CLI:

```bash
brew install mcpjungle/mcpjungle/mcpjungle      # 或 GitHub Releases 下載 binary
REGISTRY=http://localhost:18800 ./register.sh   # 預設:sqlsugar-zh-tw + fc-zh-tw + nginx-en + 官方工具(filesystem/fetch/time)
# 手動等同:mcpjungle --registry http://localhost:18800 register -c ./servers/sqlsugar-zh-tw.json
```

> **別搞混兩個位址**:`--registry`(=18800)是 **CLI → gateway**;`servers/*.json` 裡的 `http://docs-mcp-server:5690/...` 是 **gateway → docs server**(容器名,gateway 在 `mcpjungl` 網路內解析)。

兩種策略:

- **A. 每本書各自註冊**(推薦):`servers/sqlsugar-zh-tw.json` + `servers/fc-zh-tw.json` → 工具 `sqlsugar-zh-tw__docs_search`、`fc-zh-tw__docs_search`。可在 gateway 對「每本書」分組/權限。server 名 = 語料 id = `<書名>-<語言>`(命名規則見 [`books/README.md`](books/README.md))。
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

1. 新增 Git stack,指向本 repo,compose 路徑填 `compose.yaml`(只拉不 build 填 `compose.pull.yaml`)。
2. 環境變數 UI 填機密(`.env` 不進 git):至少 `MCPJUNGLE_DATABASE_URL`。
3. 部署;之後 `git push` → 自動重佈,registrar 重跑(已註冊略過)。

調整註冊清單:`registrar` 的 `REGISTER_LIST`(預設 `sqlsugar-zh-tw fc-zh-tw nginx-en filesystem fetch time`)。

> **語料改名後(舊名 `sqlsugar` / `fc` → `sqlsugar-zh-tw` / `fc-zh-tw`)**:registrar 只會「新增」清單內的名字,不會移除舊名。已部署的 gateway 請在 repo 根目錄手動 `docker compose exec mcpjungle /mcpjungle deregister sqlsugar`、`deregister fc`,否則舊 server 仍指向已不存在的 `/mcp/sqlsugar`、`/mcp/fc`(docs-mcp-server 回 404)。

## 五、Dockhand(接你「現有」的 gateway)

你已有一台 MCPJungle 在跑,就**不要再起 gateway**——用根目錄的 [`compose.attach.yaml`](../compose.attach.yaml) 只部署 `docs-mcp` + `registrar`,註冊進現有 gateway(**已實測,含 redeploy 冪等**)。

1. Dockhand → 新增 Git stack,compose 路徑填 `compose.attach.yaml`(project 名固定 `mcp-library-attach`,不會和同目錄的主堆疊撞名)。
2. env:`MCPJUNGLE_NETWORK`(現有 gateway 網路完整名,預設 `mcp-library_mcpjungl`;沒設 `name:` 通常是 `<專案>_mcpjungl`)、`REGISTRY_URL`(預設 `http://mcpjungle:8080` = 本 repo 主堆疊的服務名;別的 gateway 填它在該網路內的服務名或容器名)、(選)`REGISTER_LIST`(預設 `sqlsugar-zh-tw fc-zh-tw nginx-en`)。
3. 開 webhook。

> registrar 內建**重試**(等 docs-mcp 開始監聽才註冊,避免 race)+ **冪等**(已註冊略過),redeploy 安全。

## 六、建置 / 推送 image 到 ghcr.io

自 build 的 image 為 `ghcr.io/elf-express/<name>:latest`(`docs-mcp-server` / `docs-registrar`);gateway(`mcpjungle-fork`)現場 build、`postgres` 是官方 image,都不推。三個自建映像的 tag 由 `IMAGE_TAG` 決定(預設 `latest`)。

```bash
echo "$GHCR_PAT" | docker login ghcr.io -u <github 帳號> --password-stdin   # PAT 需 packages:write 權限
docker compose build docs-mcp-server registrar    # 在 repo 根目錄
docker compose push docs-mcp-server registrar
```

推完別處即可 `docker pull ghcr.io/elf-express/docs-mcp-server:latest`;部署端要「只 pull 不 build」就用 `compose.pull.yaml`。

## 存取控制 / 認證

| 連線 | 怎麼帶 |
|---|---|
| gateway → docs server | `servers/*.json` 的 `bearer_token` = docs server 的 `MCP_AUTH_TOKEN`(兩邊一致;dev 都不設) |
| 用戶端 → gateway | dev 開放;enterprise 用 `mcpjungle create mcp-client X --allow "sqlsugar-zh-tw"` 限定每 client 能用哪些 server(需採策略 A) |

用戶端連 gateway:`http://<host>:18800/mcp`(全部),或工具分組端點 `http://<host>:18800/v0/groups/<group>/mcp`。

> 重點:**模型 B 的 `/mcp/<corpus>` 子端點 + MCPJungle = 一份部署,卻能在 gateway 把每本書當成獨立服務做命名空間與權限**。
