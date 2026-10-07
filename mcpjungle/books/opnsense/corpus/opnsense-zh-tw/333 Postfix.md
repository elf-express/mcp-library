---
title: "Postfix"
source: https://docs.opnsense.org/development/api/plugins/postfix.html
chapter: ["Development Manual","API Reference","Plugins API"]
order: 333
lang: "zh-TW"
translated_by: "google_v2"
captured: "2026-09-26T11:34:29.476Z"
---

# Postfix

*資源（AddressController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `POST` | 字尾 | 地址 | add\_ddress | |
| `POST` | 字尾 | 地址 | del\_address | $uuid |
| `GET` | 字尾 | 位址 | 取得 | |
| `GET` | postfix | address | get\_address | $uuid=null |
| `GET,POST` | 後綴 | 地址 | 搜尋_地址 | |
| `POST` | 字尾 | 位址 | 集 | |
| `POST` | 後綴 | 位址 | 設定_位址 | $uuid |
| `POST` | 字尾 | 地址 | toggle\_address | $uuid |
|  |  |  |  |  |
| `<<uses>>` | | | | *模型* [Address.xml](https://github.com/opnsense/plugins/blob/master/mail/postfix/src/opnsense/mvc/app/models/OPNsense/Postfix/Address.xml) |

*資源（AntispamController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `GET` | postfix | 反垃圾郵件 | 取得 | |
| `POST` | postfix | 反垃圾郵件 | 設定 | |
|  |  |  |  |  |
| `<<uses>>` | | | | *模型* [Antispam.xml](https://github.com/opnsense/plugins/blob/master/mail/postfix/src/opnsense/mvc/app/models/OPNsense/Postfix/Antispam.xml) |

*資源（DomainController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `POST` | postfix | domain | add\_domain | |
| `POST` | postfix | domain | del\_domain | $uuid |
| `GET` | postfix | domain | get | |
| `GET` | postfix | domain | get\_domain | $uuid=null |
| `GET,POST` | 後綴 | 網域 | 搜尋_網域 | |
| `POST` | 字尾 | 網域 | 集 | |
| `POST` | postfix | domain | set\_domain | $uuid |
| `POST` | postfix | domain | toggle\_domain | $uuid |
|  |  |  |  |  |
| `<<uses>>` | | | | *模型* [Domain.xml](https://github.com/opnsense/plugins/blob/master/mail/postfix/src/opnsense/mvc/app/models/OPNsense/Postfix/Domain.xml) |

*資源（GeneralController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `GET` | 字尾 | 通用 | 取得 | |
| `POST` | 字尾 | 通用 | 集合 | |
|  |  |  |  |  |
| `<<uses>>` | | | | *模型* [General.xml](https://github.com/opnsense/plugins/blob/master/mail/postfix/src/opnsense/mvc/app/models/OPNsense/Postfix/General.xml) |

*資源（HeaderchecksController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `POST` | postfix | headerchecks | add\_headercheck | |
| `POST` | postfix | headerchecks | del\_headercheck | $uuid |
| `GET` | postfix | headerchecks | get | |
| `GET` | postfix | headerchecks | get\_headercheck | $uuid=null |
| `GET,POST` | postfix | headerchecks | search\_headerchecks | |
| `POST` | postfix | headerchecks | set | |
| `POST` | postfix | headerchecks | set\_headercheck | $uuid |
| `POST` | postfix | headerchecks | toggle\_headercheck | $uuid |
|  |  |  |  |  |
| `<<uses>>` | | | | *模型* [Headerchecks.xml](https://github.com/opnsense/plugins/blob/master/mail/postfix/src/opnsense/mvc/app/models/OPNsense/Postfix/Headerchecks.xml) |

*資源（RecipientController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `POST` | 字尾 | 收件人 | 新增收件人 | |
| `POST` |字尾 |收件者|刪除收件者 | $uuid | $uuid
| `GET` | 字尾 | 收件人 | 取得 | |
| `GET` | postfix | recipient | get\_recipient | $uuid=null |
| `GET,POST` | 字尾 | 收件人 | 搜尋收件人 | |
| `POST` | 字尾 | 收件人 | 集 | |
| `POST` | postfix | recipient | set\_recipient | $uuid |
| `POST` | postfix | recipient | toggle\_recipient | $uuid |
|  |  |  |  |  |
| `<<uses>>` | | | | *模型* [Recipient.xml](https://github.com/opnsense/plugins/blob/master/mail/postfix/src/opnsense/mvc/app/models/OPNsense/Postfix/Recipient.xml) |

*資源（RecipientbccController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `POST` | postfix | recipientbcc | add\_recipientbcc | |
| `POST` | postfix | recipientbcc | del\_recipientbcc | $uuid |
| `GET` | postfix | recipientbcc | get | |
| `GET` | postfix | recipientbcc | get\_recipientbcc | $uuid=null |
| `GET,POST` | postfix | recipientbcc | search\_recipientbcc | |
| `POST` | 字尾 | 收件人密送 | 設定 | |
| `POST` | postfix | recipientbcc | set\_recipientbcc | $uuid |
| `POST` | postfix | recipientbcc | toggle\_recipientbcc | $uuid |
|  |  |  |  |  |
| `<<uses>>` | | | | *模型* [Recipientbcc.xml](https://github.com/opnsense/plugins/blob/master/mail/postfix/src/opnsense/mvc/app/models/OPNsense/Postfix/Recipientbcc.xml) |

*資源（SenderController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `POST` | postfix | sender | add\_sender | |
| `POST` |後綴 |寄件者 |刪除寄件者 | $uuid | $uuid
| `GET` | postfix | sender | get | |
| `GET` | postfix | sender | get\_sender | $uuid=null |
| `GET,POST` | postfix | sender | search\_sender | |
| `POST` | 後綴 | 寄件者 | 設定 | |
| `POST` | postfix | sender | set\_sender | $uuid |
| `POST` | postfix | sender | toggle\_sender | $uuid |
|  |  |  |  |  |
| `<<uses>>` | | | | *模型* [Sender.xml](https://github.com/opnsense/plugins/blob/master/mail/postfix/src/opnsense/mvc/app/models/OPNsense/Postfix/Sender.xml) |

*資源（SenderbccController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `POST` | postfix | senderbcc | add\_senderbcc | |
| `POST` |後綴 |寄件人密件抄送 | del\_senderbcc | $uuid | $uuid
| `GET` | postfix | senderbcc | get | |
| `GET` | postfix | senderbcc | get\_senderbcc | $uuid=null |
| `GET,POST` | postfix | senderbcc | search\_senderbcc | |
| `POST` | postfix | senderbcc | set | |
| `POST` | postfix | senderbcc | set\_senderbcc | $uuid |
| `POST` | postfix | senderbcc | toggle\_senderbcc | $uuid |
|  |  |  |  |  |
| `<<uses>>` | | | | *模型* [Senderbcc.xml](https://github.com/opnsense/plugins/blob/master/mail/postfix/src/opnsense/mvc/app/models/OPNsense/Postfix/Senderbcc.xml) |

*資源（SendercanonicalController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `POST` | postfix | sendercanonical | add\_sendercanonical | |
| `POST` | postfix | sendercanonical | del\_sendercanonical | $uuid |
| `GET` | postfix | sendercanonical | get | |
| `GET` | postfix | sendercanonical | get\_sendercanonical | $uuid=null |
| `GET,POST` | postfix | sendercanonical | search\_sendercanonical | |
| `POST` | 後綴 | 規範發送者 | 設定 | |
| `POST` | postfix | sendercanonical | set\_sendercanonical | $uuid |
| `POST` | postfix | sendercanonical | toggle\_sendercanonical | $uuid |
|  |  |  |  |  |
| `<<uses>>` | | | | *模型* [Sendercanonical.xml](https://github.com/opnsense/plugins/blob/master/mail/postfix/src/opnsense/mvc/app/models/OPNsense/Postfix/Sendercanonical.xml) |

*服務（ServiceController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `GET` | postfix | 服務 | checkrspamd | |
| `POST` | postfix | 服務 | 重新配置 | |
| `POST` | postfix | 服務 | 重啟 | |
| `POST` | postfix | 服務 | 開始 | |
| `GET` | postfix | 服務 | 狀態 | |
| `POST` | 後綴 | 服務 | 停止 | |