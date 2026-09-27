---
title: "WireGuard AzireVPN 行動戰士設置"
title_original: "WireGuard AzireVPN Road Warrior Setup"
source: "https://docs.opnsense.org/manual/how-tos/wireguard-client-azire.html"
chapter: ["Virtual Private Networking","Wireguard","Examples"]
order: 157
lang: "zh-TW"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:33:00.388Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：WireGuard Road Warrior 設置](<156 WireGuard Road Warrior 設置.md>)　｜　[下一篇：WireGuard MullvadVPN 行動戰士設置 ➡](<158 WireGuard MullvadVPN 行動戰士設置.md>)

# WireGuard AzireVPN 行動戰士設置

> 章節：[Virtual Private Networking](<000 目錄.md#c-32>) › [Wireguard](<000 目錄.md#c-33>) › [Examples](<000 目錄.md#c-34>)

## 介紹

AzireVPN 是一家國際VPN供應商，在多個資料中心進行託管，並提供尊重隱私的安全隧道。要將 WireGuard VPN連接到 AzireVPN，我們假設您熟悉 WireGuard 的概念，並且已閱讀基本操作指南 [WireGuard Road Warrior Setup](<156 WireGuard Road Warrior 設置.md>) 。

## 步驟 1 - 取得 AzireVPN 配置

為了實現配置的自動部署，AzireVPN 會在您的瀏覽器中建立一個私鑰，並透過API呼叫將公鑰傳送到他們的伺服器。若要取得配置，請登入您的 [帳號](https://www.azirevpn.com/cfg/wireguard)

透過**選項**，您可以選擇要對外開放的國家/地區，選擇一個連接埠（預設連接埠即可），並將要使用的協定設定為隧道協定（我們僅支援 IPv4）。

點擊頁面末尾的**下載**按鈕，即可取得預先設定的文字文件，並使用您喜歡的文字編輯器開啟它。

## 步驟 2 - 設定 WireGuard 實例

轉到選項卡**實例**並建立一個新實例。為其指定一個**名稱**並設定所需的**偵聽連接埠**。如果您有多個伺服器實例，請注意您只能使用**偵聽連接埠**一次。在**私鑰**欄位中插入文字檔案中的值並將**公鑰**留空。**DNS**和**隧道位址**也必須從設定中取得。點擊**儲存**並轉到**對等**選項卡。

在 **Peers**標籤上建立一個新的 Peer，為其指定一個**Name**，在**Allowed IPs**中設定 0.0.0.0/0，並在**Endpoint Address** 中設定配置中的 DNS 名稱。不要忘記對連接埠也執行此操作。

返回選項卡**實例**，打開實例並在**對等點**中選擇新建立的對等點。

現在我們可以**啟用**選項卡**常規**中的VPN並繼續設定。

## 步驟 3 - 任務分配與路由

為了讓您的內部用戶端通過隧道，您必須新增一個NAT條目。前往防火牆 ‣ NAT ‣ 來源 NAT（出站）並新增規則。檢查規則產生是否設定為手動或混合。新增規則並選擇 Wireguard 作為**介面**。**來源**應該是您的LAN網絡，並將**翻譯/目標**設定為**介面位址**。

分配介面時，我們也可以為其新增網關。這樣，您就可以透過不同的VPN提供者來平衡流量，或者實現更複雜的路由方案。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：WireGuard Road Warrior 設置](<156 WireGuard Road Warrior 設置.md>)　｜　[下一篇：WireGuard MullvadVPN 行動戰士設置 ➡](<158 WireGuard MullvadVPN 行動戰士設置.md>)
