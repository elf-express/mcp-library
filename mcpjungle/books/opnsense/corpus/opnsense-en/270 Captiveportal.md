---
title: "Captiveportal"
source: https://docs.opnsense.org/development/api/core/captiveportal.html
chapter: ["Development Manual","API Reference","Core API"]
order: 270
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:33:57.088Z"
---


# Captiveportal


*Resources (AccessController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | captiveportal | access | api |  |
| `POST` | captiveportal | access | logoff | $zoneid=0 |
| `POST` | captiveportal | access | logon | $zoneid=0 |
| `GET,POST` | captiveportal | access | status | $zoneid=0 |

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | captiveportal | service | del\_template | $uuid |
| `GET` | captiveportal | service | get\_template | $fileid=null |
| `POST` | captiveportal | service | reconfigure |  |
| `POST` | captiveportal | service | restart |  |
| `POST` | captiveportal | service | save\_template |  |
| `GET` | captiveportal | service | search\_templates |  |
| `POST` | captiveportal | service | start |  |
| `GET` | captiveportal | service | status |  |
| `POST` | captiveportal | service | stop |  |

*Resources (SessionController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | captiveportal | session | connect | $zoneid=0 |
| `POST` | captiveportal | session | disconnect | $zoneid=’’ |
| `GET` | captiveportal | session | list | $zoneid=0 |
| `GET` | captiveportal | session | search |  |
| `GET` | captiveportal | session | zones |  |

*Resources (SettingsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | captiveportal | settings | add\_zone |  |
| `POST` | captiveportal | settings | del\_zone | $uuid |
| `GET` | captiveportal | settings | get |  |
| `GET` | captiveportal | settings | get\_zone | $uuid=null |
| `GET,POST` | captiveportal | settings | search\_zones |  |
| `POST` | captiveportal | settings | set |  |
| `POST` | captiveportal | settings | set\_zone | $uuid |
| `POST` | captiveportal | settings | toggle\_zone | $uuid,$enabled=null |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [CaptivePortal.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/CaptivePortal/CaptivePortal.xml) |

*Resources (VoucherController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | captiveportal | voucher | drop\_expired\_vouchers | $provider,$group |
| `POST` | captiveportal | voucher | drop\_voucher\_group | $provider,$group |
| `POST` | captiveportal | voucher | expire\_voucher | $provider |
| `POST` | captiveportal | voucher | generate\_vouchers | $provider |
| `GET` | captiveportal | voucher | list\_providers |  |
| `GET` | captiveportal | voucher | list\_voucher\_groups | $provider |
| `GET` | captiveportal | voucher | list\_vouchers | $provider,$group |

---

