---
title: "Trust"
source: "https://docs.opnsense.org/development/api/core/trust.html"
chapter: ["Development Manual","API Reference","Core API"]
order: 291
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:07.670Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Trafficshaper](<290 Trafficshaper.md>)　｜　[下一篇：Unbound ➡](<292 Unbound.md>)

# Trust

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Core API](<000 目錄.md#c-59>)

*Resources (CaController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | trust | ca | add |  |
| `GET` | trust | ca | ca\_info | $caref |
| `GET` | trust | ca | ca\_list |  |
| `POST` | trust | ca | del | $uuid |
| `POST` | trust | ca | generate\_file | $uuid=null,$type=crt |
| `GET` | trust | ca | get | $uuid=null |
| `GET` | trust | ca | raw\_dump | $uuid |
| `GET,POST` | trust | ca | search |  |
| `POST` | trust | ca | set | $uuid=null |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Ca.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/Trust/Ca.xml) |

*Resources (CertController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | trust | cert | add |  |
| `GET` | trust | cert | ca\_info | $caref=null |
| `GET` | trust | cert | ca\_list |  |
| `POST` | trust | cert | del | $uuid |
| `POST` | trust | cert | generate\_file | $uuid=null,$type=crt |
| `GET` | trust | cert | get | $uuid=null |
| `GET` | trust | cert | raw\_dump | $uuid |
| `GET,POST` | trust | cert | search |  |
| `POST` | trust | cert | set | $uuid=null |
| `GET` | trust | cert | user\_list |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Cert.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/Trust/Cert.xml) |

*Resources (CrlController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | trust | crl | del | $caref |
| `GET` | trust | crl | get | $caref |
| `GET` | trust | crl | get\_ocsp\_info\_data | $caref |
| `GET` | trust | crl | raw\_dump | $caref |
| `GET` | trust | crl | search |  |
| `POST` | trust | crl | set | $caref |

*Resources (SettingsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | trust | settings | get |  |
| `POST` | trust | settings | reconfigure |  |
| `POST` | trust | settings | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [General.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/Trust/General.xml) |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Trafficshaper](<290 Trafficshaper.md>)　｜　[下一篇：Unbound ➡](<292 Unbound.md>)
