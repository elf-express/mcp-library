---
title: SqlSugar MCP Server
emoji: 🍬
colorFrom: pink
colorTo: indigo
sdk: docker
app_port: 5688
pinned: false
license: mit
short_description: MCP server for querying SqlSugar ORM documentation
---

# SqlSugar MCP Server

把 [SqlSugar ORM](https://www.donet5.com/) 的中文文件變成一個 MCP server,
讓 Claude、Cursor、Claude Code 等 AI 客戶端直接搜尋、閱讀。

> 上游 repo:[elf-express/SqlSugar-Mcp](https://github.com/elf-express/SqlSugar-Mcp)
> Docker 映像:`ghcr.io/elf-express/sqlsugar-mcp:latest`

## 🔌 連線資訊

```
Endpoint:  https://168express-sqlsugar-mcp.hf.space/mcp
Health:    https://168express-sqlsugar-mcp.hf.space/health
```

若 Space 設定了 `MCP_AUTH_TOKEN`,請在客戶端帶上:
```
Authorization: Bearer <你拿到的 token>
```

## 🛠️ 工具(7 個唯讀)

| Tool | 功能 |
|---|---|
| `sqlsugar_search_notes` | 關鍵字全文搜尋筆記 |
| `sqlsugar_read_note` | 依檔名讀取整篇 |
| `sqlsugar_list_notes` | 列出所有筆記 |
| `sqlsugar_lookup_cheatsheet` | 取某篇「速查表」段落 |
| `sqlsugar_list_examples` | 列出 SqlSugar vs EF Core 效能測試的範例專案 |
| `sqlsugar_read_code` | 讀取單一範例原始碼 |
| `sqlsugar_search_code` | 範例原始碼關鍵字搜尋 |

## 🤖 在 Claude Desktop 連線

`Settings → Connectors → Add custom connector`:

| 欄位 | 值 |
|---|---|
| Name | SqlSugar Notes |
| URL | `https://168express-sqlsugar-mcp.hf.space/mcp` |
| Authentication | Bearer Token → 貼上 token(若有設) |

完成後直接問:「SqlSugar WhereIF 怎麼用?」、「列出多租戶相關筆記」等。

## ⚙️ 設定 Token(可選)

Space 的 `Settings → Variables and secrets → New secret`:
- Name: `MCP_AUTH_TOKEN`
- Value: 一段長亂數(`openssl rand -hex 32`)

不設則為公開存取(沒驗證,任何人都能呼叫)。

## 📝 License

MIT © elf-express
