---
title: "Orange France FTTH IPv4 & IPv6｜法國橘色FTTH IPv4 和 IPv6"
title_original: "Orange France FTTH IPv4 & IPv6"
source: "https://docs.opnsense.org/manual/how-tos/orange_fr_fttp.html"
chapter: ["Interfaces","Setup Guides","ISP Configuration"]
order: 126
lang: "bilingual"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:32:45.577Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Deutsche Telekom Germany IPTV (Magenta TV) setup｜德國電信德國IPTV (洋紅色TV ) 設定](<125 德國電信德國IPTV (洋紅色TV ) 設定.md>)　｜　[下一篇：Orange France IPTV setup｜Orange France IPTV設置 ➡](<127 Orange France IPTV設置.md>)

# Orange France FTTH IPv4 & IPv6｜法國橘色FTTH IPv4 和 IPv6

> 章節：[Interfaces](<000 目錄.md#c-19>) › [Setup Guides](<000 目錄.md#c-21>) › [ISP Configuration](<000 目錄.md#c-25>)

**Authors:** Kev Willers, David Néel

**作者：** 凱夫威勒斯、大衛尼爾

## **Introduction**｜**介紹**

This guide is for Orange France FTTP using DHCP to connect (this method currently excludes the users of the PRO package).

本指南適用於使用DHCP連接 Orange France FTTP （此方法目前不包括PRO套餐的用戶）。

The guide deals with just the internet connection. Setting up of TV or Phone is not covered here.

本指南僅涉及網路連接，不包含TV或電話的設定。

## **Getting ready to make the connection**｜**準備建立連線**

Orange requires that the WAN is configured over VLAN 832. So the first step is to set up the VLAN on the intended WAN nic as shown below Interfaces ‣ Devices ‣ VLAN

Orange 要求WAN配置在VLAN 832 埠上。因此，第一步是在目標WAN網卡上設定VLAN ，如下所示：介面 ‣ 設備 ‣ VLAN

[![../../_images/OF_image0.png](<../images/fdb056e1-OF_image0.png>)](https://docs.opnsense.org/_images/OF_image0.png)

and the WAN interface assignment should hence look something like this.

因此， WAN介面分配應該看起來像這樣。

[![../../_images/OF_image1.png](<../images/02ff8c2e-OF_image1.png>)](https://docs.opnsense.org/_images/OF_image1.png)

Finally, set the DUID for IPv6 WAN interface Interfaces ‣ Settings

最後，設定 IPv6 介面的DUID和WAN介面（介面 ‣ 設定）。

[![../../_images/OF_image1.1.png](<../images/93cec747-OF_image1.1.png>)](https://docs.opnsense.org/_images/OF_image1.1.png)

Note

注意事項

You can use the mac address of the WAN interface (not necessarily the Livebox MAC address) - 00:03:00:01:01:XX:XX:XX:XX:XX:XX where XX is the MAC address

您可以使用WAN介面的 MAC 位址（不一定是 Livebox MAC位址）- 00:03:00:01:01:XX:XX:XX:XX:XX:XX ，其中XX是MAC位址。

## **Configuring the WAN Interface**｜**配置WAN介面**

In order to establish the IPv4 and IPv6 connection Orange requires that the correct parameters are passed for the DHCP and DHCP6 requests respectively

為了建立 IPv4 和 IPv6 連接，Orange 要求分別向DHCP和DHCP6請求傳遞正確的參數。

select options DHCP and DHCPv6 in general configuration

在常規配置中選擇選項DHCP和DHCPv6

[![../../_images/OF_image2.png](<../images/2c14dd5b-OF_image2.png>)](https://docs.opnsense.org/_images/OF_image2.png)

**On the DHCP request it is a requirement to pass the following:**

**申請DHCP時，必須符合以下條件：**

-   dhcp-class-identifier “sagem”
    
-   user-class “+FSVDSL\_livebox.Internet.softathome.Livebox6”  
    使用者類別“+ FSVDSL \_livebox.Internet.softathome.Livebox6”
    
-   option-90 00:00:00:00:00:00:00:00:00:00:00:66:74:69:2f:65:77:74:FF:AB:XX:XX (hex conversion of the userid supplied by Orange which looks like fti/xxxxxxx)  
    option-90 00:00:00:00:00:00:00:00:00:00:00:66:74:69:2f:65:77:74:FF:AB:XX:XX （Orange 提供的使用者 ID 的十六進位轉換，格式為 fti/xxxxxxx）
    
-   dhcp-client-identifier 01:XX:XX:XX:XX:XX:XX (you MUST use the same MAC address for the XX:XX as the one use for the DUID above)  
    dhcp-client-identifier DUID : XX:XX:XX:XX:XX:XX (您MUST使用與上面XX:XX相同的MAC地址)
    

Note

注意事項

You can use this tool to generate the option-90 chain : [https://jsfiddle.net/kgersen/3mnsc6wy/](https://jsfiddle.net/kgersen/3mnsc6wy/)

您可以使用此工具產生 Option-90 鏈：[https://jsfiddle.net/kgersen/3mnsc6wy/](https://jsfiddle.net/kgersen/3mnsc6wy/)

These parameters should be passed as comma separated options in the ‘Send Options’ area of their WAN DHCP request

這些參數應以逗號分隔的選項形式傳遞到其WAN DHCP請求的「傳送選項」區域。

[![../../_images/OF_image3.png](<../images/2c0c2f08-OF_image3.png>)](https://docs.opnsense.org/_images/OF_image3.png)

Note

注意事項

It is necessary to specify the following ‘Request Options’

必須指定以下“請求選項”

-   subnet-mask  
    子網路遮罩
    
-   broadcast-address  
    廣播位址
    
-   dhcp-lease-time  
    DHCP 租期
    
-   dhcp-renewal-time  
    DHCP 續期時間
    
-   dhcp-rebinding-time  
    DHCP 重綁定時間
    
-   domain-search, routers  
    域名搜尋，路由器
    
-   domain-name-servers  
    網域名稱伺服器
    
-   option-90  
    選項90
    
-   domain-name  
    網域
    
-   option-120  
    選項 120
    
-   option-125  
    選項 125
    

These parameters should be passed as comma separated options in the ‘Request Options’ area of their WAN DHCP request

這些參數應以逗號分隔的選項形式傳遞到其WAN DHCP請求的「請求選項」區域。

Orange require that the DHCP and DHCP6 requests are made with a VLAN-PCP of 6. This can be done via ‘Use VLAN priority’ interface settings. Make sure to set this for both DHCP and DHCP6 at the same time.

Orange 要求DHCP和DHCP6請求的VLAN-PCP值必須為 6。這可以透過「使用VLAN優先權」介面設定來實現。請確保同時為DHCP和DHCP6設定此優先權。

[![../../_images/OF_image4.png](<../images/8ad2a98d-OF_image4.png>)](https://docs.opnsense.org/_images/OF_image4.png)

On the DHCP6 request we need to use raw options

在DHCP6請求中，我們需要使用原始選項

Firstly select ‘Basic’ and tick ‘Request only an IPv6 prefix’ and set ‘Prefix delegation size’ to 56

首先選擇“基本”，勾選“僅請求 IPv6 前綴”，並將“前綴委派大小”設為 56。

[![../../_images/OF_image5_1.png](<../images/fde3164e-OF_image5_1.png>)](https://docs.opnsense.org/_images/OF_image5_1.png)

Then select ‘Advanced’ and set ‘Use VLAN priority’ to ‘Internetwork Control (6)’

然後選擇“進階”，並將“使用VLAN優先權”設定為“網路互連控制 (6)”。

[![../../_images/OF_image5.png](<../images/2897fbda-OF_image5.png>)](https://docs.opnsense.org/_images/OF_image5.png)

then add the following options in the ‘Send Options’ field

然後在「傳送選項」欄位中新增以下選項

-   ia-pd 0  
    it-pd 0
    
-   raw-option 6 00:0b:00:11:00:17:00:18
    
-   raw-option 15 00:2b:46:53:56:44:53:4c:5f:6c:69:76:65:62:6f:78:2e:49:6e:74:65:72:6e:65:74:2e:73:6f:66:74:61:74:68:6f:6d:65:2e:4c:69:76:65:62:6f:78:36
    
-   raw-option 16 00:00:04:0e:00:05:73:61:67:65:6d
    
-   raw-option 11 00:00:00:00:00:00:00:00:00:00:00:66:74:69:2f:65:77:74:FF:AB:XX:XX (hex conversion of the userid supplied by Orange which looks like fti/xxxxxxx)  
    raw-option 11 00:00:00:00:00:00:00:00:00:00:00:66:74:69:2f:65:77:74:FF:AB:XX:XX （Orange 提供的使用者 ID 的十六進位轉換，格式為 fti/xxxxxxx）
    

Note

注意事項

Use the exact same chain for IPv6 raw-option 11 and IPv4 option-90

IPv6 原始選項 11 和 IPv4 選項 90 使用完全相同的鏈。

Finally set the Identity Association and Prefix interface as shown

最後，按如下所示設定身份關聯和前綴介面。

[![../../_images/OF_image6.png](<../images/9e0f75c7-OF_image6.png>)](https://docs.opnsense.org/_images/OF_image6.png)

Click ‘Save’ and then ‘Apply’.

點擊“儲存”，然後點擊“應用”。

Update IPv6 Gateway

更新 IPv6 網關

Select System ‣ Gateway ‣ Configuration and edit IPv6 gateway to add ‘fe80::ba0:bab’ as IP address

選擇“系統”‣“網關”‣“設定”，然後編輯 IPv6 網關，將“fe80::ba0:bab”新增為IP位址

[![../../_images/OF_image6_1.png](<../images/889e162f-OF_image6_1.png>)](https://docs.opnsense.org/_images/OF_image6_1.png)

## **LAN Interface**｜**LAN接口**

Select Interfaces ‣ \[LAN\] and set IPv4 to “Static IPv4”（靜態 IPv4） and IPv6 Configuration Type to “Track Interface”（軌道介面）.

選擇介面 ‣ \[ LAN \]，並將 IPv4 設定為“Static IPv4”（靜態 IPv4） ，將 IPv6 設定類型設為“Track Interface”（軌道介面） 。

[![../../_images/OF_image7.png](<../images/d49b05b4-OF_image7.png>)](https://docs.opnsense.org/_images/OF_image7.png)

Finally, set the Track IPv6 Interface to WAN and set the IPv4 address to your chosen address.

最後，將追蹤 IPv6 介面設定為WAN ，並將 IPv4 位址設定為您選擇的位址。

Tick ‘Manual Configuration’

勾選“手動配置”

[![../../_images/OF_image8.png](<../images/8a999669-OF_image8.png>)](https://docs.opnsense.org/_images/OF_image8.png)

Click ‘Save’ and then ‘Apply’.

點擊“儲存”，然後點擊“應用”。

Select Services ‣ Router Advertisements On the Lan interface and set as below (use any IPv6 DNS)

選擇“服務”‣“路由器通告”，在 LAN 介面上以下列方式設定（使用任何 IPv6 DNS ）

[![../../_images/OF_image9.png](<../images/8a90e816-OF_image9.png>)](https://docs.opnsense.org/_images/OF_image9.png)

Click ‘Save’

點選“儲存”

It is advisable at this point to reboot the system.

此時建議重啟系統。

## **Troubleshooting**｜**故障排除**

## getting the option-90 chain from the Livebox｜從 Livebox 取得 option-90 鏈

Rarely, the authentication option from the generator doesn’t work, you can instead use the one from the Livebox

在極少數情況下，生成器提供的身份驗證選項會失效，這時您可以改用 Livebox 提供的身份驗證選項。

Plug the WAN interface of the Livebox in your network (green port) Use Wireshark on any other computer in the network and look for DHCP Discover packets

將 Livebox 的WAN介面（綠色連接埠）插入您的網路。在網路中的任何其他電腦上使用 Wireshark 並尋找DHCP Discover 封包。

[![../../_images/OF_image10.png](<../images/be590670-OF_image10.png>)](https://docs.opnsense.org/_images/OF_image10.png)

## decode DHCP packets｜解碼DHCP資料包

In this packet, look for Option: (90) Authentication

在此資料包中，尋找選項：(90) 身份驗證

[![../../_images/OF_image11.png](<../images/bbde6563-OF_image11.png>)](https://docs.opnsense.org/_images/OF_image11.png)

You can copy paste the full option without the first 2 bytes (5a 46) in your WAN configuration

您可以複製貼上完整的選項，但無需複製前兩個位元組（5a 46）到您的WAN配置中。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Deutsche Telekom Germany IPTV (Magenta TV) setup｜德國電信德國IPTV (洋紅色TV ) 設定](<125 德國電信德國IPTV (洋紅色TV ) 設定.md>)　｜　[下一篇：Orange France IPTV setup｜Orange France IPTV設置 ➡](<127 Orange France IPTV設置.md>)
