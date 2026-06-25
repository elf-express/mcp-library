# Docs MCP Server(多語料)

一個 MCP server,**掛多個文檔語料(corpus)**,讓 Claude(或任何 MCP 用戶端)搜尋、閱讀。
新增一個領域 = 在 `corpora/` 丟一個資料夾 + 一個 `corpus.json`,**不必改任何程式碼**。

- **一份部署、多本書**:工具數恆為 4(語料是「參數」不是「新工具」),不隨領域膨脹。
- **stdio**:本機用,Claude Desktop 以子行程啟動。
- **http**(本專案重點):Streamable HTTP,可部署到雲端 / Docker,遠端連接。

種子語料已打包進 `corpora/`:`sqlsugar`(74 篇)、`fc`(133 篇),會跟著映像一起部署。

## 工具(皆唯讀)

| 工具 | 功能 |
|---|---|
| `docs_list_corpora` | **探索入口**:列出有哪些語料(id / 標題 / 描述 / 文件數) |
| `docs_search` | 關鍵字全文搜尋;`corpus` 省略則**跨所有語料**(結果以 `[id]` 標註來源) |
| `docs_read` | 依 `corpus` + `filename` 讀整篇(模糊比對,附官方來源連結) |
| `docs_cheatsheet` | 抽某篇的「速查表」段落(語料需啟用 `cheatsheet` capability) |

典型流程:先 `docs_list_corpora` 看有哪些書 → `docs_search(corpus="sqlsugar", query="WhereIF")` → `docs_read`。

## 混合端點(模型 B:一份部署,每本書各自網址)

| 端點 | 看得到 | 用途 |
|---|---|---|
| `POST /mcp` | **全部語料**,AI 用 `corpus` 參數選書 | 一個連接器問所有東西 |
| `POST /mcp/<corpus>` | **只有該語料**(如 `/mcp/sqlsugar`) | 在 Claude 只掛某一本書,完全隔離 |
| `GET /health` | — | 健康檢查(免驗證),回 `{status, corpora, docs}` |

> 同一份部署,要全部就連 `/mcp`,要單書就連 `/mcp/sqlsugar`。將來想收斂成純單一入口、或拆成各自獨立 server 都不必改程式碼。

## 環境變數

| 變數 | 預設 | 說明 |
|---|---|---|
| `TRANSPORT` | `stdio` | 設 `http` 啟用雲端 HTTP 模式 |
| `PORT` | `5690` | HTTP 監聽埠 |
| `MCP_AUTH_TOKEN` | (空) | 設定後 `/mcp*` 需帶 `Authorization: Bearer <token>`;留空為公開 |
| `DOCS_CORPORA_DIR` | 自動 | 覆寫語料根目錄。預設用打包的 `corpora/` |
| `DOCS_SCOPE` | (空) | **stdio 模式**鎖定單一語料(供 Claude Desktop 每本書一條設定) |

---

## 新增一個語料(疊加)

1. 在 `corpora/` 下建一個資料夾,名稱即語料 id(例:`corpora/furion/`)。
2. 把該領域的 `.md` 放進去(可用分類子目錄,如 `指南/快速上手.md`)。
3. 放一個 `corpus.json` 描述它:

```json
{
  "title": "Furion",
  "description": "Furion .NET 框架文檔:動態 API、依賴注入、Oops 例外…",
  "capabilities": { "cheatsheet": false }
}
```

4.(通常不用)來源連結會**自動從每份 MD 的開頭抽取**(支援 `> Source: https://…` 或 `> 📖 官方文件:[文字](https://…)` 兩種格式)。只有想**覆寫**自動抽取時,才放一個 `sources.json`:

```json
{ "指南/快速上手.md": "https://furion.net/docs/get-start" }
```

5. 重新部署(雲端)/ 直接重啟(本機)。它就出現在 `docs_list_corpora` 了。**沒有任何 `.ts` 要改。**

> `corpus.json` 全部欄位皆選填;省略時 `title`/`id` = 資料夾名、`description` 留空、無速查表能力。

---

## 一、本機開發

