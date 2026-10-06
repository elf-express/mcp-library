---
title: "WireGuard Road Warrior Setup｜WireGuard Road Warrior 設置"
title_original: "WireGuard Road Warrior Setup"
source: "https://docs.opnsense.org/manual/how-tos/wireguard-client.html"
chapter: ["Virtual Private Networking","Wireguard","Examples"]
order: 156
lang: "bilingual"
translated_by: "gtx"
captured: "2026-09-26T11:32:59.393Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：WireGuard Site-to-Site Setup｜WireGuard 站點到站點設置](<155 WireGuard 站點到站點設置.md>)　｜　[下一篇：WireGuard AzireVPN Road Warrior Setup｜WireGuard AzireVPN 公路戰士設置 ➡](<157 WireGuard AzireVPN 公路戰士設置.md>)

# WireGuard Road Warrior Setup｜WireGuard Road Warrior 設置

> 章節：[Virtual Private Networking](<000 目錄.md#c-32>) › [Wireguard](<000 目錄.md#c-33>) › [Examples](<000 目錄.md#c-34>)

## Introduction｜介紹

WireGuard is a simple, fast VPN protocol using modern [cryptography](https://www.wireguard.com/protocol). It aims to be faster and less complex than IPsec whilst also being a considerably more performant alternative to OpenVPN. Initially released for the Linux kernel, it is now cross-platform and widely deployable.

WireGuard 是一種簡單、快速的 VPN 協議，使用現代[密碼學](https://www.wireguard.com/protocol)。它的目標是比 IPsec 更快、更簡單，同時也是 OpenVPN 效能更高的替代方案。它最初是針對 Linux 核心發布的，現在是跨平台且可廣泛部署的。

This how-to describes setting up a central WireGuard Instance (server) on OPNsense and configuring one or more client peers to create a tunnel to it.

本操作方法介紹了在 OPNsense 上設定中央 WireGuard 實例（伺服器）以及配置一個或多個用戶端對等點以建立到它的隧道。

## Step 1 - Configure the Wireguard Instance｜步驟 1 - 設定 Wireguard 實例

-   Go to VPN ‣ WireGuard ‣ Instances  
    前往 VPN ‣ WireGuard ‣ 實例
    
-   Click **+** to add a new Instance configuration  
    點選 ****** 新增新的實例配置
    
-   Configure the Instance configuration as follows (if an option is not mentioned below, leave it as the default):  
    如下配置實例配置（如果下面未提及選項，則將其保留為預設值）：
    
    > |   |   |
    > | --- | --- |
    > | **Enabled**<br>**啟用** | *Checked*<br>*已檢查* |
    > | **Name**<br>**姓名** | *Call it whatever you want (eg* `HomeWireGuard` *)*<br>*隨心所欲地稱呼它（例如* `HomeWireGuard` *）* |
    > | **Public Key**<br>**公鑰** | *This will initially be blank; Press the cogwheel to auto-generate new keys.*<br>*這最初是空白的；以齒輪自動產生新密鑰。 * |
    > | **Private Key**<br>**私鑰** | *This will initially be blank; Press the cogwheel to auto-generate new keys.*<br>*這最初是空白的；以齒輪自動產生新金鑰。 * |
    > | **Listen Port**<br>**監聽埠** | *51820 or a higher numbered unique port*<br>*51820 或更高編號的唯一連接埠* |
    > | **MTU** | *1420 (default) or 1412 if you use PPPoE; it’s 80 bytes less than your WAN MTU*<br>*1420（預設）或 1412（如果您使用 PPPoE）；它比您的 WAN MTU* 少 80 個位元組 |
    > | **Tunnel Address**<br>**隧道位址** | *For example, 10.10.10.1/24. See note below*<br>*例如，10.10.10.1/24。請參閱下面的註釋* |
    > | **Peers** | *The (client) peers will be specified here; leave it blank initially until the Peer configuration is created in Step 2* |
    >
    > | **同行** | *（客戶端）對等點將在此處指定；最初將其留空，直到在步驟 2* 中建立對等配置 | |
    > | **Disable Routes**<br>**停用路線** | *Unchecked*<br>*未選取* |
    

Note

筆記

The tunnel address must be in CIDR notation and must be a unique IP and subnet for your network, such as if it was on a physically different routed interface. The subnet should be an appropriate size that includes all the client peers that will use the tunnel. For IPv4 it should be a private (RFC1918) address, for example 10.10.10.1/24. For IPv6, it could either be a unique ULA /64 address, or a unique GUA /64 address derived from your prefix delegation. **Do not use a tunnel address that is a /32 (IPv4) or a /128 (IPv6)**

隧道位址必須採用 CIDR 表示法，並且必須是您的網路的唯一 IP 和子網，例如，如果它位於物理上不同的路由介面上。子網路的大小應適當，包括將使用隧道的所有客戶端對等點。對於 IPv4，它應該是私有 (RFC1918) 位址，例如 10.10.10.1/24。對於 IPv6，它可以是唯一的 ULA /64 位址，也可以是從前綴委託派生的唯一 GUA /64 位址。 **請勿使用 /32 (IPv4) 或 /128 (IPv6) 隧道位址**

Note

筆記

Leave the DNS Server field (which appears if `advanced mode` is selected) blank. Otherwise WireGuard will overwrite OPNsense’s DNS configuration

將 DNS 伺服器欄位（如果選擇 `advanced mode` 則顯示）留空。否則 WireGuard 將涵蓋 OPNsense 的 DNS 配置

-   **Save** the Instance configuration, and then click **Save** again  
    **儲存**實例配置，然後再次按一下**儲存**
    
-   Re-open the Instance configuration  
    重新開啟實例配置
    
-   Copy the public key that has been generated in the configuration. This will be needed for the client device - see Step 6  
    複製配置中已產生的公鑰。客戶端設備需要此資訊 - 請參閱步驟 6
    
-   **Save** or **Cancel** to exit the configuration  
    **儲存**或**取消**退出配置
    

## Step 2 - Configure the client peer｜第 2 步 - 設定客戶端對等點

Tip

提示

Peers can be generated using the new peer generator feature under VPN ‣ WireGuard ‣ Peer generator. If using the peer generator and require Unbound DNS to serve names, fill the DNS server with the tunnel address (eg `10.10.10.1` ).

可使用 VPN ‣ WireGuard ‣ 對等產生器下的新對等產生器功能產生對等。如果使用對等產生器並需要 Unbound DNS 來提供名稱，請使用隧道位址填充 DNS 伺服器（例如 `10.10.10.1` ）。

-   Go to VPN ‣ WireGuard ‣ Peers  
    前往 VPN ‣ WireGuard ‣ 對等點
    
-   Click **+** to add a new Peer  
    點選 ****** 新增對等點
    
-   Configure the Peer as follows (if an option is not mentioned below, leave it as the default):  
    如下配置 Peer（如果下面未提及選項，請將其保留為預設值）：
    
    > |   |   |
    > | --- | --- |
    > | **Enabled**<br>**啟用** | *Checked*<br>*已檢查* |
    > | **Name**<br>**姓名** | *Call it whatever you want (eg* `Phone` *)*<br>*隨心所欲地稱呼它（例如* `Phone` *）* |
    > | **Public Key**<br>**公鑰** | *Insert the public key from the client; if needed skip ahead and start Step 6 to generate the client public key*<br>*插入客戶端的公鑰；如果需要，請向前跳並開始步驟 6 以產生用戶端公鑰* |
    > | **Allowed IPs**<br>**允許的 IP** | *Unique tunnel IP address (IPv4 and/or IPv6) of client - it should be a /32 or /128 (as applicable) within the subnet configured on the WireGuard Instance. For example, 10.10.10.2/32*<br>*客戶端的唯一隧道 IP 位址（IPv4 和/或 IPv6） - 它應該是 WireGuard 實例上配置的子網路內的 /32 或 /128（如果適用）。例如，10.10.10.2/32* |
    
-   **Save** the Peer configuration, and then click **Apply**  
    **儲存**對等配置，然後按一下**套用**
    
-   Now go back to VPN ‣ WireGuard ‣ Instances  
    現在回到 VPN ‣ WireGuard ‣ 實例
    
-   Open the Instance configuration that was created in Step 1 (eg `HomeWireGuard`)  
    開啟在步驟 1 中建立的實例配置（例如`HomeWireGuard`）
    
-   In the Peers dropdown, select the newly created Peer (eg `Phone`)  
    在 Peers 下拉清單中，選擇新建立的 Peer（例如 `Phone`）
    
-   **Save** the Instance configuration again, and then click **Apply**  
    **再次儲存**實例配置，然後按一下**套用**
    
-   Repeat this Step 2 for as many clients as you wish to configure  
    對您希望設定的任意數量的用戶端重複此步驟 2
    

## Step 3 - Turn on/restart WireGuard｜第 3 步 - 開啟/重新啟動 WireGuard

-   Turn on WireGuard under VPN ‣ WireGuard ‣ General if it is not already on (click **Apply** after checking the checkbox)  
    如果尚未打開，請在 VPN ‣ WireGuard ‣ General 下開啟 WireGuard（選取核取方塊後點選 **套用**）
    
-   Otherwise, restart WireGuard - you can do this by turning it off and on under VPN ‣ WireGuard ‣ General (click **Apply** after both unchecking and checking the checkbox)  
    否則，重新啟動 WireGuard - 您可以透過在 VPN ‣ WireGuard ‣ 常規下將其關閉然後開啟來完成此操作（在取消選取和選取核取方塊後按 **應用程式**）
    

## Step 4 - Assignments and routing｜第 4 步 - 分配和路由

Note

筆記

The steps outlined in Steps 4(a) and 4(b) below may not be required at all in your circumstances. Strictly speaking, if you only intend for your clients to use the tunnel to access local IPs/subnets behind OPNsense, then neither step is actually necessary. If you intend to use the WireGuard tunnel to also access IPs outside of the local network, for example the public internet, then at least one, and perhaps both, of the steps will be required. This is explained below

根據您的情況，可能根本不需要執行下面步驟 4(a) 和 4(b) 中概述的步驟。嚴格來說，如果您只想讓客戶端使用隧道來存取 OPNsense 後面的本機 IP/子網，那麼實際上不需要執行任何步驟。如果您打算使用 WireGuard 隧道也存取本機網路外部的 IP（例如公共網際網路），則至少需要執行其中一個步驟，也可能需要執行兩個步驟。下面對此進行解釋

**However**, it is useful to complete Step 4(a) anyway, for the reasons explained in that step

**但是**，無論如何完成步驟 4(a) 都是有用的，原因在該步驟中已解釋

### Step 4(a) - Assign an interface to WireGuard (recommended)｜步驟 4(a) - 將介面指派給 WireGuard（建議）

Hint

提示

This step is not strictly necessary in any circumstances for a road warrior setup. However, it is useful to implement, for several reasons:

對於公路戰士設定而言，此步驟在任何情況下都不是絕對必要的。然而，由於以下幾個原因，它的實施很有用：

First, it generates an alias for the tunnel subnet(s) that can be used in firewall rules. Otherwise you will need to define your own alias or at least manually specify the subnet(s)

首先，它為可在防火牆規則中使用的隧道子網路產生別名。否則，您將需要定義自己的別名或至少手動指定子網

Second, it automatically adds an IPv4 Source NAT rule, which will allow the tunnel to access IPv4 IPs outside of the local network (if that is desired), without needing to manually add a rule

其次，它會自動新增 IPv4 來源 NAT 規則，該規則將允許隧道存取本機網路外部的 IPv4 IP（如果需要），而無需手動新增規則

Finally, it allows separation of the firewall rules of each WireGuard instance (each `wgX` device). Otherwise they all need to be configured on the default WireGuard group that OPNsense creates. This is more an organisational aesthetic, rather than an issue of substance

最後，它允許分離每個 WireGuard 實例（每個 `wgX` 裝置）的防火牆規則。否則，它們都需要在 OPNsense 建立的預設 WireGuard 群組上進行配置。這更多的是一種組織美學，而不是實質問題

-   Go to Interfaces ‣ Assignments  
    轉到接口 ‣ 分配
    
-   In the dropdown next to “New interface:”, select the WireGuard device (`wg1` if this is your first one)  
    在「新介面：」旁邊的下拉清單中，選擇 WireGuard 裝置（`wg1`，如果這是您的第一個裝置）
    
-   Add a description (eg `HomeWireGuard`)  
    新增描述（例如`HomeWireGuard`）
    
-   Click **+** to add it, then click **Save**  
    按一下 **++**新增它，然後按一下**儲存**
    
-   Then select your new interface under the Interfaces menu  
    然後在“接口”選單下選擇您的新接口
    
-   Configure it as follows (if an option is not mentioned below, leave it as the default):  
    配置如下（如果下面沒有提到選項，則保留預設值）：
    
    > |   |   |
    > | --- | --- |
    > | **Enable**<br>**啟用** | *Checked*<br>*已檢查* |
    > | **Lock**<br>**鎖定** | *Checked*<br>*已檢查* |
    > | **Description**<br>**描述** | *Same as under Assignments, if this box is not already populated*<br>*與「作業」下相同，如果此方塊尚未填入* |
    > | **IPv4 Configuration Type**<br>**IPv4 配置類型** | *None*<br>*無* |
    > | **IPv6 Configuration Type**<br>**IPv6 配置類型** | *None*<br>*無* |
    

Note

筆記

There is no need to configure IPs on the interface. The tunnel address(es) specified in the Instance configuration for your server will be automatically assigned to the interface once WireGuard is restarted

無需在介面上配置 IP。重新啟動 WireGuard 後，伺服器執行個體配置中指定的隧道位址將自動指派給介面

-   **Save** the interface configuration and then click **Apply changes**  
    **儲存**介面配置，然後按一下**套用變更**
    
-   Restart WireGuard - you can do this by turning it off and on under VPN ‣ WireGuard ‣ General (click **Apply** after both unchecking and checking the checkbox)  
    重新啟動 WireGuard - 您可以透過在 VPN ‣ WireGuard ‣ 常規下將其關閉和開啟來完成此操作（取消選取和選取核取方塊後按 **應用**）
    

Tip

提示

When assigning interfaces, gateways can be added to them. This is useful if balancing traffic across multiple tunnels is required or in more complex routing scenarios. To do this, go to System ‣ Gateways ‣ Configuration and add a new gateway. Choose the relevant WireGuard interface under System ‣ Interfaces and check the checkbox **Dynamic gateway policy**. These scenarios are otherwise beyond the scope of this how-to.

分配介面時，可以向其中新增網關。如果需要平衡多個隧道之間的流量或在更複雜的路由場景中，這非常有用。為此，請前往 System ‣ Gateways ‣ Configuration 並新增網關。在 System ‣ Interfaces 下選擇相關的 WireGuard 接口，然後選取複選框 **動態網關策略**。這些場景超出了本指南的範圍。

Tip

提示

If Unbound DNS is configured with all interfaces registered it requires a reload of Unbound DNS to get the new Wireguard interface added. This is necessary to get DNS working through the VPN tunnel.

如果 Unbound DNS 配置了所有已註冊的接口，則需要重新載入 Unbound DNS 才能新增新的 Wireguard 介面。這是讓 DNS 通過 VPN 隧道所必需的。

### Step 4(b) - Create a Source NAT rule｜步驟 4(b) - 建立來源 NAT 規則

Hint

提示

This step is only necessary (if at all) to allow client peers to access IPs outside of the local IPs/subnets behind OPNsense - see the note under Step 4. If an interface has already been assigned under Step 4(a), then it is not necessary for IPv4 traffic, and is only necessary for IPv6 traffic if the tunnel uses IPv6 ULAs (IPv6 GUAs don’t need NAT). So in many use cases this step can be skipped

只有在允許客戶端對等方存取 OPNsense 後面的本機 IP/子網路以外的 IP 時才需要此步驟（如果有的話） - 請參閱步驟 4 下的註釋。如果已在步驟 4(a) 下分配了接口，則對於 IPv4 流量而言不需要此步驟，而僅當隧道使用 IPv6 ULA 時對於 IPv6 流量而言才需要此步驟（IPv6 GUA 不需要NAT）。因此在許多用例中可以跳過此步驟

-   Go to Firewall ‣ NAT ‣ Source NAT (Outbound)  
    前往防火牆 ‣ NAT ‣ 源 NAT（出站）
    
-   Select “Hybrid Source NAT rule generation” if it is not already selected, and click **Save** and then **Apply changes**  
    如果尚未選擇“混合來源NAT規則產生”，請選擇它，然後按一下**儲存**，然後**套用變更**
    
-   Click **Add** to add a new rule  
    按一下 **新增** 新增規則
    
-   Configure the rule as follows (if an option is not mentioned below, leave it as the default):  
    配置規則如下（如果下面未提及選項，請將其保留為預設值）：
    
    > |   |   |
    > | --- | --- |
    > | **Interface**<br>**介面** | *WAN* |
    > | **TCP/IP Version**<br>**TCP/IP版本** | *IPv4 or IPv6 (as applicable)*<br>*IPv4 或 IPv6（如適用）* |
    > | **Protocol**<br>**協議** | *any*<br>*任意* |
    > | **Source invert**<br>**來源反轉** | *Unchecked*<br>*未選取* |
    > | **Source address**<br>**來源位址** | *If you assigned an interface under Step 4(a), select the generated alias for the interface subnet(s) (eg* `HomeWireGuard net` *) - see note below if you didn’t assign this interface*<br>*如果您在步驟 4(a) 下指派了接口，請選擇為介面子網路產生的別名（例如* `HomeWireGuard net` *） - 如果您未指派此接口，請參閱下方的註解* |
    > | **Source port**<br>**來源連接埠** | *any*<br>*任意* |
    > | **Destination invert**<br>**目的地反轉** | *Unchecked*<br>*未選取* |
    > | **Destination address**<br>**目的地地址** | *any*<br>*任意* |
    > | **Destination port**<br>**目的港** | *any*<br>*任意* |
    > | **Translation / target**<br>**翻譯/目標** | *Interface address*<br>*介面位址* |
    > | **Description**<br>**描述** | *Add one if you wish to*<br>*如果您願意，請新增一個* |
    
-   **Save** the rule, and then click **Apply changes**  
    **儲存**規則，然後按一下**套用變更**
    
-   Restart WireGuard - you can do this by turning it off and on under VPN ‣ WireGuard ‣ General (click **Apply** after both unchecking and checking the checkbox)  
    重新啟動 WireGuard - 您可以透過在 VPN ‣ WireGuard ‣ 常規下將其關閉和開啟來完成此操作（取消選取和選取核取方塊後按 **套用**）
    

Hint

提示

If you didn’t assign an interface as suggested in Step 4(a), then you will need to manually specify the source IPs/subnet(s) for the tunnel (for example, 10.10.10.0/24). It’s probably easiest to define an alias (via Firewall ‣ Aliases) for those IPs/subnet(s) and use that. If you have only one WireGuard Instance and only one WireGuard Peer configured, you can use the default `WireGuard net`, although this is generally not recommended due to unexpected behaviour

如果您沒有依照步驟 4(a) 中的建議分配接口，則需要手動指定隧道的來源 IP/子網路（例如，10.10.10.0/24）。為這些 IP/子網路定義別名（透過 Firewall ‣ Aliases）並使用它可能是最簡單的。如果您只有一個 WireGuard 實例並且只配置了一個 WireGuard Peer，則可以使用預設的 `WireGuard net`，儘管由於意外行為，通常不建議這樣做

## Step 5 - Create firewall rules｜第 5 步 - 建立防火牆規則

This will involve two steps - first creating a firewall rule on the WAN interface to allow clients to connect to the OPNsense WireGuard server, and then creating a firewall rule to allow access by the clients to whatever IPs they are intended to have access to.

這將涉及兩個步驟 - 首先在 WAN 介面上建立防火牆規則以允許客戶端連接到 OPNsense WireGuard 伺服器，然後建立防火牆規則以允許客戶端存取他們想要存取的任何 IP。

-   Go to Firewall ‣ Rules ‣ WAN  
    轉到防火牆 ‣ 規則 ‣ WAN
    
-   Click **Add** to add a new rule  
    按一下 **新增** 新增規則
    
-   Configure the rule as follows (if an option is not mentioned below, leave it as the default):  
    配置規則如下（如果下面未提及選項，請將其保留為預設值）：
    
    > |   |   |
    > | --- | --- |
    > | **Action**<br>**行動** | *Pass*<br>*透過* |
    > | **Quick**<br>**快** | *Checked*<br>*已檢查* |
    > | **Interface**<br>**介面** | *WAN* |
    > | **Direction**<br>**方向** | *in*<br>*在* |
    > | **TCP/IP Version**<br>**TCP/IP版本** | *IPv4 or IPv4+IPv6 (as desired, depending on how you want clients to connect to the server; note this is distinct from what type of traffic is allowed in the tunnel once established)*<br>*IPv4 或 IPv4+IPv6（根據需要，取決於您希望用戶端連接到伺服器的方式；請注意，這與建立隧道後允許的流量類型不同）* |
    > | **Protocol**<br>**協議** | *UDP* |
    > | **Source / Invert**<br>**來源/反相** | *Unchecked*<br>*未選取* |
    > | **Source**<br>**來源** | *any*<br>*任意* |
    > | **Destination / Invert**<br>**目的地/反轉** | *Unchecked*<br>*未選取* |
    > | **Destination**<br>**目的地** | *WAN address*<br>*WAN地址* |
    > | **Destination port range**<br>**目標連接埠範圍** | *The WireGuard port specified in the Instance configuration in Step 1*<br>*步驟 1 中的實例配置中指定的 WireGuard 連接埠* |
    > | **Description**<br>**描述** | *Add one if you wish to*<br>*如果您願意，請新增一個* |
    
-   **Save** the rule, and then click **Apply Changes**  
    **儲存**規則，然後按一下**套用變更**
    
-   Then go to Firewall ‣ Rules ‣ \[Name of interface assigned in Step 4(a)\] - see note below if you didn’t assign this interface  
    然後轉到 Firewall ‣ Rules ‣ \[在步驟 4(a) 中指派的介面名稱\] - 如果您沒有指派此接口，請參閱下面的註釋
    
-   Click **Add** to add a new rule  
    按一下 **新增** 新增規則
    
-   Configure the rule as follows (if an option is not mentioned below, leave it as the default):  
    配置規則如下（如果下面未提及選項，請將其保留為預設值）：
    
    > |   |   |
    > | --- | --- |
    > | **Action**<br>**行動** | *Pass*<br>*透過* |
    > | **Quick**<br>**快** | *Checked*<br>*已檢查* |
    > | **Interface**<br>**介面** | *Whatever interface you are configuring the rule on (eg* `HomeWireGuard` *) - see note below*<br>*無論您在哪個介面上設定規則（例如* `HomeWireGuard` *） - 請參閱下面的註釋* |
    > | **Direction**<br>**方向** | *in*<br>*在* |
    > | **TCP/IP Version**<br>**TCP/IP版本** | *IPv4 or IPv4+IPv6 (as applicable)*<br>*IPv4 或 IPv4+IPv6（如適用）* |
    > | **Protocol**<br>**協議** | *any*<br>*任意* |
    > | **Source / Invert**<br>**來源/反相** | *Unchecked*<br>*未選取* |
    > | **Source**<br>**來源** | *If you assigned an interface under Step 4(a), select the generated alias for the interface subnet(s) (eg* `HomeWireGuard net` *) - see note below if you didn’t assign this interface*<br>*如果您在步驟 4(a) 下分配了接口，請選擇為接口子網生成的別名（例如* `HomeWireGuard net` *） - 如果您未分配此接口，請參閱下面的註釋* |
    > | **Destination / Invert**<br>**目的地/反轉** | *Unchecked*<br>*未選取* |
    > | **Destination**<br>**目的地** | *Specify the IPs that client peers should be able to access, eg “any” or specific IPs/subnets*<br>*指定用戶端應能存取的 IP，例如「任何」或特定 IP/子網路* |
    > | **Destination port range**<br>**目標連接埠範圍** | *any*<br>*任意* |
    > | **Description**<br>**描述** | *Add one if you wish to*<br>*如果您願意，請新增一個* |
    
-   **Save** the rule, and then click **Apply Changes**  
    **儲存**規則，然後按一下**套用變更**
    

Note

筆記

If you didn’t assign an interface as suggested in Step 4(a), then the second firewall rule outlined above will need to be configured on the automatically created `WireGuard` group that appears once the Instance configuration is enabled and WireGuard is started. You will also need to manually specify the source IPs/subnet(s) for the tunnel. It’s probably easiest to define an alias (via Firewall ‣ Aliases) for those IPs/subnet(s) and use that. If you have only one WireGuard Instance and only one WireGuard Peer configured, you can use the default `WireGuard net`, although this is generally not recommended due to unexpected behaviour

如果您沒有按照步驟 4(a) 中的建議分配接口，則需要在啟用實例配置並啟動 WireGuard 後自動建立的 `WireGuard` 群組上配置上述第二條防火牆規則。您還需要手動指定隧道的來源 IP/子網路。為這些 IP/子網路定義別名（透過 Firewall ‣ Aliases）並使用它可能是最簡單的。如果您只有一個 WireGuard 實例並且只配置了一個 WireGuard Peer，則可以使用預設的 `WireGuard net`，儘管由於出現意外行為，通常不建議這樣做

## Step 5a - Create normalization rules｜步驟 5a - 建立規範化規則

-   Go to Firewall ‣ Settings -> Normalization and press **+** to create **one** new normalization rule.  
    前往 Firewall ‣ Settings -> Normalization 並按 **+**建立**一個**新的規範化規則。
    
-   If you only pass IPv4 traffic through the wireguard tunnel, create the following rule:  
    如果您僅透過wireguard 隧道傳遞IPv4 流量，請建立下列規則：
    
    |   |   |
    | --- | --- |
    | **Interface**<br>**介面** | *WireGuard (Group)*<br>*WireGuard（群組）* |
    | **Direction**<br>**方向** | *Any*<br>*任意* |
    | **Protocol**<br>**協議** | *any*<br>*任意* |
    | **Source**<br>**來源** | *any*<br>*任意* |
    | **Destination**<br>**目的地** | *any*<br>*任意* |
    | **Destination port**<br>**目的港** | *any*<br>*任意* |
    | **Description**<br>**描述** | *Wireguard MSS Clamping IPv4*<br>*Wireguard MSS 箝位 IPv4* |
    | **Max mss**<br>**最大毫秒數** | *1380 (default) or 1372 if you use PPPoE; it’s 40 bytes less than your Wireguard MTU*<br>*1380（預設）或 1372（如果您使用 PPPoE）；它比您的 Wireguard MTU* 少 40 個位元組 |
    
-   **Save** the rule  
    **儲存**規則
    
-   If you pass IPv4+IPv6 - or only IPv6 traffic - through the wireguard tunnel, create the following rule:  
    如果您透過 Wireguard 隧道傳遞 IPv4+IPv6（或僅 IPv6 流量），請建立下列規則：
    
    |   |   |
    | --- | --- |
    | **Interface**<br>**介面** | *WireGuard (Group)*<br>*WireGuard（群組）* |
    | **Direction**<br>**方向** | *Any*<br>*任意* |
    | **Protocol**<br>**協議** | *any*<br>*任意* |
    | **Source**<br>**來源** | *any*<br>*任意* |
    | **Destination**<br>**目的地** | *any*<br>*任意* |
    | **Destination port**<br>**目的港** | *any*<br>*任意* |
    | **Description**<br>**描述** | *Wireguard MSS Clamping IPv6*<br>*Wireguard MSS 箝位 IPv6* |
    | **Max mss**<br>**最大毫秒數** | *1360 (default) or 1352 if you use PPPoE; it’s 60 bytes less than your Wireguard MTU*<br>*1360（預設）或 1352（如果您使用 PPPoE）；它比您的 Wireguard MTU* 少 60 個位元組 |
    
-   **Save** the rule  
    **儲存**規則
    

Tip

提示

-   The header size for IPv4 is usually 20 bytes, and for TCP 20 bytes. In total that is 40 bytes for IPv4 TCP.  
    IPv4 的標頭大小通常為 20 字節，TCP 為 20 位元組。 IPv4 TCP 總共有 40 個位元組。
    
-   IPv6 has a larger header size with 40 bytes. That encreases the total to 60 bytes for IPv6 TCP.  
    IPv6 具有更大的標頭大小，為 40 位元組。這使得 IPv6 TCP 的總數增加到 60 個位元組。
    

Note

筆記

By creating the normalization rules, you ensure that IPv4 TCP and IPv6 TCP can pass through the Wireguard tunnel without being fragmented. Otherwise you could get working ICMP and UDP, but some encrypted TCP sessions will refuse to work.

透過建立規範化規則，您可以確保 IPv4 TCP 和 IPv6 TCP 可以通過 Wireguard 隧道而不分段。否則，您可以開始工作 ICMP 和 UDP，但某些加密的 TCP 會話將拒絕工作。

## Step 6 - Configure the WireGuard client｜第 6 步 - 配置 WireGuard 用戶端

Tip

提示

Key generation can be performed on an appropriate device with [WireGuard client tools](https://www.wireguard.com/install) installed. A one-liner for generating a matching private and public keypair is `wg genkey | tee private.key | wg pubkey > public.key`. Alternatively, WireGuard apps that can be used on some devices can automate key generation for you

金鑰產生可以在安裝了[WireGuard客戶端工具](https://www.wireguard.com/install)的適當裝置上執行。用於產生匹配的私鑰和公鑰對的單行程式碼是`wg genkey | tee private.key | wg pubkey > public.key`。或者，可在某些裝置上使用的 WireGuard 應用程式可以為您自動產生金鑰

Client configuration is largely beyond the scope of this how-to since there is such a wide array of possible targets (and corresponding configuration methods). An example client (and server) configuration is in the Appendix. The key pieces of information required to configure a client are described below:

客戶端配置很大程度上超出了本指南的範圍，因為可能的目標（以及相應的配置方法）非常廣泛。附錄中提供了客戶端（和伺服器）配置範例。配置客戶端所需的關鍵資訊如下所述：

> |   |   |
> | --- | --- |
> | **\[Interface\]**<br>**\[介面\]** |  |
> | **Address**<br>**位址** | *Refers to the IP(s) specified as Allowed IPs in the Peer configuration on OPNsense. For example, 10.10.10.2/32*<br>*指的是 OPNsense 上對等配置中指定為允許的 IP 的 IP。例如，10.10.10.2/32* |
> | **PrivateKey**<br>**私鑰** | *Refers to the private key that (along with a public key) needs to be manually or automatically generated on the client. The corresponding public key must then be copied into the Peer configuration on OPNsense for the relevant client peer - see Step 2*<br>*指需要在客戶端手動或自動產生的私鑰（與公鑰一起）。然後，必須將對應的公鑰複製到 OPNsense 上相關客戶端對等方的對等配置中 - 請參閱步驟 2* |
> | **DNS** | *Refers to the DNS servers that the client should use for the tunnel (see note below). For example, 10.10.10.1*<br>*指客戶端套用於隧道的DNS伺服器（請參閱下方的註解）。例如，10.10.10.1* |
> | **\[Peer\]**<br>**\[同行\]** |  |
> | **PublicKey**<br>**公鑰** | *Refers to the public key that is generated on OPNsense. Copy the public key from the Instance configuration on OPNsense - see Step 1*<br>*指在 OPNsense 上產生的公鑰。從 OPNsense 上的實例設定複製公鑰 - 請參閱步驟 1* |
> | **Endpoint**<br>**端點** | *Refers to the public IP address or publicly resolvable domain name of your OPNsense host, and the port specified in the Instance configuration on OPNsense*<br>*指您的 OPNsense 主機的公共 IP 位址或可公開解析的域名，以及 OPNsense 上實例配置中指定的連接埠* |
> | **AllowedIPs**<br>**允許的IP** | *Refers to the traffic (by destination IPs/subnets) that is to be sent via the tunnel. For example, if all traffic on the client is to be sent through the tunnel, specify 0.0.0.0/0 (IPv4) and/or ::/0 (IPv6)*<br>*指的是要透過隧道發送的流量（依目標 IP/子網路）。例如，如果用戶端上的所有流量都將透過隧道傳送，請指定 0.0.0.0/0 (IPv4) 和/或 ::/0 (IPv6)* |

Note

筆記

If the DNS server(s) specified are only accessible over the tunnel, or you want them to be accessed over the tunnel, make sure they are covered by the AllowedIPs

如果指定的DNS伺服器只能透過隧道訪問，或者您希望透過隧道存取它們，請確保它們被AllowedIP覆蓋

## Appendix - Example configurations｜附錄 - 範例配置

Warning

警告

**Do not reuse these example keys!**

**請勿重複使用這些範例金鑰！**

An example client configuration file:

客戶端設定檔範例：

```
[Interface]
PrivateKey = 8GboYh0YF3q/hJhoPFoL3HM/ObgOuC8YI6UXWsgWL2M=
Address = 10.10.10.2/32, fd00:1234:abcd:ef09:10:2/128
DNS = 192.168.1.254, fd00:1234:abcd:ef09:1:254

[Peer]
PublicKey = OwdegSTyhlpw7Dbpg8VSUBKXF9CxoQp2gAOdwgqtPVI=
AllowedIPs = 0.0.0.0/0, ::/0
Endpoint = opnsense.example.com:51820
```

An example server configuration file:

伺服器設定檔範例：

```
[Interface]
Address = 10.10.10.1/24, fd00:1234:abcd:ef09:10:1/64
ListenPort = 51820
PrivateKey = YNqHwpcAmVj0lVzPSt3oUnL7cRPKB/geVxccs0C0kk0=

[Peer]
PublicKey = CLnGaiAfyf6kTBJKh0M529MnlqfFqoWJ5K4IAJ2+X08=
AllowedIPs = 10.10.10.2/32, fd00:1234:abcd:ef09:10:2/128
```

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：WireGuard Site-to-Site Setup｜WireGuard 站點到站點設置](<155 WireGuard 站點到站點設置.md>)　｜　[下一篇：WireGuard AzireVPN Road Warrior Setup｜WireGuard AzireVPN 公路戰士設置 ➡](<157 WireGuard AzireVPN 公路戰士設置.md>)
