---
title: "nginx 基本驗證與授權"
title_original: "nginx Basic Authentication & Authorization"
source: https://docs.opnsense.org/manual/how-tos/nginx_basic_auth.html
chapter: ["Community Plugins","Web"]
order: 171
lang: "zh-TW"
translated_by: "google_v2"
captured: "2026-09-26T11:33:06.948Z"
---

# nginx 基本驗證與授權

## nginx：基本驗證和授權

警告

密碼檔案中的密碼無法安全儲存。您的密碼在設定檔中以明文形式存儲，而在 nginx 密碼檔中則以 MD5 加密形式儲存。 nginx 目前不支援諸如 [bcrypt](https://en.wikipedia.org/wiki/Bcrypt) 、[scrypt](https://en.wikipedia.org/wiki/Scrypt)或 [Argon](https://github.com/P-H-C/phc-winner-argon2) 2 之類的安全密碼雜湊演算法。

另請注意，基本驗證會將憑證以明文形式傳輸到伺服器。建議您僅透過HTTPS使用它，否則任何擁有網路嗅探器（例如 [Wireshark](https://www.wireshark.org/) ，以及一些中間人攻擊工具，例如 [ettercap](https://www.ettercap-project.org/)或 [fake\_router6](https://github.com/vanhauser-thc/thc-ipv6) ）的攻擊者都可以讀取您與您與您與您與您的伺服器讀取的密碼。

## 背景資訊

基本驗證會將使用者名稱和密碼以 Base64 編碼的形式儲存在HTTP標頭中。由於實作起來非常簡單，幾乎所有HTTP客戶端都支援它。因此，人們使用它來保護REST接口等等。 OPNsense API的身份驗證也支援這種驗證方式。

## 配置

### 創建用戶

導覽至「憑證」標籤。



請輸入使用者名稱和密碼，然後按確定

### 建立使用者列表

導覽至「使用者清單」標籤。



選擇所有需要存取特定資源的用戶，並為該群組命名。

### 將其分配到某個位置

最後一步，必須將使用者清單新增至位置。



伺服器重新啟動後，您需要登入才能存取此目錄的內容。為此，您可以在基本驗證欄位中輸入任意字串，該字串將作為網域傳送。使用者列表是之前建立的列表。

重新載入伺服器。

## 測試

您可以使用 curl 命令來檢查它是否有效。在 Firefox 等瀏覽器中，應該會彈出一個對話框，要求輸入憑證。

```bash
curl -v -u user:password  "http://example.com/restricted/image.png"
```

## 進階身份驗證

進階身份驗證入口用於呼叫外部身份驗證提供者。在 OPNsense 中，目前使用的是一段特殊的腳本，它會針對本地資料庫進行身份驗證。如果您想使用此功能，請不要輸入網域或選擇使用者清單。請注意，此功能未來可能會發生變化。