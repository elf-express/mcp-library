---
title: "Tailscale"
source: https://docs.opnsense.org/development/api/plugins/tailscale.html
chapter: ["Development Manual","API Reference","Plugins API"]
order: 350
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:38.526Z"
---

# Tailscale

*Resources (AuthenticationController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | tailscale | authentication | get |  |
| `POST` | tailscale | authentication | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Authentication.xml](https://github.com/opnsense/plugins/blob/master/security/tailscale/src/opnsense/mvc/app/models/OPNsense/Tailscale/Authentication.xml) |

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | tailscale | service | reconfigure |  |
| `POST` | tailscale | service | restart |  |
| `POST` | tailscale | service | start |  |
| `GET` | tailscale | service | status |  |
| `POST` | tailscale | service | stop |  |

*Resources (SettingsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | tailscale | settings | add\_subnet |  |
| `POST` | tailscale | settings | del\_subnet | $uuid |
| `GET` | tailscale | settings | get |  |
| `GET` | tailscale | settings | get\_subnet | $uuid=null |
| `GET` | tailscale | settings | reload |  |
| `GET,POST` | tailscale | settings | search\_subnet |  |
| `POST` | tailscale | settings | set |  |
| `POST` | tailscale | settings | set\_subnet | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Settings.xml](https://github.com/opnsense/plugins/blob/master/security/tailscale/src/opnsense/mvc/app/models/OPNsense/Tailscale/Settings.xml) |

*Resources (StatusController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | tailscale | status | get |  |
| `GET` | tailscale | status | ip |  |
| `GET` | tailscale | status | net |  |
| `POST` | tailscale | status | set |  |
| `GET` | tailscale | status | status |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Status.xml](https://github.com/opnsense/plugins/blob/master/security/tailscale/src/opnsense/mvc/app/models/OPNsense/Tailscale/Status.xml) |