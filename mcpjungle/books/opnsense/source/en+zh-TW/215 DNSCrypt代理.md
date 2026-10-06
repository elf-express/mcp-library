---
title: "DNSCrypt-Proxy｜DNSCrypt代理"
title_original: "DNSCrypt-Proxy"
source: "https://docs.opnsense.org/manual/how-tos/dnscrypt-proxy.html"
chapter: ["Community Plugins","DNS"]
order: 215
lang: "bilingual"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:33:30.771Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：BIND Plugin｜BIND插件](<214 BIND插件.md>)　｜　[下一篇：Multicast DNS Proxy｜多播DNS代理 ➡](<216 多播DNS代理.md>)

# DNSCrypt-Proxy｜DNSCrypt代理

> 章節：[Community Plugins](<000 目錄.md#c-36>) › [DNS](<000 目錄.md#c-46>)

## Installation｜安裝

First of all, you have to install the dnscrypt-proxy plugin (os-dnscrypt-proxy) from the plugins view reachable via System ‣ Firmware ‣ Plugins.

首先，您必須從「系統」‣「韌體」‣「外掛程式」存取的外掛程式視圖安裝 dnscrypt-proxy 外掛程式 (os-dnscrypt-proxy)。

After a page reload you will get a new menu entry under **Services** for DNSCrypt-Proxy.

頁面重新載入後，您將在 DNSCrypt-Proxy 的**服務**下看到一個新的選單項目。

When you start the daemon, it looks for a list of public DNS server from here: [https://dnscrypt.info/public-servers](https://dnscrypt.info/public-servers)

啟動守護程序時，它會從下列位置找到公共DNS清單：[https://dnscrypt.info/public-servers](https://dnscrypt.info/public-servers)

Depending on all settings below the list can be shortened to your choice, like only IPv4, or logging disabled. The fastest two servers will be used for DNS queries.

根據以下所有設置，清單可以按您的選擇進行縮短，例如僅顯示 IPv4 或禁用日誌記錄。速度最快的兩台伺服器將用於DNS查詢。

## General Settings｜常規設定

Enable DNSCrypt-Proxy

啟用 DNSCrypt-Proxy

Enable and start DNSCrypt-Proxy.

啟用並啟動 DNSCrypt-Proxy。

Listen Address

收聽地址

Here you set the addresses and ports to listen on. Default is localhost and port 5353. If you want it to listen to port 53 you must enable **Allow Privileged Ports**, especially when the system itself should treat it as a resolver. required when using this service as a standalone core DNS server.

您可以在此處設定要偵聽的位址和連接埠。預設為 localhost 和連接埠 5353。如果您希望它偵聽連接埠 53，則必須啟用 **允許特權連接埠**，特別是當系統本身應將其視為解析器時。將此服務用作獨立核心DNS伺服器時需要。

Allow Privileged Ports

允許特權連接埠

This allows the service to listen on ports below 1024, like 53.

這樣，該服務就可以監聽 1024 以下的端口，例如 53。

Max Client Connections

最大客戶端連線數

How many clients are allowed to contact the daemon.

允許多少個客戶端與守護程式通訊？

Use IPv4 Servers

使用 IPv4 伺服器

Use IPv4 enabled servers.

使用支援 IPv4 的伺服器。

Use IPv6 Servers

使用 IPv6 伺服器

Only use IPv6 enabled servers.

僅使用支援 IPv6 的伺服器。

Use DNSCrypt Servers

使用 DNSCrypt 伺服器

Include resolvers supporting DNSCrypt protocol in the decision process.

將支援 DNSCrypt 協定的解析器納入決策過程。

Use DNS-over-HTTPS Servers

使用DNS而非HTTPS伺服器

Include resolvers supporting DNS-over-HTTPS in the decision process.

在決策過程中加入支援DNS -over-- HTTPS的解析器。

Require DNSSEC

需要DNSSEC

Only use resolvers supporting DNSSEC protocol.

僅使用支援DNSSEC協定的解析器。

Require NoLog

需要 NoLog

Only use resolvers with disabled loggong.

僅使用已停用日誌記錄的解析器。

Require NoFilter

無需篩選條件

Only use resolvers without filtering. Otherwise requests would also filtered for adult content or ad’s.

僅使用不含過濾功能的解析器。否則，請求也會被過濾掉成人內容或廣告。

Force TCP

力量TCP

Always use TCP to connect to upstream servers. This can be useful if you need to route everything through Tor, otherwise keep it disabled.

始終使用TCP連接到上游伺服器。如果您需要將所有流量都通過 Tor 路由，這將非常有用；否則，請保持停用狀態。

Proxy

代理人

Use this to route all TCP connections to a local Tor node, format has to be like 127.0.0.1:9050

使用此功能將所有TCP連接路由到本地 Tor 節點，格式必須類似於127.0.0.1:9050

Timeout

暫停

How long a DNS query will wait for a response in milliseconds.

DNS查詢將等待回應多長時間（以毫秒為單位）。

Keepalive

保持存活

Keepalive for HTTP (HTTPS, HTTP/2) queries in seconds.

Keepalive 對HTTP ( HTTPS, HTTP /2) 個查詢持續數秒。

Cert Refresh Delay

證書刷新延遲

Delay in minutes after which certificates are reloaded.

證書重新載入前的延遲時間（分鐘）。

Ephemeral Keys

短暫的鑰匙

Create a new, unique key for every single DNS query. This may improve privacy but can also have a significant impact on CPU usage.

為每個DNS查詢建立一個新的、唯一的金鑰。這可能會提高隱私性，但也可能對CPU使用產生重大影響。

TLS Disable Session Tickets

TLS禁用會話票

Disable TLS session tickets - increases privacy but also latency.

停用TLS會話票證 - 提高隱私性，但也會提高延遲。

Fallback Resolver

備用解析器

This is a normal, non-encrypted DNS resolver, that will be only used for one-shot queries when retrieving the initial resolvers list, and only if the system DNS configuration does not work.

這是一個普通的、未加密的DNS解析器，它僅用於檢索初始解析器清單時的一次性查詢，並且僅當系統DNS配置不起作用時才會使用。

Block IPv6

阻止 IPv6

Immediately respond to IPv6-related queries with an empty response. This makes things faster when there is no IPv6 WAN connectivity.

立即對 IPv6 相關查詢傳回空響應。這樣在沒有 IPv6 WAN連線時可以加快速度。

Cache

快取

Enable a DNS cache to reduce latency and outgoing traffic.

啟用DNS快取以減少延遲和出站流量。

Cache Size

快取大小

Set the cache size.

設定快取大小。

Cache Min TTL

快取最小值TTL

Minimum TTL for cached entries.

快取條目的最低要求為TTL 。

Cache Max TTL

Maximum TTL for cached entries.

快取條目的最大TTL 。

Cache Negative Min TTL

快取負最小值TTL

Minimum TTL for negatively cached entries.

負面快取條目的最低TTL 。

Cache Negative Max TTL

快取負最大值TTL

Maximum TTL for negatively cached entries.

負面快取條目的最大值為TTL 。

## Example: Standalone DNS｜例：獨立版DNS

You can use the DNSCrypt-Proxy as a full-featured standalone DNS instead of Unbound or Dnsmasq. This setup has the advantage that you do not need a forwarder solution for encrypting DNS requests or the usage of DNSBL.

您可以將 DNSCrypt-Proxy 用作功能齊全的獨立DNS而不是 Unbound 或 Dnsmasq。這種設定的優點是您不需要轉發器解決方案來加密DNS請求或使用DNSBL 。

To do so go to **Services->Unbound DNS->General** and uncheck *Enable*. If you are using Dnsmasq go to **Services->Dnsmasq DNS->Settings** and uncheck *Enable*. Now change to **Services->DNSCrypt-Proxy->Configuration** and add the *Listen Address* 0.0.0.0:53 for the service to be considered as standalone by the core system.

為此，請前往**服務->未綁定DNS->常規**並取消選取*啟用*。如果您使用 Dnsmasq，請前往**服務->Dnsmasq DNS->設定**並取消選取*啟用*。現在改為 **Services->DNSCrypt-Proxy->Configuration** 並新增 *Listen Address* 0.0.0.0:53 以使該服務被核心系統視為獨立。

Now you can go on with your configuration task, like choosing which servers to use, privacy policy or caching. Also cloaking (overrides) or DNSBL can be used without any workarounds.

現在您可以繼續進行設定任務，例如選擇要使用的伺服器、隱私權政策或快取。此外，無需任何變通方法即可使用偽裝（覆蓋）或DNSBL 。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：BIND Plugin｜BIND插件](<214 BIND插件.md>)　｜　[下一篇：Multicast DNS Proxy｜多播DNS代理 ➡](<216 多播DNS代理.md>)
