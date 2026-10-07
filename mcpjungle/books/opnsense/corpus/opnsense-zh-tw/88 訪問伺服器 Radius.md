---
title: "訪問伺服器 Radius"
title_original: "Access Servers Radius"
source: https://docs.opnsense.org/manual/how-tos/user-radius.html
chapter: ["System","Access / User Management","Configuration"]
order: 88
lang: "zh-TW"
translated_by: "google_v2"
captured: "2026-09-26T11:32:24.383Z"
---


# 訪問伺服器 Radius


## 訪問/伺服器/Radius

在 VPN 或強制門戶等服務中配置 Radius 伺服器以進行用戶身份驗證非常簡單，只需轉到“系統”‣“訪問”‣“伺服器”，然後單擊右上角的“**添加伺服器**”即可。

請填寫表格：

|   |   |   |
| --- | --- | --- |
| **描述性名稱** | radius\_test | *請輸入描述性名稱* |
| **類型** | 半徑 | *選擇半徑* |
| **主機名稱或IP位址** | 10.10.10.1 | *輸入您的Radius伺服器的IP位址* |
| **共用金鑰** | 金鑰 | *Radius 伺服器的共用金鑰* |
| **服務內容** | 驗證 | *選擇身分驗證，用於強制入口網站 + 會計功能* |
| **認證連接埠值** | 1812 | *連接埠號，1812 為預設值；計費連接埠為 1813* |
| **驗證逾時** | 5 | *Radius 回應請求的逾時時間* |
| **同步群組** | | *啟用從RADIUS伺服器讀取群組 - 需要CLASS屬性傳回指定的群組** |
| **限制組** | | *選擇同步期間可能考慮的群組清單* |
| **自動建立使用者** | | *此功能可在使用者不存在時自動建立使用者 - 需要啟用「同步群組」功能並實際傳回使用者的所屬群組。 * |

注意事項

*RADIUS 的設計本身不支援 *memberOf* 組的概念。 OPNsense 會使用傳回的 CLASS 屬性來尋找包含使用者群組成員身分的字串。由於 **同步群組**功能與 LDAP 伺服器的**同步群組** 功能共用相同的程式碼，因此定義為 CLASS 值的字串必須以 *CN=* 為前綴（例如 *CLASS=”CN=MyVPN-Group”*）！

此外，組分隔符號必須是換行符號（*n*）。某些RADIUS伺服器（例如MS NPS ）不支援字串值中的特殊字符，因此傳回值僅限於單行（進而轉換為單一群組）。

使用「系統」‣「存取」‣「測試器」下的測試器來測試 Radius 伺服器。

如果您想使用 FreeRADIUS 插件，請將伺服器設定為127.0.0.1 ，並且不要忘記在 FreeRADIUS 配置中新增 **客戶端**。

---

