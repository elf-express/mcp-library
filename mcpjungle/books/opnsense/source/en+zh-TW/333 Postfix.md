---
title: "Postfix"
source: "https://docs.opnsense.org/development/api/plugins/postfix.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 333
lang: "bilingual"
translated_by: "google_v2"
captured: "2026-09-26T11:34:29.476Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Openconnect](<332 Openconnect.md>)　｜　[下一篇：Proxy｜代理人 ➡](<334 代理人.md>)

# Postfix

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*Resources (AddressController.php)*

*資源（AddressController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `POST` | postfix<br>字尾 | address<br>地址 | add\_address<br>add\_ddress |  |
| `POST` | postfix<br>字尾 | address<br>地址 | del\_address | $uuid |
| `GET` | postfix<br>字尾 | address<br>位址 | get<br>取得 |  |
| `GET` | postfix | address | get\_address | $uuid=null |
| `GET,POST` | postfix<br>後綴 | address<br>地址 | search\_address<br>搜尋_地址 |  |
| `POST` | postfix<br>字尾 | address<br>位址 | set<br>集 |  |
| `POST` | postfix<br>後綴 | address<br>位址 | set\_address<br>設定_位址 | $uuid |
| `POST` | postfix<br>字尾 | address<br>地址 | toggle\_address | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Address.xml](https://github.com/opnsense/plugins/blob/master/mail/postfix/src/opnsense/mvc/app/models/OPNsense/Postfix/Address.xml)<br>*模型* [Address.xml](https://github.com/opnsense/plugins/blob/master/mail/postfix/src/opnsense/mvc/app/models/OPNsense/Postfix/Address.xml) |

*Resources (AntispamController.php)*

*資源（AntispamController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `GET` | postfix | antispam<br>反垃圾郵件 | get<br>取得 |  |
| `POST` | postfix | antispam<br>反垃圾郵件 | set<br>設定 |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Antispam.xml](https://github.com/opnsense/plugins/blob/master/mail/postfix/src/opnsense/mvc/app/models/OPNsense/Postfix/Antispam.xml)<br>*模型* [Antispam.xml](https://github.com/opnsense/plugins/blob/master/mail/postfix/src/opnsense/mvc/app/models/OPNsense/Postfix/Antispam.xml) |

*Resources (DomainController.php)*

*資源（DomainController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `POST` | postfix | domain | add\_domain |  |
| `POST` | postfix | domain | del\_domain | $uuid |
| `GET` | postfix | domain | get |  |
| `GET` | postfix | domain | get\_domain | $uuid=null |
| `GET,POST` | postfix<br>後綴 | domain<br>網域 | search\_domain<br>搜尋_網域 |  |
| `POST` | postfix<br>字尾 | domain<br>網域 | set<br>集 |  |
| `POST` | postfix | domain | set\_domain | $uuid |
| `POST` | postfix | domain | toggle\_domain | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Domain.xml](https://github.com/opnsense/plugins/blob/master/mail/postfix/src/opnsense/mvc/app/models/OPNsense/Postfix/Domain.xml)<br>*模型* [Domain.xml](https://github.com/opnsense/plugins/blob/master/mail/postfix/src/opnsense/mvc/app/models/OPNsense/Postfix/Domain.xml) |

*Resources (GeneralController.php)*

*資源（GeneralController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `GET` | postfix<br>字尾 | general<br>通用 | get<br>取得 |  |
| `POST` | postfix<br>字尾 | general<br>通用 | set<br>集合 |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [General.xml](https://github.com/opnsense/plugins/blob/master/mail/postfix/src/opnsense/mvc/app/models/OPNsense/Postfix/General.xml)<br>*模型* [General.xml](https://github.com/opnsense/plugins/blob/master/mail/postfix/src/opnsense/mvc/app/models/OPNsense/Postfix/General.xml) |

*Resources (HeaderchecksController.php)*

*資源（HeaderchecksController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `POST` | postfix | headerchecks | add\_headercheck |  |
| `POST` | postfix | headerchecks | del\_headercheck | $uuid |
| `GET` | postfix | headerchecks | get |  |
| `GET` | postfix | headerchecks | get\_headercheck | $uuid=null |
| `GET,POST` | postfix | headerchecks | search\_headerchecks |  |
| `POST` | postfix | headerchecks | set |  |
| `POST` | postfix | headerchecks | set\_headercheck | $uuid |
| `POST` | postfix | headerchecks | toggle\_headercheck | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Headerchecks.xml](https://github.com/opnsense/plugins/blob/master/mail/postfix/src/opnsense/mvc/app/models/OPNsense/Postfix/Headerchecks.xml)<br>*模型* [Headerchecks.xml](https://github.com/opnsense/plugins/blob/master/mail/postfix/src/opnsense/mvc/app/models/OPNsense/Postfix/Headerchecks.xml) |

*Resources (RecipientController.php)*

*資源（RecipientController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `POST` | postfix<br>字尾 | recipient<br>收件人 | add\_recipient<br>新增收件人 |  |
| `POST` | postfix<br>字尾 | recipient<br>收件者 | del\_recipient<br>刪除收件者 | $uuid |
| `GET` | postfix<br>字尾 | recipient<br>收件人 | get<br>取得 |  |
| `GET` | postfix | recipient | get\_recipient | $uuid=null |
| `GET,POST` | postfix<br>字尾 | recipient<br>收件人 | search\_recipient<br>搜尋收件人 |  |
| `POST` | postfix<br>字尾 | recipient<br>收件人 | set<br>集 |  |
| `POST` | postfix | recipient | set\_recipient | $uuid |
| `POST` | postfix | recipient | toggle\_recipient | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Recipient.xml](https://github.com/opnsense/plugins/blob/master/mail/postfix/src/opnsense/mvc/app/models/OPNsense/Postfix/Recipient.xml)<br>*模型* [Recipient.xml](https://github.com/opnsense/plugins/blob/master/mail/postfix/src/opnsense/mvc/app/models/OPNsense/Postfix/Recipient.xml) |

*Resources (RecipientbccController.php)*

*資源（RecipientbccController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `POST` | postfix | recipientbcc | add\_recipientbcc |  |
| `POST` | postfix | recipientbcc | del\_recipientbcc | $uuid |
| `GET` | postfix | recipientbcc | get |  |
| `GET` | postfix | recipientbcc | get\_recipientbcc | $uuid=null |
| `GET,POST` | postfix | recipientbcc | search\_recipientbcc |  |
| `POST` | postfix<br>字尾 | recipientbcc<br>收件人密送 | set<br>設定 |  |
| `POST` | postfix | recipientbcc | set\_recipientbcc | $uuid |
| `POST` | postfix | recipientbcc | toggle\_recipientbcc | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Recipientbcc.xml](https://github.com/opnsense/plugins/blob/master/mail/postfix/src/opnsense/mvc/app/models/OPNsense/Postfix/Recipientbcc.xml)<br>*模型* [Recipientbcc.xml](https://github.com/opnsense/plugins/blob/master/mail/postfix/src/opnsense/mvc/app/models/OPNsense/Postfix/Recipientbcc.xml) |

*Resources (SenderController.php)*

*資源（SenderController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `POST` | postfix | sender | add\_sender |  |
| `POST` | postfix<br>後綴 | sender<br>寄件者 | del\_sender<br>刪除寄件者 | $uuid |
| `GET` | postfix | sender | get |  |
| `GET` | postfix | sender | get\_sender | $uuid=null |
| `GET,POST` | postfix | sender | search\_sender |  |
| `POST` | postfix<br>後綴 | sender<br>寄件者 | set<br>設定 |  |
| `POST` | postfix | sender | set\_sender | $uuid |
| `POST` | postfix | sender | toggle\_sender | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Sender.xml](https://github.com/opnsense/plugins/blob/master/mail/postfix/src/opnsense/mvc/app/models/OPNsense/Postfix/Sender.xml)<br>*模型* [Sender.xml](https://github.com/opnsense/plugins/blob/master/mail/postfix/src/opnsense/mvc/app/models/OPNsense/Postfix/Sender.xml) |

*Resources (SenderbccController.php)*

*資源（SenderbccController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `POST` | postfix | senderbcc | add\_senderbcc |  |
| `POST` | postfix<br>後綴 | senderbcc<br>寄件人密件抄送 | del\_senderbcc | $uuid |
| `GET` | postfix | senderbcc | get |  |
| `GET` | postfix | senderbcc | get\_senderbcc | $uuid=null |
| `GET,POST` | postfix | senderbcc | search\_senderbcc |  |
| `POST` | postfix | senderbcc | set |  |
| `POST` | postfix | senderbcc | set\_senderbcc | $uuid |
| `POST` | postfix | senderbcc | toggle\_senderbcc | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Senderbcc.xml](https://github.com/opnsense/plugins/blob/master/mail/postfix/src/opnsense/mvc/app/models/OPNsense/Postfix/Senderbcc.xml)<br>*模型* [Senderbcc.xml](https://github.com/opnsense/plugins/blob/master/mail/postfix/src/opnsense/mvc/app/models/OPNsense/Postfix/Senderbcc.xml) |

*Resources (SendercanonicalController.php)*

*資源（SendercanonicalController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `POST` | postfix | sendercanonical | add\_sendercanonical |  |
| `POST` | postfix | sendercanonical | del\_sendercanonical | $uuid |
| `GET` | postfix | sendercanonical | get |  |
| `GET` | postfix | sendercanonical | get\_sendercanonical | $uuid=null |
| `GET,POST` | postfix | sendercanonical | search\_sendercanonical |  |
| `POST` | postfix<br>後綴 | sendercanonical<br>規範發送者 | set<br>設定 |  |
| `POST` | postfix | sendercanonical | set\_sendercanonical | $uuid |
| `POST` | postfix | sendercanonical | toggle\_sendercanonical | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Sendercanonical.xml](https://github.com/opnsense/plugins/blob/master/mail/postfix/src/opnsense/mvc/app/models/OPNsense/Postfix/Sendercanonical.xml)<br>*模型* [Sendercanonical.xml](https://github.com/opnsense/plugins/blob/master/mail/postfix/src/opnsense/mvc/app/models/OPNsense/Postfix/Sendercanonical.xml) |

*Service (ServiceController.php)*

*服務（ServiceController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `GET` | postfix | service<br>服務 | checkrspamd |  |
| `POST` | postfix | service<br>服務 | reconfigure<br>重新配置 |  |
| `POST` | postfix | service<br>服務 | restart<br>重啟 |  |
| `POST` | postfix | service<br>服務 | start<br>開始 |  |
| `GET` | postfix | service<br>服務 | status<br>狀態 |  |
| `POST` | postfix<br>後綴 | service<br>服務 | stop<br>停止 |  |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Openconnect](<332 Openconnect.md>)　｜　[下一篇：Proxy｜代理人 ➡](<334 代理人.md>)
