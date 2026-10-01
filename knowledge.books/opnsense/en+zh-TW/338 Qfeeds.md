---
title: "Qfeeds"
source: "https://docs.opnsense.org/development/api/plugins/qfeeds.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 338
lang: "bilingual"
translated_by: "google_v2"
captured: "2026-09-26T11:34:31.458Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Qemuguestagent](<337 Qemuguestagent.md>)　｜　[下一篇：Quagga｜斑驢 ➡](<339 斑驢.md>)

# Qfeeds

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*Resources (SettingsController.php)*

*資源（SettingsController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `GET` | qfeeds | settings<br>設定 | get<br>取得 |  |
| `GET` | qfeeds | settings<br>設定 | reconfigure<br>重新配置 |  |
| `GET` | qfeeds | settings<br>設定 | search\_events<br>搜尋_事件 |  |
| `GET` | qfeeds | settings<br>設定 | search\_feeds<br>搜尋_feeds |  |
| `POST` | qfeeds | settings<br>設定 | set<br>設定 |  |
| `GET` | qfeeds | settings<br>設定 | stats<br>統計 |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Connector.xml](https://github.com/opnsense/plugins/blob/master/security/q-feeds-connector/src/opnsense/mvc/app/models/OPNsense/QFeeds/Connector.xml)<br>*模型* [Connector.xml](https://github.com/opnsense/plugins/blob/master/security/q-feeds-connector/src/opnsense/mvc/app/models/OPNsense/QFeeds/Connector.xml) |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Qemuguestagent](<337 Qemuguestagent.md>)　｜　[下一篇：Quagga｜斑驢 ➡](<339 斑驢.md>)
