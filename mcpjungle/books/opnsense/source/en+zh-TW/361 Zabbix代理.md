---
title: "Zabbixagent｜Zabbix代理"
title_original: "Zabbixagent"
source: "https://docs.opnsense.org/development/api/plugins/zabbixagent.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 361
lang: "bilingual"
translated_by: "gtx"
captured: "2026-09-26T11:34:43.636Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Wol｜羊毛](<360 羊毛.md>)　｜　[下一篇：Zabbixproxy｜Zabbix代理 ➡](<362 Zabbix代理.md>)

# Zabbixagent｜Zabbix代理

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*Service (ServiceController.php)*

*服務（ServiceController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `POST` | zabbixagent<br>zabbix代理 | service<br>服務 | reconfigure<br>重新配置 |  |
| `POST` | zabbixagent<br>zabbix代理 | service<br>服務 | restart<br>重啟 |  |
| `POST` | zabbixagent<br>zabbix代理 | service<br>服務 | start<br>開始 |  |
| `GET` | zabbixagent<br>zabbix代理 | service<br>服務 | status<br>狀態 |  |
| `POST` | zabbixagent<br>zabbix代理 | service<br>服務 | stop<br>停止 |  |

*Resources (SettingsController.php)*

*資源（SettingsController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `POST` | zabbixagent<br>zabbix代理 | settings<br>設定 | add\_alias<br>新增\_別名 |  |
| `POST` | zabbixagent<br>zabbix代理 | settings<br>設定 | add\_userparameter<br>新增\_使用者參數 |  |
| `POST` | zabbixagent<br>zabbix代理 | settings<br>設定 | del\_alias<br>刪除\_別名 | $uuid |
| `POST` | zabbixagent<br>zabbix代理 | settings<br>設定 | del\_userparameter<br>del\_用戶參數 | $uuid |
| `GET` | zabbixagent<br>zabbix代理 | settings<br>設定 | get<br>得到 |  |
| `GET` | zabbixagent<br>zabbix代理 | settings<br>設定 | get\_alias<br>取得\_別名 | $uuid=null<br>$uuid=空 |
| `GET` | zabbixagent<br>zabbix代理 | settings<br>設定 | get\_userparameter<br>取得\_用戶參數 | $uuid=null<br>$uuid=空 |
| `GET,POST` | zabbixagent<br>zabbix代理 | settings<br>設定 | search\_aliases<br>搜尋\_別名 |  |
| `GET,POST` | zabbixagent<br>zabbix代理 | settings<br>設定 | search\_userparameters<br>搜尋\_用戶參數 |  |
| `POST` | zabbixagent<br>zabbix代理 | settings<br>設定 | set<br>集 |  |
| `POST` | zabbixagent<br>zabbix代理 | settings<br>設定 | set\_alias<br>設定\_別名 | $uuid |
| `POST` | zabbixagent<br>zabbix代理 | settings<br>設定 | set\_userparameter<br>設定\_使用者參數 | $uuid |
| `POST` | zabbixagent<br>zabbix代理 | settings<br>設定 | toggle\_alias<br>切換\_別名 | $uuid |
| `POST` | zabbixagent<br>zabbix代理 | settings<br>設定 | toggle\_userparameter<br>切換\_userparameter | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [ZabbixAgent.xml](https://github.com/opnsense/plugins/blob/master/net-mgmt/zabbix-agent/src/opnsense/mvc/app/models/OPNsense/ZabbixAgent/ZabbixAgent.xml)<br>*型號* [ZabbixAgent.xml](https://github.com/opnsense/plugins/blob/master/net-mgmt/zabbix-agent/src/opnsense/mvc/app/models/OPNsense/ZabbixAgent/ZabbixAgent.xml) |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Wol｜羊毛](<360 羊毛.md>)　｜　[下一篇：Zabbixproxy｜Zabbix代理 ➡](<362 Zabbix代理.md>)
