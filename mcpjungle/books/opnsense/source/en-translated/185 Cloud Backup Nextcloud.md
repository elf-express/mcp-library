---
title: "Cloud Backup Nextcloud"
source: "https://docs.opnsense.org/manual/how-tos/cloud_backup.html"
chapter: ["System","Configuration","Backup"]
order: 185
lang: "en"
translated_by: "native"
captured: "2026-09-26T11:33:14.049Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Traceability of configuration changes using Git](<184 Traceability of configuration changes using Git.md>)　｜　[下一篇：Relayd ➡](<186 Relayd.md>)

# Cloud Backup Nextcloud

> 章節：[System](<000 目錄.md#c-11>) › [Configuration](<000 目錄.md#c-14>) › [Backup](<000 目錄.md#c-15>)

## Cloud Backup / Nextcloud

**Nextcloud** is an online storage but in contrast to services like Google Drive it is intended for self hosting. You can download it freely from their [website](https://nextcloud.com/) and install it on your webserver.

## Remote backup

In OPNsense1 you can **backup** your configuration directly and automatically to services like **sftp** and **Nextcloud**, using the backup feature.

After set-up, the backup feature will run a first backup of the OPNsense configuration file. Then, if the configuration is subsequently changed, a new backup will be run once per day early in the morning.

You may consider specifying additional Cronjobs when more frequent remote backups or remote backups at different times of the day would be required.

## Setup Nextcloud API usage

### 1\. Step Create a new user

Click on the user icon top right and click “Users”. In the new page, enter an username and a password into the boxes and click create to create a new user.

### 2\. Step Create an Access Token

Close the modal dialog and remove the default files. Then open the Settings menu (also in the menu top right). Switch to security and generate a App password.

![../../_images/nextcloud_create_token.png](<../images/4c29dd23-nextcloud_create_token.png>)

Copy and store the generated password.

### 3\. Step Connect OPNsense with Nextcloud

![../../_images/nextcloud_config.png](<../images/6f23712b-nextcloud_config.png>)

Scroll to the Nextcloud Section in System ‣ Config ‣ Backup and enter the following values:

|   |   |
| --- | --- |
| Enable | checked |
| URL | Base URL of your Nextcloud installation like [https://cloud.example.com](https://cloud.example.com/) |
| User | your chosen username |
| Password | paste your app password from step 2 |
| Backup Directory | a name consisting of alphanumeric characters (keep default) |

### 4\. Step Verify the Configuration Upload

When everything worked, you will see the newly created directory after saving the settings:

![../../_images/nextcloud_directory.png](<../images/8a12a3ee-nextcloud_directory.png>)

If you open it, you will see at lease a single backed up configuration file:

![../../_images/nextcloud_backups.png](<../images/8f31ab02-nextcloud_backups.png>)

References

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Traceability of configuration changes using Git](<184 Traceability of configuration changes using Git.md>)　｜　[下一篇：Relayd ➡](<186 Relayd.md>)
