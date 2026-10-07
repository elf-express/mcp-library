---
title: "DHCPv4"
title_original: "Dhcpv4"
source: https://docs.opnsense.org/development/api/plugins/dhcpv4.html
chapter: ["Development Manual","API Reference","Plugins API"]
order: 305
lang: "zh-TW"
translated_by: "google_v2"
captured: "2026-09-26T11:34:14.730Z"
---

# DHCPv4

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