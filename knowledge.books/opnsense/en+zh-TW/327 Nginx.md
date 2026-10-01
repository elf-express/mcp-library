---
title: "Nginx"
source: "https://docs.opnsense.org/development/api/plugins/nginx.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 327
lang: "bilingual"
translated_by: "google_v2"
captured: "2026-09-26T11:34:26.434Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Netsnmp](<326 Netsnmp.md>)　｜　[下一篇：Nodeexporter ➡](<328 Nodeexporter.md>)

# Nginx

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*Resources (BansController.php)*

*資源（BansController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `POST` | nginx | bans | delban | $uuid |
| `GET` | nginx | bans<br>封禁 | get<br>取得 |  |
| `GET,POST` | nginx | bans<br>封禁 | searchban<br>搜索封鎖 |  |
| `POST` | nginx | bans<br>封鎖 | set<br>設定 |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Nginx.xml](https://github.com/opnsense/plugins/blob/master/www/nginx/src/opnsense/mvc/app/models/OPNsense/Nginx/Nginx.xml)<br>*模型* [Nginx.xml](https://github.com/opnsense/plugins/blob/master/www/nginx/src/opnsense/mvc/app/models/OPNsense/Nginx/Nginx.xml) |

*Resources (LogsController.php)*

*資源（LogsController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `GET` | nginx | logs<br>日誌 | accesses<br>存取 | $uuid=null,$fileno=null,$page=0,$perPage=0,$query=’’<br>$uuid=null,$fileno=null,$page=0,$perPage=0,$query='' |
| `GET` | nginx | logs<br>日誌 | errors<br>錯誤 | $uuid=null,$fileno=null,$page=0,$perPage=0,$query=’’<br>$uuid=null,$fileno=null,$page=0,$perPage=0,$query='' |
| `GET` | nginx | logs<br>日誌 | streamaccesses<br>流存取 | $uuid=null,$fileno=null,$page=0,$perPage=0,$query=’’<br>$uuid=null,$fileno=null,$page=0,$perPage=0,$query='' |
| `GET` | nginx | logs<br>日誌 | streamerrors<br>流錯誤 | $uuid=null,$fileno=null,$page=0,$perPage=0,$query=’’<br>$uuid=null,$fileno=null,$page=0,$perPage=0,$query='' |
| `GET` | nginx | logs<br>日誌 | tls\_handshakes<br>tls_握手 |  |

*Service (ServiceController.php)*

*服務（ServiceController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `POST` | nginx | service<br>服務 | reconfigure<br>重新設定 |  |
| `POST` | nginx | service<br>服務 | restart<br>重啟 |  |
| `POST` | nginx | service<br>服務 | start<br>啟動 |  |
| `GET` | nginx | service<br>服務 | status<br>狀態 |  |
| `GET` | nginx | service<br>服務 | stop<br>停止 |  |
| `GET` | nginx | service<br>服務 | vts |  |

*Resources (SettingsController.php)*

*資源（SettingsController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `POST` | nginx | settings<br>設定 | addcache\_path<br>新增快取路徑 |  |
| `POST` | nginx | settings<br>設定 | addcredential<br>新增憑證 |  |
| `POST` | nginx | settings<br>設定 | addcustompolicy<br>新增自訂策略 |  |
| `POST` | nginx | settings<br>設定 | adderrorpage<br>新增錯誤頁面 |  |
| `POST` | nginx | settings<br>設定 | addhttprewrite<br>新增http重寫 |  |
| `POST` | nginx | settings<br>設定 | addhttpserver<br>新增http伺服器 |  |
| `POST` | nginx | settings<br>設定 | addipacl |  |
| `POST` | nginx | settings<br>設定 | addlimit\_request\_connection<br>新增限制請求連線 |  |
| `POST` | nginx | settings<br>設定 | addlimit\_zone |  |
| `POST` | nginx | settings<br>設定 | addlocation<br>新增位置 |  |
| `POST` | nginx | settings<br>設定 | addnaxsirule |  |
| `POST` | nginx | settings<br>設定 | addproxy\_cache\_valid<br>新增代理_快取_有效 |  |
| `POST` | nginx | settings<br>設定 | addresolver<br>新增解析器 |  |
| `POST` | nginx | settings<br>設定 | addsecurity\_header<br>新增安全標頭 |  |
| `POST` | nginx | settings<br>設定 | addsnifwd<br>新增轉送 |  |
| `POST` | nginx | settings<br>設定 | addstreamserver<br>新增流伺服器 |  |
| `POST` | nginx | settings<br>設定 | addsyslog\_target<br>新增syslog\_target |  |
| `POST` | nginx | settings<br>設定 | addtls\_fingerprint |  |
| `POST` | nginx | settings<br>設定 | addupstream<br>新增上游 |  |
| `POST` | nginx | settings<br>設定 | addupstreamserver<br>新增流伺服器 |  |
| `POST` | nginx | settings<br>設定 | adduserlist<br>新增使用者清單 |  |
| `POST` | nginx | settings<br>設定 | delcache\_path | $uuid |
| `POST` | nginx | settings<br>設定 | delcredential<br>刪除憑證 | $uuid |
| `POST` | nginx | settings<br>設定 | delcustompolicy<br>刪除自訂策略 | $uuid |
| `POST` | nginx | settings<br>設定 | delerrorpage<br>刪除錯誤頁面 | $uuid |
| `POST` | nginx | settings<br>設定 | delhttprewrite<br>刪除http重寫 | $uuid |
| `POST` | nginx | settings<br>設定 | delhttpserver | $uuid |
| `POST` | nginx | settings<br>設定 | delipacl | $uuid |
| `POST` | nginx | settings<br>設定 | dellimit\_request\_connection | $uuid |
| `POST` | nginx | settings<br>設定 | dellimit\_zone<br>分隔區\_zone | $uuid |
| `POST` | nginx | settings<br>設定 | dellocation<br>分配 | $uuid |
| `POST` | nginx | settings<br>設定 | delnaxsirule | $uuid |
| `POST` | nginx | settings<br>設定 | delproxy\_cache\_valid | $uuid |
| `POST` | nginx | settings<br>設定 | delresolver | $uuid |
| `POST` | nginx | settings<br>設定 | delsecurity\_header | $uuid |
| `POST` | nginx | settings<br>設定 | delsnifwd | $uuid |
| `POST` | nginx | settings<br>設定 | delstreamserver | $uuid |
| `POST` | nginx | settings<br>設定 | delsyslog\_target | $uuid |
| `POST` | nginx | settings<br>設定 | deltls\_fingerprint | $uuid |
| `POST` | nginx | settings<br>設定 | delupstream | $uuid |
| `POST` | nginx | settings<br>設定 | delupstreamserver | $uuid |
| `POST` | nginx | settings<br>設定 | deluserlist<br>刪除使用者清單 | $uuid |
| `POST` | nginx | settings<br>設定 | downloadrules<br>下載規則 |  |
| `GET` | nginx | settings<br>設定 | get<br>取得 |  |
| `GET` | nginx | settings<br>設定 | getcache\_path | $uuid=null |
| `GET` | nginx | settings<br>設定 | getcredential<br>取得憑證 | $uuid=null |
| `GET` | nginx | settings<br>設定 | getcustompolicy<br>取得自訂策略 | $uuid=null |
| `GET` | nginx | settings<br>設定 | geterrorpage<br>取得錯誤頁面 | $uuid=null |
| `GET` | nginx | settings<br>設定 | gethttprewrite | $uuid=null |
| `GET` | nginx | settings<br>設定 | gethttpserver | $uuid=null |
| `GET` | nginx | settings<br>設定 | getipacl | $uuid=null |
| `GET` | nginx | settings<br>設定 | getlimit\_request\_connection | $uuid=null |
| `GET` | nginx | settings<br>設定 | getlimit\_zone | $uuid=null |
| `GET` | nginx | settings<br>設定 | getlocation | $uuid=null |
| `GET` | nginx | settings<br>設定 | getnaxsirule | $uuid=null |
| `GET` | nginx | settings<br>設定 | getproxy\_cache\_valid | $uuid=null |
| `GET` | nginx | settings<br>設定 | getresolver | $uuid=null |
| `GET` | nginx | settings<br>設定 | getsecurity\_header | $uuid=null |
| `GET` | nginx | settings<br>設定 | getsnifwd | $uuid=null |
| `GET` | nginx | settings<br>設定 | getstreamserver | $uuid=null |
| `GET` | nginx | settings<br>設定 | getsyslog\_target | $uuid=null |
| `GET` | nginx | settings<br>設定 | gettls\_fingerprint | $uuid=null |
| `GET` | nginx | settings<br>設定 | getupstream<br>取得上游 | $uuid=null<br>$uuid=空 |
| `GET` | nginx | settings<br>設定 | getupstreamserver<br>取得上游伺服器 | $uuid=null |
| `GET` | nginx | settings<br>設定 | getuserlist<br>取得使用者清單 | $uuid=null |
| `GET,POST` | nginx | settings<br>設定 | searchcache\_path |  |
| `GET,POST` | nginx | settings<br>設定 | searchcredential<br>搜尋憑證 |  |
| `GET,POST` | nginx | settings<br>設定 | searchcustompolicy<br>搜尋自訂策略 |  |
| `GET,POST` | nginx | settings<br>設定 | searcherrorpage<br>搜尋錯誤頁面 |  |
| `GET,POST` | nginx | settings<br>設定 | searchhttprewrite<br>搜尋http重寫 |  |
| `GET,POST` | nginx | settings<br>設定 | searchhttpserver |  |
| `GET,POST` | nginx | settings<br>設定 | searchipacl |  |
| `GET,POST` | nginx | settings<br>設定 | searchlimit\_request\_connection |  |
| `GET,POST` | nginx | settings<br>設定 | searchlimit\_zone |  |
| `GET,POST` | nginx | settings<br>設定 | searchlocation<br>搜尋位置 |  |
| `GET,POST` | nginx | settings<br>設定 | searchnaxsirule |  |
| `GET,POST` | nginx | settings<br>設定 | searchproxy\_cache\_valid |  |
| `GET,POST` | nginx | settings<br>設定 | searchresolver<br>搜尋解析器 |  |
| `GET,POST` | nginx | settings<br>設定 | searchsecurity\_header |  |
| `GET,POST` | nginx | settings<br>設定 | searchsnifwd |  |
| `GET,POST` | nginx | settings<br>設定 | searchstreamserver<br>搜尋流伺服器 |  |
| `GET,POST` | nginx | settings<br>設定 | searchsyslog\_target |  |
| `GET,POST` | nginx | settings<br>設定 | searchtls\_fingerprint |  |
| `GET,POST` | nginx | settings<br>設定 | searchupstream |  |
| `GET,POST` | nginx | settings<br>設定 | searchupstreamserver<br>搜尋上游伺服器 |  |
| `GET,POST` | nginx | settings<br>設定 | searchuserlist<br>搜尋使用者清單 |  |
| `POST` | nginx | settings<br>設定 | set<br>設定 |  |
| `POST` | nginx | settings<br>設定 | setcache\_path<br>設定快取路徑 | $uuid |
| `POST` | nginx | settings<br>設定 | setcredential<br>設定憑證 | $uuid |
| `POST` | nginx | settings<br>設定 | setcustompolicy<br>設定自訂策略 | $uuid |
| `POST` | nginx | settings<br>設定 | seterrorpage<br>設定錯誤頁面 | $uuid |
| `POST` | nginx | settings<br>設定 | sethttprewrite<br>設定http重寫 | $uuid |
| `POST` | nginx | settings<br>設定 | sethttpserver<br>設定http伺服器 | $uuid |
| `POST` | nginx | settings<br>設定 | setipacl<br>塞蒂帕克 | $uuid |
| `POST` | nginx | settings<br>設定 | setlimit\_request\_connection<br>設定請求連線限制 | $uuid |
| `POST` | nginx | settings<br>設定 | setlimit\_zone | $uuid |
| `POST` | nginx | settings<br>設定 | setlocation<br>設定位置 | $uuid |
| `POST` | nginx | settings<br>設定 | setnaxsirule | $uuid |
| `POST` | nginx | settings<br>設定 | setproxy\_cache\_valid<br>設定代理快取有效 | $uuid |
| `POST` | nginx | settings<br>設定 | setresolver<br>設定解析器 | $uuid |
| `POST` | nginx | settings<br>設定 | setsecurity\_header<br>設定安全標頭 | $uuid |
| `POST` | nginx | settings<br>設定 | setsnifwd | $uuid |
| `POST` | nginx | settings<br>設定 | setstreamserver<br>設定流伺服器 | $uuid |
| `POST` | nginx | settings<br>設定 | setsyslog\_target | $uuid |
| `POST` | nginx | settings<br>設定 | settls\_fingerprint | $uuid |
| `POST` | nginx | settings<br>設定 | setupstream | $uuid |
| `POST` | nginx | settings<br>設定 | setupstreamserver | $uuid |
| `POST` | nginx | settings<br>設定 | setuserlist<br>設定使用者清單 | $uuid |
| `GET` | nginx | settings<br>設定 | showconfig<br>顯示設定 |  |
| `GET` | nginx | settings<br>設定 | testconfig<br>測試配置 |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Nginx.xml](https://github.com/opnsense/plugins/blob/master/www/nginx/src/opnsense/mvc/app/models/OPNsense/Nginx/Nginx.xml)<br>*模型* [Nginx.xml](https://github.com/opnsense/plugins/blob/master/www/nginx/src/opnsense/mvc/app/models/OPNsense/Nginx/Nginx.xml) |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Netsnmp](<326 Netsnmp.md>)　｜　[下一篇：Nodeexporter ➡](<328 Nodeexporter.md>)
