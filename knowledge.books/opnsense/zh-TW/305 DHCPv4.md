---
title: "DHCPv4"
title_original: "Dhcpv4"
source: "https://docs.opnsense.org/development/api/plugins/dhcpv4.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 305
lang: "zh-TW"
translated_by: "google_v2"
captured: "2026-09-26T11:34:14.730Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：眾包](<303 眾包.md>)　｜　[下一篇：DHCP6 ➡](<306 DHCP6.md>)

# DHCPv4

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*資源（LeasesController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `POST` | dhcpv4 | 租賃 | del\_lease | $ip |
| `GET` | dhcpv4 | 租賃 | 搜尋租賃 | |

*服務（ServiceController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `POST` | dhcpv4 | 服務 | 重新配置 | |
| `POST` | dhcpv4 | 服務 | 重啟 | |
| `POST` | dhcpv4 | 服務 | 啟動 | |
| `GET` | dhcpv4 | 服務 | 狀態 | |
| `POST` | dhcpv4 | 服務 | 停止 | |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：眾包](<303 眾包.md>)　｜　[下一篇：DHCP6 ➡](<306 DHCP6.md>)
