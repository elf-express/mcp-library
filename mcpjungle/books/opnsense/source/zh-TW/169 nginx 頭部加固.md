---
title: "nginx 頭部加固"
title_original: "nginx Header Hardening"
source: "https://docs.opnsense.org/manual/how-tos/nginx_header_hardening.html"
chapter: ["Community Plugins","Web"]
order: 169
lang: "zh-TW"
translated_by: "google_v2"
captured: "2026-09-26T11:33:05.943Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：nginx 基本負載平衡](<168 nginx 基本負載平衡.md>)　｜　[下一篇：nginx 本地網站託管 ➡](<170 nginx 本地網站託管.md>)

# nginx 頭部加固

> 章節：[Community Plugins](<000 目錄.md#c-36>) › [Web](<000 目錄.md#c-37>)

## nginx：頭部加固

注意事項

除了某些特定的設定指令外，**NOT** 僅適用於 nginx 外掛程式。請注意，您也可以透過這種方式來偵錯前端程式碼。

## 背景資訊

HTTP標頭可以控制 Web 應用程式可以執行哪些操作以及不可以執行哪些操作。這可以用來加強 Web 應用程式的安全性，抵禦某些**客戶端風險**。

## 使用本機代理測試 Web 應用程式

### Firefox 設定

對於這些測試，您應該安裝和設定 [FoxyProxy](https://addons.mozilla.org/de/firefox/addon/foxyproxy-standard/) 。

安裝完成後，點擊代理設定並新增新的代理：

![../../_images/zap_foxyproxy.png](<../images/b449a148-zap_foxyproxy.png>)

作為代理，輸入 localhost（如果 localhost 不起作用，則輸入127.0.0.1 ）和連接埠 8080。儲存設定。

### 下載代理軟體進行測試

常用的測試工具有：

-   OWASP ZAP ([https://github.com/zaproxy/zaproxy](https://github.com/zaproxy/zaproxy))
    
-   打嗝（[https://portswigger.net/burp](https://portswigger.net/burp) ）
    
-   mitmproxy ([https://mitmproxy.org/](https://mitmproxy.org/) )
    

下載完成後，通常需要將其解壓縮到適當的目錄。 \ `\`解壓後，需要運行它。如果是ZAP ，請依照您的作業系統雙擊`zap.sh`或`zap.bat` 。

接下來，在「工具」‣「選項」‣「動態」 SSL證書下重新產生並匯出證書，然後將其匯入Firefox金鑰庫（「首選項」‣「資料保護與安全性」‣「顯示證書」）中，並賦予完全信任。

### 開始測試

點擊 FoxyProxy 圖標，然後選擇已定義的本機代理程式。接下來，像往常一樣使用該應用程式即可。如果點擊紅色按鈕，則可以在ZAP中停止請求，並允許您對其進行編輯：

![../../_images/zap_request.png](<../images/f26af109-zap_request.png>)

完成後，只需點擊播放按鈕即可停用暫停功能，或等待下一個請求/回應進行編輯。例如，回應可能如下所示：

![../../_images/zap_response.png](<../images/9b064335-zap_response.png>)

您可以在這裡看到很多重要訊息，例如使用的協定 ( HTTP/1.1 )、狀態碼 200（表示成功）以及許多標頭。其中一些標頭會影響安全性， ZAP會嘗試給出建議，這些建議可能並不總是正確的，但或許可以幫助您發現一些（被遺忘的）問題：

![../../_images/zap_warnings.png](<../images/f2a8c5e3-zap_warnings.png>)

旗幟的顏色代表風險等級，顏色越紅，對安全的影響就越大。左側視圖列出了所有發現的問題，右側視圖則提供了詳細的描述。您需要根據這些資訊決定下一步的行動。

## 使用開發者工具測試 Web 應用程式

當你右鍵點擊網站時，你可以檢查元素，但打開工具中還有一個用於網路的選項卡。

![../../_images/firefox_devtools_network.png](<../images/e97763e7-firefox_devtools_network.png>)

網路選項卡的功能與代理程式的主視圖類似。您可以查看已傳送和已接收的標頭。其優點在於，您可以在控制台標籤中看到一些錯誤訊息（例如，如果CSP出現錯誤）。控制台的缺點是，攔截和修改資料並不容易。

## 透過 nginx 外掛程式註入缺少的標頭

可以透過建立新的安全標頭配置來注入nginx插件中的安全標頭：

![../../_images/nginx_security_headers.png](<../images/29019880-nginx_security_headers.png>)

在此處進行設定將覆蓋 Web 伺服器的設定。您可以將此安全設定注入到位置伺服器或HTTP伺服器中。

您可以閱讀 [Mozilla Wiki](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)或 RFC 中有關標頭的資訊。

警告

並非所有瀏覽器都支援所有標頭。

簡而言之，標題如下：

|   |   |
| --- | --- |
| 引薦來源 | 控制頁面在您點選連結時看到的內容 |
| XSS保護 | 啟用或停用（反射） XSS的偵測 |
| 不偵測內容類型 | 當原始內容類型不正確時，停用內容類型偵測 |
| 嚴格的運輸安全措施 | 僅限TLS ，並強制執行有效證書 |
| HPKP | 固定公鑰，不常用且危險 [1](#id2)如果配置錯誤 |
| 內容安全策略 | 控制資源與JS功能 |

[1](#id1)

如果在輪換時間段內，未先透過此標頭宣布其公鑰就切換證書，則會將這些客戶端鎖定，因為它們預期會受到MITM攻擊，並拒絕連接，而且很難在瀏覽器中重置此 PIN 碼。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：nginx 基本負載平衡](<168 nginx 基本負載平衡.md>)　｜　[下一篇：nginx 本地網站託管 ➡](<170 nginx 本地網站託管.md>)
