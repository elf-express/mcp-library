---
title: "Zenarmor（Sensei）硬體需求"
title_original: "Zenarmor (Sensei) Hardware Requirements"
source: https://docs.opnsense.org/vendor/sunnyvalley/zenarmor_hardwarerequirements.html
chapter: ["Third-party Plugins","Sunnyvalley"]
order: 219
lang: "zh-TW"
translated_by: "google_v2"
captured: "2026-09-26T11:33:31.784Z"
---

# Zenarmor（Sensei）硬體需求

## Zenarmor（Sensei）：硬體需求

由於深度資料包分析和詳細的向下鑽取報告功能的特性，Zenarmor 需要比標準 L3-L4 防火牆更多的硬體資源。

> **筆記**
> 
> > 使用 Sensei 1.5版本，您可以將報表資料庫卸載到外部系統。這使得您可以在RAM數量有限的系統上運行 Zenarmor。

建議您使用 Netmap 檢查您的乙太網路適配器是否正常運作。

## CPU & 內存

由於分析模組依賴 Elasticsearch 來處理大量數據，因此系統中的可用記憶體量對於 Zenarmor 的整體效能至關重要。

**提示**

> 如果活躍設備數量超過 500 個，且持續的WAN頻寬高於 500 Mbps，我們不建議將 Zenarmor 部署為虛擬客戶機，因為虛擬環境中的資源通常在客戶機系統之間共用。

以下是根據設備數量和持續頻寬計算出的 Zenarmor 推薦最低硬體要求：

|   |   |   |   |
| --- | --- | --- | --- |
| **活動設備數**|**最大WAN頻寬**|**最小記憶體**|**最小CPU ** |
| 0-50 | 300 Mbps | 1 GB | 雙核CPU （x86\_64 相容，單核 PassMark 得分 200） |
| 50-100 | 500 Mbps - 10 Kpps | 4 GB | 英特爾雙核心 i3 2.0 GHz（2 核心 4 執行緒）或同等處理器 |
| 100-250 | 1 Gbps - 20 Kpps | 8 GB | 英特爾雙核心 i5 2.2 GHz（2 核心 4 執行緒）或同等處理器 |
| 250-1000 | 1-2 Gbps 40 Kpps | 16 GB | 英特爾雙核心 i5 3.20 GHz（2 核心 4 執行緒）或同等處理器 |
| 1000-2000 | 1-2 Gbps | 32 GB | 英特爾四核心 i7 3.40 GHz（4 核心 8 執行緒）或同等處理器 |
| 2000+ | 2- 4.5 Gbps | 64 GB | 英特爾四核心 i9 3.0 GHz（24 核，48 執行緒）或同等處理器 |

> **筆記**
> 
> > Zenarmor 至少需要 1 GB內存。若記憶體不足 1 GB RAM ，安裝程式將無法繼續。我們建議使用 8 GB內存，以獲得使用 Elasticsearch 資料庫的卓越報表體驗。

## 乙太網路適配器

Zenarmor 使用名為 [netmap(4)](https://www.freebsd.org/cgi/man.cgi?query=netmap&sektion=4)的 FreeBSD 子系統來存取原始乙太網路封包。在 FreeBSD 11（OPNsense 版本 <= 20.1 ）中，該軟體對驅動程式的相容性要求非常高。

根據觀察，基於 Intel 的適配器，特別是 em(4) 和 igb(4)，在穩定性和性能方面表現良好。

Sunny Valley Networks 正在贊助該專案的開發，因此您可以期待 netmap(4) 將更好地支援各種乙太網路驅動程式。

## 磁碟空間

Zenarmor 使用 Elasticsearch (https://en.wikipedia.org/wiki/Elasticsearch)或 MongoDB (https://www.mongodb.com/)作為後端來儲存大型資料集。請為每兆位元/秒的吞吐量每小時至少預留 5 MB的磁碟空間。

如果您使用的是 100 Mbps 的連結（大約 100 個使用者），白天非常活躍，其餘時間則處於空閒狀態，您可以如下計算所需的空間：

```
5 MB x 12 hours x 100 Mbps = 6 GB per day.
6 GB x 7 days a week = 42 GB per week.
42 x 4 weeks a month = 168 GB per month.
```

從 [版本0.7.0](https://www.zenarmor.com/docs/support/release-notes#07)開始，Zenarmor 會根據配置保留的歷史天數，使舊的報告資料過期，從而為最新資料釋放磁碟空間。