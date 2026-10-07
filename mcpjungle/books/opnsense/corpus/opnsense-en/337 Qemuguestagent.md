---
title: "Qemuguestagent"
source: https://docs.opnsense.org/development/api/plugins/qemuguestagent.html
chapter: ["Development Manual","API Reference","Plugins API"]
order: 337
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:31.017Z"
---


# Qemuguestagent


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

