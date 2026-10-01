---
title: "Gateways and monitoring"
source: "https://docs.opnsense.org/troubleshooting/gateways.html"
chapter: ["Troubleshooting","Topics"]
order: 230
lang: "en"
translated_by: "native"
captured: "2026-09-26T11:33:36.851Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：System hardening vs performance](<229 System hardening vs performance.md>)　｜　[下一篇：Network ➡](<231 Network.md>)

# Gateways and monitoring

> 章節：[Troubleshooting](<000 目錄.md#c-50>) › [Topics](<000 目錄.md#c-51>)

The address you are trying to monitor should be reachable using the interface the gateway is attached to, either directly or using a static route (check System ‣ Routes ‣ Status).

## dpinger:.. sendto error: XXX

Usually found in System ‣ Log Files ‣ General, every code has a meaning, usually explained in [errno.h](https://github.com/opnsense/src/blob/master/sys/sys/errno.h) (`man errno`)

Some common ones are explained in the [Common error codes](<231 Network.md#errno>) section.

## arpresolve: can’t allocate llinfo for..

This message usually means that the configured gateway lies outside the configured subnets for this firewall (for IPv4).

Tip

Double check the subnets of your interface and virtual IP’s, you can also use Interfaces ‣ Overview for a quick list of all configured addresses.

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：System hardening vs performance](<229 System hardening vs performance.md>)　｜　[下一篇：Network ➡](<231 Network.md>)
