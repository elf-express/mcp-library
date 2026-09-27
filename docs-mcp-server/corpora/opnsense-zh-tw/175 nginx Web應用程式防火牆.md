---
title: "nginx Web應用程式防火牆"
title_original: "nginx Web Application Firewall"
source: "https://docs.opnsense.org/manual/how-tos/nginx_waf.html"
chapter: ["Community Plugins","Web"]
order: 175
lang: "zh-TW"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:33:10.012Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：nginx TLS身份驗證與授權](<174 nginx TLS身份驗證與授權.md>)　｜　[下一篇：nginx TCP和UDP流 ➡](<176 nginx TCP和UDP流.md>)

# nginx Web應用程式防火牆

> 章節：[Community Plugins](<000 目錄.md#c-36>) › [Web](<000 目錄.md#c-37>)

## nginx：網路應用程式防火牆

警告

此頁面僅供進階使用者使用。此處配置錯誤可能會導致對您的API端點或網站的請求被封鎖。

Web應用程式防火牆不能取代前端和後端正確實施的安全措施。

## 背景資訊

OPNsense WAF 使用 [NAXSI](https://github.com/nbs-system/naxsi)，它是 [nginx](https://nginx.org/) Web 伺服器的可載入模組。 NAXSI 有兩種規則類型：

-   主要規則：這些規則是全域有效的。常見用例：阻止可能用於未經授權存取伺服器的程式碼片段（例如 [SQL](https://www.owasp.org/index.php/SQL_Injection) \-/[XPATH](https://www.owasp.org/index.php/XPATH_Injection) \-注入以存取資料）或用於控制外部客戶端的程式碼片段（例如 [XSS](https://www.owasp.org/index.php/Cross-site_Scripting_\(XSS\) ）。
    
-   基本規則：這些規則通常用於位置設定中，以便按位置內的 ID 將主要規則列入白名單，或用於新增其他規則。
    

注意事項

一個不錯的起點是 [OWASP](https://www.owasp.org/index.php/OWASP_Cheat_Sheet_Series)速查表。

除了自訂規則之外，NAXSI還包含libinjection，可直接在位置配置中使用。 NAXSI 專案本身俱有模組的高品質文件[線上](https://github.com/nbs-system/naxsi/wiki)。可以在 GitHub 的專案頁面上找到一個好的[規則集](https://github.com/nbs-system/naxsi/blob/master/naxsi_config/naxsi_core.rules)。由於許可證問題，插件無法提供（GPL不能在BSD第2條代碼中使用），但您可以自行手動輸入。

## OPNsense 特定訊息

-   OPNsense 會自動阻止機器人使用的用戶代理程式—此功能無法設定。
    
-   錯誤頁面儲存在 /usr/local/etc/nginx/views 目錄下。
    

## 配置

### WAF規則

![../../_images/nginx_waf_rule.png](<../images/1a03a3c6-nginx_waf_rule.png>)

WAF 規則用於在條件評估為真或假（否定）時觸發操作。通常的用例是增加一個分數，可以在事後檢查，但規則也可以立即阻止（該外掛程式僅支援分數）。 WAF 規則分組為WAF 策略，然後可以評估聚合分數。

描述將顯示在GUI中，訊息將顯示在日誌中。否定會將條件從「如果」切換為「除非」 ID必須唯一。您應該使用類似 1000 到 2000 的SQL注入或類似的方案，因為這有助於在需要時改進日誌評估（例如，您可以按 ID 範圍分組，從而建立餅圖）。

下一節將介紹規則類型和符合項目。您可以掃描符合值，例如在HTTP請求的不同位置使用 truncate（ SQL關鍵字，用於刪除表的內容）。大多數情況下，您可以檢查所有符合項，或者，您也可以使用名稱，使其僅符合特定的標頭。請注意，並非所有符合項目都彼此相容，因此請參閱NAXSI文件。

### WAF政策

![../../_images/nginx_waf_policy.png](<../images/923d07b2-nginx_waf_policy.png>)

名稱用於位置選擇框中，規則是先前建立的規則的集合。

警告

主規則無法重複使用，如有需要請克隆它們。原因是它們會在 id 和 score 變數上發生衝突。

|   |   |
| --- | --- |
| 名稱 | 一個好名字，例如「阻止 SQL 注入」 |
| 規則 | 選擇要分組的規則 |
| 值 | 比較值 |
| 運算子 | 選擇一個比較運算子來比較分數運算子值 |
| 操作 | 通常會阻止 |

舉一個（不完整的）例子：

|   |   |
| --- | --- |
| 名稱 | 阻止 SQL 注入 |
| 規則 | 包含 select、包含 from、包含 union、包含 delete |
| 值 | 16 |
| 運算子 | 大於或等於 |
| 操作 | 區塊 |

### 地點

最後一步，必須將規則應用於該地點。

![../../_images/nginx_waf_location.png](<../images/40ab8b23-nginx_waf_location.png>)

若要在某個位置啟用WAF您必須勾選「啟用安全性規則」複選框。一開始，如果啟用「學習模式」（不會阻止任何操作，但會記錄日誌，因此您可以新增白名單，直到不再出現誤報為止），那就很有意義了。

接下來的兩個方格是 libinjection 的評分。如果觸發，這兩個評分都會增加 8 分。因此，值不超過 8 都會導致阻塞。

在下一個下拉式選單中，您可以選擇自訂策略，這些策略將立即生效。

### 測試

如果你透過向WAF發送看似惡意的請求來觸發WAF ，你應該會在伺服器錯誤日誌中收到一條訊息，以及一個 OPNsense 品牌的錯誤頁面（由於安全原因，請求被拒絕）。

您可以使用 curl 來觸發它（如果您封鎖以下SQL關鍵字）：

```bash
curl "http://example.com/index.php?a=select&b=union&c=from"
```

注意事項

在查看錯誤日誌時，您可以在日誌檢視器的篩選方塊中使用「 NAXSI 」作為篩選條件。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：nginx TLS身份驗證與授權](<174 nginx TLS身份驗證與授權.md>)　｜　[下一篇：nginx TCP和UDP流 ➡](<176 nginx TCP和UDP流.md>)
