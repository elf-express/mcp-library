---
title: "OpenVPN"
source: "https://docs.opnsense.org/troubleshooting/openvpn.html"
chapter: ["Troubleshooting","Topics"]
order: 232
lang: "en"
translated_by: "native"
captured: "2026-09-26T11:33:38.864Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Network](<231 Network.md>)　｜　[下一篇：Performance ➡](<233 Performance.md>)

# OpenVPN

> 章節：[Troubleshooting](<000 目錄.md#c-50>) › [Topics](<000 目錄.md#c-51>)

## Assigned Interfaces

While not strictly necessary, it is possible to assign individual interfaces for OpenVPN servers and clients alike. However doing so may yield unexpected behaviour of firewall rules. Most notably, rules created on an assigned interface of an OpenVPN Roadwarrior server are created with the `reply-to` directive by default, which breaks client connectivity.

Tip

In cases as described above, it can be observed that incoming traffic matches and passes the corresponding firewall rule, but reply traffic is never sent back to the connected client. This can be verified via the Web GUI by going to Firewall -> Log Files -> Live View and optionally by performing a packet capture on the affected interface.

There are multiple ways to fix this problem. For most setups, it will be sufficient to disable the automatically created IPv4 and IPv6 Gateways under System -> Gateways -> Configuration. Doing so will also disable the automatic addition of the `reply-to` directive to rules created on the interface, and client connectivity will be restored.

Another option is to manually select the option “Disable Reply-To” on each firewall rule you generate on the assigned interface. See [Rules](<137 Rules.md>) for further details.

The third option is to globally disable the generation of `reply-to` completely as described in [(Advanced) Settings](<146 (Advanced) Settings.md>). However this method can break Multi-WAN setups.

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Network](<231 Network.md>)　｜　[下一篇：Performance ➡](<233 Performance.md>)
