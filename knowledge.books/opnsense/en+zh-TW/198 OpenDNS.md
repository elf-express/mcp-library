---
title: "OpenDNS"
source: "https://docs.opnsense.org/manual/opendns.html"
chapter: ["Services"]
order: 198
lang: "bilingual"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:33:21.101Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Router Advertisements｜路由器廣告](<197 路由器廣告.md>)　｜　[下一篇：Unbound DNS｜未綁定DNS ➡](<199 未綁定DNS.md>)

# OpenDNS

> 章節：[Services](<000 目錄.md#c-40>)

[OpenDNS](https://www.opendns.com/) is a company and service that extends the Domain Name System (DNS) by adding features such as phishing protection and optional content filtering in addition to DNS lookup, if its DNS servers are used.

[OpenDNS](https://www.opendns.com/)是一家公司和服務，它擴展了域名系統 ( DNS )，除了DNS查找之外，還添加了諸如網絡釣魚保護和可選內容過濾等功能（如果使用其DNS服務器）。

When you are behind a static IP address, usually it should be enough to just enter the OpenDNS name servers in System ‣ Settings ‣ General.

當您使用靜態IP位址時，通常只需在「系統」‣「設定」‣「常規」中輸入 OpenDNS 名稱伺服器即可。

## Settings｜設定

A minimum amount of settings is needed in order to register with OpenDNS.

要註冊 OpenDNS，只需進行最少的設定。

---

|   |   |
| --- | --- |
| Enabled<br>已啟用 | If enabled, the firewall will signal OpenDNS about address changes<br>若啟用，防火牆將向 OpenDNS 發出位址變更通知 |
| Username<br>使用者名稱 | Username registered with OpenDNS<br>在 OpenDNS 註冊的使用者名稱 |
| Password<br>密碼 | Associated password<br>關聯密碼 |
| Network<br>網路 | The network name configured on the [Networks Dashboard](https://www.opendns.com/dashboard/networks/) of OpenDNS under ‘Manage your networks’. Used to update the node’s IP address whenever the WAN interface changes its IP address.<br>在 OpenDNS 的 [網路控制面板](https://www.opendns.com/dashboard/networks/)下的「管理您的網路」中設定的網路名稱。用於在WAN介面更改其IP位址時更新節點的IP位址。 |

Note

筆記

When disabling the service, please check your name servers in System ‣ Settings ‣ General, since this feature removed the previous ones.

停用該服務時，請檢查系統‣設定‣常規中的網域名稱伺服器，因為此功能會刪除先前的網域名稱伺服器。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Router Advertisements｜路由器廣告](<197 路由器廣告.md>)　｜　[下一篇：Unbound DNS｜未綁定DNS ➡](<199 未綁定DNS.md>)
