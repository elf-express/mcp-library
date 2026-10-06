---
title: "Multicast DNS Proxy"
source: "https://docs.opnsense.org/manual/how-tos/multicast-dns.html"
chapter: ["Community Plugins","DNS"]
order: 216
lang: "en"
translated_by: "native"
captured: "2026-09-26T11:33:29.746Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：DNSCrypt-Proxy](<215 DNSCrypt-Proxy.md>)　｜　[下一篇：Third-party Plugins ➡](<217 Third-party Plugins.md>)

# Multicast DNS Proxy

> 章節：[Community Plugins](<000 目錄.md#c-36>) › [DNS](<000 目錄.md#c-46>)

If you want to connect multicast DNS of multiple networks, you will need to proxy between them.

## Installation

First of all, you have to install the mdns-repeater plugin (os-mdns-repeater) from the plugins view.

![../../_images/menu_plugins.png](<../images/a11a0992-menu_plugins.png>)

After a page reload you will get a new menu entry under services for MDNS Repeater. Select it and you will get to the following screen:

![../../_images/plugin_mdns_repeater.png](<../images/8d650935-plugin_mdns_repeater.png>)

## Configuration

Warning

mdns-repeater requires at least 2 interfaces, and no more than 5 interfaces to work.

The configuration is fairly simple. Just enable the service and add the interfaces. For example:

| Property | Value |
| --- | --- |
| Enabled | checked |
| Interfaces | LAN, OPT1, OPT2 |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：DNSCrypt-Proxy](<215 DNSCrypt-Proxy.md>)　｜　[下一篇：Third-party Plugins ➡](<217 Third-party Plugins.md>)
