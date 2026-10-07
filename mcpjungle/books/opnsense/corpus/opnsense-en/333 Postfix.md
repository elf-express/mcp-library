---
title: "Postfix"
source: https://docs.opnsense.org/development/api/plugins/postfix.html
chapter: ["Development Manual","API Reference","Plugins API"]
order: 333
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:29.476Z"
---


# Postfix


*Resources (AddressController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | postfix | address | add\_address |  |
| `POST` | postfix | address | del\_address | $uuid |
| `GET` | postfix | address | get |  |
| `GET` | postfix | address | get\_address | $uuid=null |
| `GET,POST` | postfix | address | search\_address |  |
| `POST` | postfix | address | set |  |
| `POST` | postfix | address | set\_address | $uuid |
| `POST` | postfix | address | toggle\_address | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Address.xml](https://github.com/opnsense/plugins/blob/master/mail/postfix/src/opnsense/mvc/app/models/OPNsense/Postfix/Address.xml) |

*Resources (AntispamController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | postfix | antispam | get |  |
| `POST` | postfix | antispam | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Antispam.xml](https://github.com/opnsense/plugins/blob/master/mail/postfix/src/opnsense/mvc/app/models/OPNsense/Postfix/Antispam.xml) |

*Resources (DomainController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | postfix | domain | add\_domain |  |
| `POST` | postfix | domain | del\_domain | $uuid |
| `GET` | postfix | domain | get |  |
| `GET` | postfix | domain | get\_domain | $uuid=null |
| `GET,POST` | postfix | domain | search\_domain |  |
| `POST` | postfix | domain | set |  |
| `POST` | postfix | domain | set\_domain | $uuid |
| `POST` | postfix | domain | toggle\_domain | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Domain.xml](https://github.com/opnsense/plugins/blob/master/mail/postfix/src/opnsense/mvc/app/models/OPNsense/Postfix/Domain.xml) |

*Resources (GeneralController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | postfix | general | get |  |
| `POST` | postfix | general | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [General.xml](https://github.com/opnsense/plugins/blob/master/mail/postfix/src/opnsense/mvc/app/models/OPNsense/Postfix/General.xml) |

*Resources (HeaderchecksController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | postfix | headerchecks | add\_headercheck |  |
| `POST` | postfix | headerchecks | del\_headercheck | $uuid |
| `GET` | postfix | headerchecks | get |  |
| `GET` | postfix | headerchecks | get\_headercheck | $uuid=null |
| `GET,POST` | postfix | headerchecks | search\_headerchecks |  |
| `POST` | postfix | headerchecks | set |  |
| `POST` | postfix | headerchecks | set\_headercheck | $uuid |
| `POST` | postfix | headerchecks | toggle\_headercheck | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Headerchecks.xml](https://github.com/opnsense/plugins/blob/master/mail/postfix/src/opnsense/mvc/app/models/OPNsense/Postfix/Headerchecks.xml) |

*Resources (RecipientController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | postfix | recipient | add\_recipient |  |
| `POST` | postfix | recipient | del\_recipient | $uuid |
| `GET` | postfix | recipient | get |  |
| `GET` | postfix | recipient | get\_recipient | $uuid=null |
| `GET,POST` | postfix | recipient | search\_recipient |  |
| `POST` | postfix | recipient | set |  |
| `POST` | postfix | recipient | set\_recipient | $uuid |
| `POST` | postfix | recipient | toggle\_recipient | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Recipient.xml](https://github.com/opnsense/plugins/blob/master/mail/postfix/src/opnsense/mvc/app/models/OPNsense/Postfix/Recipient.xml) |

*Resources (RecipientbccController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | postfix | recipientbcc | add\_recipientbcc |  |
| `POST` | postfix | recipientbcc | del\_recipientbcc | $uuid |
| `GET` | postfix | recipientbcc | get |  |
| `GET` | postfix | recipientbcc | get\_recipientbcc | $uuid=null |
| `GET,POST` | postfix | recipientbcc | search\_recipientbcc |  |
| `POST` | postfix | recipientbcc | set |  |
| `POST` | postfix | recipientbcc | set\_recipientbcc | $uuid |
| `POST` | postfix | recipientbcc | toggle\_recipientbcc | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Recipientbcc.xml](https://github.com/opnsense/plugins/blob/master/mail/postfix/src/opnsense/mvc/app/models/OPNsense/Postfix/Recipientbcc.xml) |

*Resources (SenderController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | postfix | sender | add\_sender |  |
| `POST` | postfix | sender | del\_sender | $uuid |
| `GET` | postfix | sender | get |  |
| `GET` | postfix | sender | get\_sender | $uuid=null |
| `GET,POST` | postfix | sender | search\_sender |  |
| `POST` | postfix | sender | set |  |
| `POST` | postfix | sender | set\_sender | $uuid |
| `POST` | postfix | sender | toggle\_sender | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Sender.xml](https://github.com/opnsense/plugins/blob/master/mail/postfix/src/opnsense/mvc/app/models/OPNsense/Postfix/Sender.xml) |

*Resources (SenderbccController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | postfix | senderbcc | add\_senderbcc |  |
| `POST` | postfix | senderbcc | del\_senderbcc | $uuid |
| `GET` | postfix | senderbcc | get |  |
| `GET` | postfix | senderbcc | get\_senderbcc | $uuid=null |
| `GET,POST` | postfix | senderbcc | search\_senderbcc |  |
| `POST` | postfix | senderbcc | set |  |
| `POST` | postfix | senderbcc | set\_senderbcc | $uuid |
| `POST` | postfix | senderbcc | toggle\_senderbcc | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Senderbcc.xml](https://github.com/opnsense/plugins/blob/master/mail/postfix/src/opnsense/mvc/app/models/OPNsense/Postfix/Senderbcc.xml) |

*Resources (SendercanonicalController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | postfix | sendercanonical | add\_sendercanonical |  |
| `POST` | postfix | sendercanonical | del\_sendercanonical | $uuid |
| `GET` | postfix | sendercanonical | get |  |
| `GET` | postfix | sendercanonical | get\_sendercanonical | $uuid=null |
| `GET,POST` | postfix | sendercanonical | search\_sendercanonical |  |
| `POST` | postfix | sendercanonical | set |  |
| `POST` | postfix | sendercanonical | set\_sendercanonical | $uuid |
| `POST` | postfix | sendercanonical | toggle\_sendercanonical | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Sendercanonical.xml](https://github.com/opnsense/plugins/blob/master/mail/postfix/src/opnsense/mvc/app/models/OPNsense/Postfix/Sendercanonical.xml) |

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | postfix | service | checkrspamd |  |
| `POST` | postfix | service | reconfigure |  |
| `POST` | postfix | service | restart |  |
| `POST` | postfix | service | start |  |
| `GET` | postfix | service | status |  |
| `POST` | postfix | service | stop |  |

---

