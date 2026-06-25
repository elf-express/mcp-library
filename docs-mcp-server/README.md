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

## 五、部署到 MCPJungle(本案採用)

[MCPJungle](https://github.com/mcpjungle/MCPJungle) 是自架的 MCP gateway / registry:把多個 MCP server 註冊進去,對用戶端只開一個入口(預設 `http://<host>:8080/mcp`),並負責命名空間、分組與存取控制。本 server 是標準 streamable HTTP MCP server,直接用 URL 註冊即可。

> 想先在本機把整條鏈跑通(不接你的真 DB)?用 [`docker-compose.localtest.yml`](./docker-compose.localtest.yml)(內含本地 postgres),已沙盒實測:sqlsugar / fc / filesystem / fetch / time 共 5 個 server 全部註冊成功。

### 步驟

1. **一鍵起 gateway + 本 server(同網路、機密走 `.env`)**:
   ```bash
   cd docs-mcp-server
   cp .env.mcpjungle.example .env       # 填 MCPJUNGLE_DATABASE_URL(DB 連線字串改用環境變數,不落地)
   docker compose -f docker-compose.mcpjungle.yml up -d --build
   ```
   兩個容器都在 `mcpjungl` 網路:`mcpjungle-server`(gateway,host port 18800)、`docs-mcp-server`(本 server,內部 5690,不對外開埠)。gateway 以容器名連本 server:`http://docs-mcp-server:5690/mcp/<corpus>`。
   > 已有自己的 MCPJungle compose?只要(1)`DATABASE_URL:` 改成 `${MCPJUNGLE_DATABASE_URL}` 並把值移進 `.env`、(2)`networks` 區塊加 `name: mcpjungl`、(3)貼上本檔的 `docs-mcp` service 即可。

2. **裝官方 CLI 並註冊語料**(dev 模式、免 token;設定檔在 `./mcpjungle/`,url 已用容器名)。

   裝 CLI(server/client 同一個 binary):
   ```bash
   brew install mcpjungle/mcpjungle/mcpjungle      # macOS/Linux;或 GitHub Releases 下載 binary
   ```
   讓 CLI 指向你的 gateway(host port 18800)——旗標或 `~/.mcpjungle.conf` 二選一:
   ```bash
   mcpjungle --registry http://localhost:18800 list tools     # 旗標(全域,放 subcommand 前)
   # 或寫 ~/.mcpjungle.conf:  registry_url: http://localhost:18800
   ```
   註冊(直接從 repo 跑,免複製進容器):
   ```bash
   REGISTRY=http://localhost:18800 ./mcpjungle/register.sh    # 預設:sqlsugar + fc + 官方工具(filesystem/fetch/time)
   # 手動等同:mcpjungle --registry http://localhost:18800 register -c ./mcpjungle/sqlsugar.json
   ```
   > **別搞混兩個位址**:`--registry`(=18800)是 **CLI → gateway**;json 裡的 `http://docs-mcp-server:5690/...` 是 **gateway → 本 server**(容器名,由 gateway 在 `mcpjungl` 網路內解析)。
   >
   > 不想裝 CLI?用容器內的 binary:把 json 放到 gateway 掛載的 `/host`,`docker exec mcpjungle-server mcpjungle register -c /host/sqlsugar.json`。

   兩種策略擇一:

   **A. 每本書各自註冊**(推薦,延續模型 B;可在 gateway 對「每本書」做分組/權限):`sqlsugar.json` + `fc.json` → 工具 `sqlsugar__docs_search`、`fc__docs_search`(MCPJungle 用 `<server>__<tool>`)。新增一本書 = 本 server 丟資料夾重啟 + 多註冊一個指向 `/mcp/<id>` 的設定檔。

   **B. 整包註冊成一個 `docs`**(最省事;新增書不必動 gateway):改註冊 `docs-all.json`(url 指 `/mcp`)→ 工具 `docs__docs_search`(用 `corpus` 參數選書)、`docs__docs_list_corpora`(列全部)。新增書只要本 server 重啟,gateway 自動看得到。

3. **存取控制**(選用,enterprise 模式):
   ```bash
   export SERVER_MODE=enterprise        # 或 mcpjungle start --enterprise
   mcpjungle create mcp-client claude-x --allow "sqlsugar"   # 該 client 只能用 sqlsugar(需採策略 A)
   ```

4. **用戶端連 MCPJungle**(不是直連本 server;你的 host port 是 18800):
   - Claude Desktop:`npx mcp-remote http://<host>:18800/mcp`
   - 工具分組端點:`http://<host>:18800/v0/groups/<group>/mcp`

### 順便註冊 MCPJungle 官方 stdio 工具(filesystem / fetch / time)

> 釐清:**MCPJungle 本身沒有內建工具**——依官方文檔,所有工具都來自註冊的 MCP server。但 `-stdio` image 內含 npx/uvx,可直接跑官方 reference server。`register.sh` 預設就把這三個無需 token 的一起註冊(設 `WITH_TOOLS=0` 可略過):

| 設定檔 | 命令 | 說明 |
|---|---|---|
| `filesystem.json` | `npx @modelcontextprotocol/server-filesystem /host` | 讀 gateway 容器內 `/host`(= compose 掛載的 `MCPJUNGLE_DATA_DIR`,唯讀) |
| `fetch.json` | `uvx mcp-server-fetch` | 抓網頁轉 markdown |
| `time.json` | `uvx mcp-server-time --local-timezone=Asia/Taipei` | 目前時間 / 時區轉換 |

註冊後工具名同樣是 `<server>__<tool>`:`filesystem__read_file`、`fetch__fetch`、`time__get_current_time`…

要 **github** 等**需 token** 的官方 server?照 stdio 格式加 `env` 欄位即可(我沒放進 `register.sh` 自動註冊,以免無 token 失敗):
```json
{ "name": "github", "transport": "stdio", "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-github"],
  "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "你的PAT" } }
```

### 認證對應

| 連線 | 怎麼帶 |
|---|---|
| gateway → 本 server | 註冊設定檔的 `bearer_token` = 本 server 的 `MCP_AUTH_TOKEN`(兩邊一致;或兩邊都不設) |
| 用戶端 → gateway | dev 模式開放;enterprise 模式用 `mcpjungle create mcp-client` 發 token |

> 重點:**模型 B 的 `/mcp/<corpus>` 子端點 + MCPJungle = 一份部署,卻能在 gateway 把每本書當成獨立服務做命名空間與權限**(原本要拆成多個 server 才有的隔離,現在不必)。

## 與舊 server 的關係

`sqlsugar-mcp-server`、`fc-designer-mcp` 兩個 standalone server 仍可獨立運作、未被更動。本 server 是把它們的文檔以「語料」形式合併到單一部署;舊的 sqlsugar server 另保有「範例 C# 程式碼搜尋」(`list_examples`/`read_code`/`search_code`),該功能目前未納入多語料 v1。
