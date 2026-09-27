---
title: "Bind"
source: "https://docs.opnsense.org/development/api/plugins/bind.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 297
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:11.706Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Beats](<296 Beats.md>)　｜　[下一篇：Caddy ➡](<298 Caddy.md>)

# Bind

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*Resources (AclController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | bind | acl | add\_acl |  |
| `POST` | bind | acl | del\_acl | $uuid |
| `GET` | bind | acl | get |  |
| `GET` | bind | acl | get\_acl | $uuid=null |
| `GET,POST` | bind | acl | search\_acl |  |
| `POST` | bind | acl | set |  |
| `POST` | bind | acl | set\_acl | $uuid |
| `POST` | bind | acl | toggle\_acl | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Acl.xml](https://github.com/opnsense/plugins/blob/master/dns/bind/src/opnsense/mvc/app/models/OPNsense/Bind/Acl.xml) |

*Resources (DnsblController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | bind | dnsbl | get |  |
| `POST` | bind | dnsbl | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Dnsbl.xml](https://github.com/opnsense/plugins/blob/master/dns/bind/src/opnsense/mvc/app/models/OPNsense/Bind/Dnsbl.xml) |

*Resources (DomainController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | bind | domain | add\_forward\_domain | $uuid=null |
| `POST` | bind | domain | add\_primary\_domain | $uuid=null |
| `POST` | bind | domain | add\_secondary\_domain | $uuid=null |
| `POST` | bind | domain | del\_domain | $uuid |
| `GET` | bind | domain | get |  |
| `GET` | bind | domain | get\_domain | $uuid=null |
| `GET,POST` | bind | domain | search\_forward\_domain |  |
| `GET` | bind | domain | search\_master\_domain |  |
| `GET,POST` | bind | domain | search\_primary\_domain |  |
| `GET,POST` | bind | domain | search\_secondary\_domain |  |
| `GET` | bind | domain | search\_slave\_domain |  |
| `POST` | bind | domain | set |  |
| `POST` | bind | domain | set\_domain | $uuid=null |
| `POST` | bind | domain | toggle\_domain | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Domain.xml](https://github.com/opnsense/plugins/blob/master/dns/bind/src/opnsense/mvc/app/models/OPNsense/Bind/Domain.xml) |

*Resources (GeneralController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | bind | general | get |  |
| `POST` | bind | general | set |  |
| `GET` | bind | general | zoneshow | $zonename=null |
| `GET` | bind | general | zonetest | $zonename=null |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [General.xml](https://github.com/opnsense/plugins/blob/master/dns/bind/src/opnsense/mvc/app/models/OPNsense/Bind/General.xml) |

*Resources (RecordController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | bind | record | add\_record |  |
| `POST` | bind | record | del\_record | $uuid |
| `GET` | bind | record | get |  |
| `GET` | bind | record | get\_record | $uuid=null |
| `GET,POST` | bind | record | search\_record |  |
| `POST` | bind | record | set |  |
| `POST` | bind | record | set\_record | $uuid=null |
| `POST` | bind | record | toggle\_record | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Record.xml](https://github.com/opnsense/plugins/blob/master/dns/bind/src/opnsense/mvc/app/models/OPNsense/Bind/Record.xml) |

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | bind | service | dnsbl |  |
| `POST` | bind | service | reconfigure |  |
| `POST` | bind | service | restart |  |
| `POST` | bind | service | start |  |
| `GET` | bind | service | status |  |
| `POST` | bind | service | stop |  |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Beats](<296 Beats.md>)　｜　[下一篇：Caddy ➡](<298 Caddy.md>)
