---
title: "Q-Feeds connector｜Q-Feeds 連接器"
title_original: "Q-Feeds connector"
source: "https://docs.opnsense.org/manual/qfeeds.html"
chapter: ["Third-party Plugins","Q-Feeds Threat Intelligence"]
order: 222
lang: "bilingual"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:33:32.806Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Zenarmor Installing via Command Line｜透過命令列安裝 Zenarmor](<221 透過命令列安裝 Zenarmor.md>)　｜　[下一篇：Troubleshooting｜故障排除 ➡](<223 故障排除.md>)

# Q-Feeds connector｜Q-Feeds 連接器

> 章節：[Third-party Plugins](<000 目錄.md#c-47>) › [Q-Feeds Threat Intelligence](<000 目錄.md#c-49>)

## [Q-Feeds connector](#id1)｜[Q-Feeds 連接器](#id1)

Index

指數

-   [Q-Feeds connector](#q-feeds-connector)  
    [Q-Feeds 連接器](#q-feeds-connector)
    
    -   [Introduction](#introduction)  
        [引言](#introduction)
        
    -   [External resources](#external-resources)  
        [外部資源](#external-resources)
        
    -   [Installation](#installation)  
        [安裝](#installation)
        
    -   [Activate the plugin](#activate-the-plugin)  
        [啟用插件](#activate-the-plugin)
        
    -   [Menu options](#menu-options)  
        [選單選項](#menu-options)
        
    -   [Firewall setup](#firewall-setup)  
        [防火牆設定](#firewall-setup)
        
    -   [DNS/Domain blocking using Unbound](#dns-domain-blocking-using-unbound)  
        [DNS /使用 Unbound 進行網域屏蔽](#dns-domain-blocking-using-unbound)
        
    -   [DNS/Domain blocking using DNSCrypt-Proxy](#dns-domain-blocking-using-dnscrypt-proxy)  
        [DNS /使用 DNSCrypt-Proxy 進行網域屏蔽](#dns-domain-blocking-using-dnscrypt-proxy)
        

## [Introduction](#id2)｜[引言](#id2)

In today’s world, keeping your network secure is super important. Next Generation Firewalls (NGFWs) are essential tools for protecting your network. They can filter DNS and web traffic using external dynamic lists of threat indicators, known as Indicators of Compromise (IoCs).

在現今世界，保障網路安全至關重要。新一代防火牆 (NGFW) 是保護網路安全的必備工具。它們可以利用外部動態威脅指標清單（稱為入侵指標 (IoC)）過濾DNS和 Web 流量。

Q-Feeds provides dynamic, up-to-date lists of these IoCs, designed specifically for use with security controls like NGFWs. By integrating Q-Feeds into your OPNsense firewall, you can improve your network’s protection against new and emerging threats. This means your firewall can automatically block harmful traffic and stay updated with the latest threat information.

Q-Feeds 提供動態更新的 IoC 列表，專為與下一代防火牆 (NGFW) 等安全控制措施配合使用而設計。透過將 Q-Feeds 整合到 OPNsense 防火牆中，您可以增強網路抵禦新興威脅的能力。這意味著您的防火牆可以自動阻止有害流量，並持續更新最新的威脅資訊。

Two types of lists are supported by this plugin, IPs using firewall aliases and domains using an integration with Unbound blocklists or DNSCrypt-Proxy.

該插件支援兩種類型的清單：使用防火牆別名的 IP 清單和使用與 Unbound 黑名單或 DNSCrypt-Proxy 整合的網域清單。

This document explains how to install and use Q-Feeds on your OPNsense firewall.

本文檔說明如何在 OPNsense 防火牆上安裝和使用 Q-Feeds。

## [External resources](#id3)｜[外部資源](#id3)

In order to use Q-Feeds, a (free or paid) subscription is required. Please visit [https://qfeeds.com/opnsense/](https://qfeeds.com/opnsense/) for more information and to sign up for access. The differences between available service offerings and extensive documentation is available there as well.

要使用 Q-Feeds，需要訂閱（免費或付費）。請造訪 [https://qfeeds.com/opnsense/](https://qfeeds.com/opnsense/)以了解更多資訊並註冊存取權限。您還可以在那裡找到不同服務之間的差異以及詳細的文件。

## [Installation](#id4)｜[安裝](#id4)

Installation of this plugin is rather easy, go to System ‣ Firmware ‣ Plugins and search for **os-q-feeds-connector**, use the \[+\] button to install it.

安裝此外掛程式非常簡單，請前往“系統”‣“韌體”‣“插件”，搜尋**os-q-feeds-connector**，然後使用\[+\]按鈕進行安裝。

Next go to Security ‣ Q-Feeds Connect to configure the service.

接下來，前往「安全性」‣「Q-Feeds Connect」設定服務。

## [Activate the plugin](#id5)｜[啟用插件](#id5)

To activate the plugin please go to Security ‣ Q-Feeds Connect. The settings page of the Q-Feeds plugin will now open and it asks for an API token.

要啟動該插件，請前往「安全性」‣「Q-Feeds Connect」。此時將開啟 Q-Feeds 插件的設定頁面，並要求輸入API令牌。

You can obtain this token by register an account on our Threat Intelligence Portal ([https://tip.qfeeds.com](https://tip.qfeeds.com/)).

您可以透過在我們的威脅情報入口網站（[https://tip.qfeeds.com](https://tip.qfeeds.com/) ）上註冊帳戶來取得此令牌。

After you’ve registered an account and logged in, on the dashboard you will find the **Manage API Keys** page. On this page click **Create Free API Key**.

註冊帳戶並登入後，在儀表板上您將找到**管理API金鑰**頁面。在此頁面上點擊**建立免費API金鑰**。

Copy the API token into the settings page of the plugin on your OPNsense appliance. Click Apply and the plugin will start fetching the Threat Intelligence and create firewall aliases.

將API令牌複製到OPNsense設備上插件的設定頁面。點擊“應用”，插件將開始獲取威脅情報並建立防火牆別名。

## [Menu options](#id6)｜[選單選項](#id6)

The (configuration) options available via the plugin can be accessed via a set of tabs in Security ‣ Q-Feeds Connect. Below you will find their purpose.

您可以透過「安全性」‣「Q-Feeds Connect」中的一組標籤存取插件提供的（設定）選項。以下是它們的用途。

**Setting**

**環境**

Subscription configuration

訂閱配置

| **Option**<br>**選項** | **Description**<br>**描述** |
| --- | --- |
| **//General Settings**<br>**//常規設定** |  |
| **API key**<br>**API金鑰** | The API key needed to access Q-Feeds.<br>存取Q-Feeds所需的API鑰。 |
| **Register domain feeds**<br>**註冊網域來源** | Use domain feeds in Unbound DNS and DNScrypt-proxy blocklists, requires blocklists to be enabled in order to have effect<br>在 Unbound DNS和 DNScrypt-proxy 黑名單中使用網域來源，需要啟用黑名單才能生效 |
| **//Unbound blocklist settings**<br>**//無限制黑名單設定** |  |
| **Allowlist Domains**<br>**允許網域清單** | Domains to allow (regex supported), only applies to blocklist matches<br>要允許的網域名稱（支援正規表示式），僅適用於黑名單符合項目 |
| **Source Net(s)**<br>**來源網絡** | Source networks to apply policy on, leave empty for all<br>要套用策略的來源網絡，留空則表示全部應用 |
| **Destination Address**<br>**目標位址** | IP for blocklist entries (default 0.0.0.0)<br>IP用於黑名單條目（預設0.0.0.0 ） |
| **Return NXDOMAIN**<br>**返回NXDOMAIN** | Use NXDOMAIN response instead of destination address<br>使用NXDOMAIN回應取代目標位址 |

**Feeds**

**飼料**

Shows subscription status.

顯示訂閱狀態。

| **Field**<br>**字段** | **Description**<br>**描述** |
| --- | --- |
| Description<br>描述 | Name of the list<br>清單名稱 |
| Type<br>類型 | IP (firewall rules), domain (DNS, Unbound or DNSCrypt-Proxy)<br>IP （防火牆規則），域（ DNS ，Unbound 或 DNSCrypt-Proxy） |
| Updated at<br>更新於 | Last updated at (iso date)<br>最後更新於（ISO 日期） |
| Next update<br>下次更新 | Scheduled to be updated again at (iso date)<br>計劃於（iso 日期）再更新 |
| Licensed<br>已授權 | Valid license on this list installed<br>已安裝此清單中有效的許可證 |

**Events**

**活動**

When firewall rules are being send to the log, you can gather a list of events that took place for items in the firewall table.

當防火牆規則被傳送到日誌時，您可以收集防火牆表中各項發生的事件清單。

| **Field**<br>**字段** | **Description**<br>**描述** |
| --- | --- |
| Timestamp<br>時間戳 | Time the event occurred<br>事件發生的時間 |
| Interface<br>介面 | Which interface it was logged on<br>登入的介面 |
| Direction | Did this concern in(bound) or out(bound) traffic |

| 方向 | 此問題涉及的是進站（入境）還是出站（出城）交通？
| Source<br>來源 | Source IP address<br>來源IP地址 |
| Destination<br>目的地 | Destination IP address<br>目的地IP地址 |

## [Firewall setup](#id7)｜[防火牆設定](#id7)

In order to block traffic originating or going to addresses on the list, you will need firewall rules. The most simple scenario would drop traffic coming from `lan` going to items in our list or entering via `wan` originating from entries in the list.

若要封鎖源自或發送至清單中位址的流量，您需要設定防火牆規則。最簡單的方案是阻止來自`lan`且指向清單中項目的流量，或阻止源自清單中項目的、經由`wan`進入清單的流量。

From LAN:

來自LAN ：

| Parameter<br>參數 | Value<br>值 | Short description<br>簡短描述 |
| --- | --- | --- |
| Action<br>操作 | `Block` | Drop packets silently<br>靜默丟棄資料包 |
| Interface<br>介面 | `LAN` | Traffic on the LAN interface<br>LAN介面上的流量 |
| TCP/IP Version<br>TCP/IP版本 | `IPV4/IPV6` | Both protocols are supported<br>兩種協定皆受支援 |
| Direction<br>方向 | `in` | By default we filter on inbound traffic<br>預設情況下，我們只過濾入站流量 |
| Destination<br>目的地 | `__qfeeds_malware_ip` | The QFeeds offered malware locations<br>QFeeds 提供惡意軟體位置 |
| Logging<br>日誌記錄 | `checked` | With logging enabled, you can track offenders<br>啟用日誌記錄後，您可以追蹤違規者 |

From WAN:

來自WAN ：

| Parameter<br>參數 | Value<br>值 | Short description<br>簡短描述 |
| --- | --- | --- |
| Action<br>操作 | `Block` | Drop packets silently<br>靜默丟棄資料包 |
| Interface<br>介面 | `WAN` | Traffic on the LAN interface<br>LAN介面上的流量 |
| TCP/IP Version<br>TCP/IP版本 | `IPV4/IPV6` | Both protocols are supported<br>兩種協定皆受支援 |
| Direction<br>方向 | `in` | By default we filter on inbound traffic<br>預設情況下，我們只過濾入站流量 |
| Source<br>來源 | `__qfeeds_malware_ip` | The QFeeds offered malware locations<br>QFeeds 提供惡意軟體位置 |
| Logging<br>日誌記錄 | `checked` | With logging enabled, you can track offenders<br>啟用日誌記錄後，您可以追蹤違規者 |

Note

筆記

Only non default rule settings which are offered in the tables above. More information about using firewall rules and aliases can be found in the [Firewall](<130 防火牆.md>) section.

僅提供上表中列出的非預設規則設定。有關使用防火牆規則和別名的更多信息，請參閱[防火牆](<130 防火牆.md>)部分。

## [DNS/Domain blocking using Unbound](#id8)｜[DNS /使用 Unbound 進行網域屏蔽](#id8)

Note

筆記

In order to make us of DNS based logging you need to configure Unbound as your primary DNS server. More information on how to configure this can be found [here](<199 未綁定DNS.md>)

若要使用基於DNS的日誌記錄，您需要將 Unbound 設定為主DNS伺服器。有關如何配置的更多信息，請參閱[此處](<199 未綁定DNS.md>)

In Security ‣ Q-Feeds Connect make sure to enable **“Register domain feeds”** and hit Apply. For older versions (<25.7.9) also make sure Unbound Blocklists are enabled in Services ‣ Unbound DNS ‣ Blocklist.

在「安全性」‣「Q-Feeds Connect」中，確保啟用**「註冊網域來源」**並點選「套用」。對於舊版（< 25.7.9 ），也要確保在「服務」‣「Unbound」 DNS 「阻止清單」中啟用「Unbound封鎖清單」。

Additional Unbound blocklist options: **Allowlist Domains** lets you whitelist domains that would otherwise be blocked (regex supported). **Source Net(s)** restricts the policy to specific client networks, e.g. 192.168.1.0/24; leave empty for all clients. **Destination Address** sets the IP returned for blocked domains (default 0.0.0.0). **Return NXDOMAIN** returns a non-existent domain response instead of redirecting, which hides blocklist behavior from clients.

附加的 Unbound 黑名單選項：**允許網域**允許您將原本會被封鎖的網域新增至白名單（支援正規表示式）。**來源網路**將策略限制在特定的客戶端網絡，例如192.168.1.0/24 ；留空則表示所有客戶端。**目標位址**設定被阻止域回傳的IP （預設為0.0.0.0 ）。**返回NXDOMAIN **傳回一個不存在的網域回應，而不是重定向，這樣可以對客戶端隱藏黑名單行為。

You can use Reporting ‣ Unbound DNS to gain insights into the requested domains.

您可以使用「報告」‣ Unbound DNS來深入了解所要求的網域。

## [DNS/Domain blocking using DNSCrypt-Proxy](#id9)｜[DNS /使用 DNSCrypt-Proxy 進行網域屏蔽](#id9)

When the DNSCrypt-Proxy plugin is installed, domain feeds can be used for DNS blocking. Enable **“Register domain feeds”** in Security ‣ Q-Feeds Connect, then select the Q-Feeds blocklist within the DNSCrypt-Proxy plugin settings to activate it.

安裝 DNSCrypt-Proxy 外掛程式後，網域提要可用於 DNS 封鎖。在安全性‣ Q-Feeds Connect 中啟用**「註冊網域提要」**，然後在 DNSCrypt-Proxy 插件設定中選擇 Q-Feeds 封鎖清單以將其啟動。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Zenarmor Installing via Command Line｜透過命令列安裝 Zenarmor](<221 透過命令列安裝 Zenarmor.md>)　｜　[下一篇：Troubleshooting｜故障排除 ➡](<223 故障排除.md>)
