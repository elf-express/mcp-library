# 變更紀錄 (Changelog)

本檔案遵循 [Keep a Changelog](https://keepachangelog.com/zh-TW/1.1.0/) 格式,
版本號遵循 [Semantic Versioning](https://semver.org/lang/zh-TW/)。

## [Unreleased]

### Added
- 待加入功能列於此

---

## [0.3.0] - 2026-06-12

### Changed
- **BREAKING**:MCP server 預設 port 從 `3000` 改為 `5688`,避免與 React/Next.js 等常見服務衝突。
  影響範圍:`Dockerfile`、`docker-compose.yml`、`src/http.ts` 預設值、README 範例。
  既有部署需更新環境變數 `PORT` 或 ports 映射。
- CI:`release.yml` 加入顯式 `gh workflow run docker-publish.yml`,
  解決 GITHUB_TOKEN 推送 tag 不觸發其他 workflow 的問題

---

## [0.2.0] - 2026-06-12

### Added
- 套用團隊 `team-project-template` 規範:`.editorconfig` / `.gitattributes` / `LICENSE` / `CONTRIBUTING.md` / `SECURITY.md`
- CI/CD 工作流:`ci.yml`(基礎檢查 + Node.js build)、`release.yml`(自動 tag/release)、`docker-publish.yml`(Docker 映像推送至 GHCR)
- `.github/PULL_REQUEST_TEMPLATE.md` 與 `dependabot.yml`
- 根目錄 `README.md` 作為專案導覽

### Changed
- `.gitignore` 改用團隊完整版,涵蓋 Node、.NET、Flutter、Docker
- 文件與 workflow 註解統一為繁體中文
- 升級 GitHub Actions:`actions/checkout@v6`、`docker/setup-buildx-action@v4`、`docker/setup-qemu-action@v4`、`docker/metadata-action@v6`、`webiny/action-conventional-commits@v1.4.2`

### Fixed
- CI:secret scan 排除 `examples/`、`notes/` 與效能測試目錄,避免誤判示範代碼中的本地連線字串
- Release workflow:commit 訊息不符 `release: vX.Y.Z` 格式時改為 skip 而非 fail,讓首次推送 `release` 分支或 hotfix 直推不會誤觸發版

---

## [0.1.0] - 2026-06-12

### Added
- SqlSugar ORM 繁中文件集(查詢、CRUD、交易、多租戶、SAAS 分庫等共 100+ 篇)
- `sqlsugar-mcp-server/`:基於 MCP 協定的 SqlSugar 文件查詢伺服器(TypeScript + Docker)
- `SqlSugar-vs-EFCore效能測試-{MySQL,SqlServer}/`:與 EF Core 的效能對比專案

[Unreleased]: https://github.com/elf-express/SqlSugar-Mcp/compare/v0.3.0...HEAD
[0.3.0]: https://github.com/elf-express/SqlSugar-Mcp/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/elf-express/SqlSugar-Mcp/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/elf-express/SqlSugar-Mcp/releases/tag/v0.1.0
