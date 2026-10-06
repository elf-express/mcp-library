---
title: "Ndpproxy"
source: "https://docs.opnsense.org/development/api/plugins/ndpproxy.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 322
lang: "zh-TW"
translated_by: "google_v2"
captured: "2026-09-26T11:34:23.345Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：穆尼諾德](<321 穆尼諾德.md>)　｜　[下一篇：ND代理 ➡](<323 ND代理.md>)

# Ndpproxy

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*資源（GeneralController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `POST` | ndpproxy | general | add\_a​​lias | |
| `POST` | ndpproxy | general | del\_alias | $uuid |
| `GET` | ndpproxy | 常規 | 取得 | |
| `GET` | ndpproxy | general | get\_alias | $uuid=null |
| `GET,POST` | ndpproxy | 常規 | 搜尋別名 | |
| `POST` | ndpproxy | 通用 | 集 | |
| `POST` | ndpproxy | general | set\_alias | $uuid |
|  |  |  |  |  |
| `<<uses>>` | | | | *模型* [NdpProxy.xml](https://github.com/opnsense/plugins/blob/master/net/ndp-proxy-go/src/opnsense/mvc/app/models/OPNsense/NdpProxy/NdpProxy.xml) |

*服務（ServiceController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `POST` | ndpproxy | 服務 | 重新配置 | |
| `POST` | ndpproxy | 服務 | 重啟 | |
| `POST` | ndpproxy | 服務 | 啟動 | |
| `GET` | ndpproxy | 服務 | 狀態 | |
| `POST` | ndpproxy | 服務 | 停止 | |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：穆尼諾德](<321 穆尼諾德.md>)　｜　[下一篇：ND代理 ➡](<323 ND代理.md>)
