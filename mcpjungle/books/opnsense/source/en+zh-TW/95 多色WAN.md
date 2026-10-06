---
title: "Multi WAN｜多色WAN"
title_original: "Multi WAN"
source: "https://docs.opnsense.org/manual/how-tos/multiwan.html"
chapter: ["System","Gateway groups / Multi WAN","Configuration"]
order: 95
lang: "bilingual"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:32:27.942Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Gateway groups Multi WAN｜網關組 Multi WAN](<94 網關組 Multi WAN.md>)　｜　[下一篇：High Availability｜高可用性 ➡](<96 高可用性.md>)

# Multi WAN｜多色WAN

> 章節：[System](<000 目錄.md#c-11>) › [Gateway groups / Multi WAN](<000 目錄.md#c-16>) › [Configuration](<000 目錄.md#c-17>)

Multi WAN scenarios are commonly used for failover or load balancing, but combinations are also possible with OPNsense.

多WAN場景通常用於故障轉移或負載平衡，但也可以與OPNsense進行組合。

-   [Configure Failover](#configure-failover)  
    [配置故障轉移](#configure-failover)
    
    -   [Example configuration](#example-configuration)  
        [範例配置](#example-configuration)
        
    -   [Step 1 - Add monitor IPs](#step-1-add-monitor-ips)  
        [步驟 1 - 新增監控 IP](#step-1-add-monitor-ips)
        
    -   [Step 2 - Add Gateway Group](#step-2-add-gateway-group)  
        [步驟 2 - 新增網關群組](#step-2-add-gateway-group)
        
    -   [Step 3 - Configure DNS for each gateway](#step-3-configure-dns-for-each-gateway)  
        [步驟 3 - 為每個閘道設定DNS](#step-3-configure-dns-for-each-gateway)
        
    -   [Step 4 - Policy based routing](#step-4-policy-based-routing)  
        [步驟 4 - 基於策略的路由](#step-4-policy-based-routing)
        
    -   [Step 5 - Add allow rule for DNS traffic](#step-5-add-allow-rule-for-dns-traffic)  
        [步驟 5 - 新增允許DNS流量的規則](#step-5-add-allow-rule-for-dns-traffic)
        
    -   [Advanced Options](#advanced-options)  
        [進階選項](#advanced-options)
        
-   [Configure Load Balancing](#configure-load-balancing)  
    [配置負載平衡](#configure-load-balancing)
    
    -   [Sticky Connection](#sticky-connection)  
        [黏性連接](#sticky-connection)
        
    -   [Unequal Balancing (Weight)](#unequal-balancing-weight)  
        [不等重平衡](#unequal-balancing-weight)
        
-   [Combining Balancing & Failover](#combining-balancing-failover)  
    [均衡與故障轉移結合](#combining-balancing-failover)
    
-   [Failover and Failback States](#failover-and-failback-states)  
    [故障轉移與故障復原狀態](#failover-and-failback-states)
    
    -   [Configuration](#configuration)  
        [配置](#configuration)
        
    -   [Verification](#verification)  
        [驗證](#verification)
        

![](<../images/81e8a37c-blockdiag-1c9c6abbce870eaa1e51c418695487.png>)

## [Configure Failover](#id1)｜[配置故障轉移](#id1)

To setup Failover the following step will be taken:

要設定故障轉移，需要執行以下步驟：

1.  Add monitor IPs to the gateways  
    將監控 IP 位址新增至網關
    
2.  Add a gateway group  
    新增網關組
    
3.  Configure DNS for each gateway  
    為每個網關配置DNS
    
4.  Use policy based routing to utilize our gateway group  
    使用基於策略的路由來利用我們的網關群組
    
5.  Add a firewall rule for DNS traffic that is intended for the firewall itself  
    增加一條防火牆規則，用於限制發往防火牆本身的DNS流量。
    

Tip

提示

Did you know you can browse quick and easy to the right page by using the search box in the top right corner of your screen? Like this:

您知道嗎？您可以使用螢幕右上角的搜尋框快速輕鬆地找到所需的頁面。就像這樣：

![../../_images/quick-navigation.png](<../images/ba4fd67a-quick-navigation.png>)

### [Example configuration](#id2)｜[範例配置](#id2)

Our example utilized two previous configured WAN gateways that both are confirmed to function separately. As DNS’s and monitor IPs we will utilize google’s DNS services 8.8.8.8 and 8.8.4.4, of course you can use your own ‘known good’ setting.

我們的範例使用了兩個先前配置好的網關WAN ，這兩個網關都已確認可獨立運作。我們將使用Google的監控 IP 位址（ DNS DNS服務8.8.8.8和8.8.4.4 ，當然，您也可以使用您自己「已知有效」的設定。

We defined WAN and WAN2, where WAN will be our primary (default) gateway.

我們定義了WAN和WAN2 ，其中WAN將是我們的主（預設）網關。

Note

注意事項

Before diving into the gateway group settings, make sure to check if both interfaces are connected to a gateway in Interfaces -> \[XX\] when using static assignments. On a default setup, these settings are responsible for creating Source NAT rules when traffic leaves the interface and handle the return path using policy base routing rules (`reply-to`, `route-to`).

在深入研究網關群組設定之前，請確保在使用靜態分配時，兩個介面都已連接到「介面」->「[ XX ]」中的網關。在預設設定下，這些設定負責在流量離開介面時建立來源路由規則（ NAT ），並使用基於策略的路由規則（ `reply-to`, `route-to` ）處理返迴路徑。

### [Step 1 - Add monitor IPs](#id3)｜[步驟 1 - 新增監控 IP](#id3)

You may skip this step if you already have setup the monitoring IP and both gateways are shown as online.

如果您已經設定了監控IP並且兩個網關都顯示為在線，則可以跳過此步驟。

To add a monitoring IP go to System ‣ Gateways ‣ Configuration and click on the first pencil symbol to edit the first gateway.

若要新增監控IP請前往“系統”‣“網關”‣“配置”，然後按一下第一個鉛筆圖示以編輯第一個網關。

Now make sure the following is configured:

請確保已配置以下內容：

|   |   |   |
| --- | --- | --- |
| **Disable Gateway Monitoring**<br>**停用網關監控** | Unchecked<br>未選取 | *Make sure monitoring is enabled*<br>*請確保已啟用監控* |
| **Monitor IP**<br>**監控IP** | 8.8.8.8 | *We use Google’s DNS*<br>*我們使用Google的DNS * |
| **Mark Gateway as Down**<br>**將網關標記為已關閉** | Unchecked<br>未選取 |  |

Then click on the second pencil symbol to edit the second gateway.

然後點選第二個鉛筆圖示來編輯第二個網關。

Now make sure the following is configured:

請確保已配置以下內容：

|   |   |   |
| --- | --- | --- |
| **Disable Gateway Monitoring**<br>**停用網關監控** | Unchecked<br>未選取 | *Make sure monitoring is enabled*<br>*請確保已啟用監控* |
| **Monitor IP**<br>**顯示器IP** | 8.8.4.4 | *We use Google’s second DNS*<br>*我們使用Google的第二個DNS * |
| **Mark Gateway as Down**<br>**將網關標記為已關閉** | Unchecked<br>未選取 |  |

### [Step 2 - Add Gateway Group](#id4)｜[步驟 2 - 新增網關群組](#id4)

Go to System ‣ Gateways ‣ Group and press **\+ Add Group** in the upper right corner.

前往“系統”‣“網關”‣“群組”，然後按右上角的**\+ 新增群組**。

Use the following settings:

請使用以下設定：

|   |   |   |
| --- | --- | --- |
| **Group Name**<br>**群組名稱** | WANGWGROUP | *Enter a name for the gw routing later on*<br>*稍後輸入網關路由的名稱* |
| **Gateway Priority**<br>**網關優先權** | WANGW / Tier 1<br>WANGW / 一級 | *Select the first gateway and Tier 1*<br>*選擇第一個網關和一級網關* |
| *..* | WAN2GW / Tier 2<br>WAN2GW / 二級 | *Select the second gateway and Tier 2*<br>*選擇第二個網關和二級網路* |
| **Trigger Level**<br>**觸發等級** | Packet Loss<br>丟包 | *Select the trigger you want to use*<br>*選擇您要使用的觸發條件* |
| **Description**<br>**描述** | Failover Group<br>故障轉移群組 | *Freely chosen description*<br>*自由選擇的描述* |

Tip

提示

**Trigger Level Explained**

**觸發電平解釋**

-   Member Down  
    成員下降
    
    *Triggers when the gateway has 100% packet loss.*

    *當網關丟包率達到100%時觸發。 *
    
-   Packet Loss  
    丟包
    
    *Triggers when the packet loss to a gateway is higher than the defined threshold.*

    *當發送至網關的丟包率高於設定的閾值時觸發。 *
    
-   High Latency  
    高延遲
    
    *Triggers when the latency to a gateway higher than its defined threshold.*

    *當到網關的延遲高於設定的閾值時觸發。 *
    
-   Packet Loss or High Latency  
    丟包或高延遲
    
    *Triggers for either of the above conditions.*

    *滿足上述任一條件即可觸發。 *
    

### [Step 3 - Configure DNS for each gateway](#id5)｜[步驟 3 - 為每個閘道設定DNS](#id5)

Go to System ‣ Settings ‣ General and make sure each gateway has its own DNS setup: like this:

進入“系統”‣“設定”‣“常規”，確保每個網關都有自己的DNS設置，如下所示：

DNS servers

DNS伺服器

|   |   |
| --- | --- |
| **8.8.8.8** | WANGW |
| **8.8.4.4** | WAN2GW |

### [Step 4 - Policy based routing](#id6)｜[步驟 4 - 基於策略的路由](#id6)

Go to Firewall ‣ Rules

轉到防火牆 ‣ 規則

For our example we will update the default LAN pass rule. Click on the pencil next to this rule (*Default allow LAN to any rule*).

在本例中，我們將更新預設的LAN通過規則。點擊此規則旁邊的鉛筆圖示（*預設允許LAN通過任何規則*）。

Now under **Gateway** change selection to *WANGWGROUP*.

現在在**網關**下，將選擇更改為*WANGWGROUP*。

**Save** and **Apply changes**

**儲存**並**套用變更**

Note

注意事項

This rule will utilize the gateway group for all traffic coming from our LAN network. This also means that traffic intended for the firewall itself will be routed in this (wrong) direction. That is why Step 5 is needed for our DNS traffic going to and coming from our DNS forwarder on the firewall itself.

這條規則會將網關群組用於所有來自我們LAN網路的流量。這也意味著發送到防火牆本身的流量將被路由到這個（錯誤的）方向。因此，我們需要對進出防火牆上DNS轉發器的DNS流量執行步驟5。

Tip

提示

Policy-based routing skips normal system routing. Since the default “allow LAN to any” rule has “any” set as destination, any traffic headed towards other internal networks (as is often the case with VPN tunnels) that trigger this rule will be routed through the gateway group as well. To avoid this, you can create an explicit rule before this default rule to allow traffic to those networks without a gateway set.

基於策略的路由會跳過常規系統路由。由於預設的“允許LAN到任何”規則將目標設為“任何”，因此任何發送到其他內部網路（例如VPN隧道）的流量，如果觸發此規則，也會透過網關群組進行路由。為避免這種情況，您可以在此預設規則之前建立明確規則，允許流量在未設定網關的情況下到達這些網路。

### [Step 5 - Add allow rule for DNS traffic](#id7)｜[步驟 5 - 新增允許DNS流量的規則](#id7)

Add a rule just above the default LAN allow rule to make sure traffic to and from the firewall on port 53 (DNS) is not going to be routed to the Gateway Group that we just defined.

在預設的LAN允許規則上方新增一條規則，以確保進出防火牆連接埠 53 ( DNS ) 的流量不會被路由到我們剛剛定義的網關群組。

Start with pressing the *+* icon in the bottom left corner.

首先按下左下角的 *+* 圖示。

Enter the following details:

請輸入以下詳細資訊：

|   |   |   |
| --- | --- | --- |
| **Action**<br>**操作** | Pass<br>通過 | *Allow this traffic to pass*<br>*允許此流量通過* |
| **Interface**<br>**接口** | LAN |  |
| **TCP/IP Version**<br>**TCP/IP版本** | IPv4 | *For our example we use IPv4*<br>*本範例使用 IPv4* |
| **Protocol**<br>**協議** | TCP/UDP | *Select the right protocol*<br>*選擇正確的協議* |
| **Source**<br>**來源** | any<br>任何 |  |
| **Destination**<br>**目標位置** | Single host or Network<br>單一主機或網路 |  |
| **Destination**<br>**目標位址** | 192.168.1.1/32 | *IP of the firewall only hence /32*<br>* IP僅限防火牆，因此 /32* |
| **Destination port range**<br>**目標埠範圍** | DNS - DNS | *Only DNS*<br>*僅限DNS * |
| **Category**<br>**類別** | DNS | *See* [Organize PF Rules by Category](<151 依類別整理PF規則.md>)<br>*參見* [依類別整理PF規則](<151 依類別整理PF規則.md>) |
| **Description**<br>**描述** | Local Route DNS<br>本地路線DNS | *Freely chosen description*<br>*自由選擇的描述* |
| **Gateway**<br>**網關** | default<br>預設 | *Select default*<br>*選擇預設設定* |

Note

注意事項

When using Unbound for DNS resolution you should also enable *Default Gateway Switching* via **System->Settings->General**, as local generated traffic will only use the current default gateway which will not change without this option.

當使用 Unbound 進行DNS解析度時，您還應該透過 **系統->設定->常規** 啟用 *預設網關切換*，因為本地產生的流量將僅使用當前的預設網關，如果沒有此選項，則不會變更。

### [Advanced Options](#id8)｜[進階選項](#id8)

For each gateway there are several advanced options you can use to change the default behavior/thresholds. These option can be changed under System ‣ Gateways ‣ Configuration, press the pencil icon next to the Gateway you want to update.

每個網關都有多個進階選項，可用於變更預設行為/閾值。這些選項可在「系統」‣「網關」‣「設定」下更改，點選要更新的網關旁的鉛筆圖示即可。

The current options are:

目前的選項有：

-   Latency thresholds  
    延遲閾值
    
    Low and high thresholds for latency in milliseconds.

    延遲的低閾值和高閾值（以毫秒為單位）。
    
-   Packet Loss thresholds  
    丟包閾值
    
    Low and high thresholds for packet loss in %.

    資料包遺失率的低閾值和高閾值（以百分比表示）。
    
-   Probe Interval  
    探測間隔
    
    How often that an ICMP probe will be sent in seconds.

    ICMP探測的發送頻率（以秒為單位）。
    
-   Down  
    向下
    
    The number of seconds of failed probes before the alarm will fire.

    觸發警報前允許的探測失敗秒數。
    
-   Avg Delay Replies Qty  
    平均延遲回覆數量
    
    How many replies should be used to compute average delay for controlling “delay” alarms?

    計算控制「延遲」警報的平均延遲時，應該使用多少個回應？
    
-   Avg Packet Loss Probes Qty  
    平均丟包探測次數
    
    How many probes should be used to compute average packet loss.

    計算平均丟包率應該使用多少個探測包？
    
-   Lost Probe Delay  
    偵測延遲遺失
    
    The delay (in qty of probe samples) after which loss is computed.

    計算損失之前所經過的延遲時間（以偵測樣本數量計）。
    

## [Configure Load Balancing](#id9)｜[配置負載平衡](#id9)

To setup load balancing follow the same configuration procedure as for Failover, but in step 2 choose same **Tier** for both Gateways.

若要設定負載平衡，請依照與故障轉移相同的設定步驟進行操作，但在步驟 2 中，為兩個閘道選擇相同的**層級**。

This will change the behavior from failover to equal balancing between the two gateways.

這將改變網關之間的負載平衡機制，從故障轉移變成兩個網關之間的負載平衡。

Note

注意事項

When using multiple Gateways with the same Tier, you need to disable shared forwarding in Firewall ‣ Settings ‣ Advanced.

當使用多個具有相同層級的閘道時，需要在防火牆‣設定‣進階中停用共用轉送。

### [Sticky Connection](#id10)｜[黏性連接](#id10)

Some web sites don’t like changing request IPs for the same session, this may lead to unexpected behavior. To solve this you can use the option **Sticky Connections**, this will make sure each subsequent request from the same user to the same website is send through the same gateway.

有些網站不喜歡更改相同會話的請求 IP，這可能會導致意外行為。要解決此問題，您可以使用選項**黏性連線**，這將確保同一使用者到同一網站的每個後續請求都透過相同網關傳送。

To set this option can be set under Firewall ‣ Settings ‣ Advanced.

此選項可在「防火牆」‣「設定」‣「進階」中進行設定。

### [Unequal Balancing (Weight)](#id11)｜[不等重平衡](#id11)

If you have a non symmetric setup with one ISP having a much higher bandwidth than the other then you can set a weight on each gateway to change the load balance. For instance if you have one line of 10 Mbps and one of 20 Mbps then set the weight of the first one to 1 and the second one to 2. This way the second gateway will get twice as many traffic to handle than the first.

如果您的配置不對稱，其中一個ISP頻寬遠高於另一個，您可以為每個網關設定權重來調整負載平衡。例如，如果您有一條線路的頻寬為10 Mbps，另一條線路的頻寬為20 Mbps，則將前者的權重設為1，將後者的權重設為2。這樣，第二個網關將處理比第一個網關多一倍的流量。

To do so, go to System ‣ Gateways ‣ Configuration and press the pencil icon next to the Gateway you want to update. The weight is defined under the advanced section.

為此，請前往“系統”‣“網關”‣“配置”，然後按一下要更新的網關旁的鉛筆圖示。權重在高級設定部分中定義。

## [Combining Balancing & Failover](#id12)｜[均衡與故障轉移結合](#id12)

To combine Load Balancing with Failover you will have 2 or more WAN connections for Balancing purposes and 1 or more for Failover. OPNsense offers 5 tiers (Failover groups) each tier can hold multiple ISPs/WAN gateways.

要將負載平衡與故障轉移結合使用，您需要至少 2 個用於負載平衡的WAN連接，以及至少 1 個用於故障轉移的連接。 OPNsense 提供 5 個層級（故障轉移群組），每個層級可容納多個 ISP/ WAN閘道。

## [Failover and Failback States](#id13)｜[故障轉移與故障復原狀態](#id13)

In some multi-WAN setups it may be necessary to directly influence firewall states. The most common example is the combination of a main ISP with a failover metered ISP (mobile network with data consumption limits).

在某些多WAN配置中，可能需要直接影響防火牆狀態。最常見的例子是主ISP與故障轉移計量ISP （具有資料使用量限制的行動網路）的組合。

In case of a main ISP failure, all states should failover quickly to the metered ISP. When the main ISP reconnects, all states should just as quickly fail back. This prevents sticky states on the metered ISP to continue data consumption which could be expensive depending on the contract.

若主交換器ISP發生故障，所有狀態應快速故障轉移至計量交換器ISP 。當主交換器ISP重新連接後，所有狀態應同樣快速地恢復。這可以防止計量交換器ISP上的狀態持續消耗數據，從而避免因合約條款而產生的高昂費用。

This setup is configured globally via System ‣ Gateways ‣ Configuration, there cannot be a distinction for different gateway groups.

此設定透過「系統」‣「網關」‣「配置」進行全域配置，無法區分不同的網關組。

### [Configuration](#id14)｜[配置](#id14)

For a minimal working failover configuration, we need two gateways with different priorities.

為了實現最基本的故障轉移配置，我們需要兩個優先順序不同的網關。

Go to System ‣ Gateways ‣ Configuration

轉到“系統”‣“網關”‣“配置”。

Note

注意事項

We assume both the main and metered gateways already exist due to DHCP configuration.

我們假設由於DHCP配置，主網關和計量網關都已經存在。

**Main ISP Gateway (e.g., DSL/Cable/Fibre)**

**主網關（例如， ISP / DSL /光纖）**

|   |   |
| --- | --- |
| **Name**<br>**姓名** | `WAN_DHCP` |
| **Upstream Gateway**<br>**上游網關** | `X` |
| **Failover States**<br>**故障轉移狀態** | `X` |
| **Priority**<br>**優先權** | `253` |

Note

注意事項

The **Priority** must be a lower number than the metered ISP gateway. This will mark this gateway as preferred. Checking **Failover States** will kill all firewall states if a failover happens. This means you must enable gateway monitoring, otherwise there cannot be a failover.

**優先權**的數字必須低於計量的ISP網關。這會將此網關標記為首選。若發生故障轉移，檢查**故障轉移狀態**將終止所有防火牆狀態。這表示您必須啟用網關監控，否則無法進行故障轉移。

**Metered ISP Gateway (e.g. LTE/5G)**

**按流量計費的ISP網關（例如LTE /5G）**

|   |   |
| --- | --- |
| **Name**<br>**姓名** | `LTE_DHCP` |
| **Upstream Gateway**<br>**上游網關** | `X` |
| **Failback States**<br>**故障恢復狀態** | `X` |
| **Priority**<br>**優先權** | `254` |

Note

注意事項

The **Priority** must be a higher number than the main ISP gateway. Checking **Failback States** will kill all firewall states if our main gateway comes back online.

**優先權**必須高於主網關ISP優先權。檢查**故障復原狀態**會在主閘道恢復上線時終止所有防火牆狀態。

Go to System ‣ Settings ‣ General and enable the following:

進入“系統”‣“設定”‣“常規”，啟用以下選項：

|   |   |
| --- | --- |
| **Gateway switching**<br>**網關切換** | `X` |

This will allow the default gateway of this firewall to change when a failover happens. It is necessary for the failover and failback of states to trigger correctly.

這樣，當發生故障轉移時，防火牆的預設閘道就會改變。這是確保故障轉移和故障恢復狀態正確觸發所必需的。

### [Verification](#id15)｜[驗證](#id15)

To verify if the failover and failback kill firewall states as expected, the simplest test is unplugging the main ISP and wait for the gateway monitor to trigger the failover to the metered ISP.

為了驗證故障轉移和故障復原是否如預期終止防火牆狀態，最簡單的測試是拔掉主ISP的電源，並等待網關監視器觸發故障轉移到計量ISP 。

Any client with a session to the internet will be forced to re-establish it. A good test would be a SSH or RDP session.

任何已連接到網際網路的用戶端都將被強制重新建立連線。一個好的測試方法是使用SSH或RDP會話。

Afterwards, reconnect the main ISP and wait for the failback to happen. The same scenario with the sessions being forced to re-establish should repeat.

之後，重新連接主ISP並等待故障恢復完成。會話強制重新建立的過程應該會重複進行。

If there are issues, verify default gateway switching, gateway priorities, and if the correct failover and failback states options have been set.

如果出現問題，請檢查預設網關切換、網關優先級，以及是否已設定正確的故障轉移和故障復原狀態選項。

For further diagnostics, use Firewall ‣ Diagnostics ‣ States.

如需進一步診斷，請使用防火牆‣診斷‣狀態。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Gateway groups Multi WAN｜網關組 Multi WAN](<94 網關組 Multi WAN.md>)　｜　[下一篇：High Availability｜高可用性 ➡](<96 高可用性.md>)
