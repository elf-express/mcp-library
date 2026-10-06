---
title: "CARP status｜CARP狀態"
title_original: "CARP status"
source: "https://docs.opnsense.org/development/backend/carp.html"
chapter: ["Development Manual","Backend"]
order: 246
lang: "bilingual"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:33:46.436Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Bootup autorun options｜啟動自動運行選項](<245 啟動自動運行選項.md>)　｜　[下一篇：Using configd｜使用 configd ➡](<247 使用 configd.md>)

# CARP status｜CARP狀態

> 章節：[Development Manual](<000 目錄.md#c-52>) › [Backend](<000 目錄.md#c-54>)

## General｜一般的

The CARP (Common Address Redundancy Protocol) protocol is quite a powerful feature of the firewall, which allows multiple machines to share IPv4 / IPv6 addresses among each other.

CARP （通用位址冗餘協定）協定是防火牆的非常強大的功能，它允許多台機器彼此共用 IPv4 / IPv6 位址。

To determine if a host should be master, it listens on the network for carp broadcast packets and determines if its priority is higher than the others on the network (the highest advertising frequency wins).

為了確定主機是否應該成為主主機，它會在網路上監聽 carp 廣播資料包，並確定其優先順序是否高於網路上的其他主機（廣播頻率最高的主機獲勝）。

A higher advskew (Advertising Frequency Skew) will lower its advertisements and renders the node less attractive of being a master.

廣告頻率偏差（advskew）越高，其廣告投放量就越少，節點作為主節點的吸引力就越低。

Combined with the `advskew` value, the system also uses the current demotion value (`sysctl net.inet.carp.demotion`) which will be added to its preset `advskew` in the gui. This value informs the user about the health of the node. When its value is `0`, all is ok, when some cable is unplugged it will for example add a value to the “demotion counter”.

系統結合`advskew`值，也會使用目前的降級值（ `sysctl net.inet.carp.demotion` ），並將其加入圖形使用者介面（GUI）中的預設`advskew`中。該值用於告知使用者節點的健康狀況。當其值為`0`時，一切正常；例如，當某個電纜被拔出時，系統會將一個值加到「降級計數器」中。

The following demotion events are available by default in the kernel.

內核預設提供以下降級事件。

-   Interface down (net.inet.carp.ifdown\_demotion\_factor)  
    介面關閉（net.inet.carp.ifdown\_demotion\_factor）
    
-   Error sending announcements (net.inet.carp.senderr\_demotion\_factor)  
    發送公告時發生錯誤 (net.inet.carp.sender\_demotion\_factor)
    
-   Busy processing pfsync updates (net.pfsync.carp\_demotion\_factor)  
    正在處理 pfsync 更新 (net.pfsync.carp\_demotion\_factor)
    

## Custom service hooks｜客製化服務鉤子

In some cases the status of the node should be influenced by the services on the machine, for example when a dynamic routing system isn’t initialized yet, it might be better to wait before propagating as being a better alternative in the cluster.

在某些情況下，節點的狀態應該受到機器上服務的影響，例如，當動態路由系統尚未初始化時，最好等待一段時間再將其傳播為叢集中更好的替代方案。

This mechanism should be comparable to what is available for pfsync ( when states are being synced, we propagate with a higher `advskew` using the value in `net.pfsync.carp_demotion_factor`)

此機制應與 pfsync 的機制類似（當狀態同步時，我們使用`net.pfsync.carp_demotion_factor`中的值，以更高的`advskew`進行傳播）。

The idea of the service status hook is to register service check scripts into a single directory and validate status as a whole (if any of the test scripts fail, we add a demotion factor for “services”).

服務狀態鉤子的想法是將服務檢查腳本註冊到單一目錄中，並驗證整體狀態（如果任何測試腳本失敗，我們將為「服務」添加降級因子）。

Note

筆記

Some inspiration for this hook came from how OpenBSD handles demotion in ospfd ([https://man.openbsd.org/ospfd.conf.5](https://man.openbsd.org/ospfd.conf.5) –> demote)

這個鉤子的設計靈感部分來自 OpenBSD 在 ospfd 中處理降級的方式（[https://man.openbsd.org/ospfd.conf.5](https://man.openbsd.org/ospfd.conf.5) –> 降級）

To create new tests, just add executable scripts in the following directory, which exits `0` if all is good and something other than 0 on issues (e.g. `exit 1`).

要建立新的測試，只需在以下目錄中新增可執行腳本，如果一切正常且出現問題時退出 `0`（例如 `exit 1`）。

```
/usr/local/etc/rc.carp_service_status.d/<service_test>
```

Tip

提示

Make sure test scripts are as lightweight as possible, so it wouldn’t mind of they run more often than strictly needed.

確保測試腳本盡可能輕量級，這樣即使運行頻率高於實際需求也不會造成問題。

Note

筆記

We use a high demotion value (\\(2^{20}\\)) when one of the services fails its test, so we don’t need to remember our current state (reading `sysctl net.inet.carp.demotion` would be enough) and can use a bitwise `and` to check if it’s set.

當某個服務測試失敗時，我們使用較高的降級值（\\(2^{20}\\)），因此我們不需要記住當前狀態（讀取`sysctl net.inet.carp.demotion`就足夠了），並且可以使用位元運算`and`來檢查它是否已設定。

A simple test which always reports service as being down, can be as simple as the following:

一個簡單的測試，總是報告服務已關閉，可以像下面這樣簡單：

/usr/local/etc/rc.carp\_service\_status.d/test\_service

```bash
#!/bin/sh

exit 1
```

### Trigger event｜觸發事件

To ask the system to evaluate status again, we should call the `carp_service_status` script, using configd so we don’t need to be root to trigger a test.

要讓系統再次評估狀態，我們應該呼叫`carp_service_status`腳本，使用 configd，這樣我們就不需要 root 權限來觸發測試。

```
configctl interface update carp service_status
```

Note

筆記

Services using this facility should emit this event themself after normal operation has proceeded.

使用此功能的各項服務應在正常運作結束後自行發出此事件。

### Logging｜日誌記錄

Carp status changes are usually logged to syslog (System ‣ Log Files ‣ General), so does our carp service status check.

鯉魚狀態變化通常會記錄到系統日誌（系統 ‣ 日誌檔案 ‣ 常規）中，我們的鯉魚服務狀態檢查也是如此。

When the test service example is installed, we would expect a log line which looks like the following after triggering an event:

安裝測試服務範例後，觸發事件後，我們預期會看到類似如下的日誌行：

```
....  OPNsense carp: carp demoted by 1048576 due to service disruption (services: test_service)
```

This informs the user about the amount of demotion and which services are responsible for it.

這會告知用戶降級的程度以及哪些服務導致了降級。

When service status is recovered again, it will send something like the following to syslog.

當服務狀態恢復後，它會向系統日誌發送類似以下內容的資訊。

```
..... carp promoted by 1048576 due to service recovery
```

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Bootup autorun options｜啟動自動運行選項](<245 啟動自動運行選項.md>)　｜　[下一篇：Using configd｜使用 configd ➡](<247 使用 configd.md>)
