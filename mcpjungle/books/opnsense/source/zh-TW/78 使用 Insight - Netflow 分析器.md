---
title: "使用 Insight - Netflow 分析器"
title_original: "Using Insight - Netflow Analyzer"
source: "https://docs.opnsense.org/manual/how-tos/insight.html"
chapter: ["Reporting"]
order: 78
lang: "zh-TW"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:32:19.347Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：系統健康狀況和輪詢數據](<77 系統健康狀況和輪詢數據.md>)　｜　[下一篇：Netflow 匯出與分析 ➡](<79 Netflow 匯出與分析.md>)

# 使用 Insight - Netflow 分析器

> 章節：[Reporting](<000 目錄.md#c-9>)

OPNsense 配備了一個名為 Insight 的靈活快速的 Netflow 分析器。若要使用 Insight，需要設定 Netflow 匯出器以在本機擷取 Netflow 資料。為此，請參閱 [設定 Netflow 導出器](<83 設定 Netflow 導出器.md>) 。

## 使用者介面

Insight 是 OPNsense 的一個完全整合部分。它的用戶介面簡潔而強大。可以透過「報告」‣「Insight」來存取它。

[![../../_images/insight_gui.png](<../images/65a29dcc-insight_gui.png>)](https://docs.opnsense.org/_images/insight_gui.png)

Insight 提供了一整套分析工具，從圖形概覽到 csv 匯出器，方便您使用自己喜歡的電子表格進行進一步分析。

## 圖表與總計

Insight 的預設視圖是「熱門使用者和圖形概覽」。此視圖可以快速查看目前和歷史流量，並以圖表形式顯示每個已配置介面的入站和出站流量。

### 選擇範圍和分辨率

在右上角可以選擇收集的交通流量的日期範圍和精確度（解析度）。

### 視圖類型

可以將流量以堆疊方式（預設）、串流或展開方式顯示，以便與不同介面的使用情況進行比較。

**堆疊**

[![../../_images/stacked_view.png](<../images/5092703d-stacked_view.png>)](https://docs.opnsense.org/_images/stacked_view.png)

**溪流**

[![../../_images/stream_view.png](<../images/f0b0f1b4-stream_view.png>)](https://docs.opnsense.org/_images/stream_view.png)

**擴充版**

[![../../_images/expanded_view.png](<../images/898a609f-expanded_view.png>)](https://docs.opnsense.org/_images/expanded_view.png)

### 介面

按一下介面可停用或啟用圖形視圖，雙擊僅選擇該介面。

### 熱門用戶

針對選定的接口，顯示先前選定日期範圍內端口和 IP 位址使用次數排名前 25 的用戶。

### 介面頂部

選擇介面查看排名前 25 名的用戶。

### 港口圓餅圖

連接埠餅圖顯示了每個連接埠/應用程式的百分比。按一下或雙擊顯示的連接埠名稱/編號即可變更視圖。

點擊圓餅圖中的某一部分，即可開啟詳細視圖進行進一步分析。

[![../../_images/pie_piece.png](<../images/adee58d7-pie_piece.png>)](https://docs.opnsense.org/_images/pie_piece.png) [![../../_images/pie_details.png](<../images/2c4cfc7b-pie_details.png>)](https://docs.opnsense.org/_images/pie_details.png)

### IP地址餅圖

地址餅圖IP的工作方式與連接埠餅圖相同，顯示每個位址IP的百分比。點選或雙擊顯示的位址IP即可變更視圖。

點擊圓餅圖中的某一部分，即可開啟詳細視圖進行進一步分析。

### 介面總計

截圖中未顯示，但最新版本還包含所選介面的總計，顯示資料包（入、出、總計）和位元組（入、出、總計）。

## 詳細資訊

您可以透過點擊餅圖的某一部分或點擊「**詳細資料**」標籤來開啟詳細資料視圖。

點選標籤開啟詳細資料檢視後，即可建立新查詢。

[![../../_images/insight_details_view.png](<../images/a441d589-insight_details_view.png>)](https://docs.opnsense.org/_images/insight_details_view.png)

選擇有效的日期範圍（起始日期/結束日期）和介面後，也可以透過按連接埠或IP位址篩選來進一步縮小輸出範圍。點擊刷新圖示即可更新詳細輸出。如果要查看完整詳細列表，請將連接埠和位址留空。

[![../../_images/insight_full_details.png](<../images/df772907-insight_full_details.png>)](https://docs.opnsense.org/_images/insight_full_details.png)

## 匯出視圖

透過**匯出**視圖，您可以將資料匯出到您喜歡的電子表格或其他資料分析應用程式中進行進一步分析。

[![../../_images/insight_export_view.png](<../images/d0f0cca9-insight_export_view.png>)](https://docs.opnsense.org/_images/insight_export_view.png)

若要匯出數據，請選擇一個**集合**：

-   FlowSourceAddrTotals - 每個來源位址的總計
    
-   FlowInterfaceTotals - 每個介面的總計
    
-   FlowDstPortTotals - 每個目標連接埠的總計
    
-   FlowSourceAddrDetails - 每個來源位址的完整詳細信息
    

選擇**解析度**（以秒為單位）（300,3600,86400）

然後選擇日期範圍（從/到），並點擊**匯出**按鈕。

[![../../_images/insight_export.png](<../images/9b12b991-insight_export.png>)](https://docs.opnsense.org/_images/insight_export.png)

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：系統健康狀況和輪詢數據](<77 系統健康狀況和輪詢數據.md>)　｜　[下一篇：Netflow 匯出與分析 ➡](<79 Netflow 匯出與分析.md>)
