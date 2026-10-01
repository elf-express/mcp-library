---
title: "WireGuard MullvadVPN Road Warrior Setup｜WireGuard MulvadVPN Road Warrior 設定"
title_original: "WireGuard MullvadVPN Road Warrior Setup"
source: "https://docs.opnsense.org/manual/how-tos/wireguard-client-mullvad.html"
chapter: ["Virtual Private Networking","Wireguard","Examples"]
order: 158
lang: "bilingual"
translated_by: "gtx"
captured: "2026-09-26T11:33:02.898Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：WireGuard AzireVPN Road Warrior Setup｜WireGuard AzireVPN 公路戰士設置](<157 WireGuard AzireVPN 公路戰士設置.md>)　｜　[下一篇：WireGuard ProtonVPN Road Warrior Setup｜WireGuard ProtonVPN Road Warrior 設定 ➡](<159 WireGuard ProtonVPN Road Warrior 設定.md>)

# WireGuard MullvadVPN Road Warrior Setup｜WireGuard MulvadVPN Road Warrior 設定

> 章節：[Virtual Private Networking](<000 目錄.md#c-32>) › [Wireguard](<000 目錄.md#c-33>) › [Examples](<000 目錄.md#c-34>)

## Introduction｜介紹

MullvadVPN is a cloud-based VPN provider, offering secure tunneling that respects your privacy. To set up a WireGuard VPN to MullvadVPN we assume you are familiar with the concepts of WireGuard and that you have read the basic howto [WireGuard Road Warrior Setup](<156 WireGuard Road Warrior 設置.md>).

MulvadVPN 是一家基於雲端的 VPN 供應商，提供尊重您隱私的安全隧道。要設定 WireGuard VPN 到 MullvadVPN，我們假設您熟悉 WireGuard 的概念，並且您已閱讀基本操作方法 [WireGuard Road Warrior 設定](<156 WireGuard Road Warrior 設置.md>)。

## Step 1 - Setup WireGuard Instance｜第 1 步 - 設定 WireGuard 實例

Go to the **Instances** tab and create a new instance. Give it a **Name** and set a desired **Listen port**. If you have more than one server instance be aware the **Listen port** must be unique for each instance. In the field **Tunnel address** insert an unused private IP address and subnet mask. We don’t need it in the first step, but it will be required later. Every other field can be left blank.

轉到 **實例**選項卡並建立一個新實例。為其指定一個**名稱**並設定所需的**偵聽連接埠**。如果您有多個伺服器實例，請注意每個實例的**偵聽連接埠**必須是唯一的。在**隧道位址** 欄位中插入未使用的私有 IP 位址和子網路遮罩。第一步我們不需要它，但後面會需要它。其他所有欄位都可以留空。

Click **Save** and open your instance again to get your public key. You will need it to get the rest of the configuration from the Mullvad API servers.

點擊 **儲存** 並再次開啟您的實例以取得您的公鑰。您將需要它從 Mulvad API 伺服器取得其餘配置。

Now open the OPNsense CLI via SSH or the console and execute *either* of the curl commands below. Please replace **YOURACCOUNTNUMBER** with your own ID you got from MullvadVPN and **YOURPUBLICKEY** with the one in your **Instances**

現在透過 SSH 或控制台開啟 OPNsense CLI 並執行下面的*任一*curl 指令。請將 **YOURACCOUNTNUMBER**替換為您自己從 MullvadVPN 獲得的 ID，並將**YOURPUBLICKEY**替換為您的**實例** 中的值

The command below is for Mullvad’s standard API. DNS requests through a tunnel that uses tunnel IPs generated via this API are “hijacked”, so that Mullvad’s DNS servers are used to avoid leaks:

下面的命令是針對 Mullvad 透過隧道發出的標準 API. DNS 請求，該隧道使用透過此 API 產生的隧道 IP 進行“劫持”，以便使用 Mulvad 的 DNS 伺服器來避免洩漏：

```bash
curl -sSL https://api.mullvad.net/wg/ -d account=YOURACCOUNTNUMBER --data-urlencode pubkey=YOURPUBLICKEY
```

The alternative command below is for Mullvad’s other API. DNS requests through the tunnel are not hijacked when using tunnel IPs generated via this API:

下面的替代命令是為了當使用透過此API產生的隧道IP時，Mullvad透過隧道的其他API. DNS請求不會被劫持：

```bash
curl -sSL https://api.mullvad.net/app/v1/wireguard-keys -H "Content-Type: application/json" -H "Authorization: Token YOURACCOUNTNUMBER" -d '{"pubkey":"YOURPUBLICKEY"}'
```

The response is the **Allowed IP** for your WireGuard Instance. Edit your instance again and remove the value of **Tunnel address** that you used when setting it up and change it to the one received from the command above.

回應是您的 WireGuard 執行個體的**允許的IP**。再次編輯您的實例，刪除您在設定實例時使用的**隧道位址** 的值，並將其變更為從上述命令收到的值。

## Step 2 - Setup WireGuard Peer｜第 2 步 - 設定 WireGuard 對等點

In the **Peers** tab, create a new Peer and give it a **Name**, then set 0.0.0.0/0 in **Allowed IPs**.

在 **Peers**標籤中，建立一個新的 Peer 並為其指定**Name**，然後在**Allowed IPs** 中設定 0.0.0.0/0。

Now go to Mullvad’s server [list](https://www.mullvad.net/en/servers/), set the filter to only WireGuard instances, and choose the one you like to use as your breakout. Set the server’s public key and as **Public key**.

現在轉到 Mulvad 的伺服器 [列表](https://www.mullvad.net/en/servers/)，將過濾器設定為僅 WireGuard 實例，然後選擇您喜歡用作突破的實例。設定伺服器的公鑰並作為**公鑰**。

Set **Endpoint address** with the “Domain name” value in the server list and **Endpoint port** to 51820, WireGuard’s default listening port. As an example: for the “nl1-wireguard” server, the **Endpoint Address** will be `nl1-wireguard.mullvad.net`. In the **Instances** dropdown, select the instance created previously and click **Save**.

將 **端點位址**設定為伺服器清單中的「網域名稱」值，將**端點連接埠**設定為 51820，這是 WireGuard 的預設監聽連接埠。例如：對於「nl1-wireguard」伺服器，**端點位址**將為`nl1-wireguard.mullvad.net`。在**實例**下拉清單中，選擇先前建立的實例，然後按一下**儲存**。

Now we **Enable** WireGuard in the **General** tab and continue with the setup.

現在，我們在「常規」標籤中「啟用」WireGuard 並繼續設定。

## Step 3 - Configure NAT｜步驟 3 - 配置NAT

To allow your internal clients through the tunnel, you must add a NAT entry. Go to Firewall ‣ NAT ‣ Source NAT (Outbound), ensure that rule generation is set to either manual or hybrid. Add a new rule and select WireGuard as **Interface**. Set **Source** to your LAN network and **Translation / target** to **Interface address**.

若要允許內部用戶端通過隧道，您必須新增 NAT 條目。前往防火牆‣NAT‣源NAT（出站），確保規則產生設定為手動或混合。新增規則並選擇 WireGuard 作為**介面**。將**來源**設定為您的 LAN 網絡，並將**翻譯/目標**設定為**介面位址**。

When assigning interfaces we can also add gateways to them. This would offer you the chance to balance traffic via different VPN providers or do more complex routing scenarios.

分配介面時，我們也可以為其新增網關。這將使您有機會透過不同的VPN提供者平衡流量或執行更複雜的路由場景。

See the how-to on selective routing for further information [WireGuard Selective Routing to External VPN Endpoint](<160 WireGuard 选择性路由到外部 VPN 端点.md>)

請參閱有關選擇性路由的操作方法以獲取更多資訊 [WireGuard 選擇性路由到外部 VPN 端點](<160 WireGuard 选择性路由到外部 VPN 端点.md>)

## Step 4 - Conclusion｜第 4 步 - 結論

At this point, you should have a working connection and be able to pass the Mullvad connection test found on their website. If your configuration does not work or does not pass, a good place to start investigating is VPN –> WireGuard –> Log file.

此時，您應該有一個有效的連接，並且能夠通過在其網站上找到的 Mulvad 連接測試。如果您的設定不起作用或未通過，那麼開始調查的好地方是 VPN –> WireGuard –> 日誌檔案。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：WireGuard AzireVPN Road Warrior Setup｜WireGuard AzireVPN 公路戰士設置](<157 WireGuard AzireVPN 公路戰士設置.md>)　｜　[下一篇：WireGuard ProtonVPN Road Warrior Setup｜WireGuard ProtonVPN Road Warrior 設定 ➡](<159 WireGuard ProtonVPN Road Warrior 設定.md>)
