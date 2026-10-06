---
title: "Cloud Backup Nextcloud｜Nextcloud 雲端備份"
title_original: "Cloud Backup Nextcloud"
source: "https://docs.opnsense.org/manual/how-tos/cloud_backup.html"
chapter: ["System","Configuration","Backup"]
order: 185
lang: "bilingual"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:33:14.049Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Traceability of configuration changes using Git｜使用 Git 實現配置變更的可追溯性](<184 使用 Git 實現配置變更的可追溯性.md>)　｜　[下一篇：Relayd｜中繼 ➡](<186 中繼.md>)

# Cloud Backup Nextcloud｜Nextcloud 雲端備份

> 章節：[System](<000 目錄.md#c-11>) › [Configuration](<000 目錄.md#c-14>) › [Backup](<000 目錄.md#c-15>)

## Cloud Backup / Nextcloud｜雲端備份/Nextcloud

**Nextcloud** is an online storage but in contrast to services like Google Drive it is intended for self hosting. You can download it freely from their [website](https://nextcloud.com/) and install it on your webserver.

**Nextcloud** 是一種線上存儲，但與 Google Drive 等服務相比，它旨在自架。您可以從他們的[網站](https://nextcloud.com/)免費下載它並將其安裝在您的網站伺服器上。

## Remote backup｜遠端備份

In OPNsense1 you can **backup** your configuration directly and automatically to services like **sftp** and **Nextcloud**, using the backup feature.

在 OPNsense1 中，您可以使用備份功能，直接自動地將您的設定**備份**到**sftp**和**Nextcloud** 等服務。

After set-up, the backup feature will run a first backup of the OPNsense configuration file. Then, if the configuration is subsequently changed, a new backup will be run once per day early in the morning.

設定完成後，備份功能將首先備份 OPNsense 設定檔。之後，如果配置發生更改，系統將每天清晨運行一次新的備份。

You may consider specifying additional Cronjobs when more frequent remote backups or remote backups at different times of the day would be required.

如果需要更頻繁的遠端備份或在一天中的不同時間進行遠端備份，您可以考慮指定額外的 Cronjob。

## Setup Nextcloud API usage｜設定 Nextcloud API使用

### 1\. Step Create a new user｜1. 建立新用戶

Click on the user icon top right and click “Users”（使用者）. In the new page, enter an username and a password into the boxes and click create to create a new user.

點擊右上角的使用者圖標，然後點擊“Users”（使用者） 。在新頁面中，在方塊中輸入使用者名稱和密碼，然後點擊建立以建立新使用者。

### 2\. Step Create an Access Token｜第二步：建立訪問令牌

Close the modal dialog and remove the default files. Then open the Settings menu (also in the menu top right). Switch to security and generate a App password.

關閉模態對話框並刪除預設檔。然後打開“設定”選單（也在右上角的選單中）。切換到“安全性”選項並產生應用程式密碼。

![../../_images/nextcloud_create_token.png](<../images/4c29dd23-nextcloud_create_token.png>)

Copy and store the generated password.

複製並保存產生的密碼。

### 3\. Step Connect OPNsense with Nextcloud｜3. 將 OPNsense 與 Nextcloud 連接

![../../_images/nextcloud_config.png](<../images/6f23712b-nextcloud_config.png>)

Scroll to the Nextcloud Section in System ‣ Config ‣ Backup and enter the following values:

捲動至「系統」‣「設定」‣「備份」中的「Nextcloud」部分，然後輸入以下值：

|   |   |
| --- | --- |
| Enable<br>啟用 | checked<br>已選取 |
| URL | Base URL of your Nextcloud installation like [https://cloud.example.com](https://cloud.example.com/)<br>Nextcloud 安裝的基礎URL ，例如 [https://cloud.example.com](https://cloud.example.com/) |
| User<br>使用者 | your chosen username<br>您選擇的使用者名稱 |
| Password<br>密碼 | paste your app password from step 2<br>貼上您在步驟 2 中取得的應用程式密碼 |
| Backup Directory<br>備份目錄 | a name consisting of alphanumeric characters (keep default)<br>由字母數字字元組成的名稱（保留預設值） |

### 4\. Step Verify the Configuration Upload｜4. 步驟驗證設定上傳

When everything worked, you will see the newly created directory after saving the settings:

一切正常後，儲存設定後您將看到新建立的目錄：

![../../_images/nextcloud_directory.png](<../images/8a12a3ee-nextcloud_directory.png>)

If you open it, you will see at lease a single backed up configuration file:

打開後，您至少會看到一個備份的設定檔：

![../../_images/nextcloud_backups.png](<../images/8f31ab02-nextcloud_backups.png>)

References

參考

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Traceability of configuration changes using Git｜使用 Git 實現配置變更的可追溯性](<184 使用 Git 實現配置變更的可追溯性.md>)　｜　[下一篇：Relayd｜中繼 ➡](<186 中繼.md>)
