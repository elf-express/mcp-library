# SqlSugar-Mcp

> SqlSugar ORM 繁中文件集 + 基於 MCP 協定的文件查詢伺服器

[![CI](https://github.com/elf-express/SqlSugar-Mcp/actions/workflows/ci.yml/badge.svg)](https://github.com/elf-express/SqlSugar-Mcp/actions/workflows/ci.yml)
[![Release](https://github.com/elf-express/SqlSugar-Mcp/actions/workflows/release.yml/badge.svg)](https://github.com/elf-express/SqlSugar-Mcp/actions/workflows/release.yml)
[![Docker](https://github.com/elf-express/SqlSugar-Mcp/actions/workflows/docker-publish.yml/badge.svg)](https://github.com/elf-express/SqlSugar-Mcp/actions/workflows/docker-publish.yml)

---

## 📦 內容概要

| 模組 | 路徑 | 說明 |
| --- | --- | --- |
| **SqlSugar 文件** | 根目錄 `*.md` | SqlSugar ORM 完整繁中學習筆記(查詢、CRUD、交易、SAAS、多租戶...) |
| **MCP 伺服器** | `sqlsugar-mcp-server/` | TypeScript 實作的 MCP 協定伺服器,提供文件語意查詢 |
| **效能測試參考** | `SqlSugar-vs-EFCore效能測試-*/` | SqlSugar 與 EF Core 在 MySQL / SqlServer 的對比專案 |

---

## 🚀 快速開始

### MCP Server(Docker)

```bash
cd sqlsugar-mcp-server
cp .env.example .env       # 改 MCP_AUTH_TOKEN
docker compose up -d
curl http://localhost:5688/health
```

### MCP Server(本機開發)

```bash
cd sqlsugar-mcp-server
npm install
npm run build
node dist/index.js         # stdio mode
# 或
TRANSPORT=http PORT=5688 node dist/http.js
```

### 拉取已發版的 Docker 映像

```bash
docker pull ghcr.io/elf-express/sqlsugar-mcp:latest
docker run -d -p 5688:5688 -e MCP_AUTH_TOKEN=your-secret \
    ghcr.io/elf-express/sqlsugar-mcp:latest
```

---

## 🗂️ 文件導覽

主要文件以繁中命名,常用主題:

- **查詢**:`簡單的查詢.md` / `聯表查詢.md` / `分頁查詢，同步分頁和非同步分頁.md` / `子查詢.md`
- **CRUD**:`插入數據.md` / `更新數據.md` / `刪除數據.md` / `插入或更新Storageable.md`
- **進階**:`SAAS分庫.md` / `多租戶基礎.md` / `讀寫分離.md` / `跨庫查詢.md`
- **效能**:`大數據寫入.md` / `字元索引優化.md` / `偶發性錯誤與執行緒安全.md`

完整列表見 [`index.md`](./index.md)。

---

## 🛠️ 開發流程

本專案遵循團隊 [`team-project-template`](https://github.com/elf-express/team-project-template) 規範:

- **分支**:`main`(開發主幹) + `release`(發版分支)
- **Commit**:Conventional Commits(`feat:` / `fix:` / `docs:` / `chore:` ...)
- **PR**:必須通過 CI、至少 1 位 reviewer approve
- **發版**:從 `main` 開 PR 到 `release`,標題 `release: vX.Y.Z`,合併後自動 tag + 發 Docker 映像

詳見 [CONTRIBUTING.md](./CONTRIBUTING.md)。

---

## 📋 CI/CD

| Workflow | 觸發 | 作用 |
| --- | --- | --- |
| `ci.yml` | PR / push to `main`/`release` | Lint、build、conventional commit 檢查 |
| `release.yml` | push to `release` 或手動 | 自動 tag + 建立 GitHub Release |
| `docker-publish.yml` | tag `v*.*.*` 或 push to `main` | 建構並推送 Docker 映像至 GHCR |

---

## 📄 License

[MIT](./LICENSE) © elf-express
