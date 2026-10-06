---
title: "Puppetagent"
source: "https://docs.opnsense.org/development/api/plugins/puppetagent.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 336
lang: "en"
translated_by: "native"
captured: "2026-09-26T11:34:30.494Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Proxysso](<335 Proxysso.md>)　｜　[下一篇：Qemuguestagent ➡](<337 Qemuguestagent.md>)

# Puppetagent

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | puppetagent | service | reconfigure |  |
| `POST` | puppetagent | service | restart |  |
| `POST` | puppetagent | service | start |  |
| `GET` | puppetagent | service | status |  |
| `POST` | puppetagent | service | stop |  |

*Resources (SettingsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | puppetagent | settings | get |  |
| `POST` | puppetagent | settings | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [PuppetAgent.xml](https://github.com/opnsense/plugins/blob/master/sysutils/puppet-agent/src/opnsense/mvc/app/models/OPNsense/PuppetAgent/PuppetAgent.xml) |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Proxysso](<335 Proxysso.md>)　｜　[下一篇：Qemuguestagent ➡](<337 Qemuguestagent.md>)
