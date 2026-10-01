---
title: "Tayga NAT64 how-to｜Tayga NAT64使用方法"
title_original: "Tayga NAT64 how-to"
source: "https://docs.opnsense.org/manual/how-tos/tayga.html"
chapter: ["Community Plugins","Routing"]
order: 211
lang: "bilingual"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:33:27.701Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Dynamic Routing (FRR)｜動態路由（ FRR ）](<210 動態路由（ FRR ）.md>)　｜　[下一篇：ndp-proxy-go (Neighbor Discovery Proxy)｜ndp-proxy-go（鄰居發現代理） ➡](<212 ndp-proxy-go（鄰居發現代理）.md>)

# Tayga NAT64 how-to｜Tayga NAT64使用方法

> 章節：[Community Plugins](<000 目錄.md#c-36>) › [Routing](<000 目錄.md#c-45>)

## Introduction｜介紹

IPv6-only networks are less complex to plan, configure, maintain and troubleshoot than dual-stack networks. But many services on the Internet are still IPv4-only. NAT64 preserves access to these services by performing IPv6-to-IPv4 translation. The NAT64 implementation currently available for OPNsense is the Tayga plugin.

與雙堆疊網路相比，純 IPv6 網路的規劃、設定、維護和故障排除更為簡單。但互聯網上的許多服務仍然僅支援 IPv4。 NAT64 透過執行 IPv6 到 IPv4 的轉換來保留對這些服務的存取。目前可用於 OPNsense 的 NAT64 實作是 Tayga 插件。

Note

筆記

This how-to focuses on providing IPv6-only LANs with access to IPv4-only services. However, this is not the only use case for NAT64.

本教學課程重點在於如何為僅支援 IPv6 的區域網路提供對僅支援 IPv4 服務的存取。然而，這並非NAT64的唯一用途。

## Prerequisites｜先決條件

OPNsense should be configured with working dual-stack Internet access and at least one IPv6-only LAN.

OPNsense 應配置為具有可用的雙堆疊網路存取和至少一個僅支援 IPv6 的LAN 。

## Installing and configuring Tayga｜安裝和配置 Tayga

Go to System ‣ Firmware ‣ Plugins and install the os-tayga plugin. Then go to Services ‣ Tayga.

進入“系統”‣“韌體”‣“插件”，安裝os-tayga插件。然後進入「服務」‣「Tayga」。

Tick Enable and configure all prefixes and addresses:

勾選“啟用”並配置所有前綴和位址：

IPv6 Prefix

IPv6 前綴

The IPv6 prefix which Tayga uses to translate IPv4 addresses. You can use the default well-known prefix 64:ff9b::/96 or an unused /96 from your site’s GUA prefix.

Tayga 用於轉換 IPv4 位址的 IPv6 前綴。您可以使用預設的常用前綴64:ff9b::/96 ，也可以使用您網站GUA前綴中未使用的 /96 前綴。

Note

筆記

While technically possible, using a ULA prefix for NAT64 is not recommended. This can cause issues with certain hosts, especially those which support 464XLAT.

雖然技術上可行，但不建議將ULA前綴用於NAT64 。這可能會導致某些主機出現問題，尤其是那些支援 464XLAT 的主機。

IPv4 Pool

IPv4 池

The virtual IPv4 addresses which Tayga maps to LAN IPv6 addresses. Can be left to its default value unless this overlaps with existing subnets in your network. Must be sufficiently large to fit all devices in your IPv6-only LAN(s).

Tayga 會對應到 IPv6 位址的虛擬 IPv4 位址LAN ）。除非與網路中的現有子​​網路重疊，否則可以保留預設值。必須足夠大，以容納所有 IPv6 專用子網路（ LAN ）中的裝置。

Tayga is a hop in the path, so it needs its own IP addresses for ICMP:

Tayga 是路徑上的一個跳躍點，因此它需要自己的IP位址才能存取ICMP ：

IPv4 Address

IPv4 位址

Will show up in traceroutes from the IPv4 side to the IPv6 side. Can be left to its default value unless you changed the IPv4 Pool. Should be located in the IPv4 Pool subnet.

會在從 IPv4 端到 IPv6 端的路由追蹤中顯示。除非您變更了 IPv4 位址池，否則可以保留預設值。應位於 IPv4 位址池子網路中。

IPv6 Address

IPv6 位址

Will show up in traceroutes from the IPv6 side to the IPv4 side. If left empty, Tayga will auto-generate its IPv6 address by mapping the IPv4 Address into the IPv6 Prefix. For example, if the default IPv6 Prefix 64:ff9b::/96 and IPv4 Address 192.168.255.1 are being used, Tayga’s default IPv6 address will be 64:ff9b::192.168.255.1 (64:ff9b::c0a8:ff01).

將在從 IPv6 端到 IPv4 端的路由追蹤中顯示。如果留空，Tayga 將透過將 IPv4 位址對應到 IPv6 前綴來自動產生其 IPv6 位址。例如，如果使用預設的 IPv6 前綴64:ff9b::/96和 IPv4 位址192.168.255.1 ，則 Tayga 的預設 IPv6 位址將是64:ff9b::192.168.255.1 （ 64:ff9b::c0a8:ff01 ）。

Tayga behaves like an external device connected to OPNsense via a point-to-point interface. This interface requires IP addresses for ICMP:

Tayga 的行為類似於透過點對點介面連接到 OPNsense 的外部設備。此介面需要IP位址用於ICMP ：

IPv4 NAT64 Interface Address

IPv4 NAT64介面位址

Can be left to its default value unless this conflicts with your network. Must not be located in the IPv4 Pool subnet and must not be used by another interface or VIP.

除非與您的網路衝突，否則可以保留預設值。不得位於 IPv4 位址池子網路中，也不得被其他介面或VIP使用。

IPv6 NAT64 Interface Address

IPv6 NAT64介面位址

Must not be located in the IPv6 Prefix subnet and must not be used by another interface or VIP. Can be a ULA.

不得位於 IPv6 前綴子網路中，且不得被其他介面或VIP使用。可以是ULA 。

Warning

警告

The default value must not be used since 2001:db8::/32 is a documentation-only prefix.

預設值不能使用，因為2001:db8::/32是一個僅用於文件的前綴。

Save. Tayga should now be running.

保存。 Tayga 現在應該正在奔跑。

## Adding firewall rules｜新增防火牆規則

Tayga uses a tunnel interface for packet exchange with the system. A firewall rule is required to prevent it from blocking these packets. Additionally, a Source NAT rule is required for IPv4 Internet access.

Tayga 使用隧道介面與系統進行封包交換。需要防火牆規則來防止其阻止這些資料包。此外，還需要一條 Source NAT規則才能存取 IPv4 網路。

Go to Firewall ‣ Rules ‣ Tayga, add a new rule, set the TCP/IP Version to IPv4+IPv6, leave all other settings to their default values and save.

前往防火牆‣規則‣Tayga，新增規則，將TCP/IP版本設定為IPv4+IPv6，將所有其他設定保留為預設值並儲存。

Note

筆記

If you just enabled Tayga and can’t find Firewall ‣ Rules ‣ Tayga, go to Interfaces ‣ Assignments, click Save and reload the page.

如果您剛剛啟用 Tayga 但找不到“防火牆”‣“規則”‣“Tayga”，請前往“介面”‣“指派”，按一下“儲存”並重新載入頁面。

Go to Firewall ‣ NAT ‣ Source NAT (Outbound), add a new rule, set the Interface to WAN, set Source address to Single host or network, enter your Tayga IPv4 Pool, leave all other settings to their default values and save.

前往防火牆 ‣ NAT ‣ 來源NAT （出站），新增規則，將介面設定為WAN ，將來源位址設為單一主機或網絡，輸入您的 Tayga IPv4 池，將所有其他設定保留為預設值並儲存。

Apply the firewall changes. NAT64 should now be fully operational.

應用防火牆更改。 NAT64 現在應該可以全面運作。

## Configuring DNS64｜配置DNS64

In most scenarios, NAT64 also requires DNS64. If you use OPNsense’s [Unbound DNS](<199 未綁定DNS.md>) DNS resolver, DNS64 can be enabled by going to Services ‣ Unbound DNS ‣ General and ticking Enable DNS64 Support. If you don’t use the default 64:ff9b::/96 prefix, you also have to enter your /96 prefix there.

在大多數情況下， NAT64也需要DNS64 。如果您使用 OPNsense 的 [Unbound DNS ](<199 未綁定DNS.md>) DNS解析器，則可以透過依序進入“服務”‣“Unbound DNS64 DNS ‣“常規”，然後勾選DNS64如果您不使用預設的64:ff9b::/96前綴，則還需要在此輸入您的 /96 前綴。

Note

筆記

You may also use any other DNS64 capable DNS server. If you use the default 64:ff9b::/96 prefix, using a service like Google’s Public DNS64 <https://developers.google.com/speed/public-dns/docs/dns64> is possible, too.

您也可以使用任何其他支援DNS64的DNS伺服器。如果您使用預設的64:ff9b::/96前綴，也可以使用像 Google 公共DNS64 <https://developers.google.com/speed/public-dns/docs/dns64>這樣的服務。

You may also want to advertise the NAT64 prefix in Router Advertisements. This can be configured in Services ‣ Router Advertisements by enabling the advanced mode and entering the NAT64 prefix there.

您可能還需要在路由器通告中通告NAT64前綴。這可以在「服務」‣「路由器通告」中配置，方法是啟用進階模式並輸入NAT64前綴。

## Testing｜測試

You can use a service like [https://internet.nl/connection/](https://internet.nl/connection/) to verify that devices in your IPv6-only LAN have IPv6 and IP4 Internet access.

您可以使用類似 [https://internet.nl/connection/](https://internet.nl/connection/)的服務來驗證您的 IPv6 專用LAN中的裝置是否具有 IPv6 和IP4網路存取。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Dynamic Routing (FRR)｜動態路由（ FRR ）](<210 動態路由（ FRR ）.md>)　｜　[下一篇：ndp-proxy-go (Neighbor Discovery Proxy)｜ndp-proxy-go（鄰居發現代理） ➡](<212 ndp-proxy-go（鄰居發現代理）.md>)
