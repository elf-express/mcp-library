---
title: "雲端備份 Nextcloud"
title_original: "Cloud Backup Nextcloud"
source: "https://docs.opnsense.org/manual/how-tos/cloud_backup.html"
chapter: ["System","Configuration","Backup"]
order: 185
lang: "zh-TW"
translated_by: "gtx"
captured: "2026-09-26T11:33:14.049Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：使用 Git 追蹤配置更改](<184 使用 Git 追蹤配置更改.md>)　｜　[下一篇：中繼器 ➡](<186 中繼器.md>)

# 雲端備份 Nextcloud

> 章節：[System](<000 目錄.md#c-11>) › [Configuration](<000 目錄.md#c-14>) › [Backup](<000 目錄.md#c-15>)

## 雲端備份 / Nextcloud

**Nextcloud** 是一種線上存儲，但與 Google Drive 等服務相比，它旨在自架。您可以從他們的[網站](https://nextcloud.com/)免費下載它並將其安裝在您的網站伺服器上。

## 遠端備份

在 OPNsense1 中，您可以使用備份功能將您的設定直接自動備份到 **sftp**和**Nextcloud** 等服務。

設定後，備份功能將執行 OPNsense 設定檔的首次備份。然後，如果配置隨後發生更改，則每天清晨將運行一次新的備份。

當需要更頻繁的遠端備份或需要在一天中的不同時間進行遠端備份時，您可以考慮指定額外的 Cronjobs。

## 設定 Nextcloud API 使用

### 1\.步驟建立新用戶

點擊右上角的使用者圖標，然後點擊“使用者”。在新頁面中，在方塊中輸入使用者名稱和密碼，然後按一下「建立」以建立新使用者。

### 2\.步驟建立存取令牌

關閉模式對話框並刪除預設檔。然後打開“設定”選單（也在右上角的選單中）。切換到安全性並產生應用程式密碼。

![../../_images/nextcloud_create_token.png](<../images/4c29dd23-nextcloud_create_token.png>)

複製並儲存產生的密碼。

### 3\.步驟 將 OPNsense 與 Nextcloud 連接

![../../_images/nextcloud_config.png](<../images/6f23712b-nextcloud_config.png>)

捲動至 System ‣ Config ‣ Backup 中的 Nextcloud 部分並輸入以下值：

|   |   |
| --- | --- |
|啟用 |已檢查 |
| URL | Nextcloud 安裝的基礎URL，如 [https://cloud.example.com](https://cloud.example.com/) |
|用戶 |您選擇的用戶名 |
|密碼 |貼上步驟 2 中的應用程式密碼 |
|備份目錄|由字母數字字元組成的名稱（保持預設）|

### 4\.步驟驗證配置上傳

當一切正常後，儲存設定後您將看到新建立的目錄：

![../../_images/nextcloud_directory.png](<../images/8a12a3ee-nextcloud_directory.png>)

如果打開它，您將至少看到一個備份的設定檔：

![../../_images/nextcloud_backups.png](<../images/8f31ab02-nextcloud_backups.png>)

參考文獻

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：使用 Git 追蹤配置更改](<184 使用 Git 追蹤配置更改.md>)　｜　[下一篇：中繼器 ➡](<186 中繼器.md>)
