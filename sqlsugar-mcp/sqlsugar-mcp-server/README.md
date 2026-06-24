# SqlSugar Notes MCP Server

把 SqlSugar 筆記變成一個 MCP server,讓 Claude(或任何 MCP 用戶端)直接搜尋、閱讀。
支援兩種模式:

- **stdio**:本機用,Claude Desktop 以子行程啟動。
- **http**(本專案重點):Streamable HTTP,可部署到雲端 / Docker,遠端連接。

筆記已打包進 `notes/`(75 篇),另含範例專案原始碼於 `examples/`,會跟著映像一起部署,雲端不需要存取你的本機磁碟。

## 工具(皆唯讀)

| 工具 | 功能 |
|---|---|
| `sqlsugar_search_notes` | 關鍵字全文搜尋,回傳命中檔名與片段(多關鍵字 AND) |
| `sqlsugar_read_note` | 依檔名讀取整篇(模糊比對) |
| `sqlsugar_list_notes` | 列出所有檔名,可加 `include_index` 取分類導航 |
| `sqlsugar_lookup_cheatsheet` | 只回傳某篇的「速查表」段落 |
| `sqlsugar_list_examples` | 列出範例專案(SqlSugar vs EF Core 效能測試)的原始碼檔 |
| `sqlsugar_read_code` | 依路徑讀取單一範例原始碼檔 |
| `sqlsugar_search_code` | 在範例原始碼中關鍵字搜尋 |

## 環境變數

| 變數 | 預設 | 說明 |
|---|---|---|
| `TRANSPORT` | `stdio` | 設 `http` 啟用雲端 HTTP 模式 |
| `PORT` | `5688` | HTTP 監聽埠 |
| `MCP_AUTH_TOKEN` | (空) | 設定後,`/mcp` 需帶 `Authorization: Bearer <token>`;留空為公開 |
| `SQLSUGAR_NOTES_DIR` | 自動 | 覆寫筆記資料夾。預設用打包的 `notes/`,無則用上一層 |
| `SQLSUGAR_EXAMPLES_DIR` | 自動 | 覆寫範例原始碼資料夾。預設用打包的 `examples/` |

端點:`POST /mcp`(MCP)、`GET /health`(健康檢查,免驗證)。

---

## 一、本機 Docker 測試(建議先做)

```bash
cd sqlsugar-mcp-server

# 設一個密鑰(Windows PowerShell 用 $env:MCP_AUTH_TOKEN="..."）
export MCP_AUTH_TOKEN=my-secret-123

# build + 啟動
docker compose up --build -d

# 健康檢查(應回 {"status":"ok","notes":75}）
curl http://localhost:5688/health
```

驗證 MCP 流程(initialize → 拿 session id → 呼叫工具):

```bash
TOKEN=my-secret-123

# 1) initialize,從回應標頭取得 mcp-session-id
curl -i -X POST http://localhost:5688/mcp \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"curl","version":"1"}}}'

# 2) 把上面回應的 mcp-session-id 填進來,呼叫工具
SID=貼上你的session-id
curl -X POST http://localhost:5688/mcp \
  -H "Authorization: Bearer $TOKEN" \
  -H "mcp-session-id: $SID" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"sqlsugar_search_notes","arguments":{"query":"WhereIF"}}}'
```

沒帶 token 應回 `HTTP 401`。停止:`docker compose down`。

不用 compose 的話:

```bash
docker build -t sqlsugar-notes-mcp .
docker run -d -p 5688:5688 -e MCP_AUTH_TOKEN=my-secret-123 --name sqlsugar-mcp sqlsugar-notes-mcp
```

---

## 二、部署到雲端

映像在任何支援 Docker 的平台都能跑。重點:

1. 設環境變數 `MCP_AUTH_TOKEN`(用一段長亂數)。`TRANSPORT=http` 映像已內建。
2. 對外開 `PORT`(預設 5688),平台前面通常會幫你接 HTTPS。
3. 健康檢查路徑設 `/health`。
4. **務必走 HTTPS**:MCP 遠端連接器要求 https 網址,且 token 不該用明文 http 傳。

常見平台:

- **Railway / Render**:連 Git repo,選 Dockerfile 部署,在 Variables 加 `MCP_AUTH_TOKEN`,平台自動給你一個 `https://xxx` 網址。
- **Fly.io**:`fly launch`(偵測到 Dockerfile)→ `fly secrets set MCP_AUTH_TOKEN=...` → `fly deploy`。
- **自己的 VPS**:`docker compose up -d`,前面用 Nginx / Caddy 反向代理加 TLS。

部署後確認:`curl https://你的網域/health` 回 `{"status":"ok","notes":75}`。

---

## 三、連接 Claude(遠端 MCP 連接器)

在 Claude(桌面版 / 網頁版)的 **Settings → Connectors → Add custom connector**:

- URL:`https://你的網域/mcp`
- 若有設 token,在 Authorization 填 `Bearer <你的token>`(或依介面填 Bearer Token 欄位)

連上後即可直接問,例如「用 SqlSugar 速查表查 WhereIF 怎麼寫」。

> 註:遠端自訂連接器需要付費方案且網址須為 HTTPS。若只是自己本機用,直接用 stdio 模式更簡單(見下)。

---

## 四、本機 stdio 模式(免部署)

```bash
npm install && npm run build
```

Claude Desktop 設定檔 `%APPDATA%\Claude\claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "sqlsugar-notes": {
      "command": "node",
      "args": ["D:\\SQL筆記\\SqlSugar\\sqlsugar-mcp-server\\dist\\index.js"]
    }
  }
}
```

---

## 更新筆記內容

`notes/` 是打包進映像的快照。若你在 `D:\SQL筆記\SqlSugar` 改了筆記,重新同步再 rebuild:

```bash
# Windows PowerShell:把上層 .md 複製進 notes/
Copy-Item ..\*.md .\notes\ -Force
docker compose up --build -d
```

(本機 stdio 模式想要「即時讀最新筆記」,可刪掉 `notes/` 資料夾,server 會自動改讀上一層的 `.md`,或用 `SQLSUGAR_NOTES_DIR` 指定。)

## 開發

```bash
npm run dev                       # tsx watch
TRANSPORT=http npm start          # 本機跑 HTTP
node test-client.mjs              # stdio 模式的最小測試用戶端
```
