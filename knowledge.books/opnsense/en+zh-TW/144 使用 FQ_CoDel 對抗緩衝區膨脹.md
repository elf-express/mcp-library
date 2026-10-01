---
title: "Fighting Bufferbloat with FQ_CoDel｜使用 FQ_CoDel 對抗緩衝區膨脹"
title_original: "Fighting Bufferbloat with FQ_CoDel"
source: "https://docs.opnsense.org/manual/how-tos/shaper_bufferbloat.html"
chapter: ["Firewall","Traffic Shaping","Configuration / How-tos"]
order: 144
lang: "bilingual"
translated_by: "gtx"
captured: "2026-09-26T11:32:54.355Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Multi Interface shaping for a GuestNet｜GuestNet 的多重介面整形](<143 GuestNet 的多重介面整形.md>)　｜　[下一篇：Control Plane Shaping｜控制平面整形 ➡](<145 控制平面整形.md>)

# Fighting Bufferbloat with FQ_CoDel｜使用 FQ_CoDel 對抗緩衝區膨脹

> 章節：[Firewall](<000 目錄.md#c-26>) › [Traffic Shaping](<000 目錄.md#c-29>) › [Configuration / How-tos](<000 目錄.md#c-30>)

## Fighting Bufferbloat with FQ\_CoDel｜使用 FQ\_CoDel 對抗緩衝膨脹

Bufferbloat is the undesirable latency that comes from a router or other network equipment buffering too much data. This occurs because the router cannot immediately transmit data through a slow (bottleneck) link, so it “buffers” those packets. New traffic can get stuck behind those buffered packets, resulting in enormous (even multi-second) delays to all traffic. End users see this as lagging in games, stuttering in video & voice calls, or a general sense that “the network is slow”.

緩衝膨脹是由於路由器或其他網路設備緩衝過多資料而產生的不良延遲。發生這種情況是因為路由器無法立即透過慢速（瓶頸）鏈路傳輸數據，因此它會「緩衝」這些資料包。新流量可能會滯留在這些緩衝資料包後面，導致所有流量出現巨大（甚至數秒）延遲。最終用戶將此視為遊戲滯後、視訊和語音通話卡頓或普遍感覺「網路速度慢」。

The AQM/SQM algorithms can eliminate that latency, significantly improving the end-user experience. One AQM is **FQ\_CoDel** e.g. Flow Queueing with Controlled Delay. It ensures that packets from small flows are sent in a timely fashion, while large flows share the bottleneck’s capacity.

AQM/SQM 演算法可以消除這種延遲，從而顯著改善最終用戶體驗。一個 AQM 是 **FQ\_CoDel** 例如具有受控延遲的流排隊。它確保小流量的資料包及時發送，而大流量則共享瓶頸容量。

Here is an overview of the FQ\_CoDel algorithm that performs these tasks in parallel:

以下是並行執行這些任務的 FQ\_CoDel 演算法的概述：

1.  Separate every traffic flow’s arriving packets into their own queue.  
    將每個流量的到達資料包分成各自的佇列。
    
2.  Remove a small batch of packets from a queue, round-robin style, and transmit that batch through the (slow) bottleneck link to the ISP. When each batch has been fully sent, retrieve a batch from the next queue, and so on.  
    以循環方式從佇列中刪除一小批資料包，然後透過（慢速）瓶頸連結將該批次傳輸到ISP。當每個批次完全發送後，從下一個佇列中檢索批次，依此類推。
    
3.  Offer back pressure to flows that are sending “more than their share” of data.  
    向發送「超過其份額」資料的串流提供背壓。
    

This last step is the heart of the FQ\_CoDel algorithm. It measures the time that a packet remains in a queue (its “sojourn time”). That’s how it determines that a flow is using more than its share. If packets have been in a queue “too long” (that is, if their sojourn times exceed the *target* setting for longer than the *interval*), FQ\_CoDel begins to mark or drop some of those packets to cause the sender to slow down.

最後一步是FQ\_CoDel 演算法的核心。它測量資料包在佇列中保留的時間（其“停留時間”）。這就是它確定某個流的使用量超過其份額的方式。如果封包在佇列中「太長」（即，如果它們的停留時間超過*目標*設定的時間超過*間隔*），FQ\_CoDel開始標記或丟棄其中一些封包，以導致傳送者減慢速度。

For more details, see RFC 8290 [https://datatracker.ietf.org/doc/html/rfc8290](https://datatracker.ietf.org/doc/html/rfc8290).

欲了解更多詳情，請參閱RFC 8290 [https://datatracker.ietf.org/doc/html/rfc8290](https://datatracker.ietf.org/doc/html/rfc8290)。

Attention

注意

If you are running IPv6 or any dynamic routing protocol, consider creating a Control plane specific class [Control Plane Shaping](<145 控制平面整形.md>).

如果您正在執行 IPv6 或任何動態路由協議，請考慮建立控制平面特定類別 [Control Plane Shaping](<145 控制平面整形.md>)。

## Parameters of FQ\_CoDel｜FQ\_CoDel 的參數

FQ\_CoDel uses the following parameters in its algorithm.

FQ\_CoDel 在其演算法中使用下列參數。

|   |   |
| --- | --- |
| **target**<br>**目標** | *Maximum time packets should dwell in a queue. (Default: 5ms)*<br>*封包在佇列中停留的最長時間。 （預設值：5 毫秒）* |
| **interval**<br>**間隔** | *When sojourn times exceed the target for more than this interval, drop or mark packets to slow that flow. (Default: 100ms)*<br>*當停留時間超過目標超過此間隔時，丟棄或標記資料包以減慢流量。 （預設值：100 毫秒）* |
| **quantum**<br>**量子** | *Maximum number of bytes to dequeue for transmission at one time. Should be set to the value of Interface MTU. (Default: 1514 bytes, 1500+14B hardware header, max 9000)*<br>*一次出隊傳輸的最大位元組數。應設定為介面MTU的值。 （預設：1514 字節，1500+14B 硬體頭，最大 9000）* |
| **limit**<br>**限制** | *Size of all queues managed by FQ\_CoDel instance. It is the hard limit on the real queue size in packets (Default: 10240, max 20480).*<br>*由FQ\_CoDel實例管理的所有佇列的大小。它是資料包中實際佇列大小的硬限制（預設：10240，最大 20480）。 * |
| **flows**<br>**流量** | *Sets the number of queues into which the incoming packets are classified (Default: 1024, max 65535)*<br>*設定傳入封包分類的佇列數量（預設：1024，最大 65535）* |
| **CoDel ECN** | *Enable packet marking for ECN-enabled TCP flows when queue delay becomes high. (Default: Disabled)*<br>*當佇列延遲變高時，為啟用ECN的TCP流啟用封包標記。 （預設值：停用）* |

## Configuring FQ\_CoDel for OPNsense｜為 OPNsense 配置 FQ\_CoDel

In the configuration steps below, assume these advertised ISP speeds:

在下面的設定步驟中，假設這些公佈的 ISP 速度：

|  | Download<br>下載 | Upload<br>上傳 |
| --- | --- | --- |
| Mbit/s<br>兆位元/秒 | 530 | 30<br>530 30 |

To begin, go to Firewall ‣ Shaper ‣ Pipes. Select the *advanced mode*

首先，前往 Firewall ‣ Shaper ‣ Pipes。選擇*進階模式*

After configuring the Pipes and Queues (below), be sure to read the [Tuning FQ\_CoDel](#tuning-fq-codel) section below that describes the brief final tuning process.

配置管道和隊列（如下）後，請務必閱讀下面的[調整FQ\_CoDel](#tuning-fq-codel)部分，其中描述了簡要的最終調整過程。

### Step 1a - Create Download Pipe｜步驟 1a - 建立下載管道

On the **Pipes** tab click the **+** button in the lower right corner. An empty **Edit Pipe** screen pops up.

在 **管道**標籤上，按一下右下角的**+**按鈕。彈出一個空的**編輯管道**螢幕。

#### Create Pipe For Download｜建立下載管道

| Setting<br>設定 | Default<br>預設 | Description<br>描述 |
| --- | --- | --- |
| **enabled**<br>**啟用** | Checked<br>已檢查 | *Check to enable the pipe*<br>*檢查以啟用管道* |
| **bandwidth**<br>**頻寬** | 495 | *Set initially to 85% of ISP advertised BW, tune later - numeric*<br>495 *最初設定為ISP廣告BW的85%，稍後調整-數字* |
| **bandwidth Metric**<br>**頻寬指標** | Mbit/s<br>兆位元/秒 | *Metric associated with the bandwidth*<br>*與頻寬相關的指標* |
| **queue**<br>**佇列** | (empty)<br>（空） | *Leave empty: queues are configured separately*<br>*留空：佇列單獨配置* |
| **mask**<br>**面具** | (none)<br>（無） | *Leave empty*<br>*留空* |
| **scheduler type**<br>**調度程序類型** | FQ\_CoDel | *Enables FQ\_CoDel in scheduler*<br>*在調度程序中啟用FQ\_CoDel* |
| **Enable CoDel**<br>**啟用 CoDel** | (empty)<br>（空） | *Leave empty: use FQ as selected above*<br>*留空：使用上面選擇的FQ* |
| **(FQ-)CoDel target**<br>**(FQ-)CoDel 目標** | (empty)<br>（空） | *Leave as default (default 5ms); tune later*<br>*保留預設值（預設5ms）；稍後調整* |
| **(FQ-)CoDel interval**<br>**(FQ-)CoDel 間隔** | (empty)<br>（空） | *Leave as default: tune later*<br>*保留預設值：稍後調整* |
| **(FQ-)CoDel ECN** | Checked<br>已檢查 | *Check to enable packet marking ECN for ECN enabled flows*<br>*檢查是否為ECN啟用的流啟用封包標記ECN* |
| **FQ-CoDel quantum**<br>**FQ-CoDel 量子** | (empty)<br>（空） | *Set to your WAN MTU. For Ethernet let it default*<br>*設定為您的WAN MTU。對於以太網，讓它預設* |
| **FQ-CoDel limit**<br>**FQ-CoDel 限制** | (empty)<br>（空） | *Leave as default; tune later*<br>*保留預設值；稍後調整* |
| **FQ-CoDel flows**<br>**FQ-CoDel 流程** | (empty)<br>（空） | *Leave as default (default 1024)*<br>*保留預設值（預設 1024）* |
| **description**<br>**描述** | Download<br>下載 | *Free field, enter something descriptive*<br>*自由字段，輸入描述性內容* |

### Step 1b - Create Upload Pipe｜步驟 1b - 建立上傳管道

On the **Pipes** tab click the **+** button in the lower right corner. An empty **Edit Pipe** screen pops up.

在 **管道**標籤上，按一下右下角的**+**按鈕。彈出一個空的**編輯管道**螢幕。

Follow the same process as for the Download pipe, entering the 85% upload bandwidth value and entering “Upload”（上傳） for the **description**

依照下載管道相同的流程，輸入 85% 上傳頻寬值並輸入 “Upload”（上傳） 作為 **說明**

### Step 2a - Create Download Queue｜步驟 2a - 建立下載佇列

On the **Queues** tab click the **+** button in the lower right corner. An empty **Edit queue** screen pops up.

在 **佇列**標籤上，按一下右下角的**+**按鈕。彈出一個空的**編輯佇列**螢幕。

#### Create Queue For Download｜建立下載隊列

|   |   |   |
| --- | --- | --- |
| **enabled**<br>**啟用** | Checked<br>已檢查 | *Check to enable the queue*<br>*檢查以啟用佇列* |
| **pipe**<br>**管道** | Download<br>下載 | *Select our Pipe*<br>*選擇我們的管道* |
| **weight**<br>**重量** | 100 | *FQ\_CoDel ignores the weight: set to 100*<br>100 *FQ\_CoDel 忽略權重：設定為 100* |
| **mask**<br>**面具** | (none)<br>（無） | *Leave empty: FQ will handle fairness*<br>*留空：FQ將處理公平性* |
| **Enable CoDel**<br>**啟用 CoDel** | (empty)<br>（空） | *Leave empty: use FQ as selected in Pipe*<br>*留空：使用在管道中選擇的FQ* |
| **(FQ-)CoDel target**<br>**(FQ-)CoDel 目標** | (empty)<br>（空） | *Leave empty for a queue*<br>*為佇列留空* |
| **(FQ-)CoDel interval**<br>**(FQ-)CoDel 間隔** | (empty)<br>（空） | *Leave empty for a queue*<br>*為佇列留空* |
| **(FQ-)CoDel ECN** | (empty)<br>（空） | *Leave empty for a queue*<br>*為佇列留空* |
| **description**<br>**描述** | Download-Queue<br>下載隊列 | *Free field, enter something descriptive*<br>*自由字段，輸入描述性內容* |

Note

注意事項

target, interval, ECN actually refer to CoDel and not FQ\_CoDel in the queue

target、interval、ECN實際上指的是隊列中的CoDel而不是FQ\_CoDel

### Step 2b - Create Upload Queue｜步驟 2b - 建立上傳佇列

On the **Queues** tab click the **+** button in the lower right corner. An empty **Edit queue** screen pops up.

在 **佇列**標籤上，按一下右下角的**+**按鈕。彈出一個空的**編輯佇列**螢幕。

Follow the same process as for the Download queue, selecting the **Upload pipe**, and entering “Upload-Queue”（上傳佇列） for the **description**

依照與下載佇列相同的過程，選擇 **上傳管道**，並輸入 “Upload-Queue”（上傳佇列） 作為**描述**

### Step 3a - Create Download Rule｜步驟 3a - 建立下載規則

On the **Rules** tab click the **+** button in the lower right corner. An empty **Edit rule** screen pops up.

在 **規則**標籤上，按一下右下角的**+**按鈕。彈出一個空的**編輯規則**畫面。

#### Create a Rule For Download｜建立下載規則

|   |   |   |
| --- | --- | --- |
| **enabled**<br>**啟用** | Checked<br>已檢查 | *Check to enable the rule*<br>*檢查以啟用規則* |
| **sequence**<br>**序列** | 1 | *Auto generated number, overwrite only when needed*<br>*自動產生編號，僅在需要時覆蓋* |
| **interface**<br>**介面** | WAN | *Select the interface connected to the internet*<br>*選擇連接到網際網路的介面* |
| **proto**<br>**原型** | ip | *Select the protocol, IP in our example*<br>*選擇協議，在我們的範例中為IP* |
| **source**<br>**來源** | any<br>任何 | *The source address to shape, leave on any*<br>*要整形的來源位址，保留任意* |
| **src-port**<br>**來源端口** | any<br>任何 | *The source port to shape, leave on any*<br>*要塑造的來源端口，保留任何* |
| **destination**<br>**目的地** | any<br>任何 | *The destination IP to shape, leave on any*<br>*目的地IP塑造，留下任意* |
| **dst-port**<br>**目標端口** | any<br>任何 | *The destination port to shape, leave on any*<br>*目的港自行塑造，任意留任* |
| **direction**<br>**方向** | in<br>在 | *Matches incoming or outgoing packets or both (default). We want to shape Download e.g ingress on WAN*<br>*符合傳入或傳出資料包或兩者（預設）。我們想要塑造下載，例如 WAN* 上的入口 |
| **target**<br>**目標** | Download-Queue<br>下載佇列 | *Select the Download queue*<br>*選擇下載佇列* |
| **description**<br>**描述** | Download-Rule<br>下載規則 | *Enter a descriptive name*<br>*輸入描述性名稱* |

### Step 3b - Create Upload Rule｜步驟 3b - 建立上傳規則

On the **Rules** tab click the **+** button in the lower right corner. An empty **Edit rule** screen pops up.

在 **規則**標籤上，按一下右下角的**+**按鈕。彈出一個空的**編輯規則**畫面。

Follow the same process as for the Download rule, using the same values except:

按照與下載規則相同的過程，使用相同的值，但以下情況除外：

-   **sequence** (set to 2);  
    **序列**（設定為2）；
    
-   **direction** (set to “out”)  
    **方向**（設定為“出”）
    
-   **target** (set to “Upload-Queue”（上傳佇列）);  
    **目标**（设置为“Upload-Queue”（上傳佇列））；
    
-   **description** (set to “Upload-Rule”（上傳規則）)  
    **描述**（设置为“Upload-Rule”（上傳規則））
    

### Step 4 - Finalizing the configuration｜第 4 步 - 完成配置

Now press ![apply](<../images/ca819e9a-applybtn.png>) to activate the traffic shaping rules.

現在按![apply](<../images/ca819e9a-applybtn.png>)啟動流量整形規則。

---

## Test for Bufferbloat｜測試緩衝區膨脹

There are several web sites that measure the latency during download and upload to give an indication of bufferbloat in your network. Each of these clearly labels the download and upload rates, as well the latency during those tests. See these screen shots below.

有幾個網站可以測量下載和上傳期間的延遲，以指示網路中的緩衝區膨脹情況。其中每一個都清楚地標記了下載和上傳速率，以及這些測試期間的延遲。請參閱下面的螢幕截圖。

They are all substantially the same. Pick one and use it for all your measurements.

它們基本上都是相同的。選擇一個並將其用於您的所有測量。

**Waveform Speed Test** [https://www.waveform.com/tools/bufferbloat](https://www.waveform.com/tools/bufferbloat)

**波形速度測試** [https://www.waveform.com/tools/bufferbloat](https://www.waveform.com/tools/bufferbloat)

[![../../_images/waveform_bufferbloat_test_post_config_tuning.png](<../images/c26a48cf-waveform_bufferbloat_test_post_config_tu.png>)](https://docs.opnsense.org/_images/waveform_bufferbloat_test_post_config_tuning.png)

**Cloudflare** [https://speed.cloudflare.com/](https://speed.cloudflare.com/)

[![../../_images/cloudflare_speedtest.png](<../images/2f77ccc9-cloudflare_speedtest.png>)](https://docs.opnsense.org/_images/cloudflare_speedtest.png)

**Speedtest.net** [http://speedtest.net](http://speedtest.net/)

[![../../_images/speedtest_net.png](<../images/17e13b03-speedtest_net.png>)](https://docs.opnsense.org/_images/speedtest_net.png)

## Tuning FQ\_CoDel｜調音FQ\_CoDel

After you configure the pipes and queues (above), take a few minutes to “tune” your FQ\_CoDel instance for your ISP. To do this:

配置管道和佇列（見上文）後，請花幾分鐘時間為 ISP「調整」FQ\_CoDel 實例。為此：

First, run any of the speed tests above before applying any shaper. Run several tests to get average data rates and latency. Write those values down.

首先，在應用任何整形器之前執行上述任何速度測試。運行多項測試以獲得平均數據速率和延遲。寫下這些值。

While you are configuring FQ\_CoDel, enter an initial value for the “bandwidth” that is 85% of the advertised rate from the ISP. (That is, if the download service is 100 Mbit/s, set the speed to 85 Mbit/s; for 40 Mbit/s upload, set it to 40 x 85%, or 34 Mbit/s.)

當您配置 FQ\_CoDel 時，輸入「頻寬」的初始值，即 ISP 公佈速率的 85%。 （即，如果下載業務為100Mbit/s，則將速度設定為85Mbit/s；如果上傳為40Mbit/s，則將速度設定為40×85%，即34Mbit/s。）

The remainder of the process is iterative, but brief:

該過程的其餘部分是迭代的，但很簡短：

-   Run a speed test to see the latency  
    運行速度測試以查看延遲
    
-   Increase the Download bandwidth setting a bit  
    稍微增加下載頻寬設定
    
-   Run a speed test again. If the latency remains low, increase the bandwidth setting again.  
    再次運行速度測試。如果延遲仍然較低，請再次增加頻寬設定。
    
-   Keep doing this until the latency increases, then back off the setting.  
    繼續執行此操作，直到延遲增加，然後取消設定。
    
-   Do the same with the Upload bandwidth setting  
    對上傳頻寬設定執行相同操作
    

When each of the Download and Upload bandwidth settings are as high as possible without increasing latency, you’re done.

當每個下載和上傳頻寬設定盡可能高而不增加延遲時，您就完成了。

## Detailed FQ-CoDel Tuning｜FQ-CoDel 調音詳解

FQ\_CoDel is designed to be a “no-knobs” algorithm. After you enter the Download and Upload bandwidth settings, the defaults for the other parameters work very well out of the box for virtually all situations. Before you invest further time in tuning, try the router for a day. If it’s “good enough”, you are done.

FQ\_CoDel 被設計為「無旋鈕」演算法。輸入下載和上傳頻寬設定後，其他參數的預設值幾乎適用於所有情況。在投入更多時間進行調整之前，請先試用路由器一天。如果“足夠好”，那麼你就完成了。

Read on if you want to go further.

如果您想進一步了解，請繼續閱讀。

*FQ-CoDel “out of the box” default settings*

*FQ-CoDel「開箱即用」預設值*

<table>
<tr><th>FQ_C Parameter<br>FQ_C 參數</th><th colspan="2">Default<br>預設值</th></tr>
<tr><td>quantum<br>量子</td><td colspan="2">1514</td></tr>
<tr><td>target<br>目標</td><td colspan="2">5</td></tr>
<tr><td>interval<br>間隔</td><td colspan="2">100</td></tr>
<tr><td>limit<br>限制</td><td colspan="2">10240</td></tr>
<tr><td>flows<br>流量</td><td colspan="2">1024</td></tr>
<tr><td>ECN</td><td colspan="2">OFF</td></tr>
</table>

### quantum｜量子

Quantum is one of these parameters that were constantly discussed what should be the proper value. Within the internet there is a lot of discussion that it should be set to 300 per 100 Mbit/s of BW. **This however is wrong.**

量子是人們不斷討論的參數之一，什麼才是適當的值。網路上有很多討論，認為應該將 BW 設定為每 100 Mbit/s 300 個。 **然而這是錯誤的。**

Quantum specifies number of bytes a queue can serve before being moved to the tail of old. As we are doing Fair Queueing we want to aim to serve all queues equally.

Quantum 指定佇列在移動到舊佇列尾部之前可以服務的位元組數。當我們進行公平排隊時，我們希望能夠平等地為所有隊列提供服務。

**The proper value of Quantum should be no more or less than is the WAN MTU.**

**正確的Quantum值不得大於或小於WAN MTU。**

Note

注意事項

At lower rates, below 100 Mbit/s, setting the quantum to 300 ensures that more smaller packets get through faster than big ones. It doesn’t matter much at higher rates. The quantum should be set to the MTU or 300 if you have low bandwidth and the cpu power. Setting the quantum lower causes more loops touching all the packets so it eats slightly more cpu

在低於 100 Mbit/s 的較低速率下，將量程設為 300 可確保更多較小的資料包比大資料包更快通過。在更高的利率下這並不重要。如果您的頻寬和 CPU 功率較低，則應將量子設定為 MTU 或 300。設定較低的量程會導致更多的循環接觸所有資料包，因此它會消耗更多的 cpu

### target & interval｜目標與間隔

Target is the acceptable minimum standing/persistent queue delay for each FQ-CoDel queue. This minimum delay is identified by tracking the local minimum queue delay that packets experience. Target should be tuned to be at least the transmission time of a single MTU-sized packet at the WAN egress link speed.

目標是每個 FQ-CoDel 隊列可接受的最小站立/持久隊列延遲。此最小延遲是透過追蹤資料包經歷的本地最小隊列延遲來識別的。目標應至少調整為單一 MTU 大小的資料包在 WAN 出口鏈路速度下的傳輸時間。

To do this we can run excessive ping to the HOP after your OPNsense and take the **average rtt round up as your Target**. In this case 12ms

為此，我們可以在 OPNsense 之後對 HOP 運行過多 ping，並採用 **平均 rtt 向上取整作為您的目標**。在本例中為 12 毫秒

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

Note

注意事項

Target is a good parameter for tune to prevent CoDel being too aggressive at low BW. Otherwise Target should be around 5-10% of Interval

目標是一個很好的調整參數，可以防止 CoDel 在低 BW 時過於激進。否則目標應約為間隔的 5-10%

Interval is used to ensure that the measured minimum delay does not become too stale. It’s value is chosen to give endpoints time to react to a drop without being so long that response times suffer.

間隔用於確保測量的最小延遲不會變得太陳舊。選擇它的值是為了給端點時間來對下降做出反應，而不是太長而導致反應時間受到影響。

Note

注意事項

Interval default 100ms works usually well (10ms-1s, excels at range 10ms-300ms). If you want to tune Interval it should to be set around the worst case RTT scenario through the bottleneck

間隔預設值 100ms 通常效果很好（10ms-1s，在 10ms-300ms 範圍內表現出色）。如果你想調整間隔，它應該圍繞最壞情況RTT場景透過瓶頸設置

### limit｜限制

Default limit size of 10240 packets is too much. The creators recommended value 1000 for sub 10 Gbit/s connections. The default limit will never be reached for sub 10 Gbit/s WAN connections. Before that could happen FQ\_CoDel would already take action. So it is healthy to reduce the limit.

10240 個資料包的預設限制大小太多了。建立者建議低於 10 Gbit/s 連線的值為 1000。對於低於 10 Gbit/s WAN 連接，永遠不會達到預設限制。在此之前，FQ\_CoDel 已經採取了行動。因此減少限制是健康的。

The over-large packet limit leads to bad results during slow start on some benchmarks. Reducing it too low could impact new flow start.

過大的資料包限制會導致某些基準測試的慢啟動期間出現不良結果。將其降低得太低可能會影響新流程的啟動。

Note

注意事項

For FreeBSD there is a [BUG](https://bugs.freebsd.org/bugzilla/show_bug.cgi?id=276890) opened for CPU hogging due to excessive logging caused when the limit queue is exceeded. Additionally one of the creators of CoDel raised a [discussion](https://marc.info/?t=170776797300003&r=1&w=2) to improve the implementation of FQ\_CoDel on FreeBSD.

對於 FreeBSD，有一個 [BUG](https://bugs.freebsd.org/bugzilla/show_bug.cgi?id=276890) 為 CPU 佔用而開放，因為超出限制佇列時會導致過多的日誌記錄。此外，CoDel 的一位創建者提出了[討論](https://marc.info/?t=170776797300003&r=1&w=2)，以改進 FQ\_CoDel 在 FreeBSD 上的實作。

Note

注意事項

The CPU hogging due to excessive logging was [fixed](https://github.com/opnsense/src/commit/8684f75c425) for OPNsense by the devs on release 25.7.8 Its now safe and beneficial to use the limit parameter and lower it from the default value.

由於過多日誌記錄而造成的 CPU 佔用已由開發人員在版本 25.7.8 的 OPNsense 中[修復](https://github.com/opnsense/src/commit/8684f75c425) 現在使用限制參數並將其從默認值降低是安全且有益的。

### flows｜流量

The “flows” parameter sets the number of queues into which the incoming packets are classified. Due to the stochastic nature of hashing, multiple flows may end up being hashed into the same slot.

“flows”參數設定傳入資料包分類的佇列數量。由於散列的隨機性，多個流可能最終被散列到同一個槽。

This parameter can be set only at initialization time in the current implementation (needs reboot of device), since memory has to be allocated for the hash table.

在目前實作中，只能在初始化時設定此參數（需要重新啟動裝置），因為必須為哈希表分配記憶體。

Warning

警告

Setting too high number can cause the device to be stuck. Be careful with this one.

設定過高的數字可能會導致設備卡住。小心這個。

### ECN

Current best practice is to turn off ECN on uplinks running at less than 4 Mbit/s (if you want good VOIP performance; a single packet at 1 Mbit/s takes 13ms, and packet drops get you this latency back).

目前的最佳實踐是在運行速度低於 4 Mbit/s 的上行鏈路上關閉 ECN（如果您想要良好的 VOIP 性能；1 Mbit/s 的單個數據包需要 13 毫秒，丟包會讓您恢復此延遲）。

ECN IS useful on downlinks on a home router, where the terminating hop is only one or two hops away, and connected to a system that handles ECN correctly.

ECN IS 對於家庭路由器的下行鏈路非常有用，其中終止跳點僅距一跳或兩跳，並且連接到正確處理 ECN 的系統。

Note

注意事項

If you are experiencing slow starts disable ECN

如果您遇到啟動緩慢的情況，請停用ECN

## External references｜外部參考

-   [https://www.rfc-editor.org/rfc/rfc8290.html](https://www.rfc-editor.org/rfc/rfc8290.html)
    
-   [https://www.rfc-editor.org/rfc/rfc8289#section-4.2](https://www.rfc-editor.org/rfc/rfc8289#section-4.2)
    
-   [https://man.freebsd.org/cgi/man.cgi?query=ipfw&apropos=0&sektion=8&manpath=FreeBSD+14.1-RELEASE&arch=default&format=html](https://man.freebsd.org/cgi/man.cgi?query=ipfw&apropos=0&sektion=8&manpath=FreeBSD+14.1-RELEASE&arch=default&format=html)
    
-   [https://www.bufferbloat.net/projects/codel/wiki/Best\_practices\_for\_benchmarking\_Codel\_and\_FQ\_Codel/](https://www.bufferbloat.net/projects/codel/wiki/Best_practices_for_benchmarking_Codel_and_FQ_Codel/)
    
-   [https://forum.opnsense.org/index.php?topic=4949.msg20862#msg20862](https://forum.opnsense.org/index.php?topic=4949.msg20862#msg20862)
    
-   [https://forum.opnsense.org/index.php?topic=39046.msg191251#msg191251](https://forum.opnsense.org/index.php?topic=39046.msg191251#msg191251)
    
-   [https://www.man7.org/linux/man-pages/man8/tc-fq\_codel.8.html](https://www.man7.org/linux/man-pages/man8/tc-fq_codel.8.html)
    
-   [https://bugs.freebsd.org/bugzilla/show\_bug.cgi?id=276890](https://bugs.freebsd.org/bugzilla/show_bug.cgi?id=276890)
    
-   [https://marc.info/?t=170776797300003&r=1&w=2](https://marc.info/?t=170776797300003&r=1&w=2)

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Multi Interface shaping for a GuestNet｜GuestNet 的多重介面整形](<143 GuestNet 的多重介面整形.md>)　｜　[下一篇：Control Plane Shaping｜控制平面整形 ➡](<145 控制平面整形.md>)
