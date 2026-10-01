---
title: "nginx Local Website Hosting｜nginx 本地網站託管"
title_original: "nginx Local Website Hosting"
source: "https://docs.opnsense.org/manual/how-tos/nginx_hosting.html"
chapter: ["Community Plugins","Web"]
order: 170
lang: "bilingual"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:33:07.464Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：nginx Header Hardening｜nginx 頭部加固](<169 nginx 頭部加固.md>)　｜　[下一篇：nginx Basic Authentication & Authorization｜nginx 基本驗證與授權 ➡](<171 nginx 基本驗證與授權.md>)

# nginx Local Website Hosting｜nginx 本地網站託管

> 章節：[Community Plugins](<000 目錄.md#c-36>) › [Web](<000 目錄.md#c-37>)

## nginx: Local Website Hosting｜nginx：本地網站託管

Warning

警告

Even if you can host websites directly from OPNsense, it is not recommended for security reasons - especially when sending requests to a local PHP interpreter. Do NOT consider using the feature to serve PHP content locally in enterprise networks. It is intended for home users who want to save money by saving power and know what they are doing. If you do not know how to handle a web server properly, do not enable this feature.

即使您可以直接從 OPNsense 託管網站，出於安全原因也不建議這樣做 - 特別是在向本地 PHP 解釋器發送請求時。 NOT 是否考慮使用該功能在企業網路中本地提供 PHP 內容。它適用於希望透過省電來省錢並知道自己在做什麼的家庭用戶。如果您不知道如何正確處理 Web 伺服器，請勿啟用此功能。

## Prepare｜準備

First of all, a directory has to be created. For example /srv/web\_application1. Please note that this directory must be accessible by nginx and PHP (both running as www).

首先，需要建立一個目錄。例如 /srv/web\_application1。請注意，nginx 和PHP （均以 www 身分運行）必須能夠存取此目錄。

For example, you can chmod it (+rx for directories, +r for files for this user) or chown it.

例如，你可以使用 chmod 指令（+rx 表示目錄權限，+r 表示檔案權限）​​或 chown 指令來控制它。

```bash
# create a directory
mkdir -p /srv/web_application1
cd /srv
stat web_application1
# Example Result:
# 86 18009 drwxr-xr-x 2 root wheel 14050 512 "Aug 31 18:28:19 2018"
#  "Aug 31 18:28:19 2018" "Aug 31 18:28:19 2018" "Aug 31 18:28:19 2018"
#  32768 8 0 web_application1
#
# as you can see, everyone can read (r) and switch into the directory (x))
#
# do this if the directory is not readable or executable:
chmod +rx web_application1
```

Warning

警告

Never use chmod 777 and be careful with write permissions. the most secure way is to change the owner to www (chown www filename) and give write permission only to the web server user (chmod o+w filename). The same is valid for directories. It would be a good idea not to execute anything in those directories (for example via a special location block in nginx). If you write your own applications, it is recommended to store such data outside of your web root.

切勿使用 `chmod 777` 指令，並務必謹慎管理寫入權限。最安全的方法是將檔案擁有者變更為 www（`chown www filename`），並僅授予 Web 伺服器使用者寫入權限（`chmod o+w filename`）。目錄也同樣適用。最好不要在這些目錄中執行任何操作（例如，透過 Nginx 中的特殊 location 區塊）。如果您編寫自己的應用程序，建議將此類資料儲存在 Web 根目錄之外。

When the directory exists, you can create a file in this directory. Let’s say, it should be called test.php and should show some information about PHP:

如果目錄存在，您可以在該目錄中建立一個檔案。假設該檔案名稱為 test.php，並且應該顯示一些關於PHP資訊：

```
cat > /srv/web_application1/test.php
<?php phpinfo();
```

Press control + d to end the input.

按 Ctrl + D 結束輸入。

Note

筆記

you can also use vim if you install vim-lite via pkg.

如果你透過 pkg 安裝了 vim-lite，也可以使用 vim。

```bash
# If needed, change the permission to make it readable:
chmod +r test.php
```

Note

筆記

In a real world scenario, you would probably copy an archive (.tar.gz, .tar.xz, .tar.bz or .zip) via SFTP or SCP on the firewall and execute a command to extract it. Read the man pages for tar, the compression tool or unzip for more detailed instructions.

在實際應用中，您可能會透過防火牆上的SFTP或SCP連接埠複製壓縮檔案（.tar.gz、.tar.xz、.tar.bz或.zip），然後執行解壓縮指令。有關更詳細的說明，請閱讀tar（壓縮工具）或unzip的手冊頁。

## Configure Locations｜配置位置

![../../_images/nginx_edit_location_dialog.png](<../images/04904948-nginx_edit_location_dialog.png>)

For a location, the following directives are important:

對於位置訊息，以下指令非常重要：

| Directive<br>指令 | Description<br>描述 |
| --- | --- |
| Match Type and URL Pattern<br>匹配類型和URL圖案 | How to match the location and the pattern<br>如何匹配位置和圖案 |
| File System Root<br>檔案系統根目錄 | Directory of web application<br>Web應用程式目錄 |
| Upstream Servers<br>上游伺服器 | Send it to a remote interpreter instead of using the local one<br>將請求傳送到遠端解釋器而不是使用本機解釋器 |
| Pass Request To PHP Interpreter<br>將請求傳遞給PHP解釋器 | Check if you want to enable PHP (runs locally as user www) or remotely<br>勾選是否要啟用PHP （以使用者 www 身分在本地運行）或遠端運行 |
| Router Script<br>路由腳本 | Sends all request to a specific script (entry point of application)<br>將所有請求傳送到特定腳本（應用程式入口點） |

| Directive<br>指令 | Value<br>價值 |
| --- | --- |
| Match Type and URL Pattern<br>匹配類型和URL模式 | ~\* .\*.php or similar<br>~\* .\*.php 或類似 |
| File System Root<br>檔案系統根目錄 | /srv/web\_application1 |
| Upstream Servers<br>上游伺服器 | empty<br>空白 |
| Pass Request To PHP Interpreter<br>向PHP翻譯人員發送請求 | checked<br>已檢查 |
| Router Script<br>路由腳本 | empty<br>空 |

## Configure HTTP Server｜配置HTTP伺服器

![../../_images/nginx_edit_http_server_dialog.png](<../images/ea5db3c5-nginx_edit_http_server_dialog.png>)

Configuring the HTTP server is simple. You need a hostname (for example website.test), a port (8080/TCP is the HTTP alternative port, so it is good for testing. For production sites you should stick with the defaults). Please select the previously created location to serve web content. Please also configure a root here, because all requests, which do not match, will be handled by the server default. The default server will just serve the static file.

配置HTTP伺服器很簡單。您需要一個主機名稱（例如 website.test）和一個連接埠（8080/ TCP是HTTP的備用端口，因此適合測試。對於生產環境，您應該使用預設設定）。請選擇先前建立的用於提供網頁內容的伺服器位置。此外，請在此處設定根目錄，因為所有不符的請求都將由預設伺服器處理。預設伺服器只會提供靜態檔案。

## Testing｜測試

To test if you web server is running, you can paste call it by its IP and port.

要測試您的 Web 伺服器是否正在運行，您可以貼上呼叫它，並輸入其IP和連接埠。

Note

筆記

Please note that IPv6 addresses must be enclosed within square brackets like [http://\[::1\]/](http://[::1]/) or [http://\[::1\]:8080/](http://[::1]:8080/).

注意，IPv6 位址必須用方括號括起來，例如 [ http://\[::1\ ]/]( http://[::1 ]/) 或 [ http://\[::1\ ]:8080/]( http://[::1 ]:8080/)。

```bash
curl "http://192.168.0.1:8080/test.php"
```

## Security Considerations｜安全考量

-   This is nginx and not httpd. It will not care about your .htaccess files. Do not put secret data in unprotected directories. You can protect those directories by yourself, but make sure you don’t forget them. Some application depend on this file.  
    這是 nginx 伺服器，不是 httpd 伺服器。它不會理會你的 .htaccess 檔。不要把敏感資料放在未受保護的目錄中。你可以自己保護這些目錄，但務必記得不要忘記。有些應用程式依賴這個檔案。
    
-   Do not overlap nor use OPNsense directories as root  
    請勿與 OPNsense 目錄重疊或將其用作根目錄
    
-   Do not upload badly maintained software. If your firewall gets compromised, it will become easy to compromise your hosts too.  
    不要上傳維護不善的軟體。如果你的防火牆被攻破，你的主機也很容易被攻破。
    
-   All your applications run under the same user (www)  
    您的所有應用程式都以同一使用者身分執行 (www)
    
-   Watch out for [advisories](https://nginx.org/en/security_advisories.html)  
    請留意[公告](https://nginx.org/en/security_advisories.html)
    
-   Install updates ASAP  
    安裝更新ASAP
    
-   Check your logs regularly.  
    定期查看日誌。
    
-   Consider hardening your directory and file access permission (like making directories and files read only for nginx and PHP)  
    考慮加強目錄和檔案存取權限（例如，將目錄和檔案對 nginx 和PHP設定為唯讀）

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：nginx Header Hardening｜nginx 頭部加固](<169 nginx 頭部加固.md>)　｜　[下一篇：nginx Basic Authentication & Authorization｜nginx 基本驗證與授權 ➡](<171 nginx 基本驗證與授權.md>)
