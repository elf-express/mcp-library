<!--
  PR 標題請遵循 Conventional Commits 格式:
  <type>(<scope>): <subject>

  範例:
    feat(mcp): 新增 fulltext 搜尋 tool
    fix(docker): 修正 healthcheck 在 alpine 缺少 wget
    docs(saas): 補充分庫主鍵策略說明
-->

## 📝 變更摘要

<!-- 1~3 句話說明這個 PR 做了什麼 -->

## 💡 變更動機

<!-- 為什麼要做這個變更?解決什麼問題? -->

## 🏷️ 變更類型

- [ ] `feat`     新功能
- [ ] `fix`      修復 Bug
- [ ] `refactor` 重構(不改變行為)
- [ ] `perf`     效能改善
- [ ] `docs`     文件變更
- [ ] `test`     測試
- [ ] `build`    建構 / 相依套件
- [ ] `ci`       CI 設定
- [ ] `chore`    雜項

## 🎯 影響範圍

- [ ] SqlSugar 文件(`*.md`)
- [ ] MCP 伺服器(`sqlsugar-mcp-server/`)
- [ ] 效能測試專案
- [ ] CI/CD
- [ ] 其他:

## 🧪 測試方式

<!-- 如何驗證此變更正確?提供重現步驟、預期結果 -->

1.
2.
3.

## 🐳 Docker 映像影響(如有)

- [ ] 無 Docker 變更
- [ ] 修改了 `sqlsugar-mcp-server/Dockerfile`
- [ ] 修改了 `docker-compose.yml` / 環境變數
- [ ] 需要更新使用者的部署設定

## ✅ 提交前檢查清單

- [ ] PR 標題符合 Conventional Commits
- [ ] 本機所有測試通過(`npm run build` 在 `sqlsugar-mcp-server/`)
- [ ] 已自我 review diff
- [ ] 沒有夾帶機密資訊(密碼、token)
- [ ] 沒有夾帶與本次目的無關的變更
- [ ] 影響使用者的變更已更新 `CHANGELOG.md` 的 `[Unreleased]` 區塊
- [ ] 影響部署的變更已更新 `README.md`

## 🔗 相關連結

- Closes #
- Refs #
