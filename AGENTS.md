> **此檔案供 AI coding agents 使用，不包含一般開發者指南。**

# mcp-library AI 導引

## 專案定位

- 這是一個 MCP server monorepo，根目錄主要負責統一部署與整合。
- 主要工作是啟動 MCPJungle gateway、docs-mcp-server 以及 registrar，讓多個 MCP 服務對外呈現單一入口。
- `mcp/docs-mcp-server/` 是推薦的多語料文檔查詢服務；`mcpjungle/` 是 gateway 與註冊部署。
- `mcp/legacy/` 下的 `sqlsugar-mcp/`、`fc-designer-mcp/` 是 legacy standalone server，保留作回退或比較用途。

## 主要目錄

- `mcp/docs-mcp-server/`：核心多語料 docs MCP server。
- `mcpjungle/`：MCPJungle gateway stack、註冊器與 server 註冊設定。
- `mcp/legacy/sqlsugar-mcp/`、`mcp/legacy/fc-designer-mcp/`：legacy standalone server。

## 常用命令

- `npm install`：安裝 root 依賴。
- `npm run test:e2e`：執行 Cypress E2E 測試。
- `docker compose up -d --build`：在 root 啟動整個 stack（gateway + docs-mcp + registrar）。
- `docker compose -f docker-compose.pull.yml up -d`：從 GHCR pull image，而不是 build。

## 使用指引

- 根目錄部署時，`MCPJUNGLE_DATABASE_URL` 必須是外部 DB IP（例如 `192.168.25.100:15432`），不是容器名稱。
- root compose 不是全包含 Postgres，若需自包含測試請改用 `mcpjungle/docker-compose.localtest.yml` 或 `shared-db/docker-compose.yml`。
- `mcpjungle/docker-compose.dockhand.yml` 用於將 `docs-mcp` 註冊至現有 MCPJungle gateway，不會建立新的 gateway。
- `mcpjungle/registrar.sh` 與 `mcpjungle/register.sh` 只在需要手動註冊時使用。

## Worktree

- worktree 一律放在 repo 外的同層目錄 `E:\source\mcp-library-<短名>`,不要開在 repo 目錄裡面(會被當成未追蹤檔,也會被 docker build context 掃進去)。
- 開法:`git -C E:\source\mcp-library worktree add E:\source\mcp-library-<短名> -b <分支> origin/main`;PR 合併後 `git worktree remove`。
- 用 Orca 管理工作區時,把 Orca 的 worktree 位置設為 `E:\source\`。

## 開發建議

- 若修改 `mcp/docs-mcp-server`，同時參考 `mcp/docs-mcp-server/README.md` 與其 package script。 
- 若修改 gateway 註冊流程或設定，請參考 `mcpjungle/README.md` 以及 `mcpjungle/servers/*.json`。
- 不要在根目錄啟動同名已有容器 `mcpjungle-server`，否則會因 container 名稱衝突失敗。

## 重要文件

- `README.md`
- `mcpjungle/README.md`
- `docker-compose.yml`
- `docker-compose.pull.yml`
- `mcpjungle/docker-compose.mcpjungle.yml`
- `mcpjungle/docker-compose.dockhand.yml`

## 對 AI 的額外提醒

- 本 repo 的核心不是一般前端/後端 web app，而是基於 Docker compose 與 MCPJungle 的部署與整合。
- 若需要修改具體 server 行為，應該先確認該服務目錄的 README 和 package script，而不是直接在根目錄改 compose 邏輯。
- 若遇到 `docs-mcp-server` 或 `mcpjungle` 專案範圍，請優先參考對應子目錄中的文件。