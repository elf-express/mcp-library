---
title: "Reporting Unbound DNS｜報告 Unbound DNS"
title_original: "Reporting Unbound DNS"
source: "https://docs.opnsense.org/manual/reporting_unbound_dns.html"
chapter: ["Reporting"]
order: 82
lang: "bilingual"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:32:21.371Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Reporting Traffic｜交通報告](<81 交通報告.md>)　｜　[下一篇：Configure Netflow Exporter｜設定 Netflow 導出器 ➡](<83 設定 Netflow 導出器.md>)

# Reporting Unbound DNS｜報告 Unbound DNS

> 章節：[Reporting](<000 目錄.md#c-9>)

## Reporting: Unbound DNS｜報告：Unbound DNS

Starting from OPNsense 23.1, users are able to gain insight into DNS traffic passing through their Unbound DNS resolver using the reporting tool under Reporting ‣ Unbound DNS.

從 OPNsense 23.1開始，使用者可以使用「報告」‣「Unbound DNS下的報告工具​​，深入了解透過其 Unbound DNS解析器的DNS流量。

All data presented here is kept on the system for a total of 7 days, creating a rolling window into DNS traffic without allowing the system to take up boundless storage space.

這裡展示的所有資料在系統中總共保留 7 天，從而創建了一個滾動視窗來了解DNS流量，而不會讓系統佔用無限的儲存空間。

## Overview｜概述

The overview tab shows high-level DNS traffic data.

概覽標籤顯示進階DNS流量資料。

**Counters**

**櫃檯**

-   The total amount of queries Unbound has handled, starting from the moment as reported above the counters. This will either be from the moment the gathering of statistics has been enabled, or up until the last 7 days. Keep in mind that the counter is as seen from the incoming side, and will increase regardless of the type of response returned.  
    Unbound 處理的查詢總數，從上方計數器顯示的那一刻起開始統計。統計時間可能是從啟用統計資料收集之時起，也可能是過去 7 天內。請注意，計數器顯示的是從傳入端看到的查詢數量，無論傳回何種類型的回應，計數器都會增加。
    
-   The amount of queries Unbound has successfully resolved. This counter does not distinguish between forwards or recursion, and excludes every other response type, such as responses from cache, local-data or a local policy such as a blocklist.  
    Unbound 已成功解決的查詢數量。此計數器不區分正向查詢或遞迴查詢，並且排除所有其他回應類型，例如來自快取、本機資料或本機原則（如黑名單）的回應。
    
-   The amount of queries Unbound has blocked. This is either because a queried domain was part of a blocklist, or part of a user-configured exact match as configured in Services ‣ Unbound DNS ‣ Blocklist.  
    Unbound 已封鎖的查詢數量。這是因為查詢的域屬於阻止列表，或者屬於用戶配置的精確匹配，如在「服務」‣ Unbound DNS ‣ 阻止列表 中配置的那樣。
    
-   The size of the current blocklist (if any). This will equal the total amount of domains listed inside all the active blocklists.  
    目前黑名單的大小（如有）。這將等於所有已啟動黑名單中列出的網域總數。
    

Every query counter shows the percentage as part of to the total amount of queries.

每個查詢計數器都會顯示查詢次數佔總查詢次數的百分比。

Note

注意事項

Adding up both the blocked and resolved queries does not equal the total amount, since the amount of responses from cache, local-data and other possible sources such as Unbound itself on e.g. a SERVFAIL are not shown.

將阻塞的查詢和已解決的查詢加起來並不等於總數，因為來自快取、本地資料和其他可能的來源（例如 Unbound 本身在SERVFAIL上）的回應數量沒有顯示出來。

**Graphs**

**圖表**

Also included in the report are two DNS traffic graphs, the first one being the query graph, and the second one being the client graph. Both graphs show the amount of **incoming** queries over a selectable span of time. The query graph also shows the amount of blocked queries. You can hover over the dots in the client graph to see which client it is, as well as the amount of queries associated with this client. If you proceed to click on this point of data, you will be referred to the Details grid containing every query within this time interval made by this client.

報告中還包含兩個DNS流量圖，第一個是查詢圖，第二個是客戶端圖。這兩個圖表都顯示了在可選時間段內**傳入**查詢的數量。查詢圖也顯示了被封鎖的查詢數量。您可以將滑鼠停留在客戶端圖中的點上，查看對應的客戶端以及與該客戶端關聯的查詢數量。如果您點擊該資料點，則會跳到「詳細資料」網格，其中包含該用戶端在此時間段內發出的所有查詢。

Both the query and client graph have the option to display the data on a logarithmic scale in order to catch outliers properly while preserving your perspective of the normal flow of traffic.

查詢圖和客戶端圖都可以選擇以對數刻度顯示數據，以便在保持正常流量趨勢的同時，正確地發現異常值。

**Top domains**

**熱門域名**

On the bottom of the page the top 10 of both passed and blocked queries are shown. This includes the amount a domain has been requested, as well as a percentage of passed or blocked requests respectively. If you have blocklists enabled, you are also able to explicitly block or whitelist a specific domain from this top list with the click of a button. The relevant domains will show up in Services ‣ Unbound DNS ‣ Blocklist, under “Whitelist Domains”（將網域加入白名單） or “Blocklist Domains”（黑名單域名）.

頁面底部會顯示通過和被封鎖的前 10 個查詢。這包括網域名稱的請求次數，以及通過和被封鎖的請求百分比。如果您啟用了封鎖列表，也可以透過點擊按鈕，從此列表中明確封鎖或將特定網域新增至白名單。相關網域將顯示在「服務」‣「Unbound」 DNS 「封鎖清單」中，位於“Whitelist Domains”（將網域加入白名單）或“Blocklist Domains”（黑名單域名）下方。

## Details｜細節

The details tab shows a livefeed of **completed** queries along with reply information. You can refresh the list by clicking the refresh button on the top right of the screen. In it you can find:

詳細資訊標籤顯示**已完成**查詢的即時回饋以及回覆資訊。您可以透過點擊螢幕右上角的刷新按鈕來刷新清單。在其中你可以找到：

-   Which client queried which domain with its associated DNS record type.  
    哪個客戶端查詢了哪個域及其關聯的DNS記錄類型。
    

Note

注意事項

It’s possible that a queried domain with a record type other than a CNAME (e.g. A or AAAA) might show as blocked with a CNAME as the record type in the details table. This is because a response to a query can contain CNAME records which ultimately point to the queried record type within the same answer (try doing a dig on www.azure.com for example). If any of these CNAME records contain domain names that occur within the configured blocklists, the blocklist system will also block this query, but can only do so after Unbound has resolved the relevant domain. The resolve time will therefore be higher on these types of block actions.

如果查詢的域的記錄類型不是CNAME （例如 A 或AAAA ），則在詳細資料表中，該域的記錄類型可能會顯示為CNAME 。這是因為查詢回應中可能包含CNAME記錄，這些記錄最終指向相同回應中查詢的記錄類型（例如，嘗試對 www.azure.com 執行 dig 命令）。如果這些CNAME記錄中包含已配置阻止清單中的域名，則阻止清單系統也會阻止此查詢，但只有在 Unbound 解析相關域之後才能執行此操作。因此，此類阻止操作的解析時間會更長。

-   The action taken by Unbound, this can either be pass, block or drop. The latter only occurs when a query could not be serviced due to an internal error. “Internal error” can be anything, ranging from a loss of internet connectivity to a crash of Unbound. The common factor is that Unbound marks the return code as SERVFAIL. If the Unbound logs do not show any reason for a drop occurring, the most likely candidate will be a loss of connectivity.  
    Unbound 會採取三種動作：透過、封鎖或丟棄。丟棄操作僅在查詢因內部錯誤而無法處理時發生。 「內部錯誤」可能包括任何情況，例如網路連線中斷或 Unbound 崩潰。共同點是 Unbound 會將回傳代碼標記為SERVFAIL 。如果 Unbound 日誌中沒有顯示任何丟棄操作的原因，則最可能的原因是網路連線中斷。
    
-   The source of the response. This can be either Recursion, Local, Local-data or cache. ‘Local’ refers to a decision made by Unbound to either block or drop the query. ‘Local-data’ refers to the custom host overrides and its associated aliases or internal local-data entries generated by the system. ‘Cache’ shows responses to clients utilizing the cache.  
    響應來源。可以是遞歸、本地、本地資料或快取。 「本地」指的是 Unbound 所做的阻止或丟棄查詢的決定。 「本地資料」指的是自訂主機覆蓋及其關聯的別名，或系統產生的內部本機資料條目。 「快取」顯示的是使用快取的客戶端的回應。
    
-   The return code of the DNS query. Refer to the [IANA DNS Parameters](https://www.iana.org/assignments/dns-parameters/dns-parameters.xhtml#dns-parameters-6) for its meaning.  
    DNS查詢的回傳碼。其意義請參閱 [IANA DNS參數](https://www.iana.org/assignments/dns-parameters/dns-parameters.xhtml#dns-parameters-6) 。
    
-   If recursion is involved, how long in milliseconds it took to resolve a domain.  
    如果涉及遞歸，解析網域需要多長時間（以毫秒為單位）。
    
-   The TTL of the final answer. Answers from recursion will always contain an upstream-defined TTL value, while answers from cache will show a snapshot of the remaining cache TTL value before recursion would have to take place again. Please note that TTL behaviour can be largely dependent on the settings used in Services ‣ Unbound DNS ‣ Advanced.  
    最終答案的TTL 。遞歸返回的答案始終包含上游定義的TTL值，而快取返回的答案將顯示在再次遞歸之前剩餘快取TTL值的快照。請注意， TTL行為很大程度上取決於「服務」‣「未綁定」 DNS 「進階」中使用的設定。
    
-   The blocklist used if a query was blocked.  
    如果查詢被阻止，則使用此封鎖清單。
    
-   Either a block or whitelist action button, which can be used in the same way as described above for the “Top domains” in the overview section. Please note that this column will not appear if blocklists are disabled.  
    此處提供封鎖或加入白名單的操作按鈕，其使用方法與上文「概覽」部分「熱門網域」的描述相同。請注意，如果屏蔽清單已停用，則此列將不會顯示。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Reporting Traffic｜交通報告](<81 交通報告.md>)　｜　[下一篇：Configure Netflow Exporter｜設定 Netflow 導出器 ➡](<83 設定 Netflow 導出器.md>)
