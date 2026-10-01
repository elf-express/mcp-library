---
title: "Haproxy"
source: "https://docs.opnsense.org/development/api/plugins/haproxy.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 314
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:19.829Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Gridexample](<313 Gridexample.md>)　｜　[下一篇：Helloworld ➡](<315 Helloworld.md>)

# Haproxy

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*Resources (ExportController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | haproxy | export | config |  |
| `GET` | haproxy | export | diff |  |
| `GET` | haproxy | export | download | $type |

*Resources (MaintenanceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | haproxy | maintenance | cert\_actions |  |
| `GET` | haproxy | maintenance | cert\_diff |  |
| `GET` | haproxy | maintenance | cert\_sync |  |
| `GET` | haproxy | maintenance | cert\_sync\_bulk |  |
| `POST` | haproxy | maintenance | fetch\_cron\_integration |  |
| `GET` | haproxy | maintenance | get |  |
| `GET` | haproxy | maintenance | search\_certificate\_diff |  |
| `GET` | haproxy | maintenance | search\_server |  |
| `GET` | haproxy | maintenance | server\_state |  |
| `GET` | haproxy | maintenance | server\_state\_bulk |  |
| `GET` | haproxy | maintenance | server\_weight |  |
| `GET` | haproxy | maintenance | server\_weight\_bulk |  |
| `POST` | haproxy | maintenance | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [HAProxy.xml](https://github.com/opnsense/plugins/blob/master/net/haproxy/src/opnsense/mvc/app/models/OPNsense/HAProxy/HAProxy.xml) |

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | haproxy | service | configtest |  |
| `POST` | haproxy | service | reconfigure |  |
| `POST` | haproxy | service | restart |  |
| `POST` | haproxy | service | start |  |
| `GET` | haproxy | service | status |  |
| `POST` | haproxy | service | stop |  |

*Resources (SettingsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | haproxy | settings | add\_acl |  |
| `POST` | haproxy | settings | add\_action |  |
| `POST` | haproxy | settings | add\_backend |  |
| `POST` | haproxy | settings | add\_cpu |  |
| `POST` | haproxy | settings | add\_errorfile |  |
| `POST` | haproxy | settings | add\_fcgi |  |
| `POST` | haproxy | settings | add\_frontend |  |
| `POST` | haproxy | settings | add\_group |  |
| `POST` | haproxy | settings | add\_healthcheck |  |
| `POST` | haproxy | settings | add\_lua |  |
| `POST` | haproxy | settings | add\_mapfile |  |
| `POST` | haproxy | settings | add\_server |  |
| `POST` | haproxy | settings | add\_user |  |
| `POST` | haproxy | settings | addmailer |  |
| `POST` | haproxy | settings | addresolver |  |
| `POST` | haproxy | settings | del\_acl | $uuid |
| `POST` | haproxy | settings | del\_action | $uuid |
| `POST` | haproxy | settings | del\_backend | $uuid |
| `POST` | haproxy | settings | del\_cpu | $uuid |
| `POST` | haproxy | settings | del\_errorfile | $uuid |
| `POST` | haproxy | settings | del\_fcgi | $uuid |
| `POST` | haproxy | settings | del\_frontend | $uuid |
| `POST` | haproxy | settings | del\_group | $uuid |
| `POST` | haproxy | settings | del\_healthcheck | $uuid |
| `POST` | haproxy | settings | del\_lua | $uuid |
| `POST` | haproxy | settings | del\_mapfile | $uuid |
| `POST` | haproxy | settings | del\_server | $uuid |
| `POST` | haproxy | settings | del\_user | $uuid |
| `POST` | haproxy | settings | delmailer | $uuid |
| `POST` | haproxy | settings | delresolver | $uuid |
| `GET` | haproxy | settings | get |  |
| `GET` | haproxy | settings | get\_acl | $uuid=null |
| `GET` | haproxy | settings | get\_action | $uuid=null |
| `GET` | haproxy | settings | get\_backend | $uuid=null |
| `GET` | haproxy | settings | get\_cpu | $uuid=null |
| `GET` | haproxy | settings | get\_errorfile | $uuid=null |
| `GET` | haproxy | settings | get\_fcgi | $uuid=null |
| `GET` | haproxy | settings | get\_frontend | $uuid=null |
| `GET` | haproxy | settings | get\_group | $uuid=null |
| `GET` | haproxy | settings | get\_healthcheck | $uuid=null |
| `GET` | haproxy | settings | get\_lua | $uuid=null |
| `GET` | haproxy | settings | get\_mapfile | $uuid=null |
| `GET` | haproxy | settings | get\_server | $uuid=null |
| `GET` | haproxy | settings | get\_user | $uuid=null |
| `GET` | haproxy | settings | getmailer | $uuid=null |
| `GET` | haproxy | settings | getresolver | $uuid=null |
| `GET,POST` | haproxy | settings | search\_acls |  |
| `GET,POST` | haproxy | settings | search\_actions |  |
| `GET,POST` | haproxy | settings | search\_backends |  |
| `GET,POST` | haproxy | settings | search\_cpus |  |
| `GET,POST` | haproxy | settings | search\_errorfiles |  |
| `GET,POST` | haproxy | settings | search\_fcgis |  |
| `GET,POST` | haproxy | settings | search\_frontends |  |
| `GET,POST` | haproxy | settings | search\_groups |  |
| `GET,POST` | haproxy | settings | search\_healthchecks |  |
| `GET,POST` | haproxy | settings | search\_luas |  |
| `GET,POST` | haproxy | settings | search\_mapfiles |  |
| `GET,POST` | haproxy | settings | search\_servers |  |
| `GET,POST` | haproxy | settings | search\_users |  |
| `GET,POST` | haproxy | settings | searchmailers |  |
| `GET,POST` | haproxy | settings | searchresolvers |  |
| `POST` | haproxy | settings | set |  |
| `POST` | haproxy | settings | set\_acl | $uuid |
| `POST` | haproxy | settings | set\_action | $uuid |
| `POST` | haproxy | settings | set\_backend | $uuid |
| `POST` | haproxy | settings | set\_cpu | $uuid |
| `POST` | haproxy | settings | set\_errorfile | $uuid |
| `POST` | haproxy | settings | set\_fcgi | $uuid |
| `POST` | haproxy | settings | set\_frontend | $uuid |
| `POST` | haproxy | settings | set\_group | $uuid |
| `POST` | haproxy | settings | set\_healthcheck | $uuid |
| `POST` | haproxy | settings | set\_lua | $uuid |
| `POST` | haproxy | settings | set\_mapfile | $uuid |
| `POST` | haproxy | settings | set\_server | $uuid |
| `POST` | haproxy | settings | set\_user | $uuid |
| `POST` | haproxy | settings | setmailer | $uuid |
| `POST` | haproxy | settings | setresolver | $uuid |
| `POST` | haproxy | settings | toggle\_backend | $uuid,$enabled=null |
| `POST` | haproxy | settings | toggle\_cpu | $uuid,$enabled=null |
| `POST` | haproxy | settings | toggle\_frontend | $uuid |
| `POST` | haproxy | settings | toggle\_group | $uuid,$enabled=null |
| `POST` | haproxy | settings | toggle\_lua | $uuid,$enabled=null |
| `POST` | haproxy | settings | toggle\_server | $uuid,$enabled=null |
| `POST` | haproxy | settings | toggle\_user | $uuid,$enabled=null |
| `POST` | haproxy | settings | togglemailer | $uuid,$enabled=null |
| `POST` | haproxy | settings | toggleresolver | $uuid,$enabled=null |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [HAProxy.xml](https://github.com/opnsense/plugins/blob/master/net/haproxy/src/opnsense/mvc/app/models/OPNsense/HAProxy/HAProxy.xml) |

*Resources (StatisticsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | haproxy | statistics | counters |  |
| `GET` | haproxy | statistics | info |  |
| `GET` | haproxy | statistics | tables |  |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Gridexample](<313 Gridexample.md>)　｜　[下一篇：Helloworld ➡](<315 Helloworld.md>)
