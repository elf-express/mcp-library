---
title: "Wazuhagent"
source: "https://docs.opnsense.org/development/api/plugins/wazuhagent.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 359
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:42.842Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Vnstat](<358 Vnstat.md>)　｜　[下一篇：Wol ➡](<360 Wol.md>)

# Wazuhagent

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | wazuhagent | service | reconfigure |  |
| `POST` | wazuhagent | service | restart |  |
| `POST` | wazuhagent | service | start |  |
| `GET` | wazuhagent | service | status |  |
| `POST` | wazuhagent | service | stop |  |

*Resources (SettingsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | wazuhagent | settings | get |  |
| `POST` | wazuhagent | settings | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [WazuhAgent.xml](https://github.com/opnsense/plugins/blob/master/security/wazuh-agent/src/opnsense/mvc/app/models/OPNsense/WazuhAgent/WazuhAgent.xml) |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Vnstat](<358 Vnstat.md>)　｜　[下一篇：Wol ➡](<360 Wol.md>)
