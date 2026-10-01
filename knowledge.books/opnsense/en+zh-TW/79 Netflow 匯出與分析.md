---
title: "Netflow Export & Analyses｜Netflow 匯出與分析"
title_original: "Netflow Export & Analyses"
source: "https://docs.opnsense.org/manual/netflow.html"
chapter: ["Reporting"]
order: 79
lang: "bilingual"
translated_by: "google_v2"
captured: "2026-09-26T11:32:20.861Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Using Insight - Netflow Analyzer｜使用 Insight - Netflow 分析器](<78 使用 Insight - Netflow 分析器.md>)　｜　[下一篇：Reporting Settings｜報告設定 ➡](<80 報告設定.md>)

# Netflow Export & Analyses｜Netflow 匯出與分析

> 章節：[Reporting](<000 目錄.md#c-9>)

[![../_images/netflow_analyzer_insight.png](<../images/37faa6bb-netflow_analyzer_insight.png>)](https://docs.opnsense.org/_images/netflow_analyzer_insight.png)

Netflow is a monitoring feature, invented by Cisco, it is implemented in the FreeBSD kernel with ng\_netflow (Netgraph). Since Netgraph is a kernel implementation it is very fast with little overhead compared to softflowd or pfflowd.

Netflow 是 Cisco 發明的監控功能，它在 FreeBSD 核心中透過 ng_netflow（Netgraph）實現。由於 Netgraph 是核心級實現，因此與 softflowd 或 pfflowd 相比，它速度非常快，而且開銷也很小。

While many monitoring solutions such as Nagios, Cacti and vnstat only capture traffic statistics, Netflow captures complete packet flows including source, destination IP and port number.

雖然許多監控解決方案（如 Nagios、Cacti 和 vnstat）僅捕獲流量統計信息，但 Netflow 可以捕獲完整的包流，包括來源、目標IP和端口號。

OPNsense offers full support for exporting Netflow data to external collectors as well as a comprehensive Analyzer for on-the-box analysis and live monitoring.

OPNsense 提供將 Netflow 資料匯出到外部收集器的全面支持，以及用於機上分析和即時監控的綜合分析器。

OPNsense is the only open source solution with a built-in Netflow analyzer integrated into its Graphical User Interface. It can be accessed via Reporting ‣ Netflow.

OPNsense是唯一將內建Netflow分析器整合到圖形使用者介面中的開源解決方案。可透過「報告」‣「Netflow」存取。

## Supported Versions｜支援的版本

OPNsense support both Netflow version 5 (IPv4) and version 9 (IPv4 & IPv6).

OPNsense 同時支援 Netflow 版本 5 (IPv4) 和版本 9 (IPv4 和 IPv6)。

## Netflow Basics｜Netflow基礎知識

For analyzing the flow data it is important to understand the difference between ingress and egress traffic.

要分析流量數據，了解流入流量和流出流量之間的差異非常重要。

### Ingress

Traffic to or coming from the firewall.

進出防火牆的流量。

### Egress｜出口

Traffic passing through the firewall.

通過防火牆的流量。

### Ingress + Egress = Double flow count｜入口流量 + 出口流量 = 雙倍流量

When enabling both ingress and egress, traffic gets counted double due to Network Address Translation as all packets going to the WAN coming from the LAN pass the Network translation of the firewall therefore also creating an ingress flow.

當同時啟用入口和出口時，由於網路位址轉換，流量會被計算兩次，因為所有發送到WAN LAN都會經過防火牆的網路位址轉換，因此也會產生一個入口流量。

If you are not interested in ingress traffic then OPNsense offers the option to filter this traffic. When utilizing a proxy on the same device its important to capture the ingress flows as well, otherwise all proxy traffic won’t be visible. Downside is of course that all traffic not passing the proxy will be counted twice due to the mentioned NAT effect.

如果您對入站流量不感興趣，OPNsense 提供了過濾該流量的選項。在同一裝置上使用代理程式時，請務必擷取入站流量，否則所有代理流量將不可見。缺點是，由於前面提到的NAT效應，所有未經過代理的流量都會重複計數。

## Netflow Exporter｜Netflow 匯出器

OPNsense Netflow Exporter supports multiple interfaces, filtering of ingress flows and multiple destinations including local capture for analysis by Insight (OPNsense Netflow Analyzer).

OPNsense Netflow Exporter 支援多個介面、入口流過濾和多個目標，包括本地捕獲以供 Insight（OPNsense Netflow Analyzer）分析。

[![../_images/netflow_exporter1.png](<../images/40d7f9fc-netflow_exporter1.png>)](https://docs.opnsense.org/_images/netflow_exporter1.png)

## Netflow Analyzer - Insight｜Netflow 分析器 - 洞察

OPNsense offers a full Netflow Analyzer with the following features:

OPNsense 提供功能齊全的 Netflow 分析器，具有以下功能：

-   Captures 5 detail levels  
    捕捉 5 個細節層次
    
    > -   Last 2 hours, 30 second average  
          過去2小時30秒平均值
    >     
    > -   Last 8 hours, 5 minute average  
          過去 8 小時 5 分鐘平均值
    >     
    > -   Last week, 1 hour average  
          上週，平均每小時 1 小時
    >     
    > -   Last month, 24 hour average  
          上個月，24小時平均值
    >     
    > -   Last year, 24 hour average  
          去年，24小時平均值
    >     
    
-   Graphical representation of flows (stacked, stream and expanded)  
    流程的圖形表示（堆疊式、串流式和展開式）
    
-   Top usage per interface, both ips and ports.  
    每個介面的使用率最高值，包括 IP 位址和連接埠。
    
-   Full in/out traffic in packets and bytes  
    資料包和位元組的完整入/出流量
    
-   Detailed view with date selection and port/ip filter (up to 2 months)  
    查看詳細視圖，可選擇日期和連接埠/IP位址（最多2個月）
    
-   Data export to csv for offline analysis  
    資料匯出為 CSV 檔案以進行離線分析
    
    > -   Selectable Detail Level  
          可選細節級別
    >     
    > -   Selectable Resolution  
          可選解析度
    >     
    > -   Selectable Dat range  
          可選資料範圍
    >     
    

![../_images/netflow_insight_details.png](<../images/9ca292b5-netflow_insight_details.png>)

## Configuration｜配置

### Setup Netflow Exporter｜設定 Netflow 導出器

See [Configure Netflow Exporter](<83 設定 Netflow 導出器.md>)

請參閱[設定 Netflow 導出器](<83 設定 Netflow 導出器.md>)

### Setup Insight｜設定洞察

See [Using Insight - Netflow Analyzer](<78 使用 Insight - Netflow 分析器.md>)

請參閱[使用 Insight - Netflow 分析器](<78 使用 Insight - Netflow 分析器.md>)

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Using Insight - Netflow Analyzer｜使用 Insight - Netflow 分析器](<78 使用 Insight - Netflow 分析器.md>)　｜　[下一篇：Reporting Settings｜報告設定 ➡](<80 報告設定.md>)
