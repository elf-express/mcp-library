---
title: "Unbound"
source: https://docs.opnsense.org/development/api/core/unbound.html
chapter: ["Development Manual","API Reference","Core API"]
order: 292
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:09.685Z"
---


# Unbound


*Resources (DiagnosticsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | unbound | diagnostics | dumpcache |  |
| `GET` | unbound | diagnostics | dumpinfra |  |
| `GET` | unbound | diagnostics | listinsecure |  |
| `GET` | unbound | diagnostics | listlocaldata |  |
| `GET` | unbound | diagnostics | listlocalzones |  |
| `GET` | unbound | diagnostics | stats |  |
| `POST` | unbound | diagnostics | test\_blocklist |  |

*Resources (OverviewController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | unbound | overview | \_rolling | $timeperiod,$clients=0 |
| `GET` | unbound | overview | get\_policies |  |
| `GET` | unbound | overview | is\_block\_list\_enabled |  |
| `GET` | unbound | overview | is\_enabled |  |
| `GET` | unbound | overview | search\_queries |  |
| `GET` | unbound | overview | totals | $maximum |

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | unbound | service | dnsbl |  |
| `POST` | unbound | service | reconfigure |  |
| `POST` | unbound | service | reconfigure\_general |  |
| `POST` | unbound | service | restart |  |
| `POST` | unbound | service | start |  |
| `GET` | unbound | service | status |  |
| `POST` | unbound | service | stop |  |

*Resources (SettingsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | unbound | settings | add\_acl |  |
| `POST` | unbound | settings | add\_dnsbl |  |
| `POST` | unbound | settings | add\_forward |  |
| `POST` | unbound | settings | add\_host\_alias |  |
| `POST` | unbound | settings | add\_host\_override |  |
| `POST` | unbound | settings | del\_acl | $uuid |
| `POST` | unbound | settings | del\_dnsbl | $uuid |
| `POST` | unbound | settings | del\_forward | $uuid |
| `POST` | unbound | settings | del\_host\_alias | $uuid |
| `POST` | unbound | settings | del\_host\_override | $uuid |
| `GET` | unbound | settings | get |  |
| `GET` | unbound | settings | get\_acl | $uuid=null |
| `GET` | unbound | settings | get\_dnsbl | $uuid=null |
| `GET` | unbound | settings | get\_forward | $uuid=null |
| `GET` | unbound | settings | get\_host\_alias | $uuid=null |
| `GET` | unbound | settings | get\_host\_override | $uuid=null |
| `GET` | unbound | settings | get\_nameservers |  |
| `GET,POST` | unbound | settings | search\_acl |  |
| `GET,POST` | unbound | settings | search\_dnsbl |  |
| `GET,POST` | unbound | settings | search\_forward |  |
| `GET,POST` | unbound | settings | search\_host\_alias |  |
| `GET,POST` | unbound | settings | search\_host\_override |  |
| `POST` | unbound | settings | set |  |
| `POST` | unbound | settings | set\_acl | $uuid |
| `POST` | unbound | settings | set\_dnsbl | $uuid |
| `POST` | unbound | settings | set\_forward | $uuid |
| `POST` | unbound | settings | set\_host\_alias | $uuid |
| `POST` | unbound | settings | set\_host\_override | $uuid |
| `POST` | unbound | settings | toggle\_acl | $uuid,$enabled=null |
| `POST` | unbound | settings | toggle\_dnsbl | $uuid,$enabled=null |
| `POST` | unbound | settings | toggle\_forward | $uuid,$enabled=null |
| `POST` | unbound | settings | toggle\_host\_alias | $uuid,$enabled=null |
| `POST` | unbound | settings | toggle\_host\_override | $uuid,$enabled=null |
| `POST` | unbound | settings | update\_blocklist |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Unbound.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/Unbound/Unbound.xml) |

---

