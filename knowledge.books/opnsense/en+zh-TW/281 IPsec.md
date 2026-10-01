---
title: "Ipsec｜IPsec"
title_original: "Ipsec"
source: "https://docs.opnsense.org/development/api/core/ipsec.html"
chapter: ["Development Manual","API Reference","Core API"]
order: 281
lang: "bilingual"
translated_by: "google_v2"
captured: "2026-09-26T11:34:03.142Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Interfaces｜介面](<280 介面.md>)　｜　[下一篇：Kea｜啄羊鸚鵡 ➡](<282 啄羊鸚鵡.md>)

# Ipsec｜IPsec

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Core API](<000 目錄.md#c-59>)

*Resources (ConnectionsController.php)*

*資源（ConnectionsController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `POST` | ipsec | connections<br>連線 | add\_child<br>新增子程序 |  |
| `POST` | ipsec | connections<br>連接 | add\_connection<br>新增連接 |  |
| `POST` | ipsec | connections<br>連接 | add\_local |  |
| `POST` | ipsec | connections<br>連線 | add\_remote<br>新增遠端 |  |
| `GET` | ipsec | connections<br>連接 | connection\_exists<br>連接存在 | $uuid |
| `POST` | ipsec | connections<br>連接 | del\_child | $uuid |
| `POST` | ipsec | connections<br>連線 | del\_connection<br>刪除連線 | $uuid |
| `POST` | ipsec | connections<br>連接 | del\_local | $uuid |
| `POST` | ipsec | connections<br>連接 | del\_remote | $uuid |
| `GET` | ipsec | connections<br>連接 | get<br>取得 |  |
| `GET` | ipsec | connections<br>連線 | get\_child<br>取得子程序 | $uuid=null |
| `GET` | ipsec | connections<br>連接 | get\_connection<br>取得連接 | $uuid=null |
| `GET` | ipsec | connections<br>連線 | get\_local<br>取得本機連線 | $uuid=null |
| `GET` | ipsec | connections<br>連線 | get\_remote<br>取得遠端 | $uuid=null |
| `GET` | ipsec | connections<br>連線 | is\_enabled<br>已啟用 |  |
| `GET,POST` | ipsec | connections<br>連線 | search\_child<br>搜尋子進程 |  |
| `GET,POST` | ipsec | connections<br>連線 | search\_connection<br>搜尋連線 |  |
| `GET,POST` | ipsec | connections<br>連線 | search\_local |  |
| `GET,POST` | ipsec | connections<br>連線 | search\_remote<br>搜尋遠端 |  |
| `POST` | ipsec | connections<br>連接 | set<br>設定 |  |
| `POST` | ipsec | connections<br>連接 | set\_child<br>設定子連接 | $uuid=null |
| `POST` | ipsec | connections<br>連接 | set\_connection<br>設定連線 | $uuid=null |
| `POST` | ipsec | connections<br>連線 | set\_local<br>設定本地 | $uuid=null |
| `POST` | ipsec | connections<br>連線 | set\_remote<br>設定遠端 | $uuid=null |
| `GET` | ipsec | connections<br>連接 | swanctl |  |
| `POST` | ipsec | connections<br>連接 | toggle<br>切換 | $enabled=null |
| `POST` | ipsec | connections<br>連接 | toggle\_child | $uuid,$enabled=null |
| `POST` | ipsec | connections<br>連接 | toggle\_connection<br>切換連線 | $uuid,$enabled=null |
| `POST` | ipsec | connections<br>連接 | toggle\_local | $uuid,$enabled=null |
| `POST` | ipsec | connections<br>連接 | toggle\_remote | $uuid,$enabled=null |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Swanctl.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/IPsec/Swanctl.xml)<br>*模型* [Swanctl.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/IPsec/Swanctl.xml) |

*Resources (KeyPairsController.php)*

*資源（KeyPairsController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `POST` | ipsec | key\_pairs<br>金鑰對 | add\_item<br>新增項目 |  |
| `POST` | ipsec | key\_pairs<br>金鑰對 | del\_item<br>刪除項目 | $uuid |
| `GET` | ipsec | key\_pairs<br>金鑰對 | gen\_key\_pair | $type,$size=null |
| `GET` | ipsec | key\_pairs<br>金鑰對 | get<br>取得 |  |
| `GET` | ipsec | key\_pairs<br>金鑰對 | get\_item<br>取得項目 | $uuid=null |
| `GET,POST` | ipsec | key\_pairs<br>金鑰對 | search\_item<br>搜尋項目 |  |
| `POST` | ipsec | key\_pairs<br>金鑰對 | set<br>集 |  |
| `POST` | ipsec | key\_pairs<br>金鑰對 | set\_item<br>設定項目 | $uuid=null |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [IPsec.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/IPsec/IPsec.xml)<br>*模型* [IPsec.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/IPsec/IPsec.xml) |

*Resources (LeasesController.php)*

*資源（LeasesController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `GET` | ipsec<br>IPsec | leases<br>租約 | pools<br>池 |  |
| `GET` | ipsec<br>IPsec | leases<br>租約 | search<br>搜尋 |  |

*Resources (LegacySubsystemController.php)*

*資源（LegacySubsystemController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `POST` | ipsec | legacy\_subsystem | apply\_config |  |
| `GET` | ipsec | legacy\_subsystem | status |  |

*Resources (ManualSpdController.php)*

