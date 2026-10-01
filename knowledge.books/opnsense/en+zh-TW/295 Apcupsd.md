---
title: "Apcupsd"
source: "https://docs.opnsense.org/development/api/plugins/apcupsd.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 295
lang: "bilingual"
translated_by: "google_v2"
captured: "2026-09-26T11:34:10.171Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Acmeclient](<294 Acmeclient.md>)　｜　[下一篇：Beats｜節拍 ➡](<296 節拍.md>)

# Apcupsd

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*Service (ServiceController.php)*

*服務（ServiceController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `GET` | apcupsd | service<br>服務 | get\_ups\_status<br>取得 ups 狀態 |  |
| `POST` | apcupsd | service<br>服務 | reconfigure<br>重新配置 |  |
| `POST` | apcupsd | service<br>服務 | restart<br>重啟 |  |
| `POST` | apcupsd | service<br>服務 | start<br>開始 |  |
| `GET` | apcupsd | service<br>服務 | status<br>狀態 |  |
| `POST` | apcupsd | service<br>服務 | stop<br>停止 |  |

*Resources (SettingsController.php)*

*資源（SettingsController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `GET` | apcupsd | settings<br>設定 | get<br>取得 |  |
| `POST` | apcupsd | settings<br>設定 | set<br>設定 |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Apcupsd.xml](https://github.com/opnsense/plugins/blob/master/sysutils/apcupsd/src/opnsense/mvc/app/models/OPNsense/Apcupsd/Apcupsd.xml)<br>*模型* [Apcupsd.xml](https://github.com/opnsense/plugins/blob/master/sysutils/apcupsd/src/opnsense/mvc/app/models/OPNsense/Apcupsd/Apcupsd.xml) |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Acmeclient](<294 Acmeclient.md>)　｜　[下一篇：Beats｜節拍 ➡](<296 節拍.md>)
