---
title: "Mdnsrepeater"
source: "https://docs.opnsense.org/development/api/plugins/mdnsrepeater.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 320
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:24.362Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Maltrail](<319 Maltrail.md>)　｜　[下一篇：Muninnode ➡](<321 Muninnode.md>)

# Mdnsrepeater

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | mdnsrepeater | service | reconfigure |  |
| `POST` | mdnsrepeater | service | restart |  |
| `POST` | mdnsrepeater | service | start |  |
| `GET` | mdnsrepeater | service | status |  |
| `POST` | mdnsrepeater | service | stop |  |

*Resources (SettingsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | mdnsrepeater | settings | get |  |
| `POST` | mdnsrepeater | settings | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [MDNSRepeater.xml](https://github.com/opnsense/plugins/blob/master/net/mdns-repeater/src/opnsense/mvc/app/models/OPNsense/MDNSRepeater/MDNSRepeater.xml) |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Maltrail](<319 Maltrail.md>)　｜　[下一篇：Muninnode ➡](<321 Muninnode.md>)
