---
title: "IPsec"
title_original: "Ipsec"
source: https://docs.opnsense.org/development/api/core/ipsec.html
chapter: ["Development Manual","API Reference","Core API"]
order: 281
lang: "zh-TW"
translated_by: "google_v2"
captured: "2026-09-26T11:34:03.142Z"
---


# IPsec


*資源（ConnectionsController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `POST` | ipsec | 連線 | 新增子程序 | |
| `POST` | ipsec | 連接 | 新增連接 | |
| `POST` | ipsec | 連接 | add\_local | |
| `POST` | ipsec | 連線 | 新增遠端 | |
| `GET` | ipsec | 連接 | 連接存在 | $uuid |
| `POST` | ipsec | 連接 | del\_child | $uuid |
| `POST` | ipsec | 連線 | 刪除連線 | $uuid |
| `POST` | ipsec | 連接 | del\_local | $uuid |
| `POST` | ipsec | 連接 | del\_remote | $uuid |
| `GET` | ipsec | 連接 | 取得 | |
| `GET` | ipsec | 連線 | 取得子程序 | $uuid=null |
| `GET` | ipsec | 連接 | 取得連接 | $uuid=null |
| `GET` | ipsec | 連線 | 取得本機連線 | $uuid=null |
| `GET` | ipsec | 連線 | 取得遠端 | $uuid=null |
| `GET` | ipsec | 連線 | 已啟用 | |
| `GET,POST` | ipsec | 連線 | 搜尋子進程 | |
| `GET,POST` | ipsec | 連線 | 搜尋連線 | |
| `GET,POST` | ipsec | 連線 | search\_local | |
| `GET,POST` | ipsec | 連線 | 搜尋遠端 | |
| `POST` | ipsec | 連接 | 設定 | |
| `POST` | ipsec | 連接 | 設定子連接 | $uuid=null |
| `POST` | ipsec | 連接 | 設定連線 | $uuid=null |
| `POST` | ipsec | 連線 | 設定本地 | $uuid=null |
| `POST` | ipsec | 連線 | 設定遠端 | $uuid=null |
| `GET` | ipsec | 連接 | swanctl | |
| `POST` | ipsec | 連接 | 切換 | $enabled=null |
| `POST` | ipsec | 連接 | toggle\_child | $uuid,$enabled=null |
| `POST` | ipsec | 連接 | 切換連線 | $uuid,$enabled=null |
| `POST` | ipsec | 連接 | toggle\_local | $uuid,$enabled=null |
| `POST` | ipsec | 連接 | toggle\_remote | $uuid,$enabled=null |
|  |  |  |  |  |
| `<<uses>>` | | | | *模型* [Swanctl.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/IPsec/Swanctl.xml) |

*資源（KeyPairsController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `POST` | ipsec | 金鑰對 | 新增項目 | |
| `POST` | ipsec | 金鑰對 | 刪除項目 | $uuid |
| `GET` | ipsec | 金鑰對 | gen\_key\_pair | $type,$size=null |
| `GET` | ipsec | 金鑰對 | 取得 | |
| `GET` | ipsec | 金鑰對 | 取得項目 | $uuid=null |
| `GET,POST` | ipsec | 金鑰對 | 搜尋項目 | |
| `POST` | ipsec | 金鑰對 | 集 | |
| `POST` | ipsec | 金鑰對 | 設定項目 | $uuid=null |
|  |  |  |  |  |
| `<<uses>>` | | | | *模型* [IPsec.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/IPsec/IPsec.xml) |

*資源（LeasesController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `GET` | IPsec | 租約 | 池 | |
| `GET` | IPsec | 租約 | 搜尋 | |

*資源（LegacySubsystemController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `POST` | ipsec | legacy\_subsystem | apply\_config | |
| `GET` | ipsec | legacy\_subsystem | status | |

