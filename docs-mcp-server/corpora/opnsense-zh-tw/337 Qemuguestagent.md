---
title: "Qemuguestagent"
source: "https://docs.opnsense.org/development/api/plugins/qemuguestagent.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 337
lang: "zh-TW"
translated_by: "google_v2"
captured: "2026-09-26T11:34:31.017Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：普佩塔特](<336 普佩塔特.md>)　｜　[下一篇：Qfeeds ➡](<338 Qfeeds.md>)

# Qemuguestagent

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*服務（ServiceController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `POST` | qemuguestagent | 服務 | 重新配置 | |
| `POST` | qemuguestagent | 服務 | 重啟 | |
| `POST` | qemuguestagent | 服務 | 開始 | |
| `GET` | qemuguestagent | 服務 | 狀態 | |
| `POST` | qemuguestagent | 服務 | 停止 | |

*資源（SettingsController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `GET` | qemuguestagent | 設定 | 取得 | |
| `POST` | qemuguestagent | 設定 | 設定 | |
|  |  |  |  |  |
| `<<uses>>` | | | | *模型* [QemuGuestAgent.xml](https://github.com/opnsense/plugins/blob/master/emulators/qemu-guest-agent/src/opnsense/mvc/app/models/OPNsense/QemuGuestAgent/QemuGuestAgent.xml) |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：普佩塔特](<336 普佩塔特.md>)　｜　[下一篇：Qfeeds ➡](<338 Qfeeds.md>)