*資源（ManualSpdController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `POST` | ipsec | manual\_spd | add |  |
| `POST` | ipsec | manual\_spd | del | $uuid |
| `GET` | ipsec | manual\_spd | get | $uuid=null |
| `GET,POST` | ipsec | manual\_spd | search<br>搜尋 |  |
| `POST` | ipsec | manual\_spd | set | $uuid=null |
| `POST` | ipsec | manual\_spd | toggle | $uuid,$enabled=null |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Swanctl.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/IPsec/Swanctl.xml)<br>*模型* [Swanctl.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/IPsec/Swanctl.xml) |

*Resources (PoolsController.php)*

*資源（PoolsController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `POST` | ipsec<br>IPsec | pools<br>池 | add<br>新增 |  |
| `POST` | ipsec | pools<br>池 | del<br>刪除 | $uuid |
| `GET` | ipsec | pools<br>池 | get<br>取得 | $uuid=null |
| `GET,POST` | ipsec<br>IPsec | pools<br>池 | search<br>搜尋 |  |
| `POST` | ipsec | pools<br>池 | set<br>設定 | $uuid=null |
| `POST` | ipsec | pools<br>池 | toggle<br>切換 | $uuid,$enabled=null |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Swanctl.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/IPsec/Swanctl.xml)<br>*模型* [Swanctl.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/IPsec/Swanctl.xml) |

*Resources (PreSharedKeysController.php)*

*資源（PreSharedKeysController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `POST` | ipsec | pre\_shared\_keys<br>預先共用金鑰 | add\_item<br>新增項目 |  |
| `POST` | ipsec | pre\_shared\_keys | del\_item | $uuid |
| `GET` | ipsec | pre\_shared\_keys<br>預先共用金鑰 | get<br>取得 |  |
| `GET` | ipsec | pre\_shared\_keys | get\_item | $uuid=null |
| `GET,POST` | ipsec | pre\_shared\_keys<br>預先共用金鑰 | search\_item<br>搜尋項目 |  |
| `POST` | ipsec | pre\_shared\_keys<br>預先共用金鑰 | set<br>設定 |  |
| `POST` | ipsec | pre\_shared\_keys | set\_item | $uuid=null |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [IPsec.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/IPsec/IPsec.xml)<br>*模型* [IPsec.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/IPsec/IPsec.xml) |

*Resources (SadController.php)*

*資源（SadController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `POST` | ipsec | sad | delete<br>刪除 | $id |
| `GET` | ipsec<br>IPsec | sad<br>悲傷 | search<br>搜尋 |  |

*Service (ServiceController.php)*

*服務（ServiceController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `POST` | ipsec | service<br>服務 | reconfigure<br>重新配置 |  |
| `POST` | ipsec | service<br>服務 | restart<br>重啟 |  |
| `POST` | ipsec | service<br>服務 | start<br>啟動 |  |
| `GET` | ipsec | service<br>服務 | status<br>狀態 |  |
| `POST` | ipsec | service<br>服務 | stop<br>停止 |  |

*Resources (SessionsController.php)*

*資源（SessionsController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `POST` | ipsec | sessions<br>會話 | connect<br>連線 | $id |
| `POST` | ipsec | sessions<br>會話 | disconnect<br>中斷連線 | $id |
| `GET` | ipsec | sessions<br>會話 | search\_phase1<br>搜尋_階段1 |  |
| `GET` | ipsec | sessions<br>會話 | search\_phase2 |  |

*Resources (SettingsController.php)*

*資源（SettingsController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `GET` | ipsec | settings<br>設定 | get<br>取得 |  |
| `POST` | ipsec | settings<br>設定 | set<br>設定 |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [IPsec.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/IPsec/IPsec.xml)<br>*模型* [IPsec.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/IPsec/IPsec.xml) |

*Resources (SpdController.php)*

*資源（SpdController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `POST` | ipsec | spd | delete<br>刪除 | $id |
| `GET` | ipsec | spd | search<br>搜尋 |  |

*Resources (TunnelController.php)*

*資源（TunnelController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `POST` | ipsec | tunnel<br>隧道 | del\_phase1 | $ikeid |
| `POST` | ipsec<br>網路安全協定 | tunnel<br>隧道 | del\_phase2<br>刪除\_phase2 | $seqid |
| `GET` | ipsec | tunnel<br>隧道 | search\_phase1 |  |
| `GET` | ipsec | tunnel<br>隧道 | search\_phase2 |  |
| `POST` | ipsec | tunnel<br>隧道 | toggle<br>切換 | $enabled=null |
| `POST` | ipsec | tunnel<br>隧道 | toggle\_phase1 | $ikeid,$enabled=null |
| `POST` | ipsec | tunnel<br>隧道 | toggle\_phase2 | $seqid,$enabled=null |

*Resources (VtiController.php)*

*資源（VtiController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `POST` | ipsec | vti | add<br>新增 |  |
| `POST` | ipsec | vti | del | $uuid |
| `GET` | ipsec | vti | get<br>取得 | $uuid=null |
| `GET,POST` | ipsec<br>IPsec | vti<br>VTI | search<br>搜尋 |  |
| `POST` | ipsec | vti | set<br>設定 | $uuid=null |
| `POST` | ipsec | vti | toggle<br>切換 | $uuid,$enabled=null |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Swanctl.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/IPsec/Swanctl.xml)<br>*模型* [Swanctl.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/IPsec/Swanctl.xml) |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Interfaces｜介面](<280 介面.md>)　｜　[下一篇：Kea｜啄羊鸚鵡 ➡](<282 啄羊鸚鵡.md>)