```bash
cd docs-mcp-server
npm install
npm run build
npm test                          # vitest:多語料隔離 / 跨語料 / capability gating

npm run dev                       # tsx watch(stdio)
TRANSPORT=http npm start          # 本機跑 HTTP(預設 5690)
DOCS_SCOPE=sqlsugar npm run dev   # stdio 鎖定單一語料
```

健康檢查:`curl http://localhost:5690/health` → `{"status":"ok","corpora":2,"docs":207}`

## 二、本機 Docker 測試

```bash
# Windows PowerShell 用 $env:MCP_AUTH_TOKEN="..."
export MCP_AUTH_TOKEN=my-secret-123
docker compose up --build -d
curl http://localhost:5690/health
```

驗證 MCP 流程(全語料端點):

```bash
TOKEN=my-secret-123
# 1) initialize,從回應標頭取得 mcp-session-id
curl -i -X POST http://localhost:5690/mcp \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"curl","version":"1"}}}'

# 2) 用上面的 session id 列語料
SID=貼上你的session-id
curl -X POST http://localhost:5690/mcp \
  -H "Authorization: Bearer $TOKEN" -H "mcp-session-id: $SID" \
  -H "Content-Type: application/json" -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"docs_list_corpora","arguments":{}}}'
```

單書端點把上面的 `/mcp` 換成 `/mcp/sqlsugar` 即可(該連線只看得到 sqlsugar)。

## 三、部署到雲端

映像在任何支援 Docker 的平台都能跑:

1. 設 `MCP_AUTH_TOKEN`(一段長亂數)。`TRANSPORT=http` 映像已內建。
2. 對外開 `PORT`(預設 5690),平台前面通常會幫你接 HTTPS。
3. 健康檢查路徑 `/health`。
4. **務必走 HTTPS**:MCP 遠端連接器要求 https,且 token 不該用明文 http 傳。

常見平台:Railway / Render(連 Git、選 Dockerfile、加 `MCP_AUTH_TOKEN` 變數)、Fly.io(`fly launch` → `fly secrets set` → `fly deploy`)、自有 VPS(`docker compose up -d` + Nginx/Caddy 反代加 TLS)。

## 四、連接 Claude(遠端 MCP 連接器)

Settings → Connectors → Add custom connector:

- 全部語料:URL 填 `https://你的網域/mcp`
- 只掛某一本書:URL 填 `https://你的網域/mcp/sqlsugar`
- 有設 token 則在 Authorization 填 `Bearer <你的token>`

> 遠端自訂連接器需付費方案且網址須為 HTTPS。只是本機自己用,改 stdio 模式更簡單(可配 `DOCS_SCOPE` 每本書一條設定)。

### Claude Desktop(stdio)範例

```json
{
  "mcpServers": {
    "docs-all": {
      "command": "node",
      "args": ["E:\\source\\mcp-library\\docs-mcp-server\\dist\\index.js"]
    },
    "docs-sqlsugar": {
      "command": "node",
      "args": ["E:\\source\\mcp-library\\docs-mcp-server\\dist\\index.js"],
      "env": { "DOCS_SCOPE": "sqlsugar" }
    }
  }
}
```

---

## 五、部署到 MCPJungle(已移到 ../mcpjungle/)

MCPJungle gateway 的部署、註冊、官方工具、Dockhand、ghcr 推送等,已獨立到 repo 根的 **[`mcpjungle/`](../mcpjungle/)**(它是整個 library 的 gateway,不屬於本 server)。完整說明見 [`../mcpjungle/README.md`](../mcpjungle/README.md)。

本 server 在那套部署裡的角色:gateway 以容器名 `http://docs-mcp-server:5690/mcp/<corpus>` 連到它;image 為 `ghcr.io/elf-express/docs-mcp-server:latest`(由本目錄 `build`)。

## 與舊 server 的關係

`sqlsugar-mcp-server`、`fc-designer-mcp` 兩個 standalone server 仍可獨立運作、未被更動。本 server 是把它們的文檔以「語料」形式合併到單一部署;舊的 sqlsugar server 另保有「範例 C# 程式碼搜尋」(`list_examples`/`read_code`/`search_code`),該功能目前未納入多語料 v1。
