---
title: "Using Insight - Netflow Analyzer｜使用 Insight - Netflow 分析器"
title_original: "Using Insight - Netflow Analyzer"
source: "https://docs.opnsense.org/manual/how-tos/insight.html"
chapter: ["Reporting"]
order: 78
lang: "bilingual"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:32:19.347Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：System Health & Round Robin Data｜系統健康狀況和輪詢數據](<77 系統健康狀況和輪詢數據.md>)　｜　[下一篇：Netflow Export & Analyses｜Netflow 匯出與分析 ➡](<79 Netflow 匯出與分析.md>)

# Using Insight - Netflow Analyzer｜使用 Insight - Netflow 分析器

> 章節：[Reporting](<000 目錄.md#c-9>)

OPNsense is equipped with a flexible and fast Netflow Analyzer called Insight. To use Insight, one needs to configure the Netflow exporter for local capturing of Netflow data. To do so take a look at [Configure Netflow Exporter](<83 設定 Netflow 導出器.md>).

OPNsense 配備了一個名為 Insight 的靈活快速的 Netflow 分析器。若要使用 Insight，需要設定 Netflow 匯出器以在本機擷取 Netflow 資料。為此，請參閱 [設定 Netflow 導出器](<83 設定 Netflow 導出器.md>) 。

## User Interface｜使用者介面

Insight is a fully integrated part of OPNsense. Its User Interface is simple yet powerful. It can be accessed via Reporting ‣ Insight.

Insight 是 OPNsense 的一個完全整合部分。它的用戶介面簡潔而強大。可以透過「報告」‣「Insight」來存取它。

[![../../_images/insight_gui.png](<../images/65a29dcc-insight_gui.png>)](https://docs.opnsense.org/_images/insight_gui.png)

Insight offers a full set of analysis tools, ranging from a graphical overview to a csv exporter for further analysis with your favorite spreadsheet.

Insight 提供了一整套分析工具，從圖形概覽到 csv 匯出器，方便您使用自己喜歡的電子表格進行進一步分析。

## Graphs & Totals｜圖表與總計

The default view of Insight is the Top users and Graphical Overview. This view allows for quick examination of current and past flows, showing a graph for in and out going traffic for each configured interface.

Insight 的預設視圖是「熱門使用者和圖形概覽」。此視圖可以快速查看目前和歷史流量，並以圖表形式顯示每個已配置介面的入站和出站流量。

### Select Range & Resolution｜選擇範圍和分辨率

In the top right corner a selection can be made for the date range and accuracy (resolution) of the collected traffic flows.

在右上角可以選擇收集的交通流量的日期範圍和精確度（解析度）。

### View Type｜視圖類型

One can show the traffic flows in a stacked manner (default), as a stream or expanded to compare usage with different interfaces.

可以將流量以堆疊方式（預設）、串流或展開方式顯示，以便與不同介面的使用情況進行比較。

**Stacked**

**堆疊**

[![../../_images/stacked_view.png](<../images/5092703d-stacked_view.png>)](https://docs.opnsense.org/_images/stacked_view.png)

**Stream**

**溪流**

[![../../_images/stream_view.png](<../images/f0b0f1b4-stream_view.png>)](https://docs.opnsense.org/_images/stream_view.png)

**Expanded**

**擴充版**

[![../../_images/expanded_view.png](<../images/898a609f-expanded_view.png>)](https://docs.opnsense.org/_images/expanded_view.png)

### Interfaces｜介面

Clicking on an interface disables or enables the graph view, double clicking select only that interface.

按一下介面可停用或啟用圖形視圖，雙擊僅選擇該介面。

### Top Users｜熱門用戶

The top 25 users are shown for a selected interface, both for ports and ips within the previously selected date range.

針對選定的接口，顯示先前選定日期範圍內端口和 IP 位址使用次數排名前 25 的用戶。

### Interface Top｜介面頂部

Select the interface to see the top 25 users.

選擇介面查看排名前 25 名的用戶。

### Port Pie Chart｜港口圓餅圖

The port pie chart shows the percentage per port/application. One can change the view by clicking or double clicking on one of the shown port names/numbers.

連接埠餅圖顯示了每個連接埠/應用程式的百分比。按一下或雙擊顯示的連接埠名稱/編號即可變更視圖。

Clicking on a piece of the pie will open a detailed view for further analysis.

點擊圓餅圖中的某一部分，即可開啟詳細視圖進行進一步分析。

[![../../_images/pie_piece.png](<../images/adee58d7-pie_piece.png>)](https://docs.opnsense.org/_images/pie_piece.png) [![../../_images/pie_details.png](<../images/2c4cfc7b-pie_details.png>)](https://docs.opnsense.org/_images/pie_details.png)

### IP Addresses Pie Chart｜IP地址餅圖

The IP addresses pie chart works the same as the ports pie chart and shows the percentage per IP number. One can change the view by clicking or double clicking on one of the shown IP numbers.

地址餅圖IP的工作方式與連接埠餅圖相同，顯示每個位址IP的百分比。點選或雙擊顯示的位址IP即可變更視圖。

Clicking on a piece of the pie will open a detailed view for further analysis.

點擊圓餅圖中的某一部分，即可開啟詳細視圖進行進一步分析。

### Interface Totals｜介面總計

Not shown in the screenshot but latest version also includes a Total for the selected interface, shown are Packets (In, Out, Total) and Bytes (In, Out, Total).

截圖中未顯示，但最新版本還包含所選介面的總計，顯示資料包（入、出、總計）和位元組（入、出、總計）。

## Details View｜詳細資訊

One can open the details view by clicking on one of the pieces of a pie chart or click on the tab **Details**.

您可以透過點擊餅圖的某一部分或點擊「**詳細資料**」標籤來開啟詳細資料視圖。

When opening the details view by clicking on the tab one can make a new query.

點選標籤開啟詳細資料檢視後，即可建立新查詢。

[![../../_images/insight_details_view.png](<../images/a441d589-insight_details_view.png>)](https://docs.opnsense.org/_images/insight_details_view.png)

After selecting a valid date range (form/to) and interface one can further limit the output by filtering on port or IP address. Select the refresh icon to update the detailed output. Leave Port and Address empty for a full detailed listing.

選擇有效的日期範圍（起始日期/結束日期）和介面後，也可以透過按連接埠或IP位址篩選來進一步縮小輸出範圍。點擊刷新圖示即可更新詳細輸出。如果要查看完整詳細列表，請將連接埠和位址留空。

[![../../_images/insight_full_details.png](<../images/df772907-insight_full_details.png>)](https://docs.opnsense.org/_images/insight_full_details.png)

## Export View｜匯出視圖

The **Export** view allows you to export the data for further analysis in your favorite spreadsheet or other data analysis application.

透過**匯出**視圖，您可以將資料匯出到您喜歡的電子表格或其他資料分析應用程式中進行進一步分析。

[![../../_images/insight_export_view.png](<../images/d0f0cca9-insight_export_view.png>)](https://docs.opnsense.org/_images/insight_export_view.png)

To export data, select a **Collection** :

若要匯出數據，請選擇一個**集合**：

-   FlowSourceAddrTotals - Totals per source address  
    FlowSourceAddrTotals - 每個來源位址的總計
    
-   FlowInterfaceTotals - Totals per interface  
    FlowInterfaceTotals - 每個介面的總計
    
-   FlowDstPortTotals - Totals per destination port  
    FlowDstPortTotals - 每個目標連接埠的總計
    
-   FlowSourceAddrDetails - Full details per source address  
    FlowSourceAddrDetails - 每個來源位址的完整詳細信息
    

Select the **Resolution** in seconds (300,3600,86400)

選擇**解析度**（以秒為單位）（300,3600,86400）

Then select a date range (from/to) and click the **export** button.

然後選擇日期範圍（從/到），並點擊**匯出**按鈕。

[![../../_images/insight_export.png](<../images/9b12b991-insight_export.png>)](https://docs.opnsense.org/_images/insight_export.png)

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：System Health & Round Robin Data｜系統健康狀況和輪詢數據](<77 系統健康狀況和輪詢數據.md>)　｜　[下一篇：Netflow Export & Analyses｜Netflow 匯出與分析 ➡](<79 Netflow 匯出與分析.md>)
