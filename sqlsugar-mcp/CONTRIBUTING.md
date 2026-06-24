# 貢獻指南 (Contributing Guide)

感謝你對本專案的貢獻!為了維持團隊一致性,請務必遵循以下流程。

> 本規範衍生自團隊 [`team-project-template`](https://github.com/elf-express/team-project-template)。

---

## 🌳 分支策略:雙分支環境模型

```
main ───●───●───●───●───●─────────●───►  (開發主幹)
         \           \             │
          ●───●───●   ●─────●      ↓ PR (release: vX.Y.Z)
          feature    fix
                                 release ───●───►  (發版分支)
                                            ↓ 自動 tag + Docker 映像
```

### 主分支

- **`main`**:開發主幹,所有 feature/fix PR 合進來,永遠保持可發布狀態
- **`release`**:發版分支,僅接受來自 `main` 的合併,對應正式生產映像

### 工作分支

| 分支 | 命名 | 來源 | 合併回 |
| --- | --- | --- | --- |
| `feature/<簡述>` | 新功能 | `main` | `main` |
| `fix/<簡述>` | Bug 修復 | `main` | `main` |
| `hotfix/<簡述>` | 線上緊急修補 | `main`(或 `release`) | `main` → `release` |
| `refactor/<簡述>` | 重構 | `main` | `main` |
| `docs/<簡述>` | 文件變更 | `main` | `main` |
| `chore/<簡述>` | 雜項 | `main` | `main` |

---

## 📝 Commit 訊息

採用 **Conventional Commits** 規範:

```
<type>(<scope>): <subject>
```

| Type | 用途 |
| --- | --- |
| `feat` | 新功能 |
| `fix` | Bug 修復 |
| `docs` | 文件變更 |
| `refactor` | 重構(不改變行為) |
| `perf` | 效能改善 |
| `test` | 測試相關 |
| `build` | 建構/相依套件 |
| `ci` | CI 設定 |
| `chore` | 雜項 |

範例:

```
feat(mcp): 新增 fulltext 搜尋 tool
fix(docker): 修正 healthcheck 在 alpine 缺少 wget
docs(saas): 補充分庫主鍵策略說明
```

---

## 🔄 日常開發流程(feature → main)

### 1. 從 `main` 建立新分支

```bash
git checkout main
git pull origin main
git checkout -b feature/your-feature-name
```

### 2. 開發與提交

- 小步快跑,每完成一個邏輯單位就 commit
- Commit 訊息遵循規範
- 推送前自我 review(`git diff main...HEAD`)

### 3. 推送與建立 PR

```bash
git push -u origin feature/your-feature-name
```

於 GitHub 開 PR:**Base: `main`** ← **Compare: `feature/xxx`**,填寫 PR 模板所有欄位。

### 4. Code Review

- 至少需要 **1 位** 同儕 approve
- 所有 CI checks 必須通過
- 解決所有 review comments

### 5. 合併到 main

採用 **Squash and merge**,保持 `main` 歷史乾淨。合併後刪除 feature 分支。

---

## 🚀 發版流程(main → release → Docker 映像)

### 1. 準備發版(在 main 上)

```bash
git checkout main
git pull origin main

# 編輯 CHANGELOG.md,將 [Unreleased] 改為 [v1.2.0] - YYYY-MM-DD
git add CHANGELOG.md
git commit -m "chore(release): prepare v1.2.0"
git push origin main
```

### 2. 開立 release PR

於 GitHub 開 PR:**Base: `release`** ← **Compare: `main`**

**PR 標題必須符合此格式**(CI 會檢查、release.yml 會解析):

```
release: v1.2.0
```

或加描述:

```
release: v1.2.0 - 新增 fulltext 搜尋
```

### 3. Review 與合併

- 由 Tech Lead review
- 合併方式採用 **Create a merge commit**(**不要 Squash**,需要保留 release 來源)
- 合併後自動:
  - `release.yml`:從 commit 訊息抓版本號、建立 tag `v1.2.0`、產生 release notes、建立 GitHub Release
  - `docker-publish.yml`:被 tag 觸發,建構並推送 `ghcr.io/elf-express/sqlsugar-mcp:v1.2.0` 與 `:latest`

### 4. 手動補救(如自動發版失敗)

至 GitHub Actions → `Release` workflow → `Run workflow`,輸入版本號手動觸發。

---

## 🚨 Hotfix 流程

| 流程 | 來源分支 | 適用情境 |
| --- | --- | --- |
| **標準** | `main` | `main` 與 `release` 差異不大;走 `main → hotfix → main → release` |
| **快速** | `release` | `main` 已有大量未發版變更;走 `release → hotfix → release`,**務必同步 cherry-pick 回 main** |

> ⚠️ 選擇前先 `git log origin/release..origin/main --oneline` 確認兩分支差距。

---

## ✅ PR 提交前自我檢查

### 一般 PR(→ main)

- [ ] 本機所有測試通過
- [ ] 已執行 lint / format
- [ ] 已自我 review diff
- [ ] PR 標題符合 Conventional Commits
- [ ] PR 描述清楚說明變更內容與動機
- [ ] 已連結相關 Issue(如有)
- [ ] 影響使用者的變更已更新 `CHANGELOG.md` 的 `[Unreleased]` 區塊
- [ ] 影響部署/設定的變更已更新 README 或部署文件

### Release PR(main → release)

- [ ] `main` 上 CI 全部綠燈
- [ ] `CHANGELOG.md` 已將 `[Unreleased]` 改為對應版本 + 日期
- [ ] PR 標題符合 `release: vX.Y.Z` 格式
- [ ] PR 描述列出本次發版重點
- [ ] Tag 號碼未與既有 tag 重複

---

## 🚫 不被接受的 PR

- 未通過 CI
- 包含未解決的 merge conflicts
- 一個 PR 混合多個無關變更
- Commit 訊息不符規範
- 缺少必要的測試(如新增功能)
- Release PR 標題不符 `release: vX.Y.Z` 格式
