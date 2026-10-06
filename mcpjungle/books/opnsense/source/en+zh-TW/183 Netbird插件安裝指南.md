---
title: "Netbird Plugin Setup Guide｜Netbird插件安裝指南"
title_original: "Netbird Plugin Setup Guide"
source: "https://docs.opnsense.org/manual/how-tos/netbird.html"
chapter: ["Community Plugins","Other"]
order: 183
lang: "bilingual"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:33:13.038Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：How To Setting Up A Mail Gateway｜如何設定郵件網關](<182 如何設定郵件網關.md>)　｜　[下一篇：Traceability of configuration changes using Git｜使用 Git 實現配置變更的可追溯性 ➡](<184 使用 Git 實現配置變更的可追溯性.md>)

# Netbird Plugin Setup Guide｜Netbird插件安裝指南

> 章節：[Community Plugins](<000 目錄.md#c-36>) › [Other](<000 目錄.md#c-38>)

## Introduction｜介紹

This guide explains how to install and configure the **Netbird** plugin on OPNsense. Netbird is a peer-to-peer VPN that simplifies secure networking between devices. The plugin allows OPNsense to join a Netbird network, providing routing, DNS resolution, and firewalling capabilities.

本指南說明如何在 OPNsense 上安裝和設定 **Netbird** 外掛程式。 Netbird 是一種點對點VPN協議，可簡化設備間的安全網路連線。該插件允許 OPNsense 加入 Netbird 網絡，並提供路由、 DNS解析和防火牆功能。

## Limitations｜限制

-   **Netbird Policies Do Not Create Firewall Rules on OPNsense** - The policies set in the Netbird management console **do not** automatically create firewall rules on OPNsense. - You need to manually configure the required firewall rules on the assigned `wt0` interface in OPNsense to allow or restrict traffic as needed.  
    **Netbird策略不會在OPNsense上建立防火牆規則**- 在Netbird管理主控台中設定的策略**不會**自動在OPNsense上建立防火牆規則。 - 您需要在OPNsense中手動配置分配給`wt0`介面的防火牆規則，以根據需要允許或限制流量。
    

## Installation｜安裝

The Netbird plugin can be installed directly from the official OPNsense repository.

Netbird 外掛程式可以直接從官方 OPNsense 儲存庫安裝。

### Installing via Web UI｜透過網頁安裝UI

1.  Navigate to **System** → **Firmware** → **Plugins**.  
    導航至**系統**→**韌體**→**插件**。
    
2.  Locate `os-netbird` in the list.  
    在列表中找到`os-netbird` 。
    
3.  Click the **+** button to install the plugin.  
    點選**+**按鈕安裝插件。
    

## Configuration｜配置

After installation, navigate to **VPN** → **Netbird** to configure the plugin.

安裝完成後，導覽至 **VPN** → **Netbird** 設定插件。

### Required Settings｜所需設定

-   **Management Server URL** - The URL of the Netbird management server (self-hosted or Netbird Cloud). - Example: `https://netbird.example.com`.  
    **管理伺服器URL** - Netbird 管理伺服器（自託管或 Netbird 雲端）的URL 。 - 例如： `https://netbird.example.com` 。
    
-   **Setup Key** - Generated in the Netbird management server. - Used to register OPNsense as a Netbird peer.  
    **設定金鑰** - 由 Netbird 管理伺服器產生。 - 用於將 OPNsense 註冊為 Netbird 對等節點。
    
-   **Optional Hostname** - Defines how OPNsense appears in the Netbird management console. - Example: `opnsense-router`.  
    **選用主機名稱** - 定義 OPNsense 在 Netbird 管理控制台中的顯示方式。 - 例如： `opnsense-router` 。
    

### General Settings｜常規設定

-   **Port (Default: 51820)** - The default WireGuard port. - Change this if another WireGuard server is already using the port. - Ensure this port is open on the **WAN interface** (Firewall rules required), otherwise only a relayed connection will be possible.  
    **連接埠（預設值：51820）**- WireGuard 的預設連接埠。 - 如果其他 WireGuard 伺服器已在使用該端口，請變更此設定。 - 請確保此連接埠在** WAN介面** 上已開啟（需要防火牆規則），否則只能建立中繼連線。
    
-   **Disable Server Routes** - When enabled, OPNsense **will not act as a routing peer**, preventing other Netbird peers from accessing networks behind OPNsense.  
    **停用伺服器路由**- 啟用後，OPNsense**將不會充當路由對等體**，從而阻止其他 Netbird 對等體存取 OPNsense 後面的網路。
    
-   **Disable Client Routes** - When enabled, OPNsense **will not use Netbird routes** to reach remote networks.  
    **停用客戶端路由**- 啟用後，OPNsense**將不會使用 Netbird 路由** 來連接遠端網路。
    
-   **Disable Netbird DNS Lookups** - When enabled, OPNsense **will not resolve Netbird hostnames** (e.g., `demo.netbird.selfhosted`) to IP addresses.  
    **停用 Netbird DNS查找**- 啟用後，OPNsense**將不會把 Netbird 主機名稱**（例如， `demo.netbird.selfhosted` ）解析為IP位址。
    
-   **Enable Rosenpass** - Enables **post-quantum encryption** using Rosenpass on top of WireGuard for enhanced security. - When enabled, this OPNsense peer will attempt to use Rosenpass for encrypted connections.  
    **啟用 Rosenpass**- 啟用 Rosenpass 在 WireGuard 之上的**後量子加密**，以增強安全性。 - 啟用後，此 OPNsense 對等體將嘗試使用 Rosenpass 進行加密連線。
    
-   **Rosenpass Permissive Mode** - When enabled, this peer will **prefer** Rosenpass for connections to other Rosenpass-enabled peers but will also allow connections to peers **without** Rosenpass. - When disabled, this peer will **only** connect to other peers that support Rosenpass, rejecting connections from non-Rosenpass peers.  
    **Rosenpass 寬容模式**- 啟用後，此對等點將**優先選擇 **Rosenpass 來連接到其他啟用 Rosenpass 的對等點，但也允許連接到**沒有**Rosenpass 的對等點。 - 停用後，此對等點將**僅**連接到支援 Rosenpass 的其他對等點，拒絕來自非 Rosenpass 對等點的連線。
    
-   **CARP Interface** - Defines how Netbird behaves in a high-availability (HA) setup using CARP. - **None**: If set to “None”（沒有任何）, Netbird will execute `netbird up` automatically and enable auto-connect. - **Specific Interface**: If an interface is selected, auto-connect is **disabled**, and Netbird must be manually started on the **MASTER** node by triggering a CARP event or executing `netbird up` manually.  
    **CARP介面** - 定義 Netbird 在高可用性 ( HA ) 設定中如何使用CARP運作。 - **無**：若設定為“None”（沒有任何） ，Netbird 將自動執行`netbird up`並啟用自動連線。 -**指定接口**：如果選擇指定接口，則自動連接將被**禁用**，並且必須在** MASTER ** 節點上手動啟動 Netbird，方法是觸發CARP事件或手動執行`netbird up` 。
    
-   **CARP VHID** - Sets the **Virtual Host ID (VHID)** for CARP when using Netbird in a high-availability (HA) setup. - This ID helps distinguish multiple CARP instances on the same network. - It should match the **VHID** used in the OPNsense HA configuration for proper failover behavior.  
    **CARP VHID** - 在高可用性 ( HA ) 設定中使用CARP時，設定 **虛擬主機ID ( VHID )**。 - 此ID有助於區分同一網路上的多個CARP實例。 - 為了實現正確的故障轉移行為，它應該與 OPNsense HA配置中使用的** VHID ** 相符。
    

After configuring the required settings, click **Save** and restart the Netbird service.

配置好所需設定後，點選**儲存**並重新啟動Netbird服務。

## Assigning the Interface｜分配介面

To enable firewalling, NAT, or routing, you need to assign the **wt0** interface.

若要啟用防火牆、 NAT或路由，您需要指派 **wt0** 介面。

1.  Go to **Interfaces** → **Assignments**.  
    轉到**介面**→**分配**。
    
2.  Locate the unassigned `wt0` interface.  
    找到未指派的`wt0`介面。
    
3.  Enter a name in the description field (e.g., **Netbird**).  
    在描述欄位中輸入名稱（例如，**Netbird**）。
    
4.  Click **Add** to assign it.  
    點選**新增**進行分配。
    
5.  Click on the **Netbird** interface to configure it.  
    點選 **Netbird** 介面進行配置。
    
6.  Check “Enable Interface”（啟用介面）  
    查看“Enable Interface”（啟用介面）
    
7.  optionally but recommended: Check “Prevent interface removal”  
    （可選但建議）勾選“防止介面移除”
    
8.  don’t set any IP address or gateway  
    不要設定任何IP位址或網關
    
9.  Click **Save**  
    點選**儲存**
    
10.  Click on **Apply changes**  
     點選**應用更改**
    

### Why Assign `wt0`?｜為什麼要分配`wt0` ？

-   Allows **incoming traffic from Netbird peers** (e.g., access to the OPNsense Web UI).  
    允許**來自 Netbird 對等方的傳入流量**（例如，存取 OPNsense Web UI ）。
    
-   Required for **firewalling, NAT, or advanced routing**.  
    **防火牆、 NAT或進階路由** 需要此功能。
    

## Network Address Translation (NAT)｜網路位址轉換（ NAT ）

If you want OPNsense to act as an **exit node** for Netbird peers:

如果您希望 OPNsense 作為 Netbird 對等節點的**出口節點**：

1.  Go to **Firewall** → **NAT** → **Source NAT (Outbound)**.  
    前往**防火牆**→** NAT **→**來源NAT （出站）**。
    
2.  Set the mode to **Hybrid Source NAT rule generation**.  
    將模式設定為**混合源NAT規則產生**。
    
3.  Add a rule to **translate traffic from Netbird (\`\`wt0\`\`) to the WAN interface**.  
    新增一條規則**將流量從 Netbird (\`\`w​​t0\`\`) 轉換到WAN 介面**。
    
4.  Save and apply changes.  
    儲存並套用變更。
    

## Firewall Rules｜防火牆規則

Firewall rules depend on your use case. However, some considerations:

防火牆規則取決於您的特定使用情境。但是，以下幾點需要考慮：

-   If **Rosenpass** is enabled, you may need to allow **incoming UDP traffic** on high ports (30,000–65,535).  
    如果啟用了 **Rosenpass**，您可能需要允許高連接埠（30,000–65,535）上的**入站UDP流量**。
    
-   Define rules on the `wt0` interface to control peer access.  
    在`wt0`介面上定義規則以控制對等存取。
    

## Accessing Logs｜訪問日誌

Netbird logs can be accessed via the Web UI:

可以透過 Web 存取 Netbird 日誌UI :

1.  Navigate to **VPN** → **Netbird** → **Log File**.  
    導航至 **VPN** → **Netbird**→**日誌檔**。
    
2.  Use logs to troubleshoot connection or routing issues.  
    使用日誌來排查連線或路由問題。
    

## Conclusion｜結論

The Netbird plugin for OPNsense provides a powerful way to integrate Netbird’s VPN capabilities. By assigning `wt0`, setting up NAT, and configuring firewall rules, OPNsense can serve as a routing peer or an exit node for Netbird networks.

OPNsense 的 Netbird 外掛提供了一種強大的方式來整合 Netbird 的VPN功能。透過分配`wt0` 、設定NAT以及設定防火牆規則，OPNsense 可以作為 Netbird 網路的路由對等體或出口節點。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：How To Setting Up A Mail Gateway｜如何設定郵件網關](<182 如何設定郵件網關.md>)　｜　[下一篇：Traceability of configuration changes using Git｜使用 Git 實現配置變更的可追溯性 ➡](<184 使用 Git 實現配置變更的可追溯性.md>)
