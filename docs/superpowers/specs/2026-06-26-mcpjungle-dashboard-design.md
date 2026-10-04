# MCPJungle Dashboard 改善設計 — Add Server 多模式 / i18n / 安裝說明頁

- 日期:2026-06-26
- 狀態:Approved(user 已答覆第 11 節決策點,2026-06-26)
- 路線:Fork `mcpjungle/MCPJungle` → 改 `web/dashboard` 前端 → 拆 PR 送回上游
- 相關:本 repo `mcp-library` 是「集中式 MCP 管理」,自製語料走 `docs-mcp-server`,第三方 server 走 MCPJungle gateway 集中註冊

---

## 1. 背景與目標

MCPJungle 的 Dashboard(Beta)目前「新增 server」是**一個 Modal + transport 下拉(stdio / streamable_http / sse),依 transport 動態顯示欄位**(stdio → command/args/env;http/sse → url/bearer/headers)。使用者截圖只看到 url 欄位,是因為當時 transport 選 streamable_http。**現況已能註冊三種 transport,但痛點是:① 切換用不顯眼的下拉、② 沒有「貼整段 JSON」模式、③ 全英文、無 i18n。** 三個目標:

1. **(目標 2,最重要)** Add Server 改成依「安裝方式」切換的多頁:**Remote URL / Local 指令 / 貼 JSON**,切換器用「分段控件」式互動(就地三選一、激活段浮起)。
2. **(目標 3,最重要)** 多國語言 i18n,第一版 `en`(base)+ `zh-TW`,框架可擴充。
3. **(目標 1,最不重要)** 左側 sidebar 在 `Documentation` 下方新增一個入口 → 獨立「安裝方式說明」頁。

最終目的:用 MCPJungle 註冊 server 要「自助、不必每次問 AI」。

## 2. 現況分析(已查證)

| 項目 | 事實 | 依據 |
|---|---|---|
| 前端位置 | `web/dashboard/`(主 repo 子目錄) | gh api contents |
| 技術棧 | React 18 + TypeScript + Vite,套件名 `@mcpjungle/dashboard` | `web/dashboard/package.json` |
| 依賴 | 只有 `react`/`react-dom` — **無 router、無 i18n、無 UI 元件庫** | 同上 |
| build | `tsc --noEmit && vite build` → 靜態檔,很可能 `go:embed` 進 binary | package.json scripts |
| 後端 | Go(84%);register 是 runtime 操作,新增 server 即時生效、免重啟 | 官方 docs |
| register schema | remote:`transport: streamable_http\|sse` + `url`/`bearer_token`/`session_mode`/`headers`/`oauth_*`;local:`transport: stdio` + `command`/`args[]`/`env{}` | 官方 register-http-servers + repo `mcpjungle/servers/*.json` |

**結論:三個目標都是純前端改動,後端 Go 不需動。**

## 3. 整體架構與 PR 拆分

只改 `web/dashboard/src`,build 沿用上游。**拆 3 個 PR**(小 PR 好 review、彼此不綁死):

| PR | 內容 | 依賴 |
|---|---|---|
| **PR1 — i18n 基建** | 引入 `react-i18next` + `i18next-browser-languagedetector`;抽現有寫死字串成 key;`locales/{en,zh-TW}.json`;sidebar 底部語言切換 | 無(先行) |
| **PR2 — Add Server 三頁** | 單表單 → 分段控件三頁(Remote URL / Local 指令 / 貼 JSON);補上 stdio 欄位 | PR1 |
| **PR3 — 安裝說明頁** | sidebar 新增項 + 獨立說明頁(走 i18n) | PR1 |

i18n 選型:**react-i18next**(React 生態標準,maintainer 熟、好審;自製易在複數/插值踩坑)。

## 4. 目標 2:Add Server 三頁(分段控件)

### 4.1 切換器(把現有 transport 下拉 → 分段控件,並新增 JSON 模式)
- **現況**:register Modal 用 `<select>` 選 transport(stdio/streamable_http/sse),依選擇顯示欄位(App.tsx 2002-2167)。
- **改造**:把那個下拉換成一條**分段控件**,三段:**Remote URL**(= streamable_http + sse,段內再小選)/ **Local 指令**(= stdio)/ **貼 JSON**(全新)。
- 互動參考 DBX「分段控件」:容器底色、激活段浮起(`shadow-sm`)、未激活灰字;**顏色用 MCPJungle 現有 token**,不引入別套品牌。
- 切段只換下半部表單區,Modal 其餘(標題/關閉/送出列/OAuth step)不動。
- **重構**:把 register Modal(現嵌在 App.tsx ~270 行 JSX)抽成獨立 `AddServerModal` 元件,三段各一子表單,降低 2211 行巨檔的改動衝突。

### 4.2 各頁欄位
**Remote URL 頁**(→ `transport: streamable_http` 或 `sse`)
- `name`(必)、`description`、`transport`(頁內小切換:Streamable HTTP / SSE,預設 HTTP)、`url`(必)、`bearer_token`(選)、`session_mode`(stateless 預設 / stateful)、`headers`(動態 key-value)
- `oauth_*` 進階欄位:**範圍外**,需要就走「貼 JSON」頁

**Local 指令 頁**(→ `transport: stdio`)
- `name`(必)、`description`、`command`(必,如 `npx`/`uvx`)、`args`(動態字串清單)、`env`(動態 key-value)
- 頁內提示:stdio 需要 gateway 為 `-stdio` image(連到說明頁)

**貼 JSON 頁**(power-user / 一次填全 / 對應 `register -c`)
- 單一 `textarea` 貼完整 server JSON
- 即時 `JSON.parse` + 欄位驗證,錯誤就地提示
- 第一版**只支援單一物件**(批次貼多個 → 範圍外)

