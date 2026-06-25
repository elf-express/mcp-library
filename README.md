# mcp-library

多個 MCP server 的統一目錄(monorepo)。文檔查詢類已收斂為單一**多語料** server [`docs-mcp-server`](./docs-mcp-server)(一個 server 掛多本「書」),統一透過 **MCPJungle** gateway 對外。

## 服務一覽

| 子目錄 | 服務 | 形態 | 說明 |
| --- | --- | --- | --- |
| [`docs-mcp-server/`](./docs-mcp-server) | `docs-mcp-server` | **多語料(推薦)** | 一個 server 掛多本書,目前 `sqlsugar`(74 篇)+ `fc`(133 篇)。新增書 = 丟資料夾 + `corpus.json`,零程式碼 |
| [`sqlsugar-mcp/`](./sqlsugar-mcp/sqlsugar-mcp-server) | `sqlsugar-notes-mcp` | 單一(legacy) | 舊版 standalone;另含範例 C# 程式碼搜尋 |
| [`fc-designer-mcp/`](./fc-designer-mcp) | `fc-docs-mcp` | 單一(legacy) | 舊版 standalone |

> 文檔查詢的新工作流一律走 `docs-mcp-server`(以「語料」疊加);上面兩個 standalone 保留可回退,不再擴充。

---

## 部署(推薦:MCPJungle)

完整版見 [`docs-mcp-server/README.md` →「五、部署到 MCPJungle」](./docs-mcp-server/README.md)。最短路徑:

```
cd docs-mcp-server
cp .env.mcpjungle.example .env        # 填 MCPJUNGLE_DATABASE_URL(連線字串走環境變數,不落地)
docker compose -f docker-compose.mcpjungle.yml up -d --build   # gateway + docs-mcp 同在 mcpjungl 網路
brew install mcpjungle/mcpjungle/mcpjungle                     # 官方 CLI(或 GitHub Releases 下載)
REGISTRY=http://localhost:18800 ./mcpjungle/register.sh        # 註冊兩本書 + 官方工具(filesystem/fetch/time)
```

*   用戶端連 `http://<host>:18800/mcp`(全部),或 `http://<host>:18800/mcp/<corpus>` 對應的工具群組。
*   每本書在 gateway 是獨立 server(`sqlsugar__*`、`fc__*`),可各自分組/權限,仍只部署一份 docs-mcp。
*   機密(DB 連線字串等)一律走 `.env`,已由 `.gitignore` 擋住不進 git。

### 備援架構

公司一套、家裡一套,兩網域各跑一份,任一邊斷線另一邊接手,最終都註冊到 MCPJungle 統一管理。

---

## 部署(legacy:standalone 各自一個 server)

舊的兩個 standalone server 仍可獨立掛起(不經多語料合併):

```
docker compose up -d       # 根 docker-compose.yml:include fc-designer-mcp + sqlsugar-mcp-server
```

各服務 port/token 自管(見各子目錄 compose);token 用環境變數 `MCP_AUTH_TOKEN`(留空則公開)。

## 開發單一服務

進各子目錄(如 [`docs-mcp-server/`](./docs-mcp-server)),依該目錄 README 操作。