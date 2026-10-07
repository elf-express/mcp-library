---
title: "使用 FQ_CoDel 對抗緩衝區膨脹"
title_original: "Fighting Bufferbloat with FQ_CoDel"
source: https://docs.opnsense.org/manual/how-tos/shaper_bufferbloat.html
chapter: ["Firewall","Traffic Shaping","Configuration / How-tos"]
order: 144
lang: "zh-TW"
translated_by: "gtx"
captured: "2026-09-26T11:32:54.355Z"
---

# 使用 FQ_CoDel 對抗緩衝區膨脹

## 使用 FQ\_CoDel 對抗緩衝膨脹

緩衝膨脹是由於路由器或其他網路設備緩衝過多資料而產生的不良延遲。發生這種情況是因為路由器無法立即透過慢速（瓶頸）鏈路傳輸數據，因此它會「緩衝」這些資料包。新流量可能會滯留在這些緩衝資料包後面，導致所有流量出現巨大（甚至數秒）延遲。最終用戶將此視為遊戲滯後、視訊和語音通話卡頓或普遍感覺「網路速度慢」。

AQM/SQM 演算法可以消除這種延遲，從而顯著改善最終用戶體驗。一個 AQM 是 **FQ\_CoDel** 例如具有受控延遲的流排隊。它確保小流量的資料包及時發送，而大流量則共享瓶頸容量。

以下是並行執行這些任務的 FQ\_CoDel 演算法的概述：

1.  將每個流量的到達資料包分成各自的佇列。
    
2.  以循環方式從佇列中刪除一小批資料包，然後透過（慢速）瓶頸連結將該批次傳輸到ISP。當每個批次完全發送後，從下一個佇列中檢索批次，依此類推。
    
3.  向發送「超過其份額」資料的串流提供背壓。
    

最後一步是FQ\_CoDel 演算法的核心。它測量資料包在佇列中保留的時間（其“停留時間”）。這就是它確定某個流的使用量超過其份額的方式。如果封包在佇列中「太長」（即，如果它們的停留時間超過*目標*設定的時間超過*間隔*），FQ\_CoDel開始標記或丟棄其中一些封包，以導致傳送者減慢速度。

