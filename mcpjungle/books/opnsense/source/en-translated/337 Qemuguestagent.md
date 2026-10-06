---
title: "Qemuguestagent"
source: "https://docs.opnsense.org/development/api/plugins/qemuguestagent.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 337
lang: "en"
translated_by: "native"
captured: "2026-09-26T11:34:31.017Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Puppetagent](<336 Puppetagent.md>)　｜　[下一篇：Qfeeds ➡](<338 Qfeeds.md>)

# Qemuguestagent

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | qemuguestagent | service | reconfigure |  |
| `POST` | qemuguestagent | service | restart |  |
| `POST` | qemuguestagent | service | start |  |
| `GET` | qemuguestagent | service | status |  |
| `POST` | qemuguestagent | service | stop |  |

*Resources (SettingsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | qemuguestagent | settings | get |  |
| `POST` | qemuguestagent | settings | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [QemuGuestAgent.xml](https://github.com/opnsense/plugins/blob/master/emulators/qemu-guest-agent/src/opnsense/mvc/app/models/OPNsense/QemuGuestAgent/QemuGuestAgent.xml) |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Puppetagent](<336 Puppetagent.md>)　｜　[下一篇：Qfeeds ➡](<338 Qfeeds.md>)
