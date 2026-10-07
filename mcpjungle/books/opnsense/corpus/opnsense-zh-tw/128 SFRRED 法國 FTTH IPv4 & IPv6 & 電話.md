---
title: "SFRRED 法國 FTTH IPv4 & IPv6 & 電話"
title_original: "SFRRED France FTTH IPv4 & IPv6 & Phone"
source: https://docs.opnsense.org/manual/how-tos/sfr_red_fr_ftth.html
chapter: ["Interfaces","Setup Guides","ISP Configuration"]
order: 128
lang: "zh-TW"
translated_by: "gtx"
captured: "2026-09-26T11:32:45.084Z"
---

# SFRRED 法國 FTTH IPv4 & IPv6 & 電話

## SFR/RED 法國 FTTH IPv4 & IPv6 & 電話

**原作者：** 菲利普‧高提耶

## **簡介/準備建立連線**

本指南適用於 SFR/RED 法國 FTTH 使用 DHCPv4 / DHCPv6 進行連接。

該指南涉及網路連線和電話。對TV的支援尚未經過測試。

注意事項

在開始本指南之前，您應該知道 SFR/RED 郵箱的 MAC 地址。在指南中，您應該將 xx:xx:xx:xx:xx:xx 替換為您的 SFR/RED Box MAC 地址。

SFR/RED 要求 WAN 介面分配應類似以下內容：

