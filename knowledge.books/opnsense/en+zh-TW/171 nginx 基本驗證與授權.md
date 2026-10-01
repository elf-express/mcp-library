---
title: "nginx Basic Authentication & Authorization｜nginx 基本驗證與授權"
title_original: "nginx Basic Authentication & Authorization"
source: "https://docs.opnsense.org/manual/how-tos/nginx_basic_auth.html"
chapter: ["Community Plugins","Web"]
order: 171
lang: "bilingual"
translated_by: "google_v2"
captured: "2026-09-26T11:33:06.948Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：nginx Local Website Hosting｜nginx 本地網站託管](<170 nginx 本地網站託管.md>)　｜　[下一篇：nginx IP Based Access Control Lists｜nginx IP基於存取控制列表 ➡](<172 nginx IP基於存取控制列表.md>)

# nginx Basic Authentication & Authorization｜nginx 基本驗證與授權

> 章節：[Community Plugins](<000 目錄.md#c-36>) › [Web](<000 目錄.md#c-37>)

## nginx: Basic Authentication & Authorization｜nginx：基本驗證和授權

Warning

警告

Passwords in password files cannot be stored securely. Your passwords are stored in plain text in the configuration and as md5 in the nginx password files. Secure password hashes like [bcrypt](https://en.wikipedia.org/wiki/Bcrypt), [scrypt](https://en.wikipedia.org/wiki/Scrypt) or [Argon](https://github.com/P-H-C/phc-winner-argon2) 2 are currently not supported by nginx.

密碼檔案中的密碼無法安全儲存。您的密碼在設定檔中以明文形式存儲，而在 nginx 密碼檔中則以 MD5 加密形式儲存。 nginx 目前不支援諸如 [bcrypt](https://en.wikipedia.org/wiki/Bcrypt) 、[scrypt](https://en.wikipedia.org/wiki/Scrypt)或 [Argon](https://github.com/P-H-C/phc-winner-argon2) 2 之類的安全密碼雜湊演算法。

Please also note that basic authentication transfers the credentials in plain text to the server. It is recommended that you only use it via HTTPS because otherwise every attacker with a network sniffer such as [Wireshark](https://www.wireshark.org/) (and maybe some additional man in the middle tools like [ettercap](https://www.ettercap-project.org/) or [fake\_router6](https://github.com/vanhauser-thc/thc-ipv6)) will be able to intercept your connection to the server and read your password.

另請注意，基本驗證會將憑證以明文形式傳輸到伺服器。建議您僅透過HTTPS使用它，否則任何擁有網絡嗅探器（例如 [Wireshark](https://www.wireshark.org/) ，以及一些中間人攻擊工具，例如 [ettercap](https://www.ettercap-project.org/)或 [fake\_router6](https://github.com/vanhauser-thc/thc-ipv6) ）的攻擊者都可以讀取您與您與您與您與您的代碼進行攔截的密碼。

## Background Information｜背景資訊

Basic authentication encodes the username and the password in Base64 in a HTTP header. Because it is really simple to implement, almost every HTTP client supports it. For this reason, people use it to protect REST interfaces and so on. Also authentication for the OPNsense API supports this kind of authentication.

基本驗證會將使用者名稱和密碼以 Base64 編碼的形式儲存在HTTP標頭中。由於實作起來非常簡單，幾乎所有HTTP客戶端都支援它。因此，人們使用它來保護REST接口等等。 OPNsense API的身份驗證也支援這種驗證方式。

## Configuration｜配置

### Create Users｜創建用戶

Navigate to the “Credential”（憑證） tab.

導覽至“Credential”（憑證）選項卡。

![../../_images/nginx_user.png](<../images/41a94388-nginx_user.png>)

Enter a username and a password and press ok

請輸入使用者名稱和密碼，然後按確定

### Create An User List｜建立使用者列表

Navigate to the tab “User List”（使用者列表）.

導覽至選項卡“User List”（使用者列表） 。

![../../_images/nginx_users.png](<../images/61abbfbb-nginx_users.png>)

Select all users, that should have access to a specific resource and give this group a name.

選擇所有需要存取特定資源的用戶，並為該群組命名。

### Assign it to a Location｜將其分配到某個位置

In the last step, the user list must be added to the location.

最後一步，必須將使用者清單新增至位置。

![../../_images/nginx_auth_location.png](<../images/6fceb6b7-nginx_auth_location.png>)

As soon as you restart the server, you will need to log in to access the contents of this directory. To do so, you can enter any string in the basic authentication field, which will be sent as an realm. The user list is the list previously created.

伺服器重新啟動後，您需要登入才能存取此目錄的內容。為此，您可以在基本驗證欄位中輸入任意字串，該字串將作為網域傳送。使用者列表是之前建立的列表。

Reload the server.

重新載入伺服器。

## Testing｜測試

You can use curl to check if it works. In a browser like Firefox, a dialog asking for credentials should open.

您可以使用 curl 命令來檢查它是否有效。在 Firefox 等瀏覽器中，應該會彈出一個對話框，要求輸入憑證。

```bash
curl -v -u user:password  "http://example.com/restricted/image.png"
```

## Advanced Authentication｜進階身份驗證

The entry advanced authentication is used to call an external authentication provider. In the case of OPNsense, this is currently a special script, which authenticates against the local database. If you want to use it, do not enter a realm nor select a user list. Please note that this feature may change in the future.

進階身份驗證入口用於呼叫外部身份驗證提供者。在 OPNsense 中，目前使用的是一段特殊的腳本，它會針對本地資料庫進行身份驗證。如果您想使用此功能，請不要輸入網域或選擇使用者清單。請注意，此功能未來可能會發生變化。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：nginx Local Website Hosting｜nginx 本地網站託管](<170 nginx 本地網站託管.md>)　｜　[下一篇：nginx IP Based Access Control Lists｜nginx IP基於存取控制列表 ➡](<172 nginx IP基於存取控制列表.md>)
