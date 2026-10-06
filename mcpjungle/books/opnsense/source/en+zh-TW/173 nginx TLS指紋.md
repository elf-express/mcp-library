---
title: "nginx TLS Fingerprints｜nginx TLS指紋"
title_original: "nginx TLS Fingerprints"
source: "https://docs.opnsense.org/manual/how-tos/nginx_tls_fingerprints.html"
chapter: ["Community Plugins","Web"]
order: 173
lang: "bilingual"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:33:08.000Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：nginx IP Based Access Control Lists｜nginx IP基於存取控制列表](<172 nginx IP基於存取控制列表.md>)　｜　[下一篇：nginx TLS Authentication & Authorization｜nginx TLS身份驗證與授權 ➡](<174 nginx TLS身份驗證與授權.md>)

# nginx TLS Fingerprints｜nginx TLS指紋

> 章節：[Community Plugins](<000 目錄.md#c-36>) › [Web](<000 目錄.md#c-37>)

## nginx: TLS Fingerprints｜nginx： TLS指紋

Warning

警告

This manual page is for advanced users only as the feature is not designed to be used by beginners. Maybe the curves are not provided by the TLS implementation and you get an empty string. If this is the case, it is normal but you should expect trouble if you use them as a later version of the software may implement them and then all your connections will be flagged as intercepted.

本手冊頁僅適用於進階用戶，因為此功能不適合初學者使用。也許這些曲線不是由 TLS 實作提供的，並且您會得到一個空字串。如果是這種情況，這是正常的，但如果您使用它們，您應該會遇到麻煩，因為更高版本的軟體可能會實現它們，然後您的所有連接將被標記為被攔截。

## Requirements｜要求

-   To use this feature, you must have an HTTPS server running which writes some logs.  
    要使用此功能，您必須有一個正在運行並寫入一些日誌的HTTPS伺服器。
    
-   Different browsers from different operating systems as clients  
    客戶端使用來自不同作業系統的不同瀏覽器。
    

## Analysis Page｜分析頁面

The analysis page is grouped into some sections:

分析頁面分為以下幾個部分：

![../../_images/nginx_fingerprint_list_colors.png](<../images/117f9209-nginx_fingerprint_list_colors.png>)

| Color<br>顏色 | Description<br>說明 |
| --- | --- |
| Orange | User-Agent string (HTTP-Header) - technical description of the client<br>使用者代理字串（ HTTP -標頭） - 客戶端的技術描述 |
| Red<br>紅色 | Total count of hits in the log of the UA with this ciphers and curves<br>使用此密碼和曲線對UA進行對數運算的總命中次數 |
| Blue<br>藍色 | Supported Ciphers and Curves in order of the Client hello - our fingerprint<br>支援的密碼和曲線（按客戶端問候順序排列 - 我們的指紋） |
| Green<br>綠色 | If you click this button, you can take the fingerprint over to the configuration<br>如果您點擊此按鈕，您可以將指紋帶到設定介面 |
| Gray<br>灰色 | Pie chart of the fingerprints count and the User-Agent (visualized)<br>指紋數量和使用者代理的圓餅圖（視覺化） |

The pie chart is important to know if a fingerprint is intercepted because many intercepting software changes the client hello. Let’s take a look at this one:

圓餅圖對於了解指紋是否被攔截至關重要，因為許多攔截軟體會修改客戶端的 Hello 封包。我們來看看這個圓餅圖：

![../../_images/nginx_fingerprint_list.png](<../images/9dbff996-nginx_fingerprint_list.png>)

There is one small one, which we probably can ignore, so lets look at the other two fingerprints: One contains ciphers, hashes etc., browsers should not support anymore (for example NULL, MD5, …) so this is probably intercepted (it actually is OWASP [ZAP](https://github.com/zaproxy/zaproxy) 2.7.0) in this screenshot, which is intercepting a connection from Firefox 63. In this case there is only one big segment left, which is very likely the real browser fingerprint (or another proxy).

還有一個很小的指紋，我們大概可以忽略它，所以我們來看看另外兩個指紋：一個包含密碼、哈希等訊息，瀏覽器應該不再支援這些資訊了（例如）。 NULL, MD5，……）所以這很可能是被截獲的（實際上確實如此）。 OWASP [ZAP](https://github.com/zaproxy/zaproxy) 2.7.0）在此螢幕截圖中，它攔截了來自 Firefox 63 的連接。在這種情況下，只剩下一個大片段，這很可能是真實的瀏覽器指紋（或其他代理）。

In the following example, take a look at the pie chart (especially the segment with the cursor on it):

在下面的範例中，請查看餅圖（特別是遊標所在的扇形區域）：

![../../_images/nginx_fingerprint_good_sample.png](<../images/4b2bd2d4-nginx_fingerprint_good_sample.png>)

The segment has a huge share of the requests with this User-Agent. In such a case it can be either always the same client requesting a resource and probably only few users are using it or, which is more likely if it is a browser, it that it is probably the right fingerprint.

該段請求中帶有此用戶代理的佔比非常高。在這種情況下，可能是同一個客戶端一直在請求資源，而實際使用該資源的用戶可能很少；或者，更有可能的是，如果是瀏覽器請求，則很可能是正確的用戶指紋。

Warning

警告

Some proxies are mirroring the client hello, so they won’t be detected. Also be careful because for example if you have a big customer generating a lot of traffic, a big segment of the pie chart (even the biggest one), may be intercepted.

有些代理伺服器會鏡像客戶端的 Hello 訊息，因此不會被偵測到。另外要注意的是，例如，如果您有一個流量龐大的客戶，圓餅圖中很大一部分（甚至是最大的那部分）的流量都可能被攔截。

For security reasons you should also take the absolute count into account when you are working on a real world sample and that software may be compiled width different which may also replace the crypto library which also means that it will have a different fingerprint.

出於安全考慮，在處理實際樣本時，您還應該考慮絕對計數，並且該軟體的編譯寬度可能不同，這也可能替換加密庫，這意味著它將具有不同的指紋。

If you click on the store button, a dialog will open and you can create a new entry in your configuration, which will be visible on the configuration page.

如果您點擊儲存按鈕，將會開啟一個對話框，您可以在配置中建立一個新條目，該條目將顯示在配置頁面上。

For example, our fingerprint could be imported into the configuration like shown in the following screenshot:

例如，我們可以將指紋匯入到配置中，如下圖所示：

![../../_images/nginx_fingerprint_export.png](<../images/cca09610-nginx_fingerprint_export.png>)

## Configuration Page｜配置頁面

Now in the configuration page under HTTP ‣ TLS Fingerprints there will be an entry for the created fingerprint, so it can be edited:

現在在設定頁面的HTTP ‣ TLS指紋」下，會有一個已建立指紋的條目，因此可以對其進行編輯：

![../../_images/nginx_fingerprint_settings.png](<../images/34f9b6fb-nginx_fingerprint_settings.png>)

## Trusted Fingerprints｜可信指紋

A trusted fingerprint is a fingerprint, which will be used to detect man in the middle attacks by comparing the client hello of the fingerprint with the data sent by the client. If there are additional ciphers or curves, you will get this information via an HTTP header into your application. Please note that you can have only one fingerprint per User-Agent.

可信任指紋是一種用於偵測中間人攻擊的指紋，其原則是將指紋的客戶端 Hello 訊息與客戶端發送的資料進行比較。如果存在其他加密演算法或曲線，您可以透過應用程式中的HTTP標頭來取得這些資訊。請注意，每個 User-Agent 只能擁有一個指紋。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：nginx IP Based Access Control Lists｜nginx IP基於存取控制列表](<172 nginx IP基於存取控制列表.md>)　｜　[下一篇：nginx TLS Authentication & Authorization｜nginx TLS身份驗證與授權 ➡](<174 nginx TLS身份驗證與授權.md>)
