---
title: "Using Insight - Netflow Analyzer"
source: "https://docs.opnsense.org/manual/how-tos/insight.html"
chapter: ["Reporting"]
order: 78
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:32:19.347Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：System Health & Round Robin Data](<77 System Health & Round Robin Data.md>)　｜　[下一篇：Netflow Export & Analyses ➡](<79 Netflow Export & Analyses.md>)

# Using Insight - Netflow Analyzer

> 章節：[Reporting](<000 目錄.md#c-9>)

OPNsense is equipped with a flexible and fast Netflow Analyzer called Insight. To use Insight, one needs to configure the Netflow exporter for local capturing of Netflow data. To do so take a look at [Configure Netflow Exporter](<83 Configure Netflow Exporter.md>).

## User Interface

Insight is a fully integrated part of OPNsense. Its User Interface is simple yet powerful. It can be accessed via Reporting ‣ Insight.

[![../../_images/insight_gui.png](<../images/65a29dcc-insight_gui.png>)](https://docs.opnsense.org/_images/insight_gui.png)

Insight offers a full set of analysis tools, ranging from a graphical overview to a csv exporter for further analysis with your favorite spreadsheet.

## Graphs & Totals

The default view of Insight is the Top users and Graphical Overview. This view allows for quick examination of current and past flows, showing a graph for in and out going traffic for each configured interface.

### Select Range & Resolution

In the top right corner a selection can be made for the date range and accuracy (resolution) of the collected traffic flows.

### View Type

One can show the traffic flows in a stacked manner (default), as a stream or expanded to compare usage with different interfaces.

**Stacked**

[![../../_images/stacked_view.png](<../images/5092703d-stacked_view.png>)](https://docs.opnsense.org/_images/stacked_view.png)

**Stream**

[![../../_images/stream_view.png](<../images/f0b0f1b4-stream_view.png>)](https://docs.opnsense.org/_images/stream_view.png)

**Expanded**

[![../../_images/expanded_view.png](<../images/898a609f-expanded_view.png>)](https://docs.opnsense.org/_images/expanded_view.png)

### Interfaces

Clicking on an interface disables or enables the graph view, double clicking select only that interface.

### Top Users

The top 25 users are shown for a selected interface, both for ports and ips within the previously selected date range.

### Interface Top

Select the interface to see the top 25 users.

### Port Pie Chart

The port pie chart shows the percentage per port/application. One can change the view by clicking or double clicking on one of the shown port names/numbers.

Clicking on a piece of the pie will open a detailed view for further analysis.

[![../../_images/pie_piece.png](<../images/adee58d7-pie_piece.png>)](https://docs.opnsense.org/_images/pie_piece.png) [![../../_images/pie_details.png](<../images/2c4cfc7b-pie_details.png>)](https://docs.opnsense.org/_images/pie_details.png)

### IP Addresses Pie Chart

The IP addresses pie chart works the same as the ports pie chart and shows the percentage per IP number. One can change the view by clicking or double clicking on one of the shown IP numbers.

Clicking on a piece of the pie will open a detailed view for further analysis.

### Interface Totals

Not shown in the screenshot but latest version also includes a Total for the selected interface, shown are Packets (In, Out, Total) and Bytes (In, Out, Total).

## Details View

One can open the details view by clicking on one of the pieces of a pie chart or click on the tab **Details**.

When opening the details view by clicking on the tab one can make a new query.

[![../../_images/insight_details_view.png](<../images/a441d589-insight_details_view.png>)](https://docs.opnsense.org/_images/insight_details_view.png)

After selecting a valid date range (form/to) and interface one can further limit the output by filtering on port or IP address. Select the refresh icon to update the detailed output. Leave Port and Address empty for a full detailed listing.

[![../../_images/insight_full_details.png](<../images/df772907-insight_full_details.png>)](https://docs.opnsense.org/_images/insight_full_details.png)

## Export View

The **Export** view allows you to export the data for further analysis in your favorite spreadsheet or other data analysis application.

[![../../_images/insight_export_view.png](<../images/d0f0cca9-insight_export_view.png>)](https://docs.opnsense.org/_images/insight_export_view.png)

To export data, select a **Collection** :

-   FlowSourceAddrTotals - Totals per source address
    
-   FlowInterfaceTotals - Totals per interface
    
-   FlowDstPortTotals - Totals per destination port
    
-   FlowSourceAddrDetails - Full details per source address
    

Select the **Resolution** in seconds (300,3600,86400)

Then select a date range (from/to) and click the **export** button.

[![../../_images/insight_export.png](<../images/9b12b991-insight_export.png>)](https://docs.opnsense.org/_images/insight_export.png)

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：System Health & Round Robin Data](<77 System Health & Round Robin Data.md>)　｜　[下一篇：Netflow Export & Analyses ➡](<79 Netflow Export & Analyses.md>)
