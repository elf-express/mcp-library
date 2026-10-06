---
title: "Access Servers LDAP｜訪問伺服器LDAP"
title_original: "Access Servers LDAP"
source: "https://docs.opnsense.org/manual/how-tos/user-ldap.html"
chapter: ["System","Access / User Management","Configuration"]
order: 87
lang: "bilingual"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:32:23.887Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Local Users & Groups｜本地用戶和群組](<86 本地用戶和群組.md>)　｜　[下一篇：Access Servers Radius｜訪問伺服器 Radius ➡](<88 訪問伺服器 Radius.md>)

# Access Servers LDAP｜訪問伺服器LDAP

> 章節：[System](<000 目錄.md#c-11>) › [Access / User Management](<000 目錄.md#c-12>) › [Configuration](<000 目錄.md#c-13>)

## Access / Servers / LDAP｜訪問 / 伺服器 / LDAP

LDAP is the lightweight directory access protocol used by Microsoft Active Directory (AD), OpenLDAP and Novell eDirectory, to name a few.

LDAP是 Microsoft Active Directory ( AD )、OpenLDAP 和 Novell eDirectory 等所使用的輕量級目錄存取協定。

OPNsense can use an LDAP server for authentication purposes and for authorization to access (parts) of the graphical user interface (web configurator). When using LDAP for the GUI the privileges have to be defined with the local user manager, to do so an (automated) import of the users from the LDAP source is required.

OPNsense 可以使用LDAP伺服器進行身份驗證，並授權存取圖形使用者介面（Web 設定器）的部分內容。使用LDAP進行GUI身份驗證時，必須在本機使用者管理員中定義權限，為此需要從LDAP來源（自動）匯入使用者。

In this how-to we will show you how to configure both using Microsoft Active Directory Server. If you only need LDAP for services like VPN, then you can skip steps 3-5.

本教學將向您展示如何使用 Microsoft Active Directory 伺服器設定這兩項服務。如果您只需要LDAP用於VPN等服務，則可以跳過步驟 3-5。

Tip

提示

LDAP can also be combined with [Two-factor authentication](<89 雙重身份驗證.md>)

LDAP亦可與 [雙重認證](<89 雙重身份驗證.md>)結合使用

## Prerequisites｜先決條件

A functional LDAP server (example is based on MS AD) is required. Your OPNsense firewall needs to be fully configured and able to access the LDAP server.

需要一個功能正常的LDAP伺服器（範例基於MS AD ）。您的OPNsense防火牆需要完全配置，並且能夠存取LDAP伺服器。

### Step 1 - Add New LDAP server｜步驟 1 - 新增的LDAP伺服器

To add a new LDAP server as authentication source, go to System ‣ Access ‣ Servers and click on **Add server** in the top right corner, just above the form.

若要新增新的LDAP伺服器作為驗證來源，請前往“系統”‣“存取”‣“伺服器”，然後按一下表單上方右上角的 **新增伺服器**。

Enter the following information:

請輸入以下資訊：

---

|   |   |   |
| --- | --- | --- |
| **Descriptive name**<br>**描述性名稱** | ws2012 | *Enter a descriptive name*<br>*請輸入描述性名稱* |
| **Type**<br>**類型** | LDAP | *Select LDAP*<br>*選擇LDAP * |
| **Hostname or IP address**<br>**主機名稱或IP位址** | 10.10.10.1 | *Enter the IP address of you LDAP Server*<br>*輸入您的IP LDAP位址* |
| **Port value**<br>**連接埠號碼** | 389 | *Enter the port number, 389 is default*<br>*請輸入連接埠號，預設值為 389* |
| **Transport**<br>**傳輸方式** | TCP - Standard<br>TCP - 標準 | *Select Standard or Encrypted*<br>*選擇標準或加密* |
| **Protocol version**<br>**協定版本** | 3 | *Select protocol version*<br>*選擇協定版本* |
| **Bind credentials**<br>**綁定憑證** |  |  |
| User DN:<br>使用者DN : | cn=testusr,CN=Users, DC=opnsense,DC=local<br>cn=testusr, CN =Users, DC =opnsense, DC =local | *Enter your credentials*<br>*請輸入您的憑證* |
| Password:<br>密碼： | secret<br>秘密 | *always use a strong password*<br>*永遠使用強密碼* |
| **Search scope**<br>**搜尋範圍** | Entire Subtree<br>整個子樹 | *Select Entire Subtree to retrieve all*<br>*選擇「整個子樹」以擷取所有子樹* |
| **Base DN:**<br>**基地DN :** | DC=opnsense,DC=local<br>DC =opnsense， DC =local | *Enter the Base DN*<br>*進入基地DN * |
| **Authentication containers**<br>**身份驗證容器** | *Select*<br>*選擇* | *Click & Select the containers from the list*<br>*點擊並從清單中選擇容器* |
| **Extended Query**<br>**擴充查詢** | objectClass=Person | *Extend query, e.g. limit results to Persons*<br>*擴充查詢，例如將結果限制為 Person 類型* |
| **Initial Template**<br>**初始範本** | MicrosoftAD | *Select your LDAP Server Type*<br>*選擇您的LDAP伺服器類型* |
| **User naming attribute**<br>**使用者命名屬性** | samAccountName | *Auto filled in based upon Initial Template*<br>*根據初始範本自動填入* |
| **Read properties**<br>**讀取屬性** |  | *Fetch account details after successful login*<br>*成功登入後取得帳戶詳情* |
| **Synchronize groups**<br>**同步群組** |  | *Enable to Synchronize groups, requires the option above*<br>*啟用同步群組功能，需啟用上述選項* |
| **Constraint groups**<br>**約束群組** |  | *Only consider groups inside the Authentication containers*<br>*僅考慮驗證容器內的群組* |
| **Limit groups**<br>**限制組** |  | *Select list of groups that may be considered during sync\**<br>*選擇同步期間可能考慮的群組清單** |
| **Automatic user creation**<br>**自動建立使用者** |  | *When groups are automatically synchronized, this offers the ability to automatically create the user when it doesn’t exist.*<br>*當群組自動同步時，此功能可在使用者不存在時自動建立該使用者。 * |
| **Match case insensitive**<br>**匹配不區分大小寫** |  | *Allow mixed case input when gathering local user settings.*<br>*收集本地用戶設定時允許混合大小寫輸入。 * |

Note

注意事項

When clicking on the **Select** button right next to Authentication containers, something similar to the following will show up:

點擊身份驗證容器旁的**選擇**按鈕後，將顯示類似以下內容：

[![../../_images/ldap_selectcontainer.png](<../images/c2933caf-ldap_selectcontainer.png>)](https://docs.opnsense.org/_images/ldap_selectcontainer.png)

Note

注意事項

When using SSL/TLS, make sure the certificate authority of the remote server is configured in the System -> Trust section.

使用SSL/TLS時，請確保在「系統」->「信任」部分配置遠端伺服器的憑證授權單位。

Tip

提示

The **Extended Query** can be used to select users who are member of a specific group (only relevant for external services, when not using the local user database). One can use something like this: **memberOf=CN=myGroup,CN=Users,DC=opnsense,DC=local** to select only members of the group *“myGroup”*. To add a user to a specific group under Windows just edit the groups properties and select **Add…** to add the user under the tab **Members**.

**擴充查詢**可用於選擇屬於特定群組成員的使用者（僅在不使用本機使用者資料庫時與外部服務相關）。人們可以使用這樣的東西：**memberOf=CN=myGroup,CN=Users,DC=opnsense,DC=local**來只選擇群組*「myGroup」*的成員。若要將使用者新增至 Windows 下的特定群組，只需編輯群組屬性並選擇 **新增...**在選項卡**成員** 下新增使用者。

[![../../_images/ldap_mygroup_properties.png](<../images/49ed3d49-ldap_mygroup_properties.png>)](https://docs.opnsense.org/_images/ldap_mygroup_properties.png)

Tip

提示

In some cases local naming doesn’t match server naming when it comes to users, the case insensitive option can be used in that case to ignore case on login. Microsoft Access Directory for example doesn’t match case sensitive, in which case `UsEr` equals `user` (our system is case sensitive)

在某些情況下，本機命名與伺服器命名（針對使用者）不一致，此時可以使用不區分大小寫的選項來忽略登入時的大小寫。例如，Microsoft Access Directory 不區分大小寫，在這種情況下， `UsEr`等於`user` （而我們的系統區分大小寫）。

#### Step 1.1 (optional) Synchronize groups.｜步驟1.1 （可選）同步群組。

When using the local database to import users, you can also synchronize configured LDAP groups when the remote server supports this. To use this feature, enable `Read properties` and `Synchronize groups`.

使用本機資料庫匯入使用者時，如果遠端伺服器支持，您也可以同步已設定的LDAP群組。若要使用此功能，請啟用`Read properties`和`Synchronize groups` 。

Note

注意事項

This feature needs the remote LDAP server to respond with `memberOf` when queried, how to enable this on various LDAP providers lies outside the scope of this manual.

此功能需要遠端LDAP伺服器在被查詢時回應`memberOf` ，如何在各種LDAP提供者上啟用此功能不在本手冊的範圍內。

Note

注意事項

Groups will be extracted from the first `CN=` section and will only be considered when already existing in OPNsense. Group memberships will be persisted in OPNsense (you can always check which rights the user had the last time he or she successfully logged in).

群組將從第一個`CN=`部分提取，並且僅當其已存在於 OPNsense 中時才會考慮。群組成員關係將保留在 OPNsense 中（您可以隨時查看使用者上次成功登入時擁有的權限）。

Tip

提示

When users may not exist yet in the local database, you can also create them automatically after successful login, use the “Automatic user creation” option to arrange this.

當本地資料庫中尚不存在用戶時，您也可以在成功登入後自動建立用戶，使用「自動建立用戶」選項進行設定。

### Step 2 - Test｜步驟 2 - 測試

To test if the server is configured correctly, go to System ‣ Access ‣ Tester and select your LDAP server and enter a valid username + password. Click on **Test** and if everything is set up correctly it will show:

若要測試伺服器設定是否正確，請前往 System ‣ Access ‣ Tester 並選擇您的 LDAP 伺服器並輸入有效的使用者名稱 + 密碼。點擊**測試**，如果一切設定正確，它將顯示：

[![../../_images/ldap_testok.png](<../images/d9ef4644-ldap_testok.png>)](https://docs.opnsense.org/_images/ldap_testok.png)

Note

注意事項

When limited to just one group, the group name will not be shown in the listing.

如果僅限一個群組，則清單中不會顯示群組名稱。

If not (or your entered invalid credentials) it shows:

否則（或您輸入的憑證無效）：

[![../../_images/ldap_testfail.png](<../images/bd98dc9a-ldap_testfail.png>)](https://docs.opnsense.org/_images/ldap_testfail.png)

Tip

提示

When `Read properties` is enabled, you should also see all properties returned by the server in the tester. This helps to identify if your server support group sync support (find `memberOf` in the list).

啟用`Read properties`後，您應該還能在測試器中看到伺服器傳回的所有屬性。這有助於確定您的伺服器是否支援群組同步支援（在清單中尋找`memberOf` ）。

### Step 3 - Enable the authentication server｜步驟 3 - 啟用身份驗證伺服器

Go to System ‣ Settings ‣ Administration and under the **Authentication** section at the bottom, change the **Server** dropdown to your newly added LDAP server and save.

進入系統‣設定‣管理，在底部的**身份驗證**部分，將**伺服器**下拉選單變更為您新新增的LDAP伺服器並儲存。

Warning

警告

Before changing the gui access to require LDAP, make sure at least one user is allowed to access the firewall with remote credentials. This can be achieved either by adding the `All pages` privilege to the user or making sure the user is member of a group with that privilege.

在將 GUI 存取權限變更為需要LDAP之前，請確保至少有一個使用者被允許使用遠端憑證存取防火牆。這可以透過向使用者新增`All pages`權限或確保該使用者是具有該權限的使用者群組的成員來實現。

To prevent being locked out, you can add “Local Database”（本地資料庫） as secondary option during your test.

為防止被鎖定，您可以在測試期間新增“Local Database”（本地資料庫）作為輔助選項。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Local Users & Groups｜本地用戶和群組](<86 本地用戶和群組.md>)　｜　[下一篇：Access Servers Radius｜訪問伺服器 Radius ➡](<88 訪問伺服器 Radius.md>)
