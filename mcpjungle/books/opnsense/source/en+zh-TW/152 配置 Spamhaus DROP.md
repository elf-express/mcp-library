---
title: "Configure Spamhaus DROP｜配置 Spamhaus DROP"
title_original: "Configure Spamhaus DROP"
source: "https://docs.opnsense.org/manual/how-tos/drop.html"
chapter: ["Firewall","Setup guides"]
order: 152
lang: "bilingual"
translated_by: "gtx"
captured: "2026-09-26T11:32:57.372Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Organize PF Rules by Category｜依類別整理PF規則](<151 依類別整理PF規則.md>)　｜　[下一篇：Security Zones｜安全區 ➡](<153 安全區.md>)

# Configure Spamhaus DROP｜配置 Spamhaus DROP

> 章節：[Firewall](<000 目錄.md#c-26>) › [Setup guides](<000 目錄.md#c-31>)

The Spamhaus Don’t Route Or Peer Lists

Spamhaus 不路由或對等列表

DROP (Don’t Route Or Peer) and DROPv6 are advisory “drop all traffic” lists, consisting of netblocks that are “hijacked” or leased by professional spam or cyber-crime operations (used for dissemination of malware, trojan downloaders, botnet controllers). The DROP and DROPv6 lists are a tiny subset of the SBL, designed for use by firewalls and routing equipment to filter out the malicious traffic from these netblocks.

DROP（不要路由或對等）和 DROPv6 是建議性「丟棄所有流量」列表，由專業垃圾郵件或網路犯罪操作（用於傳播惡意軟體、木馬下載器、殭屍網路控制器）「劫持」或租用的網路區塊組成。 DROP 和 DROPv6 清單是 SBL 的一個小子集，設計用於防火牆和路由設備過濾掉來自這些網路區塊的惡意流量。

*Source :* [https://www.spamhaus.org/drop/](https://www.spamhaus.org/drop/)

*來源：* [https://www.spamhaus.org/drop/](https://www.spamhaus.org/drop/)

For this How-To we will use the Alias feature and a firewall block rule. The lists for this example are located here:

對於本操作方法，我們將使用別名功能和防火牆封鎖規則。此範例的清單位於此處：

> -   [DROP list](https://www.spamhaus.org/drop/drop_v4.json)  
      [DROP列表](https://www.spamhaus.org/drop/drop_v4.json)
>     
> -   [DROPv6 list](https://www.spamhaus.org/drop/drop_v6.json)  
      [刪除v6列表](https://www.spamhaus.org/drop/drop_v6.json)
>     

## Step 1 - Create an Alias for Spamhaus｜步驟 1 - 為 Spamhaus 建立別名

Go to Firewall ‣ Aliases ‣ All and press the **Add a new alias** button in the top right corner of the form.

前往 Firewall ‣ Aliases ‣ All 並按下表單右上角的 **Add a new alias** 按鈕。

Enter the following data:

輸入以下數據：

|   |   |   |
| --- | --- | --- |
| **Name**<br>**姓名** | spamhaus\_drop | *Name of our alias*<br>*我們的別名* |
| **Description**<br>**描述** | Spamhaus DROP | *Freely chosen description*<br>*自由選擇的描述* |
| **Type**<br>**類型** | URL Table in JSON format (IPs)<br>URL JSON 格式的表格 (IP) | *URL type*<br>*URL型* |
| **Content**<br>**內容** | [https://www.spamhaus.org/drop/drop\_v4.json](https://www.spamhaus.org/drop/drop_v4.json) | *Don’t Route Or Peer List*<br>*不要路由或對等清單* |
| **Path expression**<br>**路徑表達式** | cidr<br>西德 | *JSON field to be used*<br>*JSON 使用欄位* |

Set the refresh frequency to 1 for each day.

將每天的刷新頻率設定為 1。

Press **Save** and then **Add a new alias**.

按**儲存**，然後**新增別名**。

|   |   |   |
| --- | --- | --- |
| **Name**<br>**姓名** | spamhaus\_dropv6 | *Name of our alias*<br>*我們的別名* |
| **Description**<br>**描述** | Spamhaus DROPv6 | *Freely chosen description*<br>Spamhaus DROPv6 *自由選擇的描述* |
| **Type**<br>**類型** | URL Table in JSON format (IPs)<br>URL JSON 格式的表格 (IP) | *URL type*<br>*URL型* |
| **Content**<br>**內容** | [https://www.spamhaus.org/drop/drop\_v6.json](https://www.spamhaus.org/drop/drop_v6.json) | *Don’t Route Or Peer List v6*<br>*不要路由或對等清單 v6* |
| **Path expression**<br>**路徑表達式** | cidr<br>西德 | *JSON field to be used*<br>*JSON 要使用的欄位* |

Set the refresh frequency to 1 for each day.

將每天的刷新頻率設定為 1。

Press **Save** and then **Apply changes**.

按**儲存**，然後**套用變更**。

## Step 2 - Firewall Rules Inbound Traffic｜第 2 步 - 防火牆規則入站流量

We will block incoming connections and outgoing connections for the drop and dropv6 lists. To do so we will start with inbound traffic on the WAN interface. Go to Firewall ‣ Rules Select the **WAN** tab and press the **+** icon in the lower right corner.

我們將阻止 drop 和 dropv6 清單的傳入連線和傳出連線。為此，我們將從 WAN 介面上的入站流量開始。前往防火牆 ‣ 規則 選擇 **WAN**選項卡，然後按右下角的**+** 圖示。

Enter the following configuration and leave all other parameters on default values:

輸入以下配置並將所有其他參數保留為預設值：

|   |   |   |
| --- | --- | --- |
| **Action**<br>**行動** | Block<br>區塊 | *Choose block to drop the incoming traffic*<br>*選擇阻止傳入流量* |
| **Interface**<br>**介面** | WAN | *Should be the default value*<br>*應該是預設值* |
| **TCP/IP Version**<br>**TCP/IP版本** | IPv4 | *For our example we use IPv4*<br>*對於我們的範例，我們使用 IPv4* |
| **Source**<br>**來源** | spamhaus\_drop | *Our alias for the DROP list*<br>*我們的 DROP 列表別名* |
| **Category**<br>**類別** | Spamhaus<br>斯帕姆豪斯 | *Freely chosen Category*<br>*自由選擇類別* |
| **Description**<br>**描述** | Block DROP<br>區塊DROP | *Freely chosen description*<br>*自由選擇的描述* |

**Save** and repeat this action for the DROPv6 list:

**儲存**並對 DROPv6 清單重複此操作：

|   |   |   |
| --- | --- | --- |
| **Action**<br>**行動** | Block<br>區塊 | *Choose block to drop the incoming traffic*<br>*選擇阻止傳入流量* |
| **Interface**<br>**介面** | WAN | *Should be the default value*<br>*應該是預設值* |
| **TCP/IP Version**<br>**TCP/IP版本** | IPv6 | *For our example we use IPv6*<br>*對於我們的範例，我們使用 IPv6* |
| **Source**<br>**來源** | spamhaus\_dropv6 | *Our alias for the DROP list*<br>*我們的 DROP 清單別名* |
| **Category**<br>**類別** | Spamhaus<br>斯帕姆豪斯 | *Freely chosen Category*<br>*自由選擇類別* |
| **Description**<br>**描述** | Block DROPv6<br>阻止 DROPv6 | *Freely chosen description*<br>*自由選擇的描述* |

**Save**

**儲存**

## Step 3 - Firewall Rules Outbound Traffic｜步驟 3 - 防火牆規則出站流量

Now do the same for outbound traffic on the LAN interface. Go to Firewall ‣ Rules Select the **LAN** tab and press the **+** icon in the lower right corner.

現在對 LAN 介面上的出站流量執行相同的操作。前往防火牆 ‣ 規則 選擇 **LAN**選項卡，然後按右下角的**+** 圖示。

|   |   |   |
| --- | --- | --- |
| **Action**<br>**行動** | Block<br>區塊 | *Choose block to drop the incoming traffic*<br>*選擇阻止傳入流量* |
| **Interface**<br>**介面** | LAN | *Should be the default value*<br>*應該是預設值* |
| **TCP/IP Version**<br>**TCP/IP版本** | IPv4 | *For our example we use IPv4*<br>*對於我們的範例，我們使用 IPv4* |
| **Destination**<br>**目的地** | spamhaus\_drop | *Our alias for the DROP list*<br>*我們的 DROP 列表別名* |
| **Category**<br>**類別** | Spamhaus<br>斯帕姆豪斯 | *Freely chosen Category*<br>*自由選擇類別* |
| **Description**<br>**描述** | Block DROP<br>區塊DROP | *Freely chosen description*<br>*自由選擇的描述* |

**Save** and add the DROPv6 list:

**儲存**並新增 DROPv6 清單：

|   |   |   |
| --- | --- | --- |
| **Action**<br>**行動** | Block<br>區塊 | *Choose block to drop the incoming traffic*<br>*選擇阻止傳入流量* |
| **Interface**<br>**介面** | LAN | *Should be the default value*<br>*應該是預設值* |
| **TCP/IP Version**<br>**TCP/IP版本** | IPv6 | *For our example we use IPv6*<br>*對於我們的範例，我們使用 IPv6* |
| **Destination**<br>**目的地** | spamhaus\_dropv6 | *Our alias for the DROPv6 list*<br>*我們的 DROPv6 清單的別名* |
| **Category**<br>**類別** | Spamhaus<br>斯帕姆豪斯 | *Freely chosen Category*<br>*自由選擇類別* |
| **Description**<br>**描述** | Block DROPv6<br>阻止 DROPv6 | *Freely chosen description*<br>*自由選擇的描述* |

**Save** and **Apply changes**

**儲存**並**套用變更**

**DONE**

## Check pf Tables｜檢查 pf 表

To list the IP addresses that are currently in the DROP and DROPv6 lists go to Firewall ‣ Diagnostics ‣ Aliases and select the list you want to see.

若要列出目前位於 DROP 和 DROPv6 清單中的 IP 位址，請前往防火牆 ‣ 診斷 ‣ 別名，然後選擇您要查看的清單。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Organize PF Rules by Category｜依類別整理PF規則](<151 依類別整理PF規則.md>)　｜　[下一篇：Security Zones｜安全區 ➡](<153 安全區.md>)