### 4.3 送出
- 三頁各自把欄位組成 register payload,呼叫**現有 dashboard 已在用的 register API endpoint**(沿用,不新增後端)。
- 成功 → 關閉 Modal + 重新整理 server 清單;失敗 → 就地顯示 API 錯誤訊息。
- ✅ 已確認(讀 code):`POST /api/dashboard/servers`,body = `DashboardRegisterServerInput`(name/transport/description/url/bearer_token/headers/command/args/env/session_mode),回應可能帶 `authorization_required` → 觸發現有 OAuth flow(保留不動)。貼 JSON 段把 textarea `JSON.parse` 後直接當此 body 送出。

## 5. 目標 3:i18n

- `react-i18next` + `i18next-browser-languagedetector`(偵測 `navigator.language`,fallback `en`)。
- 語言檔:`web/dashboard/src/locales/en.json`(base,所有 key 來源)、`zh-TW.json`。
- key 命名:巢狀 namespace,如 `nav.servers`、`addServer.tabs.remote`、`addServer.field.url`、`setupGuide.title`。
- 語言切換器:sidebar 底部(`en` / `繁體中文`),選擇持久化到 `localStorage`。
- PR1 範圍 = 把**現有畫面**所有可見字串抽成 key(機械性但量大);PR2/PR3 的新字串直接用 `t()`。

## 6. 目標 1:安裝說明頁(教學式,給小白)

- sidebar 在 `Documentation` 下方新增項(用戶截圖紅框位置),標題走 i18n(暫定 `setupGuide.navTitle`,如「安裝指南 / Setup Guide」)。
- 無 router → 沿用現有「自製 state 切 view」模式:擴充 `AppSection` union 加 `setup_guide`、`sectionMeta` 加一筆、`NavSidebar.tsx` 在 `Documentation` 連結下方新增 in-app 導航項(注意:現有 Report Bugs/Documentation 是外部 `<a>`,說明頁是內部 section button,需區分樣式)。
- **定位(user 決議):教完全沒接觸過的小白「怎麼裝一個 server」,以「實例 + 表單圖示標註」為主,不是欄位字典。**
- 內容(走 i18n,en/zh-TW 皆備):
  - 每種安裝方式給**一個完整可照抄的實例**:Remote = context7 `https://mcp.context7.com/mcp`;Local = filesystem `npx -y @modelcontextprotocol/server-filesystem /host`;JSON = 整段貼上範例。
  - **搭配 Add Server 表單的圖示/示意,把範例值標註在對應欄位上**(「這格填這個」),讓小白照著填。
  - 注意事項:stdio 需 gateway 為 `-stdio` image;remote 的 endpoint / `--registry` 對應。
- 定位:in-app 快速上手,與外部 `Documentation` 連結互補。

## 7. 元件邊界與資料流(設計給隔離)

- `AddServerModal`(容器:分段狀態 + 送出) → 子元件 `RemoteForm` / `LocalForm` / `JsonForm`,各自吐出一個標準化 `RegisterPayload`。
- `SegmentedControl`(通用、無業務邏輯,可重用)。
- `i18n`(`src/i18n.ts` 初始化 + `locales/*`),元件只透過 `useTranslation()` 取字串。
- `SetupGuidePage`(純展示,吃 i18n)。
- 介面契約:三個 Form 的對外型別都是 `RegisterPayload`,容器不需知道各表單內部 → 之後加第四種安裝方式只要加一個 Form + 一段。

## 8. 測試與驗證

- `tsc --noEmit` 型別、`vite build` 通過。
- 手動:起 dashboard,Remote / Local / JSON 三頁各成功註冊一個 server(對照 context7 remote、filesystem stdio)。
- i18n:切語言無漏字、grep 不到殘留寫死字串。
- 完整 build(含 `go:embed`)後在 binary 驗證 UI 生效。
- 對齊上游的 lint/format(實作前確認上游 CI 規範)。

## 9. 風險與回退

| 風險 | 回退 |
|---|---|
| 上游不收 / review 慢 | 改私有 fork 自 build `ghcr.io/elf-express/mcpjungle` 自用(本 repo compose 換 image tag 即可) |
| App.tsx 2211 行巨檔,改動易衝突 | PR2 把 register Modal 抽成獨立 `AddServerModal` 元件;i18n 抽字串純機械、分批進行 |
| i18n 抽字串量大 | 純機械性,PR1 獨立先行,不阻塞功能 PR |
| go:embed 需重 build 才生效 | 本地驗證走完整 build,不只 `vite dev` |

## 10. 範圍外(YAGNI)

- 簡中 / 日文(框架留好,之後加檔即可)
- OAuth 完整 UI(走「貼 JSON」)
- 批次貼多個 JSON
- 任何後端 Go 改動

## 11. 待 user 確認的決策點

1. Add Server 三頁欄位(尤其 Local 指令頁、貼 JSON 頁)是否符合預期? 
   + 答這個妳比我專業，你應該知道要那些欄位，如果你都不知道我怎麼可能會知道
2. i18n 用 `react-i18next`(vs 輕量自製)?

3. 安裝說明頁標題文案(「安裝指南 / Setup Guide」?)
    +主要能告訴小白怎麼安裝，最好是用舉例，然後填在UI圖上，這樣容易上手
4. OAuth / 批次 / 簡中日文 列為範圍外,OK?
    + 答 英文+繁體  不要搞複雜
5. PR 拆 3 個(vs 一大包)?
    + 答 一個plan中假設分成10各plance ，每一個plance又分成幾個task，當然每一個子計畫完成後就commit
    
