---
title: "Deutsche Telekom Germany IPTV (Magenta TV) setup"
source: "https://docs.opnsense.org/manual/how-tos/dt_ger_iptv.html"
chapter: ["Interfaces","Setup Guides","ISP Configuration"]
order: 125
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:32:44.068Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：IPv6 Tunnel Broker](<124 IPv6 Tunnel Broker.md>)　｜　[下一篇：Orange France FTTH IPv4 & IPv6 ➡](<126 Orange France FTTH IPv4 & IPv6.md>)

# Deutsche Telekom Germany IPTV (Magenta TV) setup

> 章節：[Interfaces](<000 目錄.md#c-19>) › [Setup Guides](<000 目錄.md#c-21>) › [ISP Configuration](<000 目錄.md#c-25>)

**Original Author:** Jascha Kirchhoff

## **Introduction**

This guide is for setting up Deutsche Telekom Germany IPTV (Magenta TV) and assumes you already have a working internet connection and the os-igmp-proxy plugin installed.

This is just a basic working setup. You can separate all IPTV traffic into a VLAN, if needed.

All network hardware between OPNsense and the Media Receiver or TV Box must support IGMP snooping. Without IGMP snooping enabled, the network gets flooded with multicast traffic and live tv starts stuttering.

## **IGMPproxy setup**

Ensure you are running OPNsense 22.1 or later

Then configure IGMPproxy as follows

[![../../_images/dt_ger_iptv_01.png](<../images/29505167-dt_ger_iptv_01.png>)](https://docs.opnsense.org/_images/dt_ger_iptv_01.png) [![../../_images/dt_ger_iptv_02.png](<../images/846c99fa-dt_ger_iptv_02.png>)](https://docs.opnsense.org/_images/dt_ger_iptv_02.png)

NOTE: downstream interface is LAN

[![../../_images/dt_ger_iptv_03.png](<../images/fff3fcad-dt_ger_iptv_03.png>)](https://docs.opnsense.org/_images/dt_ger_iptv_03.png)

## **FIREWALL setup**

We need to add two new rules for the WAN interface and modify one (the default IPv4 rule) on the LAN to get Magenta TV working. The key is to enable “allow options” in the Advanced Options for all three (!) rules, WAN and LAN.

[![../../_images/dt_ger_iptv_04.png](<../images/a12d8228-dt_ger_iptv_04.png>)](https://docs.opnsense.org/_images/dt_ger_iptv_04.png)

NOTE the Source is “\*”

[![../../_images/dt_ger_iptv_05.png](<../images/b7574bfb-dt_ger_iptv_05.png>)](https://docs.opnsense.org/_images/dt_ger_iptv_05.png) [![../../_images/dt_ger_iptv_06.png](<../images/74f3b2ce-dt_ger_iptv_06.png>)](https://docs.opnsense.org/_images/dt_ger_iptv_06.png) [![../../_images/dt_ger_iptv_05.png](<../images/b7574bfb-dt_ger_iptv_05.png>)](https://docs.opnsense.org/_images/dt_ger_iptv_05.png)

And finally Source NAT

[![../../_images/dt_ger_iptv_07.png](<../images/72d1aa01-dt_ger_iptv_07.png>)](https://docs.opnsense.org/_images/dt_ger_iptv_07.png)

I switched to Hybrid mode but it should also work in Automatic mode, because none of the Source NAT rules need to be modified.

Make sure you have clicked Save & Apply

It is advisable at this point to reboot the system.

Plug in your Media Receiver to one LAN port, turn on the receiver and after a few minutes you should see live TV. Also software updates should work out of the box. Update mode has been tested 2022-05, no additional settings are required.

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：IPv6 Tunnel Broker](<124 IPv6 Tunnel Broker.md>)　｜　[下一篇：Orange France FTTH IPv4 & IPv6 ➡](<126 Orange France FTTH IPv4 & IPv6.md>)
