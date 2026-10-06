---
title: "Helloworld"
source: "https://docs.opnsense.org/development/api/plugins/helloworld.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 315
lang: "en"
translated_by: "native"
captured: "2026-09-26T11:34:20.299Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Haproxy](<314 Haproxy.md>)　｜　[下一篇：Hwprobe ➡](<316 Hwprobe.md>)

# Helloworld

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | helloworld | service | reload |  |
| `POST` | helloworld | service | test |  |

*Resources (SettingsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | helloworld | settings | get |  |
| `POST` | helloworld | settings | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [HelloWorld.xml](https://github.com/opnsense/plugins/blob/master/devel/helloworld/src/opnsense/mvc/app/models/OPNsense/HelloWorld/HelloWorld.xml) |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Haproxy](<314 Haproxy.md>)　｜　[下一篇：Hwprobe ➡](<316 Hwprobe.md>)