[圖](https://docs.opnsense.org/_images/SFRRED_assignations.png)

-   WAN接口有MAC xx:xx:xx:xx:xx:xx，這是BOX的原始WAN MAC（惡搞的），
    
-   LAN接口有MAC 00:11:22:33:44:55，這是防火牆原來的MAC，
    
-   DUID 是 00:03:00:01:xx:xx:xx:xx:xx:xx 它源自於 BOX 的原始WAN MAC（惡搞）。
    

## **配置WAN介面**

選擇介面 ‣ \[WAN\]

為了建立 IPv4 和 IPv6 連接，SFR/RED 要求分別為 DHCPv4 和 DHCPv6 請求傳遞正確的參數。

選擇選項：

-   IPv4設定：DHCPv4，
    
-   IPv6 設定：DHCPv6。
    

[圖](https://docs.opnsense.org/_images/SFRRED_WAN_configuration_1.png)

**在 DHCPv4 請求中，需要傳遞以下內容：**

[圖](https://docs.opnsense.org/_images/SFRRED_WAN_configuration_2.png)

注意事項

需要指定以下「發送選項」：

-   dhcp 類別標識符“neufbox\_NB6VAC-FXC”
    

注意事項

需要指定以下「請求選項」：

-   子網路遮罩、廣播位址、時間偏移、路由器、網域名稱、網域名稱伺服器、主機名稱、ntp 伺服器、nis 網域、根路徑、指標轉儲
    

**在 DHCPv6 請求中，我們需要使用原始選項**

[圖](https://docs.opnsense.org/_images/SFRRED_WAN_configuration_3.png)

注意事項

需要指定以下「發送選項」：

-   ia-pd 1，原選項 16 00:00:a0:0c:00:40:6e:65:75:66:62:6f:78:5f:4e:42:36:56:41:43:2d:46:58:43
    

注意事項

需要指定以下「請求選項」：

-   網域名稱伺服器、域名
    

注意事項

將身份關聯選項設為：

-   委託前綴：選中，
    
-   id-關聯 pd ID：1，
    
-   字首：::/0。
    

將前綴介面選項設定為：

-   前綴接口：8。
    

按一下“儲存”，然後按一下“應用”。

## **配置LAN介面**

### 介面/參數

選擇 Interfaces ‣Parameters 並設定您的 DUID。

[圖](https://docs.opnsense.org/_images/SFRRED_interfaces_parameters.png)

注意事項

DUID 依據SFR/RED 盒子MAC 地址：00:03:00:01:xx:xx:xx:xx:xx:xx。

點擊“儲存”，然後點擊“應用”

### 接口/\[LAN\]

選擇 Interfaces ‣ \[LAN\] 並將 IPv4 設定為“靜態 IPv4”，將 IPv6 設定類型設定為“追蹤介面”。

[圖](https://docs.opnsense.org/_images/SFRRED_LAN_configuration_1.png)

並將 IPv6 前綴ID定義為「0」最後，設定以下參數，如圖所示：

-   想要的 IPv4 位址，
    
-   IPv6 介面“WAN”，
    
-   IPv6 字首ID 為「0」。
    

[圖](https://docs.opnsense.org/_images/SFRRED_LAN_configuration_2.png)

點擊“儲存”，然後點擊“應用”

注意事項

此時建議重新啟動系統。這將允許您檢索將在下一部分中使用的 IPv4 位址。

## **配置NGINX以配置SFR/RED BOX**

為了設定手機，由於SIP參數（用戶/密碼）不公開，我們將在LAN中加入SFR/RED框。這將使我們能夠將普通手機插入SFR/RED盒子中。

注意事項

本操作指南不涉及NGINX的安裝，也不涉及SSH/shell指令的使用。

首先SSH進入您的 OPNSense 防火牆並建立一個資料夾 **/srv/sfrredbox**。在此資料夾中，我們將新增用於欺騙 SFR/RED Box 請求的腳本。

在此目錄中建立檔案 **index.php**

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

警告

程式碼無法按原樣複製/貼上，您必須調整參數並使其與您自己的設定一致。

### 服務/Nginx/配置

選擇服務 ‣ Nginx ‣ 配置

激活NGINX

[圖](https://docs.opnsense.org/_images/SFRRED_services_nginx_configuration_1.png)

### 服務/Nginx/設定/HTTP(s)

選擇服務 ‣ Nginx ‣ 設定 ‣ HTTP(s)

建立一個新配置

[圖](https://docs.opnsense.org/_images/SFRRED_services_nginx_configuration_2.png)

注意事項

重要設定有：

-   說明，
    
-   URL圖案，
    
-   檔案系統根目錄，
    
-   將請求傳遞給本地PHP解釋器/威脅上游。
    

### 服務 / Nginx / 設定 / HTTP(s) / URL 重寫

選擇服務 ‣ Nginx ‣ 設定 ‣ HTTP(s) ‣ URL 重寫

新增新的重寫規則

[圖](https://docs.opnsense.org/_images/SFRRED_services_nginx_configuration_3.png)

### 服務 / Nginx / 設定 / HTTP(s) / HTTP 伺服器

選擇服務 ‣ Nginx ‣ 設定 ‣ HTTP(s) ‣ HTTP 伺服器

新增新的重寫規則

[圖](https://docs.opnsense.org/_images/SFRRED_services_nginx_configuration_4.png)

注意事項

NGINX 應該為我們創建的頁面提供服務。

## **配置 Siproxd 以配置 SFR/RED BOX**

要讓電話正常運作，最簡單的方法是在防火牆上設定 Siproxd。

### 服務 / 不綁定 DNS / 一般

選擇服務 ‣ 未綁定 DNS ‣ 一般

新增參數讓SFR/RED Box發現SIP代理：

[圖](https://docs.opnsense.org/_images/SFRRED_services_unbound_configuration_1.png)

警告

看來 OPNSense 將放棄對 **高級** 參數功能的支持，因此我不知道在未來的版本中是否可以使用以下方式定義 DNS 內容：

-   本地資料：“\_sip.\_udp.firewall.localdomain.intra。180IN SRV10 60 5060firewall.localdomain.intra.”
    

### 服務 / Siproxd

選擇服務 ‣ Siproxd

定義基本參數：

[圖](https://docs.opnsense.org/_images/SFRRED_services_siproxd_configuration_1.png)

### 服務 / Siproxd / 出站域

選擇服務 ‣ Siproxd ‣ 出站域

建立出站域配置：

[圖](https://docs.opnsense.org/_images/SFRRED_services_siproxd_configuration_2.png)

注意事項

在配置盒子時，使用SFR/RED傳回的代理程式上的**主機**請求發現了IP位址和出站域連接埠。您必須檢查**voip2.xml** 的 <proxy></proxy> 欄位。

> 主機-t SRV \_sip.\_udp.residential.p-cscf.sfr.net

注意事項

主機請求結果提供可用的SIP伺服器以及要使用的連接埠（在我的例子中為5062）。

> \_sip.\_udp.residential.p-cscf.sfr.net 有 SRV 記錄 10 0 5062 mitry.p-cscf.sfr.net。 \_sip.\_udp.residential.p-cscf.sfr.net 有 SRV 記錄 10 0 5062 corbas.p-cscf.sfr.net。 \_sip.\_udp.residential.p-cscf.sfr.net 有 SRV 記錄 10 0 5062 trappes.p-cscf.sfr.net。

## **配置 NAT 將 SFR/RED BOX 呼叫重新導向至 NGINX**

為了允許正確的目標 NAT（連接埠轉送），我們將配置 OPNSense 以影響 SFR/RED 框的 **靜態** IP，並為其建立一個別名。

### 服務 / DHCPv4 / \[LAN\]

選擇服務 ‣ DHCPv4 ‣ \[LAN\]

點選\[+\]新增靜態映射：

[圖](https://docs.opnsense.org/_images/SFRRED_services_dhcp_lan.png)

### 防火牆 / NAT / 目標 NAT（連接埠轉送）

選擇防火牆 ‣ NAT ‣ 目標NAT（連接埠轉送）

新增新的轉送規則：

[圖](https://docs.opnsense.org/_images/SFRRED_lan_port_forwarding.png)

注意事項

現在，一切都應該準備好了。重新啟動防火牆，準備好後將SFR/RED盒子插入LAN並啟動它。您應該能夠使用 IPv4、IPv6 和電話。