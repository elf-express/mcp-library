---
title: "nginx Web Application Firewall｜nginx Web應用程式防火牆"
title_original: "nginx Web Application Firewall"
source: "https://docs.opnsense.org/manual/how-tos/nginx_waf.html"
chapter: ["Community Plugins","Web"]
order: 175
lang: "bilingual"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:33:10.012Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：nginx TLS Authentication & Authorization｜nginx TLS身份驗證與授權](<174 nginx TLS身份驗證與授權.md>)　｜　[下一篇：nginx TCP And UDP Streams｜nginx TCP和UDP流 ➡](<176 nginx TCP和UDP流.md>)

# nginx Web Application Firewall｜nginx Web應用程式防火牆

> 章節：[Community Plugins](<000 目錄.md#c-36>) › [Web](<000 目錄.md#c-37>)

## nginx: Web Application Firewall｜nginx：網路應用程式防火牆

Warning

警告

This page is for advanced users only. A misconfiguration here may block requests to your API endpoints or website.

此頁面僅供進階使用者使用。此處配置錯誤可能會導致對您的API端點或網站的請求被封鎖。

A web application firewall is no replacement for properly implemented security in front- and backend.

Web應用程式防火牆不能取代前端和後端正確實施的安全措施。

## Background Information｜背景資訊

The OPNsense WAF uses [NAXSI](https://github.com/nbs-system/naxsi), which is a loadable module for the [nginx](https://nginx.org/) web server. NAXSI has two rule types:

OPNsense WAF 使用 [NAXSI](https://github.com/nbs-system/naxsi)，它是 [nginx](https://nginx.org/) Web 伺服器的可載入模組。 NAXSI 有兩種規則類型：

-   Main Rules: This rules are globally valid. Usual use case: Blocking code fragments that may be used to gain access to the server without permission (for example [SQL](https://www.owasp.org/index.php/SQL_Injection)\-/[XPATH](https://www.owasp.org/index.php/XPATH_Injection)\-injection for data access) or to gain control over a foreign client (for example [XSS](https://www.owasp.org/index.php/Cross-site_Scripting_\(XSS\))).  
    主要規則：這些規則是全域有效的。常見用例：阻止可能用於未經授權存取伺服器的程式碼片段（例如 [SQL](https://www.owasp.org/index.php/SQL_Injection) \-/[XPATH](https://www.owasp.org/index.php/XPATH_Injection) \-注入以存取資料）或用於控制外部客戶端的程式碼片段（例如 [XSS](https://www.owasp.org/index.php/Cross-site_Scripting_\(XSS\) ）。
    
-   Basic Rules: This rules are usually used in the locations to whitelist main rules by id inside a location or for additional rules.  
    基本規則：這些規則通常用於位置設定中，以便按位置內的 ID 將主要規則列入白名單，或用於新增其他規則。
    

Note

筆記

A good place to start are the [OWASP](https://www.owasp.org/index.php/OWASP_Cheat_Sheet_Series) Cheat Sheets.

一個不錯的起點是 [OWASP](https://www.owasp.org/index.php/OWASP_Cheat_Sheet_Series)速查表。

In addition to the self defined rules, NAXSI contains libinjection which is available directly in the location configuration. The NAXSI project itself has a high quality documentation for the module [online](https://github.com/nbs-system/naxsi/wiki). A good [ruleset](https://github.com/nbs-system/naxsi/blob/master/naxsi_config/naxsi_core.rules) to start can be found at GitHub on the project page. It cannot be provided by the plugin because of license issues (GPL cannot be used in BSD 2 Clause code), but you may enter it manually by yourself.

除了自訂規則之外，NAXSI還包含libinjection，可直接在位置配置中使用。 NAXSI 專案本身俱有模組的高品質文件[線上](https://github.com/nbs-system/naxsi/wiki)。可以在 GitHub 的專案頁面上找到一個好的[規則集](https://github.com/nbs-system/naxsi/blob/master/naxsi_config/naxsi_core.rules)。由於許可證問題，插件無法提供（GPL不能在BSD第2條代碼中使用），但您可以自行手動輸入。

## OPNsense specific Information｜OPNsense 特定訊息

-   OPNsense blocks User Agents used by Bots automatically - this cannot be configured  
    OPNsense 會自動阻止機器人使用的用戶代理程式—此功能無法設定。
    
-   The error pages are stored under /usr/local/etc/nginx/views  
    錯誤頁面儲存在 /usr/local/etc/nginx/views 目錄下。
    

## Configuration｜配置

### WAF Rules｜WAF規則

![../../_images/nginx_waf_rule.png](<../images/1a03a3c6-nginx_waf_rule.png>)

WAF rules are used to trigger an action if a condition evaluates to true or false (negated). The usual use case is increasing a score which can be checked afterwards, but a rule can for example also block instantly (the plugin only supports a score). WAF rules are grouped to a WAF policy, which then can evaluate the aggregated score.

WAF 規則用於在條件評估為真或假（否定）時觸發操作。通常的用例是增加一個分數，可以在事後檢查，但規則也可以立即阻止（該外掛程式僅支援分數）。 WAF 規則分組為 WAF 策略，然後可以評估聚合分數。

The description will be shown in the GUI and the Message will appear in the log. Negate will switch the condition form “if” to “unless”. The ID must be unique. You should use a scheme like 1000 to 2000 are SQL injection or similar because that improves log evaluation if needed (for example you could create pie charts because you can group by the id range).

描述將顯示在GUI中，訊息將顯示在日誌中。否定運算子會將條件從「如果」切換為「除非」 ID必須唯一。您應該使用類似 1000 到 2000 的SQL注入方案或類似方案，因為這有助於在需要時改進日誌評估（例如，您可以按 ID 範圍分組，從而建立餅圖）。

The next section describes the rule type and the match. You can scan the match value like truncate (an SQL keyword to delete the content of the table) in different places in the HTTP request. Mostly all of them can be checked or as an alternative, you can use a name so it will only match a specific header for example. Please note that not all of them are compatible with each other so please consult the NAXSI docs.

下一節將介紹規則類型和符合項目。您可以掃描符合值，例如在HTTP請求的不同位置使用 truncate（ SQL關鍵字，用於刪除表的內容）。大多數情況下，您可以檢查所有符合項，或者，您也可以使用名稱，使其僅符合特定的標頭。請注意，並非所有符合項目都彼此相容，因此請參閱NAXSI文件。

### WAF Policy｜WAF政策

![../../_images/nginx_waf_policy.png](<../images/923d07b2-nginx_waf_policy.png>)

The name is used in the location select box, rules are a collection of the previously created rules.

名稱用於位置選擇框中，規則是先前建立的規則的集合。

Warning

警告

Reuse of main rules will not work, clone them if needed. The reason is that they would conflict in id + score variable

主規則無法重複使用，如有需要請克隆它們。原因是它們會在 id 和 score 變數上發生衝突。

|   |   |
| --- | --- |
| Name<br>名稱 | a good name like “block sql injection”<br>一個好名字，例如「阻止 SQL 注入」 |
| Rules<br>規則 | select the rules to group<br>選擇要分組的規則 |
| Value<br>值 | a compare value<br>比較值 |
| Operator<br>運算子 | choose a compare Operator to compare score operator value<br>選擇一個比較運算子來比較分數運算子值 |
| Action<br>操作 | usually block<br>通常會阻止 |

As an (incomplete) example:

舉一個（不完整的）例子：

|   |   |
| --- | --- |
| Name<br>名稱 | block SQLi<br>阻止 SQL 注入 |
| Rules<br>規則 | contains select, contains from, contains union, contains delete<br>包含 select、包含 from、包含 union、包含 delete |
| Value<br>值 | 16 |
| Operator<br>運算子 | bigger or equal<br>大於或等於 |
| Action<br>操作 | block<br>區塊 |

### Location｜地點

In the last step, the rules must be applied to the location.

最後一步，必須將規則應用於該地點。

![../../_images/nginx_waf_location.png](<../images/40ab8b23-nginx_waf_location.png>)

To enable the WAF in a location you have to check the “Enable Security Rules”（啟用安全性規則） checkbox. At the beginning, it would make sense, if the “Learning Mode”（學習模式） is enabled (nothing is blocked but logged, so you can add whitelists until you don’t get any false positives anymore).

若要在某個位置啟用WAF您必須選取“Enable Security Rules”（啟用安全性規則）複選框。一開始，如果啟用“Learning Mode”（學習模式）會更有意義（不會阻止任何操作，但會記錄日誌，因此您可以新增白名單，直到不再出現誤報為止）。

The next two boxes are the score for libinjection. Both will add a score of 8 if they trigger. So values up to 8 will block.

接下來的兩個方格是 libinjection 的評分。如果觸發，這兩個評分都會增加 8 分。因此，值不超過 8 都會導致阻塞。

In the next dropdown, you can select your custom policies, which will be applied now.

在下一個下拉式選單中，您可以選擇自訂策略，這些策略將立即生效。

### Testing｜測試

If you trigger the WAF by creating a request looking evil to the WAF, you should get a message in the server error log as well as an OPNsense branded error page (Request Denied For Security Reasons).

如果您透過向WAF發送看似惡意的請求來觸發WAF ，您應該會在伺服器錯誤日誌中收到一條訊息，以及一個 OPNsense 品牌的錯誤頁面（出於安全原因，請求被拒絕）。

You may use curl to trigger it (if you block the following SQL keywords):

您可以使用 curl 來觸發它（如果您屏蔽以下SQL關鍵字）：

```bash
curl "http://example.com/index.php?a=select&b=union&c=from"
```

Note

筆記

You can use “NAXSI”（納克西斯） as a filter in the filter box of the log viewer when viewing the error log.

在查看錯誤日誌時，您可以在日誌檢視器的篩選框中使用“NAXSI”（納克西斯）作為篩選條件。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：nginx TLS Authentication & Authorization｜nginx TLS身份驗證與授權](<174 nginx TLS身份驗證與授權.md>)　｜　[下一篇：nginx TCP And UDP Streams｜nginx TCP和UDP流 ➡](<176 nginx TCP和UDP流.md>)