*資源（ManualSpdController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `POST` | ipsec | manual\_spd | add | |
| `POST` | ipsec | manual\_spd | del | $uuid |
| `GET` | ipsec | manual\_spd | get | $uuid=null |
| `GET,POST` | ipsec | manual\_spd | 搜尋 | |
| `POST` | ipsec | manual\_spd | set | $uuid=null |
| `POST` | ipsec | manual\_spd | toggle | $uuid,$enabled=null |
|  |  |  |  |  |
| `<<uses>>` | | | | *模型* [Swanctl.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/IPsec/Swanctl.xml) |

*資源（PoolsController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `POST` | IPsec | 池 | 新增 | |
| `POST` | ipsec | 池 | 刪除 | $uuid |
| `GET` | ipsec | 池 | 取得 | $uuid=null |
| `GET,POST` | IPsec | 池 | 搜尋 | |
| `POST` | ipsec | 池 | 設定 | $uuid=null |
| `POST` | ipsec | 池 | 切換 | $uuid,$enabled=null |
|  |  |  |  |  |
| `<<uses>>` | | | | *模型* [Swanctl.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/IPsec/Swanctl.xml) |

*資源（PreSharedKeysController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `POST` | ipsec | 預先共用金鑰 | 新增項目 | |
| `POST` | ipsec | pre\_shared\_keys | del\_item | $uuid |
| `GET` | ipsec | 預先共用金鑰 | 取得 | |
| `GET` | ipsec | pre\_shared\_keys | get\_item | $uuid=null |
| `GET,POST` | ipsec | 預先共用金鑰 | 搜尋項目 | |
| `POST` | ipsec | 預先共用金鑰 | 設定 | |
| `POST` | ipsec | pre\_shared\_keys | set\_item | $uuid=null |
|  |  |  |  |  |
| `<<uses>>` | | | | *模型* [IPsec.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/IPsec/IPsec.xml) |

*資源（SadController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `POST` | ipsec | sad | 刪除 | $id |
| `GET` | IPsec | 悲傷 | 搜尋 | |

*服務（ServiceController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `POST` | ipsec | 服務 | 重新配置 | |
| `POST` | ipsec | 服務 | 重啟 | |
| `POST` | ipsec | 服務 | 啟動 | |
| `GET` | ipsec | 服務 | 狀態 | |
| `POST` | ipsec | 服務 | 停止 | |

*資源（SessionsController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `POST` | ipsec | 會話 | 連線 | $id |
| `POST` | ipsec | 會話 | 中斷連線 | $id |
| `GET` | ipsec | 會話 | 搜尋_階段1 | |
| `GET` | ipsec | 會話 | search\_phase2 | |

*資源（SettingsController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `GET` | ipsec | 設定 | 取得 | |
| `POST` | ipsec | 設定 | 設定 | |
|  |  |  |  |  |
| `<<uses>>` | | | | *模型* [IPsec.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/IPsec/IPsec.xml) |

*資源（SpdController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `POST` | ipsec | spd | 刪除 | $id |
| `GET` | ipsec | spd | 搜尋 | |

*資源（TunnelController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `POST` | ipsec | 隧道 | del\_phase1 | $ikeid |
| `POST` |網路安全協定 |隧道|刪除\_phase2 | $seqid |
| `GET` | ipsec | 隧道 | search\_phase1 | |
| `GET` | ipsec | 隧道 | search\_phase2 | |
| `POST` | ipsec | 隧道 | 切換 | $enabled=null |
| `POST` | ipsec | 隧道 | toggle\_phase1 | $ikeid,$enabled=null |
| `POST` | ipsec | 隧道 | toggle\_phase2 | $seqid,$enabled=null |

*資源（VtiController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `POST` | ipsec | vti | 新增 | |
| `POST` | ipsec | vti | del | $uuid |
| `GET` | ipsec | vti | 取得 | $uuid=null |
| `GET,POST` | IPsec | VTI | 搜尋 | |
| `POST` | ipsec | vti | 設定 | $uuid=null |
| `POST` | ipsec | vti | 切換 | $uuid,$enabled=null |
|  |  |  |  |  |
| `<<uses>>` | | | | *模型* [Swanctl.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/IPsec/Swanctl.xml) |

---

