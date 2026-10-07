---
title: "Acmeclient"
source: https://docs.opnsense.org/development/api/plugins/acmeclient.html
chapter: ["Development Manual","API Reference","Plugins API"]
order: 294
lang: "zh-TW"
translated_by: "google_v2"
captured: "2026-09-26T11:34:09.182Z"
---


# Acmeclient


*資源（AccountsController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `POST` | acmeclient | 帳號 | 新增 | |
| `POST` | acmeclient | accounts | del | $uuid |
| `GET` | acmeclient | accounts | get | $uuid=null |
| `POST` | acmeclient | 帳戶 | 註冊 | $uuid |
| `GET,POST` | acmeclient | 帳號 | 搜尋 | |
| `POST` | acmeclient | 帳號 | 設定 | |
| `POST` | acmeclient | accounts | toggle | $uuid,$enabled=null |
| `POST` | acmeclient | 帳號 | 更新 | $uuid |
|  |  |  |  |  |
| `<<uses>>` | | | | *模型* [AcmeClient.xml](https://github.com/opnsense/plugins/blob/master/security/acme-client/src/opnsense/mvc/app/models/OPNsense/AcmeClient/AcmeClient.xml) |

*資源（ActionsController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `POST` | acmeclient | 操作 | 新增 | |
| `POST` | acmeclient | actions | del | $uuid |
| `GET` | acmeclient | actions | get | $uuid=null |
| `GET,POST` | acmeclient | 操作 | 搜尋 | |
| `POST` | acmeclient | 操作 | 設定 | |
| `GET` | acmeclient | actions | sftp\_get\_identity | |
| `GET` | acmeclient | actions | sftp\_test\_connection | |
| `GET` | acmeclient | actions | ssh\_get\_identity | |
| `GET` | acmeclient | actions | ssh\_test\_connection | |
| `POST` | acmeclient | actions | toggle | $uuid,$enabled=null |
| `POST` | acmeclient | 操作 | 更新 | $uuid |
|  |  |  |  |  |
| `<<uses>>` | | | | *模型* [AcmeClient.xml](https://github.com/opnsense/plugins/blob/master/security/acme-client/src/opnsense/mvc/app/models/OPNsense/AcmeClient/AcmeClient.xml) |

*資源（CertificatesController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `POST` | acmeclient | 證書 | 新增 | |
| `GET` | acmeclient | 憑證 | 自動化 | $uuid |
| `POST` | acmeclient | 憑證 | 刪除 | $uuid |
| `GET` | acmeclient | 證書 | 取得 | $uuid=null |
| `GET` | acmeclient | 憑證 | 匯入 | $uuid |
| `GET` | acmeclient | 憑證 | 刪除金鑰 | $uuid |
| `POST` | acmeclient | 憑證 | 撤銷 | $uuid |
| `GET,POST` | acmeclient | 證書 | 搜尋 | |
| `POST` | acmeclient | 證書 | 設定 | |
| `POST` | acmeclient | 證書 | 簽名 | $uuid |
| `POST` | acmeclient | 證書 | 切換 | $uuid,$enabled=null |
| `POST` | acmeclient | 憑證 | 更新 | $uuid |
|  |  |  |  |  |
| `<<uses>>` | | | | *模型* [AcmeClient.xml](https://github.com/opnsense/plugins/blob/master/security/acme-client/src/opnsense/mvc/app/models/OPNsense/AcmeClient/AcmeClient.xml) |

*服務（ServiceController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `GET` | acmeclient | 服務 | 設定測試 | |
| `POST` | acmeclient | 服務 | 重新設定 | |
| `GET` | acmeclient | 服務 | 重設 | |
| `POST` | acmeclient | 服務 | 重啟 | |
| `GET` | acmeclient | 服務 | signallcerts | |
| `POST` | acmeclient | 禮拜 | 開始 | |
| `GET` | acmeclient | 服 | 狀態 | |
| `POST` | acmeclient | 服 | 停止 | |

*資源（SettingsController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `POST` | acmeclient | 設定 | fetch\_cron\_integration | |
| `POST` | acmeclient | 設定 | fetch\_h\_a\_proxy\_integration | |
| `GET` | acmeclient | 設定 | 取得 | |
| `GET` | acmeclient | 設定 | 取得綁定插件狀態 | |
| `GET` | acmeclient | 設定 | 取得 gcloud 外掛程式狀態 | |
| `POST` | acmeclient | 設定 | 設定 | |
|  |  |  |  |  |
| `<<uses>>` | | | | *模型* [AcmeClient.xml](https://github.com/opnsense/plugins/blob/master/security/acme-client/src/opnsense/mvc/app/models/OPNsense/AcmeClient/AcmeClient.xml) |

*資源（ValidationsController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `POST` | acmeclient | 驗證 | 新增 | |
| `POST` | acmeclient | validations | del | $uuid |
| `GET` | acmeclient | validations | get | $uuid=null |
| `GET,POST` | acmeclient | 驗證 | 搜尋 | |
| `POST` | acmeclient | 驗證 | 設定 | |
| `POST` | acmeclient | 驗證 | 切換 | $uuid,$enabled=null |
| `POST` | acmeclient | 驗證 | 更新 | $uuid |
|  |  |  |  |  |
| `<<uses>>` | | | | *模型* [AcmeClient.xml](https://github.com/opnsense/plugins/blob/master/security/acme-client/src/opnsense/mvc/app/models/OPNsense/AcmeClient/AcmeClient.xml) |

---

