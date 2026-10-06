---
title: "OpenVPN"
source: "https://docs.opnsense.org/troubleshooting/openvpn.html"
chapter: ["Troubleshooting","Topics"]
order: 232
lang: "bilingual"
translated_by: "google_v2"
captured: "2026-09-26T11:33:38.864Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Network｜網路](<231 網路.md>)　｜　[下一篇：Performance｜表現 ➡](<233 表現.md>)

# OpenVPN

> 章節：[Troubleshooting](<000 目錄.md#c-50>) › [Topics](<000 目錄.md#c-51>)

## Assigned Interfaces｜已分配介面

While not strictly necessary, it is possible to assign individual interfaces for OpenVPN servers and clients alike. However doing so may yield unexpected behaviour of firewall rules. Most notably, rules created on an assigned interface of an OpenVPN Roadwarrior server are created with the `reply-to` directive by default, which breaks client connectivity.

雖然並非絕對必要，但可以為 OpenVPN 伺服器和用戶端分別分配不同的介面。然而，這樣做可能會導致防火牆規則出現意外行為。最值得注意的是，在 OpenVPN Roadwarrior 伺服器的指定介面上建立的規則預設會使用`reply-to`指令，這會破壞客戶端的連線。

Tip

提示

In cases as described above, it can be observed that incoming traffic matches and passes the corresponding firewall rule, but reply traffic is never sent back to the connected client. This can be verified via the Web GUI by going to Firewall -> Log Files -> Live View and optionally by performing a packet capture on the affected interface.

如上所述，可以觀察到入站流量匹配並通過了相應的防火牆規則，但回復流量卻始終無法發送回連接的用戶端。這可以透過 Web 管理介面GUI的「防火牆」->「日誌檔案」->「即時檢視」進行驗證，也可以選擇在受影響的介面上執行封包擷取。

There are multiple ways to fix this problem. For most setups, it will be sufficient to disable the automatically created IPv4 and IPv6 Gateways under System -> Gateways -> Configuration. Doing so will also disable the automatic addition of the `reply-to` directive to rules created on the interface, and client connectivity will be restored.

解決此問題的方法有很多。對於大多數配置，只需在「系統」->「網關」->「配置」下停用自動建立的 IPv4 和 IPv6 網關即可。這樣做也會停用自動向介面上建立的規則新增`reply-to`指令，從而恢復客戶端連線。

Another option is to manually select the option “Disable Reply-To”（禁用回覆） on each firewall rule you generate on the assigned interface. See [Rules](<137 規則.md>) for further details.

另一種方法是在為指定介面產生的每條防火牆規則中手動選擇“Disable Reply-To”（禁用回覆）選項。有關更多詳細信息，請參閱[規則](<137 規則.md>) 。

The third option is to globally disable the generation of `reply-to` completely as described in [(Advanced) Settings](<146 (進階設定.md>). However this method can break Multi-WAN setups.

第三種方法是依照 [(進階) 設定](<146 (進階設定.md>)中的說明，全域禁用`reply-to`的產生。但是，這種方法可能會破壞 Multi- WAN設定。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Network｜網路](<231 網路.md>)　｜　[下一篇：Performance｜表現 ➡](<233 表現.md>)
