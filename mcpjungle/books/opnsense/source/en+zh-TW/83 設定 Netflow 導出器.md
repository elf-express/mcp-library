---
title: "Configure Netflow Exporter｜設定 Netflow 導出器"
title_original: "Configure Netflow Exporter"
source: "https://docs.opnsense.org/manual/how-tos/netflow_exporter.html"
chapter: ["Reporting","Setup guides"]
order: 83
lang: "bilingual"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:32:21.871Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Reporting Unbound DNS｜報告 Unbound DNS](<82 報告 Unbound DNS.md>)　｜　[下一篇：System｜系統 ➡](<84 系統.md>)

# Configure Netflow Exporter｜設定 Netflow 導出器

> 章節：[Reporting](<000 目錄.md#c-9>) › [Setup guides](<000 目錄.md#c-10>)

![../../_images/netflow_exporter.png](<../images/9032c503-netflow_exporter.png>)

Configuring the Netflow Exporter is a simple task. Go to Reporting ‣ NetFlow.

設定 NetFlow 匯出器非常簡單。前往“報告”‣“NetFlow”。

Select all **Interfaces** you want to collect/export data from, usually one would select all available interfaces here.

選擇所有要從中收集/匯出資料的**介面**，通常情況下，這裡會選擇所有可用的介面。

If you do not want to record traffic originating or going to the firewall itself then add the interfaces to **Egress only** to prevent double counting of the same traffic flow (See also [Netflow Export & Analyses](<79 Netflow 匯出與分析.md>) for more information).

如果您不想記錄源自或發送到防火牆本身的流量，請將介面新增至**僅出口**，以防止對同一流量進行重複計數（有關更多信息，另請參閱[Netflow 匯出和分析](<79 Netflow 匯出與分析.md>) ）。

For local analysis using Insight also enable **Capture local**.

要使用 Insight 進行本地分析，也要啟用**捕獲本地**。

Depending on the application you would like to use select **Version** 5 or 9. Remember that version 5 does not support IPv6.

根據您要使用的應用程序，選擇 **版本** 5 或 9。請記住，版本 5 不支援 IPv6。

Add your **Destinations** (ip:port then enter) local IP will be added automatically if Capture local is selected.

新增您的**目標**（ip:端口，然後輸入）本地IP如果選擇捕獲本地，則會自動新增。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Reporting Unbound DNS｜報告 Unbound DNS](<82 報告 Unbound DNS.md>)　｜　[下一篇：System｜系統 ➡](<84 系統.md>)
