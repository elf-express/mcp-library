# Docs MCP Server(多語料)

一個 MCP server,**掛多個文檔語料(corpus)**,讓 Claude(或任何 MCP 用戶端)搜尋、閱讀。
新增一個領域 = 在 `corpora/` 丟一個資料夾 + 一個 `corpus.json`,**不必改任何程式碼**。

- **一份部署、多本書**:工具數恆為 8(語料是「參數」不是「新工具」;依語料 `capabilities` 開關,未啟用的工具回友善提示),不隨領域膨脹。
- **stdio**:本機用,Claude Desktop 以子行程啟動。
- **http**(本專案重點):Streamable HTTP,可部署到雲端 / Docker,遠端連接。

語料已打包進 `corpora/`:`sqlsugar-zh-tw`(74 篇)、`fc-zh-tw`(133 篇)、`opnsense-en`(378 篇)、`opnsense-zh-tw`(378 篇,機器翻譯),會跟著映像一起部署。語料 id 格式為 `<書名>-<語言>`(`en` / `zh-tw` / `zh-cn` / `bi`)。

## 安裝(npx 一行裝,本機 stdio)

發布到 npm 後,任何專案**不必 clone、不必 build**,一行就裝。在工作目錄建 `.mcp.json`:

```json
{
  "mcpServers": {
    "docs": {
      "command": "npx",
      "args": ["-y", "@elf-express/docs-mcp-server"]
    }
  }
}
```

重開 AI 助手後對它說「列出可用語料」即可。這**一個** server 同時涵蓋 `sqlsugar-zh-tw` + `fc-zh-tw` + `opnsense-en` + `opnsense-zh-tw` 四個語料(共 963 篇)。

| AI 助手 | 設定檔 |
|---|---|
| Claude Code | `.mcp.json`(原生支援) |
| Cursor | `.cursor/mcp.json` |
| Windsurf | `.windsurfrules` |
| Claude Desktop | `claude_desktop_config.json` |

- 只想掛**單一本書**:加 `"env": { "DOCS_SCOPE": "fc-zh-tw" }`,該連線就只看得到 `fc-zh-tw`。
- **還沒發到 npm**(或想用本機原始碼):改成 `"command": "node", "args": ["<repo>/docs-mcp-server/dist/index.js"]`,前置先 `npm install && npm run build`。

> 要遠端 / 雲端 / 多人共用,改走下方 **http** 模式(Streamable HTTP),不是 npx。

## 工具(皆唯讀)

| 工具 | 功能 |
|---|---|
| `docs_list_corpora` | **探索入口**:列出有哪些語料(id / 標題 / 描述 / 文件數) |
| `docs_search` | 關鍵字全文搜尋;`corpus` 省略則**跨所有語料**(結果以 `[id]` 標註來源) |
| `docs_read` | 依 `corpus` + `filename` 讀整篇(模糊比對,附官方來源連結) |
| `docs_outline` | 列某語料的分類目錄與篇名(`headings=true` 展開篇內 `##`/`###` 標題) |
| `docs_cheatsheet` | 抽某篇的「速查表」段落(語料需啟用 `cheatsheet` capability) |
| `docs_code_search` | 搜語料附帶的 `examples/` 範例源碼,`query` 留空 = 列檔(語料需啟用 `examples` capability) |
| `docs_code_read` | 讀單一範例源碼檔(語料需啟用 `examples` capability) |
| `docs_symbol` | 依 API / 組件名對 `#`/`##`/`###` 標題精確→包含比對,回該段落(語料需啟用 `symbol` capability) |

前 4 個(`docs_list_corpora` / `docs_search` / `docs_read` / `docs_outline`)對所有語料有效;後 4 個是 capability-gated——工具對所有語料都存在,未啟用該能力的語料會回友善提示並建議改用哪個工具。

典型流程:先 `docs_list_corpora` 看有哪些書 → `docs_search(corpus="sqlsugar-zh-tw", query="WhereIF")` → `docs_read`。

## 混合端點(模型 B:一份部署,每本書各自網址)

