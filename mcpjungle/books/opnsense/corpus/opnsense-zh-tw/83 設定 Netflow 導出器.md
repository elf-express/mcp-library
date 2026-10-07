---
title: "設定 Netflow 導出器"
title_original: "Configure Netflow Exporter"
source: https://docs.opnsense.org/manual/how-tos/netflow_exporter.html
chapter: ["Reporting","Setup guides"]
order: 83
lang: "zh-TW"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:32:21.871Z"
---

# 設定 Netflow 導出器



設定 NetFlow 匯出器非常簡單。前往“報告”‣“NetFlow”。

選擇所有要從中收集/匯出資料的**介面**，通常情況下，這裡會選擇所有可用的介面。

如果您不想記錄源自或發送到防火牆本身的流量，請將介面新增至**僅出口**，以防止對同一流量進行重複計數（有關更多信息，另請參閱[Netflow 匯出和分析](<79 Netflow 匯出與分析.md>) ）。

要使用 Insight 進行本地分析，也要啟用**捕獲本地**。

根據您要使用的應用程序，選擇 **版本** 5 或 9。請記住，版本 5 不支援 IPv6。

新增您的**目標**（ip:端口，然後輸入）本地IP如果選擇捕獲本地，則會自動新增。