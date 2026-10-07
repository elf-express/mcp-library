---
title: "Netflow 匯出與分析"
title_original: "Netflow Export & Analyses"
source: https://docs.opnsense.org/manual/netflow.html
chapter: ["Reporting"]
order: 79
lang: "zh-TW"
translated_by: "google_v2"
captured: "2026-09-26T11:32:20.861Z"
---


# Netflow 匯出與分析


[圖：../_images/netflow_analyzer_insight.png](https://docs.opnsense.org/_images/netflow_analyzer_insight.png)

Netflow 是 Cisco 發明的監控功能，它在 FreeBSD 核心中透過 ng_netflow（Netgraph）實現。由於 Netgraph 是核心級實現，因此與 softflowd 或 pfflowd 相比，它速度非常快，而且開銷也很小。

雖然許多監控解決方案（如 Nagios、Cacti 和 vnstat）僅捕獲流量統計信息，但 Netflow 可以捕獲完整的包流，包括來源、目標IP和端口號。

OPNsense 提供將 Netflow 資料匯出到外部收集器的全面支持，以及用於機上分析和即時監控的綜合分析器。

OPNsense是唯一將內建Netflow分析器整合到圖形使用者介面中的開源解決方案。可透過「報告」‣「Netflow」存取。

## 支援的版本

OPNsense 同時支援 Netflow 版本 5 (IPv4) 和版本 9 (IPv4 和 IPv6)。

## Netflow基礎知識

要分析流量數據，了解流入流量和流出流量之間的差異非常重要。

### Ingress

進出防火牆的流量。

### 出口

通過防火牆的流量。

### 入口流量 + 出口流量 = 雙倍流量

當同時啟用入口和出口時，由於網路位址轉換，流量會被計算兩次，因為所有發送到WAN LAN都會經過防火牆的網路位址轉換，因此也會產生一個入口流量。

如果您對入站流量不感興趣，OPNsense 提供了過濾該流量的選項。在同一裝置上使用代理程式時，請務必擷取入站流量，否則所有代理流量將不可見。缺點是，由於前面提到的NAT效應，所有未經過代理的流量都會重複計數。

## Netflow 匯出器

OPNsense Netflow Exporter 支援多個介面、入口流過濾和多個目標，包括本地捕獲以供 Insight（OPNsense Netflow Analyzer）分析。

[圖：../_images/netflow_exporter1.png](https://docs.opnsense.org/_images/netflow_exporter1.png)

## Netflow 分析器 - 洞察

OPNsense 提供功能齊全的 Netflow 分析器，具有以下功能：

-   捕捉 5 個細節層次
    
    > -   過去2小時30秒平均值
    >     
    > -   過去 8 小時 5 分鐘平均值
    >     
    > -   上週，平均每小時 1 小時
    >     
    > -   上個月，24小時平均值
    >     
    > -   去年，24小時平均值
    >     
    
-   流程的圖形表示（堆疊式、串流式和展開式）
    
-   每個介面的使用率最高值，包括 IP 位址和連接埠。
    
-   資料包和位元組的完整入/出流量
    
-   查看詳細視圖，可選擇日期和連接埠/IP位址（最多2個月）
    
-   資料匯出為 CSV 檔案以進行離線分析
    
    > -   可選細節級別
    >     
    > -   可選解析度
    >     
    > -   可選資料範圍
    >     
    



## 配置

### 設定 Netflow 導出器

請參閱[設定 Netflow 導出器](<83 設定 Netflow 導出器.md>)

### 設定洞察

請參閱[使用 Insight - Netflow 分析器](<78 使用 Insight - Netflow 分析器.md>)

---

