---
title: "透過安全副本（sftp）進行備份"
title_original: "Backups via secure copy (sftp)"
source: https://docs.opnsense.org/manual/sftp-backup.html
chapter: ["System","Configuration","Backup"]
order: 91
lang: "zh-TW"
translated_by: "google_v2"
captured: "2026-09-26T11:32:25.909Z"
---

# 透過安全副本（sftp）進行備份

當您的遠端主機支援SSH時，通常也可以使用sftp，sftp可用於在機器之間（在本例中是您的防火牆和備份目標）以安全的方式進行檔案傳輸。

要使用此功能，必須先安裝 sftp-backup 插件（在系統->韌體->插件中搜尋 os-sftp-backup）。

## 準備

在配置插件前，請確保目標機器已啟用 SSH 且可存取。您還需要備份機器信任的私鑰/公鑰組合。

使用以下命令產生金鑰（-f 指定檔案名稱），過程中無需輸入密碼：

ssh-keygen

```
ssh-keygen -t ed25519 -C "your_email@example.com" -f my_new_key
```

輸出結果如下所示：

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

這將創建兩個文件，my\_new\_key 和 my\_new\_key.pub，第一個文件是私有的，不應該共享，另一個文件是公開的，並提供給備份機器。

接下來，我們將 my\_new\_key.pub 檔案加入到使用者 .ssh 目錄下的 authorized\_keys 檔案中（例如 /home/opnsense/.ssh/authorized\_keys）。

注意事項

確保 .ssh 目錄只有擁有者可讀寫，且 authorized_keys 也具有相同的權限。 （檔案權限設定為 600，目錄權限設定為 700）

提示

為備份建立一個單獨的金鑰（不要在其他地方使用同一個金鑰），以便以後可以輕鬆取消存取權限。

## 初始設定

該外掛程式的配置部分非常基礎，提供兩種傳輸模式：使用使用者名稱和密碼組合的 https 或使用公鑰基礎架構的 ssh。

---

|   |   |
| --- | --- |
| 啟用 | 啟用備份到上游目標 |
| URL | 目標位置，定義協定、使用者和路徑。例如：sftp://opnsense@ 192.168.1.10 //home/opnsense/config\_backups |
| SSH私鑰 | 上傳準備過程中所建立的 my\_new\_key 檔案。 |
| 備份數量 | 要保留的備份數量 |
| 加密密碼 | 用於加密備份的密碼（可選） |

## 完成並測試

完成詳細資訊設定後，點擊「設定/測試 SFTP」驗證是否正常運作。如果連線失敗，系統會報告錯誤訊息。

提示

對於進階調試，請在命令列中使用 sftp，此外掛程式使用相同的工具並報告相同的錯誤。