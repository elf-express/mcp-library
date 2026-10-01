---
title: "Ftpproxy｜FTPP代理"
title_original: "Ftpproxy"
source: "https://docs.opnsense.org/development/api/plugins/ftpproxy.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 312
lang: "bilingual"
translated_by: "google_v2"
captured: "2026-09-26T11:34:18.269Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Freeradius｜自由半徑](<311 自由半徑.md>)　｜　[下一篇：Gridexample｜網格範例 ➡](<313 網格範例.md>)

# Ftpproxy｜FTPP代理

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*Service (ServiceController.php)*

*服務（ServiceController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `GET` | ftpproxy | service<br>服務 | config<br>設定 |  |
| `GET` | ftpproxy | service<br>服務 | reload<br>重新載入 |  |
| `GET` | ftpproxy | service<br>服務 | restart<br>重啟 | $uuid |
| `GET` | ftpproxy | service<br>服務 | start<br>啟動 | $uuid |
| `GET` | ftpproxy | service<br>服務 | status<br>狀態 | $uuid |
| `GET` | ftpproxy | service<br>服務 | stop<br>停止 | $uuid |

*Resources (SettingsController.php)*

*資源（SettingsController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `POST` | ftpproxy | settings<br>設定 | add\_proxy<br>新增代理 |  |
| `POST` | ftpproxy | settings<br>設定 | del\_proxy<br>刪除代理程式 | $uuid |
| `GET` | ftpproxy | settings<br>設定 | get\_proxy<br>取得代理 | $uuid=null |
| `GET` | ftpproxy | settings<br>設定 | search\_proxy<br>搜尋代理 |  |
| `POST` | ftpproxy | settings<br>設定 | set\_proxy<br>設定代理程式 | $uuid |
| `POST` | ftpproxy | settings<br>設定 | toggle\_proxy | $uuid |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Freeradius｜自由半徑](<311 自由半徑.md>)　｜　[下一篇：Gridexample｜網格範例 ➡](<313 網格範例.md>)
