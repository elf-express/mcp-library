> **此檔案供 AI coding agents 使用，不包含一般開發者指南。**

# mcp-library AI 導引

## 專案定位

- 這是一個 MCP server monorepo，根目錄主要負責統一部署與整合。
- 主要工作是啟動 MCPJungle gateway、docs-mcp-server 以及 registrar，讓多個 MCP 服務對外呈現單一入口。
- `mcpjungle/docs-mcp-server/` 是推薦的多語料文檔查詢服務；`mcpjungle/` 是 gateway 與註冊部署。

## 主要目錄

- `mcpjungle/books/<書名>/`：書；`corpus/<id>/` 是語料，`source/` 是原稿，不進映像。
- `mcpjungle/docs-mcp-server/`：核心多語料 docs MCP server（不含語料）。
- `mcpjungle/gateway/`：自行維護的 MCPJungle gateway（從源碼 build）。
- `mcpjungle/registry/`：registrar 與非書本 server 註冊檔。

## 常用命令

- `docker compose up -d --build`：在 root 啟動整個 stack（gateway + docs-mcp + registrar）。
- `docker compose -f compose.pull.yaml up -d`：docs-mcp 與 registrar 從 GHCR pull image（gateway 仍現場 build）。
- `docker compose -f compose.attach.yaml up -d --build`：只起 docs-mcp + registrar，註冊進現有 gateway。
- `docker compose -p mcp-test`（搭配 `MCPJUNGLE_HOST_PORT=18900`、`IMAGE_TAG=mcp-test`）：與正式堆疊並存的完整測試堆疊；`down -v` 一定要帶 `-p mcp-test`。

## 使用指引

- compose 只有根目錄 3 份（`compose.yaml`、`compose.pull.yaml`、`compose.attach.yaml`），CI 會擋其他 compose 檔與 `container_name`。
- 根 compose 已內建 Postgres；要改接外部 DB 才設 `MCPJUNGLE_DATABASE_URL`，host 用 DB 的 IP（例如 `192.168.25.100:15432`），不是容器名稱。
- `compose.attach.yaml` 用於將 `docs-mcp` 註冊至現有 MCPJungle gateway，不會建立新的 gateway。
- 書本的 MCPJungle 註冊設定由 registrar 依各書 `corpus.json` 自動產生，不手寫；非書本註冊檔在 `mcpjungle/registry/*.json`。手動重跑註冊用 `docker compose run --rm registrar`（可帶 `-e REGISTER_LIST=...`）。

## Worktree

- worktree 一律放在 repo 外的同層目錄 `E:\source\mcp-library-<短名>`，不要開在 repo 目錄裡面（會被當成未追蹤檔，也會被 docker build context 掃進去）。
- 開法：`git -C E:\source\mcp-library worktree add E:\source\mcp-library-<短名> -b <分支> origin/main`；PR 合併後 `git -C E:\source\mcp-library worktree remove E:\source\mcp-library-<短名>`。
- 例外：Orca 開的 worktree 放在 repo 內的 `.ocrca\worktrees`（「工作樹位置」填相對路徑 `.ocrca\worktrees`，Orca 會再開 `<專案名>\<工作樹名>`）。`/.ocrca/` 已列入 `.gitignore`；docker build context 是 `mcpjungle/` 與 `mcpjungle/gateway/`，不含它。主倉庫勿跑 `git clean -x`，會連 worktree 一起刪掉。
- 新 worktree 的設定腳本放在根目錄 [`orca.yaml`](orca.yaml)（`scripts.setup`，團隊共用）：裝 docs-mcp-server 依賴並 build，主倉庫有 `.env` 時一併複製。要改 gateway 的 worktree，另外跑 `(cd mcpjungle/gateway && bash scripts/build-dashboard.sh)`。

## 開發建議

- 若修改 `mcpjungle/docs-mcp-server`，同時參考 `mcpjungle/docs-mcp-server/README.md` 與其 package script。
- 若修改 gateway 註冊流程或設定，請參考 `mcpjungle/README.md` 以及 `mcpjungle/registry/`（`registrar.sh`、`gen-book-configs.mjs`，測試 `node --test "mcpjungle/registry/*.test.mjs"`）。
- 容器名由 compose 依 project 產生（如 `mcp-library-mcpjungle-1`），進容器用 `docker compose exec mcpjungle ...`，不要寫死容器名。

## 重要文件

- `README.md`
- `mcpjungle/README.md`
- `mcpjungle/books/README.md`
- `compose.yaml`
- `compose.pull.yaml`
- `compose.attach.yaml`

## 對 AI 的額外提醒

- 本 repo 的核心不是一般前端/後端 web app，而是基於 Docker compose 與 MCPJungle 的部署與整合。
- 若需要修改具體 server 行為，應該先確認該服務目錄的 README 和 package script，而不是直接在根目錄改 compose 邏輯。
- 若遇到 `docs-mcp-server` 或 `mcpjungle` 專案範圍，請優先參考對應子目錄中的文件。