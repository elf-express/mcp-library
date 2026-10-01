---
title: "Cloudflare Tunnel｜Cloudflare隧道"
title_original: "Cloudflare Tunnel"
source: "https://docs.opnsense.org/manual/how-tos/cloudflared.html"
chapter: ["Community Plugins","Other"]
order: 188
lang: "bilingual"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:33:17.076Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Wazuh Agent](<187 Wazuh Agent.md>)　｜　[下一篇：Tor Configuration｜Tor 配置 ➡](<189 Tor 配置.md>)

# Cloudflare Tunnel｜Cloudflare隧道

> 章節：[Community Plugins](<000 目錄.md#c-36>) › [Other](<000 目錄.md#c-38>)

## Introduction｜介紹

[Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/) (formerly Argo Tunnel) allows you to expose self-hosted services to the internet without opening inbound firewall ports or holding a public IP address. This makes it well-suited for deployments behind CGNAT, ISPs that block inbound connections, or networks where port forwarding is unavailable or undesirable.

[Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/) （原名 Argo Tunnel）可讓您將自架服務暴露給互聯網，而無需開啟入站防火牆連接埠或持有公共IP位址。這使其非常適合部署在CGNAT後、ISP 阻止入站連接，或連接埠轉送不可用或不合適的網路中。

The tunnel daemon (cloudflared) runs on the router, establishes outbound-only connections to Cloudflare’s edge, and forwards incoming HTTP/S and other proxied traffic from Cloudflare to the backend services you configure in the Cloudflare Zero Trust dashboard. Firewall policy for tunnelled services is enforced in Cloudflare Access, not on OPNsense.

隧道守護程式（cloudflared）運行在路由器上，建立到 Cloudflare 邊緣伺服器的僅出站連接，並將來自 Cloudflare 的入站HTTP /S 和其他代理流量轉送到您在 Cloudflare Zero Trust 控制面板中配置的後端服務。隧道服務的防火牆策略在 Cloudflare Access 中強制執行，而不是在 OPNsense 中強制執行。

This plugin wraps the `net/cloudflared` FreeBSD port and requires a free Cloudflare account with the Zero Trust dashboard enabled.

此插件封裝了`net/cloudflared` FreeBSD 端口，需要一個啟用了零信任控制面板的免費 Cloudflare 帳戶。

Warning

警告

Traffic received via the Cloudflare Tunnel bypasses OPNsense firewall rules. Access control for tunnelled services must be enforced within Cloudflare Access. Backend services must also be reachable from the router’s own IP address, as cloudflared forwards connections from the router itself.

透過 Cloudflare 隧道接收的流量會繞過 OPNsense 防火牆規則。必須在 Cloudflare Access 中強制執行對隧道服務的存取控制。後端服務也必須能夠從路由器本身的IP位址訪問，因為 Cloudflare 會轉送來自路由器的連線。

## Installation｜安裝

Install the `os-cloudflared` plugin from System ‣ Firmware ‣ Plugins. Once installed, refresh the page — a new Services ‣ Cloudflare Tunnel menu entry will appear.

從「系統」‣「韌體」‣「插件」安裝`os-cloudflared`插件。安裝完成後，重新整理頁面－將出現一個新的「服務」‣「Cloudflare Tunnel」選單項目。

To obtain a tunnel token:

取得隧道令牌：

1.  Log in to the [Cloudflare Zero Trust dashboard](https://one.dash.cloudflare.com/).  
    登入 [Cloudflare Zero Trust 控制面板](https://one.dash.cloudflare.com/) 。
    
2.  Navigate to Networks ‣ Connectors.  
    導覽至「網路」‣「連接器」。
    
3.  Click **Create a tunnel**, select **Cloudflared** as the connector type, and give the tunnel a name.  
    點擊**建立隧道**，選擇**Cloudflared**作為連接器類型，並為隧道命名。
    
4.  On the next page, copy the tunnel token (the long string shown in the install command). You only need the token itself — not the full command. The dashboard shows OS-specific install commands — ignore the OS selector and copy the long token string at the end of the command.  
    在下一頁，複製隧道令牌（安裝命令中顯示的長字串）。您只需要令牌本身，不需要完整的命令。控制面板顯示的是OS特定的安裝指令－忽略OS選擇器，並複製指令末端的長令牌字串。
    

## Settings｜設定

Navigate to Services ‣ Cloudflare Tunnel ‣ Settings.

導覽至「服務」‣「Cloudflare Tunnel」‣「設定」。

| Field<br>字段 | Description<br>描述 |
| --- | --- |
| Enable<br>啟用 | Start the cloudflared service at boot and keep it running.<br>在系統啟動時啟動 Cloudflared 服務並保持其運作。 |
| Tunnel Token<br>隧道代幣 | Tunnel token from the Cloudflare Zero Trust dashboard.<br>來自 Cloudflare 零信任儀表板的隧道令牌。 |
| Protocol<br>協定 | Transport protocol used to reach Cloudflare’s edge. **auto** (default) lets cloudflared choose. Force **quic** or **http2** only if you have a specific network requirement.<br>用於到達 Cloudflare 邊緣的傳輸協定。 **自動**（預設）讓 cloudflared 選擇。僅當您有特定網路要求時才強制**quic**或**http2**。 |
| Post-Quantum Encryption<br>後量子加密 | Enable post-quantum cryptographic protection for the tunnel connection. Requires QUIC protocol.<br>為隧道連線啟用後量子加密保護。需要QUIC協議。 |
| Disable QUIC PMTU Discovery<br>禁用QUIC PMTU發現 | Disable Path MTU Discovery for QUIC connections. May improve reliability in environments where ICMP is filtered.<br>禁用QUIC連接的路徑MTU發現。這可能提高ICMP被過濾環境中的可靠性。 |
| Log Level<br>日誌等級 | Verbosity of cloudflared logging. Defaults to **info**. Use **debug** for troubleshooting; **warn** or **error** for quieter operation.<br>Cloudflare 日誌的詳細程度。預設為 **info**。使用**debug**進行故障排除；使用**warn**或**error** 進行靜默運轉。 |

## QUIC UDP buffer sizes｜QUIC UDP緩衝區大小

When running in **auto** or **quic** protocol mode, cloudflared relies on the QUIC transport layer (via the `quic-go` library), which benefits significantly from larger UDP receive buffers. FreeBSD’s defaults are too small for high-throughput QUIC and will result in a warning in the cloudflared log:

在**自動**或**快速**協定模式下運作時，cloudflared 依賴QUIC層（透過`quic-go` ），而傳輸層會受益於較大的UDP緩衝區。 FreeBSD 的預設設定對於高QUIC來說太小，會導致 cloudflared 日誌中出現警告：

```
failed to increase receive buffer size (wanted: 7168 kiB, got 41 kiB).
See https://github.com/quic-go/quic-go/wiki/UDP-Buffer-Sizes for details.
```

To suppress this warning and allow QUIC to operate at full throughput, set the following tuneable values under System ‣ Settings ‣ Tuneables to these values or higher:

若要抑制此警告並允許QUIC以全吞吐量運行，請在「系統」‣「設定」‣「可調參數」下將以下可調參數值設為下列值或更高：

| Tuneable<br>可調 | Recommended value<br>建議值 |
| --- | --- |
| kern.ipc.maxsockbuf | 16777216 |
| net.inet.udp.recvspace | 8388608 |

Note

筆記

Even with optimal buffer sizes, sporadic `Application error 0x0 (remote)` or `failed to accept QUIC stream: timeout: no recent network activity` entries may still appear in the log. These alone do not indicate packet corruption or a misconfiguration; enabling Disable QUIC PMTU Discovery may reduce their frequency.

即使緩衝區大小已最佳化，日誌中仍可能偶爾出現`Application error 0x0 (remote)`或`failed to accept QUIC stream: timeout: no recent network activity`條目。這些條目本身並不表示封包損壞或配置錯誤；啟用「停用QUIC PMTU發現」功能可能會降低其出現頻率。

## Firewall considerations｜防火牆注意事項

cloudflared makes outbound-only connections to Cloudflare’s edge on **TCP and UDP port 7844**. On a default OPNsense configuration no extra firewall rules are required.

cloudflared 僅透過 **TCP和UDP連接埠 7844** 與 Cloudflare 邊緣伺服器建立出站連線。在預設的 OPNsense 配置下，無需額外的防火牆規則。

If you have strict outbound floating rules (GeoIP blocks, blocklists, or a default deny outbound policy), add a manual rule allowing traffic from **This Firewall** to **any** on **TCP/UDP port 7844**.

如果您有嚴格的出站浮動規則（GeoIP 封鎖、封鎖清單或預設拒絕出站策略），請新增手動規則，允許從 **此防火牆**到**TCP/UDP 連接埠 7844**上的**任何** 的流量。

**Multi-WAN users:** With multiple gateways configured, cloudflared traffic originating from the router itself may fail to route entirely — not merely exit via the wrong WAN. You must add an explicit policy-route rule to direct it:

**多用戶WAN ：**配置了多個網關後，來自路由器本身的 Cloudflare 流量可能完全無法路由，而不僅僅是透過錯誤的WAN出口。您必須新增一條明確的策略路由規則來引導它：

1.  Navigate to Firewall ‣ Rules ‣ Floating.  
    導覽至防火牆‣規則‣浮動。
    
2.  Add a rule matching **Source: This Firewall**, **Destination: any**, **Protocol: TCP/UDP**, **Destination port: 7844**.  
    新增一條規則，符合**來源：此防火牆**，**目標：任何**，**協定： TCP/UDP**，**目標連接埠：7844**。
    
3.  Under Gateway, select the specific WAN gateway or gateway group through which the tunnel should exit.  
    在「網關」下，選擇隧道應通過的特定WAN網關或網關群組。
    
4.  Apply the rules.  
    遵守規則。
    

Note

筆記

If you use Cloudflare Access policies on your tunnel, add a second floating rule with the same source and gateway matching **Protocol: TCP**, **Destination port: 443**, to allow JWT validation against your Cloudflare Access team domain.

如果您在隧道上使用 Cloudflare Access 策略，請新增第二個浮動規則，其來源和網關與 **協定： TCP**、**目標連接埠：443** 匹配，以允許針對您的 Cloudflare Access 團隊網域進行JWT驗證。

Alternatively, enable Disable force gateway under Firewall ‣ Settings ‣ Advanced if you want locally-originated traffic to follow the routing table rather than be forced through a gateway, but be aware that this may have unintended consequences for other traffic originating from the firewall itself.

或者，如果您希望本地發起的流量遵循路由表而不是強制通過網關，可以在“防火牆”‣“設定”‣“高級”下啟用“禁用強制網關”，但請注意，這可能會對來自防火牆本身的其他流量產生意想不到的後果。

## Startup and crash recovery｜啟動和崩潰恢復

cloudflared will exit if it cannot resolve DNS when it first starts — for example, on a fresh boot before upstream resolvers become reachable. The plugin registers a `newwanip` hook that automatically starts cloudflared (if it is not already running) whenever the WAN interface receives a new IP address, providing recovery in the common boot-order race.

如果 cloudflared 在首次啟動時（例如，在上游解析器可達之前的新系統啟動時）無法解析DNS位址，則會退出。該插件註冊了一個`newwanip`鉤子，當WAN介面接收到新的IP位址時，該鉤子會自動啟動 cloudflared（如果它尚未運行），從而在常見的啟動順序衝突中提供恢復機制。

## Logging｜日誌記錄

Navigate to Services ‣ Cloudflare Tunnel ‣ Log File to view the cloudflared log via the standard OPNsense log viewer.

導覽至“服務”‣“Cloudflare Tunnel”‣“日誌檔案”，透過標準的 OPNsense 日誌檢視器查看 Cloudflare 日誌。

Note

筆記

The following warning appears at every startup and can be safely ignored:

每次啟動時都會出現以下警告，可以安全地忽略：

```
WRN ICMP proxy feature is disabled error="cannot create ICMPv4 proxy:
ICMP proxy is not implemented on freebsd amd64 nor ICMPv6 proxy:
ICMP proxy is not implemented on freebsd amd64"
```

cloudflared’s ICMP proxy enables ping and traceroute forwarding through the tunnel for WARP-based private network access. It is not implemented for FreeBSD, but has no effect on standard Cloudflare Tunnel operation.

Cloudflare 的ICMP代理允許透過隧道轉送 ping 和 traceroute 指令，以支援基於WARP的私有網路存取。該功能尚未在 FreeBSD 系統中實現，但不會影響標準的 Cloudflare Tunnel 運作。

cloudflared exposes a local metrics endpoint at `http://localhost:2000/healthcheck` which can be used to verify tunnel connectivity:

cloudflared 在`http://localhost:2000/healthcheck`公開了一個本地指標端點，可用來驗證隧道連接性：

```
fetch -qo - http://localhost:2000/healthcheck
```

Warning

警告

The healthcheck may report `{"connsCount":1}` while the tunnel is still in the process of connecting — the connection count does not reliably indicate that the tunnel is fully established. Confirm tunnel status in the Cloudflare Zero Trust dashboard (Networks ‣ Connectors) or check the log for a `Registered tunnel connection` entry. See [cloudflared issue #1633](https://github.com/cloudflare/cloudflared/issues/1633) for details.

健康檢查可能會在隧道仍在連接過程中報告`{"connsCount":1}` ——連接數並不能可靠地表明隧道已完全建立。請在 Cloudflare Zero Trust 控制面板（網路 ‣ 連接器）中確認隧道狀態，或檢查日誌中是否存在`Registered tunnel connection`條目。詳情請參閱 [cloudflared issue #1633](https://github.com/cloudflare/cloudflared/issues/1633) 。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Wazuh Agent](<187 Wazuh Agent.md>)　｜　[下一篇：Tor Configuration｜Tor 配置 ➡](<189 Tor 配置.md>)
