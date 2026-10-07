---
title: "Nginx"
source: https://docs.opnsense.org/development/api/plugins/nginx.html
chapter: ["Development Manual","API Reference","Plugins API"]
order: 327
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:26.434Z"
---


# Nginx


*Resources (BansController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | nginx | bans | delban | $uuid |
| `GET` | nginx | bans | get |  |
| `GET,POST` | nginx | bans | searchban |  |
| `POST` | nginx | bans | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Nginx.xml](https://github.com/opnsense/plugins/blob/master/www/nginx/src/opnsense/mvc/app/models/OPNsense/Nginx/Nginx.xml) |

*Resources (LogsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | nginx | logs | accesses | $uuid=null,$fileno=null,$page=0,$perPage=0,$query=’’ |
| `GET` | nginx | logs | errors | $uuid=null,$fileno=null,$page=0,$perPage=0,$query=’’ |
| `GET` | nginx | logs | streamaccesses | $uuid=null,$fileno=null,$page=0,$perPage=0,$query=’’ |
| `GET` | nginx | logs | streamerrors | $uuid=null,$fileno=null,$page=0,$perPage=0,$query=’’ |
| `GET` | nginx | logs | tls\_handshakes |  |

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | nginx | service | reconfigure |  |
| `POST` | nginx | service | restart |  |
| `POST` | nginx | service | start |  |
| `GET` | nginx | service | status |  |
| `GET` | nginx | service | stop |  |
| `GET` | nginx | service | vts |  |

*Resources (SettingsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | nginx | settings | addcache\_path |  |
| `POST` | nginx | settings | addcredential |  |
| `POST` | nginx | settings | addcustompolicy |  |
| `POST` | nginx | settings | adderrorpage |  |
| `POST` | nginx | settings | addhttprewrite |  |
| `POST` | nginx | settings | addhttpserver |  |
| `POST` | nginx | settings | addipacl |  |
| `POST` | nginx | settings | addlimit\_request\_connection |  |
| `POST` | nginx | settings | addlimit\_zone |  |
| `POST` | nginx | settings | addlocation |  |
| `POST` | nginx | settings | addnaxsirule |  |
| `POST` | nginx | settings | addproxy\_cache\_valid |  |
| `POST` | nginx | settings | addresolver |  |
| `POST` | nginx | settings | addsecurity\_header |  |
| `POST` | nginx | settings | addsnifwd |  |
| `POST` | nginx | settings | addstreamserver |  |
| `POST` | nginx | settings | addsyslog\_target |  |
| `POST` | nginx | settings | addtls\_fingerprint |  |
| `POST` | nginx | settings | addupstream |  |
| `POST` | nginx | settings | addupstreamserver |  |
| `POST` | nginx | settings | adduserlist |  |
| `POST` | nginx | settings | delcache\_path | $uuid |
| `POST` | nginx | settings | delcredential | $uuid |
| `POST` | nginx | settings | delcustompolicy | $uuid |
| `POST` | nginx | settings | delerrorpage | $uuid |
| `POST` | nginx | settings | delhttprewrite | $uuid |
| `POST` | nginx | settings | delhttpserver | $uuid |
| `POST` | nginx | settings | delipacl | $uuid |
| `POST` | nginx | settings | dellimit\_request\_connection | $uuid |
| `POST` | nginx | settings | dellimit\_zone | $uuid |
| `POST` | nginx | settings | dellocation | $uuid |
| `POST` | nginx | settings | delnaxsirule | $uuid |
| `POST` | nginx | settings | delproxy\_cache\_valid | $uuid |
| `POST` | nginx | settings | delresolver | $uuid |
| `POST` | nginx | settings | delsecurity\_header | $uuid |
| `POST` | nginx | settings | delsnifwd | $uuid |
| `POST` | nginx | settings | delstreamserver | $uuid |
| `POST` | nginx | settings | delsyslog\_target | $uuid |
| `POST` | nginx | settings | deltls\_fingerprint | $uuid |
| `POST` | nginx | settings | delupstream | $uuid |
| `POST` | nginx | settings | delupstreamserver | $uuid |
| `POST` | nginx | settings | deluserlist | $uuid |
| `POST` | nginx | settings | downloadrules |  |
| `GET` | nginx | settings | get |  |
| `GET` | nginx | settings | getcache\_path | $uuid=null |
| `GET` | nginx | settings | getcredential | $uuid=null |
| `GET` | nginx | settings | getcustompolicy | $uuid=null |
| `GET` | nginx | settings | geterrorpage | $uuid=null |
| `GET` | nginx | settings | gethttprewrite | $uuid=null |
| `GET` | nginx | settings | gethttpserver | $uuid=null |
| `GET` | nginx | settings | getipacl | $uuid=null |
| `GET` | nginx | settings | getlimit\_request\_connection | $uuid=null |
| `GET` | nginx | settings | getlimit\_zone | $uuid=null |
| `GET` | nginx | settings | getlocation | $uuid=null |
| `GET` | nginx | settings | getnaxsirule | $uuid=null |
| `GET` | nginx | settings | getproxy\_cache\_valid | $uuid=null |
| `GET` | nginx | settings | getresolver | $uuid=null |
| `GET` | nginx | settings | getsecurity\_header | $uuid=null |
| `GET` | nginx | settings | getsnifwd | $uuid=null |
| `GET` | nginx | settings | getstreamserver | $uuid=null |
| `GET` | nginx | settings | getsyslog\_target | $uuid=null |
| `GET` | nginx | settings | gettls\_fingerprint | $uuid=null |
| `GET` | nginx | settings | getupstream | $uuid=null |
| `GET` | nginx | settings | getupstreamserver | $uuid=null |
| `GET` | nginx | settings | getuserlist | $uuid=null |
| `GET,POST` | nginx | settings | searchcache\_path |  |
| `GET,POST` | nginx | settings | searchcredential |  |
| `GET,POST` | nginx | settings | searchcustompolicy |  |
| `GET,POST` | nginx | settings | searcherrorpage |  |
| `GET,POST` | nginx | settings | searchhttprewrite |  |
| `GET,POST` | nginx | settings | searchhttpserver |  |
| `GET,POST` | nginx | settings | searchipacl |  |
| `GET,POST` | nginx | settings | searchlimit\_request\_connection |  |
| `GET,POST` | nginx | settings | searchlimit\_zone |  |
| `GET,POST` | nginx | settings | searchlocation |  |
| `GET,POST` | nginx | settings | searchnaxsirule |  |
| `GET,POST` | nginx | settings | searchproxy\_cache\_valid |  |
| `GET,POST` | nginx | settings | searchresolver |  |
| `GET,POST` | nginx | settings | searchsecurity\_header |  |
| `GET,POST` | nginx | settings | searchsnifwd |  |
| `GET,POST` | nginx | settings | searchstreamserver |  |
| `GET,POST` | nginx | settings | searchsyslog\_target |  |
| `GET,POST` | nginx | settings | searchtls\_fingerprint |  |
| `GET,POST` | nginx | settings | searchupstream |  |
| `GET,POST` | nginx | settings | searchupstreamserver |  |
| `GET,POST` | nginx | settings | searchuserlist |  |
| `POST` | nginx | settings | set |  |
| `POST` | nginx | settings | setcache\_path | $uuid |
| `POST` | nginx | settings | setcredential | $uuid |
| `POST` | nginx | settings | setcustompolicy | $uuid |
| `POST` | nginx | settings | seterrorpage | $uuid |
| `POST` | nginx | settings | sethttprewrite | $uuid |
| `POST` | nginx | settings | sethttpserver | $uuid |
| `POST` | nginx | settings | setipacl | $uuid |
| `POST` | nginx | settings | setlimit\_request\_connection | $uuid |
| `POST` | nginx | settings | setlimit\_zone | $uuid |
| `POST` | nginx | settings | setlocation | $uuid |
| `POST` | nginx | settings | setnaxsirule | $uuid |
| `POST` | nginx | settings | setproxy\_cache\_valid | $uuid |
| `POST` | nginx | settings | setresolver | $uuid |
| `POST` | nginx | settings | setsecurity\_header | $uuid |
| `POST` | nginx | settings | setsnifwd | $uuid |
| `POST` | nginx | settings | setstreamserver | $uuid |
| `POST` | nginx | settings | setsyslog\_target | $uuid |
| `POST` | nginx | settings | settls\_fingerprint | $uuid |
| `POST` | nginx | settings | setupstream | $uuid |
| `POST` | nginx | settings | setupstreamserver | $uuid |
| `POST` | nginx | settings | setuserlist | $uuid |
| `GET` | nginx | settings | showconfig |  |
| `GET` | nginx | settings | testconfig |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Nginx.xml](https://github.com/opnsense/plugins/blob/master/www/nginx/src/opnsense/mvc/app/models/OPNsense/Nginx/Nginx.xml) |

---

