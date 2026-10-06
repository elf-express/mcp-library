---
title: "Gateway groups Multi WAN｜網關組 Multi WAN"
title_original: "Gateway groups Multi WAN"
source: "https://docs.opnsense.org/manual/multiwan.html"
chapter: ["System","Gateway groups / Multi WAN"]
order: 94
lang: "bilingual"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:32:27.436Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Gateways｜閘道](<93 閘道.md>)　｜　[下一篇：Multi WAN｜多色WAN ➡](<95 多色WAN.md>)

# Gateway groups Multi WAN｜網關組 Multi WAN

> 章節：[System](<000 目錄.md#c-11>) › [Gateway groups / Multi WAN](<000 目錄.md#c-16>)

## Gateway groups / Multi WAN｜網關組 / 多WAN

Multi WAN scenarios are commonly used for failover or load balancing, but combinations are also possible with OPNsense.

多WAN場景通常用於故障轉移或負載平衡，但OPNsense也可以進行組合。

![](<../images/109fc484-blockdiag-1047710c3257429e30bd2ac4adccfc.png>)

The technology used to offer multiwan is called “policy based routing” or “source routing” and depends on the [firewall](<137 規則.md>) functionality of OPNsense.

用於提供多WAN的技術稱為“基於策略的路由”或“來源路由”，它依賴OPNsense的[防火牆](<137 規則.md>)功能。

Note

注意事項

Currently it’s not possible to use gateways without an address (Interface option “Dynamic gateway policy”) inside a group. This is due to the fact that the firewall requires an address of the right family (IPv4 / IPv6) to be present on the interface, which can not be guaranteed based on its configuration at the moment.

目前，在群組內無法使用沒有位址的網關（介面選項「動態網關策略」）。這是因為防火牆要求介面上必須存在正確位址族（IPv4/IPv6）的位址，而根據目前的配置，無法保證這一點。

## Terminology｜術語

When configuring gateway groups, there is a limited number of options and terms being used. Besides the name of the group, one can find the following terms on the page:

配置網關組時，可用的選項和術語數量有限。除了群組名稱之外，頁面上還會出現以下術語：

---

|   |   |
| --- | --- |
| Gateway Priority<br>網關優先 | If a gateway is configured for a group, the ‘when’ part is divided into ‘tiers,’ with lower numbers (starting at 1) indicating higher importance. When no usable gateways are present within a peer, the next one is considered.<br>如果為群組配置網關，則“時間”部分將分為“層”，數字越低（從 1 開始）表示重要性越高。當對等點內不存在可用網關時，將考慮下一個網關。 |
| Trigger Level<br>觸發等級 | When a gateway inside the tier is considered offline, either when its fully down, has loss or increased latency.<br>當層級內的閘道被視為離線時，無論是完全宕機、丟包或延遲增加。 |
| Pool Options<br>資訊池選項 | Usually left to default, but can influence stickiness for sources on a per group basis.<br>通常保留預設設置，但可以針對每個群組影響資訊來源的黏性。 |

## Roles｜角色

Using ‘tiers’, multiple scenarios can be constructed, by grouping gateways inside the same tier or choosing to move them to different ones. Below the most common scenarios.

利用「層級」概念，可以透過將網關分組到同一層級或將其移動到不同層級來建構多種場景。以下是一些最常見的場景。

### WAN Failover｜WAN故障轉移

WAN failover automatically switches between WAN connections in case of connectivity loss (or high latency) of your primary ISP. As long as the connection is not good all traffic will be routed of the next available ISP/WAN connection and when connectivity is fully restored so will the routing switch back to the primary ISP.

當主連接ISP發生連線遺失（或延遲過高）時， WAN故障轉移功能會自動在WAN連線之間切換。只要連接不穩定，所有流量都會透過下一個可用的ISP/WAN連接進行路由；當連接完全恢復後，路由也會切換回主連接ISP 。

### WAN Load Balancing｜WAN負載平衡

Load balancing can be used to split the load between two (or more) ISPs. This enhances the total available bandwidth and/or lowers the load on each ISP.

負載平衡可用於在兩個（或多個）ISP之間分配負載。這可以提高總可用頻寬和/或降低每個ISP的負載。

The principle is simple: Each WAN connection (gateway) gets a portion of the traffic. The traffic can be divided equally or weighted.

原理很簡單：每個WAN連接（網關）都會獲得一部分流量。流量可以平均分配，也可以按權重分配。

### Combining Balancing & Failover｜結合負載平衡和故障轉移

It is also possible to combine Load Balancing with Failover in such scenarios you will have 2 or more WAN connections for Balancing purposes and 1 or more for Failover. OPNsense offers 5 tiers (Failover groups) each tier can hold multiple ISPs/WAN gateways.

在這種情況下，也可以將負載平衡與故障轉移結合使用，您將擁有 2 個或更多用於負載平衡WAN連接，以及 1 個或多個用於故障轉移的連接。 OPNsense 提供 5 個層級（故障轉移群組），每個層級可容納多個 ISP/ WAN閘道。

## Configuration｜配置

For a how to configure read:

有關如何配置，請閱讀：

-   [Multi WAN](<95 多色WAN.md>)  
    [多合一WAN](<95 多色WAN.md>)

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Gateways｜閘道](<93 閘道.md>)　｜　[下一篇：Multi WAN｜多色WAN ➡](<95 多色WAN.md>)
