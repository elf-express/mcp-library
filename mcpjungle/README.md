# mcpjungle —— 整個 library 的 MCPJungle gateway 部署

[MCPJungle](https://github.com/mcpjungle/MCPJungle) 是自架的 MCP gateway:把多個 MCP server 註冊進去,對用戶端只開一個入口,並負責命名空間(`<server>__<tool>`)、分組與存取控制。

本資料夾是**整個 mcp-library 的 gateway 部署**(站在所有 server 之上,不屬於任何單一 server):

```
mcpjungle/
  registry/                      registrar:Dockerfile、registrar.sh、gen-book-configs.mjs、gen-group-configs.mjs(+ 測試)
    *.json                       非書本 server 的註冊設定(filesystem / fetch / time),預設一起註冊
    optional/*.json              選用設定(docs = 整包一個),只在 REGISTER_LIST 點名時註冊
    groups/*.json                工具群組設定(claude-tools),註冊完 server 後自動建立
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

網路自建、內建 DB、registrar 自動註冊都**已實測**(`-p mcp-test` 並存堆疊:`sqlsugar-zh-tw` / `fc-zh-tw` / `nginx-en` / `opnsense-en` / `opnsense-zh-tw` / `stalwart-en` / `filesystem` / `fetch` / `time` 共 9 個)。

> 容器名由 compose 依 project 產生(如 `mcp-library-mcpjungle-1`);升級時舊的固定名容器會被重建,`pgdata` volume 不變。

> 想另起一份完整堆疊測試、又不動正式堆疊?用 `docker compose -p mcp-test`,見根 [README](../README.md) 的「並存測試」。
> 要把 docs 接進你**現有**的 gateway?見下方 Dockhand 節。

## 二、註冊(自動 / 手動)

`up` 後 `registrar` 容器會**自動註冊**(見下方 GitOps)。**書本的註冊設定不手寫**:registrar 啟動時由 `registry/gen-book-configs.mjs` 掃 `books/*/corpus/*/corpus.json`,每個語料產生一份(`name` = 語料 id、`url` = `${DOCS_MCP_URL}/mcp/<id>`、`description` 含 corpus.json 的 title / description 與可用工具)。

預設清單 = 全部書本 + `registry/*.json`。可調的環境變數:

| 變數 | 預設 | 說明 |
|---|---|---|
| `REGISTER_LIST` | 空 | 有值時只註冊這些名稱(依序在書本、`registry/*.json`、`registry/optional/*.json` 找) |
| `REGISTER_EXTRAS` | `1`(attach 版 `0`) | `0` = 預設清單只含書本 |
| `REGISTER_GROUPS` | `1` | `0` = 不建立工具群組(見下方「工具群組」) |
| `DOCS_MCP_URL` | `http://docs-mcp-server:5690` | 書本註冊設定的 docs server 位址 |
| `DOCS_MCP_AUTH_TOKEN` | 空 | 有值時書本註冊設定自動帶 `bearer_token` |

註冊前會先驗證:語料不合法、`registry/*.json` 與語料同名、`REGISTER_LIST` 指到不存在的設定、`registry/groups/*.json` 不合法 → 列出原因並 exit 1,**不註冊任何 server**。

手動重跑(在 repo 根目錄;冪等,已註冊的略過):

```bash
docker compose run --rm registrar
docker compose run --rm -e REGISTER_LIST="nginx-en" registrar   # 只註冊指定的
```

> **別搞混兩個位址**:`--registry`(=18800)是 **CLI → gateway**;註冊設定裡的 `http://docs-mcp-server:5690/...` 是 **gateway → docs server**(容器名,gateway 在 `mcpjungl` 網路內解析)。

兩種策略:

- **A. 每本書各自註冊**(預設):工具 `sqlsugar-zh-tw__docs_search`、`fc-zh-tw__docs_search`…。可在 gateway 對「每本書」分組/權限。server 名 = 語料 id = `<書名>-<語言>`(命名規則見 [`books/README.md`](books/README.md))。
- **B. 整包一個 `docs`**:設 `REGISTER_LIST=docs`(設定在 `registry/optional/docs.json`)→ `docs__docs_search`(用 `corpus` 參數選書)。這份是手寫的,有設 `DOCS_MCP_AUTH_TOKEN` 時要自己加 `bearer_token`。

### 工具群組

registrar 註冊完 server 後,依 `registry/groups/<name>.json` 建立 MCPJungle 工具群組(格式同 `mcpjungle create group`:`name` 須等於檔名,`included_tools` / `included_servers` 至少一項,可加 `excluded_tools`)。`included_servers` 可寫 `"@books"`,展開成全部書本 server,加書不用改群組檔。

- 群組不存在就 `create`,已存在就以 repo 設定 `update`(在 dashboard 手改的內容會被蓋回)。
- 群組引用的 server 不在 gateway 上(如 attach 版的現有 gateway 沒有 `fetch`,或 `REGISTER_LIST=docs` 時沒有各本書)→ 略過該群組並印出缺哪些,不算失敗。

目前有一個 `claude-tools`:全部書本 + `fetch` + `time`,不含 `filesystem`。用戶端改連群組端點就只看得到這些工具:

```bash
docker compose exec mcpjungle /mcpjungle list tools --group claude-tools
# 用戶端:http://<host>:18800/v0/groups/claude-tools/mcp
```

## 三、官方 stdio 工具(filesystem / fetch / time)

> **MCPJungle 本身沒有內建工具**——工具都來自註冊的 server。本 repo 的 gateway 映像由 `gateway/Dockerfile.fullbuild` 建置,執行階段以 `ghcr.io/astral-sh/uv:debian` 為底再裝 Node 22,內含 npx/uvx,可跑官方 reference server。registrar 預設一起註冊這三個(`REGISTER_EXTRAS=0` 可略過):

| 設定檔 | 命令 | 說明 |
|---|---|---|
| `registry/filesystem.json` | `npx @modelcontextprotocol/server-filesystem /host` | 讀 gateway 容器內 `/host`(= `MCPJUNGLE_DATA_DIR` 掛載,唯讀) |
| `registry/fetch.json` | `uvx mcp-server-fetch` | 抓網頁轉 markdown |
| `registry/time.json` | `uvx mcp-server-time --local-timezone=Asia/Taipei` | 目前時間 / 時區轉換 |

要 **github** 等**需 token** 的:照 stdio 格式加 `env` 欄位放進 `registry/optional/`(只在 `REGISTER_LIST` 點名時註冊,以免無 token 失敗;注意 token 會烤進 registrar 映像):

```json
{ "name": "github", "transport": "stdio", "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-github"],
  "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "你的PAT" } }
```

## 四、GitOps 自動部署(Portainer / Komodo / Dockge…)

compose 內含一次性 `registrar` 容器:`docker compose up` 後它等 gateway 就緒、自動註冊所有 server,然後結束(`Exited (0)` 正常)。**加書不必改 compose 或註冊檔,重新部署即自動註冊。**

1. 新增 Git stack,指向本 repo,compose 路徑填 `compose.yaml`(只拉不 build 填 `compose.pull.yaml`)。
2. 環境變數 UI 填機密(`.env` 不進 git):可全部留空(DB 內建);要接外部 DB 才填 `MCPJUNGLE_DATABASE_URL`,要開認證才填 `DOCS_MCP_AUTH_TOKEN`。
3. 部署;之後 `git push` → 自動重佈,registrar 重跑(已註冊略過)。

調整註冊清單:`REGISTER_LIST` / `REGISTER_EXTRAS`(見第二節)。

> **語料改名後(舊名 `sqlsugar` / `fc` → `sqlsugar-zh-tw` / `fc-zh-tw`)**:registrar 只會「新增」,不會移除舊名。已部署的 gateway 請在 repo 根目錄手動 `docker compose exec mcpjungle /mcpjungle deregister sqlsugar`、`deregister fc`,否則舊 server 仍指向已不存在的 `/mcp/sqlsugar`、`/mcp/fc`(docs-mcp-server 回 404)。

## 五、Dockhand(接你「現有」的 gateway)

你已有一台 MCPJungle 在跑,就**不要再起 gateway**——用根目錄的 [`compose.attach.yaml`](../compose.attach.yaml) 只部署 `docs-mcp` + `registrar`,註冊進現有 gateway(**已實測,含 redeploy 冪等**)。

1. Dockhand → 新增 Git stack,compose 路徑填 `compose.attach.yaml`(project 名固定 `mcp-library-attach`,不會和同目錄的主堆疊撞名)。
2. env:`MCPJUNGLE_NETWORK`(現有 gateway 網路完整名,預設 `mcp-library_mcpjungl`;沒設 `name:` 通常是 `<專案>_mcpjungl`)、`REGISTRY_URL`(預設 `http://mcpjungle:8080` = 本 repo 主堆疊的服務名;別的 gateway 填它在該網路內的服務名或容器名)、(選)`REGISTER_EXTRAS`(預設 `0` = 只註冊書本,書本清單由 corpus.json 自動產生)或 `REGISTER_LIST`。
3. 開 webhook。

> **從 E-131 之前的 `mcpjungle/docker-compose.dockhand.yml` 升上來**:該檔預設網路是 `mcpjungl`,`compose.attach.yaml` 的預設改成 `mcp-library_mcpjungl`。沒設 `MCPJUNGLE_NETWORK` 會報 `network mcp-library_mcpjungl declared as external, but could not be found`——設成現有 gateway 的實際網路名(`docker network ls | grep mcpjungl`);主機上沒有 gateway 就改用 `compose.yaml` 一鍵全起。

> registrar 內建**重試**(等 docs-mcp 開始監聽才註冊,避免 race)+ **冪等**(已註冊略過),redeploy 安全。

## 六、建置 / 推送 image 到 ghcr.io

推到 ghcr 的只有 `ghcr.io/elf-express/docs-mcp-server` 與 `ghcr.io/elf-express/docs-registrar`(push main 時由 [`docker-publish.yml`](../.github/workflows/docker-publish.yml) 自動推,也可手動推)。gateway 映像 `mcpjungle-fork` 沒有發布,部署端一律現場 build;`postgres` 直接用官方 `postgres:16-alpine`。三個自建映像(gateway / docs-mcp / registrar)的 tag 由 `IMAGE_TAG` 決定(預設 `latest`)。

```bash
echo "$GHCR_PAT" | docker login ghcr.io -u <github 帳號> --password-stdin   # PAT 需 packages:write 權限
docker compose build docs-mcp-server registrar    # 在 repo 根目錄
docker compose push docs-mcp-server registrar
```

推完別處即可 `docker pull ghcr.io/elf-express/docs-mcp-server:latest`;部署端要「只 pull 不 build」就用 `compose.pull.yaml`。

## 存取控制 / 認證

| 連線 | 怎麼帶 |
|---|---|
| gateway → docs server | 設 `DOCS_MCP_AUTH_TOKEN`:docs server 的 `MCP_AUTH_TOKEN` 與 registrar 產生的書本註冊設定 `bearer_token` 同時帶上(dev 不設) |
| 用戶端 → gateway | dev 開放;enterprise 用 `mcpjungle create mcp-client X --allow "sqlsugar-zh-tw"` 限定每 client 能用哪些 server(需採策略 A) |

用戶端連 gateway:`http://<host>:18800/mcp`(全部),或工具分組端點 `http://<host>:18800/v0/groups/<group>/mcp`。

> 重點:**模型 B 的 `/mcp/<corpus>` 子端點 + MCPJungle = 一份部署,卻能在 gateway 把每本書當成獨立服務做命名空間與權限**。
