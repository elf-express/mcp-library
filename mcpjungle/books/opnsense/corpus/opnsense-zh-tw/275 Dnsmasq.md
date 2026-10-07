---
title: "Dnsmasq"
source: https://docs.opnsense.org/development/api/core/dnsmasq.html
chapter: ["Development Manual","API Reference","Core API"]
order: 275
lang: "zh-TW"
translated_by: "google_v2"
captured: "2026-09-26T11:33:59.587Z"
---


# Dnsmasq


*資源（LeasesController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `GET` | dnsmasq | 租約 | 搜尋 | |

*服務（ServiceController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `POST` | dnsmasq | 服務 | 重新配置 | |
| `POST` | dnsmasq | 服務 | 重啟 | |
| `POST` | dnsmasq | 服務 | 啟動 | |
| `GET` | dnsmasq | 服務 | 狀態 | |
| `POST` | dnsmasq | 服務 | 停止 | |

*資源（SettingsController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `POST` | dnsmasq | 設定 | 新增_啟動 | |
| `POST` | dnsmasq | 設定 | 新增網域 | |
| `POST` | dnsmasq | 設定 | 新增主機 | |
| `POST` | dnsmasq | 設定 | 新增選項 | |
| `POST` | dnsmasq | 設定 | 新增範圍 | |
| `POST` | dnsmasq | 設定 | 新增標籤 | |
| `POST` | dnsmasq | 設定 | 刪除_boot | $uuid |
| `POST` | dnsmasq | 設定 | 刪除_網域 | $uuid |
| `POST` | dnsmasq | 設定 | 刪除主機 | $uuid |
| `POST` | dnsmasq | 設定 | 刪除選項 | $uuid |
| `POST` | dnsmasq | 設定 | del\_range | $uuid |
| `POST` | dnsmasq | 設定 | 刪除_標籤 | $uuid |
| `GET` | dnsmasq | 設定 | 下載主機 | |
| `GET` | dnsmasq | 設定 | 取得 | |
| `GET` | dnsmasq | 設定 | 取得_boot | $uuid=null |
| `GET` | dnsmasq | 設定 | 取得網域 | $uuid=null |
| `GET` | dnsmasq | 設定 | 取得主機 | $uuid=null |
| `GET` | dnsmasq | 設定 | 取得選項 | $uuid=null |
| `GET` | dnsmasq | 設定 | 取得範圍 | $uuid=null |
| `GET` | dnsmasq | 設定 | 取得標籤 | $uuid=null |
| `GET` | dnsmasq | 設定 | 取得標籤清單 | |
| `GET,POST` | dnsmasq | 設定 | 搜尋_boot | |
| `GET,POST` | dnsmasq | 設定 | 搜尋域 | |
| `GET,POST` | dnsmasq | 設定 | 搜尋主機 | |
| `GET,POST` | dnsmasq | 設定 | 搜尋選項 | |
| `GET,POST` | dnsmasq | 設定 | 搜尋範圍 | |
| `GET,POST` | dnsmasq | 設定 | 搜尋標籤 | |
| `POST` | dnsmasq | 設定 | 設定 | |
| `POST` | dnsmasq | 設定 | 設定_啟動 | $uuid |
| `POST` | dnsmasq | 設定 | 設定網域 | $uuid |
| `POST` | dnsmasq | 設定 | 設定主機 | $uuid |
| `POST` | dnsmasq | 設定 | 設定選項 | $uuid |
| `POST` | dnsmasq | 設定 | 設定範圍 | $uuid |
| `POST` | dnsmasq | 設定 | 設定標籤 | $uuid |
| `POST` | dnsmasq | 設定 | upload\_hosts | |
|  |  |  |  |  |
| `<<uses>>` | | | | *模型* [Dnsmasq.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/Dnsmasq/Dnsmasq.xml) |

---

