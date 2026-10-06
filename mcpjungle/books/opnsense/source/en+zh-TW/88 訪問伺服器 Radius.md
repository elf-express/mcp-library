---
title: "Access Servers Radius｜訪問伺服器 Radius"
title_original: "Access Servers Radius"
source: "https://docs.opnsense.org/manual/how-tos/user-radius.html"
chapter: ["System","Access / User Management","Configuration"]
order: 88
lang: "bilingual"
translated_by: "google_v2"
captured: "2026-09-26T11:32:24.383Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Access Servers LDAP｜訪問伺服器LDAP](<87 訪問伺服器LDAP.md>)　｜　[下一篇：Two-factor authentication｜雙重身份驗證 ➡](<89 雙重身份驗證.md>)

# Access Servers Radius｜訪問伺服器 Radius

> 章節：[System](<000 目錄.md#c-11>) › [Access / User Management](<000 目錄.md#c-12>) › [Configuration](<000 目錄.md#c-13>)

## Access / Servers / Radius｜訪問/伺服器/Radius

Configuring a Radius server for user authentication in services like vpn or captive portal is easy just go to System ‣ Access ‣ Servers and click on **Add server** in the top right corner.

在 VPN 或強制門戶等服務中配置 Radius 伺服器以進行用戶身份驗證非常簡單，只需轉到“系統”‣“訪問”‣“伺服器”，然後單擊右上角的“**添加伺服器**”即可。

Fill in the form:

請填寫表格：

|   |   |   |
| --- | --- | --- |
| **Descriptive name**<br>**描述性名稱** | radius\_test | *Enter a descriptive name*<br>*請輸入描述性名稱* |
| **Type**<br>**類型** | Radius<br>半徑 | *Select Radius*<br>*選擇半徑* |
| **Hostname or IP address**<br>**主機名稱或IP位址** | 10.10.10.1 | *Enter the IP of your Radius server*<br>*輸入您的Radius伺服器的IP位址* |
| **Shared Secret**<br>**共用金鑰** | secret<br>金鑰 | *Shared secret for your Radius server*<br>*Radius 伺服器的共用金鑰* |
| **Services offered**<br>**服務內容** | Authentication<br>驗證 | *Select Authentication,for Captive portal + accounting*<br>*選擇身分驗證，用於強制入口網站 + 會計功能* |
| **Authentication port value**<br>**認證連接埠值** | 1812 | *Port number, 1812 is default; for accounting it’s 1813*<br>*連接埠號，1812 為預設值；計費連接埠為 1813* |
| **Authentication Timeout**<br>**驗證逾時** | 5 | *Timeout for Radius to respond on requests*<br>*Radius 回應請求的逾時時間* |
| **Synchronize groups**<br>**同步群組** |  | *Enable to read group(s) from RADIUS server - requires the CLASS attribute to return the designated group\**<br>*啟用從RADIUS伺服器讀取群組 - 需要CLASS屬性傳回指定的群組** |
| **Limit groups**<br>**限制組** |  | *Select list of groups that may be considered during sync*<br>*選擇同步期間可能考慮的群組清單* |
| **Automatic user creation**<br>**自動建立使用者** |  | *This offers the ability to automatically create the user when it doesn’t exist - requires “Synchronize groups” to be enabled and actually return a group for a user.*<br>*此功能可在使用者不存在時自動建立使用者 - 需要啟用「同步群組」功能並實際傳回使用者的所屬群組。 * |

Note

注意事項

*RADIUS does not support a \*memberOf* group concept by design. OPNsense uses the returned CLASS attribute instead to find a string containing the user’s group membership. Since the **Synchronize groups** feature shares the same code of the LDAP server feature **Synchronize groups** the string defined as CLASS value must be prefixed with *CN=* (e.g. *CLASS=”CN=MyVPN-Group”*)!

*RADIUS 的設計本身不支援 *memberOf* 組的概念。 OPNsense 會使用傳回的 CLASS 屬性來尋找包含使用者群組成員身分的字串。由於 **同步群組**功能與 LDAP 伺服器的**同步群組** 功能共用相同的程式碼，因此定義為 CLASS 值的字串必須以 *CN=* 為前綴（例如 *CLASS=”CN=MyVPN-Group”*）！

Additionally the group separator must be a line break (*n*). Some RADIUS servers (e.g. MS NPS) will not support special characters in the string value, the return value is therefore limited to a single line (which in turn translates into a single group).

此外，組分隔符號必須是換行符號（*n*）。某些RADIUS伺服器（例如MS NPS ）不支援字串值中的特殊字符，因此傳回值僅限於單行（進而轉換為單一群組）。

Use the tester under System ‣ Access ‣ Tester to test the Radius server.

使用「系統」‣「存取」‣「測試器」下的測試器來測試 Radius 伺服器。

If you want to use the FreeRADIUS plugin set up the server as 127.0.0.1 and don’t forget to add a **Client** in the FreeRADIUS configuration.

如果您想使用 FreeRADIUS 插件，請將伺服器設定為127.0.0.1 ，並且不要忘記在 FreeRADIUS 配置中新增 **客戶端**。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Access Servers LDAP｜訪問伺服器LDAP](<87 訪問伺服器LDAP.md>)　｜　[下一篇：Two-factor authentication｜雙重身份驗證 ➡](<89 雙重身份驗證.md>)
