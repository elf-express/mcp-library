---
title: "Radsecproxy"
source: https://docs.opnsense.org/development/api/plugins/radsecproxy.html
chapter: ["Development Manual","API Reference","Plugins API"]
order: 340
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:32.970Z"
---


# Radsecproxy


*Resources (ClientsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | radsecproxy | clients | add\_item |  |
| `POST` | radsecproxy | clients | del\_item | $uuid |
| `GET` | radsecproxy | clients | get |  |
| `GET` | radsecproxy | clients | get\_item | $uuid=null |
| `GET,POST` | radsecproxy | clients | search\_item |  |
| `POST` | radsecproxy | clients | set |  |
| `POST` | radsecproxy | clients | set\_item | $uuid |
| `POST` | radsecproxy | clients | toggle\_item | $uuid,$enabled=null |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [RadSecProxy.xml](https://github.com/opnsense/plugins/blob/master/net/radsecproxy/src/opnsense/mvc/app/models/OPNsense/RadSecProxy/RadSecProxy.xml) |

*Resources (GeneralController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | radsecproxy | general | get |  |
| `POST` | radsecproxy | general | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [RadSecProxy.xml](https://github.com/opnsense/plugins/blob/master/net/radsecproxy/src/opnsense/mvc/app/models/OPNsense/RadSecProxy/RadSecProxy.xml) |

*Resources (RealmsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | radsecproxy | realms | add\_item |  |
| `POST` | radsecproxy | realms | del\_item | $uuid |
| `GET` | radsecproxy | realms | get |  |
| `GET` | radsecproxy | realms | get\_item | $uuid=null |
| `GET,POST` | radsecproxy | realms | search\_item |  |
| `POST` | radsecproxy | realms | set |  |
| `POST` | radsecproxy | realms | set\_item | $uuid |
| `POST` | radsecproxy | realms | toggle\_item | $uuid,$enabled=null |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [RadSecProxy.xml](https://github.com/opnsense/plugins/blob/master/net/radsecproxy/src/opnsense/mvc/app/models/OPNsense/RadSecProxy/RadSecProxy.xml) |

*Resources (RewritesController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | radsecproxy | rewrites | add\_item |  |
| `POST` | radsecproxy | rewrites | del\_item | $uuid |
| `GET` | radsecproxy | rewrites | get |  |
| `GET` | radsecproxy | rewrites | get\_item | $uuid=null |
| `GET,POST` | radsecproxy | rewrites | search\_item |  |
| `POST` | radsecproxy | rewrites | set |  |
| `POST` | radsecproxy | rewrites | set\_item | $uuid |
| `POST` | radsecproxy | rewrites | toggle\_item | $uuid,$enabled=null |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [RadSecProxy.xml](https://github.com/opnsense/plugins/blob/master/net/radsecproxy/src/opnsense/mvc/app/models/OPNsense/RadSecProxy/RadSecProxy.xml) |

*Resources (ServersController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | radsecproxy | servers | add\_item |  |
| `POST` | radsecproxy | servers | del\_item | $uuid |
| `GET` | radsecproxy | servers | get |  |
| `GET` | radsecproxy | servers | get\_item | $uuid=null |
| `GET,POST` | radsecproxy | servers | search\_item |  |
| `POST` | radsecproxy | servers | set |  |
| `POST` | radsecproxy | servers | set\_item | $uuid |
| `POST` | radsecproxy | servers | toggle\_item | $uuid,$enabled=null |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [RadSecProxy.xml](https://github.com/opnsense/plugins/blob/master/net/radsecproxy/src/opnsense/mvc/app/models/OPNsense/RadSecProxy/RadSecProxy.xml) |

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | radsecproxy | service | reconfigure |  |
| `POST` | radsecproxy | service | restart |  |
| `POST` | radsecproxy | service | start |  |
| `GET` | radsecproxy | service | status |  |
| `POST` | radsecproxy | service | stop |  |

*Resources (TlsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | radsecproxy | tls | add\_item |  |
| `POST` | radsecproxy | tls | del\_item | $uuid |
| `GET` | radsecproxy | tls | get |  |
| `GET` | radsecproxy | tls | get\_item | $uuid=null |
| `GET,POST` | radsecproxy | tls | search\_item |  |
| `POST` | radsecproxy | tls | set |  |
| `POST` | radsecproxy | tls | set\_item | $uuid |
| `POST` | radsecproxy | tls | toggle\_item | $uuid,$enabled=null |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [RadSecProxy.xml](https://github.com/opnsense/plugins/blob/master/net/radsecproxy/src/opnsense/mvc/app/models/OPNsense/RadSecProxy/RadSecProxy.xml) |

---

