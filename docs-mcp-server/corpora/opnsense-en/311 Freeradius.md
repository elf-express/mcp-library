---
title: "Freeradius"
source: "https://docs.opnsense.org/development/api/plugins/freeradius.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 311
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:19.319Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Dyndns](<310 Dyndns.md>)　｜　[下一篇：Ftpproxy ➡](<312 Ftpproxy.md>)

# Freeradius

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*Resources (AvpairController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | freeradius | avpair | add\_avpair |  |
| `POST` | freeradius | avpair | del\_avpair | $uuid |
| `GET` | freeradius | avpair | get |  |
| `GET` | freeradius | avpair | get\_avpair | $uuid=null |
| `GET,POST` | freeradius | avpair | search\_avpair |  |
| `POST` | freeradius | avpair | set |  |
| `POST` | freeradius | avpair | set\_avpair | $uuid |
| `POST` | freeradius | avpair | toggle\_avpair | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Avpair.xml](https://github.com/opnsense/plugins/blob/master/net/freeradius/src/opnsense/mvc/app/models/OPNsense/Freeradius/Avpair.xml) |

*Resources (ClientController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | freeradius | client | add\_client |  |
| `POST` | freeradius | client | del\_client | $uuid |
| `GET` | freeradius | client | get |  |
| `GET` | freeradius | client | get\_client | $uuid=null |
| `GET` | freeradius | client | search\_client |  |
| `POST` | freeradius | client | set |  |
| `POST` | freeradius | client | set\_client | $uuid |
| `GET` | freeradius | client | toggle\_client | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Client.xml](https://github.com/opnsense/plugins/blob/master/net/freeradius/src/opnsense/mvc/app/models/OPNsense/Freeradius/Client.xml) |

*Resources (DhcpController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | freeradius | dhcp | add\_dhcp |  |
| `POST` | freeradius | dhcp | del\_dhcp | $uuid |
| `GET` | freeradius | dhcp | get |  |
| `GET` | freeradius | dhcp | get\_dhcp | $uuid=null |
| `GET,POST` | freeradius | dhcp | search\_dhcp |  |
| `POST` | freeradius | dhcp | set |  |
| `POST` | freeradius | dhcp | set\_dhcp | $uuid |
| `POST` | freeradius | dhcp | toggle\_dhcp | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Dhcp.xml](https://github.com/opnsense/plugins/blob/master/net/freeradius/src/opnsense/mvc/app/models/OPNsense/Freeradius/Dhcp.xml) |

*Resources (EapController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | freeradius | eap | get |  |
| `POST` | freeradius | eap | set |  |

*Resources (GeneralController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | freeradius | general | get |  |
| `POST` | freeradius | general | set |  |

*Resources (LdapController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | freeradius | ldap | get |  |
| `POST` | freeradius | ldap | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Ldap.xml](https://github.com/opnsense/plugins/blob/master/net/freeradius/src/opnsense/mvc/app/models/OPNsense/Freeradius/Ldap.xml) |

*Resources (LdapgroupController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | freeradius | ldapgroup | add\_ldapgroup |  |
| `POST` | freeradius | ldapgroup | del\_ldapgroup | $uuid |
| `GET` | freeradius | ldapgroup | get |  |
| `GET` | freeradius | ldapgroup | get\_ldapgroup | $uuid=null |
| `GET` | freeradius | ldapgroup | search\_ldapgroup |  |
| `POST` | freeradius | ldapgroup | set |  |
| `POST` | freeradius | ldapgroup | set\_ldapgroup | $uuid |
| `GET` | freeradius | ldapgroup | toggle\_ldapgroup | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Ldapgroup.xml](https://github.com/opnsense/plugins/blob/master/net/freeradius/src/opnsense/mvc/app/models/OPNsense/Freeradius/Ldapgroup.xml) |

*Resources (LeaseController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | freeradius | lease | add\_lease |  |
| `POST` | freeradius | lease | del\_lease | $uuid |
| `GET` | freeradius | lease | get |  |
| `GET` | freeradius | lease | get\_lease | $uuid=null |
| `GET,POST` | freeradius | lease | search\_lease |  |
| `POST` | freeradius | lease | set |  |
| `POST` | freeradius | lease | set\_lease | $uuid |
| `POST` | freeradius | lease | toggle\_lease | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Lease.xml](https://github.com/opnsense/plugins/blob/master/net/freeradius/src/opnsense/mvc/app/models/OPNsense/Freeradius/Lease.xml) |

*Resources (ProxyController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | freeradius | proxy | add\_homeserver |  |
| `POST` | freeradius | proxy | add\_homeserverpool |  |
| `POST` | freeradius | proxy | add\_realm |  |
| `POST` | freeradius | proxy | del\_homeserver | $uuid |
| `POST` | freeradius | proxy | del\_homeserverpool | $uuid |
| `POST` | freeradius | proxy | del\_realm | $uuid |
| `GET` | freeradius | proxy | get |  |
| `GET` | freeradius | proxy | get\_homeserver | $uuid=null |
| `GET` | freeradius | proxy | get\_homeserverpool | $uuid=null |
| `GET` | freeradius | proxy | get\_realm | $uuid=null |
| `GET` | freeradius | proxy | search\_homeserver |  |
| `GET` | freeradius | proxy | search\_homeserverpool |  |
| `GET` | freeradius | proxy | search\_realm |  |
| `POST` | freeradius | proxy | set |  |
| `POST` | freeradius | proxy | set\_homeserver | $uuid |
| `POST` | freeradius | proxy | set\_homeserverpool | $uuid |
| `POST` | freeradius | proxy | set\_realm | $uuid |
| `GET` | freeradius | proxy | toggle\_homeserver | $uuid |
| `GET` | freeradius | proxy | toggle\_homeserverpool | $uuid |
| `GET` | freeradius | proxy | toggle\_realm | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Proxy.xml](https://github.com/opnsense/plugins/blob/master/net/freeradius/src/opnsense/mvc/app/models/OPNsense/Freeradius/Proxy.xml) |

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | freeradius | service | reconfigure |  |
| `POST` | freeradius | service | restart |  |
| `POST` | freeradius | service | start |  |
| `GET` | freeradius | service | status |  |
| `POST` | freeradius | service | stop |  |

*Resources (UserController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | freeradius | user | add\_user |  |
| `POST` | freeradius | user | del\_user | $uuid |
| `GET` | freeradius | user | get |  |
| `GET` | freeradius | user | get\_user | $uuid=null |
| `GET` | freeradius | user | search\_user |  |
| `POST` | freeradius | user | set |  |
| `POST` | freeradius | user | set\_user | $uuid |
| `GET` | freeradius | user | toggle\_user | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [User.xml](https://github.com/opnsense/plugins/blob/master/net/freeradius/src/opnsense/mvc/app/models/OPNsense/Freeradius/User.xml) |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Dyndns](<310 Dyndns.md>)　｜　[下一篇：Ftpproxy ➡](<312 Ftpproxy.md>)
