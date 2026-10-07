---
title: "WireGuard MullvadVPN 行動戰士設置"
title_original: "WireGuard MullvadVPN Road Warrior Setup"
source: https://docs.opnsense.org/manual/how-tos/wireguard-client-mullvad.html
chapter: ["Virtual Private Networking","Wireguard","Examples"]
order: 158
lang: "zh-TW"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:33:02.898Z"
---

# WireGuard MullvadVPN 行動戰士設置

## 介紹

MullvadVPN 是基於雲端的VPN供應商，提供尊重您隱私的安全隧道。要將 WireGuard VPN設定為 MullvadVPN，我們假設您熟悉 WireGuard 的概念，並且您已閱讀基本操作指南 [WireGuard Road Warrior Setup](<156 WireGuard Road Warrior 設置.md>) 。

## 步驟 1 - 設定 WireGuard 實例

轉到 **實例**選項卡並建立一個新實例。為其指定一個**名稱**並設定所需的**偵聽連接埠**。如果您有多個伺服器實例，請注意每個實例的**偵聽連接埠**必須是唯一的。在**隧道位址** 欄位中插入未使用的私有 IP 位址和子網路遮罩。第一步我們不需要它，但後面會需要它。其他所有欄位都可以留空。

點擊**儲存**，然後再次開啟您的實例以取得您的公鑰。您需要使用它從 Mullvad API伺服器取得其餘配置。

現在透過 SSH 或控制台開啟 OPNsense CLI 並執行下面的*任一*curl 指令。請將 **YOURACCOUNTNUMBER**替換為您自己從 MullvadVPN 獲得的 ID，並將**YOURPUBLICKEY**替換為您的**實例** 中的值

以下命令用於 Mullvad 的標準API. DNS請求，透過隧道發送，該隧道使用的 IP 位址透過此API生成，並被“劫持”，從而使用 Mullvad 的DNS伺服器來避免洩漏：

```bash
curl -sSL https://api.mullvad.net/wg/ -d account=YOURACCOUNTNUMBER --data-urlencode pubkey=YOURPUBLICKEY
```

以下替代命令適用於 Mullvad 的其他API. DNS請求，當使用透過此API產生的隧道 IP 時，透過隧道的請求不會被劫持：

```bash
curl -sSL https://api.mullvad.net/app/v1/wireguard-keys -H "Content-Type: application/json" -H "Authorization: Token YOURACCOUNTNUMBER" -d '{"pubkey":"YOURPUBLICKEY"}'
```

回應是 WireGuard 實例的 **允許的IP**。請再次編輯您的實例，刪除您在設定時使用的 **隧道位址** 值，並將其變更為從上述命令中收到的值。

## 步驟 2 - 設定 WireGuard 對等體

在 **Peers**標籤中，建立一個新的 Peer 並為其指定**Name**，然後在**Allowed IPs** 中設定 0.0.0.0/0。

現在前往 Mullvad 的伺服器 [list](https://www.mullvad.net/en/servers/) ，將篩選條件設定為僅顯示 WireGuard 實例，然後選擇您想要用作分線器的實例。設定伺服器的公鑰，並將其作為 **公鑰**。

將 **端點位址**設定為伺服器清單中的「網域名稱」值，將**端點連接埠**設定為 51820，這是 WireGuard 的預設監聽連接埠。例如：對於「nl1-wireguard」伺服器，**端點位址**將為`nl1-wireguard.mullvad.net`。在**實例**下拉清單中，選擇先前建立的實例，然後按一下**儲存**。

現在我們在「常規」標籤中啟用 WireGuard，然後繼續進行設定。

## 步驟 3 - 設定NAT

要允許您的內部用戶端通過隧道，您必須新增一個NAT條目。前往「防火牆」‣ NAT ‣ 來源NAT （出站），確保規則產生設定為手動或混合模式。新增一條新規則，並將 WireGuard 選擇為**介面**。將**來源**設定為您的LAN網絡，並將**轉換/目標**設定為**介面位址**。

分配介面時，我們也可以為其新增網關。這樣，您就可以透過不同的VPN提供者來平衡流量，或是實現更複雜的路由方案。

有關選擇性路由的更多信息，請參閱操作指南 [WireGuard 選擇性路由到外部VPN端點](<160 WireGuard 選擇性路由到外部VPN端點.md>)

## 第四步－結論

此時，您應該已經建立了有效的連接，並且能夠通過 Mullvad 網站上的連接測試。如果您的設定不起作用或測試未通過，建議您先查看VPN –> WireGuard –> 日誌檔案。