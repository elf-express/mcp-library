---
title: "Zenarmor (Sensei) Hardware Requirements｜Zenarmor（Sensei）硬體需求"
title_original: "Zenarmor (Sensei) Hardware Requirements"
source: "https://docs.opnsense.org/vendor/sunnyvalley/zenarmor_hardwarerequirements.html"
chapter: ["Third-party Plugins","Sunnyvalley"]
order: 219
lang: "bilingual"
translated_by: "google_v2"
captured: "2026-09-26T11:33:31.784Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Zenarmor (Sensei) Overview｜Zenarmor（Sensei）概述](<218 Zenarmor（Sensei）概述.md>)　｜　[下一篇：Zenarmor (Sensei) Installing via Web Interface｜Zenarmor（Sensei）透過網頁介面安裝 ➡](<220 Zenarmor（Sensei）透過網頁介面安裝.md>)

# Zenarmor (Sensei) Hardware Requirements｜Zenarmor（Sensei）硬體需求

> 章節：[Third-party Plugins](<000 目錄.md#c-47>) › [Sunnyvalley](<000 目錄.md#c-48>)

## Zenarmor (Sensei): Hardware Requirements｜Zenarmor（Sensei）：硬體需求

Due to the nature of deep packet analysis and detailed drill-down reporting functionality, Zenarmor requires more hardware resources than a standard L3-L4 firewall.

由於深度資料包分析和詳細的向下鑽取報告功能的特性，Zenarmor 需要比標準 L3-L4 防火牆更多的硬體資源。

> **Note**
>
> **筆記**
> 
> > With the Sensei 1.5 release, you can offload your reporting database to an external system. This allows you to run Zenarmor on systems with a constrained amount of RAM.
> >
> > 使用 Sensei 1.5版本，您可以將報表資料庫卸載到外部系統。這使得您可以在RAM數量有限的系統上運行 Zenarmor。

It is recommended that you check if your Ethernet adapter functions well with Netmap.

建議您使用 Netmap 檢查您的乙太網路適配器是否正常運作。

## CPU & Memory｜CPU & 內存

Because the analytics module relies on Elasticsearch to process large amounts of data, the amount of memory available in the system is crucial for the overall performance of Zenarmor.

由於分析模組依賴 Elasticsearch 來處理大量數據，因此系統中的可用記憶體量對於 Zenarmor 的整體效能至關重要。

**Tip**

**提示**

> If the number of active devices is more than 500 and the sustained WAN bandwidth is higher than 500 Mbps, we do not recommend deploying Zenarmor as a virtual guest since resources in virtual environments are generally shared between guest systems.
>
> 如果活躍設備數量超過 500 個，且持續的WAN頻寬高於 500 Mbps，我們不建議將 Zenarmor 部署為虛擬客戶機，因為虛擬環境中的資源通常在客戶機系統之間共用。

Below is the recommended minimum hardware requirements for Zenarmor based on the number of devices and the amount of sustained bandwidth:

以下是根據設備數量和持續頻寬計算出的 Zenarmor 推薦最低硬體要求：

|   |   |   |   |
| --- | --- | --- | --- |
| **\# Active Devices**<br>**活動裝置數** | **Maximum WAN Bandwidth**<br>**最大WAN頻寬** | **Minimum Memory**<br>**最小記憶體** | **Minimum CPU**<br>**最小CPU ** |
| 0-50 | 300 Mbps | 1 GB | A Dual-Core CPU (x86\_64 compatible, single core PassMark score of 200)<br>雙核CPU （x86\_64 相容，單核 PassMark 得分 200） |
| 50-100 | 500 Mbps - 10 Kpps | 4 GB | Intel Dual-Core i3 2.0 GHz (2 Cores, 4 Threads) or equivalent<br>英特爾雙核心 i3 2.0 GHz（2 核心 4 執行緒）或同等處理器 |
| 100-250 | 1 Gbps - 20 Kpps | 8 GB | Intel Dual-Core i5 2.2 GHz (2 Cores, 4 Threads) or equivalent<br>英特爾雙核心 i5 2.2 GHz（2 核心 4 執行緒）或同等處理器 |
| 250-1000 | 1-2 Gbps 40 Kpps | 16 GB | Intel Dual-Core i5 3.20 GHz (2 Cores, 4 Threads) or equivalent<br>英特爾雙核心 i5 3.20 GHz（2 核心 4 執行緒）或同等處理器 |
| 1000-2000 | 1-2 Gbps | 32 GB | Intel Quad-Core i7 3.40 GHz (4 Cores, 8 Threads) or equivalent<br>英特爾四核心 i7 3.40 GHz（4 核心 8 執行緒）或同等處理器 |
| 2000+ | 2-4.5 Gbps<br>2- 4.5 Gbps | 64 GB | Intel Quad-Core i9 3.0 GHz (24 Cores, 48 Threads) or equivalent<br>英特爾四核心 i9 3.0 GHz（24 核，48 執行緒）或同等處理器 |

> **Note**
>
> **筆記**
> 
> > Zenarmor requires at least 1 GB of memory. The installer will not continue if you have less than 1 GB of RAM. We recommend 8 GB memory to have an exceptional reporting experience with the elasticsearch database.
> >
> > Zenarmor 至少需要 1 GB內存。若記憶體不足 1 GB RAM ，安裝程式將無法繼續。我們建議使用 8 GB內存，以獲得使用 Elasticsearch 資料庫的卓越報表體驗。

## Ethernet Adapter｜乙太網路適配器

Zenarmor uses a FreeBSD subsystem called [netmap(4)](https://www.freebsd.org/cgi/man.cgi?query=netmap&sektion=4) to access raw Ethernet frames. With FreeBSD 11 (OPNsense version <= 20.1) this software can be very particular in terms of proper driver compatibility.

Zenarmor 使用名為 [netmap(4)](https://www.freebsd.org/cgi/man.cgi?query=netmap&sektion=4)的 FreeBSD 子系統來存取原始乙太網路封包。在 FreeBSD 11（OPNsense 版本 <= 20.1 ）中，該軟體對驅動程式的相容性要求非常高。

Intel-based adapters, particularly em(4) and igb(4), are observed to perform well in terms of stability and performance.

根據觀察，基於 Intel 的適配器，特別是 em(4) 和 igb(4)，在穩定性和性能方面表現良好。

Sunny Valley Networks is sponsoring developments on this project so you can expect netmap(4) will better support a wide range of Ethernet drivers.

Sunny Valley Networks 正在贊助該專案的開發，因此您可以期待 netmap(4) 將更好地支援各種乙太網路驅動程式。

## Disk Space｜磁碟空間

Zenarmor uses [Elasticsearch](https://en.wikipedia.org/wiki/Elasticsearch) or [MongoDB](https://www.mongodb.com/) as its backend to store large data sets. Please allow at least 5 MB of disk space per hour per megabit/second throughput.

Zenarmor 使用 Elasticsearch (https://en.wikipedia.org/wiki/Elasticsearch)或 MongoDB (https://www.mongodb.com/)作為後端來儲存大型資料集。請為每兆位元/秒的吞吐量每小時至少預留 5 MB的磁碟空間。

If you’re running a 100 Mbps link (about 100 users) that is quite active during the daytime and idle the rest of the day, you may calculate the space needed as follows:

如果您運行的是 100 Mbps 的連結（大約 100 個用戶），白天非常活躍，其餘時間則處於空閒狀態，您可以如下計算所需空間：

```
5 MB x 12 hours x 100 Mbps = 6 GB per day.
6 GB x 7 days a week = 42 GB per week.
42 x 4 weeks a month = 168 GB per month.
```

As of [version 0.7.0](https://www.zenarmor.com/docs/support/release-notes#07), Zenarmor expires old report data to free up disk space for the most recent data based on the configured number of days of history to keep.

從 [版本0.7.0](https://www.zenarmor.com/docs/support/release-notes#07)開始，Zenarmor 會根據配置保留的歷史天數，使舊的報告資料過期，從而為最新資料釋放磁碟空間。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Zenarmor (Sensei) Overview｜Zenarmor（Sensei）概述](<218 Zenarmor（Sensei）概述.md>)　｜　[下一篇：Zenarmor (Sensei) Installing via Web Interface｜Zenarmor（Sensei）透過網頁介面安裝 ➡](<220 Zenarmor（Sensei）透過網頁介面安裝.md>)
