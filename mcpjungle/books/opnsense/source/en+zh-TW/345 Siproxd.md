---
title: "Siproxd"
source: "https://docs.opnsense.org/development/api/plugins/siproxd.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 345
lang: "bilingual"
translated_by: "google_v2"
captured: "2026-09-26T11:34:35.970Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Shadowsocks｜影子襪](<344 影子襪.md>)　｜　[下一篇：Smart｜聰明的 ➡](<346 聰明的.md>)

# Siproxd

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*Resources (DomainController.php)*

*資源（DomainController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `POST` | siproxd | domain | add\_domain |  |
| `POST` | siproxd | domain | del\_domain | $uuid |
| `GET` | siproxd | domain<br>域 | get<br>取得 |  |
| `GET` | siproxd | domain | get\_domain | $uuid=null |
| `GET` | siproxd | domain<br>域 | search\_domain<br>搜尋域 |  |
| `POST` | siproxd | domain<br>域 | set<br>集 |  |
| `POST` | siproxd | domain | set\_domain | $uuid |
| `GET` | siproxd | domain | toggle\_domain | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Domain.xml](https://github.com/opnsense/plugins/blob/master/net/siproxd/src/opnsense/mvc/app/models/OPNsense/Siproxd/Domain.xml)<br>*模型* [Domain.xml](https://github.com/opnsense/plugins/blob/master/net/siproxd/src/opnsense/mvc/app/models/OPNsense/Siproxd/Domain.xml) |

*Resources (GeneralController.php)*

*資源（GeneralController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `GET` | siproxd | general<br>常規 | get<br>取得 |  |
| `POST` | siproxd | general<br>通用 | set<br>集 |  |

*Service (ServiceController.php)*

*服務（ServiceController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `POST` | siproxd | service<br>服務 | reconfigure<br>重新配置 |  |
| `POST` | siproxd | service<br>服務 | restart<br>重啟 |  |
| `GET` | siproxd | service<br>服務 | showregistrations<br>演出註冊 |  |
| `POST` | siproxd | service<br>服務 | start<br>開始 |  |
| `GET` | siproxd | service<br>服務 | status<br>狀態 |  |
| `POST` | siproxd | service<br>服務 | stop<br>停止 |  |

*Resources (UserController.php)*

*資源（UserController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `POST` | siproxd | user<br>使用者 | add\_user<br>新增使用者 |  |
| `POST` | siproxd | user<br>使用者 | del\_user | $uuid |
| `GET` | siproxd | user<br>用戶 | get<br>取得 |  |
| `GET` | siproxd | user<br>用戶 | get\_user<br>取得用戶 | $uuid=null |
| `GET` | siproxd | user<br>用戶 | search\_user<br>搜尋用戶 |  |
| `POST` | siproxd | user<br>使用者 | set<br>設定 |  |
| `POST` | siproxd | user<br>使用者 | set\_user<br>設定使用者 | $uuid |
| `GET` | siproxd | user<br>使用者 | toggle\_user | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [User.xml](https://github.com/opnsense/plugins/blob/master/net/siproxd/src/opnsense/mvc/app/models/OPNsense/Siproxd/User.xml)<br>*模型* [User.xml](https://github.com/opnsense/plugins/blob/master/net/siproxd/src/opnsense/mvc/app/models/OPNsense/Siproxd/User.xml) |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Shadowsocks｜影子襪](<344 影子襪.md>)　｜　[下一篇：Smart｜聰明的 ➡](<346 聰明的.md>)
