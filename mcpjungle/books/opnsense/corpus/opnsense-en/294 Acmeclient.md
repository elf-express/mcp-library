---
title: "Acmeclient"
source: https://docs.opnsense.org/development/api/plugins/acmeclient.html
chapter: ["Development Manual","API Reference","Plugins API"]
order: 294
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:09.182Z"
---


# Acmeclient


*Resources (AccountsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | acmeclient | accounts | add |  |
| `POST` | acmeclient | accounts | del | $uuid |
| `GET` | acmeclient | accounts | get | $uuid=null |
| `POST` | acmeclient | accounts | register | $uuid |
| `GET,POST` | acmeclient | accounts | search |  |
| `POST` | acmeclient | accounts | set |  |
| `POST` | acmeclient | accounts | toggle | $uuid,$enabled=null |
| `POST` | acmeclient | accounts | update | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [AcmeClient.xml](https://github.com/opnsense/plugins/blob/master/security/acme-client/src/opnsense/mvc/app/models/OPNsense/AcmeClient/AcmeClient.xml) |

*Resources (ActionsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | acmeclient | actions | add |  |
| `POST` | acmeclient | actions | del | $uuid |
| `GET` | acmeclient | actions | get | $uuid=null |
| `GET,POST` | acmeclient | actions | search |  |
| `POST` | acmeclient | actions | set |  |
| `GET` | acmeclient | actions | sftp\_get\_identity |  |
| `GET` | acmeclient | actions | sftp\_test\_connection |  |
| `GET` | acmeclient | actions | ssh\_get\_identity |  |
| `GET` | acmeclient | actions | ssh\_test\_connection |  |
| `POST` | acmeclient | actions | toggle | $uuid,$enabled=null |
| `POST` | acmeclient | actions | update | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [AcmeClient.xml](https://github.com/opnsense/plugins/blob/master/security/acme-client/src/opnsense/mvc/app/models/OPNsense/AcmeClient/AcmeClient.xml) |

*Resources (CertificatesController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | acmeclient | certificates | add |  |
| `GET` | acmeclient | certificates | automation | $uuid |
| `POST` | acmeclient | certificates | del | $uuid |
| `GET` | acmeclient | certificates | get | $uuid=null |
| `GET` | acmeclient | certificates | import | $uuid |
| `GET` | acmeclient | certificates | removekey | $uuid |
| `POST` | acmeclient | certificates | revoke | $uuid |
| `GET,POST` | acmeclient | certificates | search |  |
| `POST` | acmeclient | certificates | set |  |
| `POST` | acmeclient | certificates | sign | $uuid |
| `POST` | acmeclient | certificates | toggle | $uuid,$enabled=null |
| `POST` | acmeclient | certificates | update | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [AcmeClient.xml](https://github.com/opnsense/plugins/blob/master/security/acme-client/src/opnsense/mvc/app/models/OPNsense/AcmeClient/AcmeClient.xml) |

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | acmeclient | service | configtest |  |
| `POST` | acmeclient | service | reconfigure |  |
| `GET` | acmeclient | service | reset |  |
| `POST` | acmeclient | service | restart |  |
| `GET` | acmeclient | service | signallcerts |  |
| `POST` | acmeclient | service | start |  |
| `GET` | acmeclient | service | status |  |
| `POST` | acmeclient | service | stop |  |

*Resources (SettingsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | acmeclient | settings | fetch\_cron\_integration |  |
| `POST` | acmeclient | settings | fetch\_h\_a\_proxy\_integration |  |
| `GET` | acmeclient | settings | get |  |
| `GET` | acmeclient | settings | get\_bind\_plugin\_status |  |
| `GET` | acmeclient | settings | get\_gcloud\_plugin\_status |  |
| `POST` | acmeclient | settings | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [AcmeClient.xml](https://github.com/opnsense/plugins/blob/master/security/acme-client/src/opnsense/mvc/app/models/OPNsense/AcmeClient/AcmeClient.xml) |

*Resources (ValidationsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | acmeclient | validations | add |  |
| `POST` | acmeclient | validations | del | $uuid |
| `GET` | acmeclient | validations | get | $uuid=null |
| `GET,POST` | acmeclient | validations | search |  |
| `POST` | acmeclient | validations | set |  |
| `POST` | acmeclient | validations | toggle | $uuid,$enabled=null |
| `POST` | acmeclient | validations | update | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [AcmeClient.xml](https://github.com/opnsense/plugins/blob/master/security/acme-client/src/opnsense/mvc/app/models/OPNsense/AcmeClient/AcmeClient.xml) |

---

