---
title: "WireGuard Selective Routing to External VPN Endpoint｜WireGuard 选择性路由到外部 VPN 端点"
title_original: "WireGuard Selective Routing to External VPN Endpoint"
source: "https://docs.opnsense.org/manual/how-tos/wireguard-selective-routing.html"
chapter: ["Virtual Private Networking","Wireguard","Examples"]
order: 160
lang: "bilingual"
translated_by: "gtx"
captured: "2026-09-26T11:33:01.407Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：WireGuard ProtonVPN Road Warrior Setup｜WireGuard ProtonVPN Road Warrior 設定](<159 WireGuard ProtonVPN Road Warrior 設定.md>)　｜　[下一篇：OpenConnect Setup｜OpenConnect 設定 ➡](<161 OpenConnect 設定.md>)

# WireGuard Selective Routing to External VPN Endpoint｜WireGuard 选择性路由到外部 VPN 端点

> 章節：[Virtual Private Networking](<000 目錄.md#c-32>) › [Wireguard](<000 目錄.md#c-33>) › [Examples](<000 目錄.md#c-34>)

## Introduction｜介紹

This how-to is designed to assist with setting up WireGuard on OPNsense to use selective routing to an external VPN peer - most commonly to an external VPN provider.

本操作指南旨在協助在 OPNsense 上設定 WireGuard，以使用選擇性路由至外部 VPN 對等點 - 最常見的是外部 VPN 供應商。

These circumstances may apply where only certain local hosts are intended to use the VPN tunnel. Or it could apply where multiple connections to the VPN provider are desired, with each connection intended to be used by different specific local hosts.

这些情况可能适用于只有某些本地主机打算使用VPN隧道的情况。或者它可以应用于需要与 VPN 提供商的多个连接的情况，每个连接旨在由不同的特定本地主机使用。

This how-to focuses on the configuration of OPNsense. You will also have to configure the peer at your VPN provider - consult your VPN provider’s documentation as to how to do that.

本指南重點在於 OPNsense 的配置。您还必须在您的 VPN 提供商处配置对等点 - 请参阅您的 VPN 提供商的文档以了解如何执行此操作。

Your OPNsense WireGuard Instance public key will need to be registered with your VPN provider, and you will need to get your VPN provider’s endpoint public key and the VPN tunnel IP provided for your WireGuard Instance by your VPN provider. In some cases, you will not be able to get the Peer public key and VPN tunnel IP until you register your WireGuard Instance public key. In that case, create the OPNsense Instance configuration first, using a dummy tunnel IP and no peer selected, so that the public key is generated, and then update the configuration later once the other information is known.

您的 OPNsense WireGuard 實例公鑰需要向 VPN 提供者註冊，並且您需要取得 VPN 提供者的終端節點公鑰以及 VPN 提供者為您的 WireGuard 執行個體提供的 VPN 隧道 IP。在某些情況下，在註冊 WireGuard 執行個體公鑰之前，您將無法取得對等公鑰和 VPN 隧道 IP。在這種情況下，請先使用虛擬隧道 IP 且不選擇對等方來建立 OPNsense 實例配置，以便產生公鑰，然後在了解其他資訊後更新配置。

For an example of configuring the peer at a VPN provider (Mullvad), see Step 1 of the how-to [WireGuard MullvadVPN Road Warrior Setup](<158 WireGuard MulvadVPN Road Warrior 設定.md>).

有關在 VPN 提供者 (Mullvad) 處配置對等點的範例，請參閱操作方法 [WireGuard MullvadVPN Road Warrior 設定](<158 WireGuard MulvadVPN Road Warrior 設定.md>) 的步驟 1。

This how-to primarily focuses on IPv4 configuration. It can be readily adapted for IPv6 as well. See [Configuring IPv6](#configuring-ipv6) below.

本指南主要關注 IPv4 設定。它也可以輕鬆適應 IPv6。參見下面的[配置IPv6](#configuring-ipv6)。

## Step 1 - Configure the peer｜第 1 步 - 配置對等點

-   Go to VPN ‣ WireGuard ‣ Peers  
    前往VPN‣WireGuard‣同行
    
-   Click **+** to add a new Peer  
    點選 ****** 新增對等點
    
-   Configure the Peer as follows (if an option is not mentioned below, leave it as the default):  
    如下配置 Peer（如果下面未提及選項，請將其保留為預設值）：
    
    > |   |   |
    > | --- | --- |
    > | **Enabled**<br>**啟用** | *Checked*<br>*已檢查* |
    > | **Name**<br>**姓名** | *Call it whatever you want (eg* `VPNProviderName_Location` *)*<br>*隨心所欲地稱呼它（例如* `VPNProviderName_Location` *）* |
    > | **Public Key**<br>**公鑰** | *Insert the public key from your VPN provider*<br>*插入來自您的VPN提供者的公鑰* |
    > | **Allowed IPs**<br>**允许的 IP** | *0.0.0.0/0* |
    > | **Endpoint Address**<br>**端点地址** | *Insert the public IP address (desirably) or domain name of your VPN provider, as provided by it*<br>*插入您的 VPN 提供商提供的公共 IP 地址（最好）或域名* |
    > | **Endpoint Port**<br>**端点端口** | *Insert the port of your VPN provider, as provided by it*<br>*插入您的 VPN 提供商的端口（由其提供）* |
    > | **Keepalive**<br>**保持活力** | *25* |
    
-   **Save** the Peer configuration, and then click **Save** again  
    **儲存**對等配置，然後再次按一下**儲存**
    

## Step 2 - Configure the WireGuard Instance｜第 2 步 - 配置 WireGuard 實例

-   Go to VPN ‣ WireGuard ‣ Instances  
    转到 VPN ‣ WireGuard ‣ 实例
    
-   Click **+** to add a new Instance configuration  
    點選 ****** 新增新的實例配置
    
-   Turn on “advanced mode”  
    開啟“進階模式”
    
-   Configure the Instance configuration as follows (if an option is not mentioned below, leave it as the default):  
    如下配置實例配置（如果下面未提及選項，則將其保留為預設值）：
    
    > |   |   |
    > | --- | --- |
    > | **Enabled**<br>**啟用** | *Checked*<br>*已檢查* |
    > | **Name**<br>**姓名** | *Call it whatever you want (eg* `VPNProviderName` *)*<br>*隨心所欲地稱呼它（例如* `VPNProviderName` *）* |
    > | **Public Key**<br>**公鑰** | *This will initially be blank; it will be populated once the configuration is saved*<br>*這最初是空白的；保存配置後，它將被填充* |
    > | **Private Key**<br>**私鑰** | *This will initially be blank; it will be populated once the configuration is saved*<br>*這最初是空白的；保存配置後，它將被填充* |
    > | **Listen Port**<br>**監聽埠** | *51820 or a higher numbered unique port*<br>*51820 或更高編號的唯一連接埠* |
    > | **DNS Server**<br>**DNS 服务器** | *Leave this blank, otherwise WireGuard will overwrite OPNsense’s DNS configuration*<br>*将此留空，否则 WireGuard 将覆盖 OPNsense 的 DNS 配置* |
    > | **Tunnel Address**<br>**隧道位址** | *Insert the WireGuard Instance VPN tunnel IP provided by your VPN provider, in CIDR format, eg 10.24.24.10/32*<br>*插入VPN提供者提供的WireGuard實例VPN隧道IP，採用CIDR格式，例如10.24.24.10/32* |
    > | **Peers**<br>**同行** | *In the dropdown, select the Peer you configured above*<br>*在下拉清單中，選擇您在上面配置的對等點* |
    > | **Disable Routes**<br>**停用路線** | *Checked*<br>*已檢查* |
    > | **Gateway**<br>**網關** | *Specify an IP that is 1 number below your VPN tunnel IP, eg 10.24.24.9 - see note below*<br>*指定IP，即VPN隧道IP下方的1個數字，例如10.24.24.9 - 請參閱下面的註釋* |
    

Note

筆記

The IP you choose for the Gateway is essentially arbitrary; pretty much any unique IP will do. The suggestion here is for convenience and to avoid conflicts

您為網關選擇的IP本質上是任意的；幾乎任何獨特的IP都可以。這裡的建議是為了方便並避免衝突

-   **Save** the Instance configuration, and then click **Save** again  
    **儲存**實例配置，然後再次按一下**儲存**
    

## Step 3 - Turn on WireGuard｜第 3 步 - 打開 WireGuard

Turn on WireGuard under VPN ‣ WireGuard ‣ General if it is not already on

如果尚未打開，請在 VPN ‣ WireGuard ‣ General 下開啟 WireGuard

## Step 4 - Assign an interface to WireGuard and enable it｜步驟 4 - 為 WireGuard 指派一個介面並啟用它

-   Go to Interfaces ‣ Assignments  
    轉到接口 ‣ 分配
    
-   In the dropdown next to “New interface:”, select the WireGuard device (`wg0` if this is your first one)  
    在「新介面：」旁邊的下拉清單中，選擇 WireGuard 裝置（`wg0`，如果這是您的第一個裝置）
    
-   Add a description (eg `WAN_VPNProviderName`)  
    新增描述（例如`WAN_VPNProviderName`）
    
-   Click **+** to add it, then click **Save**  
    按一下 **++**新增它，然後按一下**儲存**
    
-   Then select your new interface under the Interfaces menu  
    然後在“接口”選單下選擇您的新接口
    
-   Configure it as follows (if an option is not mentioned below, leave it as the default):  
    配置如下（如果下面沒有提到選項，則保留預設值）：
    
    > |   |   |
    > | --- | --- |
    > | **Enable**<br>**啟用** | *Checked*<br>*已檢查* |
    > | **Lock**<br>**鎖定** | *Checked if you wish to*<br>*如果您願意，請檢查* |
    > | **Description**<br>**描述** | *Same as under Assignments, if this box is not already populated*<br>*與「作業」下相同，如果此方塊尚未填入* |
    > | **IPv4 Configuration Type**<br>**IPv4 配置類型** | *None*<br>*無* |
    > | **IPv6 Configuration Type**<br>**IPv6 配置類型** | *None*<br>*無* |
    
-   **Save** the interface configuration and then click **Apply changes**  
    **儲存**介面配置，然後按一下**套用變更**
    

## Step 5 - Restart WireGuard｜第 5 步 - 重新啟動 WireGuard

Now restart WireGuard - you can do this from the Dashboard (if you have the services widget) or by turning it off and on under VPN ‣ WireGuard ‣ General

現在重新啟動 WireGuard - 您可以從儀表板（如果您有服務小部件）或透過在 VPN ‣ WireGuard ‣ 常規下將其關閉和開啟來執行此操作

## Step 6 - Create a gateway｜第 6 步 - 建立網關

-   Go to System ‣ Gateways ‣ Configuration  
    轉到“系統”‣“網關”‣“配置”。
    
-   Click **Add**  
    按一下**新增**
    
-   Configure the gateway as follows (if an option is not mentioned below, leave it as the default):  
    如下設定網關（如果下面未提及選項，請將其保留為預設值）：
    
    > |   |   |
    > | --- | --- |
    > | **Name**<br>**姓名** | *Call it whatever you want, easiest to name it the same as the interface*<br>*隨心所欲地命名它，最簡單的命名方式與介面相同* |
    > | **Description**<br>**描述** | *Add one if you wish to*<br>*如果您願意，請新增一個* |
    > | **Interface**<br>**介面** | *Select your newly created interface in the dropdown*<br>*在下拉清單中選擇您新建立的介面* |
    > | **Address Family**<br>**位址家庭** | *Select IPv4 in the dropdown*<br>*在下拉清單中選擇 IPv4* |
    > | **IP address**<br>**IP位址** | *Insert the gateway IP that you configured under the WireGuard Instance configuration*<br>*插入您在 WireGuard 實例設定下設定的閘道IP* |
    > | **Far Gateway**<br>**遠端網關** | *Checked*<br>*已檢查* |
    > | **Disable Gateway Monitoring**<br>**停用網關監控** | *Unchecked*<br>*未選取* |
    > | **Monitor IP**<br>**顯示器IP** | *Insert the endpoint VPN tunnel IP (NOT the public IP) of your VPN provider - see note below*<br>*插入VPN提供者的端點VPN隧道IP（NOT公共IP） - 請參閱下面的註釋* |
    

Note

筆記

Specifying the endpoint VPN tunnel IP is preferable. As an alternative, you could include an external IP such as 1.1.1.1 or 8.8.8.8, but be aware that this IP will *only* be accessible through the VPN tunnel (OPNsense creates a static route for it), and therefore will not be accessible from local hosts that are not using the tunnel. Use the Disable Host Route check box if you wish to use an external IP AND it still be accessible by everything.

最好指定端點VPN隧道IP。作為替代方案，您可以包含外部 IP，例如 1.1.1.1 或 8.8.8.8，但請注意，此 IP *只能*透過 VPN 隧道存取（OPNsense 為其本機的本地存取服務如果您希望使用外部IP AND，但一切仍可訪問，請使用「停用主機路由」複選框。

Some VPN providers will include the VPN tunnel IP of the endpoint in the configuration data they provide. For others (such as Mullvad), you can get the IP by running a traceroute from a host that is using the tunnel - the first hop after OPNsense is the VPN provider’s tunnel IP. Please note that this IP must be pingable. If the IP does not respond to ping (as is the case for Mullvad), use a different IP in the traceroute chain or disable the gateway monitoring altogether by checking the box **Disable Gateway Monitoring**.

一些VPN提供者將在其提供的配置資料中包含端點的VPN隧道IP。对于其他设备（例如 Mulvad），您可以通过从使用隧道的主机运行跟踪路由来获取 IP - OPNsense 之后的第一跳是 VPN 提供商的隧道 IP。請注意，此 IP 必須可 ping 通。如果 IP 不响应 ping（如 Mulvad 的情况），请在跟踪路由链中使用不同的 IP 或通过选中 **禁用网关监控** 框来完全禁用网关监控。

-   **Save** the gateway configuration and then click **Apply changes**  
    **儲存**網關配置，然後按一下**套用變更**
    

## Step 7 - Create an Alias for the relevant local hosts that will access the tunnel｜步驟 7 - 為將存取隧道的相關本機主機建立別名

-   Go to Firewall ‣ Aliases  
    轉到防火牆 ‣ 別名
    
-   Click **+** to add a new Alias  
    點選 ****** 新增別名
    
-   Configure the Alias as follows (if an option is not mentioned below, leave it as the default):  
    如下配置別名（如果下面未提及選項，請將其保留為預設值）：
    
    > |   |   |
    > | --- | --- |
    > | **Enabled**<br>**啟用** | *Checked*<br>*已檢查* |
    > | **Name**<br>**姓名** | *Call it whatever your want, eg* `WG_VPN_Hosts`<br>*隨心所欲地稱呼它，例如* `WG_VPN_Hosts` |
    > | **Type**<br>**類型** | *Select either Host(s) or Network(s) in the dropdown, depending on whether you want specific host IPs to use the tunnel, or an entire local network (such as a VLAN)*<br>*在下拉清單中選擇主機或網絡，取決於您是希望特定主機 IP 使用隧道還是整個本地網路（例如VLAN）* |
    > | **Content**<br>**內容** | *Enter the host IPs, or the network in CIDR format*<br>*以CIDR格式輸入主機IP或網路* |
    > | **Description**<br>**描述** | *Add one if you wish to*<br>*如果您願意，請新增一個* |
    
-   **Save** the Alias, and then click **Apply**  
    **儲存**別名，然後按一下**套用**
    

## Step 8 - Create a firewall rule｜第 8 步 - 建立防火牆規則

The purpose of this step is to create a firewall rule to allow the relevant hosts to access the tunnel. At the same time, it also ensures that the relevant hosts using the tunnel can still access local resources as necessary - such as a local DNS server, or file storage

此步驟的目的是建立防火牆規則以允許相關主機存取隧道。同時，它還確保使用隧道的相關主機仍然可以根據需要存取本地資源 - 例如本地DNS伺服器，或檔案存儲

The step has two parts - first creating a second Alias for all local (private) networks, and then creating the firewall rule itself. The ultimate effect of these two steps is that only traffic from the relevant hosts that is destined for **non-local** destinations will be sent down the tunnel

此步驟分為兩部分 - 首先為所有本地（專用）網路建立第二個別名，然後建立防火牆規則本身。這兩個步驟的最終效果是，只有來自相關主機、發送到**非本地**目的地的流量才會沿著隧道發送

Note

筆記

The rule below will mean that no local (private) IPs can be accessed over the tunnel. You may have a need however to access certain IPs or networks at the VPN endpoint, such as a DNS server or monitor IP. In that case, you will need to create an additional firewall rule in OPNsense to ensure that requests to those IPs/networks use the tunnel gateway rather than the normal WAN gateway. This rule would be similar to that created below, except that the destination would be the relevant IPs/networks (or a new Alias for them) and the destination invert box would be unchecked. This rule would also need to be placed *above* the rule created below

下面的規則意味著不能透過隧道存取本地（私有）IP。但是，您可能需要存取VPN端點處的某些IP或網絡，例如DNS伺服器或監視器IP。在這種情況下，您需要在 OPNsense 中建立額外的防火牆規則，以確保這些 IP/網路的請求使用隧道閘道器而不是正常的 WAN 閘道。此規則與下方建立的規則類似，不同之處在於目標將是相關的 IP/網路（或它們的新別名）並且目標反向方塊將被取消選取。該規則還需要放置在下面創建的規則*上方*

Warning

警告

If the hosts that will use the tunnel are configured to use local DNS servers (such as OPNsense itself or another local DNS server), then the configuration below will likely result in DNS leaks - that is, DNS requests for the hosts will continue to be processed through the normal WAN gateway, rather than through the tunnel. See [Dealing with DNS leaks](#dns-leaks) for a discussion of potential solutions to this

如果將使用隧道的主機設定為使用本機 DNS 伺服器（例如 OPNsense 本身或另一個本機 DNS 伺服器），則下列設定可能會導致 DNS 洩漏 - 即主機的 DNS 請求將繼續透過正常的 WAN 閘道而不是透過隧道處理。有關潛在解決方案的討論，請參閱[處理 DNS 洩漏](#dns-leaks)

-   First go to Firewall ‣ Aliases  
    首先進入防火牆‣別名
    
-   Click **+** to add a new Alias  
    點選 ****** 新增別名
    
-   Configure the Alias as follows (if an option is not mentioned below, leave it as the default):  
    如下配置別名（如果下面未提及選項，請將其保留為預設值）：
    
    > |   |   |
    > | --- | --- |
    > | **Enabled**<br>**啟用** | *Checked*<br>*已檢查* |
    > | **Name**<br>**姓名** | *RFC1918\_Networks*<br>*RFC1918\_網* |
    > | **Type**<br>**類型** | *Select Network(s) in the dropdown*<br>*在下拉清單中選擇網路* |
    > | **Content**<br>**內容** | *192.168.0.0/16 10.0.0.0/8 172.16.0.0/12* |
    > | **Description**<br>**描述** | *All local (RFC1918) networks*<br>*所有本地 (RFC1918) 網路* |
    
-   **Save** the Alias, and then click **Apply**  
    **儲存**別名，然後按一下**套用**
    
-   Then go to Firewall ‣ Rules ‣ \[Name of interface for network in which hosts/network resides, eg LAN for LAN hosts\]  
    然後到防火牆‣規則‣\[主機/網路所在網路的介面名稱，例如LAN代表LAN主機\]
    
-   Click **Add** to add a new rule  
    按一下 **新增** 新增規則
    
-   Configure the rule as follows (if an option is not mentioned below, leave it as the default):  
    配置規則如下（如果下面未提及選項，請將其保留為預設值）：
    
    > |   |   |
    > | --- | --- |
    > | **Action**<br>**行動** | *Pass*<br>*透過* |
    > | **Quick**<br>**快** | *Checked*<br>*已檢查* |
    > | **Interface**<br>**介面** | *Whatever interface you are configuring the rule on*<br>*無論您在哪個介面上設定規則* |
    > | **Direction**<br>**方向** | *in*<br>*在* |
    > | **TCP/IP Version**<br>**TCP/IP版本** | *IPv4* |
    > | **Protocol**<br>**協議** | *any*<br>*任意* |
    > | **Source / Invert**<br>**來源/反相** | *Unchecked*<br>*未選取* |
    > | **Source**<br>**來源** | *Select the relevant hosts Alias you created above in the dropdown (eg* `WG_VPN_Hosts` *)*<br>*在下拉清單中選擇您在上面建立的相關主機別名（例如* `WG_VPN_Hosts` *）* |
    > | **Destination / Invert**<br>**目的地/反轉** | *Checked*<br>*已檢查* |
    > | **Destination**<br>**目的地** | *Select the* `RFC1918_Networks` *Alias you created above in the dropdown*<br>*選擇* `RFC1918_Networks` *您在上面的下拉清單中建立的別名* |
    > | **Destination port range**<br>**目標連接埠範圍** | *any*<br>*任意* |
    > | **Description**<br>**描述** | *Add one if you wish to*<br>*如果您願意，請新增一個* |
    > | **Gateway**<br>**網關** | *Select the gateway you created above (eg* `WAN_VPNProviderName` *)*<br>*選擇您在上面建立的網關（例如* `WAN_VPNProviderName` *）* |
    
-   **Save** the rule, and then click **Apply Changes**  
    **儲存**規則，然後按一下**套用變更**
    
-   Then make sure that the new rule is **above** any other rule on the interface that would otherwise interfere with its operation. For example, you want your new rule to be above the “Default allow LAN to any rule”  
    然後確保新規則**高於**介面上任何其他規則，否則會幹擾其操作。例如，您希望新規則高於“預設允許 LAN 任何規則”
    

## Step 9 - Configure routing for traffic generated by the router｜步驟 9 - 為路由器產生的流量設定路由

Services running on the router and configured to use the VPN interface must have their traffic routed to the VPN gateway in order to use the VPN. Note that locally generated traffic is not affected by NAT or by the firewall rule created in Step 8.

在路由器上運作並設定為使用VPN介面的服務必須將其流量路由至VPN網關才能使用VPN。請注意，本地產生的流量不受 NAT 或步驟 8 中建立的防火牆規則的影響。

-   Go to Firewall ‣ Rules ‣ Floating  
    轉到防火牆 ‣ 規則 ‣ 浮動
    
-   Click **Add** to add a new rule  
    按一下 **新增** 新增規則
    
-   Configure the rule as follows (if an option is not mentioned below, leave it as the default). You need to click the **Show/Hide** button next to “Advanced Options”（進階選項） to reveal the last setting:  
    如下配置規則（如果下面未提及選項，請將其保留為預設值）。您需要點擊“Advanced Options”（進階選項）旁邊的**顯示/隱藏**按鈕來顯示最後的設定：
    
    > |   |   |
    > | --- | --- |
    > | **Action**<br>**行動** | *Pass*<br>*透過* |
    > | **Quick**<br>**快** | *Unchecked*<br>*未選取* |
    > | **Interface**<br>**介面** | *Do not select any*<br>*請勿選擇任何* |
    > | **Direction**<br>**方向** | *out*<br>*輸出* |
    > | **TCP/IP Version**<br>**TCP/IP版本** | *IPv4* |
    > | **Protocol**<br>**協議** | *any*<br>*任意* |
    > | **Source / Invert**<br>**來源/反相** | *Unchecked*<br>*未選取* |
    > | **Source**<br>**來源** | *Select the interface address for your WireGuard VPN (eg* `WAN_VPNProviderName address` *)*<br>*選擇 WireGuard VPN 的介面位址（例如* `WAN_VPNProviderName address` *）* |
    > | **Destination / Invert**<br>**目的地/反轉** | *Checked*<br>*已檢查* |
    > | **Destination**<br>**目的地** | *Select the interface network for your WireGuard VPN (eg* `WAN_VPNProviderName net` *)*<br>*為您的 WireGuard VPN 選擇介面網路（例如* `WAN_VPNProviderName net` *）* |
    > | **Destination port range**<br>**目標連接埠範圍** | *any*<br>*任意* |
    > | **Description**<br>**描述** | *Add one if you wish to*<br>*如果您願意，請新增一個* |
    > | **Gateway**<br>**網關** | *Select the gateway you created above (eg* `WAN_VPNProviderName` *)*<br>*選擇您在上面建立的網關（例如* `WAN_VPNProviderName` *）* |
    > | **allow options**<br>**允許選項** | *Checked*<br>*已檢查* |
    
-   **Save** the rule, and then click **Apply Changes**  
    **儲存**規則，然後按一下**套用變更**
    

## Step 10 - Create a Source NAT rule｜步驟 10 - 建立來源 NAT 規則

-   Go to Firewall ‣ NAT ‣ Source NAT (Outbound)  
    轉到防火牆 ‣ NAT ‣ 源 NAT（出站）
    
-   Select “Hybrid Source NAT rule generation” if it is not already selected, and click **Save** and then **Apply changes**  
    如果尚未選擇“混合來源NAT規則產生”，請選擇它，然後按一下**儲存**，然後**套用變更**
    
-   Click **Add** to add a new rule  
    按一下 **新增** 新增規則
    
-   Configure the rule as follows (if an option is not mentioned below, leave it as the default):  
    配置規則如下（如果下面未提及選項，請將其保留為預設值）：
    
    > |   |   |
    > | --- | --- |
    > | **Interface**<br>**介面** | *Select the interface for your WireGuard VPN (eg* `WAN_VPNProviderName` *)*<br>*選擇 WireGuard VPN 的介面（例如* `WAN_VPNProviderName` *）* |
    > | **TCP/IP Version**<br>**TCP/IP版本** | *IPv4* |
    > | **Protocol**<br>**協議** | *any*<br>*任意* |
    > | **Source invert**<br>**來源反轉** | *Unchecked*<br>*未選取* |
    > | **Source address**<br>**來源位址** | *Select the Alias for the hosts/networks that are intended to use the tunnel (eg* `WG_VPN_Hosts` *)*<br>*為要使用隧道的主機/網路選擇別名（例如* `WG_VPN_Hosts` *）* |
    > | **Source port**<br>**來源連接埠** | *any*<br>*任意* |
    > | **Destination invert**<br>**目的地反轉** | *Unchecked*<br>*未選取* |
    > | **Destination address**<br>**目的地地址** | *any*<br>*任意* |
    > | **Destination port**<br>**目的港** | *any*<br>*任意* |
    > | **Translation / target**<br>**翻譯/目標** | *Interface address*<br>*介面位址* |
    > | **Description**<br>**描述** | *Add one if you wish to*<br>*如果您願意，請新增一個* |
    
-   **Save** the rule, and then click **Apply changes**  
    **儲存**規則，然後按一下**套用變更**
    

## Step 11 - Add a kill switch (optional)｜第 11 步 - 新增終止開關（可選）

If the VPN tunnel gateway goes offline, then traffic intended for the VPN may go out the normal WAN gateway. There are a couple of ways to avoid this, one of which is outlined here:

如果VPN隧道閘道離線，則發送到VPN的流量可能會從正常的WAN網關出去。有幾種方法可以避免這種情況，其中概述如下：

-   First, go back to the firewall rule you created under Step 8  
    首先，返回您在步驟 8 中建立的防火牆規則
    
-   Click on the **Show/Hide** button next to “Advanced Options”（進階選項）  
    點選 “Advanced Options”（進階選項） 旁邊的 **顯示/隱藏** 按鈕
    
-   Then, in the **Set local tag** field, add `NO_WAN_EGRESS`  
    然後，在 **設定本地標籤** 欄位中，新增 `NO_WAN_EGRESS`
    
-   **Save** the rule, and then click **Apply changes**  
    **儲存**規則，然後按一下**套用變更**
    
-   Then go to Firewall ‣ Rules ‣ Floating  
    然後轉到防火牆 ‣ 規則 ‣ 浮動
    
-   Click **Add** to add a new rule  
    按一下 **新增** 新增規則
    
-   Configure the rule as follows (if an option is not mentioned below, leave it as the default). You need to click the **Show/Hide** button next to “Advanced Options”（進階選項） to reveal the last setting:  
    如下配置規則（如果下面未提及選項，請將其保留為預設值）。您需要點擊“Advanced Options”（進階選項）旁邊的**顯示/隱藏**按鈕來顯示最後的設定：
    
    > |   |   |
    > | --- | --- |
    > | **Action**<br>**行動** | *Block*<br>*阻止* |
    > | **Quick**<br>**快** | *Checked*<br>*已檢查* |
    > | **Interface**<br>**介面** | *WAN* |
    > | **Direction**<br>**方向** | *out*<br>*輸出* |
    > | **TCP/IP Version**<br>**TCP/IP版本** | *IPv4* |
    > | **Protocol**<br>**協議** | *any*<br>*任意* |
    > | **Source / Invert**<br>**來源/反相** | *Unchecked*<br>*未選取* |
    > | **Source**<br>**來源** | *any*<br>*任意* |
    > | **Destination / Invert**<br>**目的地/反轉** | *Unchecked*<br>*未選取* |
    > | **Destination**<br>**目的地** | *any*<br>*任意* |
    > | **Destination port range**<br>**目標連接埠範圍** | *any*<br>*任意* |
    > | **Description**<br>**描述** | *Add one if you wish to*<br>*如果您願意，請新增一個* |
    > | **Match local tag**<br>**符合本地標籤** | *NO\_WAN\_EGRESS* |
    
-   **Save** the rule, and then click **Apply Changes**  
    **儲存**規則，然後按一下**套用變更**
    

## Configuring IPv6｜配置 IPv6

Some VPN providers (such as Mullvad) allow you to send both IPv4 and IPv6 traffic down the tunnel. This will be evident if you receive both an IPv4 and IPv6 tunnel IP in the configuration data provided by the VPN provider. The IPv6 tunnel IP is likely to be a ULA, ie within `fc00::/7`.

一些 VPN 提供者（例如 Mulvad）可讓您透過隧道傳送 IPv4 和 IPv6 流量。如果您在VPN提供者提供的設定資料中同時收到IPv4和IPv6隧道IP，這一點就會很明顯。 IPv6 隧道IP 可能是ULA，即在`fc00::/7` 內。

To configure the tunnel to use IPv6, you essentially need to replicate the steps above for IPv4. That is, you need to:

要將隧道設定為使用 IPv6，您基本上需要重複上述 IPv4 的步驟。也就是說，您需要：

-   add the IPv6 tunnel IP to Tunnel Address on the WireGuard Instance configuration (see further below)  
    將 IPv6 隧道 IP 新增至 WireGuard 執行個體設定上的隧道位址（請參閱下文）
    
-   add `::/0` to the Allowed IPs on the WireGuard Endpoint configuration  
    將 `::/0` 新增至 WireGuard 端點設定上允許的 IP
    
-   create an IPv6 gateway (see further below)  
    建立 IPv6 網關（請參閱下文）
    
-   add to the hosts alias the IPv6 addresses of the hosts/networks that are to use the tunnel  
    將要使用隧道的主機/網路的 IPv6 位址新增至主機別名
    
-   if necessary, create a separate local IPs alias for IPv6, so they can be excluded from the IPv6 firewall rule destination  
    如有必要，為 IPv6 建立單獨的本機 IP 別名，以便將它們從 IPv6 防火牆規則目標中排除
    
-   create an IPv6 firewall rule (specifying the IPv6 gateway in the rule)  
    建立 IPv6 防火牆規則（在規則中指定 IPv6 閘道）
    
-   configure an IPv6 floating rule for routing (specifying the IPv6 gateway in the rule)  
    設定IPv6浮動規則進行路由（規則中指定IPv6網關）
    
-   create an IPv6 Source NAT rule  
    建立 IPv6 來源 NAT 規則
    
-   (optionally) add the kill switch tag to the IPv6 firewall rule and change the associated Floating rule to IPv4+IPv6  
    （可選）將終止開關標記新增至 IPv6 防火牆規則並將關聯的浮動規則變更為 IPv4+IPv6
    

Note, however, that there are a couple of differences:

但請注意，存在一些差異：

1.  First, the WireGuard Instance configuration will only accept one entry in the Gateway field. Just leave the IPv4 gateway address there.  
    首先，WireGuard 實例配置僅接受網關欄位中的一個條目。只需將 IPv4 網關位址保留在那裡即可。
    
2.  Second, there is no concept of a Far Gateway for IPv6. So to successfully set up a gateway for IPv6, you need to do two things:  
    其次，IPv6 沒有遠端網關的概念。因此，要成功設定 IPv6 網關，您需要做兩件事：
    

> -   When adding the IPv6 address to Tunnel Address in the WireGuard Instance configuration, specify a /127 mask, rather than a /128  
      將 IPv6 位址新增至 WireGuard 執行個體配置中的隧道位址時，指定 /127 掩碼，而不是 /128
>     
> -   Then, when creating an IPv6 Gateway for the tunnel, specify the IP address to be another IPv6 address that is within the /127 subnet of the Tunnel Address  
      然後，在為隧道建立 IPv6 閘道時，將 IP 位址指定為隧道位址的 /127 子網路內的另一個 IPv6 位址
>     

IPv6 addresses are a little more picky than IPv4 addresses when it comes to the gateway IP address. Since you selected a /127 mask, this means exactly two IP addresses fit in that mask. However, this does not always mean that the IPv6 address that was supplied to you from your VPN provider is always the first address in the /127 subnet. It could also be the second address in the mask. In either case, you need to specify the IP provided by your VPN provider with a mask of /127 as the Tunnel Address in the WireGuard configuration, and the other IP in the /127 mask will be your IPv6 Gateway address. Use a command-line tool like ipcalc to determine which one is which.

當涉及到網關 IP 位址時，IPv6 位址比 IPv4 位址更挑剔。由於您選擇了 /127 掩碼，這表示該遮罩中正好有兩個 IP 位址。但是，這並不總是意味著從 VPN 提供者提供給您的 IPv6 位址始終是 /127 子網路中的第一個位址。它也可能是掩碼中的第二個位址。無論哪種情況，您都需要在 WireGuard 設定中指定 VPN 提供者提供的 IP（遮罩為 /127）作為隧道位址，而 /127 遮罩中的另一個 IP 將是您的 IPv6 閘道位址。使用 ipcalc 等命令列工具來確定哪個是哪個。

For example, let’s assume your VPN provider has instructed you to use the IP address fc00:bbbb:bbbb:bb01::4:fd3a/128 for your WireGuard tunnel. If you use ipcalc and change the mask to /127, you will find that the subnet fc00:bbbb:bbbb:bb01::4:fd3a/127 contains the following two addresses: fc00:bbbb:bbbb:bb01::4:fd3a and fc00:bbbb:bbbb:bb01::4:fd3b. Since you must use the address fc00:bbbb:bbbb:bb01::4:fd3a as the local address for your tunnel (as specified by your provider), configure fc00:bbbb:bbbb:bb01::4:fd3a/127 (with the /127 mask) as the local address in your WireGuard configuration page, and configure fc00:bbbb:bbbb:bb01::4:fd3b (without the /127 mask) as the IP address in your Gateway configuration page.

例如，我們假設您的 VPN 提供者已指示您使用 IP 地址 fc00:bbbb:bbbb:bb01::4:fd3a/128 用於您的 WireGuard 隧道。如果你使用ipcalc並將遮罩改為/127，你會發現子網 fc00:bbbb:bbbb:bb01::4:fd3a/127 包含以下兩個位址： fc00:bbbb:bbbb:bb01::4:fd3a 和 fc00:bbbb:bbbb:bb01::4:fd3b。由於您必須使用該地址 fc00:bbbb:bbbb:bb01::4:fd3a 作為隧道的本機位址（由提供者指定），配置 fc00:bbbb:bbbb:bb01::4:fd3a/127 （使用 /127 遮罩）作為 WireGuard 設定頁面中的本機位址，並配置 fc00:bbbb:bbbb:bb01::4:fd3b （沒有 /127 掩碼）作為 IP 位址位於您的網關設定頁面中。

In another case, if your VPN provider instructed you to use the IP address fc00:bbbb:bbbb:bb01::5:5277/128 for your WireGuard tunnel, ipcalc will tell you that the subnet fc00:bbbb:bbbb:bb01::5:5277/127 contains the following two addresses: fc00:bbbb:bbbb:bb01::5:5276 and fc00:bbbb:bbbb:bb01::5:5277. In this case, the higher address in the /127 subnet is your local IP, and you must use that one or the connection will not work. In this specific case, use fc00:bbbb:bbbb:bb01::5:5277/127 as the local IP address in your WireGuard VPN configuration page, and use fc00:bbbb:bbbb:bb01::5:5276 as the Gateway IP addresses.

在另一種情況下，如果您的 VPN 提供者指示您對 WireGuard 隧道使用 IP 位址 fc00:bbbb:bbbb:bb01::5:5277/128，ipcalc 將告訴您子網路 fc00:bbbb:bbbb:bb01::5:5277/127 000:bb和fc00:bbbb:bbbb:bb01::5:5277。在這種情況下，/127 子網路中較高的位址是您的本機 IP，您必須使用該位址，否則連線將無法運作。在這種特定情況下，請在 WireGuard VPN 設定頁面中使用 fc00:bbbb:bbbb:bb01::5:5277/127 作為本機 IP 位址，並使用 fc00:bbbb:bbbb:bb01::5:5276 作為網關 IP 位址。

For IPv4 the gateway address can always be one number below of the IP address provider by your VPN provider, but for IPv6 you must use the other address in the /127 subnet. Depending on the address you received from your VPN provider, this can be one address below or one address above your VPN IP address.

對於 IPv4，網關位址始終可以是 VPN 提供者提供的 IP 位址提供者下面的數字，但對於 IPv6，您必須使用 /127 子網路中的其他位址。根據您從 VPN 提供者收到的地址，該地址可能是您的 VPN IP 地址下方或上方的一個地址。

## Dealing with DNS leaks｜處理DNS洩漏

As noted in Step 8, if your network is configured to use a local DNS server - for example, unbound on OPNsense or on another local host - this how-to is likely to result in DNS requests from the hosts using the tunnel to be routed through the normal WAN gateway, rather than through the tunnel. This will result in the WAN IP being exposed.

如步驟 8 所述，如果您的網路設定為使用本機 DNS 伺服器（例如，在 OPNsense 或另一臺本機上未綁定），本指南可能會導致來自使用隧道的主機的 DNS 請求透過普通 WAN 閘道而不是透過隧道進行路由。這將導致 WAN IP 被揭露。

If you wish to avoid that, there are several possible solutions. Obviously what solution works best will depend on your network configuration and desired outcomes.

如果您想避免這種情況，有幾種可能的解決方案。顯然，哪種解決方案最有效取決於您的網路配置和期望的結果。

The solutions include:

解決方案包括：

1.  Force the local DNS server to use the tunnel as well. For a local DNS server that is not OPNsense, include the local IPs of that server in the Alias created in Step 7 for the relevant VPN hosts. For OPNsense itself, configure the DNS server to use the tunnel gateway. Implementing this solution will mean that all DNS traffic for your network will go through the tunnel, not just the DNS traffic for the hosts that are in the Alias (and, indeed, for a local DNS server that is not OPNsense, all traffic from that server, not just DNS traffic, will be forced through the tunnel). This may not be desirable for your circumstances  
    強製本地 DNS 伺服器也使用隧道。對於不是 OPNsense 的本機 DNS 伺服器，請將該伺服器的本機 IP 包含在步驟 7 中為相關 VPN 主機建立的別名中。對於 OPNsense 本身，將 DNS 伺服器設定為使用隧道閘道。實施此解決方案意味著網路的所有 DNS 流量都將通過隧道，而不僅僅是別名中主機的 DNS 流量（事實上，對於不是 OPNsense 的本地 DNS 伺服器，來自該伺服器的所有流量（而不僅僅是 DNS 流量）都將強制通過隧道）。這可能不適合您的情況
    
2.  If possible, intercept DNS traffic coming from the relevant hosts using the tunnel, and forward that traffic (by using a Destination NAT (Port Forward) rule in OPNsense) to a DNS server supplied by your VPN provider (see note below), or to a public DNS server. Note that this will break local DNS resolution. Note also that this will not always be possible to do - if the local DNS server that is configured generally for your network is not OPNsense itself and is on the same subnet as the hosts using the tunnel, then DNS requests will not be routed through OPNsense and so a Destination NAT (Port Forward) on OPNsense will not work  
    如果可能，請使用隧道攔截來自相關主機的 DNS 流量，並將該流量（透過使用 OPNsense 中的目標 NAT（連接埠轉送）規則）轉送至 VPN 提供者提供的 DNS 伺服器（請參閱下方的註解）或公用 DNS 伺服器。請注意，這會破壞本機 DNS 解析。另請注意，這並不總是可行 - 如果通常為您的網路配置的本機 DNS 伺服器不是 OPNsense 本身，並且與使用隧道的主機位於同一子網路中，則 DNS 請求將不會透過 OPNsense 路由，因此 OPNsense 上的目標 NAT（連接埠轉送）將無法運作
    
3.  Assuming you have configured DHCP static mappings in OPNsense for the hosts using the tunnel, specify in that configuration either the DNS servers supplied by your VPN provider (see note below), or public DNS servers. This will override the network-wide DNS settings for those hosts  
    假設您已在 OPNsense 中為使用隧道的主機設定 DHCP 靜態映射，請在該設定中指定 VPN 提供者提供的 DNS 伺服器（請參閱下方的註解）或公用 DNS 伺服器。這將覆蓋這些主機的網路範圍 DNS 設定
    
4.  Configure public DNS servers for your whole local network, rather than local DNS servers  
    為整個本地網路配置公共 DNS 伺服器，而不是本地 DNS 伺服器
    
5.  Manually override the DNS settings on the relevant hosts themselves (assuming that is possible) so that the DNS servers provided by DHCP are ignored, and either the DNS servers supplied by your VPN provider (see note below), or public DNS servers, are used instead  
    手動覆蓋相關主機本身的 DNS 設定（假設這是可能的），以便忽略 DHCP 提供的 DNS 伺服器，並使用 VPN 提供者提供的 DNS 伺服器（請參閱下面的註釋）或公共 DNS 伺服器
    

Note

筆記

If the DNS servers supplied by your VPN provider are local IPs (ie, within the scope of the `RFC1918_Networks` Alias created in Step 8), then, as discussed in Step 8, you will need to create an additional firewall rule in OPNsense to ensure that requests to those servers use the tunnel gateway rather than the normal WAN gateway. This rule would be similar to that created in Step 8, except that the destination would be your VPN provider’s DNS server IPs and the destination invert box would be unchecked. This rule would also need to be placed *above* the rule created in Step 8

如果您的 VPN 提供商提供的 DNS 服务器是本地 IP（即，在步骤 8 中创建的 `RFC1918_Networks` 别名范围内），那么，如步骤 8 中所述，您将需要在 OPNsense 中创建额外的防火墙规则，以确保对这些服务器的请求使用隧道网关而不是正常的 WAN網關。此規則與步驟 8 中建立的規則類似，不同之處在於目標將是您的 VPN 提供者的 DNS 伺服器 IP，且目標反轉框將處於未選取狀態。此規則也需要放置在步驟 8 中所建立的規則*上方*

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：WireGuard ProtonVPN Road Warrior Setup｜WireGuard ProtonVPN Road Warrior 設定](<159 WireGuard ProtonVPN Road Warrior 設定.md>)　｜　[下一篇：OpenConnect Setup｜OpenConnect 設定 ➡](<161 OpenConnect 設定.md>)
