---
title: "Nginx"
source: "https://docs.opnsense.org/development/api/plugins/nginx.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 327
lang: "zh-TW"
translated_by: "google_v2"
captured: "2026-09-26T11:34:26.434Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Netsnmp](<326 Netsnmp.md>)　｜　[下一篇：Nodeexporter ➡](<328 Nodeexporter.md>)

# Nginx

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*資源（BansController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `POST` | nginx | bans | delban | $uuid |
| `GET` | nginx | 封禁 | 取得 | |
| `GET,POST` | nginx | 封禁 | 搜索封鎖 | |
| `POST` | nginx | 封鎖 | 設定 | |
|  |  |  |  |  |
| `<<uses>>` | | | | *模型* [Nginx.xml](https://github.com/opnsense/plugins/blob/master/www/nginx/src/opnsense/mvc/app/models/OPNsense/Nginx/Nginx.xml) |

*資源（LogsController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `GET` | nginx | 日誌 | 存取 | $uuid=null,$fileno=null,$page=0,$perPage=0,$query='' |
| `GET` | nginx | 日誌 | 錯誤 | $uuid=null,$fileno=null,$page=0,$perPage=0,$query='' |
| `GET` | nginx | 日誌 | 流存取 | $uuid=null,$fileno=null,$page=0,$perPage=0,$query='' |
| `GET` | nginx | 日誌 | 流錯誤 | $uuid=null,$fileno=null,$page=0,$perPage=0,$query='' |
| `GET` | nginx | 日誌 | tls_握手 | |

*服務（ServiceController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `POST` | nginx | 服務 | 重新設定 | |
| `POST` | nginx | 服務 | 重啟 | |
| `POST` | nginx | 服務 | 啟動 | |
| `GET` | nginx | 服務 | 狀態 | |
| `GET` | nginx | 服務 | 停止 | |
| `GET` | nginx | 服務 | vts | |

*資源（SettingsController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `POST` | nginx | 設定 | 新增快取路徑 | |
| `POST` | nginx | 設定 | 新增憑證 | |
| `POST` | nginx | 設定 | 新增自訂策略 | |
| `POST` | nginx | 設定 | 新增錯誤頁面 | |
| `POST` | nginx | 設定 | 新增http重寫 | |
| `POST` | nginx | 設定 | 新增http伺服器 | |
| `POST` | nginx | 設定 | addipacl | |
| `POST` | nginx | 設定 | 新增限制請求連線 | |
| `POST` | nginx | 設定 | addlimit\_zone | |
| `POST` | nginx | 設定 | 新增位置 | |
| `POST` | nginx | 設定 | addnaxsirule | |
| `POST` | nginx | 設定 | 新增代理_快取_有效 | |
| `POST` | nginx | 設定 | 新增解析器 | |
| `POST` | nginx | 設定 | 新增安全標頭 | |
| `POST` | nginx | 設定 | 新增轉送 | |
| `POST` | nginx | 設定 | 新增流伺服器 | |
| `POST` | nginx | 設定 | 新增syslog\_target | |
| `POST` | nginx | 設定 | addtls\_fingerprint | |
| `POST` | nginx | 設定 | 新增上游 | |
| `POST` | nginx | 設定 | 新增流伺服器 | |
| `POST` | nginx | 設定 | 新增使用者清單 | |
| `POST` | nginx | 設定 | delcache\_path | $uuid |
| `POST` | nginx | 設定 | 刪除憑證 | $uuid |
| `POST` | nginx | 設定 | 刪除自訂策略 | $uuid |
| `POST` | nginx | 設定 | 刪除錯誤頁面 | $uuid |
| `POST` | nginx | 設定 | 刪除http重寫 | $uuid |
| `POST` | nginx | 設定 | delhttpserver | $uuid |
| `POST` | nginx | 設定 | delipacl | $uuid |
| `POST` | nginx | 設定 | dellimit\_request\_connection | $uuid |
| `POST` | nginx |設定|分隔區\_zone | $uuid | $uuid
| `POST` | nginx | 設定 | 分配 | $uuid |
| `POST` | nginx | 設定 | delnaxsirule | $uuid |
| `POST` | nginx | 設定 | delproxy\_cache\_valid | $uuid |
| `POST` | nginx | 設定 | delresolver | $uuid |
| `POST` | nginx | 設定 | delsecurity\_header | $uuid |
| `POST` | nginx | 設定 | delsnifwd | $uuid |
| `POST` | nginx | 設定 | delstreamserver | $uuid |
| `POST` | nginx | 設定 | delsyslog\_target | $uuid |
| `POST` | nginx | 設定 | deltls\_fingerprint | $uuid |
| `POST` | nginx | 設定 | delupstream | $uuid |
| `POST` | nginx | 設定 | delupstreamserver | $uuid |
| `POST` | nginx | 設定 | 刪除使用者清單 | $uuid |
| `POST` | nginx | 設定 | 下載規則 | |
| `GET` | nginx | 設定 | 取得 | |
| `GET` | nginx | 設定 | getcache\_path | $uuid=null |
| `GET` | nginx | 設定 | 取得憑證 | $uuid=null |
| `GET` | nginx | 設定 | 取得自訂策略 | $uuid=null |
| `GET` | nginx | 設定 | 取得錯誤頁面 | $uuid=null |
| `GET` | nginx | 設定 | gethttprewrite | $uuid=null |
| `GET` | nginx | 設定 | gethttpserver | $uuid=null |
| `GET` | nginx | 設定 | getipacl | $uuid=null |
| `GET` | nginx | 設定 | getlimit\_request\_connection | $uuid=null |
| `GET` | nginx | 設定 | getlimit\_zone | $uuid=null |
| `GET` | nginx | 設定 | getlocation | $uuid=null |
| `GET` | nginx | 設定 | getnaxsirule | $uuid=null |
| `GET` | nginx | 設定 | getproxy\_cache\_valid | $uuid=null |
| `GET` | nginx | 設定 | getresolver | $uuid=null |
| `GET` | nginx | 設定 | getsecurity\_header | $uuid=null |
| `GET` | nginx | 設定 | getsnifwd | $uuid=null |
| `GET` | nginx | 設定 | getstreamserver | $uuid=null |
| `GET` | nginx | 設定 | getsyslog\_target | $uuid=null |
| `GET` | nginx | 設定 | gettls\_fingerprint | $uuid=null |
| `GET` | nginx |設定|取得上游 | $uuid=空 |
| `GET` | nginx | 設定 | 取得上游伺服器 | $uuid=null |
| `GET` | nginx | 設定 | 取得使用者清單 | $uuid=null |
| `GET,POST` | nginx | 設定 | searchcache\_path | |
| `GET,POST` | nginx | 設定 | 搜尋憑證 | |
| `GET,POST` | nginx | 設定 | 搜尋自訂策略 | |
| `GET,POST` | nginx | 設定 | 搜尋錯誤頁面 | |
| `GET,POST` | nginx | 設定 | 搜尋http重寫 | |
| `GET,POST` | nginx | 設定 | searchhttpserver | |
| `GET,POST` | nginx | 設定 | searchipacl | |
| `GET,POST` | nginx | 設定 | searchlimit\_request\_connection | |
| `GET,POST` | nginx | 設定 | searchlimit\_zone | |
| `GET,POST` | nginx | 設定 | 搜尋位置 | |
| `GET,POST` | nginx | 設定 | searchnaxsirule | |
| `GET,POST` | nginx | 設定 | searchproxy\_cache\_valid | |
| `GET,POST` | nginx | 設定 | 搜尋解析器 | |
| `GET,POST` | nginx | 設定 | searchsecurity\_header | |
| `GET,POST` | nginx | 設定 | searchsnifwd | |
| `GET,POST` | nginx | 設定 | 搜尋流伺服器 | |
| `GET,POST` | nginx | 設定 | searchsyslog\_target | |
| `GET,POST` | nginx | 設定 | searchtls\_fingerprint | |
| `GET,POST` | nginx | 設定 | searchupstream | |
| `GET,POST` | nginx | 設定 | 搜尋上游伺服器 | |
| `GET,POST` | nginx | 設定 | 搜尋使用者清單 | |
| `POST` | nginx | 設定 | 設定 | |
| `POST` | nginx | 設定 | 設定快取路徑 | $uuid |
| `POST` | nginx | 設定 | 設定憑證 | $uuid |
| `POST` | nginx | 設定 | 設定自訂策略 | $uuid |
| `POST` | nginx | 設定 | 設定錯誤頁面 | $uuid |
| `POST` | nginx | 設定 | 設定http重寫 | $uuid |
| `POST` | nginx | 設定 | 設定http伺服器 | $uuid |
| `POST` | nginx |設定|塞蒂帕克| $uuid | $uuid
| `POST` | nginx | 設定 | 設定請求連線限制 | $uuid |
| `POST` | nginx | 設定 | setlimit\_zone | $uuid |
| `POST` | nginx | 設定 | 設定位置 | $uuid |
| `POST` | nginx | 設定 | setnaxsirule | $uuid |
| `POST` | nginx | 設定 | 設定代理快取有效 | $uuid |
| `POST` | nginx | 設定 | 設定解析器 | $uuid |
| `POST` | nginx | 設定 | 設定安全標頭 | $uuid |
| `POST` | nginx | 設定 | setsnifwd | $uuid |
| `POST` | nginx | 設定 | 設定流伺服器 | $uuid |
| `POST` | nginx | 設定 | setsyslog\_target | $uuid |
| `POST` | nginx | 設定 | settls\_fingerprint | $uuid |
| `POST` | nginx | 設定 | setupstream | $uuid |
| `POST` | nginx | 設定 | setupstreamserver | $uuid |
| `POST` | nginx |設定|設定使用者清單 | $uuid | $uuid
| `GET` | nginx | 設定 | 顯示設定 | |
| `GET` | nginx | 設定 | 測試配置 | |
|  |  |  |  |  |
| `<<uses>>` | | | | *模型* [Nginx.xml](https://github.com/opnsense/plugins/blob/master/www/nginx/src/opnsense/mvc/app/models/OPNsense/Nginx/Nginx.xml) |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Netsnmp](<326 Netsnmp.md>)　｜　[下一篇：Nodeexporter ➡](<328 Nodeexporter.md>)
