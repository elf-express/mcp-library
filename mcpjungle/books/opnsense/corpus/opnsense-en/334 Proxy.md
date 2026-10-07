---
title: "Proxy"
source: https://docs.opnsense.org/development/api/plugins/proxy.html
chapter: ["Development Manual","API Reference","Plugins API"]
order: 334
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:29.966Z"
---

# Proxy

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | proxy | service | downloadacls |  |
| `POST` | proxy | service | fetchacls |  |
| `POST` | proxy | service | reconfigure |  |
| `POST` | proxy | service | refresh\_template |  |
| `POST` | proxy | service | reset |  |
| `GET` | proxy | service | restart |  |
| `GET` | proxy | service | start |  |
| `GET` | proxy | service | status |  |
| `POST` | proxy | service | stop |  |

*Resources (SettingsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | proxy | settings | add\_p\_a\_c\_rule |  |
| `POST` | proxy | settings | add\_pac\_match |  |
| `POST` | proxy | settings | add\_pac\_proxy |  |
| `POST` | proxy | settings | add\_remote\_blacklist |  |
| `POST` | proxy | settings | del\_pac\_match | $uuid |
| `POST` | proxy | settings | del\_pac\_proxy | $uuid |
| `POST` | proxy | settings | del\_pac\_rule | $uuid |
| `POST` | proxy | settings | del\_remote\_blacklist | $uuid |
| `POST` | proxy | settings | fetch\_rb\_cron |  |
| `GET` | proxy | settings | get |  |
| `GET` | proxy | settings | get\_pac\_match | $uuid=null |
| `GET` | proxy | settings | get\_pac\_proxy | $uuid=null |
| `GET` | proxy | settings | get\_pac\_rule | $uuid=null |
| `GET` | proxy | settings | get\_remote\_blacklist | $uuid=null |
| `GET,POST` | proxy | settings | search\_pac\_match |  |
| `GET,POST` | proxy | settings | search\_pac\_proxy |  |
| `GET,POST` | proxy | settings | search\_pac\_rule |  |
| `GET` | proxy | settings | search\_remote\_blacklists |  |
| `POST` | proxy | settings | set |  |
| `POST` | proxy | settings | set\_pac\_match | $uuid |
| `POST` | proxy | settings | set\_pac\_proxy | $uuid |
| `POST` | proxy | settings | set\_pac\_rule | $uuid |
| `POST` | proxy | settings | set\_remote\_blacklist | $uuid |
| `POST` | proxy | settings | toggle\_pac\_rule | $uuid |
| `POST` | proxy | settings | toggle\_remote\_blacklist | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Proxy.xml](https://github.com/opnsense/plugins/blob/master/www/squid/src/opnsense/mvc/app/models/OPNsense/Proxy/Proxy.xml) |

*Resources (TemplateController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | proxy | template | get |  |
| `POST` | proxy | template | reset |  |
| `POST` | proxy | template | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Proxy.xml](https://github.com/opnsense/plugins/blob/master/www/squid/src/opnsense/mvc/app/models/OPNsense/Proxy/Proxy.xml) |

*Resources (AclController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | proxy | acl | add\_custom\_policy |  |
| `POST` | proxy | acl | add\_policy |  |
| `POST` | proxy | acl | apply |  |
| `POST` | proxy | acl | del\_custom\_policy | $uuid |
| `POST` | proxy | acl | del\_policy | $uuid |
| `GET` | proxy | acl | get |  |
| `GET` | proxy | acl | get\_custom\_policy | $uuid=null |
| `GET` | proxy | acl | get\_policy | $uuid=null |
| `GET,POST` | proxy | acl | search\_custom\_policy |  |
| `GET,POST` | proxy | acl | search\_policy |  |
| `POST` | proxy | acl | set |  |
| `POST` | proxy | acl | set\_custom\_policy | $uuid |
| `POST` | proxy | acl | set\_policy | $uuid |
| `POST` | proxy | acl | test |  |
| `POST` | proxy | acl | toggle\_custom\_policy | $uuid,$enabled=null |
| `POST` | proxy | acl | toggle\_policy | $uuid,$enabled=null |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [ACL.xml](https://github.com/opnsense/plugins/blob/master/www/OPNProxy/src/opnsense/mvc/app/models/Deciso/Proxy/ACL.xml) |