---
title: "訪問伺服器LDAP"
title_original: "Access Servers LDAP"
source: "https://docs.opnsense.org/manual/how-tos/user-ldap.html"
chapter: ["System","Access / User Management","Configuration"]
order: 87
lang: "zh-TW"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:32:23.887Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：本地用戶和群組](<86 本地用戶和群組.md>)　｜　[下一篇：訪問伺服器 Radius ➡](<88 訪問伺服器 Radius.md>)

# 訪問伺服器LDAP

> 章節：[System](<000 目錄.md#c-11>) › [Access / User Management](<000 目錄.md#c-12>) › [Configuration](<000 目錄.md#c-13>)

## 訪問 / 伺服器 / LDAP

LDAP是 Microsoft Active Directory ( AD )、OpenLDAP 和 Novell eDirectory 等所使用的輕量級目錄存取協定。

OPNsense 可以使用LDAP伺服器進行身份驗證，並授權存取圖形使用者介面（Web 設定器）的部分內容。使用LDAP進行GUI權限管理時，必須在本機使用者管理員中定義權限，為此需要從LDAP來源（自動）匯入使用者。

本教學將向您展示如何使用 Microsoft Active Directory 伺服器設定這兩項服務。如果您只需要LDAP用於VPN等服務，則可以跳過步驟 3-5。

提示

LDAP亦可與 [雙重認證](<89 雙重身份驗證.md>)結合使用

## 先決條件

需要一個功能正常的LDAP伺服器（範例基於MS AD ）。您的OPNsense防火牆需要完全配置，並且能夠存取LDAP伺服器。

### 步驟 1 - 新增的LDAP伺服器

若要新增新的LDAP伺服器作為驗證來源，請前往“系統”‣“存取”‣“伺服器”，然後按一下表單上方右上角的 **新增伺服器**。

請輸入以下資訊：

---

|   |   |   |
| --- | --- | --- |
| **描述性名稱** | ws2012 | *請輸入描述性名稱* |
| **類型** | LDAP | *選擇LDAP * |
| **主機LDAP或IP位址** | 10.10.10.1 | *輸入您的IP伺服器位址* |
| **連接埠號碼** | 389 | *請輸入連接埠號，預設值為 389* |
| **傳輸方式** | TCP - 標準 | *選擇標準或加密* |
| **協定版本** | 3 | *選擇協定版本* |
| **綁定憑證** | | |
| 使用者DN : | cn=testusr, CN =Users, DC =opnsense, DC =local | *請輸入您的憑證* |
|密碼：|秘密| *永遠使用強密碼* |
| **搜尋範圍** | 整個子樹 | *選擇「整個子樹」以擷取所有子樹* |
| **基地DN :** | DC =opnsense， DC =local | *進入基地DN * |
| **身份驗證容器** | *選擇* | *點擊並從清單中選擇容器* |
| **擴充查詢** | objectClass=Person | *擴充查詢，例如將結果限制為 Person 類型* |
| **初始範本** | MicrosoftAD | *選擇您的LDAP伺服器類型* |
| **使用者命名屬性** | samAccountName | *根據初始範本自動填入* |
| **讀取屬性** | | *成功登入後取得帳戶詳情* |
| **同步群組** | | *啟用同步群組功能，需啟用上述選項* |
| **約束群組** | | *僅考慮驗證容器內的群組* |
| **限制組** | | *選擇同步期間可能考慮的群組清單** |
| **自動建立使用者** | | *當群組自動同步時，此功能可在使用者不存在時自動建立該使用者。 * |
| **匹配不區分大小寫** | | *收集本地用戶設定時允許混合大小寫輸入。 * |

注意事項

點擊身份驗證容器旁的**選擇**按鈕後，將顯示類似以下內容：

[![../../_images/ldap_selectcontainer.png](<../images/c2933caf-ldap_selectcontainer.png>)](https://docs.opnsense.org/_images/ldap_selectcontainer.png)

注意事項

使用SSL/TLS時，請確保在「系統」->「信任」部分配置遠端伺服器的憑證授權單位。

提示

**擴充查詢**可用於選擇屬於特定群組成員的使用者（僅在不使用本機使用者資料庫時與外部服務相關）。人們可以使用這樣的東西：**memberOf=CN=myGroup,CN=Users,DC=opnsense,DC=local**來只選擇群組*「myGroup」*的成員。若要將使用者新增至 Windows 下的特定群組，只需編輯群組屬性並選擇 **新增...**在選項卡**成員** 下新增使用者。

[![../../_images/ldap_mygroup_properties.png](<../images/49ed3d49-ldap_mygroup_properties.png>)](https://docs.opnsense.org/_images/ldap_mygroup_properties.png)

提示

在某些情況下，本機命名與伺服器命名（針對使用者）不一致，此時可以使用不區分大小寫的選項來忽略登入時的大小寫。例如，Microsoft Access Directory 不區分大小寫，在這種情況下， `UsEr`等於`user` （而我們的系統區分大小寫）。

#### 步驟1.1 （可選）同步群組。

使用本機資料庫匯入使用者時，如果遠端伺服器支持，您也可以同步已設定的LDAP群組。若要使用此功能，請啟用`Read properties`和`Synchronize groups` 。

注意事項

此功能需要遠端LDAP伺服器在被查詢時回應`memberOf` ，如何在各種LDAP提供者上啟用此功能不在本手冊的範圍內。

注意事項

群組將從第一個`CN=`部分提取，並且僅當其已存在於 OPNsense 中時才會考慮。群組成員關係將保留在 OPNsense 中（您可以隨時查看使用者上次成功登入時擁有的權限）。

提示

當本地資料庫中尚不存在用戶時，您也可以在成功登入後自動建立用戶，使用「自動建立用戶」選項進行設定。

### 步驟 2 - 測試

若要測試伺服器是否配置正確，請前往 System ‣ Access ‣ Tester 並選擇您的 LDAP 伺服器並輸入有效的使用者名稱 + 密碼。點擊**測試**，如果一切設定正確，它將顯示：

[![../../_images/ldap_testok.png](<../images/d9ef4644-ldap_testok.png>)](https://docs.opnsense.org/_images/ldap_testok.png)

注意事項

如果僅限一個群組，則清單中不會顯示群組名稱。

否則（或您輸入的憑證無效）：

[![../../_images/ldap_testfail.png](<../images/bd98dc9a-ldap_testfail.png>)](https://docs.opnsense.org/_images/ldap_testfail.png)

提示

啟用`Read properties`後，您應該還能在測試器中看到伺服器傳回的所有屬性。這有助於確定您的伺服器是否支援群組同步支援（在清單中尋找`memberOf` ）。

### 步驟 3 - 啟用身份驗證伺服器

進入系統‣設定‣管理，在底部的**身份驗證**部分，將**伺服器**下拉選單變更為您新新增的LDAP伺服器並儲存。

警告

在將 GUI 存取權限變更為需要LDAP之前，請確保至少有一個使用者被允許使用遠端憑證存取防火牆。這可以透過向該使用者新增`All pages`權限，或確保該使用者是具有該權限的使用者群組的成員來實現。

為防止被鎖定，您可以在測試期間新增「本機資料庫」作為輔助選項。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：本地用戶和群組](<86 本地用戶和群組.md>)　｜　[下一篇：訪問伺服器 Radius ➡](<88 訪問伺服器 Radius.md>)
