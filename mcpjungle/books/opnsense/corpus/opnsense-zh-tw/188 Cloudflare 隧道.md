---
title: "Cloudflare 隧道"
title_original: "Cloudflare Tunnel"
source: https://docs.opnsense.org/manual/how-tos/cloudflared.html
chapter: ["Community Plugins","Other"]
order: 188
lang: "zh-TW"
translated_by: "gtx"
captured: "2026-09-26T11:33:17.076Z"
---

# Cloudflare 隧道

## 介紹

[Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/)（以前稱為 Argo Tunnel）可讓您向 Internet 公開自架服務，而無需開啟入站防火牆連接埠或持有公用 IP 位址。這使得它非常適合CGNAT、阻止入站連接的 ISP 或連接埠轉送不可用或不需要的網路後面的部署。

隧道守護程式 (cloudflared) 在路由器上運行，建立與 Cloudflare 邊緣的僅出站連接，並將傳入 HTTP/S 和其他代理流量從 Cloudflare 轉送到您在 Cloudflare 零信任儀表板中配置的後端服務。隧道服務的防火牆策略在 Cloudflare Access 中實施，而不是在 OPNsense 上實施。

該插件封裝了 `net/cloudflared` FreeBSD 端口，並且需要一個啟用了零信任儀表板的免費 Cloudflare 帳戶。

警告

透過 Cloudflare Tunnel 接收的流量繞過 OPNsense 防火牆規則。必須在 Cloudflare Access 中強制執行隧道服務的存取控制。後端服務也必須可以從路由器自己的 IP 位址訪問，因為 cloudflared 會從路由器本身轉送連線。

## 安裝

從系統‣韌體‣插件安裝`os-cloudflared`插件。安裝後，刷新頁面 — 將出現一個新的 Services ‣ Cloudflare Tunnel 選單項目。

取得隧道令牌：

