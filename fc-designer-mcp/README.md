# fc-docs-mcp-server

FcDesigner Pro 官方文件的 MCP server——對 133 篇繁體中文文件(二次開發 / 產品手冊 / 開發文檔)做關鍵字搜尋與讀取。屬於 `mcp-library` monorepo 下的子服務之一。

## 工具(全唯讀)

| 工具 | 說明 |
|------|------|
| `fc_search_docs` | 關鍵字全文搜尋(空白分隔為 AND),回傳命中檔名 + 片段(附行號) |
| `fc_read_doc` | 依檔名或相對路徑讀全文(附官方來源連結) |
| `fc_list_docs` | 列出所有文件(依分類分組) |

## 文件來源

文件以「相對路徑」識別,保留三個分類子目錄:

- `二次開發/`(9 篇)
- `產品手冊/`(45 篇)
- `開發文檔/`(79 篇)

每篇開頭含 `> Source: <官方 URL>`;`notes/sources.json` 對照「相對路徑 → 官方文件 URL」,讀取時自動附上來源連結。

## 執行

### stdio(本地,給 Claude Desktop / Code 當 local MCP)

```bash
npm install
npm run build
node dist/index.js
```

開發模式(免 build,熱重載):`npm run dev`

### HTTP(Streamable HTTP,給遠端連接器 / MCPJungle)

```bash
TRANSPORT=http PORT=5689 node dist/index.js
# 健康檢查:GET  http://localhost:5689/health
# MCP 端點:POST http://localhost:5689/mcp
```

### 環境變數

| 變數 | 說明 | 預設 |
|------|------|------|
| `TRANSPORT` | `stdio` 或 `http` | `stdio` |
| `PORT` | HTTP 埠 | `5689` |
| `FC_DOCS_DIR` | 文件資料夾(覆蓋內建) | 內建 `notes/` |
| `MCP_AUTH_TOKEN` | 設了則 HTTP `/mcp` 需 `Authorization: Bearer <token>` | (無,公開) |

## Docker

```bash
docker build -t fc-docs-mcp .
docker run -e MCP_AUTH_TOKEN=your-secret -p 5689:5689 fc-docs-mcp
```

或在 `mcp-library` 根目錄 `docker-compose up`,連同其他 MCP 一起掛起。
