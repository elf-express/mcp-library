---
title: "配置 Spamhaus DROP"
title_original: "Configure Spamhaus DROP"
source: https://docs.opnsense.org/manual/how-tos/drop.html
chapter: ["Firewall","Setup guides"]
order: 152
lang: "zh-TW"
translated_by: "gtx"
captured: "2026-09-26T11:32:57.372Z"
---


# 配置 Spamhaus DROP


Spamhaus 不路由或對等列表

DROP（不要路由或對等）和 DROPv6 是建議性「丟棄所有流量」列表，由專業垃圾郵件或網路犯罪操作（用於傳播惡意軟體、木馬下載器、殭屍網路控制器）「劫持」或租用的網路區塊組成。 DROP 和 DROPv6 清單是 SBL 的一個小子集，設計用於防火牆和路由設備過濾掉來自這些網路區塊的惡意流量。

*來源：* [https://www.spamhaus.org/drop/](https://www.spamhaus.org/drop/)

對於本操作方法，我們將使用別名功能和防火牆封鎖規則。此範例的清單位於此處：

> -   [DROP列表](https://www.spamhaus.org/drop/drop_v4.json)
>     
> -   [刪除v6列表](https://www.spamhaus.org/drop/drop_v6.json)
>     

## 步驟 1 - 為 Spamhaus 建立別名

前往 Firewall ‣ Aliases ‣ All 並按下表單右上角的 **Add a new alias** 按鈕。

輸入以下數據：

|   |   |   |
| --- | --- | --- |
| **姓名** | spamhaus\_drop | *我們的別名* |
| **描述** | Spamhaus DROP | *自由選擇的描述* |
| **類型** | URL JSON 格式的表格 (IP) | *URL型* |
| **內容** | [https://www.spamhaus.org/drop/drop\_v4.json](https://www.spamhaus.org/drop/drop_v4.json) | *不要路由或對等清單* |
| **路徑表達式** |西德 | *JSON 使用欄位* |

將每天的刷新頻率設定為 1。

按**儲存**，然後**新增別名**。

|   |   |   |
| --- | --- | --- |
| **姓名** | spamhaus\_dropv6 | *我們的別名* |
| **描述** | Spamhaus DROPv6 | Spamhaus DROPv6 *自由選擇的描述* |
| **類型** | URL JSON 格式的表格 (IP) | *URL型* |
| **內容** | [https://www.spamhaus.org/drop/drop\_v6.json](https://www.spamhaus.org/drop/drop_v6.json) | *不要路由或對等清單 v6* |
| **路徑表達式** |西德 | *JSON 要使用的欄位* |

將每天的刷新頻率設定為 1。

按**儲存**，然後**套用變更**。

## 第 2 步 - 防火牆規則入站流量

我們將阻止 drop 和 dropv6 清單的傳入連線和傳出連線。為此，我們將從 WAN 介面上的入站流量開始。前往防火牆 ‣ 規則 選擇 **WAN**選項卡，然後按右下角的**+** 圖示。

輸入以下配置並將所有其他參數保留為預設值：

|   |   |   |
| --- | --- | --- |
| **行動** |區塊| *選擇阻止傳入流量* |
| **介面** | WAN | *應該是預設值* |
| **TCP/IP版本** | IPv4 | *對於我們的範例，我們使用 IPv4* |
| **來源** | spamhaus\_drop | *我們的 DROP 列表別名* |
| **類別** |斯帕姆豪斯 | *自由選擇類別* |
| **描述** |區塊DROP| *自由選擇的描述* |

**儲存**並對 DROPv6 清單重複此操作：

|   |   |   |
| --- | --- | --- |
| **行動** |區塊| *選擇阻止傳入流量* |
| **介面** | WAN | *應該是預設值* |
| **TCP/IP版本** | IPv6 | *對於我們的範例，我們使用 IPv6* |
| **來源** | spamhaus\_dropv6 | *我們的 DROP 清單別名* |
| **類別** |斯帕姆豪斯 | *自由選擇類別* |
| **描述** |阻止 DROPv6 | *自由選擇的描述* |

**儲存**

## 步驟 3 - 防火牆規則出站流量

現在對 LAN 介面上的出站流量執行相同的操作。前往防火牆 ‣ 規則 選擇 **LAN**選項卡，然後按右下角的**+** 圖示。

|   |   |   |
| --- | --- | --- |
| **行動** |區塊| *選擇阻止傳入流量* |
| **介面** | LAN | *應該是預設值* |
| **TCP/IP版本** | IPv4 | *對於我們的範例，我們使用 IPv4* |
| **目的地** | spamhaus\_drop | *我們的 DROP 列表別名* |
| **類別** |斯帕姆豪斯 | *自由選擇類別* |
| **描述** |區塊DROP | *自由選擇的描述* |

**儲存**並新增 DROPv6 清單：

|   |   |   |
| --- | --- | --- |
| **行動** |區塊| *選擇阻止傳入流量* |
| **介面** | LAN | *應該是預設值* |
| **TCP/IP版本** | IPv6 | *對於我們的範例，我們使用 IPv6* |
| **目的地** | spamhaus\_dropv6 | *我們的 DROPv6 清單的別名* |
| **類別** |斯帕姆豪斯 | *自由選擇類別* |
| **描述** |阻止 DROPv6 | *自由選擇的描述* |

**儲存**並**套用變更**

**DONE**

## 檢查 pf 表

若要列出目前位於 DROP 和 DROPv6 清單中的 IP 位址，請前往防火牆 ‣ 診斷 ‣ 別名，然後選擇您要查看的清單。

---

