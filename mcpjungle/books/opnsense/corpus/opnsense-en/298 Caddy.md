---
title: "Caddy"
source: https://docs.opnsense.org/development/api/plugins/caddy.html
chapter: ["Development Manual","API Reference","Plugins API"]
order: 298
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:11.209Z"
---


# Caddy


*Resources (DiagnosticsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | caddy | diagnostics | caddyfile |  |
| `GET` | caddy | diagnostics | config |  |
| `GET` | caddy | diagnostics | get |  |
| `POST` | caddy | diagnostics | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Caddy.xml](https://github.com/opnsense/plugins/blob/master/www/caddy/src/opnsense/mvc/app/models/OPNsense/Caddy/Caddy.xml) |

*Resources (GeneralController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | caddy | general | get |  |
| `POST` | caddy | general | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Caddy.xml](https://github.com/opnsense/plugins/blob/master/www/caddy/src/opnsense/mvc/app/models/OPNsense/Caddy/Caddy.xml) |

*Resources (ReverseProxyController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | caddy | reverse\_proxy | add\_access\_list |  |
| `POST` | caddy | reverse\_proxy | add\_basic\_auth |  |
| `POST` | caddy | reverse\_proxy | add\_handle |  |
| `POST` | caddy | reverse\_proxy | add\_header |  |
| `POST` | caddy | reverse\_proxy | add\_layer4 |  |
| `POST` | caddy | reverse\_proxy | add\_layer4\_openvpn |  |
| `POST` | caddy | reverse\_proxy | add\_reverse\_proxy |  |
| `POST` | caddy | reverse\_proxy | add\_subdomain |  |
| `POST` | caddy | reverse\_proxy | del\_access\_list | $uuid |
| `POST` | caddy | reverse\_proxy | del\_basic\_auth | $uuid |
| `POST` | caddy | reverse\_proxy | del\_handle | $uuid |
| `POST` | caddy | reverse\_proxy | del\_header | $uuid |
| `POST` | caddy | reverse\_proxy | del\_layer4 | $uuid |
| `POST` | caddy | reverse\_proxy | del\_layer4\_openvpn | $uuid |
| `POST` | caddy | reverse\_proxy | del\_reverse\_proxy | $uuid |
| `POST` | caddy | reverse\_proxy | del\_subdomain | $uuid |
| `GET` | caddy | reverse\_proxy | get |  |
| `GET` | caddy | reverse\_proxy | get\_access\_list | $uuid=null |
| `GET` | caddy | reverse\_proxy | get\_all\_reverse\_domains |  |
| `GET` | caddy | reverse\_proxy | get\_basic\_auth | $uuid=null |
| `GET` | caddy | reverse\_proxy | get\_handle | $uuid=null |
| `GET` | caddy | reverse\_proxy | get\_header | $uuid=null |
| `GET` | caddy | reverse\_proxy | get\_layer4 | $uuid=null |
| `GET` | caddy | reverse\_proxy | get\_layer4\_openvpn | $uuid=null |
| `GET` | caddy | reverse\_proxy | get\_reverse\_proxy | $uuid=null |
| `GET` | caddy | reverse\_proxy | get\_subdomain | $uuid=null |
| `GET,POST` | caddy | reverse\_proxy | search\_access\_list |  |
| `GET,POST` | caddy | reverse\_proxy | search\_basic\_auth |  |
| `GET,POST` | caddy | reverse\_proxy | search\_handle |  |
| `GET,POST` | caddy | reverse\_proxy | search\_header |  |
| `GET,POST` | caddy | reverse\_proxy | search\_layer4 |  |
| `GET,POST` | caddy | reverse\_proxy | search\_layer4\_openvpn |  |
| `GET,POST` | caddy | reverse\_proxy | search\_reverse\_proxy |  |
| `GET,POST` | caddy | reverse\_proxy | search\_subdomain |  |
| `POST` | caddy | reverse\_proxy | set |  |
| `POST` | caddy | reverse\_proxy | set\_access\_list | $uuid |
| `POST` | caddy | reverse\_proxy | set\_basic\_auth | $uuid |
| `POST` | caddy | reverse\_proxy | set\_handle | $uuid |
| `POST` | caddy | reverse\_proxy | set\_header | $uuid |
| `POST` | caddy | reverse\_proxy | set\_layer4 | $uuid |
| `POST` | caddy | reverse\_proxy | set\_layer4\_openvpn | $uuid |
| `POST` | caddy | reverse\_proxy | set\_reverse\_proxy | $uuid |
| `POST` | caddy | reverse\_proxy | set\_subdomain | $uuid |
| `POST` | caddy | reverse\_proxy | toggle\_handle | $uuid,$enabled=null |
| `POST` | caddy | reverse\_proxy | toggle\_layer4 | $uuid,$enabled=null |
| `POST` | caddy | reverse\_proxy | toggle\_layer4\_openvpn | $uuid,$enabled=null |
| `POST` | caddy | reverse\_proxy | toggle\_reverse\_proxy | $uuid,$enabled=null |
| `POST` | caddy | reverse\_proxy | toggle\_subdomain | $uuid,$enabled=null |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Caddy.xml](https://github.com/opnsense/plugins/blob/master/www/caddy/src/opnsense/mvc/app/models/OPNsense/Caddy/Caddy.xml) |

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | caddy | service | reconfigure |  |
| `POST` | caddy | service | restart |  |
| `POST` | caddy | service | start |  |
| `GET` | caddy | service | status |  |
| `POST` | caddy | service | stop |  |
| `GET` | caddy | service | validate |  |

---

