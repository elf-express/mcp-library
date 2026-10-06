---
title: "WireGuard AzireVPN Road Warrior Setup｜WireGuard AzireVPN 公路戰士設置"
title_original: "WireGuard AzireVPN Road Warrior Setup"
source: "https://docs.opnsense.org/manual/how-tos/wireguard-client-azire.html"
chapter: ["Virtual Private Networking","Wireguard","Examples"]
order: 157
lang: "bilingual"
translated_by: "gtx"
captured: "2026-09-26T11:33:00.388Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：WireGuard Road Warrior Setup｜WireGuard Road Warrior 設置](<156 WireGuard Road Warrior 設置.md>)　｜　[下一篇：WireGuard MullvadVPN Road Warrior Setup｜WireGuard MulvadVPN Road Warrior 設定 ➡](<158 WireGuard MulvadVPN Road Warrior 設定.md>)

# WireGuard AzireVPN Road Warrior Setup｜WireGuard AzireVPN 公路戰士設置

> 章節：[Virtual Private Networking](<000 目錄.md#c-32>) › [Wireguard](<000 目錄.md#c-33>) › [Examples](<000 目錄.md#c-34>)

## Introduction｜介紹

AzireVPN is an international VPN provider, co-locating in multiple datacenters and offering secure tunneling in respect to privacy. To set up a WireGuard VPN to AzireVPN we assume you are familiar with the concepts of WireGuard you that you have read the basic howto [WireGuard Road Warrior Setup](<156 WireGuard Road Warrior 設置.md>).

AzireVPN 是國際 VPN 供應商，位於多個資料中心並提供尊重隱私的安全隧道。要將 WireGuard VPN 設定為 AzireVPN，我們假設您熟悉 WireGuard 的概念，並且您已閱讀基本操作方法 [WireGuard Road Warrior 設定](<156 WireGuard Road Warrior 設置.md>)。

## Step 1 - Get AzireVPN configuration｜步驟 1 - 取得 AzireVPN 配置

For an automated rollout of configuration, AzireVPN will create a private key in your browser and send the public key via an API call to their servers. To get a configuration login to your [account](https://www.azirevpn.com/cfg/wireguard)

為了自動部署配置，AzireVPN 將在您的瀏覽器中建立私鑰，並透過 API 呼叫將公鑰傳送到其伺服器。若要取得配置，請登入您的[帳戶](https://www.azirevpn.com/cfg/wireguard)

Via **Options** you can select the country where you want to break out, choose a port (default ist fine), and set the protocol to tunnel (we only cover IPv4).

透過**選項**，您可以選擇要突破的國家/地區，選擇連接埠（預設即可），並將協定設為隧道（我們僅覆蓋 IPv4）。

Hit **Download** at the end of the page to get the preconfigured text file and open it in your favorite text editor.

點擊頁面末尾的**下載**以獲取預先配置的文本文件並在您喜歡的文本編輯器中打開它。

## Step 2 - Setup WireGuard Instance｜第 2 步 - 設定 WireGuard 實例

Go to tab **Instances** and create a new instance. Give it a **Name** and set a desired **Listen Port**. If you have more than one server instance be aware that you can use the **Listen Port** only once. In the field **Private Key** insert the value from your text file and leave **Public Key** empty. **DNS** and **Tunnel Address** has also to be taken from the configuration. Hit **Save** and go to **Peers** tab.

轉到選項卡**實例**並建立一個新實例。為其指定一個**名稱**並設定所需的**偵聽連接埠**。如果您有多個伺服器實例，請注意您只能使用**偵聽連接埠**一次。在**私鑰**欄位中插入文字檔案中的值並將**公鑰**留空。**DNS**和**隧道位址**也必須從設定中取得。點擊**儲存**並轉到**對等**選項卡。

On **Peers** tab create a new Peer, give it a **Name**, set 0.0.0.0/0 in **Allowed IPs** and set the DNS name from your configuration in **Endpoint Address**. Don’t forget to do this also for the port.

在 **Peers**標籤上建立一個新的 Peer，為其指定一個**Name**，在**Allowed IPs**中設定 0.0.0.0/0，並在**Endpoint Address** 中設定配置中的 DNS 名稱。不要忘記對連接埠也執行此操作。

Go back to tab **Instances**, open the instance and choose the newly created peer in **Peers**.

返回選項卡**實例**，打開實例並在**對等點**中選擇新建立的對等點。

Now we can **Enable** the VPN in tab **General** and continue with the setup.

現在我們可以**啟用**選項卡**常規**中的VPN並繼續設定。

## Step 3 - Assignments and Routing｜第 3 步 - 分配和路由

To let you internal clients go through the tunnel you have to add a NAT entry. Go to Firewall ‣ NAT ‣ Source NAT (Outbound) and add a rule. Check that rule generation is set to manual or hybrid. Add a rule and select Wireguard as **Interface**. **Source** should be your LAN network and set **Translation / target** to **interface address**.

為了讓您的內部用戶端通過隧道，您必須新增一個NAT條目。前往防火牆 ‣ NAT ‣ 來源 NAT（出站）並新增規則。檢查規則產生是否設定為手動或混合。新增規則並選擇 Wireguard 作為**介面**。**來源**應該是您的LAN網絡，並將**翻譯/目標**設定為**介面位址**。

When assigning interfaces we can also add gateways to them. This would offer you the chance to balance traffic via different VPN providers or do more complex routing scenarios.

分配介面時，我們也可以為其新增網關。這將使您有機會透過不同的VPN提供者平衡流量或執行更複雜的路由場景。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：WireGuard Road Warrior Setup｜WireGuard Road Warrior 設置](<156 WireGuard Road Warrior 設置.md>)　｜　[下一篇：WireGuard MullvadVPN Road Warrior Setup｜WireGuard MulvadVPN Road Warrior 設定 ➡](<158 WireGuard MulvadVPN Road Warrior 設定.md>)
