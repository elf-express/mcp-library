---
title: "Tayga NAT64使用方法"
title_original: "Tayga NAT64 how-to"
source: https://docs.opnsense.org/manual/how-tos/tayga.html
chapter: ["Community Plugins","Routing"]
order: 211
lang: "zh-TW"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:33:27.701Z"
---

# Tayga NAT64使用方法

## 介紹

與雙堆疊網路相比，純 IPv6 網路的規劃、設定、維護和故障排除更為簡單。但互聯網上的許多服務仍然僅支援 IPv4。 NAT64 透過執行 IPv6 到 IPv4 的轉換來保留對這些服務的存取。目前可用於 OPNsense 的 NAT64 實作是 Tayga 插件。

注意事項

本教學課程重點在於如何為僅支援 IPv6 的區域網路提供對僅支援 IPv4 服務的存取。然而，這並非NAT64的唯一用途。

## 先決條件

OPNsense 應配置為具有可用的雙堆疊網路存取和至少一個僅支援 IPv6 的LAN 。

## 安裝和配置 Tayga

進入“系統”‣“韌體”‣“插件”，安裝os-tayga插件。然後進入「服務」‣「Tayga」。

勾選“啟用”並配置所有前綴和位址：

IPv6 前綴

Tayga 用於轉換 IPv4 位址的 IPv6 前綴。您可以使用預設的常用前綴64:ff9b::/96 ，也可以使用您網站GUA前綴中未使用的 /96 前綴。

注意事項

雖然技術上可行，但不建議將ULA前綴用於NAT64 。這可能會導致某些主機出現問題，尤其是那些支援 464XLAT 的主機。

IPv4 池

Tayga 會對應到 IPv6 位址的虛擬 IPv4 位址LAN ）。除非與網路中的現有子​​網路重疊，否則可以保留預設值。必須足夠大，以容納所有 IPv6 專用子網路（ LAN ）中的裝置。

Tayga 是路徑上的一個跳躍點，因此它需要自己的IP位址才能存取ICMP ：

IPv4 位址

會在從 IPv4 端到 IPv6 端的路由追蹤中顯示。除非您變更了 IPv4 位址池，否則可以保留預設值。應位於 IPv4 位址池子網路中。

IPv6 位址

將在從 IPv6 端到 IPv4 端的路由追蹤中顯示。如果留空，Tayga 將透過將 IPv4 位址對應到 IPv6 前綴來自動產生其 IPv6 位址。例如，如果使用預設的 IPv6 前綴64:ff9b::/96和 IPv4 位址192.168.255.1 ，則 Tayga 的預設 IPv6 位址將是64:ff9b::192.168.255.1 （ 64:ff9b::c0a8:ff01 ）。

Tayga 的行為類似於透過點對點介面連接到 OPNsense 的外部設備。此介面需要IP位址用於ICMP ：

IPv4 NAT64介面位址

除非與您的網路衝突，否則可以保留預設值。不得位於 IPv4 位址池子網路中，也不得被其他介面或VIP使用。

IPv6 NAT64介面位址

不得位於 IPv6 前綴子網路中，且不得被其他介面或VIP使用。可以是ULA 。

警告

預設值不能使用，因為2001:db8::/32是一個僅用於文件的前綴。

保存。 Tayga 現在應該正在奔跑。

## 新增防火牆規則

Tayga 使用隧道介面與系統進行封包交換。需要防火牆規則來防止其阻止這些資料包。此外，還需要一條 Source NAT規則才能存取 IPv4 網路。

前往防火牆‣規則‣Tayga，新增規則，將TCP/IP版本設定為IPv4+IPv6，將所有其他設定保留為預設值並儲存。

注意事項

如果您剛剛啟用 Tayga 但找不到“防火牆”‣“規則”‣“Tayga”，請前往“介面”‣“指派”，按一下“儲存”並重新載入頁面。

前往防火牆 ‣ NAT ‣ 來源NAT （出站），新增規則，將介面設定為WAN ，將來源位址設為單一主機或網絡，輸入您的 Tayga IPv4 池，將所有其他設定保留為預設值並儲存。

應用防火牆更改。 NAT64 現在應該可以全面運作。

## 配置DNS64

在大多數情況下， NAT64也需要DNS64 。如果您使用 OPNsense 的 [Unbound DNS ](<199 未綁定DNS.md>) DNS解析器，則可以透過依序進入“服務”‣“Unbound DNS64 DNS ‣“常規”，然後勾選DNS64如果您不使用預設的64:ff9b::/96前綴，則還需要在此輸入您的 /96 前綴。

注意事項

您也可以使用任何其他支援DNS64的DNS伺服器。如果您使用預設的64:ff9b::/96前綴，也可以使用像 Google 公共DNS64 <https://developers.google.com/speed/public-dns/docs/dns64>這樣的服務。

您可能還需要在路由器通告中通告NAT64前綴。這可以在「服務」‣「路由器通告」中配置，方法是啟用進階模式並輸入NAT64前綴。

## 測試

您可以使用類似 [https://internet.nl/connection/](https://internet.nl/connection/)的服務來驗證您的 IPv6 專用LAN中的裝置是否具有 IPv6 和IP4網路存取。