1.  登入[Cloudflare 零信任儀表板](https://one.dash.cloudflare.com/)。
    
2.  導覽至網路 ‣ 連接器。
    
3.  按一下 **建立隧道**，選擇**Cloudflared** 作為連接器類型，並為隧道命名。
    
4.  在下一頁上，複製隧道令牌（安裝命令中顯示的長字串）。您只需要令牌本身，而不需要完整的命令。儀表板顯示OS特定的安裝命令 - 忽略OS選擇器並複製命令末尾的長令牌字串。
    

## 設定

導覽至服務 ‣ Cloudflare Tunnel ‣ 設定。

|領域 |描述 |
| --- | --- |
|啟用 |在啟動時啟動 cloudflared 服務並保持其運作。 |
|隧道代幣|來自 Cloudflare 零信任儀表板的隧道令牌。 |
|協定|用於到達 Cloudflare 邊緣的傳輸協定。 **自動**（預設）讓 cloudflared 選擇。僅當您有特定網路要求時才強制**quic**或**http2**。 |
|後量子加密 |為隧道連線啟用後量子加密保護。需要QUIC協議。 |
|禁用QUIC PMTU發現|禁用 QUIC 連接的路徑 MTU 發現。可以提高過濾ICMP的環境中的可靠性。 |
|日誌等級| cloudflared 日誌記錄的冗長。預設為**訊息**。使用**debug**進行故障排除；**警告**或**錯誤**以實現更安靜的操作。 |

## QUIC UDP 緩衝區大小

當在 **auto**或**quic** 協定模式下運作時，cloudflared 依賴 QUIC 傳輸層（透過 `quic-go` 函式庫），這從更大的 UDP 接收緩衝區中受益匪淺。 FreeBSD 的預設值對於高吞吐量QUIC來說太小，並且會導致在 cloudflared 日誌中出現警告：

```
failed to increase receive buffer size (wanted: 7168 kiB, got 41 kiB).
See https://github.com/quic-go/quic-go/wiki/UDP-Buffer-Sizes for details.
```

若要抑制此警告並允許 QUIC 以全吞吐量運行，請將 System ‣ Settings ‣ Tuneables 下的以下可調值設為這些值或更高：

|可調|建議值|
| --- | --- |
| kern.ipc.maxsockbuf | 16777216 |
| net.inet.udp.recvspace | 8388608 |

注意事項

即使具有最佳緩衝區大小，零星的 `Application error 0x0 (remote)` 或 `failed to accept QUIC stream: timeout: no recent network activity` 條目仍可能出現在日誌中。僅這些並不表示資料包損壞或配置錯誤；啟用停用QUIC PMTU發現可能會降低其頻率。

## 防火牆注意事項

cloudflared 在 **TCP 和 UDP 連接埠 7844** 上僅與 Cloudflare 邊緣建立出站連線。在預設 OPNsense 配置中，不需要額外的防火牆規則。

如果您有嚴格的出站浮動規則（GeoIP 封鎖、封鎖清單或預設拒絕出站策略），請新增手動規則，允許從 **此防火牆**到**TCP/UDP 連接埠 7844**上的**任何** 的流量。

**多WAN用戶：** 設定多個網關後，源自路由器本身的cloudflared流量可能無法完全路由－而不僅僅是透過錯誤的WAN退出。您必須新增明確策略路由規則來引導它：

1.  導覽至防火牆 ‣ 規則 ‣ 浮動。
    
2.  新增符合 **來源：此防火牆**、**目標：任意**、**協定：TCP/UDP**、**目標連接埠：7844** 的規則。
    
3.  在網關下，選擇隧道應退出的特定 WAN 網關或網關群組。
    
4.  應用規則。
    

注意事項

如果您在隧道上使用 Cloudflare Access 策略，請新增具有相同來源和網關的第二個浮動規則，符合 **協定：TCP**、**目標連接埠：443**，以允許針對您的 Cloudflare Access 團隊網域進行 JWT 驗證。

或者，如果您希望本地產生的流量遵循路由表而不是強制通過網關，請在 Firewall ‣ Settings ‣ Advanced 下啟用停用強制網關，但請注意，這可能會對源自防火牆本身的其他流量產生意想不到的後果。

## 啟動和崩潰恢復

如果 cloudflared 在首次啟動時無法解析 DNS，則將退出 - 例如，在上游解析器可存取之前進行全新啟動。該插件會註冊一個 `newwanip` 鉤子，只要 WAN 介面收到新的 IP 地址，該鉤子就會自動啟動 cloudflared（如果它尚未運行），從而在常見的啟動順序競爭中提供恢復。

## 日誌記錄

導覽至 Services ‣ Cloudflare Tunnel ‣ Log File，透過標準 OPNsense 日誌檢視器查看 cloudflare 日誌。

注意事項

每次啟動時都會出現以下警告，可以安全地忽略：

```
WRN ICMP proxy feature is disabled error="cannot create ICMPv4 proxy:
ICMP proxy is not implemented on freebsd amd64 nor ICMPv6 proxy:
ICMP proxy is not implemented on freebsd amd64"
```

cloudflared 的 ICMP 代理可透過隧道進行 ping 和 Traceroute 轉發，以實現基於 WARP 的專用網路存取。它未針對 FreeBSD 實現，但對標準 Cloudflare Tunnel 作業沒有影響。

cloudflared 在 `http://localhost:2000/healthcheck` 公開了一個本地指標端點，可用來驗證隧道連接：

```
fetch -qo - http://localhost:2000/healthcheck
```

警告

當隧道仍在連接過程中時，運行狀況檢查可能會報告 `{"connsCount":1}` — 連線計數無法可靠地表示隧道已完全建立。在 Cloudflare 零信任儀表板（網路 ‣ 連接器）中確認隧道狀態，或檢查日誌中的 `Registered tunnel connection` 條目。有關詳細信息，請參閱 [cloudflared 問題 #1633](https://github.com/cloudflare/cloudflared/issues/1633)。