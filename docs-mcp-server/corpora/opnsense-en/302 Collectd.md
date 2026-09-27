---
title: "Collectd"
source: "https://docs.opnsense.org/development/api/plugins/collectd.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 302
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:14.224Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Clamav](<301 Clamav.md>)　｜　[下一篇：Crowdsec ➡](<303 Crowdsec.md>)

# Collectd

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*Resources (GeneralController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | collectd | general | get |  |
| `POST` | collectd | general | set |  |

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | collectd | service | reconfigure |  |
| `POST` | collectd | service | restart |  |
| `POST` | collectd | service | start |  |
| `GET` | collectd | service | status |  |
| `POST` | collectd | service | stop |  |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Clamav](<301 Clamav.md>)　｜　[下一篇：Crowdsec ➡](<303 Crowdsec.md>)
