---
title: "Dnsmasq"
source: "https://docs.opnsense.org/development/api/core/dnsmasq.html"
chapter: ["Development Manual","API Reference","Core API"]
order: 275
lang: "bilingual"
translated_by: "google_v2"
captured: "2026-09-26T11:33:59.587Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Diagnostics｜診斷](<274 診斷.md>)　｜　[下一篇：Firewall｜防火牆 ➡](<276 防火牆.md>)

# Dnsmasq

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Core API](<000 目錄.md#c-59>)

*Resources (LeasesController.php)*

*資源（LeasesController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `GET` | dnsmasq | leases<br>租約 | search<br>搜尋 |  |

*Service (ServiceController.php)*

*服務（ServiceController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `POST` | dnsmasq | service<br>服務 | reconfigure<br>重新配置 |  |
| `POST` | dnsmasq | service<br>服務 | restart<br>重啟 |  |
| `POST` | dnsmasq | service<br>服務 | start<br>啟動 |  |
| `GET` | dnsmasq | service<br>服務 | status<br>狀態 |  |
| `POST` | dnsmasq | service<br>服務 | stop<br>停止 |  |

*Resources (SettingsController.php)*

*資源（SettingsController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `POST` | dnsmasq | settings<br>設定 | add\_boot<br>新增_啟動 |  |
| `POST` | dnsmasq | settings<br>設定 | add\_domain<br>新增網域 |  |
| `POST` | dnsmasq | settings<br>設定 | add\_host<br>新增主機 |  |
| `POST` | dnsmasq | settings<br>設定 | add\_option<br>新增選項 |  |
| `POST` | dnsmasq | settings<br>設定 | add\_range<br>新增範圍 |  |
| `POST` | dnsmasq | settings<br>設定 | add\_tag<br>新增標籤 |  |
| `POST` | dnsmasq | settings<br>設定 | del\_boot<br>刪除_boot | $uuid |
| `POST` | dnsmasq | settings<br>設定 | del\_domain<br>刪除_網域 | $uuid |
| `POST` | dnsmasq | settings<br>設定 | del\_host<br>刪除主機 | $uuid |
| `POST` | dnsmasq | settings<br>設定 | del\_option<br>刪除選項 | $uuid |
| `POST` | dnsmasq | settings<br>設定 | del\_range | $uuid |
| `POST` | dnsmasq | settings<br>設定 | del\_tag<br>刪除_標籤 | $uuid |
| `GET` | dnsmasq | settings<br>設定 | download\_hosts<br>下載主機 |  |
| `GET` | dnsmasq | settings<br>設定 | get<br>取得 |  |
| `GET` | dnsmasq | settings<br>設定 | get\_boot<br>取得_boot | $uuid=null |
| `GET` | dnsmasq | settings<br>設定 | get\_domain<br>取得網域 | $uuid=null |
| `GET` | dnsmasq | settings<br>設定 | get\_host<br>取得主機 | $uuid=null |
| `GET` | dnsmasq | settings<br>設定 | get\_option<br>取得選項 | $uuid=null |
| `GET` | dnsmasq | settings<br>設定 | get\_range<br>取得範圍 | $uuid=null |
| `GET` | dnsmasq | settings<br>設定 | get\_tag<br>取得標籤 | $uuid=null |
| `GET` | dnsmasq | settings<br>設定 | get\_tag\_list<br>取得標籤清單 |  |
| `GET,POST` | dnsmasq | settings<br>設定 | search\_boot<br>搜尋_boot |  |
| `GET,POST` | dnsmasq | settings<br>設定 | search\_domain<br>搜尋域 |  |
| `GET,POST` | dnsmasq | settings<br>設定 | search\_host<br>搜尋主機 |  |
| `GET,POST` | dnsmasq | settings<br>設定 | search\_option<br>搜尋選項 |  |
| `GET,POST` | dnsmasq | settings<br>設定 | search\_range<br>搜尋範圍 |  |
| `GET,POST` | dnsmasq | settings<br>設定 | search\_tag<br>搜尋標籤 |  |
| `POST` | dnsmasq | settings<br>設定 | set<br>設定 |  |
| `POST` | dnsmasq | settings<br>設定 | set\_boot<br>設定_啟動 | $uuid |
| `POST` | dnsmasq | settings<br>設定 | set\_domain<br>設定網域 | $uuid |
| `POST` | dnsmasq | settings<br>設定 | set\_host<br>設定主機 | $uuid |
| `POST` | dnsmasq | settings<br>設定 | set\_option<br>設定選項 | $uuid |
| `POST` | dnsmasq | settings<br>設定 | set\_range<br>設定範圍 | $uuid |
| `POST` | dnsmasq | settings<br>設定 | set\_tag<br>設定標籤 | $uuid |
| `POST` | dnsmasq | settings<br>設定 | upload\_hosts |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Dnsmasq.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/Dnsmasq/Dnsmasq.xml)<br>*模型* [Dnsmasq.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/Dnsmasq/Dnsmasq.xml) |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Diagnostics｜診斷](<274 診斷.md>)　｜　[下一篇：Firewall｜防火牆 ➡](<276 防火牆.md>)
