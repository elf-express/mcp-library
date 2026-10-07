---
title: "Orange France IPTV setup"
source: https://docs.opnsense.org/manual/how-tos/orange_fr_tvf.html
chapter: ["Interfaces","Setup Guides","ISP Configuration"]
order: 127
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:32:44.574Z"
---


# Orange France IPTV setup


**Original Author:** Kev Willers

## **Introduction**

This guide is for setting up Orange France IPTV and assumes you already have a working internet connection and the os-igmp-proxy plugin installed.

## **Getting ready**

Orange uses two VLANs for TV. VLAN 838 and 840 Create and assign them as shown.

[圖：../../_images/tv_image01.png](https://docs.opnsense.org/_images/tv_image01.png)

Take note of the PCP values

Assign the VLANs as shown and also assign TVLAN for use later.

[圖：../../_images/tv_image02.png](https://docs.opnsense.org/_images/tv_image02.png)

igb0 is the WAN in this example. Select the interface that corresponds to WAN in your setup.

TVLAN is assigned to a free port on your router which the TVDecoder is plugged into later.

## **VLAN 838 setup**

[圖：../../_images/tv_image03.png](https://docs.opnsense.org/_images/tv_image03.png) [圖：../../_images/tv_image04.png](https://docs.opnsense.org/_images/tv_image04.png)

SEND OPTIONS

dhcp-client-identifier 1:xx:xx:xx:xx:xx:xx, REPLACE xx with MAC Address of the Livebox (NOT the TVDecoder) the leading 1 is important

dhcp-class-identifier “sagem”,

user-class “‘FSVDSL\_livebox.MLTV.softathome.Livebox3”. NOTE the leading ‘ before the string. Also although not strictky necessary Livebox3 part of the string is for LiveBox3 users if you are Livebox4 user change as required.

REQUEST OPTIONS

subnet-mask,routers, ntp-servers, www-server, classless-routes

## **VLAN 840 setup**

[圖：../../_images/tv_image05.png](https://docs.opnsense.org/_images/tv_image05.png) [圖：../../_images/tv_image06.png](https://docs.opnsense.org/_images/tv_image06.png)

The dummy IP address is important or IGMPproxy does not start

## **TVLAN setup**

(not needed to make things work, but much neater config and prevents IGMPproxy warning messages on LAN)

[圖：../../_images/tv_image07.png](https://docs.opnsense.org/_images/tv_image07.png) [圖：../../_images/tv_image08.png](https://docs.opnsense.org/_images/tv_image08.png)

Use a different subnet to current LAN

Turn on the DHCP service for TVLAN

NOTE YOU MUST specify the ORANGE DNS servers for the TV to work

[圖：../../_images/tv_image09.png](https://docs.opnsense.org/_images/tv_image09.png)

Now reboot and you should have an IP address on VLAN 838 of 10.x.x.x

## **IGMPproxy setup**

Ensure you are running OPNsense 18.7.4 or later

Then configure IGMPproxy as follows

[圖：../../_images/tv_image10.png](https://docs.opnsense.org/_images/tv_image10.png) [圖：../../_images/tv_image11.png](https://docs.opnsense.org/_images/tv_image11.png)

NOTE: downstream interface is TVLAN

[圖：../../_images/tv_image12.png](https://docs.opnsense.org/_images/tv_image12.png)

## **FIREWALL setup**

We need to allow traffic to flow on the VLANs and TVLAN and also to connect with Orange servers

[圖：../../_images/tv_image13.png](https://docs.opnsense.org/_images/tv_image13.png) [圖：../../_images/tv_image14.png](https://docs.opnsense.org/_images/tv_image14.png)

NOTE the Source is “\*”

[圖：../../_images/tv_image15.png](https://docs.opnsense.org/_images/tv_image15.png)

And finally Source NAT

[圖：../../_images/tv_image16.png](https://docs.opnsense.org/_images/tv_image16.png)

Make sure you have clicked Save & Apply

It is advisable at this point to reboot the system.

Plug in your TVDecoder to the port defined for TVLAN, turn on the decoder and after a few minutes you should see TV.

---

