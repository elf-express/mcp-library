---
title: "DNSCrypt代理"
title_original: "DNSCrypt-Proxy"
source: "https://docs.opnsense.org/manual/how-tos/dnscrypt-proxy.html"
chapter: ["Community Plugins","DNS"]
order: 215
lang: "zh-TW"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:33:30.771Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：BIND插件](<214 BIND插件.md>)　｜　[下一篇：多播DNS代理 ➡](<216 多播DNS代理.md>)

# DNSCrypt代理

> 章節：[Community Plugins](<000 目錄.md#c-36>) › [DNS](<000 目錄.md#c-46>)

## 安裝

首先，您必須從「系統」‣「韌體」‣「外掛程式」存取的外掛程式視圖安裝 dnscrypt-proxy 外掛程式 (os-dnscrypt-proxy)。

頁面重新載入後，您將在 DNSCrypt-Proxy 的**服務**下看到一個新的選單項目。

啟動守護程序時，它會從下列位置找到公共DNS清單：[https://dnscrypt.info/public-servers](https://dnscrypt.info/public-servers)

根據以下所有設置，清單可以按您的選擇進行縮短，例如僅顯示 IPv4 或禁用日誌記錄。速度最快的兩台伺服器將用於DNS查詢。

## 常規設定

啟用 DNSCrypt-Proxy

啟用並啟動 DNSCrypt-Proxy。

收聽地址

您可以在此處設定要偵聽的位址和連接埠。預設為 localhost 和連接埠 5353。如果您希望它偵聽連接埠 53，則必須啟用 **允許特權連接埠**，特別是當系統本身應將其視為解析器時。將此服務用作獨立核心DNS伺服器時需要。

允許特權連接埠

這樣，該服務就可以監聽 1024 以下的端口，例如 53。

最大客戶端連線數

允許多少個客戶端與守護程式通訊？

使用 IPv4 伺服器

使用支援 IPv4 的伺服器。

使用 IPv6 伺服器

僅使用支援 IPv6 的伺服器。

使用 DNSCrypt 伺服器

將支援 DNSCrypt 協定的解析器納入決策過程。

使用DNS而非HTTPS伺服器

在決策過程中加入支援DNS -over-- HTTPS的解析器。

需要DNSSEC

僅使用支援DNSSEC協定的解析器。

需要 NoLog

僅使用已停用日誌記錄的解析器。

無需篩選條件

僅使用不含過濾功能的解析器。否則，請求也會被過濾掉成人內容或廣告。

力量TCP

始終使用TCP連接到上游伺服器。如果您需要將所有流量都通過 Tor 路由，這將非常有用；否則，請保持停用狀態。

代理人

使用此功能將所有TCP連接路由到本地 Tor 節點，格式必須類似於127.0.0.1:9050

暫停

DNS查詢將等待回應多長時間（以毫秒為單位）。

保持存活

Keepalive 對HTTP ( HTTPS, HTTP /2) 個查詢持續數秒。

證書刷新延遲

證書重新載入前的延遲時間（分鐘）。

短暫的鑰匙

為每個DNS查詢建立一個新的、唯一的金鑰。這可能會提高隱私性，但也可能對CPU使用產生重大影響。

TLS禁用會話票

停用TLS會話票證 - 提高隱私性，但也會降低延遲。

備用解析器

這是一個普通的、未加密的DNS解析器，它僅用於檢索初始解析器清單時的一次性查詢，並且僅當系統DNS配置不起作用時才會使用。

阻止 IPv6

立即對 IPv6 相關查詢傳回空響應。這樣在沒有 IPv6 WAN連線時可以加快速度。

快取

啟用DNS快取以減少延遲和出站流量。

快取大小

設定快取大小。

快取最小值TTL

快取條目的最低要求為TTL 。

Cache Max TTL

快取條目的最大TTL 。

快取負最小值TTL

負面快取條目的最低TTL 。

快取負最大值TTL

負面快取條目的最大值為TTL 。

## 例：獨立DNS

您可以將 DNSCrypt-Proxy 用作功能齊全的獨立DNS而不是 Unbound 或 Dnsmasq。這種設定的優點是您不需要轉發器解決方案來加密DNS請求或使用DNSBL 。

為此，請前往**服務->未綁定DNS->常規**並取消選取*啟用*。如果您使用 Dnsmasq，請前往**服務->Dnsmasq DNS->設定**並取消選取*啟用*。現在改為 **Services->DNSCrypt-Proxy->Configuration** 並新增 *Listen Address* 0.0.0.0:53 以使該服務被核心系統視為獨立。

現在您可以繼續進行設定任務，例如選擇要使用的伺服器、隱私權政策或快取。此外，無需任何變通方法即可使用偽裝（覆蓋）或DNSBL 。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：BIND插件](<214 BIND插件.md>)　｜　[下一篇：多播DNS代理 ➡](<216 多播DNS代理.md>)
