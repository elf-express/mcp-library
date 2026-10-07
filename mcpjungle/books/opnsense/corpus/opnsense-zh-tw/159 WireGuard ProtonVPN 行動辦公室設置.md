---
title: "WireGuard ProtonVPN 行動辦公室設置"
title_original: "WireGuard ProtonVPN Road Warrior Setup"
source: https://docs.opnsense.org/manual/how-tos/wireguard-client-proton.html
chapter: ["Virtual Private Networking","Wireguard","Examples"]
order: 159
lang: "zh-TW"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:33:00.894Z"
---

# WireGuard ProtonVPN 行動辦公室設置

## 介紹

ProtonVPN 是基於雲端的VPN供應商，提供安全隧道並保護隱私。要將 WireGuard VPN連接到 ProtonVPN，我們假設您熟悉 WireGuard 的概念，並且已經閱讀了基本操作指南 [WireGuard Road Warrior Setup](<156 WireGuard Road Warrior 設置.md>) 。

## 步驟 1 - 下載 ProtonVPN 配置

設定資訊可在 ProtonVPN 網站上找到。登入後會顯示[登入頁面](https://account.protonvpn.com/dashboard) 。點選左側面板的「下載」或前往[下載頁面](https://account.protonvpn.com/downloads)並向下捲動至[WireGuard 設定](https://account.protonvpn.com/downloads#wireguard-configuration)

首先顯示的是現有的 WireGuard 配置及其到期日期，接下來是產生新配置的選項。

[圖](https://docs.opnsense.org/_images/proton_wireguard_configuration.png)

-   為產生的配置選擇一個名稱
    

注意事項

如果未提供名稱，ProtonVPN 將產生一個唯一的ID 。

-   選擇路由器作為平台
    
-   選擇VPN選項
    
    -   NetShield 攔截器過濾有 3 種選項。
        
        -   無濾鏡
            
        -   封鎖惡意軟體
            
        -   封鎖惡意軟體、廣告和追蹤器
            
    -   此外，還可以選擇啟用「中等」 NAT, NAT-PMP （連接埠轉送）和VPN加速器。這些功能在ProtonVPN網站上有詳細說明。
        
    -   選擇符合您要求的選項，然後進入下一部分。
        
-   選擇要連接的伺服器
    
    -   ProtonVPN 會推薦最佳伺服器，或允許使用者手動選擇。
        
    -   手動選擇時，主要有兩種選擇：
        
        -   標準配置與安全核心配置
            
        -   出境國
            
    -   選擇滿足您要求的選項，然後點選「建立」產生配置。
        
    -   操作成功後，螢幕上將出現如下視窗。
        

[圖](https://docs.opnsense.org/_images/proton_configuration_1.png)

完整的配置如下：

```
[Interface]
# Bouncing = 0
# NetShield = 1
# Moderate NAT = off
# NAT-PMP (Port Forwarding) = off
# VPN Accelerator = on
PrivateKey = 2Kh7TlGz+7PCFa0jEHat8IWkYZgPmDLAiagGq+dyLks=
Address = 10.2.0.2/32
DNS = 10.2.0.1

[Peer]
# NO#21
PublicKey = KOITt3KQ72LHPbpVp7kp4cQo/qw2qvKPrN732UTWWFw=
AllowedIPs = 0.0.0.0/0
Endpoint = 146.70.170.18:51820
```

注意事項

配置創建完成後，私鑰就會消失，因此必須妥善保存。下一節將使用私鑰產生公鑰。私鑰和公鑰對於成功配置都至關重要。

警告

**請勿重複使用這些範例中的私鑰**

## 步驟 2 - 從私鑰產生公鑰

與 Mullvad 或其他WG實作不同，ProtonVPN 僅提供私鑰。私鑰會在 Web UI中產生配置時短暫顯示。公鑰將使用“wg pubkey”指令從私鑰派生而來。

視窗

```
echo wgPrivateKey | wg pubkey
```

Linux

```
wg pubkey < wgPrivateKey
```

## 步驟 3 - 設定 WireGuard 實例

-   前往VPN ‣ WireGuard ‣ 設定 ‣ 實例
    
-   點選 **+** 新增新的實例配置
    
-   開啟“進階模式”
    
-   根據下載的 ProtonVPN 配置，如下配置實例（如果下面未提及某個選項，請保留預設值）：
    
    > |   |   |
    > | --- | --- |
    > | **啟用** | *已檢查* |
    > | **名稱** | *你可以隨意命名（例如* `ProtonVPN-ExitCountry` *）* |
    > | **公鑰** | *插入上一步產生的公鑰* |
    > | **私鑰** | *插入* `[Interface]` *部分中的* `PrivateKey` *字段* |
    > | **監聽埠** | *51820 或更高編號的唯一連接埠* |
    > | **MTU** | *需要比正常的MTU短 80 位元組。預設值為 1420* |
    > | **DNS伺服器** | *插入* `DNS` *欄位（來自* `[Interface]` *部分，不包含子網路遮罩）* |
    > | **隧道地址** | *插入* `Address` *部分中的* `[Interface]` *字段，格式為CIDR ，例如10.2.0.2/32 * |
    > | **同行** | *暫時留空* |
    > | **禁用路由** | *已勾選* |
    > | **網關** | *請輸入與上方DNS伺服器欄位相同的位址* |
    
-   **儲存**實例配置，然後按一下**套用**
    

## 步驟 4 - 設定對等體

-   前往VPN ‣ WireGuard ‣ 設定 ‣ 對等節點
    
-   點選**+**新增同伴
    
-   根據下載的 ProtonVPN 配置，如下配置對等節點（如果下面未提及某個選項，請保留預設值）：
    
    > |   |   |
    > | --- | --- |
    > | **啟用** | *已檢查* |
    > | **名稱** | *你可以隨意命名（例如* `ProtonVPN_Location` *）* |
    > | **公鑰** | *插入* `PublicKey` *字段，來自* `[Peer]` *部分* |
    > | **允許的 IP 位址** | * 0.0.0.0/0 * |
    > | **端點位址** | *將* `Endpoint` *欄位中的IP位址插入* `[Peer]` *部分* |
    > | **端點連接埠** | *將* `Endpoint` *欄位中的連接埠號碼插入* `[Peer]` *部分* |
    > | **實例** | *選擇上一個步驟配置的實例* |
    > | **保持在線** | *25* |
    
-   **儲存**對等配置，然後按一下**套用**
    

注意事項

由於 OPNsense 版本23.7.9中配置實例和對等體的UI發生了變化，因此某些欄位的位置可能有所不同。

## 步驟 5 - 啟用 WireGuard

如果 WireGuard 尚未開啟，請在VPN ‣ WireGuard ‣ 設定 ‣ 常規 中開啟它。

## 步驟 6 - 設定分配、網關和路由

其餘步驟與選擇性路由操作指南 [WireGuard 選擇性路由到外部VPN端點](<160 WireGuard 選擇性路由到外部VPN端點.md>)中所述的步驟基本相同。

## ProtonVPN DNS洩露

由於 ProtonVPN 提供了一個DNS伺服器，因此可能需要額外的防火牆規則將DNS流量路由到 WireGuard 閘道。

-   前往“防火牆”‣“規則”‣“[主機/網路所在的網路介面名稱，例如， LAN代表LAN主機]”
    
-   按一下 **新增** 新增規則
    
-   配置規則如下（如果下面未提及選項，請將其保留為預設值）：
    
    > |   |   |
    > | --- | --- |
    > | **行動** | *透過* |
    > | **快** | *已檢查* |
    > | **介面** | *您設定規則的任何介面* |
    > | **方向** | *在* |
    > | **TCP/IP版本** | *IPv4* |
    > | **協議** | *TCP/UDP* |
    > | **來源/反相** | *未選取* |
    > | **來源** | * 您的DNS伺服器的IP * |
    > | **目的地/反轉** | *已檢查* |
    > | **目的地** | *請在下拉式選單中選擇* `RFC1918_Networks` *您在上面建立的別名* |
    > | **目標埠範圍** | * DNS - DNS * |
    > | **描述** | *如果您願意，請新增一個* |
    > | **網關** | *選擇根據選擇性路由操作指南頁面建立的 WireGuard 閘道（例如* `WAN_ProtonVPN` *）* |
    
-   **儲存**規則，然後按一下**套用變更**
    
-   然後確保新規則**高於**介面上任何其他規則，否則會幹擾其操作。例如，您希望新規則高於“預設允許 LAN 任何規則”
    

通俗地說，如果DNS伺服器向非本地位址發出任何請求，它將通過VPN網關。

ProtonVPN 網站上的所有圖片均為 ProtonVPN 所有，並已獲得書面許可使用。