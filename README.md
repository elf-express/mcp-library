# mcp-library

多個 MCP server 的統一目錄(monorepo)。各 server 獨立子目錄、獨立 port、獨立 image,可單獨部署,也可用根 `docker-compose.yml` 一次掛起。

## 服務一覽

| 子目錄 | 服務 | port | 說明 |
|--------|------|------|------|
| [`fc/`](./fc) | `fc-docs-mcp` | 5689 | FcDesigner Pro 官方文件查詢(133 篇) |
| `einvoice/` | (規劃中) | 5690 | 電子發票相關文件 |

> SqlSugar 文件 MCP 維持獨立 repo(`../SqlSugar`),不納入本 monorepo。

## 部署

### 一次掛起所有服務

```bash
cp .env.example .env   # 填入各服務的 AUTH_TOKEN(留空則公開)
docker-compose up -d
```

### 備援架構

公司一套、家裡一套,兩個網域各跑一份本 compose;任一邊斷線另一邊接手。最終都註冊到 MCPJungle 統一管理。

## 開發單一服務

進各子目錄(如 [`fc/`](./fc)),依該目錄 README 操作。