欲了解更多詳情，請參閱RFC 8290 [https://datatracker.ietf.org/doc/html/rfc8290](https://datatracker.ietf.org/doc/html/rfc8290)。

注意

如果您正在執行 IPv6 或任何動態路由協議，請考慮建立控制平面特定類別 [Control Plane Shaping](<145 控制平面整形.md>)。

## FQ\_CoDel 的參數

FQ\_CoDel 在其演算法中使用下列參數。

|   |   |
| --- | --- |
| **目標** | *封包在佇列中停留的最長時間。 （預設值：5 毫秒）* |
| **間隔** | *當停留時間超過目標超過此間隔時，丟棄或標記資料包以減慢流量。 （預設值：100 毫秒）* |
| **量子** | *一次出隊傳輸的最大位元組數。應設定為介面MTU的值。 （預設：1514 字節，1500+14B 硬體頭，最大 9000）* |
| **限制** | *由FQ\_CoDel實例管理的所有佇列的大小。它是資料包中實際佇列大小的硬限制（預設：10240，最大 20480）。 * |
| **流量** | *設定傳入封包分類的佇列數量（預設：1024，最大 65535）* |
| **CoDel ECN** | *當佇列延遲變高時，為啟用ECN的TCP流啟用封包標記。 （預設值：停用）* |

## 為 OPNsense 配置 FQ\_CoDel

在下面的設定步驟中，假設這些公佈的 ISP 速度：

| |下載 |上傳 |
| --- | --- | --- |
|兆位元/秒 | 530 | 530 30|

首先，前往 Firewall ‣ Shaper ‣ Pipes。選擇*進階模式*

配置管道和隊列（如下）後，請務必閱讀下面的[調整FQ\_CoDel](#tuning-fq-codel)部分，其中描述了簡要的最終調整過程。

### 步驟 1a - 建立下載管道

在 **管道**標籤上，按一下右下角的**+**按鈕。彈出一個空的**編輯管道**螢幕。

#### 建立下載管道

|設定|預設|描述 |
| --- | --- | --- |
| **啟用** |已檢查 | *檢查以啟用管道* |
| **頻寬** | 495 | 495 *最初設定為 ISP 宣傳的 BW 的 85%，稍後調整 - 數字* |
| **頻寬指標** |兆位元/秒 | *與頻寬相關的指標* |
| **佇列** | （空）| *留空：佇列單獨配置* |
| **面具** | （無）| *留空* |
| **調度程序類型** | FQ\_CoDel | *在調度程序中啟用FQ\_CoDel* |
| **啟用 CoDel** | （空）| *留空：使用上面選擇的FQ* |
| **(FQ-)CoDel 目標** | （空）| *保留預設值（預設5ms）；稍後調整* |
| **(FQ-)CoDel 間隔** | （空）| *保留預設值：稍後調整* |
| **(FQ-)CoDel ECN** |已檢查 | *檢查為ECN啟用的流啟用封包標記ECN* |
| **FQ-CoDel 量子** | （空）| *設定為您的WAN MTU。對於以太網，讓它預設* |
| **FQ-CoDel 限制** | （空）| *保留預設值；稍後調整* |
| **FQ-CoDel 流程** | （空）| *保留預設值（預設 1024）* |
| **描述** |下載 | *自由字段，輸入描述性內容* |

### 步驟 1b - 建立上傳管道

在 **管道**標籤上，按一下右下角的**+**按鈕。彈出一個空的**編輯管道**螢幕。

依照下載管道相同的流程，輸入 85% 上傳頻寬值並輸入「上傳」作為**說明**

### 步驟 2a - 建立下載佇列

在 **佇列**標籤上，按一下右下角的**+**按鈕。彈出一個空的**編輯佇列**螢幕。

#### 建立下載隊列

|   |   |   |
| --- | --- | --- |
| **啟用** |已檢查 | *檢查以啟用佇列* |
| **管道** |下載 | *選擇我們的管道* |
| **重量** | 100 | 100 *FQ\_CoDel 忽略權重：設定為 100* |
| **面具** | （無）| *留空：FQ將處理公平性* |
| **啟用 CoDel** | （空）| *留空：使用在管道中選擇的FQ* |
| **(FQ-)CoDel 目標** | （空）| *為佇列留空* |
| **(FQ-)CoDel 間隔** | （空）| *為佇列留空* |
| **(FQ-)CoDel ECN** | （空）| *為佇列留空* |
| **描述** |下載隊列 | *自由字段，輸入描述性內容* |

注意事項

target、interval、ECN實際上指的是隊列中的CoDel而不是FQ\_CoDel

### 步驟 2b - 建立上傳佇列

在 **佇列**標籤上，按一下右下角的**+**按鈕。彈出一個空的**編輯佇列**螢幕。

按照與下載佇列相同的過程，選擇**上傳管道**，並輸入“Upload-Queue”作為**描述**

### 步驟 3a - 建立下載規則

在 **規則**標籤上，按一下右下角的**+**按鈕。彈出一個空的**編輯規則**畫面。

#### 建立下載規則

|   |   |   |
| --- | --- | --- |
| **啟用** |已檢查 | *檢查以啟用規則* |
| **序列** | 1 | *自動產生編號，僅在需要時覆蓋* |
| **介面** | WAN | *選擇連接到網際網路的介面* |
| **原型** | ip | *選擇協議，在我們的範例中為IP* |
| **來源** |任何| *要整形的來源位址，保留任意* |
| **來源端口** |任何| *要塑造的來源端口，保留任何* |
| **目的地** |任何| *目的地IP塑造，留下任意*|
| **目標端口** |任何| *目的港自行塑造，任意留任*|
| **方向** |在 | *符合傳入或傳出資料包或兩者（預設）。我們想要塑造下載，例如 WAN* 上的入口 |
| **目標** |下載佇列 | *選擇下載佇列* |
| **描述** |下載規則| *輸入描述性名稱* |

### 步驟 3b - 建立上傳規則

在 **規則**標籤上，按一下右下角的**+**按鈕。彈出一個空的**編輯規則**畫面。

按照與下載規則相同的過程，使用相同的值，但以下情況除外：

-   **序列**（設定為2）；
    
-   **方向**（設定為“出”）
    
-   **目標**（設定為「上傳佇列」）；
    
-   **描述**（設定為「上傳規則」）
    

### 第 4 步 - 完成配置

現在按apply啟動流量整形規則。

---

## 測試緩衝區膨脹

有幾個網站可以測量下載和上傳期間的延遲，以指示網路中的緩衝區膨脹情況。其中每一個都清楚地標記了下載和上傳速率，以及這些測試期間的延遲。請參閱下面的螢幕截圖。

它們基本上都是相同的。選擇一個並將其用於您的所有測量。

**波形速度測試** [https://www.waveform.com/tools/bufferbloat](https://www.waveform.com/tools/bufferbloat)

[圖](https://docs.opnsense.org/_images/waveform_bufferbloat_test_post_config_tuning.png)

**Cloudflare** [https://speed.cloudflare.com/](https://speed.cloudflare.com/)

[圖](https://docs.opnsense.org/_images/cloudflare_speedtest.png)

**Speedtest.net** [http://speedtest.net](http://speedtest.net/)

[圖](https://docs.opnsense.org/_images/speedtest_net.png)

## 調音FQ\_CoDel

配置管道和佇列（見上文）後，請花幾分鐘時間為 ISP「調整」FQ\_CoDel 實例。為此：

首先，在應用任何整形器之前執行上述任何速度測試。運行多項測試以獲得平均數據速率和延遲。寫下這些值。

在配置 FQ\_CoDel 時，輸入「頻寬」的初始值，即 ISP 公佈速率的 85%。 （即，如果下載業務為100Mbit/s，則將速度設定為85Mbit/s；如果上傳為40Mbit/s，則將速度設定為40×85%，即34Mbit/s。）

該過程的其餘部分是迭代的，但很簡短：

-   運行速度測試以查看延遲
    
-   稍微增加下載頻寬設定
    
-   再次運行速度測試。如果延遲仍然較低，請再次增加頻寬設定。
    
-   繼續執行此操作，直到延遲增加，然後取消設定。
    
-   對上傳頻寬設定執行相同操作
    

當每個下載和上傳頻寬設定盡可能高而不增加延遲時，您就完成了。

## FQ-CoDel 調音詳解

FQ\_CoDel 被設計為「無旋鈕」演算法。輸入下載和上傳頻寬設定後，其他參數的預設值幾乎適用於所有情況。在投入更多時間進行調整之前，請先試用路由器一天。如果“足夠好”，那麼你就完成了。

如果您想進一步了解，請繼續閱讀。

*FQ-CoDel「開箱即用」預設值*

<table>
<tr><th>FQ_C 參數</th><th colspan="2">預設值</th></tr>
<tr><td>量子</td><td colspan="2">1514</td></tr>
<tr><td>目標</td><td colspan="2">5</td></tr>
<tr><td>間隔</td><td colspan="2">100</td></tr>
<tr><td>限制</td><td colspan="2">10240</td></tr>
<tr><td>流量</td><td colspan="2">1024</td></tr>
<tr><td>ECN</td><td colspan="2">OFF</td></tr>
</table>

### 量子

量子是人們不斷討論的參數之一，什麼才是適當的值。網路上有很多討論，認為應該將 BW 設定為每 100 Mbit/s 300 個。 **然而這是錯誤的。**

Quantum 指定佇列在移動到舊佇列尾部之前可以服務的位元組數。當我們進行公平排隊時，我們希望能夠平等地為所有隊列提供服務。

**正確的Quantum值不得大於或小於WAN MTU。**

注意事項

在低於 100 Mbit/s 的較低速率下，將量程設為 300 可確保更多較小的資料包比大資料包更快通過。在更高的利率下這並不重要。如果您的頻寬和 CPU 功率較低，則應將量子設定為 MTU 或 300。設定較低的量程會導致更多的循環接觸所有資料包，因此它會消耗更多的 cpu

### 目標與間隔

目標是每個 FQ-CoDel 隊列可接受的最小站立/持久隊列延遲。此最小延遲是透過追蹤資料包經歷的本地最小隊列延遲來識別的。目標應至少調整為單一 MTU 大小的封包在 WAN 出口鏈路速度下的傳輸時間。

為此，我們可以在 OPNsense 之後對 HOP 運行過多 ping，並將**平均 rtt 向上取整作為您的目標**。在本例中為 12 毫秒

```
Example from the CLI of OPNsense

traceroute 1.1.1.1
traceroute to 1.1.1.1 (1.1.1.1), 64 hops max, 40 byte packets
1  192.168.0.1  0.463 ms  0.453 ms  0.480 ms     <<<< LAN Interface of OPN
2  10.205.5.1  10.879 ms  11.010 ms  11.079 ms   <<<< ISP directly connected Device to OPN WAN

ping -s 1472 -c 1000 -D 10.205.5.1
PING 10.205.5.1 (10.205.5.1) 1472(1500) bytes of data.
1480 bytes from 10.205.5.1: icmp_seq=0 ttl=255 time=13.1 ms
1480 bytes from 10.205.5.1: icmp_seq=1 ttl=255 time=10.4 ms

--- 10.205.5.1 ping statistics ---
1000 packets transmitted, 1000 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 7.800/11.429/45.992/4.796 ms
```

注意事項

目標是一個很好的調整參數，可以防止 CoDel 在低 BW 時過於激進。否則目標應約為間隔的 5-10%

間隔用於確保測量的最小延遲不會變得太陳舊。選擇它的值是為了給端點時間來對下降做出反應，而不是太長而導致反應時間受到影響。

注意事項

間隔預設值 100ms 通常效果很好（10ms-1s，在 10ms-300ms 範圍內表現出色）。如果你想調整間隔，應該圍繞最壞情況RTT場景透過瓶頸進行設置

### 限制

10240 個資料包的預設限制大小太多了。建立者建議低於 10 Gbit/s 連線的值為 1000。對於低於 10 Gbit/s WAN 連接，永遠不會達到預設限制。在此之前，FQ\_CoDel 已經採取了行動。因此減少限制是健康的。

過大的資料包限制會導致某些基準測試的慢啟動期間出現不良結果。將其降低得太低可能會影響新流程的啟動。

注意事項

對於 FreeBSD，有一個 [BUG](https://bugs.freebsd.org/bugzilla/show_bug.cgi?id=276890) 為 CPU 佔用而開放，因為超出限制佇列時會導致過多的日誌記錄。此外，CoDel 的一位創建者提出了[討論](https://marc.info/?t=170776797300003&r=1&w=2)，以改進 FQ\_CoDel 在 FreeBSD 上的實作。

注意事項

由於過多日誌記錄而導致的 CPU 佔用已由開發人員在版本 25.7.8 的 OPNsense 中[修復](https://github.com/opnsense/src/commit/8684f75c425) 現在使用限制參數並將其從默認值降低是安全且有益的。

### 流量

“flows”參數設定傳入資料包分類的佇列數量。由於散列的隨機性，多個流可能最終被散列到同一個槽。

在目前實作中，只能在初始化時設定此參數（需要重新啟動裝置），因為必須為哈希表分配記憶體。

警告

設定過高的數字可能會導致設備卡住。小心這個。

### ECN

目前的最佳實踐是在運行速度低於 4 Mbit/s 的上行鏈路上關閉 ECN（如果您想要良好的 VOIP 性能；1 Mbit/s 的單一封包需要 13 毫秒，丟包會讓您恢復此延遲）。

ECN IS 對於家庭路由器上的下行鏈路非常有用，其中終止跳點僅距一跳或兩跳，並且連接到正確處理 ECN 的系統。

注意事項

如果您遇到啟動緩慢的情況，請停用ECN

## 外部參考

-   [https://www.rfc-editor.org/rfc/rfc8290.html](https://www.rfc-editor.org/rfc/rfc8290.html)
    
-   [https://www.rfc-editor.org/rfc/rfc8289#section-4.2](https://www.rfc-editor.org/rfc/rfc8289#section-4.2)
    
-   [https://man.freebsd.org/cgi/man.cgi?query=ipfw&apropos=0&sektion=8&manpath=FreeBSD+14.1-RELEASE&arch=default&format=html](https://man.freebsd.org/cgi/man.cgi?query=ipfw&apropos=0&sektion=8&manpath=FreeBSD+14.1-RELEASE&arch=default&format=html)
    
-   [https://www.bufferbloat.net/projects/codel/wiki/Best\_practices\_for\_benchmarking\_Codel\_and\_FQ\_Codel/](https://www.bufferbloat.net/projects/codel/wiki/Best_practices_for_benchmarking_Codel_and_FQ_Codel/)
    
-   [https://forum.opnsense.org/index.php?topic=4949.msg20862#msg20862](https://forum.opnsense.org/index.php?topic=4949.msg20862#msg20862)
    
-   [https://forum.opnsense.org/index.php?topic=39046.msg191251#msg191251](https://forum.opnsense.org/index.php?topic=39046.msg191251#msg191251)
    
-   [https://www.man7.org/linux/man-pages/man8/tc-fq\_codel.8.html](https://www.man7.org/linux/man-pages/man8/tc-fq_codel.8.html)
    
-   [https://bugs.freebsd.org/bugzilla/show\_bug.cgi?id=276890](https://bugs.freebsd.org/bugzilla/show_bug.cgi?id=276890)
    
-   [https://marc.info/?t=170776797300003&r=1&w=2](https://marc.info/?t=170776797300003&r=1&w=2)