---
title: "Captive portal & GuestNET｜強制入口網站和 GuestNET"
title_original: "Captive portal & GuestNET"
source: "https://docs.opnsense.org/manual/captiveportal.html"
chapter: ["Services","Captive portal & GuestNET"]
order: 200
lang: "bilingual"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:33:22.132Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Unbound DNS｜未綁定DNS](<199 未綁定DNS.md>)　｜　[下一篇：Setup a Guest Network｜設定訪客網絡 ➡](<201 設定訪客網絡.md>)

# Captive portal & GuestNET｜強制入口網站和 GuestNET

> 章節：[Services](<000 目錄.md#c-40>) › [Captive portal & GuestNET](<000 目錄.md#c-41>)

A **Captive Portal** allows you to force authentication, or redirection to a click through page for network access. This is commonly used on hotspot networks, but is also widely used in corporate networks for an additional layer of security on wireless or Internet access.

**強制入口網站**允許您強制進行身份驗證，或將使用者重新導向至點擊跳轉頁面以存取網路。這通常用於熱點網絡，但也廣泛用於企業網絡，為無線或互聯網訪問增加一層額外的安全性。

![../_images/hotspot_login.png](<../images/a3842fa5-hotspot_login.png>)

## Overview and terminology｜概述和術語

### Typical Applications｜典型應用

-   Guest Network  
    賓客網路
    
-   Hotel & Camping Wi-Fi Access  
    飯店和露營地無線網路接入
    
-   Bring Your Own Device (BYOD)  
    自備設備（ BYOD ）
    

### Template Management｜範本管理

OPNsense’s unique template manager makes setting up your own login page an easy task. At the same time it offers additional functionalities, such as:

OPNsense 獨特的範本管理器讓您輕鬆設定自訂登入頁面。同時，它還提供其他功能，例如：

-   URL redirection  
    URL重定向
    
-   Option for your own Pop-up  
    您可以選擇自訂彈出視窗
    
-   Custom Splash page  
    自訂啟動頁面
    

![../_images/captiveportal_template_folder.png](<../images/a8048f70-captiveportal_template_folder.png>)

### Zone Management｜區域管理

Different zones can be setup on each interface or multiple interfaces can share one zone setup. Each Zone can use a different Captive Portal Template or share it with another zone.

每個介面可以設定不同的區域，也可以多個介面共用一個區域設定。每個區域可以使用不同的強制門戶模板，也可以與其他區域共用同一個模板。

### Authentication｜驗證

Secure authentication via HTTPS or splash-only portal with URL redirection to a given page Different sources can be used to authenticate a user in a zone:

透過HTTPS或僅顯示頁面的入口網站進行安全身份驗證，並透過URL重定向到指定頁面。可以使用不同的來源對區域中的使用者進行身份驗證：

-   LDAP \[Microsoft Active Directory\]LDAP [Microsoft Active Directory]
    
-   Radius, including accounting updates  
    Radius，包括會計更新
    
-   Local user manager  
    本地用戶管理員
    
-   Vouchers / Tickets  
    代金券/門票
    
-   No authentication (Splash Screen Only)  
    無需身份驗證（僅啟動畫面）
    
-   Multiple (a combination of above)  
    多種（以上幾種的組合）
    

### Voucher Manager｜優惠券管理器

OPNsense’s Captive Portal has an easy voucher creation system that exports the vouchers to a csv file for use with your favorite application. The export allows you to print vouchers by merging them with your Microsoft Word or LibreOffice template and create a good looking handout with your logo and company style.

OPNsense 的 Captive Portal 擁有方便的憑證建立系統，可將憑證匯出為 CSV 文件，方便您在常用應用程式中使用。匯出後，您可以將憑證與 Microsoft Word 或 LibreOffice 範本合併，輕鬆列印，並製作帶有公司徽標和風格的精美宣傳單。

### Timeouts & Welcome Back｜暫停和歡迎回來

Connection can be terminated after the user has been idle for a certain amount of time (idle timeout) and/or force a disconnect when a number of minutes have passed even if the user is still active (hard timeout). In case a user reconnects within the idle timeout and/or a hard timeout, no login is required and the user can resume its active session.

用戶閒置一段時間後連線將終止（空閒逾時），或即使使用者仍處於活動狀態，經過數分鐘後也會被強制斷開連線（硬逾時）。如果使用者在空閒逾時或硬逾時期限內重新連接，則無需登錄，使用者可以恢復其活動會話。

### Bandwidth Management｜頻寬管理

The Built-in traffic shaper can be utilized to:

內建的流量整形器可用於：

-   Share bandwidth evenly  
    平均分配頻寬
    
-   Give priority to protocols port numbers and/or IP addresses  
    優先考慮協定連接埠號碼和/或IP位址
    

See also: [Traffic Shaping](<138 流量整形.md>)

另請參閱：[流量整形](<138 流量整形.md>)

### Portal bypass｜門戶繞行

MAC addresses and IP addresses/network ranges can be white listed to bypass the portal.

MAC位址和IP位址/網路範圍可以列入白名單以繞過入口網站。

### Platform Integration｜平台集成

Through the integrated REST API the captive portal application can be integrated with other services. See: [Use the API](<370 使用API.md>)

透過整合的REST API可以將強制入口網站應用程式與其他服務整合。參見：[使用API](<370 使用API.md>)

### IPv6 support｜IPv6 支援

The OPNsense Captive Portal fully supports IPv6-only and dual-stack networks. To facilitate this, the \[Roaming\] option is available and set by default in each zone. The IPv6 protocol commonly uses multiple IPv6 addresses on the same network interface of a client. These can be Link-local addressess, GUAs, ULAs, temporary/ privacy addresses or stable addresses.

OPNsense 強制門戶完全支援純 IPv6 網路和雙棧網路。為此，每個區域都預設啟用“漫遊”選項。 IPv6 協定通常會在客戶端的相同網路介面上使用多個 IPv6 位址。這些位址可以是連結本地地址、通用地址協定 (GUA)、統一地址協定 (ULA)、臨時/隱私地址或穩定地址。

Roaming allows the portal to register any IP alias a client is using, including IPv4 addresses. Once a client is connected, these IP addresses are collected in the background and are granted access.

漫遊功能允許入口網站註冊客戶端使用的任何IP別名，包括IPv4位址。客戶端連線後，這些IP位址會在背景收集並授予存取權限。

Furthermore, the following criteria must be met for IPv6 to fully function:

此外，IPv6 要完全發揮作用，還必須滿足以下條件：

-   Hostwatch (Interfaces ‣ Neighbours ‣ Automatic Discovery) must be enabled for the collection of IPv6 addresses to function.  
    若要讓 IPv6 位址收集功能正常運作，必須啟用 Hostwatch（介面 ‣ 鄰居 ‣ 自動發現）。
    
-   You must set a \[Hostname\] in the zone configuration and make sure a DNS record exists for this hostname pointing to the correct IPv6 address. If you’re using Unbound, DNS records for the configured interfaces can be synthesized with the \[DNS64\] option in Services ‣ Unbound DNS ‣ General.  
    您必須在區域設定中設定 [主機名稱]，並確保存在指向正確 IPv6 位址的DNS記錄來表示該主機名稱。如果您使用的是 Unbound，則可以使用「服務」‣「Unbound」 DNS 「常規」中的 [ DNS64 ] 選項來合成已設定介面的DNS記錄。
    

Note

筆記

The background process collecting these IP addresses does this in a fixed interval. There may be a slight delay before all addresses are collected and granted access.

後台進程會以固定的時間間隔收集這些IP位址。收集完所有地址並授予存取權限之前可能會有輕微的延遲。

### Modern Portal support｜現代門戶支持

OPNsense implements the Captive Portal by redirecting all HTTP traffic to a local web server before authentication, hinting to the device that it is behind a portal. However, [RFC 8910](https://www.rfc-editor.org/rfc/rfc8910) introduces a new standardized method for networks to inform clients about the presence of a portal using DHCP. Furthermore, [RFC 8908](https://www.rfc-editor.org/rfc/rfc8908) describes an API standard implemented by the webserver pointed to by DHCP, where the client can fetch the current portal status. Apple has published a [document](https://developer.apple.com/news/?id=q78sq5rv) going into more details.

OPNsense 透過將所有HTTP流量重新導向到本機 Web 伺服器來實現強制門戶，然後再進行身份驗證，從而提示裝置它位於門戶之後。然而，[RFC 8910](https://www.rfc-editor.org/rfc/rfc8910)引進了一種新的標準化方法，使網路能夠使用DHCP通知客戶端入口網站的存在。此外，[RFC 8908](https://www.rfc-editor.org/rfc/rfc8908)描述了由DHCP指向的 Web 伺服器實現的API標準，客戶端可以從中取得目前的入口網站狀態。蘋果公司發布了一份 [文檔](https://developer.apple.com/news/?id=q78sq5rv) ，其中提供了更多詳細資訊。

Modern clients (especially iOS) moving towards this standardized API may experience redirection issues when connecting to a network only supporting forced redirection, which is often solved by utilizing this new standard instead.

現代用戶端（尤其是 iOS）向此標準化的API過渡時，在連接到僅支援強制重定向的網路時可能會遇到重定向問題，而使用此新標準通常可以解決此問題。

To configure this, a few steps are required:

要進行此配置，需要以下步驟：

-   You must install a valid, publicly trusted certificate on the Captive Portal zone. For example, you can use ACME client to automate this process. Doing so is best practice regardless of redirection method.  
    您必須在強制門戶區域安裝有效的、受公眾信任的憑證。例如，您可以使用ACME客戶端來自動執行此程序。無論採用何種重定向方法，這樣做都是最佳實踐。
    
-   The DHCPv4 server running in your Captive Portal zone must present option 114, of which the value must be set to the OPNsense webserver running the portal: `https://<opnsense-hostname>/api/captiveportal/access/api`. Alternatively, a client can also be pointed to the redirected webserver directly: `https://<opnsense-hostname>:<8000 + captive portal zone id>/api/captiveportal/access/api`. For example, `https://opnsense.localdomain:8001/api/captiveportal/access/api` for zone 1. See the attention block below for more details. To set this DHCP option, refer to the documentation for the respective DHCP server.  
    在您的強制入口網站區域執行的 DHCPv4 伺服器必須提供選項 114，其值必須設定為運行該入口網站的 OPNsense Web 伺服器： `https://<opnsense-hostname>/api/captiveportal/access/api` 。或者，也可以將客戶端直接指向重定向的 Web 伺服器： `https://<opnsense-hostname>:<8000 + captive portal zone id>/api/captiveportal/access/api` 。例如，區域 1 的值為`https://opnsense.localdomain:8001/api/captiveportal/access/api`有關更多詳細信息，請參閱下面的注意事項。若要設定此DHCP選項，請參閱對應DHCP伺服器的文件。
    

If a device in the captive portal zone supports this API, they will automatically use the DHCP option to determine that they are in a captive state. Keep in mind that forced redirection is still used for maximum compatibility. If you would like to excusively use this API standard instead, you can override the firewall rules for each zone and leave out the redirection rules, see [rules](#rules).

如果強制門戶區域中的裝置支援此API ，則會自動使用DHCP選項來確定其處於強制狀態。請注意，為了最大程度地相容，仍然會使用強制重定向。如果您希望完全使用此API標準，則可以覆寫每個區域的防火牆規則並省略重定向規則，請參閱 [規則](#rules) 。

Attention

注意

Once a client has logged in through the portal, your firewall policies define what this client can and cannot access. Unless you have configured the DHCP option to point to the portal webserver directly by specifying the port, the `/api/captiveportal/access/api` endpoint now points to the regular OPNsense WebGUI on port 443, because authenticated clients are not redirected. This also means that clients cannot determine captivity state anymore.

當用戶端透過入口網站登入後，您的防火牆策略將定義該用戶端可以存取和無法存取的內容。除非您已設定DHCP選項透過指定連接埠直接指向入口網站 Web 伺服器，否則`/api/captiveportal/access/api`端點現在指向連接埠 443 上的常規 OPNsense WebGUI，因為已認證的用戶端不會被重新導向。這也意味著客戶端無法再確定是否處於強制存取狀態。

If you would like to restrict client access to this endpoint only, you must configure the proper forwarding rule as shown below. Note that this means clients cannot access the OPNsense WebGUI anymore, which is often desirable.

如果您希望將用戶端存取權限限制為僅此端點，則必須按如下所示配置對應的轉送規則。請注意，這意味著客戶端將無法再存取 OPNsense WebGUI，而這通常是我們希望看到的。

|   |   |
| --- | --- |
| **Type**<br>**類型** | Destination NAT (Port Forward)<br>目標NAT （連接埠轉送） |
| **Interface**<br>**介面** | <Zone interface> |
| **Version**<br>**版本** | IPv4+IPv6 |
| **Protocol**<br>**協議** | TCP |
| **Source**<br>**來源** | \_\_captiveportal\_zone\_<zone id><br>\_\_captiveportal\_zone\_ <zone id> |
| **Destination**<br>**目標位置** | This Firewall<br>此防火牆 |
| **Destination port range**<br>**目標連接埠範圍** | 443 |
| **Redirect Target IP**<br>**重定向目標IP** | 127.0.0.1 |
| **Redirect Target Port**<br>**重定向目標連接埠** | 8000 + <zone id> |
| **NAT Reflection**<br>**NAT反射** | Disable (advanced)<br>關閉（進階） |
| **Firewall rule**<br>**防火牆規則** | Pass<br>通過 |

Note

筆記

The OPNsense `/api/captiveportal/access/api` endpoint returns the following information:

OPNsense `/api/captiveportal/access/api`端點傳回以下資訊：

-   Whether a client is ‘captive’ at this point in time.  
    客戶目前是否處於「被困」狀態。
    
-   The URL of the portal.  
    門戶的URL 。
    
-   If the client is authenticated and a hard timeout is set, how many seconds are remaining for this session.  
    如果用戶端已通過身份驗證並且設定了硬性逾時，則此會話還剩下多少秒？
    

## Administration｜行政

The Administration menu offers access to zone configuration and template management.

管理選單提供對區域配置和範本管理的存取權限。

When creating a zone, a couple of options are available which we will try to explain briefly in the grid below:

在建立區域時，有幾個選項可供選擇，我們將在下面的表格中簡要解釋：

---

|   |   |
| --- | --- |
| Enabled<br>已啟用 | Enable the zone, which will install a network trap on the interfaces specified<br>啟用該區域，將在指定的介面上安裝網路陷阱 |
| Zone number<br>區域編號 | Read-only sequence of the configured zone. This number is useful to determine the alias containing authenticated clients. For example, zone 0 will have an associated internal alias called `__captiveportal_zone_0`. This alias can be inspected in Firewall ‣ Diagnostics ‣ Aliases. This zone id is also used if you are configuring the firewall rules yourself.<br>已配置區域的唯讀序列。此數字對於確定包含經過身份驗證的用戶端的別名很有用。例如，區域 0 將有一個名為 `__captiveportal_zone_0` 的關聯內部別名。可以在 Firewall ‣ Diagnostics ‣ Aliases 中檢查此別名。如果您自己設定防火牆規則，也會使用此區域 ID。 |
| Interfaces<br>介面 | Interfaces which should be guarded by this captive portal.<br>應受此強制門戶保護的介面。 |
| Client Roaming<br>客戶端漫遊 | Allow a connecting client to use multiple IPs (bound to the same MAC) over the course of its session. This option is needed for maximum IPv6 compatibility and also affects IPv4 clients.<br>允許連線客戶端在其會話過程中使用多個 IP（綁定到同一個MAC）。此選項對於最大程度地實現 IPv6 相容性是必需的，並且也會影響 IPv4 用戶端。 |
| Disable firewall rules<br>停用防火牆規則 | If this option is set, no automatic firewall rules for portal redirection and traffic blocking will be generated. This option allows you to override the default portal behavior for advanced use cases, such as redirections for DNS on a non-standard port. See [Captive Portal Firewall rules](#rules) for an overview of required firewall rules.<br>如果設定此選項，則不會產生用於入口網站重定向和流量封鎖的自動防火牆規則。此選項可讓您覆寫高階用例的預設入口網站行為，例如非標準連接埠上 DNS 的重定向。請參閱[強制入口網站防火牆規則](#rules)，以了解所需防火牆規則的概述。 |
| Authenticate using<br>使用以下方式進行驗證 | Select an authenticator specified in System ‣ Access ‣ Servers<br>選擇「系統」‣「存取」‣「伺服器」中指定的驗證器 |
| Always send accounting requests<br>始終發送計費請求 | \[RADIUS only\] This will make the captive portal always send accounting requests, rather than just when there is a need for accounting (e.g. when there is a daily session limit).<br>[ RADIUS僅限] 這將使強制門戶始終發送計費請求，而不僅僅是在需要計費時（例如，當存在每日會話限制時）。 |
| Enforce local group<br>強製本機群組 | Restrict access to users in the selected (local)group, to validate group membership, see System ‣ Access ‣ Groups<br>限制對所選（本地）群組中使用者的存取。若要驗證群組成員身份，請參閱「系統」‣「存取」‣「群組」 |
| Idle timeout (minutes)<br>空閒逾時時間（分鐘） | Clients will be disconnected after this amount of inactivity. They may log in again immediately, though.<br>用戶端在此時間無任何活動後將被斷開連線。但他們可以立即重新登入。 |
| Hard timeout (minutes)<br>強制逾時（分鐘） | Clients will be disconnected after this amount of time, regardless of activity. They may log in again immediately, though.<br>無論客戶端有任何活動，逾時後都會中斷連線。但他們可以立即重新登入。 |
| Concurrent user logins<br>並髮使用者登入 | If this option is set, users can login on multiple machines at once. If disabled subsequent logins will cause machines previously logged in with the same username to be disconnected.<br>如果設定此選項，使用者可以同時登入多台電腦。如果停用，後續登入將導致先前使用相同使用者名稱登入的電腦斷開連線。 |
| SSL certificate<br>SSL憑證 | Certificate to use on the captive portal login system. Leave empty for HTTP only.<br>用於強制入口網站登入系統的憑證。僅當使用HTTP時才留空。 |
| Hostname<br>主機名稱 | Hostname (of this machine) to redirect login page to, leave blank to use this interface IP address, otherwise make sure the client can access DNS to resolve this location. When using a SSL certificate, make sure both this name and the cert name are equal.<br>若要將登入頁面重新導向的主機名稱（此機器的主機名稱），請留空則使用此介面位址IP ，否則請確保用戶端可以存取DNS來解析此位置。使用SSL證書時，請確保此名稱與證書名稱相同。 |
| Allowed addresses<br>允許的位址 | Avoid authentication for addresses and subnets specified in this list<br>避免對清單中指定的位址和子網路進行身份驗證 |
| Allowed MAC addresses<br>允許的MAC位址 | Avoid authentication for MAC addresses specified in this list<br>避免對清單中指定的MAC位址進行身份驗證 |
| Extended pre auth data<br>擴充預認證資料 | Offer extended data to the login template before authentication (mac addresses for upstream use).<br>在驗證之前，向登入範本提供擴充資料（供上游使用的 MAC 位址）。 |
| Custom template<br>自訂模板 | Template to use for the login page, specified in the templates tab.<br>用於登入頁面的模板，可在模板標籤中指定。 |

In the templates tab you can manage your templates, the default template can be fetched using the button in the bottom right corner.

在模板標籤中，您可以管理您的模板，可以使用右下角的按鈕來取得預設模板。  
  
The file offered is a standard zip file, which can be unpacked locally and modified to your needs, the new contents can be saved into a new zip file and uploaded in a new template ()

提供的文件是標準的 zip 文件，可以在本地解壓縮並根據需要進行修改，修改後的內容可以保存到新的 zip 文件中，並以新模板的形式上傳。

## Sessions｜會議

Basic real time reporting is integrated using the sessions menu, this shows the following information for each zone.

透過會話選單整合了基本即時報告功能，該選單顯示每個區域的以下資訊。

-   Live top IP bandwidth usage  
    即時最高IP頻寬使用情形
    
-   Active Sessions  
    活躍會話
    
-   Time left on Vouchers  
    代金券剩餘時間
    

## Vouchers｜代金券

Here you can create new vouchers for all voucher servers configured in System ‣ Access ‣ Servers

您可以在此處為「系統」‣「存取」‣「伺服器」中配置的所有憑證伺服器建立新憑證。

## Examples｜範例

-   [Setup a Guest Network](<201 設定訪客網絡.md>)  
    [設定訪客網路](<201 設定訪客網絡.md>)

## Migration notes & technical details｜遷移說明及技術細節

Important

重要

Starting from OPNsense Community edition 25.1.4 or Business edition 25.10, the underlying captive portal implementation has moved from IPFW to PF. While in most cases this has no practical impact, a more detailed description of what this means, as well as any incompatibilities are described here.

從 OPNsense 社群版25.1.4或企業版25.10開始，底層強制入口網站的實作已從IPFW升級到PF 。雖然在大多數情況下這不會產生實際影響，但本文將更詳細地說明其含義以及任何不相容性。

Previously, our Captive Portal implementation was split up into two components, IPFW and PF. Packets would enter an interface, where IPFW was the first to handle them and redirect traffic to the portal. After authentication, a rule to allow all traffic to and from this client would be inserted. Any traffic passed by IPFW would then be handled by PF. The reverse was true for outbound traffic. This process has been simplified by moving the redirection and accounting logic to PF.

之前，我們的強制門戶實作分為兩個元件： IPFW和PF 。封包進入介面後，首先由IPFW處理，並將流量重定向到入口網站。驗證後，會插入一條規則，允許所有進出該客戶端的流量。任何經由IPFW轉送的流量隨後將由PF處理。出站流量的處理流程則相反。現在，我們將重定向和計費邏輯移至PF ，從而簡化了這個過程。

This has multiple benefits:

這樣做有多重好處：

-   The generated rules are now visible in the WebGUI and are logged by default, easing troubleshooting.  
    產生的規則現在可在 WebGUI 中查看，並且預設會記錄日誌，從而簡化故障排除。
    
-   The list of clients that have been authenticated is now an alias and is visible, as well as usable in rules. The alias is called `__captiveportal_zone_<zoneid>`.  
    已通過身份驗證的客戶端清單現在是一個別名，既可見，也可以在規則中使用。該別名名為`__captiveportal_zone_<zoneid>` 。
    
-   Unless custom shaper rules are used, IPFW does not need to be loaded anymore, significantly reducing implementation complexity.  
    除非使用自訂整形規則，否則不再需要載入IPFW ，從而大大降低了實現的複雜性。
    

The following are the only functional/behavioral changes:

以下僅是功能/行為上的變化：

-   If you have forwarding rules defined on your captive portal zone that redirect a client for services other than HTTP/HTTPS, the “Filter Rule Association”（篩選規則關聯） option on this rule must be set to “Pass”（經過） so that this traffic is allowed after redirection; otherwise, this traffic will hit the default captive portal block rule. An example of such a scenario would be client DNS traffic redirected to a DNS service running on localhost.  
    如果您在強制入口網站區域中定義了轉送規則，將用戶端重定向到除HTTP/HTTPS之外的其他服務，則必須將此規則中的“Filter Rule Association”（篩選規則關聯）選項設定為“Pass”（經過）以便允許重定向後的流量；否則，此流量將觸發預設的強制入口網站阻止規則。例如，客戶端DNS流量被重定向到運行在本地主機上的DNS服務。
    
-   The “Allow Inbound”（允許入站） option has been dropped. This option only affected IPFW rules and controlled whether traffic from another network going to the captive portal zone would be allowed. This behavior is now determined by the ruleset of the network where the traffic is originating from. As an example, if some network on a non-captive interface is allowed everywhere according to the ruleset, this traffic is also allowed into the captive portal zone. If this is not desired, an explicit block rule must be configured on said interface.  
    “Allow Inbound”（允許入站）選項已移除。此選項僅影響IPFW規則，用於控制是否允許來自其他網路的流量進入強制門戶區域。現在，此行為由流量來源網路的規則集決定。例如，如果根據規則集，非強制介面上的某個網路允許所有流量進入，則該流量也允許進入強制門戶區域。如果不希望如此，則必須在該介面上配置明確阻止規則。
    
-   Unless you are overriding the (newly) automatically generated firewall rules, you don’t need an explicit pass rule for DNS (port 53) on the firewall, nor an allow rule for the captive portal zones (ports 8000-10000) anymore. These are now installed by default.  
    除非您覆蓋了（新產生的）防火牆規則，否則您不再需要在防火牆上為DNS （連接埠 53）新增明確的允許規則，也不再需要為強制入口網站區域（連接埠 8000-10000）新增允許規則。這些規則現在預設已安裝。
    

### Captive Portal Firewall rules｜強制門戶防火牆規則

When running a default Captive Portal zone, the necessary rules for redirection are automatically installed in the zone. These rules have a higher priority than any user-defined rules. Therefore, to allow for flexibility, these rules may be overridden using the “Disable firewall rules” option in the zone administration. The automatically generated rules are listed here so they may be recreated for proper portal functionality.

執行預設強制門戶區域時，重定向所需的規則會自動安裝到該區域。這些規則的優先順序高於任何使用者定義的規則。因此，為了提高靈活性，可以使用區域管理中的「停用防火牆規則」選項來覆寫這些規則。這裡列出了自動產生的規則，以便您可以重新建立它們，確保入口網站功能正常運作。

#### Redirect traffic to the zone webserver｜將流量重新導向到區域 Web 伺服器

All HTTP traffic going to port 80 is redirected to localhost port 9000 + <zone id>.

所有發送至 80 連接埠的HTTP流量都被重定向到 localhost 9000 連接埠 + <zone id> 。

All HTTPS traffic going to the firewall on port 443 is redirected to localhost port 8000 + <zone id>.

所有發送到防火牆 443 連接埠的HTTPS流量都被重定向到本地主機 8000 連接埠 + <zone id> 。

|   |   |
| --- | --- |
| **Type**<br>**類型** | Destination NAT (Port Forward)<br>目標NAT （連接埠轉送） |
| **Interface**<br>**介面** | <Zone interface> |
| **Protocol**<br>**協議** | TCP |
| **Source Invert**<br>**來源反轉** | Yes<br>是 |
| **Source**<br>**來源** | \_\_captiveportal\_zone\_<zone id><br>\_\_captiveportal\_zone\_ <zone id> |
| **Destination Invert**<br>**目的地反轉** | Yes<br>是 |
| **Destination**<br>**目的地** | \_\_captiveportal\_zone\_<zone id><br>\_\_captiveportal\_zone\_ <zone id> |
| **Destination port range**<br>**目標連接埠範圍** | 80 |
| **Redirect Target IP**<br>**重定向目標IP** | 127.0.0.1 |
| **Redirect Target Port**<br>**重定向目標連接埠** | 9000 + <zone id> |
| **NAT Reflection**<br>**NAT反射** | Disable (advanced)<br>關閉（進階） |

|   |   |
| --- | --- |
| **Type**<br>**類型** | Destination NAT (Port Forward)<br>目標NAT （連接埠轉送） |
| **Interface**<br>**接口** | <Zone interface> |
| **Protocol**<br>**協議** | TCP |
| **Source Invert**<br>**來源反轉** | Yes<br>是 |
| **Source**<br>**來源** | \_\_captiveportal\_zone\_<zone id><br>\_\_captiveportal\_zone\_ <zone id> |
| **Destination**<br>**目標位置** | This Firewall<br>此防火牆 |
| **Destination port range**<br>**目標連接埠範圍** | 443 |
| **Redirect Target IP**<br>**重定向目標IP** | 127.0.0.1 |
| **Redirect Target Port**<br>**重定向目標連接埠** | 8000 + <zone id> |
| **NAT Reflection**<br>**NAT反射** | Disable<br>關閉 |

For IPv6, the same rules as above must be created, but the Destination must be set to the “<Zone interface> address”.

對於 IPv6，必須建立與上述相同的規則，但目標必須設定為「 <Zone interface>位址」。

The destination for HTTP traffic is the inverted zone alias, so that traffic from unauthenticated clients going to authenticated or explicitly allowed clients/servers (allowed addresses in the zone administration) is not redirected. This is useful if unauthenticated clients should be able to access servers in the same zone.

HTTP流量的目標位址是反向區域別名，這樣，來自未經身份驗證的用戶端發送至已驗證或已明確允許的用戶端/伺服器（區域管理中允許的位址）的流量就不會被重新導向。如果未經身份驗證的用戶端需要存取同一區域中的伺服器，這將非常有用。

Attention

注意

If you use [OIDC](<50 OpenID 連接.md>) for authentication, the HTTPS requests would also be redirected before authentication is possible. To solve this, create an additional “No RDR (NOT)” rule **before** the other NAT rules with the identity provider IP addresses as destination.

如果您使用 [OIDC](<50 OpenID 連接.md>)進行身份驗證，則HTTPS請求也會在驗證完成之前被重定向。為了解決此問題，請在其他NAT規則之前**建立**一條額外的「禁止RDR ( NOT )」規則，並將身分提供者IP位址作為目標位址。

|   |   |
| --- | --- |
| **Type**<br>**類型** | Destination NAT (Port Forward)<br>目標NAT （連接埠轉送） |
| **No RDR (NOT)**<br>**否RDR ( NOT )** | Yes<br>是 |
| **Interface**<br>**接口** | <Zone interface> |
| **Protocol**<br>**協議** | TCP |
| **Source**<br>**來源** | any<br>任何 |
| **Destination**<br>**目標位址** | identity\_provider\_ip\_addresses<br>identity_provider_ip_addresses |
| **Destination port range**<br>**目標連接埠範圍** | 443 |

#### Allow DNS｜允許DNS

In order to allow the client to resolve at least the OPNsense hostname, DNS must be allowed.

為了讓客戶端解析至少 OPNsense 主機名，必須允許DNS 。

|   |   |
| --- | --- |
| **Type**<br>**類型** | Firewall rule<br>防火牆規則 |
| **Action**<br>**行動** | Pass<br>通行證 |
| **Interface**<br>**接口** | <Zone interface> |
| **Protocol**<br>**協議** | TCP/UDP |
| **Direction**<br>**方向** | In<br>向 |
| **Source**<br>**來源** | <Zone net> |
| **Destination**<br>**目標位置** | This Firewall<br>此防火牆 |
| **Destination port range**<br>**目標埠範圍** | DNS/DNS |

We define “This Firewall”（此防火牆） as the destination since the default DNS service, Unbound, may return multiple IP addresses identifying the firewall.

我們將“This Firewall”（此防火牆）定義為目標，因為預設的DNS服務 Unbound 可能會傳回多個IP位址來標識防火牆。

#### Allow access to Captive Portal｜允許存取強制門戶

The redirection rules still need associated pass rules. These rules are also used for clients directly accessing the captive portal webserver, e.g. using port 8000 in the URL.

重定向規則仍然需要關聯的通行規則。這些規則也用於直接存取強制入口網站伺服器的用戶端，例如使用URL中的 8000 連接埠。

|   |   |
| --- | --- |
| **Type**<br>**類型** | Firewall rule<br>防火牆規則 |
| **Action**<br>**行動** | Pass<br>通行證 |
| **Interface**<br>**接口** | <Zone interface> |
| **Version**<br>**版本** | IPv4+IPv6 |
| **Protocol**<br>**協議** | TCP |
| **Direction**<br>**方向** | In<br>向 |
| **Source**<br>**來源** | <Zone net> |
| **Destination**<br>**目標位置** | This Firewall<br>此防火牆 |
| **Destination port range**<br>**目標連接埠範圍** | 8000 + zone id<br>8000 + 區域 ID |

|   |   |
| --- | --- |
| **Type**<br>**類型** | Firewall rule<br>防火牆規則 |
| **Action**<br>**行動** | Pass<br>通行證 |
| **Interface**<br>**接口** | <Zone interface> |
| **Version**<br>**版本** | IPv4+IPv6 |
| **Protocol**<br>**協議** | TCP |
| **Direction**<br>**方向** | In<br>向 |
| **Source**<br>**來源** | <Zone net> |
| **Destination**<br>**目標位置** | This Firewall<br>此防火牆 |
| **Destination port range**<br>**目標連接埠範圍** | 9000 + zone id<br>9000 + 區域 ID |

#### Default block rule for non-authenticated users｜未認證使用者的預設阻止規則

Any traffic originating from a client that is not DNS or access to the portal web page, is blocked according to the rule below.

根據以下規則，任何來自非DNS客戶端或造訪入口網站網頁的流量均被封鎖。

|   |   |
| --- | --- |
| **Type**<br>**類型** | Firewall rule<br>防火牆規則 |
| **Action**<br>**操作** | Block<br>阻止 |
| **Interface**<br>**接口** | <Zone interface> |
| **Protocol**<br>**協議** | Any<br>任意 |
| **Direction**<br>**方向** | In<br>向 |
| **Source Invert**<br>**來源反轉** | Yes<br>是 |
| **Source**<br>**來源** | \_\_captiveportal\_zone\_<zone id><br>\_\_captiveportal\_zone\_ <zone id> |
| **Destination Invert**<br>**目的地反轉** | Yes<br>是 |
| **Destination**<br>**目的地** | \_\_captiveportal\_zone\_<zone id><br>\_\_captiveportal\_zone\_ <zone id> |

After the above rules, an explicit pass rule is still required to allow clients to go to the internet, as would normally be the case on any interface that has no firewall rules defined.

在上述規則之後，仍然需要明確的通行規則來允許客戶端存取互聯網，這在任何沒有定義防火牆規則的介面上通常都是如此。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Unbound DNS｜未綁定DNS](<199 未綁定DNS.md>)　｜　[下一篇：Setup a Guest Network｜設定訪客網絡 ➡](<201 設定訪客網絡.md>)
