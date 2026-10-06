---
title: "Tftp"
source: "https://docs.opnsense.org/development/api/plugins/tftp.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 353
lang: "zh-TW"
translated_by: "google_v2"
captured: "2026-09-26T11:34:39.040Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：電報](<352 電報.md>)　｜　[下一篇：我有 ➡](<354 我有.md>)

# Tftp

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*資源（GeneralController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `GET` | tftp | 常規 | 取得 | |
| `POST` | tftp | 通用 | 設定 | |
|  |  |  |  |  |
| `<<uses>>` | | | | *模型* [General.xml](https://github.com/opnsense/plugins/blob/master/ftp/tftp/src/opnsense/mvc/app/models/OPNsense/Tftp/General.xml) |

*服務（ServiceController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `POST` | tftp | 服務 | 重新配置 | |
| `POST` | tftp | 服務 | 重啟 | |
| `POST` | tftp | 服務 | 啟動 | |
| `GET` | tftp | 服務 | 狀態 | |
| `POST` | tftp | 服務 | 停止 | |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：電報](<352 電報.md>)　｜　[下一篇：我有 ➡](<354 我有.md>)
