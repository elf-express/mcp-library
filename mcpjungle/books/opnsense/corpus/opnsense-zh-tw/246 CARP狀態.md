---
title: "CARP狀態"
title_original: "CARP status"
source: https://docs.opnsense.org/development/backend/carp.html
chapter: ["Development Manual","Backend"]
order: 246
lang: "zh-TW"
translated_by: "gtx"
captured: "2026-09-26T11:33:46.436Z"
---

# CARP狀態

## 一般

CARP（通用位址冗餘協定）協定是防火牆的一個非常強大的功能，它允許多台機器彼此共用 IPv4 / IPv6 位址。

為了確定主機是否應該成為主機，它會在網路上偵聽 carp 廣播資料包，並確定其優先順序是否高於網路上的其他主機（廣告頻率最高的獲勝）。

較高的 advskew（廣告頻率偏差）將降低其廣告並降低節點作為主節點的吸引力。

結合`advskew`值，系統還使用目前降級值（`sysctl net.inet.carp.demotion`），該值將加入GUI中的預設`advskew`中。該值告知使用者節點的健康狀況。當它的值為`0`時，一切正常，當拔掉某些電纜時，它會向「降級計數器」添加一個值。

預設情況下，核心中提供以下降級事件。

-   介面關閉 (net.inet.carp.ifdown\_demotion\_factor)
    
-   發送公告時發生錯誤 (net.inet.carp.senderr\_demotion\_factor)
    
-   忙於處理 pfsync 更新 (net.pfsync.carp\_demotion\_factor)
    

## 客製化服務掛鉤

在某些情況下，節點的狀態應該受到電腦上的服務的影響，例如，當動態路由系統尚未初始化時，最好在傳播之前等待，因為這是叢集中更好的替代方案。

這種機制應該與 pfsync 可用的機制相當（當狀態同步時，我們使用 `net.pfsync.carp_demotion_factor` 中的值以更高的 `advskew` 進行傳播）

服務狀態掛鉤的想法是將服務檢查腳本註冊到單一目錄中並驗證整體狀態（如果任何測試腳本失敗，我們為「服務」添加降級因素）。

注意事項

這個鉤子的一些靈感來自於 OpenBSD 如何處理 ospfd 中的降級（[https://man.openbsd.org/ospfd.conf.5](https://man.openbsd.org/ospfd.conf.5) –> demote）

要建立新的測試，只需在以下目錄中新增可執行腳本，如果一切正常且出現問題時退出 `0`（例如 `exit 1`）。

```
/usr/local/etc/rc.carp_service_status.d/<service_test>
```

提示

確保測試腳本盡可能輕量，這樣就不會介意它們的運行頻率超過嚴格需求的頻率。

注意事項

當其中一項服務未通過測試時，我們使用高降級值 (\\(2^{20}\\))，因此我們不需要記住當前狀態（讀取 `sysctl net.inet.carp.demotion` 就足夠了），並且可以使用按位 `and` 來檢查它是否已設定。

總是報告服務已關閉的簡單測試可以簡單如下：

/usr/local/etc/rc.carp\_service\_status.d/test\_service

```bash
#!/bin/sh

exit 1
```

### 觸發事件

要要求系統再次評估狀態，我們應該使用 configd 呼叫 `carp_service_status` 腳本，這樣我們就不需要成為 root 來觸發測試。

```
configctl interface update carp service_status
```

注意事項

使用此設施的服務應在正常操作進行後自行發出此事件。

### 記錄

Carp 狀態變更通常會記錄到 syslog（系統 ‣ 日誌檔案 ‣ 常規），我們的 carp 服務狀態檢查也是如此。

安裝測試服務範例後，我們期望在觸發事件後出現如下所示的日誌行：

```
....  OPNsense carp: carp demoted by 1048576 due to service disruption (services: test_service)
```

這會告知用戶降級的數量以及哪些服務負責降級。

當服務狀態再次恢復時，它會向 syslog 發送類似以下內容。

```
..... carp promoted by 1048576 due to service recovery
```