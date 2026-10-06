---
title: "Authoritative DNS｜權威DNS"
title_original: "Authoritative DNS"
source: "https://docs.opnsense.org/vendor/deciso/opndns.html"
chapter: ["Business Edition"]
order: 48
lang: "bilingual"
translated_by: "gtx"
captured: "2026-09-26T11:32:04.743Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Central Management｜中央管理](<47 中央管理.md>)　｜　[下一篇：Web Application Firewall｜網路應用防火牆 ➡](<49 網路應用防火牆.md>)

# Authoritative DNS｜權威DNS

> 章節：[Business Edition](<000 目錄.md#c-4>)

## [Authoritative DNS](#id1)｜[權威DNS](#id1)

Index

索引

-   [Authoritative DNS](#authoritative-dns)  
    [權威DNS](#authoritative-dns)
    
    -   [Considerations before deployment](#considerations-before-deployment)  
        [部署前註意事項](#considerations-before-deployment)
        
        -   [DNS role](#dns-role)  
            [DNS角色](#dns-role)
            
        -   [Records and RRsets](#records-and-rrsets)  
            [記錄與RR集](#records-and-rrsets)
            
        -   [Zone types](#zone-types)  
            [區域類型](#zone-types)
            
        -   [High availability](#high-availability)  
            [高可用性](#high-availability)
            
    -   [General settings](#general-settings)  
        [常規設定](#general-settings)
        
    -   [Zone settings](#zone-settings)  
        [區域設定](#zone-settings)
        
    -   [Configuration examples](#configuration-examples)  
        [設定範例](#configuration-examples)
        
        -   [Forward zone](#forward-zone)  
            [前進區](#forward-zone)
            
        -   [Reverse zone](#reverse-zone)  
            [反轉區](#reverse-zone)
            
        -   [Forwarding from Unbound](#forwarding-from-unbound)  
            [來自未綁定的轉發](#forwarding-from-unbound)
            
        -   [Dynamic DNS with KEA DHCP (RFC2136)](#dynamic-dns-with-kea-dhcp-rfc2136)  
            [動態DNS與KEA DHCP(RFC2136)](#dynamic-dns-with-kea-dhcp-rfc2136)
            
        -   [High availability setup](#high-availability-setup)  
            [高可用性設定](#high-availability-setup)
            
            -   [Primary](#primary)  
                [小學](#primary)
                
            -   [Secondary](#secondary)  
                [中學](#secondary)
                
    -   [Good to know](#good-to-know)  
        [很高興知道](#good-to-know)
        
        -   [SOA records](#soa-records)  
            [SOA記錄](#soa-records)
            
        -   [NS records](#ns-records)  
            [NS記錄](#ns-records)
            
        -   [Serial handling](#serial-handling)  
            [串行處理](#serial-handling)
            
        -   [DHCP search domain](#dhcp-search-domain)  
            [DHCP搜尋網域](#dhcp-search-domain)
            
        -   [Firewall rules](#firewall-rules)  
            [防火牆規則](#firewall-rules)
            
        -   [Testing](#testing)  
            [測試](#testing)
            
        -   [Log and diagnostics](#log-and-diagnostics)  
            [日誌與診斷](#log-and-diagnostics)
            

As part of the OPNsense Business Edition, Deciso offers a plugin for advanced DNS infrastructure requirements.

作為 OPNsense 商業版的一部分，Deciso 提供了一個滿足高級 DNS 基礎設施要求的插件。

OPNDNS is based on [PowerDNS Authoritative](https://doc.powerdns.com/authoritative/) and hosts DNS zones on OPNsense. It can manage static internal zones, reverse lookup zones, and dynamic DNS updates from services such as [KEA DHCP](<196 KEA DHCP.md>) using RFC2136.

OPNDNS 基於 [PowerDNS 權威](https://doc.powerdns.com/authoritative/) 並在 OPNsense 上託管 DNS 區域。它可以管理靜態內部區域、反向查找區域以及使用 RFC2136 的 [KEA DHCP](<196 KEA DHCP.md>) 等服務的動態 DNS 更新。

It supports record types that are usually outside the scope of a recursive resolver, such as `MX`, `SRV` and `TXT`.

它支援通常超出遞歸解析器範圍的記錄類型，例如`MX`, `SRV`和`TXT`。

In a common setup, [Unbound DNS](<199 未綁定DNS.md>) remains the recursive resolver for clients and forwards selected internal zones to this service.

在常見設定中，[Unbound DNS](<199 未綁定DNS.md>) 仍然是客戶端的遞歸解析器，並將選定的內部區域轉送到此服務。

## [Considerations before deployment](#id2)｜[部署前註意事項](#id2)

### [DNS role](#id3)｜[DNS角色](#id3)

This service is not a recursive resolver. It only answers for zones configured locally.

此服務不是遞歸解析器。它僅回答本地配置的區域。

It is intended primarily for internal authoritative DNS use cases, such as infrastructure zones, reverse lookup zones and DHCP-driven dynamic updates. It is not meant to replace a dedicated public DNS setup for internet-facing domains.

它主要用於內部權威的DNS用例，例如基礎設施區域、反向查找區域和DHCP驅動的動態更新。它並不意味著取代面向互聯網域的專用公共DNS設定。

It should normally not replace [Unbound DNS](<199 未綁定DNS.md>) as the DNS server for clients. Instead, keep Unbound on port `53` and forward selected internal zones to this service on another port, for example `53053`.

它通常不應取代[Unbound DNS](<199 未綁定DNS.md>)作為客戶端的DNS伺服器。相反，請在連接埠 `53` 上保持 Unbound，並將選定的內部區域轉送到另一個連接埠（例如 `53053`）上的此服務。

Note

筆記

Unbound resolves arbitrary DNS names for clients. This service only answers for zones it is authoritative for.

Unbound 為客戶端解析任意 DNS 名稱。該服務僅回答其權威的區域。

### [Records and RRsets](#id4)｜[記錄與RR集](#id4)

The GUI uses the term **record** for simplicity.

為簡單起見，GUI 使用術語「**記錄**」。

Technically, each record entry represents an RRset. An RRset is the combination of:

從技術上講，每個記錄條目代表一個 RRset。 RRset 是以下各項的組合：

-   one record name  
    一個記錄名稱
    
-   one record type  
    一種記錄類型
    
-   one TTL  
    一TTL
    
-   one or more values  
    一個或多個值
    

For example, two IPv4 addresses for the same host are stored as one `A` RRset with two values:

例如，同一台主機的兩個 IPv4 位址儲存為一個具有兩個值的 `A` RRset：

```
host1.internal 300 IN A 192.168.1.10
host1.internal 300 IN A 192.168.1.11
```

In the GUI, this is entered as one record with `host1` as name, `A` as type, `300` as TTL, and both IP addresses as separate values.

在 GUI 中，這是作為一條記錄輸入的，`host1` 作為名稱，`A` 作為類型，`300` 作為 TTL，並且兩個 IP 地址作為單獨的值。

### [Zone types](#id5)｜[區域類型](#id5)

There are two zone types:

有兩種區域類型：

-   `static` zones contain records managed through the GUI.  
    `static` 區域包含透過GUI 管理的記錄。
    
-   `allowupdate` zones allow RFC2136 updates.  
    `allowupdate` 區域允許 RFC2136 更新。
    

Static zones are intended for manually configured records, such as nameservers, infrastructure hosts, service records and reverse lookup records.

靜態區域適用於手動設定的記錄，例如名稱伺服器、基礎架構主機、服務記錄和反向查找記錄。

Dynamic zones are intended for automatic updates, for example from [KEA DHCP](<196 KEA DHCP.md>).

動態區域用於自動更新，例如來自 [KEA DHCP](<196 KEA DHCP.md>)。

Attention

注意力

Do not create manual records in dynamic zones unless you know exactly why they are needed. These zones are expected to be owned by RFC2136 update clients.

不要在動態區域中建立手動記錄，除非您確切知道為什麼需要它們。這些區域預計由 RFC2136 更新客戶端擁有。

### [High availability](#id6)｜[高可用性](#id6)

A global role controls how the service behaves:

全域角色控制服務的行為方式：

-   `Primary` creates and manages zones and records.  
    `Primary` 建立和管理區域和記錄。
    
-   `Secondary` creates secondary zones and retrieves their contents from the configured peer.  
    `Secondary` 建立輔助區域並從配置的對等方擷取其內容。
    

The primary can allow one configured peer to transfer zones and can notify it when a zone changes.

主節點可以允許一個已配置的對等方傳輸區域，並且可以在區域更改時通知它。

Note

筆記

The HA design is intentionally simple. A single peer is configured globally and used for zone transfers and notifications.

HA 設計故意簡單。單一對等點在全域進行配置並用於區域傳輸和通知。

Using this service as a secondary for public DNS infrastructure is not recommended, even if it is technically possible.

不建議將此服務用作公共DNS基礎設施的輔助服務，即使技術上可行。

## [General settings](#id7)｜[常規設定](#id7)

Most settings are straightforward. Enable the service, choose the role, configure the listen port, and optionally configure the HA peer.

大多數設定都很簡單。啟用服務，選擇角色，配置偵聽端口，並可選擇配置HA對等點。

**General**

**一般**

| **Option**<br>**選項** | **Description**<br>**描述** |
| --- | --- |
| **Enable**<br>**啟用** | Enable the service.<br>啟用該服務。 |
| **Listen Port**<br>**監聽埠** | Port used for DNS queries.<br>用於DNS查詢的埠。 |
| **Role**<br>**角色** | Choose whether this firewall acts as `Primary` or `Secondary`.<br>選擇此防火牆是否充當`Primary`或`Secondary`。 |
| **Peer**<br>**同行** | IP address and port of the peer DNS server. On a primary, this is used for zone transfers and notifications. On a secondary, this is the primary server.<br>IP對端DNS伺服器的位址與連接埠。在主節點上，這用於區域傳輸和通知。在輔助伺服器上，這是主伺服器。 |
| **Disable HA sync**<br>**停用HA同步** | Prevent general settings from being synchronized between HA peers.<br>防止常規設定在HA對等點之間同步。 |

Tip

提示

When Unbound listens on port `53`, configure this service on a different port such as `53053` and forward the relevant zones from Unbound.

當 Unbound 偵聽連接埠 `53` 時，請在不同連接埠（例如 `53053`）上設定此服務，並從 Unbound 轉送相關區域。

**SOA**

| **Option**<br>**選項** | **Description**<br>**描述** |
| --- | --- |
| **Primary nameserver**<br>**主網域伺服器** | Primary nameserver used in the SOA record, for example `ns1.internal`.<br>SOA 記錄中使用的主名稱伺服器，例如 `ns1.internal`。 |
| **Responsible Mailbox**<br>**負責的信箱** | Responsible mailbox encoded as DNS name, for example `hostmaster.internal`.<br>責任信箱編碼為DNS名稱，例如`hostmaster.internal`。 |
| **Refresh**<br>**刷新** | Time in seconds after which a secondary checks the primary for zone updates.<br>輔助節點檢查主節點是否有區域更新的時間（以秒為單位）。 |
| **Retry**<br>**重試** | Time in seconds after which a secondary retries a failed refresh.<br>輔助設備重試失敗刷新之前的時間（以秒為單位）。 |
| **Expire**<br>**過期** | Time in seconds after which a secondary stops serving the zone if the primary cannot be reached.<br>如果無法到達主資料庫，則輔助資料庫將停止為該區域提供服務的時間（以秒為單位）。 |
| **Minimum TTL**<br>**最低TTL** | Minimum TTL used in the SOA record.<br>SOA 記錄中使用的最小TTL。 |

Note

筆記

SOA records are generated automatically. They do not need to be created manually.

SOA 記錄自動產生。它們不需要手動建立。

If these settings are changed, existing zones must be deleted and recreated to receive updated SOA content. The serial is updated automatically on configuration changes and is used by secondary servers to detect updates.

如果變更這些設置，則必須刪除並重新建立現有區域才能接收更新的 SOA 內容。此序號會在配置變更時自動更新，並由輔助伺服器用來偵測更新。

**Log**

**日誌**

| **Option**<br>**選項** | **Description**<br>**描述** |
| --- | --- |
| **Log Level** | Higher values log more details. Use high values only while debugging. Values can be between 1 to 9. |

| **日誌等級** |值越高，記錄的細節越多。僅在調試時使用高值。值可以介於 1 到 9 之間。
| **Log DNS Queries**<br>**記錄DNS查詢** | Log incoming DNS queries. This can generate large amounts of log data.<br>記錄傳入的DNS查詢。這會產生大量日誌資料。 |
| **Log DNS Details**<br>**日誌DNS詳細資料** | Log additional DNS packet details for debugging. This can be noisy.<br>記錄額外的DNS封包詳細資料以進行偵錯。這可能會很吵。 |

## [Zone settings](#id8)｜[區域設定](#id8)

Zones are configured in Services ‣ Authoritative DNS ‣ Zones.

區域在服務‣權威DNS‣區域中配置。

**Zones**

**區域**

| **Option**<br>**選項** | **Description**<br>**描述** |
| --- | --- |
| **Zone Name**<br>**區域名稱** | Name of the zone, for example `internal` or `1.168.192.in-addr.arpa`.<br>區域的名稱，例如 `internal` 或 `1.168.192.in-addr.arpa`。 |
| **Type**<br>**類型** | `static` for GUI-managed zones, `allowupdate` for RFC2136 updates.<br>`static` 適用於 GUI 管理區域，`allowupdate` 適用於 RFC2136 更新。 |
| **Allow Updates From**<br>**允許更新自** | Network allowed to send RFC2136 updates. Only used with `allowupdate` zones.<br>網路允許發送RFC2136更新。僅與`allowupdate`區域一起使用。 |
| **Default TTL**<br>**預設TTL** | Default time-to-live for records in this zone.<br>該區域中記錄的預設生存時間。 |
| **Description**<br>**描述** | Optional description for your reference.<br>可選描述供您參考。 |

**Records**

**記錄**

| **Option**<br>**選項** | **Description**<br>**描述** |
| --- | --- |
| **Zone**<br>**專區** | Zone this record belongs to.<br>該記錄所屬的區域。 |
| **Record Name**<br>**記錄名稱** | Record name. All names must be fully qualified in the zone.<br>記錄姓名。該區域中的所有名稱都必須完全限定。 |
| **Type**<br>**類型** | DNS record type, for example `A`, `AAAA`, `NS`, `MX`, `PTR` or `TXT`.<br>DNS 記錄類型，例如`A`, `AAAA`, `NS`, `MX`, `PTR` 或`TXT`。 |
| **TTL** | Optional record-specific TTL. If empty, the zone default is used.<br>可選的特定記錄TTL。如果為空，則使用區域預設值。 |
| **Values**<br>**價值觀** | One or more record values. Use one value per line.<br>一個或多個記錄值。每行使用一個值。 |
| **Description**<br>**描述** | Optional description for your reference.<br>可選描述供您參考。 |

## [Configuration examples](#id9)｜[設定範例](#id9)

The following examples show a typical internal DNS setup with one forward zone and one reverse zone.

以下範例顯示了典型的內部DNS 設置，具有一個前進區域和一個反向區域。

Unbound remains the DNS resolver for clients and forwards the local zones to this service.

Unbound 仍然是客戶端的DNS 解析器，並將本地區域轉送到此服務。

The examples use:

範例使用：

-   Forward zone: `internal`  
    前鋒區：`internal`
    
-   Reverse zone for `192.168.1.0/24`: `1.168.192.in-addr.arpa`  
    `192.168.1.0/24`: `1.168.192.in-addr.arpa` 反向區域
    
-   Nameservers: `ns1.internal` and `ns2.internal`  
    名稱伺服器：`ns1.internal` 和 `ns2.internal`
    
-   Listen port: `53053`  
    監聽埠：`53053`
    

### [Forward zone](#id10)｜[前進區](#id10)

This example creates a static internal zone called `internal`.

此範例建立一個名為 `internal` 的靜態內部區域。

The zone contains two nameservers:

此區域包含兩個名稱伺服器：

-   `ns1.internal` with IPv4 address `192.168.1.2`  
    `ns1.internal` 具有 IPv4 位址 `192.168.1.2`
    
-   `ns2.internal` with IPv4 address `192.168.1.3`  
    `ns2.internal` 具有 IPv4 位址 `192.168.1.3`
    

Go to Services ‣ Authoritative DNS ‣ Settings ‣ General and set:

進入服務‣權威DNS‣設定‣常規並設定：

| Option<br>選項 | Value<br>價值 |
| --- | --- |
| **Enable**<br>**啟用** | `X` |
| **Listen Port**<br>**監聽埠** | `53053` |
| **Role**<br>**角色** | `Primary` |

Press **Apply**.

按**應用**。

Go to Services ‣ Authoritative DNS ‣ Settings ‣ SOA and set:

進入服務‣權威DNS‣設定‣SOA並設定：

| Option<br>選項 | Value<br>價值 |
| --- | --- |
| **Primary nameserver**<br>**主網域伺服器** | `ns1.internal` |
| **Responsible Mailbox**<br>**負責的信箱** | `hostmaster.internal` |
| **Refresh**<br>**刷新** | `10800` |
| **Retry**<br>**重試** | `3600` |
| **Expire**<br>**過期** | `604800` |
| **Minimum TTL**<br>**最低TTL** | `3600` |

Press **Apply**.

按**應用**。

Go to Services ‣ Authoritative DNS ‣ Zones and add:

轉到服務 ‣ 權威 DNS ‣ 區域並新增：

| Option<br>選項 | Value<br>價值 |
| --- | --- |
| **Name**<br>**姓名** | `internal` |
| **Type**<br>**類型** | `static` |

Press **Save**.

按**儲存**。

Add the nameserver records for the new internal zone. If you do not use HA, you can skip the second nameserver value.

新增內部區域的名稱伺服器記錄。如果您不使用HA，則可以跳過第二個名稱伺服器值。

| Option<br>選項 | Value<br>價值 |
| --- | --- |
| **Zone**<br>**專區** | `internal` |
| **Name**<br>**姓名** | `internal` |
| **Type**<br>**類型** | `NS` |
| **TTL** | `300` |
| **Values**<br>**價值觀** | `ns1.internal`<br>`ns2.internal` |

Press **Save**.

按**儲存**。

Create the A records for the nameservers.

為名稱伺服器建立 A 記錄。

**ns1.internal**

**ns1.內部**

| Option<br>選項 | Value<br>價值 |
| --- | --- |
| **Zone**<br>**專區** | `internal` |
| **Name**<br>**姓名** | `ns1.internal` |
| **Type**<br>**類型** | `A` |
| **TTL** | `300` |
| **Values**<br>**價值觀** | `192.168.1.2` |

Press **Save**.

按**儲存**。

**ns2.internal**

**ns2.內部**

| Option<br>選項 | Value<br>價值 |
| --- | --- |
| **Zone**<br>**專區** | `internal` |
| **Name**<br>**姓名** | `ns2.internal` |
| **Type**<br>**類型** | `A` |
| **TTL** | `300` |
| **Values**<br>**價值觀** | `192.168.1.3` |

Press **Save** and **Apply**.

按**儲存**並**應用**。

The zone now contains answers for `internal` and both nameserver host records.

該區域現在包含 `internal` 的答案以及兩個名稱伺服器主機記錄。

Tip

提示

Test the result directly:

直接測試結果：

```
drill -p 53053 @127.0.0.1 internal NS
drill -p 53053 @127.0.0.1 ns1.internal A
drill -p 53053 @127.0.0.1 ns2.internal A
```

### [Reverse zone](#id11)｜[反向區](#id11)

A forward zone maps names to IP addresses. A reverse zone maps IP addresses back to names.

轉送區域將名稱對應到IP位址。反向區域將 IP 位址對應回名稱。

Example:

範例：

-   Forward zone: `internal`  
    前鋒區：`internal`
    
-   Reverse zone for `192.168.1.0/24`: `1.168.192.in-addr.arpa`  
    `192.168.1.0/24`: `1.168.192.in-addr.arpa` 反向區域
    

Go to Services ‣ Authoritative DNS ‣ Zones and add:

轉到服務 ‣ 權威 DNS ‣ 區域並新增：

| Option<br>選項 | Value<br>價值 |
| --- | --- |
| **Name**<br>**姓名** | `1.168.192.in-addr.arpa` |
| **Type**<br>**類型** | `static` |

Press **Save**.

按**儲存**。

Here we reuse the nameservers of our static forward zone. If you do not use HA, you can skip the second nameserver value.

在這裡，我們重複使用靜態轉送區域的名稱伺服器。如果您不使用HA，則可以跳過第二個名稱伺服器值。

| Option<br>選項 | Value<br>價值 |
| --- | --- |
| **Zone**<br>**專區** | `1.168.192.in-addr.arpa` |
| **Name**<br>**姓名** | `1.168.192.in-addr.arpa` |
| **Type**<br>**類型** | `NS` |
| **TTL** | `300` |
| **Values**<br>**價值觀** | `ns1.internal`<br>`ns2.internal` |

Press **Save**.

按**儲存**。

Create the reverse records (PTR) for the nameservers.

為名稱伺服器建立反向記錄 (PTR)。

**ns1 reverse record**

**ns1反向記錄**

| Option<br>選項 | Value<br>價值 |
| --- | --- |
| **Zone**<br>**專區** | `1.168.192.in-addr.arpa` |
| **Name**<br>**姓名** | `2.1.168.192.in-addr.arpa` |
| **Type**<br>**類型** | `PTR` |
| **TTL** | `300` |
| **Values**<br>**價值觀** | `ns1.internal` |

Press **Save**.

按**儲存**。

**ns2 reverse record**

**ns2反向記錄**

If you do not use HA, you can skip this record.

如果您不使用HA，則可以跳過此記錄。

| Option<br>選項 | Value<br>價值 |
| --- | --- |
| **Zone**<br>**專區** | `1.168.192.in-addr.arpa` |
| **Name**<br>**姓名** | `3.1.168.192.in-addr.arpa` |
| **Type**<br>**類型** | `PTR` |
| **TTL** | `300` |
| **Values**<br>**價值觀** | `ns2.internal` |

Press **Save** and **Apply**.

按**儲存**並**應用**。

Tip

提示

Test the reverse lookup directly:

直接測試反向查找：

```
drill -p 53053 @127.0.0.1 -x 192.168.1.2
drill -p 53053 @127.0.0.1 -x 192.168.1.3
```

### [Forwarding from Unbound](#id12)｜[來自未綁定的轉發](#id12)

Clients should normally query [Unbound DNS](<199 未綁定DNS.md>) on port `53`. Unbound can then forward only the locally hosted zones.

客戶端通常應在連接埠 `53` 上查詢 [Unbound DNS](<199 未綁定DNS.md>)。然後，Unbound 只能轉送本機託管區域。

This keeps the client setup simple while separating recursive and authoritative DNS duties.

這使得客戶端設定變得簡單，同時分離了遞歸和權威 DNS 職責。

Go to Services ‣ Unbound DNS ‣ General and set:

進入服務‣解除綁定DNS‣常規並設定：

| Option<br>選項 | Value<br>價值 |
| --- | --- |
| **Enable**<br>**啟用** | `X` |
| **Listen Port**<br>**監聽埠** | `53` |

Press **Apply**.

按**應用**。

Go to Services ‣ Unbound DNS ‣ Query Forwarding and add forwarding entries for the zones.

進入 Services ‣ Unbound DNS ‣ Query Forwarding 並新增區域的轉送條目。

**Forward zone**

**前進區**

| Option<br>選項 | Value<br>價值 |
| --- | --- |
| **Domain**<br>**域名** | `internal` |
| **Server IP**<br>**伺服器IP** | `127.0.0.1` |
| **Server Port**<br>**伺服器連接埠** | `53053` |

Press **Save** and add the next entry.

按 **儲存** 並新增下一個項目。

**Reverse zone**

**反向區域**

| Option<br>選項 | Value<br>價值 |
| --- | --- |
| **Domain**<br>**網域** | `1.168.192.in-addr.arpa` |
| **Server IP**<br>**伺服器IP** | `127.0.0.1` |
| **Server Port**<br>**伺服器連接埠** | `53053` |

Press **Save** and **Apply**.

按**儲存**並**應用**。

When a client queries Unbound for `ns1.internal`, the request is forwarded to `127.0.0.1:53053`. The local service answers for the zone and Unbound returns the response to the client.

當客戶端查詢Unbound `ns1.internal`時，請求將轉送至`127.0.0.1:53053`。本地服務對該區域進行應答，Unbound 將回應傳回給客戶端。

Note

筆記

Forwarding only applies to the configured domains. Internet DNS resolution continues to be handled by Unbound normally.

轉送僅適用於配置的網域。互聯網DNS解析繼續由Unbound正常處理。

### [Dynamic DNS with KEA DHCP (RFC2136)](#id13)｜[動態DNS與KEA DHCP(RFC2136)](#id13)

[KEA DHCP](<196 KEA DHCP.md>) can register client FQDNs through dynamic DNS updates using RFC2136.

[KEA DHCP](<196 KEA DHCP.md>) 可以使用 RFC2136 透過動態 DNS 更新來註冊客戶端 FQDN。

This example registers DHCP clients in forward and reverse zones.

此範例在正向和反向區域中註冊 DHCP 用戶端。

The example uses:

此範例使用：

-   Parent zone: `internal`  
    父區：`internal`
    
-   Forward zone: `dhcp.internal`  
    前鋒區：`dhcp.internal`
    
-   Reverse zone: `1.168.192.in-addr.arpa`  
    反向區：`1.168.192.in-addr.arpa`
    
-   Nameservers: `ns1.internal` and `ns2.internal`  
    名稱伺服器：`ns1.internal` 和 `ns2.internal`
    
-   DHCP subnet: `192.168.1.0/24`  
    DHCP子網：`192.168.1.0/24`
    
-   DHCP pool: `192.168.1.100 - 192.168.1.199`  
    DHCP池：`192.168.1.100 - 192.168.1.199`
    
-   DNS server: `127.0.0.1`  
    DNS伺服器：`127.0.0.1`
    
-   DNS server port: `53053`  
    DNS 伺服器連接埠：`53053`
    

Go to Services ‣ Authoritative DNS ‣ Zones and add:

轉到服務 ‣ 權威 DNS ‣ 區域並新增：

| Option<br>選項 | Value<br>價值 |
| --- | --- |
| **Name**<br>**姓名** | `dhcp.internal` |
| **Type**<br>**類型** | `allowupdate` |
| **Allow Updates From**<br>**允許更新自** | `127.0.0.1/32` `192.168.1.3/32` |

Press **Save**.

按**儲存**。

Note

筆記

The IP address `192.168.1.3` represents the secondary DNS server in an HA setup. You can omit this address when HA is not used.

IP 位址 `192.168.1.3` 代表 HA 設定中的輔助 DNS 伺服器。當不使用HA時，可以省略該位址。

By default, PowerDNS forwards RFC2136 updates received by a secondary zone to the configured primary server. Allowing the secondary DNS server here lets the primary accept those forwarded updates.

預設情況下，PowerDNS 將輔助區域收到的RFC2136 更新轉送到已設定的主伺服器。此處允許輔助 DNS 伺服器可以讓主伺服器接受那些轉送的更新。

This is useful when Kea is active on the backup OPNsense node. Kea sends its updates to the local secondary server, which then forwards them to the primary server where the update is applied.

當 Kea 在備份 OPNsense 節點上處於活動狀態時，這非常有用。 Kea 將其更新傳送到本地輔助伺服器，然後本地輔助伺服器將其轉送到應用程式更新的主伺服器。

Then add an NS record for the zone. If you do not use HA, you can skip the second nameserver value.

然後為該區域新增 NS 記錄。如果您不使用HA，則可以跳過第二個名稱伺服器值。

| Option<br>選項 | Value<br>價值 |
| --- | --- |
| **Zone**<br>**專區** | `dhcp.internal` |
| **Name**<br>**姓名** | `dhcp.internal` |
| **Type**<br>**類型** | `NS` |
| **TTL** | `300` |
| **Values**<br>**價值觀** | `ns1.internal`<br>`ns2.internal` |

Press **Save**.

按**儲存**。

Note

筆記

This example reuses the nameservers from the already configured `internal` zone.

此範例重複使用已設定的 `internal` 區域中的名稱伺服器。

The nameserver host records, such as `ns1.internal.` and `ns2.internal.`, are defined in the parent zone. The dynamic `dhcp.internal` zone only references them with its own NS record.

名稱伺服器主機記錄（例如 `ns1.internal.` 和 `ns2.internal.`）在父區域中定義。動態`dhcp.internal`區域僅使用其自己的NS記錄來引用它們。

Go to Services ‣ Authoritative DNS ‣ Zones and add a new reverse zone. If you already created the reverse zone earlier just change it accordingly.

前往 Services ‣ Authoritative DNS ‣ Zones 並新增新的反向區域。如果您之前已經建立了反向區域，只需相應地更改它即可。

| Option<br>選項 | Value<br>價值 |
| --- | --- |
| **Name**<br>**姓名** | `1.168.192.in-addr.arpa` |
| **Type**<br>**類型** | `allowupdate` |
| **Allow Updates From**<br>**允許更新自** | `127.0.0.1/32` `192.168.1.3/32` |

Press **Save**.

按**儲存**。

Then add an NS record for the reverse zone if they do not already exist. If you do not use HA, you can skip the second nameserver value.

然後新增反向區域的 NS 記錄（如果它們尚不存在）。如果您不使用HA，則可以跳過第二個名稱伺服器值。

| Option<br>選項 | Value<br>價值 |
| --- | --- |
| **Zone**<br>**專區** | `1.168.192.in-addr.arpa` |
| **Name**<br>**姓名** | `1.168.192.in-addr.arpa` |
| **Type**<br>**類型** | `NS` |
| **TTL** | `300` |
| **Values**<br>**價值觀** | `ns1.internal`<br>`ns2.internal` |

Press **Save** and **Apply**.

按**儲存**並**應用**。

Note

筆記

The reverse zone also uses the same nameservers.

反向區域也使用相同的名稱伺服器。

The PTR records themselves are created dynamically by KEA through RFC2136 updates. The NS record only defines which nameservers are responsible for the reverse zone.

PTR 記錄本身是由KEA 透過RFC2136 更新動態建立的。 NS 記錄僅定義哪些名稱伺服器負責反向區域。

Attention

注意力

Do not forget to add forwards from Unbound for these zones.

不要忘記為這些區域添加來自 Unbound 的轉發。

Go to Services ‣ KEA DHCP ‣ KEA DHCPv4, select a subnet and enable advanced mode.

進入服務‣KEA DHCP‣KEADHCPv4，選擇子網路並啟用進階模式。

| **Option**<br>**選項** | **Value**<br>**價值** |
| --- | --- |
| Subnet<br>子網 | `192.168.1.0/24` |
| Pools<br>泳池 | `192.168.1.100 - 192.168.1.199` |
| **DHCP option data**<br>**DHCP 選項資料** |  |
| Auto collect option data<br>自動收集選項資料 | Unchecked<br>未選取 |
| Routers<br>路由器 | `192.168.1.1` |
| DNS servers<br>DNS 伺服器 | `192.168.1.1` |
| Domain name<br>網域 | `dhcp.internal` |
| **Dynamic DNS**<br>**動態DNS** |  |
| DNS forward zone<br>DNS 前進區 | `dhcp.internal.` |
| DNS reverse zone<br>DNS 反向區 | `1.168.192.in-addr.arpa.` |
| DNS qualifying suffix<br>DNS 資格字尾 | `dhcp.internal.` |
| DNS server<br>DNS伺服器 | `127.0.0.1` |
| DNS server port<br>DNS 伺服器連接埠 | `53053` |
| Override no update<br>覆蓋不更新 | `X` |
| Override client update<br>覆蓋客戶端更新 | `X` |
| Update on renew<br>更新更新 | `X` |
| Conflict resolution mode<br>衝突解決模式 | `no-check-with-dhcid` |

Attention

注意力

In KEA the zones and qualifying suffix must end with a trailing dot.

在 KEA 中，區域和資格後綴必須以尾隨點結尾。

If certain hosts should get registered with custom hostnames, create a host reservation for them.

如果某些主機應使用自訂主機名稱註冊，請為它們建立主機預留。

Go to Services ‣ KEA DHCP ‣ DDNS Agent and set:

前往服務 ‣ KEA DHCP ‣ DDNS 代理並設定：

| **Option**<br>**選項** | **Value**<br>**價值** |
| --- | --- |
| Enabled<br>已啟用 | `X` |
| Bind address<br>綁定位址 | `127.0.0.1` |
| Bind port<br>綁定埠 | `53001` |

Press **Apply**.

按**應用**。

Note

筆記

This example does not use a TSIG key. The communication is local and `Allow Updates From` restricts which clients can update the zone.

此範例不使用 TSIG 金鑰。通訊是本地的，`Allow Updates From` 限制哪些客戶端可以更新區域。

For a general DHCP setup, see [KEA DHCP](<196 KEA DHCP.md>).

有關常規 DHCP 設置，請參閱 [KEA DHCP](<196 KEA DHCP.md>)。

### [High availability setup](#id14)｜[高可用性設定](#id14)

This example uses two OPNsense firewalls:

此範例使用兩個 OPNsense 防火牆：

-   Primary: `192.168.1.2`  
    主要：`192.168.1.2`
    
-   Secondary: `192.168.1.3`  
    中學：`192.168.1.3`
    

The primary manages the zones and allows the secondary to transfer them.

主節點管理區域並允許輔助節點傳輸它們。

#### [Primary](#id15)｜[小學](#id15)

Go to Services ‣ Authoritative DNS ‣ Settings ‣ General on the primary and set:

轉到主伺服器上的 Services ‣ Authoritative DNS ‣ Settings ‣ General 並設定：

| Option<br>選項 | Value<br>價值 |
| --- | --- |
| **Enable**<br>**啟用** | `X` |
| **Listen Port**<br>**監聽埠** | `53053` |
| **Role**<br>**角色** | `Primary` |
| **Peer**<br>**同行** | `192.168.1.3:53053` |
| **Disable HA sync**<br>**禁用HA同步** | `X` |

Press **Apply**.

按**應用**。

Create static and dynamic zones on the primary as usual. It manages the records and increases the zone serial on each **Apply** or when an RFC2136 client updates a record.

照常在主伺服器上建立靜態和動態區域。它管理記錄並在每次 **Apply** 或當 RFC2136 用戶端更新記錄時增加區域序列。

#### [Secondary](#id16)｜[中學](#id16)

Go to Services ‣ Authoritative DNS ‣ Settings ‣ General on the secondary and set:

前往輔助伺服器上的 Services ‣ Authoritative DNS ‣ Settings ‣ General 並設定：

| Option<br>選項 | Value<br>價值 |
| --- | --- |
| **Enable**<br>**啟用** | `X` |
| **Listen Port**<br>**監聽埠** | `53053` |
| **Role**<br>**角色** | `Secondary` |
| **Peer**<br>**同行** | `192.168.1.2:53053` |
| **Disable HA sync**<br>**停用 HA 同步** | `X` |

Press **Apply**.

按**應用**。

For a secondary server, records are not managed locally. The zone contents are received from the primary through zone transfer.

對於輔助伺服器，記錄不在本機管理。區域內容是透過區域傳輸從主設備接收的。

Add `Authoritative DNS` to System ‣ High Availability ‣ Settings ‣ Services to synchronize. The zones on the secondary are created when HA synchronization is triggered in System ‣ High Availability ‣ Status.

將`Authoritative DNS`加入系統‣高可用性‣設定‣服務中進行同步。當在 System ‣ High Availability ‣ Status 中觸發HA 同步時，會建立輔助節點上的區域。

After the first sync, the secondary performs an AXFR zone transfer. Further changes are announced through NOTIFY messages.

第一次同步後，輔助設備執行AXFR區域傳輸。進一步的更改將透過NOTIFY訊息宣布。

It is recommended to transfer zones over the same link used for HA sync. TCP must be allowed between both nodes on the configured listen port.

建議透過用於 HA 同步的相同連結傳輸區域。 TCP 必須允許在配置的偵聽連接埠上的兩個節點之間使用。

Attention

注意力

The secondary is read-only. Records sync automatically via standard DNS zone transfers, you do not need any cron jobs for the HA sync.

輔助是唯讀的。透過標準 DNS 區域傳輸自動記錄同步，您不需要任何 cron 作業來進行 HA 同步。

RFC2136 updates must be sent to the primary. During failover, the secondary continues to serve the latest transferred zone state.

RFC2136 更新必須傳送到主伺服器。在故障轉移期間，輔助節點繼續提供最新傳輸的區域狀態。

## [Good to know](#id17)｜[很高興知道](#id17)

### [SOA records](#id18)｜[SOA記錄](#id18)

An SOA record defines basic authority and timing information for a zone. It contains the primary nameserver, responsible mailbox, zone serial and refresh timers used by secondary servers.

SOA 記錄定義區域的基本權限和計時資訊。它包含主名稱伺服器、負責的郵箱、區域序列和輔助伺服器使用的刷新計時器。

SOA records are generated automatically from the SOA settings.

SOA 記錄是根據SOA 設定自動產生的。

They cannot be created manually as records in the GUI. To regenerate SOA content, delete and recreate the zone.

它們無法手動建立為GUI 中的記錄。若要重新產生 SOA 內容，請刪除並重新建立該區域。

### [NS records](#id19)｜[NS記錄](#id19)

NS records define which nameservers are responsible for a zone.

NS 記錄定義哪些名稱伺服器負責一個區域。

Configure NS records explicitly for every zone.

為每個區域明確配置NS記錄。

For a zone named `internal`, a simple setup could use:

對於名為 `internal` 的區域，可以使用以下簡單設定：

```
internal 300 IN NS ns1.internal
internal 300 IN NS ns2.internal
```

Additional zones can use the same nameservers.

其他區域可以使用相同的名稱伺服器。

Nameservers should also have matching address records. For reverse lookups, create corresponding PTR records as well.

名稱伺服器也應該有匹配的位址記錄。對於反向查找，也建立對應的PTR記錄。

### [Serial handling](#id20)｜[串行處理](#id20)

When static zone content changes, the zone serial is increased so that secondary servers can detect updates.

當靜態區域內容發生變更時，區域序號會增加，以便輔助伺服器可以偵測到更新。

Secondary systems should not manage records directly.

輔助系統不應直接管理記錄。

### [DHCP search domain](#id21)｜[DHCP搜尋網域名稱](#id21)

Clients can resolve short hostnames when DHCP provides a search domain.

當DHCP提供搜尋域時，客戶端可以解析短主機名稱。

For example, if [KEA DHCP](<196 KEA DHCP.md>) sends `dhcp.internal` as the domain name, a client may resolve `host1` as `host1.dhcp.internal`.

例如，如果 [KEA DHCP](<196 KEA DHCP.md>) 發送 `dhcp.internal` 作為域名，則客戶端可以將 `host1` 解析為 `host1.dhcp.internal`。

Note

筆記

Short name resolution depends on the client resolver behavior and the DHCP options it receives.

短名稱解析取決於客戶端解析器行為及其接收的 DHCP 選項。

DNS itself still stores and answers for fully qualified names. The search domain is only applied by the client.

DNS 本身仍然儲存和回答完全限定名稱。搜尋域僅由客戶端套用。

### [Firewall rules](#id22)｜[防火牆規則](#id22)

If clients or peers query the service directly, allow TCP and UDP traffic to the configured listen port.

如果用戶端或對等方直接查詢服務，請允許 TCP 和 UDP 流量流向配置的偵聽連接埠。

For zone transfers, TCP must be allowed between primary and secondary.

對於區域傳輸，必須允許在主要和次要之間進行TCP。

Tip

提示

DNS queries commonly use UDP. Zone transfers require TCP.

DNS 查詢通常使用UDP。區域轉移需要TCP。

### [Testing](#id23)｜[測試](#id23)

Test direct queries before configuring Unbound forwarding.

在配置 Unbound 轉送之前測試直接查詢。

```
drill -p 53053 @127.0.0.1 internal SOA
drill -p 53053 @127.0.0.1 internal NS
drill -p 53053 @127.0.0.1 ns1.internal A
drill -p 53053 @127.0.0.1 -x 192.168.1.2
```

If direct queries work but client queries fail, check the Unbound forwarding configuration first.

如果直接查詢有效，但用戶端查詢失敗，請先檢查未綁定轉送配置。

### [Log and diagnostics](#id24)｜[日誌與診斷](#id24)

If queries do not return the expected result, check:

如果查詢未傳回預期結果，請檢查：

-   service status  
    服務狀態
    
-   listen port  
    監聽埠
    
-   Unbound forwarding entries  
    未綁定轉送項
    
-   firewall rules  
    防火牆規則
    
-   zone existence  
    區域存在
    
-   expected records  
    預期記錄
    
-   relative record names  
    相關記錄名稱
    
-   trailing dots in record values where required  
    如果需要，請記錄值中的尾隨點
    

Attention

注意力

A query for `host.internal` only reaches the local zone when Unbound has a forwarding entry for `internal`.

只有當 Unbound 具有 `internal` 的轉發表項時，`host.internal` 的查詢才會到達本地區域。

Without forwarding, Unbound tries to resolve the name normally and does not automatically know about the locally hosted zone.

如果沒有轉發，Unbound 會嘗試正常解析名稱，並且不會自動了解本機託管區域。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Central Management｜中央管理](<47 中央管理.md>)　｜　[下一篇：Web Application Firewall｜網路應用防火牆 ➡](<49 網路應用防火牆.md>)
