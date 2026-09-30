---
title: FcDesigner Pro Docs MCP Server
emoji: 🎨
colorFrom: blue
colorTo: purple
sdk: docker
app_port: 5689
pinned: false
license: mit
short_description: MCP server for querying FcDesigner Pro documentation
---

# FcDesigner Pro Docs MCP Server

把 FcDesigner Pro(form-create 企業版表單設計器)的官方文件變成一個 MCP server,
讓 Claude、Cursor、Claude Code 等 AI 客戶端直接搜尋、閱讀。

> 上游 repo:[elf-express/mcp-library](https://github.com/elf-express/mcp-library)
> Docker 映像:`ghcr.io/elf-express/fc-designer-mcp:latest`

## 🔌 連線資訊

```
Endpoint:  https://168express-fc-designer-mcp.hf.space/mcp
Health:    https://168express-fc-designer-mcp.hf.space/health
```

若 Space 設定了 `MCP_AUTH_TOKEN`,請在客戶端帶上:
```
Authorization: Bearer <你拿到的 token>
```

## 🛠️ 工具(3 個唯讀)

| Tool | 功能 |
|---|---|
| `fc_search_docs` | 關鍵字全文搜尋文件 |
| `fc_read_doc` | 依檔名/相對路徑讀取整篇(附官方來源連結) |
| `fc_list_docs` | 列出所有文件(依分類分組) |

## 📚 文件涵蓋

133 篇繁體中文文件,三個分類:
- 二次開發(9 篇)
- 產品手冊(45 篇)
- 開發文檔(79 篇)

## 🤖 在 Claude Desktop 連線

`Settings → Connectors → Add custom connector`:

| 欄位 | 值 |
|---|---|
| Name | FcDesigner Pro Docs |
| URL | `https://168express-fc-designer-mcp.hf.space/mcp` |
| Authentication | Bearer Token → 貼上 token(若有設) |

完成後直接問:「FcDesigner 怎麼擴展組件?」、「列出二次開發相關文件」等。

## ⚙️ 設定 Token(可選)

Space 的 `Settings → Variables and secrets → New secret`:
- Name: `MCP_AUTH_TOKEN`
- Value: 一段長亂數(`openssl rand -hex 32`)

不設則為公開存取(沒驗證,任何人都能呼叫)。

## 📝 License

MIT © elf-express
