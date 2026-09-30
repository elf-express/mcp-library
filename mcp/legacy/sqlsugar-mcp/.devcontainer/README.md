# GitHub Codespaces 啟動 MCP Server

點 repo 首頁的 `<> Code` → `Codespaces` → `Create codespace on main`,
Codespace 會自動拉 `ghcr.io/elf-express/sqlsugar-mcp:latest` 映像並啟動 MCP server 於 port 5688。

## 取得公開 URL

1. Codespace 開啟後,看下方 `PORTS` 頁籤
2. port `5688` 旁邊會有 `Local Address` 與 `Forwarded Address`(`https://xxx-5688.app.github.dev`)
3. 右鍵 → `Port Visibility` → 改為 `Public`(預設 Private 只有你能存取)

## 設定 Token(可選)

GitHub → repo Settings → Secrets and variables → **Codespaces** → New repository secret:
- Name: `MCP_AUTH_TOKEN`
- Value: 一段長亂數(`openssl rand -hex 32`)

加完後 stop 並重啟 codespace。

## 連線測試

從本機:
```bash
curl https://<your-codespace>-5688.app.github.dev/health
```

## ⚠️ 限制

- Codespace **閒置 30 分鐘自動暫停**(非永久執行)
- 個人帳號每月 **120 core-hours** 免費(2-core machine 約 60 小時)
- 用完後要繼續用會收費 ($0.18/hour for 2-core)
- 不適合「7x24 生產服務」,適合 demo / 短期測試
