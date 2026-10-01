---
title: "Backups via secure copy (sftp)｜透過安全副本（sftp）進行備份"
title_original: "Backups via secure copy (sftp)"
source: "https://docs.opnsense.org/manual/sftp-backup.html"
chapter: ["System","Configuration","Backup"]
order: 91
lang: "bilingual"
translated_by: "google_v2"
captured: "2026-09-26T11:32:25.909Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Configuration｜配置](<90 配置.md>)　｜　[下一篇：Firmware｜韌體 ➡](<92 韌體.md>)

# Backups via secure copy (sftp)｜透過安全副本（sftp）進行備份

> 章節：[System](<000 目錄.md#c-11>) › [Configuration](<000 目錄.md#c-14>) › [Backup](<000 目錄.md#c-15>)

When your remote host supports SSH, it’s often possible to use sftp as well, which can be used for file transfers in a secure manner between machines (in this case your firewall and the backup target).

當您的遠端主機支援SSH時，通常也可以使用sftp，sftp可用於在機器之間（在本例中是您的防火牆和備份目標）以安全的方式進行檔案傳輸。

In order to use this feature, one has to install the sftp-backup plugin first (in System->Firmware->Plugins search for os-sftp-backup).

要使用此功能，必須先安裝 sftp-backup 插件（在系統->韌體->插件中搜尋 os-sftp-backup）。

## Preparation｜準備

Before configuring the plugin, make sure your target machine has ssh enabled and is reachable. You also need a private/public key combination which the backup machine will trust.

在配置插件前，請確保目標機器已啟用 SSH 且可存取。您還需要備份機器信任的私鑰/公鑰組合。

Generate a key with the command below (\-f specifies the filename) and omit a password in the process:

使用以下命令產生金鑰（-f 指定檔案名稱），過程中無需輸入密碼：

ssh-keygen

```
ssh-keygen -t ed25519 -C "your_email@example.com" -f my_new_key
```

The output will look like this:

輸出結果如下所示：

ssh-keygen (sample output)

ssh-keygen（範例輸出）

```
Generating public/private ed25519 key pair.
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in my_new_key
Your public key has been saved in my_new_key.pub
The key fingerprint is:
SHA256:DJ+Jj1xeuezYLYaqOQg9DBa8ETmOuausIf1rNKeuMQs your_email@example.com
The key's randomart image is:
+--[ED25519 256]--+
|..o              |
| *               |
|o.=   .          |
|++     = o .     |
|.=    . S o      |
|o.+ o..= o .     |
|Eo++ +o o.o      |
|+o.=+.  .+o.     |
|=.o+*+....o..    |
+----[SHA256]-----+
```

This creates two files, my\_new\_key and my\_new\_key.pub, the first one is private and should not be shared, the other is public and offered to the backup machine.

這將創建兩個文件，my\_new\_key 和 my\_new\_key.pub，第一個文件是私有的，不應該共享，另一個文件是公開的，並提供給備份機器。

Next we will add the my\_new\_key.pub file to the authorized\_keys file in the users .ssh directory (e.g. /home/opnsense/.ssh/authorized\_keys).

接下來，我們將 my\_new\_key.pub 檔案加入到使用者 .ssh 目錄下的 authorized\_keys 檔案中（例如 /home/opnsense/.ssh/authorized\_keys）。

Note

注意事項

Make sure the .ssh directory is only readable and writebable by the owner and authorized\_keys has the same rights. (chmod 600 for the file chmod 700 for the directory)

確保 .ssh 目錄只有擁有者可讀寫，且 authorized_keys 也具有相同的權限。 （檔案權限設定為 600，目錄權限設定為 700）

Tip

提示

Create a separate key for the backup (don’t use the same one elsewhere), so you can easily drop access later.

為備份建立一個單獨的金鑰（不要在其他地方使用同一個金鑰），以便以後可以輕鬆取消存取權限。

## Initial setup｜初始設定

The configuration part of this plugin is quite basic and offers two types of transport modes, https using a username and password combination or ssh using public key infrastructure.

該外掛程式的配置部分非常基礎，提供兩種傳輸模式：使用使用者名稱和密碼組合的 https 或使用公鑰基礎架構的 ssh。

---

|   |   |
| --- | --- |
| Enable<br>啟用 | Enable backup to the upstream target<br>啟用備份到上游目標 |
| URL | Target location, which defines protocol, user and path. This may look like: sftp://opnsense@192.168.1.10//home/opnsense/config\_backups<br>目標位置，定義協定、使用者和路徑。例如：sftp://opnsense@ 192.168.1.10 //home/opnsense/config\_backups |
| SSH private key<br>SSH私鑰 | Upload the my\_new\_key file created during preparation.<br>上傳準備過程中所建立的 my\_new\_key 檔案。 |
| Backup Count<br>備份數量 | Number of backups to keep<br>要保留的備份數量 |
| Encrypt Password<br>加密密碼 | Password used to encrypt the backup (optional)<br>用於加密備份的密碼（可選） |

## Finish and test｜完成並測試

After willing in the details, press “Setup/Test sftp” to validate if it works. When connectivity isn’t possible, the error will be reported.

完成詳細資訊設定後，點擊「設定/測試 SFTP」驗證是否正常運作。如果連線失敗，系統會報告錯誤訊息。

Tip

提示

For advanced debugging use sftp on the command line, this plugin uses the same tool and reports the same errors.

對於進階調試，請在命令列中使用 sftp，此外掛程式使用相同的工具並報告相同的錯誤。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Configuration｜配置](<90 配置.md>)　｜　[下一篇：Firmware｜韌體 ➡](<92 韌體.md>)
