---
title: "Acmeclient"
source: "https://docs.opnsense.org/development/api/plugins/acmeclient.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 294
lang: "bilingual"
translated_by: "google_v2"
captured: "2026-09-26T11:34:09.182Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Wireguard](<293 Wireguard.md>)　｜　[下一篇：Apcupsd ➡](<295 Apcupsd.md>)

# Acmeclient

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*Resources (AccountsController.php)*

*資源（AccountsController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `POST` | acmeclient | accounts<br>帳號 | add<br>新增 |  |
| `POST` | acmeclient | accounts | del | $uuid |
| `GET` | acmeclient | accounts | get | $uuid=null |
| `POST` | acmeclient | accounts<br>帳戶 | register<br>註冊 | $uuid |
| `GET,POST` | acmeclient | accounts<br>帳號 | search<br>搜尋 |  |
| `POST` | acmeclient | accounts<br>帳號 | set<br>設定 |  |
| `POST` | acmeclient | accounts | toggle | $uuid,$enabled=null |
| `POST` | acmeclient | accounts<br>帳號 | update<br>更新 | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [AcmeClient.xml](https://github.com/opnsense/plugins/blob/master/security/acme-client/src/opnsense/mvc/app/models/OPNsense/AcmeClient/AcmeClient.xml)<br>*模型* [AcmeClient.xml](https://github.com/opnsense/plugins/blob/master/security/acme-client/src/opnsense/mvc/app/models/OPNsense/AcmeClient/AcmeClient.xml) |

*Resources (ActionsController.php)*

*資源（ActionsController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `POST` | acmeclient | actions<br>操作 | add<br>新增 |  |
| `POST` | acmeclient | actions | del | $uuid |
| `GET` | acmeclient | actions | get | $uuid=null |
| `GET,POST` | acmeclient | actions<br>操作 | search<br>搜尋 |  |
| `POST` | acmeclient | actions<br>操作 | set<br>設定 |  |
| `GET` | acmeclient | actions | sftp\_get\_identity |  |
| `GET` | acmeclient | actions | sftp\_test\_connection |  |
| `GET` | acmeclient | actions | ssh\_get\_identity |  |
| `GET` | acmeclient | actions | ssh\_test\_connection |  |
| `POST` | acmeclient | actions | toggle | $uuid,$enabled=null |
| `POST` | acmeclient | actions<br>操作 | update<br>更新 | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [AcmeClient.xml](https://github.com/opnsense/plugins/blob/master/security/acme-client/src/opnsense/mvc/app/models/OPNsense/AcmeClient/AcmeClient.xml)<br>*模型* [AcmeClient.xml](https://github.com/opnsense/plugins/blob/master/security/acme-client/src/opnsense/mvc/app/models/OPNsense/AcmeClient/AcmeClient.xml) |

*Resources (CertificatesController.php)*

*資源（CertificatesController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `POST` | acmeclient | certificates<br>證書 | add<br>新增 |  |
| `GET` | acmeclient | certificates<br>憑證 | automation<br>自動化 | $uuid |
| `POST` | acmeclient | certificates<br>憑證 | del<br>刪除 | $uuid |
| `GET` | acmeclient | certificates<br>證書 | get<br>取得 | $uuid=null |
| `GET` | acmeclient | certificates<br>憑證 | import<br>匯入 | $uuid |
| `GET` | acmeclient | certificates<br>憑證 | removekey<br>刪除金鑰 | $uuid |
| `POST` | acmeclient | certificates<br>憑證 | revoke<br>撤銷 | $uuid |
| `GET,POST` | acmeclient | certificates<br>證書 | search<br>搜尋 |  |
| `POST` | acmeclient | certificates<br>證書 | set<br>設定 |  |
| `POST` | acmeclient | certificates<br>證書 | sign<br>簽名 | $uuid |
| `POST` | acmeclient | certificates<br>證書 | toggle<br>切換 | $uuid,$enabled=null |
| `POST` | acmeclient | certificates<br>憑證 | update<br>更新 | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [AcmeClient.xml](https://github.com/opnsense/plugins/blob/master/security/acme-client/src/opnsense/mvc/app/models/OPNsense/AcmeClient/AcmeClient.xml)<br>*模型* [AcmeClient.xml](https://github.com/opnsense/plugins/blob/master/security/acme-client/src/opnsense/mvc/app/models/OPNsense/AcmeClient/AcmeClient.xml) |

*Service (ServiceController.php)*

*服務（ServiceController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `GET` | acmeclient | service<br>服務 | configtest<br>設定測試 |  |
| `POST` | acmeclient | service<br>服務 | reconfigure<br>重新設定 |  |
| `GET` | acmeclient | service<br>服務 | reset<br>重設 |  |
| `POST` | acmeclient | service<br>服務 | restart<br>重啟 |  |
| `GET` | acmeclient | service<br>服務 | signallcerts |  |
| `POST` | acmeclient | service<br>禮拜 | start<br>開始 |  |
| `GET` | acmeclient | service<br>服 | status<br>狀態 |  |
| `POST` | acmeclient | service<br>服 | stop<br>停止 |  |

*Resources (SettingsController.php)*

*資源（SettingsController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `POST` | acmeclient | settings<br>設定 | fetch\_cron\_integration |  |
| `POST` | acmeclient | settings<br>設定 | fetch\_h\_a\_proxy\_integration |  |
| `GET` | acmeclient | settings<br>設定 | get<br>取得 |  |
| `GET` | acmeclient | settings<br>設定 | get\_bind\_plugin\_status<br>取得綁定插件狀態 |  |
| `GET` | acmeclient | settings<br>設定 | get\_gcloud\_plugin\_status<br>取得 gcloud 外掛程式狀態 |  |
| `POST` | acmeclient | settings<br>設定 | set<br>設定 |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [AcmeClient.xml](https://github.com/opnsense/plugins/blob/master/security/acme-client/src/opnsense/mvc/app/models/OPNsense/AcmeClient/AcmeClient.xml)<br>*模型* [AcmeClient.xml](https://github.com/opnsense/plugins/blob/master/security/acme-client/src/opnsense/mvc/app/models/OPNsense/AcmeClient/AcmeClient.xml) |

*Resources (ValidationsController.php)*

*資源（ValidationsController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `POST` | acmeclient | validations<br>驗證 | add<br>新增 |  |
| `POST` | acmeclient | validations | del | $uuid |
| `GET` | acmeclient | validations | get | $uuid=null |
| `GET,POST` | acmeclient | validations<br>驗證 | search<br>搜尋 |  |
| `POST` | acmeclient | validations<br>驗證 | set<br>設定 |  |
| `POST` | acmeclient | validations<br>驗證 | toggle<br>切換 | $uuid,$enabled=null |
| `POST` | acmeclient | validations<br>驗證 | update<br>更新 | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [AcmeClient.xml](https://github.com/opnsense/plugins/blob/master/security/acme-client/src/opnsense/mvc/app/models/OPNsense/AcmeClient/AcmeClient.xml)<br>*模型* [AcmeClient.xml](https://github.com/opnsense/plugins/blob/master/security/acme-client/src/opnsense/mvc/app/models/OPNsense/AcmeClient/AcmeClient.xml) |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Wireguard](<293 Wireguard.md>)　｜　[下一篇：Apcupsd ➡](<295 Apcupsd.md>)
