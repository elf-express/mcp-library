---
title: "Dhcpv4｜DHCPv4"
title_original: "Dhcpv4"
source: "https://docs.opnsense.org/development/api/plugins/dhcpv4.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 305
lang: "bilingual"
translated_by: "google_v2"
captured: "2026-09-26T11:34:14.730Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Crowdsec｜眾包](<303 眾包.md>)　｜　[下一篇：Dhcpv6｜DHCP6 ➡](<306 DHCP6.md>)

# Dhcpv4｜DHCPv4

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*Resources (LeasesController.php)*

*資源（LeasesController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `POST` | dhcpv4 | leases<br>租賃 | del\_lease | $ip |
| `GET` | dhcpv4 | leases<br>租賃 | search\_lease<br>搜尋租賃 |  |

*Service (ServiceController.php)*

*服務（ServiceController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `POST` | dhcpv4 | service<br>服務 | reconfigure<br>重新配置 |  |
| `POST` | dhcpv4 | service<br>服務 | restart<br>重啟 |  |
| `POST` | dhcpv4 | service<br>服務 | start<br>啟動 |  |
| `GET` | dhcpv4 | service<br>服務 | status<br>狀態 |  |
| `POST` | dhcpv4 | service<br>服務 | stop<br>停止 |  |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Crowdsec｜眾包](<303 眾包.md>)　｜　[下一篇：Dhcpv6｜DHCP6 ➡](<306 DHCP6.md>)
