---
title: "WireGuard Site-to-Site Setup｜WireGuard 站點到站點設置"
title_original: "WireGuard Site-to-Site Setup"
source: "https://docs.opnsense.org/manual/how-tos/wireguard-s2s.html"
chapter: ["Virtual Private Networking","Wireguard","Examples"]
order: 155
lang: "bilingual"
translated_by: "gtx"
captured: "2026-09-26T11:32:59.905Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Virtual Private Networking｜虛擬私人網路](<154 虛擬私人網路.md>)　｜　[下一篇：WireGuard Road Warrior Setup｜WireGuard Road Warrior 設置 ➡](<156 WireGuard Road Warrior 設置.md>)

# WireGuard Site-to-Site Setup｜WireGuard 站點到站點設置

> 章節：[Virtual Private Networking](<000 目錄.md#c-32>) › [Wireguard](<000 目錄.md#c-33>) › [Examples](<000 目錄.md#c-34>)

## Introduction｜介紹

WireGuard is a simple and fast modern VPN protocol. It aims to be less complicated than IPSec, working more like ssh with private and public keys. It has fewer lines of code and is more easily audited than other VPN protocols. Initially released for the Linux kernel, it is now cross-platform and widely deployable.

WireGuard 是一種簡單快速的現代 VPN 協定。它的目標是比 IPSec 更簡單，更像使用私鑰和公鑰的 ssh。與其他 VPN 協定相比，它的程式碼行數更少，並且更容易審核。它最初是針對 Linux 核心發布的，現在是跨平台且可廣泛部署的。

Note

筆記

The following example covers an IPv4 Site to Site Wireguard Tunnel between two OPNsense Firewalls with public IPv4 addresses on their WAN interfaces. You will connect *Site A LAN Net* `172.16.0.0/24` to *Site B LAN Net* `192.168.0.0/24` using the *Wireguard Transfer Net* `10.2.2.0/24`. *Site A Public IP* is `203.0.113.1` and *Site B Public IP* is `203.0.113.2`.

以下範例介紹兩個 OPNsense 防火牆之間的 IPv4 站對站 Wireguard 隧道，其 WAN 介面上具有公用 IPv4 位址。您將使用 *Wireguard Transfer Net* `10.2.2.0/24` 將*網站 A LAN Net* `172.16.0.0/24` 連接至 *網站 B LAN Net* `192.168.0.0/24`。 *站點 A 公共 IP* 為 `203.0.113.1`，*站點 B 公共 IP* 為 `203.0.113.2`。

Tip

提示

You can also easily expand this Site to Site tunnel with IPv6 Global Unicast addresses (GUA) or Unique Local Addresses (ULA) to create a Dual Stack tunnel. Just add these IPv6 Networks (usually with /64 Prefix) to the *allowed IPs* and create Firewall rules to allow the traffic.

您也可以使用 IPv6 全球單播位址 (GUA) 或唯一本機位址 (ULA) 輕鬆擴充此網站到網站隧道，以建立雙堆疊隧道。只需將這些 IPv6 網路（通常帶有 /64 前綴）新增至*允許的 IP* 並建立防火牆規則以允許流量。

Attention

注意

When using Wireguard in a HA setup, use the “Depend on (CARP)” setting in each instance.

在 HA 設定中使用 Wireguard 時，請在每個實例中使用「取決於 (CARP)」設定。

## Step 1 - Installation｜第 1 步 - 安裝

Install the os-wireguard plugin in System ‣ Firmware ‣ Plugins, refresh the GUI and you will soon find VPN ‣ WireGuard.

在系統‣韌體‣插件中安裝os-wireguard插件，刷新GUI很快就會發現VPN‣WireGuard。

## Step 2a - Setup WireGuard Instance on OPNsense Site A｜步驟 2a - 在 OPNsense 站點 A 上設定 WireGuard 實例

Go to tab **Instances** and press **+** to create a new instance.

前往選項卡 **實例**並按**+** 建立新實例。

Enable the *advanced mode* toggle.

啟用*進階模式*切換。

> |   |   |
> | --- | --- |
> | **Enabled**<br>**啟用** | *Checked*<br>*已檢查* |
> | **Name**<br>**姓名** | *wgopn-site-a*<br>*wgopn-站點-a* |
> | **Public Key**<br>**公鑰** | *Generate with “Generate new keypair” button*<br>*使用「產生新金鑰對」按鈕產生* |
> | **Private Key**<br>**私鑰** | *Generates automatically*<br>*自動產生* |
> | **Listen Port**<br>**監聽埠** | *51820* |
> | **MTU** | *1420 (default) or 1412 if you use PPPoE*<br>*1420（預設）或 1412（如果您使用 PPPoE）* |
> | **Tunnel Address**<br>**隧道位址** | *10.2.2.1/24* |
> | **Peers**<br>**同行** | *Populated in later step*<br>*在後續步驟中填入* |

Press **Save** and **Apply**.

按**儲存**並**應用**。

## Step 2b - Setup WireGuard Instance on OPNsense Site B｜步驟 2b - 在 OPNsense 站點 B 上設定 WireGuard 實例

Go to tab **Instance** and press **+** to create a new instance.

轉到選項卡 **實例**並按**++** 建立新實例。

Enable the *advanced mode* toggle.

啟用*進階模式*切換。

> |   |   |
> | --- | --- |
> | **Enabled**<br>**啟用** | *Checked*<br>*已檢查* |
> | **Name**<br>**姓名** | *wgopn-site-b*<br>*wgopn-站點-b* |
> | **Public Key**<br>**公鑰** | *Generate with “Generate new keypair” button*<br>*使用「產生新金鑰對」按鈕產生* |
> | **Private Key**<br>**私鑰** | *Generates automatically*<br>*自動產生* |
> | **Listen Port**<br>**監聽埠** | *51820* |
> | **MTU** | *1420 (default) or 1412 if you use PPPoE*<br>*1420（預設）或 1412（如果您使用 PPPoE）* |
> | **Tunnel Address**<br>**隧道位址** | *10.2.2.2/24* |
> | **Peers**<br>**同行** | *Populated in later step*<br>*在後續步驟中填入* |

Press **Save** and **Apply**.

按**儲存**並**應用**。

## Step 3a - Setup WireGuard Peer on OPNsense Site A｜步驟 3a - 在 OPNsense 站點 A 上設定 WireGuard 對等點

Go to tab **Peers** and press **+** to create a new peer.

前往選項卡 **Peers**並按**+** 以建立新的對等點。

Enable the *advanced mode* toggle.

啟用*進階模式*切換。

> |   |   |
> | --- | --- |
> | **Enabled**<br>**啟用** | *Checked*<br>*已檢查* |
> | **Name**<br>**姓名** | *wgopn-site-b*<br>*wgopn-站點-b* |
> | **Public Key**<br>**公鑰** | *Insert the public key of the instance from wgopn-site-b*<br>*插入來自 wgopn-site-b 的實例的公鑰* |
> | **Shared Secret**<br>**共享秘密** | *Leave empty*<br>*留空* |
> | **Allowed IPs**<br>**允許的 IP** | *10.2.2.2/32 192.168.0.0/24* |
> | **Endpoint Address**<br>**端點位址** | *203.0.113.2* |
> | **Endpoint Port**<br>**端點連接埠** | *51820* |

Press **Save** and **Apply**.

按**儲存**並**應用**。

Go to tab **Instances** and edit *wgopn-site-a*.

前往選項卡 **Instances** 並編輯 *wgopn-site-a*。

> |   |   |
> | --- | --- |
> | **Peers**<br>**同行** | *wgopn-site-b*<br>*wgopn-站點-b* |

Press **Save** and **Apply**.

按**儲存**並**應用**。

## Step 3b - Setup WireGuard Peer on OPNsense Site B｜步驟 3b - 在 OPNsense 站點 B 上設定 WireGuard 對等點

Go to tab **Peers** and press **+** to create a new peer.

前往選項卡 **Peers**並按**+** 以建立新的對等點。

Enable the *advanced mode* toggle.

啟用*進階模式*切換。

> |   |   |
> | --- | --- |
> | **Enabled**<br>**啟用** | *Checked*<br>*已檢查* |
> | **Name**<br>**姓名** | *wgopn-site-a*<br>*wgopn-站點-a* |
> | **Public Key**<br>**公鑰** | *Insert the public key of the instance from wgopn-site-a*<br>*插入來自 wgopn-site-a 的實例的公鑰* |
> | **Shared Secret**<br>**共享秘密** | *Leave empty*<br>*留空* |
> | **Allowed IPs**<br>**允許的 IP** | *10.2.2.1/32 172.16.0.0/24* |
> | **Endpoint Address**<br>**端點位址** | *203.0.113.1* |
> | **Endpoint Port**<br>**端點連接埠** | *51820* |

Press **Save** and **Apply**.

按**儲存**並**應用**。

Go to tab **Instances** and edit *wgopn-site-b*.

前往選項卡 **Instances** 並編輯 *wgopn-site-b*。

> |   |   |
> | --- | --- |
> | **Peers**<br>**同行** | *wgopn-site-a*<br>*wgopn-站點-a* |

Press **Save** and **Apply**.

按**儲存**並**應用**。

Tip

提示

If one of your sites has a dynamic WAN IP address, you can leave the *Endpoint Address* on the site with the static IP address empty. The site with the dynamic IP will then be the initiator, and the site with the static IP will be the responder. Adjust the Firewall rule accordingly to allow any Source IP to connect to the static site.

如果您的某個網站具有動態 WAN IP 位址，您可以將網站上的 *端點位址* 保留為空，而靜態 IP 位址為空。具有動態 IP 的站點將成為發起者，而具有靜態 IP 的站點將成為響應者。相應地調整防火牆規則以允許任何來源IP連接到靜態站點。

Note

筆記

If you use hostnames in the *Endpoint Address*, Wireguard will only resolve them once when you start the tunnel. If both sites have dynamic *Endpoint Addresses* set, the tunnel will stop working when they both use DynDNS hostnames, and one (or both) sites receive a new WAN IP lease from the ISP. You can mitigate this with System ‣ Settings ‣ Cron and creating a new job that runs regularly with the command `Renew DNS for WireGuard on stale connections`.

如果您在*端點位址*中使用主機名，Wireguard 將僅在您啟動隧道時解析一次。如果兩個站點都設定了動態*端點位址*，則當它們都使用 DynDNS 主機名稱並且一個（或兩個）站點從 ISP 收到新的 WAN IP 租約時，隧道將停止工作。您可以透過 System ‣ Settings ‣ Cron 來緩解這種情況，並建立一個使用指令 `Renew DNS for WireGuard on stale connections` 定期執行的新作業。

Note

筆記

If a site is behind NAT, a keepalive has to be set on the site behind the NAT. The keepalive should be 25 seconds as stated in the official wireguard docs. It keeps the UDP session open when no traffic flows, preventing the wireguard tunnel from becoming stale because the outbound port changes.

如果站點位於NAT後面，則必須在NAT後面的站點上設置保活。正如官方 wireguard 文件中所述，保持活動時間應為 25 秒。當沒有流量流動時，它使UDP會話保持開啟狀態，從而防止wireguard隧道因出站連接埠更改而變得陳舊。

## Step 4a - Setup Firewall Site A｜步驟 4a - 設定防火牆站點 A

Go to Firewall ‣ Rules ‣ WAN add a new rule to allow incoming wireguard traffic from Site B.

前往防火牆 ‣ 規則 ‣ WAN 新增規則以允許來自站點 B 的傳入 Wireguard 流量。

> |   |   |
> | --- | --- |
> | **Action**<br>**行動** | *Pass*<br>*透過* |
> | **Interface**<br>**介面** | *WAN* |
> | **Direction**<br>**方向** | *In*<br>*在* |
> | **TCP/IP Version**<br>**TCP/IP 版本** | *IPv4* |
> | **Protocol**<br>**協議** | *UDP* |
> | **Source**<br>**來源** | *203.0.113.2* |
> | **Destination**<br>**目的地** | *203.0.113.1* |
> | **Destination port**<br>**目的港** | *51820* |
> | **Description**<br>**描述** | *Allow Wireguard from Site B to Site A*<br>*允許 Wireguard 從網站 B 到網站 A* |

Press **Save** and **Apply**.

按**儲存**並**應用**。

Go to Firewall ‣ Settings ‣ Normalization and add a new rule to prevent fragmentation of traffic going through the wireguard tunnel.

前往 Firewall ‣ Settings ‣ Normalization 並新增規則以防止通過 Wireguard 隧道的流量碎片。

> |   |   |
> | --- | --- |
> | **Interface**<br>**介面** | *WireGuard (Group)*<br>*WireGuard（群組）* |
> | **Direction**<br>**方向** | *Any*<br>*任意* |
> | **Protocol**<br>**協議** | *any*<br>*任意* |
> | **Source**<br>**來源** | *any*<br>*任意* |
> | **Destination**<br>**目的地** | *any*<br>*任意* |
> | **Destination port**<br>**目的港** | *any*<br>*任意* |
> | **Description**<br>**描述** | *Wireguard MSS Clamping Site A*<br>*Wireguard MSS 夾緊部位 A* |
> | **Max mss**<br>**最大毫秒數** | *1380 or lower, subtract at least 40 bytes from the Wireguard MTU*<br>*1380 或更低，從 Wireguard MTU 減去至少 40 個位元組* |

Note

筆記

By creating the normalization rules, you ensure that IPv4 TCP can pass through the Wireguard tunnel without being fragmented. Otherwise you could get working ICMP and UDP, but some encrypted TCP sessions will refuse to work. If you want to use IPv6 TCP, lower the MSS by 60 bytes instead of 40 bytes.

透過建立規範化規則，您可以確保 IPv4 TCP 可以透過 Wireguard 隧道而不被分段。否則，您可以正常工作 ICMP 和 UDP，但某些加密的 TCP 會話將拒絕工作。如果您想使用 IPv6 TCP，請將 MSS 降低 60 個字節，而不是 40 個位元組。

## Step 4b - Setup Firewall Site B｜步驟 4b - 設定防火牆站點 B

Go to Firewall ‣ Rules ‣ WAN add a new rule to allow incoming wireguard traffic from Site A.

前往防火牆 ‣ 規則 ‣ WAN 新增規則以允許來自站點 A 的傳入 Wireguard 流量。

> |   |   |
> | --- | --- |
> | **Action**<br>**行動** | *Pass*<br>*透過* |
> | **Interface**<br>**介面** | *WAN* |
> | **Direction**<br>**方向** | *In*<br>*在* |
> | **TCP/IP Version**<br>**TCP/IP版本** | *IPv4* |
> | **Protocol**<br>**協議** | *UDP* |
> | **Source**<br>**來源** | *203.0.113.1* |
> | **Destination**<br>**目的地** | *203.0.113.2* |
> | **Destination port**<br>**目的港** | *51820* |
> | **Description**<br>**描述** | *Allow Wireguard from Site A to Site B*<br>*允許 Wireguard 從網站 A 到網站 B* |

Press **Save** and **Apply**.

按**儲存**並**應用**。

Go to Firewall ‣ Settings ‣ Normalization and add a new rule to prevent fragmentation of traffic going through the wireguard tunnel.

前往 Firewall ‣ Settings ‣ Normalization 並新增規則以防止通過 Wireguard 隧道的流量碎片。

> |   |   |
> | --- | --- |
> | **Interface**<br>**介面** | *WireGuard (Group)*<br>*WireGuard（群組）* |
> | **Direction**<br>**方向** | *Any*<br>*任意* |
> | **Protocol**<br>**協議** | *any*<br>*任意* |
> | **Source**<br>**來源** | *any*<br>*任意* |
> | **Destination**<br>**目的地** | *any*<br>*任意* |
> | **Destination port**<br>**目的港** | *any*<br>*任意* |
> | **Description**<br>**描述** | *Wireguard MSS Clamping Site B*<br>*Wireguard MSS 夾緊部位 B* |
> | **Max mss**<br>**最大毫秒數** | *1380 or lower, subtract at least 40 bytes from the Wireguard MTU*<br>*1380 或更低，從 Wireguard MTU 減去至少 40 個位元組* |

## Step 4c - Enable Wireguard on Site A and Site B｜步驟 4c - 在網站 A 和網站 B 上啟用 Wireguard

Go to VPN ‣ WireGuard ‣ Settings on both sites and **Enable WireGuard**

前往 VPN ‣ WireGuard ‣ 兩個網站上的設定並**啟用 WireGuard**

Press **Apply** and check VPN ‣ WireGuard ‣ Diagnostics. You should see *Send* and *Received* traffic and *Handshake* should be populated by a number. This happens as soon as the first traffic flows between the sites.

按 **套用** 並檢查 VPN ‣ WireGuard ‣ 診斷。您應該看到 *Send* 和 *Received* 流量，並且 *Handshake* 應由數字填充。一旦站點之間出現第一個流量，就會發生這種情況。

Your tunnel is now up and running.

您的隧道現已啟動並運行。

## Step 5 - Allow traffic between Site A LAN Net and Site B LAN Net｜步驟 5 - 允許站點 A LAN 網路與站點 B LAN 網路之間的流量

Go to OPNsense Site A Firewall ‣ Rules ‣ LAN A add a new rule.

前往 OPNsense 站點 A 防火牆 ‣ 規則 ‣ LAN A 新增規則。

> |   |   |
> | --- | --- |
> | **Action**<br>**行動** | *Pass*<br>*透過* |
> | **Interface**<br>**介面** | *LAN A*<br>*LANA* |
> | **Direction**<br>**方向** | *In*<br>*在* |
> | **TCP/IP Version**<br>**TCP/IP版本** | *IPv4* |
> | **Protocol**<br>**協議** | *Any*<br>*任意* |
> | **Source**<br>**來源** | *172.16.0.0/24* |
> | **Source port**<br>**來源連接埠** | *Any*<br>*任意* |
> | **Destination**<br>**目的地** | *192.168.0.0/24* |
> | **Destination port**<br>**目的港** | *Any*<br>*任意* |
> | **Description**<br>**描述** | *Allow LAN Site A to LAN Site B*<br>*允許LAN站點A到LAN站點B* |

Press **Save** and **Apply**.

按**儲存**並**應用**。

Go to OPNsense Site A Firewall ‣ Rules ‣ Wireguard (Group) add a new rule.

前往 OPNsense Site A Firewall ‣ Rules ‣ Wireguard (Group) 新增規則。

> |   |   |
> | --- | --- |
> | **Action**<br>**行動** | *Pass*<br>*透過* |
> | **Interface**<br>**介面** | *Wireguard (Group)*<br>*Wireguard（集團）* |
> | **Direction**<br>**方向** | *In*<br>*在* |
> | **TCP/IP Version**<br>**TCP/IP版本** | *IPv4* |
> | **Protocol**<br>**協議** | *Any*<br>*任意* |
> | **Source**<br>**來源** | *192.168.0.0/24* |
> | **Source port**<br>**來源連接埠** | *Any*<br>*任意* |
> | **Destination**<br>**目的地** | *172.16.0.0/24* |
> | **Destination port**<br>**目的港** | *Any*<br>*任意* |
> | **Description**<br>**描述** | *Allow LAN Site B to LAN Site A*<br>*允許LAN站點B到LAN站點A* |

Press **Save** and **Apply**. Allowed IPs

按**儲存**並**應用**。允許的 IP

Go to OPNsense Site B Firewall ‣ Rules ‣ LAN A add a new rule.

前往 OPNsense 站點 B 防火牆 ‣ 規則 ‣ LAN A 新增規則。

> |   |   |
> | --- | --- |
> | **Action**<br>**行動** | *Pass*<br>*透過* |
> | **Interface**<br>**介面** | *LAN B*<br>*LANB* |
> | **Direction**<br>**方向** | *In*<br>*在* |
> | **TCP/IP Version**<br>**TCP/IP版本** | *IPv4* |
> | **Protocol**<br>**協議** | *Any*<br>*任意* |
> | **Source**<br>**來源** | *192.168.0.0/24* |
> | **Source port**<br>**來源連接埠** | *Any*<br>*任意* |
> | **Destination**<br>**目的地** | *172.16.0.0/24* |
> | **Destination port**<br>**目的港** | *Any*<br>*任意* |
> | **Description**<br>**描述** | *Allow LAN Site B to LAN Site A*<br>*允許LAN站點B到LAN站點A* |

Press **Save** and **Apply**.

按**儲存**並**應用**。

Go to OPNsense Site B Firewall ‣ Rules ‣ Wireguard (Group) add a new rule.

前往 OPNsense Site B Firewall ‣ Rules ‣ Wireguard (Group) 新增規則。

> |   |   |
> | --- | --- |
> | **Action**<br>**行動** | *Pass*<br>*透過* |
> | **Interface**<br>**介面** | *Wireguard (Group)*<br>*Wireguard（集團）* |
> | **Direction**<br>**方向** | *In*<br>*在* |
> | **TCP/IP Version**<br>**TCP/IP版本** | *IPv4* |
> | **Protocol**<br>**協議** | *Any*<br>*任意* |
> | **Source**<br>**來源** | *172.16.0.0/24* |
> | **Source port**<br>**來源連接埠** | *Any*<br>*任意* |
> | **Destination**<br>**目的地** | *192.168.0.0/24* |
> | **Destination port**<br>**目的港** | *Any*<br>*任意* |
> | **Description**<br>**描述** | *Allow LAN Site A to LAN Site B*<br>*允許LAN站點A到LAN站點B* |

Press **Save** and **Apply**.

按**儲存**並**應用**。

Note

筆記

Now both sites have full access to the LAN of the other Site through the Wireguard Tunnel. For additional networks just add more **Allowed IPs** to the Wireguard Endpoints and adjust the firewall rules to allow the traffic.

現在，兩個網站都可以透過 Wireguard 隧道完全存取另一個網站的LAN。對於其他網絡，只需向 Wireguard 端點添加更多 **允許的 IP** 並調整防火牆規則以允許流量。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Virtual Private Networking｜虛擬私人網路](<154 虛擬私人網路.md>)　｜　[下一篇：WireGuard Road Warrior Setup｜WireGuard Road Warrior 設置 ➡](<156 WireGuard Road Warrior 設置.md>)
