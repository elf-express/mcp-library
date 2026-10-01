---
title: "Netbird 外掛程式安裝指南"
title_original: "Netbird Plugin Setup Guide"
source: "https://docs.opnsense.org/manual/how-tos/netbird.html"
chapter: ["Community Plugins","Other"]
order: 183
lang: "zh-TW"
translated_by: "gtx"
captured: "2026-09-26T11:33:13.038Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：如何設定郵件網關](<182 如何設定郵件網關.md>)　｜　[下一篇：使用 Git 追蹤配置更改 ➡](<184 使用 Git 追蹤配置更改.md>)

# Netbird 外掛程式安裝指南

> 章節：[Community Plugins](<000 目錄.md#c-36>) › [Other](<000 目錄.md#c-38>)

## 介紹

本指南說明如何在 OPNsense 上安裝和設定 **Netbird** 外掛程式。 Netbird 是一種點對點VPN，可簡化裝置之間的安全網路。該插件允許 OPNsense 加入 Netbird 網絡，提供路由、DNS 解析度和防火牆功能。

## 限制

-   **Netbird 策略不會在 OPNsense 上建立防火牆規則**- Netbird 管理控制台中設定的策略**不會**在 OPNsense 上自動建立防火牆規則。 - 您需要在 OPNsense 中指派的`wt0` 介面上手動設定所需的防火牆規則，以根據需要允許或限制流量。
    

## 安裝

Netbird 外掛程式可以直接從官方 OPNsense 儲存庫安裝。

### 透過網路安裝UI

1.  導航至 **系統**→**韌體**→**插件**。
    
2.  在列表中找到 `os-netbird`。
    
3.  點選 ****** 按鈕安裝插件。
    

## 配置

安裝後，導覽至 **VPN**→**Netbird** 來設定插件。

### 所需設定

-   **管理伺服器 URL** - Netbird 管理伺服器（自託管或 Netbird 雲端）的 URL。 - 範例：`https://netbird.example.com`。
    
-   **安裝金鑰** - 在 Netbird 管理伺服器中產生。 - 用於將 OPNsense 註冊為 Netbird 對等點。
    
-   **選用主機名稱** - 定義 OPNsense 在 Netbird 管理控制台中的顯示方式。 - 範例：`opnsense-router`。
    

### 常規設定

-   **連接埠（預設：51820）**- 預設 WireGuard 連接埠。 - 如果另一個 WireGuard 伺服器已在使用該端口，請變更此設定。 - 確保此連接埠在**WAN 介面** 上開啟（需要防火牆規則），否則只能進行中繼連線。
    
-   **停用伺服器路由**- 啟用後，OPNsense**將不會充當路由對等點**，從而防止其他 Netbird 對等點存取 OPNsense 後面的網路。
    
-   **停用客戶端路由**- 啟用後，OPNsense**將不會使用 Netbird 路由** 來存取遠端網路。
    
-   **停用 Netbird DNS 尋找**- 啟用後，OPNsense**不會將 Netbird 主機名稱**（例如，`demo.netbird.selfhosted`）解析為 IP 位址。
    
-   **啟用 Rosenpass**- 在 WireGuard 之上使用 Rosenpass 啟用**後量子加密**，以增強安全性。 - 啟用後，此 OPNsense 對等點將嘗試使用 Rosenpass 進行加密連線。
    
-   **Rosenpass 寬容模式**- 啟用後，此對等點將**優先選擇 **Rosenpass 來連接到其他啟用 Rosenpass 的對等點，但也允許連接到**沒有**Rosenpass 的對等點。 - 停用後，此對等點將**僅**連接到支援 Rosenpass 的其他對等點，拒絕來自非 Rosenpass 對等點的連線。
    
-   **CARP 介面**- 定義 Netbird 在使用 CARP 的高可用性 (HA) 設定中的行為方式。 -**無**：如果設定為“無”，Netbird將自動執行`netbird up`並啟用自動連線。 -**特定接口**：如果選擇了某個接口，則**禁用**，並且必須通過觸發CARP事件或手動執行`netbird up`在**MASTER**節點上手動啟動Netbird。
    
-   **CARP VHID**- 在高可用性 (HA) 設定中使用 Netbird 時，為 CARP 設定**虛擬主機 ID (VHID)**。 - 這個ID有助於區分同一網路上的多個CARP實例。 - 它應與 OPNsense HA 配置中使用的**VHID** 相匹配，以實現正確的故障轉移行為。
    

配置完所需的設定後，按一下「**儲存**」並重新啟動 Netbird 服務。

## 分配介面

若要啟用防火牆、NAT 或路由，您需要指派 **wt0** 介面。

1.  轉到 **介面**→**分配**。
    
2.  找到未指派的`wt0`介面。
    
3.  在描述欄位中輸入名稱（例如 **Netbird**）。
    
4.  按一下“**新增**”進行指派。
    
5.  按一下**Netbird**介面進行配置。
    
6.  勾選“啟用介面”
    
7.  可選但建議：選取“防止介面刪除”
    
8.  不要設定任何IP位址或網關
    
9.  點選**儲存**
    
10.  點擊**應用更改**
    

### 為什麼分配`wt0`？

-   允許 **來自 Netbird 對等點的傳入流量**（例如，存取 OPNsense Web UI）。
    
-   **防火牆、NAT 或進階路由** 需要。
    

## 網路位址轉換 (NAT)

如果您希望 OPNsense 充當 Netbird 對等方的 **退出節點**：

1.  轉至 **防火牆**→**NAT**→**來源 NAT（出站）**。
    
2.  將模式設定為**混合源NAT規則產生**。
    
3.  新增一條規則**將流量從 Netbird (\`\`w​​t0\`\`) 轉換到WAN 介面**。
    
4.  儲存並套用變更。
    

## 防火牆規則

防火牆規則取決於您的用例。然而，一些注意事項：

-   如果啟用 **Rosenpass**，您可能需要允許高連接埠 (30,000–65,535) 上的**傳入 UDP 流量**。
    
-   在`wt0`介面上定義規則來控制對等存取。
    

## 訪問日誌

Netbird 日誌可透過 Web UI 存取：

1.  導航至 **VPN**→**Netbird**→**日誌檔**。
    
2.  使用日誌來解決連線或路由問題。
    

## 結論

OPNsense 的 Netbird 外掛提供了一種整合 Netbird 的 VPN 功能的強大方法。透過分配`wt0`、設定NAT以及配置防火牆規則，OPNsense 可以充當 Netbird 網路的路由對等點或出口節點。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：如何設定郵件網關](<182 如何設定郵件網關.md>)　｜　[下一篇：使用 Git 追蹤配置更改 ➡](<184 使用 Git 追蹤配置更改.md>)
