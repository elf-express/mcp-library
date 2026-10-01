---
title: "Qemuguestagent"
source: "https://docs.opnsense.org/development/api/plugins/qemuguestagent.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 337
lang: "bilingual"
translated_by: "google_v2"
captured: "2026-09-26T11:34:31.017Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Puppetagent｜普佩塔特](<336 普佩塔特.md>)　｜　[下一篇：Qfeeds ➡](<338 Qfeeds.md>)

# Qemuguestagent

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*Service (ServiceController.php)*

*服務（ServiceController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `POST` | qemuguestagent | service<br>服務 | reconfigure<br>重新配置 |  |
| `POST` | qemuguestagent | service<br>服務 | restart<br>重啟 |  |
| `POST` | qemuguestagent | service<br>服務 | start<br>開始 |  |
| `GET` | qemuguestagent | service<br>服務 | status<br>狀態 |  |
| `POST` | qemuguestagent | service<br>服務 | stop<br>停止 |  |

*Resources (SettingsController.php)*

*資源（SettingsController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `GET` | qemuguestagent | settings<br>設定 | get<br>取得 |  |
| `POST` | qemuguestagent | settings<br>設定 | set<br>設定 |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [QemuGuestAgent.xml](https://github.com/opnsense/plugins/blob/master/emulators/qemu-guest-agent/src/opnsense/mvc/app/models/OPNsense/QemuGuestAgent/QemuGuestAgent.xml)<br>*模型* [QemuGuestAgent.xml](https://github.com/opnsense/plugins/blob/master/emulators/qemu-guest-agent/src/opnsense/mvc/app/models/OPNsense/QemuGuestAgent/QemuGuestAgent.xml) |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Puppetagent｜普佩塔特](<336 普佩塔特.md>)　｜　[下一篇：Qfeeds ➡](<338 Qfeeds.md>)
