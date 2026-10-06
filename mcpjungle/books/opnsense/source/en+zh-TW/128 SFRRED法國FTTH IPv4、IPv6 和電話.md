---
title: "SFRRED France FTTH IPv4 & IPv6 & Phone｜SFRRED法國FTTH IPv4、IPv6 和電話"
title_original: "SFRRED France FTTH IPv4 & IPv6 & Phone"
source: "https://docs.opnsense.org/manual/how-tos/sfr_red_fr_ftth.html"
chapter: ["Interfaces","Setup Guides","ISP Configuration"]
order: 128
lang: "bilingual"
translated_by: "google_v2"
captured: "2026-09-26T11:32:45.084Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Orange France IPTV setup｜Orange France IPTV設置](<127 Orange France IPTV設置.md>)　｜　[下一篇：Setup for Sky UK ISP｜天空設定UK ISP ➡](<129 天空設定UK ISP.md>)

# SFRRED France FTTH IPv4 & IPv6 & Phone｜SFRRED法國FTTH IPv4、IPv6 和電話

> 章節：[Interfaces](<000 目錄.md#c-19>) › [Setup Guides](<000 目錄.md#c-21>) › [ISP Configuration](<000 目錄.md#c-25>)

## SFR/RED France FTTH IPv4 & IPv6 & Phone｜SFR/RED法國FTTH IPv4 & IPv6 & 電話

**Original Author:** Philippe Gaultier

**原作者：**菲利普·高緹耶

## **Introduction / Getting ready to make the connection**｜**引言/準備建立連線**

This guide is for SFR/RED France FTTH using DHCPv4 / DHCPv6 to connect.

本指南適用於使用 DHCPv4 / DHCPv6 連接SFR/RED法國FTTH 。

The guide deals with internet connection and phone. Support for TV has not been tested.

本指南涉及網路連線和電話。尚未測試對TV的支援。

Note

注意事項

Before starting this guide, you should have the MAC address of your SFR/RED Box. In the guide you should replace xx:xx:xx:xx:xx:xx with your SFR/RED Box MAC address.

在開始本指南之前，您應該擁有您的SFR/RED盒子的MAC地址。在本指南中，您應該將 xx:xx:xx:xx:xx:xx 替換為您的SFR/RED盒子的MAC地址。

SFR/RED requires that the WAN interface assignment should look similar to this:

SFR/RED要求WAN介面分配應類似這樣：

[![../../_images/SFRRED_assignations.png](<../images/0d283076-SFRRED_assignations.png>)](https://docs.opnsense.org/_images/SFRRED_assignations.png)

-   WAN interface has MAC xx:xx:xx:xx:xx:xx which is the original WAN MAC of the BOX (spoofed),  
    WAN接口具有MAC xx:xx:xx:xx:xx:xx，這是BOX的原始WAN MAC （偽造的），
    
-   LAN interface has MAC 00:11:22:33:44:55 which is the original MAC of the firewall,  
    LAN接口有MAC 00:11:22:33:44:55 ，它是防火牆的原始MAC ，
    
-   DUID is 00:03:00:01:xx:xx:xx:xx:xx:xx it’s derived from the original WAN MAC of the BOX (spoofed).  
    DUID是00:03:00:01: xx:xx:xx:xx:xx:xx，它源自於BOX的原始WAN MAC （偽造）。
    

## **Configuring the WAN Interface**｜**配置WAN介面**

Select Interfaces ‣ \[WAN\]

選擇介面 ‣ \[ WAN \]

In order to establish the IPv4 and IPv6 connection, SFR/RED requires that the correct parameters are passed for the DHCPv4 and DHCPv6 requests respectively.

為了建立 IPv4 和 IPv6 連接， SFR/RED要求分別傳遞 DHCPv4 和 DHCPv6 請求的正確參數。

Select options:

選擇選項：

-   IPv4 configuration: DHCPv4,  
    IPv4 設定：DHCPv4，
    
-   IPv6 configuration: DHCPv6.  
    IPv6 設定：DHCPv6。
    

[![../../_images/SFRRED_WAN_configuration_1.png](<../images/55b16782-SFRRED_WAN_configuration_1.png>)](https://docs.opnsense.org/_images/SFRRED_WAN_configuration_1.png)

**On the DHCPv4 request it is a requirement to pass the following:**

**DHCPv4 請求必須包含以下內容：**

[![../../_images/SFRRED_WAN_configuration_2.png](<../images/8142b4af-SFRRED_WAN_configuration_2.png>)](https://docs.opnsense.org/_images/SFRRED_WAN_configuration_2.png)

Note

注意事項

It is necessary to specify the following ”Send Options”:

必須指定以下「傳送選項」：

-   dhcp-class-identifier “neufbox\_NB6VAC-FXC”  
    dhcp-class-identifier “neufbox\_NB6VAC- FXC ”
    

Note

注意事項

It is necessary to specify the following ”Request Options”:

必須指定以下「請求選項」：

-   subnet-mask, broadcast-address, time-offset, routers, domain-name, domain-name-servers, host-name, ntp-servers, nis-domain, root-path, merit-dump  
    子網路遮罩、廣播位址、時間偏移、路由器、網域名稱、網域名稱伺服器、主機名稱、NTP 伺服器、NIS 網域、根路徑、merit-dump
    

**On the DHCPv6 request we need to use raw options**

**在 DHCPv6 請求中，我們需要使用原始選項**

[![../../_images/SFRRED_WAN_configuration_3.png](<../images/6b18eadc-SFRRED_WAN_configuration_3.png>)](https://docs.opnsense.org/_images/SFRRED_WAN_configuration_3.png)

Note

注意事項

It is necessary to specify the following ”Send Options”:

必須指定以下「傳送選項」：

-   ia-pd 1, raw-option 16 00:00:a0:0c:00:40:6e:65:75:66:62:6f:78:5f:4e:42:36:56:41:43:2d:46:58:43  
    ia-pd 1，原選項 16 00:00:a0:0c:00:40:6e:65:75:66:62:6f:78:5f:4e:42:36:56:41:43:2d:46:58:43
    

Note

注意事項

It is necessary to specify the following ”Request Options”:

必須指定以下「請求選項」：

-   domain-name-servers, domain-name  
    網域名稱伺服器，域名
    

Note

注意事項

Set Identity Association options to:

將身份關聯選項設為：

-   Delegate prefix: checked,  
    委託前綴：已選中，
    
-   id-assoc pd ID: 1,  
    id-assoc pd ID : 1,
    
-   Prefix: ::/0.  
    字首：::/0。
    

Set Prefix Interface option to:

將前綴介面選項設定為：

-   Prefix Interface: 8.  
    前綴接口：8。
    

Click ”Save” and then ”Apply”.

點擊“儲存”，然後點擊“應用”。

## **Configuring the LAN Interface**｜**配置LAN介面**

### Interfaces / Parameters｜介面/參數

Select Interfaces ‣ Parameters and set your DUID.

選擇介面‣參數並設定您的DUID 。

[![../../_images/SFRRED_interfaces_parameters.png](<../images/ac0af8f0-SFRRED_interfaces_parameters.png>)](https://docs.opnsense.org/_images/SFRRED_interfaces_parameters.png)

Note

注意事項

The DUID is based on the SFR/RED Box MAC address : 00:03:00:01:xx:xx:xx:xx:xx:xx.

DUID基於SFR/RED Box MAC地址： 00:03:00:01: xx:xx:xx:xx:xx:xx。

Click ”Save” and then ”Apply”

點擊“儲存”，然後點擊“應用”。

### Interfaces / \[LAN\]｜接口 / \[ LAN \]

Select Interfaces ‣ \[LAN\] and set IPv4 to “Static IPv4”（靜態 IPv4） and IPv6 Configuration Type to “Track Interface”（軌道介面）.

選擇介面 ‣ \[ LAN \]，並將 IPv4 設定為“Static IPv4”（靜態 IPv4） ，將 IPv6 設定類型設為“Track Interface”（軌道介面） 。

[![../../_images/SFRRED_LAN_configuration_1.png](<../images/69354f4b-SFRRED_LAN_configuration_1.png>)](https://docs.opnsense.org/_images/SFRRED_LAN_configuration_1.png)

And define the IPv6 Prefix ID to ”0” Finally, set the following parameters as shown:

將 IPv6 前綴ID定義為「0」。最後，按如下所示設定以下參數：

-   the IPv4 address to the one wanted,  
    所需IPv4位址
    
-   the IPv6 interfacet to ”WAN”,  
    將 IPv6 介面連接到“ WAN ”，
    
-   the IPv6 Prefix ID to ”0”.  
    IPv6 字首ID變成「0」。
    

[![../../_images/SFRRED_LAN_configuration_2.png](<../images/272be15e-SFRRED_LAN_configuration_2.png>)](https://docs.opnsense.org/_images/SFRRED_LAN_configuration_2.png)

Click ”Save” and then ”Apply”

點擊“儲存”，然後點擊“應用”。

Note

注意事項

It is advisable at this point to reboot the system. This will allow you to retrieve an IPv4 address which will be used in next part.

此時建議重啟系統。這樣可以取得到 IPv4 位址，該位址將在下一步中使用。

## **Configuring NGINX to provision the SFR/RED BOX**｜**正在配置NGINX以部署SFR/RED BOX**

In order to set up the phone, as the SIP parameters (user/password) are not public, we will add the SFR/RED box in our LAN. This will allow us to plug our regular phone in the SFR/RED box.

為了設定電話，由於SIP參數（使用者名稱/密碼）不公開，我們將把SFR/RED盒子加入我們的LAN中。這樣我們就可以把我們的普通電話插入SFR/RED盒子中。

Note

注意事項

This how-to does not cover installation of NGINX nor the use of SSH / shell commands.

本教學不涵蓋NGINX的安裝，也不涵蓋SSH / shell 指令的使用。

First SSH into your OPNSense firewall and create a folder **/srv/sfrredbox**. In this folder, we will add the scripts used to spoof the SFR/RED Box requests.

首先，將SSH加入您的 OPNSense 防火牆，並建立一個名為 **/srv/sfrredbox** 的資料夾。我們將在此資料夾中新增用於偽造SFR/RED Box 請求的腳本。

In this directory create a file **index.php**

在此目錄下建立檔案 **index.php**

```
$currentFirewall = 'firewall.localdomain.intra';
// can probably be replaced with
// $currentFirewall = exec('hostname');
if (isset($_GET['ip_dhcp'])) {
    // adjust re0 to your WAN interface
    $_GET['ip_dhcp'] = exec('ifconfig re0 | grep \'inet \' | cut -d\' \' -f2');
    // if the ifconfig command does not work, set the external IP manually
    // $_GET['ip_dhcp'] = 'your.external.ip.address';
}
$_SERVER['DOCUMENT_URI'] = str_replace('/index.php', '', $_SERVER['DOCUMENT_URI']);
$parameters = http_build_query($_GET);
$url = $_SERVER['REQUEST_SCHEME'].'://'.$_SERVER['HTTP_HOST'].'/'.trim($_SERVER['DOCUMENT_URI'], '/?') .'?'.$parameters;
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADERFUNCTION, 'readHeaderLine');
$data = curl_exec($ch);
$data = preg_replace('/<proxy([^>]+)>([^<]+)<\/proxy>/', '<proxy$1>'.$currentFirewall.'</proxy>', $data);
curl_close($ch);
header('Content-Length: '.strlen($data));
header('Content-Type: application/xml');
echo $data;
```

Warning

警告

Code cannot be copied / pasted as-is, you will have to adjust the parameters and make it consistent with your own settings.

程式碼不能直接複製/貼上，您需要調整參數並使其與您自己的設定保持一致。

### Services / Nginx / Configuration｜服務 / Nginx / 配置

Select Services ‣ Nginx ‣ Configuration

選擇服務 ‣ Nginx ‣ 配置

Activate NGINX

激活NGINX

[![../../_images/SFRRED_services_nginx_configuration_1.png](<../images/dd3eb317-SFRRED_services_nginx_configuration_1.png>)](https://docs.opnsense.org/_images/SFRRED_services_nginx_configuration_1.png)

### Services / Nginx / Configuration / HTTP(s)｜服務 / Nginx / 設定 / HTTP (s)

Select Services ‣ Nginx ‣ Configuration ‣ HTTP(s)

選擇服務 ‣ Nginx ‣ 設定 ‣ HTTP (s)

Create a new config

建立新配置

[![../../_images/SFRRED_services_nginx_configuration_2.png](<../images/51ece92a-SFRRED_services_nginx_configuration_2.png>)](https://docs.opnsense.org/_images/SFRRED_services_nginx_configuration_2.png)

Note

注意事項

Important settings are:

重要設定包括：

-   Description,  
    描述，
    
-   URL Pattern,  
    URL圖案，
    
-   File System Root,  
    檔案系統根目錄
    
-   Pass Request To Local PHP Interpreter / Threat Upstream.  
    將請求傳遞給本地PHP解釋器 / 威脅上游。
    

### Services / Nginx / Configuration / HTTP(s) / URL Rewriting｜服務 / Nginx / 設定 / HTTP (s) / URL重寫

Select Services ‣ Nginx ‣ Configuration ‣ HTTP(s) ‣ URL Rewriting

選擇服務 ‣ Nginx ‣ 設定 ‣ HTTP (s) ‣ URL重寫

Add a new rewrite rule

新增新的重寫規則

[![../../_images/SFRRED_services_nginx_configuration_3.png](<../images/9b337a1d-SFRRED_services_nginx_configuration_3.png>)](https://docs.opnsense.org/_images/SFRRED_services_nginx_configuration_3.png)

### Services / Nginx / Configuration / HTTP(s) / HTTP Server｜服務 / Nginx / 設定 / HTTP (s) / HTTP伺服器

Select Services ‣ Nginx ‣ Configuration ‣ HTTP(s) ‣ HTTP Server

選擇服務 ‣ Nginx ‣ 設定 ‣ HTTP (s) ‣ HTTP伺服器

Add a new rewrite rule

新增新的重寫規則

[![../../_images/SFRRED_services_nginx_configuration_4.png](<../images/55b9b498-SFRRED_services_nginx_configuration_4.png>)](https://docs.opnsense.org/_images/SFRRED_services_nginx_configuration_4.png)

Note

注意事項

NGINX should be serving the page we have created.

NGINX應該提供我們所建立的頁面。

## **Configuring Siproxd to provision the SFR/RED BOX**｜**配置 Siproxd 以提供SFR/RED BOX**

To allow phone to work, the easiest way is to set Siproxd on the firewall.

要讓手機正常運作，最簡單的方法是在防火牆上設定 Siproxd。

### Services / Unbound DNS / General｜服務 / 無限制DNS / 一般

Select Services ‣ Unbound DNS ‣ General

選擇服務 ‣ 無限制DNS ‣ 一般

Add parameters to let SFR/RED Box discover the SIP proxy:

加入參數，讓SFR/RED Box 發現SIP代理：

[![../../_images/SFRRED_services_unbound_configuration_1.png](<../images/5b22170e-SFRRED_services_unbound_configuration_1.png>)](https://docs.opnsense.org/_images/SFRRED_services_unbound_configuration_1.png)

Warning

警告

It appears OPNSense will drop support of functionality of **advanced** parameters so I don’t know if it will be possible in future releases to define the DNS stuff using:

看來 OPNSense 將放棄對**高級**參數功能的支持，所以我不知道在未來的版本中是否還能使用以下方式定義DNS相關內容：

-   local-data: “\_sip.\_udp.firewall.localdomain.intra. 180 IN SRV 10 60 5060 firewall.localdomain.intra.”
    

### Services / Siproxd｜服務 / Siproxd

Select Services ‣ Siproxd

選擇服務 ‣ Siproxd

Define basic parameters:

定義基本參數：

[![../../_images/SFRRED_services_siproxd_configuration_1.png](<../images/3dfd6ee0-SFRRED_services_siproxd_configuration_1.png>)](https://docs.opnsense.org/_images/SFRRED_services_siproxd_configuration_1.png)

### Services / Siproxd / Outbound Domains｜服務 / Siproxd / 出站域名

Select Services ‣ Siproxd ‣ Outbound Domains

選擇服務 ‣ Siproxd ‣ 出站域名

Create the configuration for outbound domain:

建立出站域的配置：

[![../../_images/SFRRED_services_siproxd_configuration_2.png](<../images/75e35d19-SFRRED_services_siproxd_configuration_2.png>)](https://docs.opnsense.org/_images/SFRRED_services_siproxd_configuration_2.png)

Note

注意事項

The IP address and the port of outbound domain was discovered using an **host** request on the proxy returned by SFR/RED while provisionning the box. You will have to check the <proxy></proxy> fields of **voip2.xml**.

在配置設備時，透過對代理伺服器傳回的SFR/RED執行 **host**請求，發現了IP位址和出站域連接埠。您需要檢查**voip2.xml** 檔案中的<proxy></proxy>欄位。

> host -t SRV \_sip.\_udp.residential.p-cscf.sfr.net
>
> 主機 -t SRV \_sip.\_udp.residential.p-cscf.sfr.net

Note

注意事項

the host request result gives available SIP servers with the port to use (in my case 5062).

主機請求結果給出了可用的SIP伺服器以及要使用的連接埠（在我的例子中是 5062）。

> \_sip.\_udp.residential.p-cscf.sfr.net has SRV record 10 0 5062 mitry.p-cscf.sfr.net. \_sip.\_udp.residential.p-cscf.sfr.net has SRV record 10 0 5062 corbas.p-cscf.sfr.net. \_sip.\_udp.residential.p-cscf.sfr.net has SRV record 10 0 5062 trappes.p-cscf.sfr.net.
>
> \_sip.\_udp.residential.p-cscf.sfr.net 有SRV記錄 10 0 5062 mitry.p-cscf.sfr.net。 \_sip.\_udp.residential.p-cscf.sfr.net 有SRV記錄 10 0 5062 corbas.p-cscf.sfr.net。 \_sip.\_udp.residential.p-cscf.sfr.net 有SRV記錄 10 0 5062 trappes.p-cscf.sfr.net。

## **Configuring NAT to redirect SFR/RED BOX calls to NGINX**｜**配置NAT將SFR/RED BOX的呼叫重定向到NGINX**

To allow correct Destination NAT (Port Forwarding), we will configure OPNSense to affect a **static** IP to the SFR/RED Box and we will create an alias for it.

為了允許正確的目標NAT （連接埠轉送），我們將配置 OPNSense 以影響 **靜態** IP到SFR/RED盒子，並為其建立一個別名。

### Services / DHCPv4 / \[LAN\]｜服務 / DHCPv4 / \[ LAN \]

Select Services ‣ DHCPv4 ‣ \[LAN\]

選擇服務 ‣ DHCPv4 ‣ \[ LAN \]

Click on \[+\] to add a static mapping:

點選 [+] 新增靜態映射：

[![../../_images/SFRRED_services_dhcp_lan.png](<../images/66844d8f-SFRRED_services_dhcp_lan.png>)](https://docs.opnsense.org/_images/SFRRED_services_dhcp_lan.png)

### Firewall / NAT / Destination NAT (Port Forward)｜防火牆 / NAT / 目標NAT （連接埠轉送）

Select Firewall ‣ NAT ‣ Destination NAT (Port Forward)

選擇防火牆 ‣ NAT ‣ 目標NAT （連接埠轉送）

Add a new forwarding rule:

新增新的轉送規則：

[![../../_images/SFRRED_lan_port_forwarding.png](<../images/134d40ce-SFRRED_lan_port_forwarding.png>)](https://docs.opnsense.org/_images/SFRRED_lan_port_forwarding.png)

Note

注意事項

Right now, everything should be ready. Restart the firewall, once ready plug the SFR/RED Box on your LAN and start it. You should be able to enjoy IPv4, IPv6 and Phone.

現在一切都應該準備就緒了。重新啟動防火牆，準備好後，將SFR/RED盒子連接到LAN並啟動它。您應該可以正常使用IPv4、IPv6和電話服務了。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Orange France IPTV setup｜Orange France IPTV設置](<127 Orange France IPTV設置.md>)　｜　[下一篇：Setup for Sky UK ISP｜天空設定UK ISP ➡](<129 天空設定UK ISP.md>)
