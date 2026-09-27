---
title: "Dnscryptproxy"
source: "https://docs.opnsense.org/development/api/plugins/dnscryptproxy.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 309
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:17.770Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Dhcpv6](<306 Dhcpv6.md>)　｜　[下一篇：Dyndns ➡](<310 Dyndns.md>)

# Dnscryptproxy

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*Resources (CloakController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | dnscryptproxy | cloak | add\_cloak |  |
| `POST` | dnscryptproxy | cloak | del\_cloak | $uuid |
| `GET` | dnscryptproxy | cloak | get |  |
| `GET` | dnscryptproxy | cloak | get\_cloak | $uuid=null |
| `GET,POST` | dnscryptproxy | cloak | search\_cloak |  |
| `POST` | dnscryptproxy | cloak | set |  |
| `POST` | dnscryptproxy | cloak | set\_cloak | $uuid |
| `POST` | dnscryptproxy | cloak | toggle\_cloak | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Cloak.xml](https://github.com/opnsense/plugins/blob/master/dns/dnscrypt-proxy/src/opnsense/mvc/app/models/OPNsense/Dnscryptproxy/Cloak.xml) |

*Resources (DnsblController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | dnscryptproxy | dnsbl | get |  |
| `POST` | dnscryptproxy | dnsbl | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Dnsbl.xml](https://github.com/opnsense/plugins/blob/master/dns/dnscrypt-proxy/src/opnsense/mvc/app/models/OPNsense/Dnscryptproxy/Dnsbl.xml) |

*Resources (ForwardController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | dnscryptproxy | forward | add\_forward |  |
| `POST` | dnscryptproxy | forward | del\_forward | $uuid |
| `GET` | dnscryptproxy | forward | get |  |
| `GET` | dnscryptproxy | forward | get\_forward | $uuid=null |
| `GET,POST` | dnscryptproxy | forward | search\_forward |  |
| `POST` | dnscryptproxy | forward | set |  |
| `POST` | dnscryptproxy | forward | set\_forward | $uuid |
| `POST` | dnscryptproxy | forward | toggle\_forward | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Forward.xml](https://github.com/opnsense/plugins/blob/master/dns/dnscrypt-proxy/src/opnsense/mvc/app/models/OPNsense/Dnscryptproxy/Forward.xml) |

*Resources (GeneralController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | dnscryptproxy | general | get |  |
| `POST` | dnscryptproxy | general | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [General.xml](https://github.com/opnsense/plugins/blob/master/dns/dnscrypt-proxy/src/opnsense/mvc/app/models/OPNsense/Dnscryptproxy/General.xml) |

*Resources (ServerController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | dnscryptproxy | server | add\_server |  |
| `POST` | dnscryptproxy | server | del\_server | $uuid |
| `GET` | dnscryptproxy | server | get |  |
| `GET` | dnscryptproxy | server | get\_server | $uuid=null |
| `GET,POST` | dnscryptproxy | server | search\_server |  |
| `POST` | dnscryptproxy | server | set |  |
| `POST` | dnscryptproxy | server | set\_server | $uuid |
| `POST` | dnscryptproxy | server | toggle\_server | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Server.xml](https://github.com/opnsense/plugins/blob/master/dns/dnscrypt-proxy/src/opnsense/mvc/app/models/OPNsense/Dnscryptproxy/Server.xml) |

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | dnscryptproxy | service | dnsbl |  |
| `POST` | dnscryptproxy | service | reconfigure |  |
| `POST` | dnscryptproxy | service | restart |  |
| `POST` | dnscryptproxy | service | start |  |
| `GET` | dnscryptproxy | service | status |  |
| `POST` | dnscryptproxy | service | stop |  |

*Resources (WhitelistController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | dnscryptproxy | whitelist | add\_whitelist |  |
| `POST` | dnscryptproxy | whitelist | del\_whitelist | $uuid |
| `GET` | dnscryptproxy | whitelist | get |  |
| `GET` | dnscryptproxy | whitelist | get\_whitelist | $uuid=null |
| `GET,POST` | dnscryptproxy | whitelist | search\_whitelist |  |
| `POST` | dnscryptproxy | whitelist | set |  |
| `POST` | dnscryptproxy | whitelist | set\_whitelist | $uuid |
| `POST` | dnscryptproxy | whitelist | toggle\_whitelist | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Whitelist.xml](https://github.com/opnsense/plugins/blob/master/dns/dnscrypt-proxy/src/opnsense/mvc/app/models/OPNsense/Dnscryptproxy/Whitelist.xml) |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Dhcpv6](<306 Dhcpv6.md>)　｜　[下一篇：Dyndns ➡](<310 Dyndns.md>)