| 端點 | 看得到 | 用途 |
|---|---|---|
| `POST /mcp` | **全部語料**,AI 用 `corpus` 參數選書 | 一個連接器問所有東西 |
| `POST /mcp/<corpus>` | **只有該語料**(如 `/mcp/sqlsugar-zh-tw`) | 在 Claude 只掛某一本書,完全隔離 |
| `GET /health` | — | 健康檢查(免驗證),回 `{status, corpora, docs}` |

> 同一份部署,要全部就連 `/mcp`,要單書就連 `/mcp/sqlsugar-zh-tw`。將來想收斂成純單一入口、或拆成各自獨立 server 都不必改程式碼。

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

> 命名規則、目錄樹、`corpus.json` 欄位與內容規則的權威版本:[`corpora/README.md`](corpora/README.md);完整流程見團隊 skill `elf-mcp-knowledge`。

1. 在 `corpora/` 下建一個資料夾,名稱即語料 id,格式 `<書名>-<語言>`(例:`corpora/furion-zh-tw/`)。
2. 把該領域的 `.md` 放進去(可用分類子目錄,如 `指南/快速上手.md`)。
3. 放一個 `corpus.json` 描述它:

```json
{
  "book": "furion",
  "language": "zh-TW",
  "source": "https://furion.net/docs",
  "title": "Furion",
  "description": "Furion .NET 框架文檔:動態 API、依賴注入、Oops 例外…",
  "capabilities": { "cheatsheet": false, "examples": false, "symbol": false }
}
```

4.(通常不用)來源連結會**自動從每份 MD 的開頭抽取**(支援 `> Source: https://…` 或 `> 📖 官方文件:[文字](https://…)` 兩種格式)。只有想**覆寫**自動抽取時,才放一個 `sources.json`:

```json
{ "指南/快速上手.md": "https://furion.net/docs/get-start" }
```

5. 重新部署(雲端)/ 直接重啟(本機)。它就出現在 `docs_list_corpora` 了。**沒有任何 `.ts` 要改。**

> 程式只讀 `title` / `description` / `capabilities`(皆選填;省略時 `title` = 資料夾名、`description` 留空、無任何 capability)。`book` / `language` / `source` 是團隊規定必填的中繼資料(讓人與 AI 分辨書名與語言,不靠拆 id 字串),程式不讀。

---

## 一、本機開發

```bash
cd docs-mcp-server
npm install
npm run build
npm test                          # vitest:多語料隔離 / 跨語料 / capability gating

npm run dev                       # tsx watch(stdio)
TRANSPORT=http npm start          # 本機跑 HTTP(預設 5690)
DOCS_SCOPE=sqlsugar-zh-tw npm run dev   # stdio 鎖定單一語料
```

健康檢查:`curl http://localhost:5690/health` → `{"status":"ok","corpora":4,"docs":963}`

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

單書端點把上面的 `/mcp` 換成 `/mcp/sqlsugar-zh-tw` 即可(該連線只看得到 sqlsugar-zh-tw)。

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
- 只掛某一本書:URL 填 `https://你的網域/mcp/sqlsugar-zh-tw`
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
      "env": { "DOCS_SCOPE": "sqlsugar-zh-tw" }
    }
  }
}
```

---

## 五、部署到 MCPJungle(已移到 ../mcpjungle/)

MCPJungle gateway 的部署、註冊、官方工具、Dockhand、ghcr 推送等,已獨立到 repo 根的 **[`mcpjungle/`](../mcpjungle/)**(它是整個 library 的 gateway,不屬於本 server)。完整說明見 [`../mcpjungle/README.md`](../mcpjungle/README.md)。

本 server 在那套部署裡的角色:gateway 以容器名 `http://docs-mcp-server:5690/mcp/<corpus>` 連到它;image 為 `ghcr.io/elf-express/docs-mcp-server:latest`(由本目錄 `build`)。

## 與舊 server 的關係

`sqlsugar-mcp-server`、`fc-designer-mcp` 兩個 standalone server 仍可獨立運作、未被更動。本 server 是把它們的文檔以「語料」形式合併到單一部署;舊的 sqlsugar server 的「範例 C# 程式碼搜尋」(`list_examples`/`read_code`/`search_code`)已以 `examples` capability 收編為 `docs_code_search` / `docs_code_read`(範例碼在 `corpora/sqlsugar-zh-tw/examples/`);舊 `sqlsugar_list_notes` 的 `include_index`(附 index.md 分類導航)尚未補回。
