---
title: "Dhcpv4"
source: "https://docs.opnsense.org/development/api/plugins/dhcpv4.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 305
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:14.730Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Crowdsec](<303 Crowdsec.md>)　｜　[下一篇：Dhcpv6 ➡](<306 Dhcpv6.md>)

# Dhcpv4

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*Resources (LeasesController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | dhcpv4 | leases | del\_lease | $ip |
| `GET` | dhcpv4 | leases | search\_lease |  |

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | dhcpv4 | service | reconfigure |  |
| `POST` | dhcpv4 | service | restart |  |
| `POST` | dhcpv4 | service | start |  |
| `GET` | dhcpv4 | service | status |  |
| `POST` | dhcpv4 | service | stop |  |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Crowdsec](<303 Crowdsec.md>)　｜　[下一篇：Dhcpv6 ➡](<306 Dhcpv6.md>)
