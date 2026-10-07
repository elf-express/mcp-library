---
title: "OpenDNS"
source: https://docs.opnsense.org/manual/opendns.html
chapter: ["Services"]
order: 198
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:33:21.101Z"
---


# OpenDNS


[OpenDNS](https://www.opendns.com/) is a company and service that extends the Domain Name System (DNS) by adding features such as phishing protection and optional content filtering in addition to DNS lookup, if its DNS servers are used.

When you are behind a static IP address, usually it should be enough to just enter the OpenDNS name servers in System ‣ Settings ‣ General.

## Settings

A minimum amount of settings is needed in order to register with OpenDNS.

---

|   |   |
| --- | --- |
| Enabled | If enabled, the firewall will signal OpenDNS about address changes |
| Username | Username registered with OpenDNS |
| Password | Associated password |
| Network | The network name configured on the [Networks Dashboard](https://www.opendns.com/dashboard/networks/) of OpenDNS under ‘Manage your networks’. Used to update the node’s IP address whenever the WAN interface changes its IP address. |

Note

When disabling the service, please check your name servers in System ‣ Settings ‣ General, since this feature removed the previous ones.

---

