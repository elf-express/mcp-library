---
title: "Netbird"
source: "https://docs.opnsense.org/development/api/plugins/netbird.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 324
lang: "bilingual"
translated_by: "google_v2"
captured: "2026-09-26T11:34:25.378Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Ndproxy｜ND代理](<323 ND代理.md>)　｜　[下一篇：Netdata｜網路數據 ➡](<325 網路數據.md>)

# Netbird

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*Resources (AuthenticationController.php)*

*資源（AuthenticationController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `GET` | netbird | authentication<br>驗證 | down<br>已關閉 |  |
| `GET` | netbird | authentication<br>驗證 | get<br>取得 |  |
| `POST` | netbird | authentication<br>認證 | set<br>設定 |  |
| `GET` | netbird | authentication<br>驗證 | up<br>向上 |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Authentication.xml](https://github.com/opnsense/plugins/blob/master/security/netbird/src/opnsense/mvc/app/models/OPNsense/Netbird/Authentication.xml)<br>*模型* [Authentication.xml](https://github.com/opnsense/plugins/blob/master/security/netbird/src/opnsense/mvc/app/models/OPNsense/Netbird/Authentication.xml) |

*Service (ServiceController.php)*

*服務（ServiceController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `POST` | netbird<br>Netbird | service<br>服務 | reconfigure<br>重新設定 |  |
| `POST` | netbird | service<br>服務 | restart<br>重啟 |  |
| `POST` | netbird | service<br>服務 | start<br>開始 |  |
| `GET` | netbird<br>Netbird | service<br>服務 | status<br>狀態 |  |
| `POST` | netbird | service<br>服務 | stop<br>停止 |  |

*Resources (SettingsController.php)*

*資源（SettingsController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `GET` | netbird<br>Netbird | settings<br>設定 | get<br>取得 |  |
| `POST` | netbird<br>Netbird | settings<br>設定 | set<br>設定 |  |
| `GET` | netbird<br>Netbird | settings<br>設定 | sync<br>同步 |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Settings.xml](https://github.com/opnsense/plugins/blob/master/security/netbird/src/opnsense/mvc/app/models/OPNsense/Netbird/Settings.xml)<br>*模型* [Settings.xml](https://github.com/opnsense/plugins/blob/master/security/netbird/src/opnsense/mvc/app/models/OPNsense/Netbird/Settings.xml) |

*Resources (StatusController.php)*

*資源（StatusController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `GET` | netbird | status<br>狀態 | get<br>取得 |  |
| `POST` | netbird | status<br>狀態 | set<br>設定 |  |
| `GET` | netbird | status<br>狀態 | status<br>狀態 |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Status.xml](https://github.com/opnsense/plugins/blob/master/security/netbird/src/opnsense/mvc/app/models/OPNsense/Netbird/Status.xml)<br>*模型* [Status.xml](https://github.com/opnsense/plugins/blob/master/security/netbird/src/opnsense/mvc/app/models/OPNsense/Netbird/Status.xml) |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Ndproxy｜ND代理](<323 ND代理.md>)　｜　[下一篇：Netdata｜網路數據 ➡](<325 網路數據.md>)
