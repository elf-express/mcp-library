---
title: "FTPP代理"
title_original: "Ftpproxy"
source: "https://docs.opnsense.org/development/api/plugins/ftpproxy.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 312
lang: "zh-TW"
translated_by: "google_v2"
captured: "2026-09-26T11:34:18.269Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：自由半徑](<311 自由半徑.md>)　｜　[下一篇：網格範例 ➡](<313 網格範例.md>)

# FTPP代理

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*服務（ServiceController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `GET` | ftpproxy | 服務 | 設定 | |
| `GET` | ftpproxy | 服務 | 重新載入 | |
| `GET` | ftpproxy | 服務 | 重啟 | $uuid |
| `GET` | ftpproxy | 服務 | 啟動 | $uuid |
| `GET` | ftpproxy | 服務 | 狀態 | $uuid |
| `GET` | ftpproxy | 服務 | 停止 | $uuid |

*資源（SettingsController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `POST` | ftpproxy | 設定 | 新增代理 | |
| `POST` | ftpproxy | 設定 | 刪除代理程式 | $uuid |
| `GET` | ftpproxy | 設定 | 取得代理 | $uuid=null |
| `GET` | ftpproxy | 設定 | 搜尋代理 | |
| `POST` | ftpproxy | 設定 | 設定代理程式 | $uuid |
| `POST` | ftpproxy | 設定 | toggle\_proxy | $uuid |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：自由半徑](<311 自由半徑.md>)　｜　[下一篇：網格範例 ➡](<313 網格範例.md>)
