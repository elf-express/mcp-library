---
title: "法國橘色FTTH IPv4 和 IPv6"
title_original: "Orange France FTTH IPv4 & IPv6"
source: https://docs.opnsense.org/manual/how-tos/orange_fr_fttp.html
chapter: ["Interfaces","Setup Guides","ISP Configuration"]
order: 126
lang: "zh-TW"
translated_by: "gtx"
captured: "2026-09-26T11:32:45.577Z"
---


# 法國橘色FTTH IPv4 和 IPv6


**作者：** 凱夫威勒斯、大衛尼爾

## **介紹**

本指南適用於Orange France FTTP使用DHCP連接的情況（此方法目前不包括PRO套餐的使用者）。

該指南僅涉及網路連線。此處不涉及TV或電話的設定。

## **準備建立連線**

Orange 要求經 VLAN 832 配置 WAN。因此第一步是在預期的 WAN 網卡上設定 VLAN，如下所示 Interfaces ‣ Devices ‣ VLAN

[圖：../../_images/OF_image0.png](https://docs.opnsense.org/_images/OF_image0.png)

因此 WAN 介面分配應該如下所示。

[圖：../../_images/OF_image1.png](https://docs.opnsense.org/_images/OF_image1.png)

最後，設定 IPv6 的 DUID WAN 介面 Interfaces ‣ Settings

[圖：../../_images/OF_image1.1.png](https://docs.opnsense.org/_images/OF_image1.1.png)

注意事項

您可以使用WAN介面的mac位址（不一定是LiveboxMAC位址）-00:03:00:01:01:XX:XX:XX:XX:XX:XX，其中XX是MAC位址

## **配置WAN介面**

為了建立 IPv4 和 IPv6 連接，Orange 要求分別為 DHCP 和 DHCP6 請求傳遞正確的參數

在常規配置中選擇選項DHCP和DHCPv6

[圖：../../_images/OF_image2.png](https://docs.opnsense.org/_images/OF_image2.png)

**在DHCP請求中，要求透過以下內容：**

-   dhcp 類別標識符“薩基姆”
    
-   用戶級“+FSVDSL\_livebox.Internet.softathome.Livebox6”
    
-   option-90 00:00:00:00:00:00:00:00:00:00:00:66:74:69:2f:65:77:74:FF:AB:XX:XX（Orange 提供的使用者 ID 的十六進位轉換，看起來像 fti/xxxxxxx）
    
-   dhcp-client-identifier 01:XX:XX:XX:XX:XX:XX（您MUST對XX:XX使用與上述DUID相同的MAC地址）
    

注意事項

您可以使用此工具產生選項90鏈：[https://jsfiddle.net/kgersen/3mnsc6wy/](https://jsfiddle.net/kgersen/3mnsc6wy/)

這些參數應在其 WAN DHCP 請求的「傳送選項」區域中作為逗號分隔選項傳遞

[圖：../../_images/OF_image3.png](https://docs.opnsense.org/_images/OF_image3.png)

注意事項

需要指定以下“請求選項”

-   子網路遮罩
    
-   廣播位址
    
-   DHCP 租用時間
    
-   DHCP 續訂時間
    
-   dhcp 重新綁定時間
    
-   網域搜尋、路由器
    
-   網域名稱伺服器
    
-   選項90
    
-   網域
    
-   選項-120
    
-   選項125
    

這些參數應在其 WAN DHCP 請求的「請求選項」區域中作為逗號分隔選項傳遞

橘色要求DHCP和DHCP6請求的VLAN-PCP為6。這可以透過「使用VLAN優先權」介面設定來完成。確保同時為 DHCP 和 DHCP6 設定此項目。

[圖：../../_images/OF_image4.png](https://docs.opnsense.org/_images/OF_image4.png)

在 DHCP6 請求中，我們需要使用原始選項

首先選擇「基本」並勾選「僅請求 IPv6 前綴」並將「前綴委託大小」設為 56

[圖：../../_images/OF_image5_1.png](https://docs.opnsense.org/_images/OF_image5_1.png)

然後選擇“高級”並將“使用VLAN優先權”設定為“互聯網控制（6）”

[圖：../../_images/OF_image5.png](https://docs.opnsense.org/_images/OF_image5.png)

然後在「傳送選項」欄位中新增以下選項

-   ia-pd 0
    
-   原始選項 6 00:0b:00:11:00:17:00:18
    
-   原始選項 15 00:2b:46:53:56:44:53:4c:5f:6c:69:76:65:62:6f:78:2e:49:6e:74:65:72:6e:65:74:2e:73:6f:66:74:61:74:68:6f:6d:65:2e:4c:69:76:65:62:6f:78:36
    
-   原始選項 16 00:00:04:0e:00:05:73:61:67:65:6d
    
-   raw-option 11 00:00:00:00:00:00:00:00:00:00:00:66:74:69:2f:65:77:74:FF:AB:XX:XX（Orange 提供的使用者 ID 的十六進位轉換，看起來像 fti/xxxxxxx）
    

注意事項

對 IPv6 raw-option 11 和 IPv4 option-90 使用完全相同的鏈

最後設定Identity Association和Prefix介面如圖

[圖：../../_images/OF_image6.png](https://docs.opnsense.org/_images/OF_image6.png)

點擊“儲存”，然後點擊“應用”。

更新 IPv6 網關

選擇 System ‣ Gateway ‣ Configuration 並編輯 IPv6 閘道以新增 ‘fe80::ba0:bab’ 為 IP 位址

[圖：../../_images/OF_image6_1.png](https://docs.opnsense.org/_images/OF_image6_1.png)

## **LAN接口**

選擇 Interfaces ‣ \[LAN\] 並將 IPv4 設定為“靜態 IPv4”，將 IPv6 設定類型設定為“追蹤介面”。

[圖：../../_images/OF_image7.png](https://docs.opnsense.org/_images/OF_image7.png)

最後，將追蹤 IPv6 介面設定為WAN，並將 IPv4 位址設定為您選擇的位址。

勾選“手動配置”

[圖：../../_images/OF_image8.png](https://docs.opnsense.org/_images/OF_image8.png)

點擊“儲存”，然後點擊“應用”。

在 Lan 介面上選擇 Services ‣ Router Advertising 並設定如下（使用任何 IPv6 DNS）

[圖：../../_images/OF_image9.png](https://docs.opnsense.org/_images/OF_image9.png)

點選“儲存”

此時建議重啟系統。

## **故障排除**

## 從 Livebox 取得 option-90 鏈

在極少數情況下，生成器的身份驗證選項不起作用，您可以使用 Livebox 中的身份驗證選項

將 Livebox 的 WAN 介面插入您的網路（綠色連接埠） 在網路中的任何其他電腦上使用 Wireshark 並尋找 DHCP 發現封包

[圖：../../_images/OF_image10.png](https://docs.opnsense.org/_images/OF_image10.png)

## 解碼DHCP資料包

在此資料包中，尋找選項：(90) 身份驗證

[圖：../../_images/OF_image11.png](https://docs.opnsense.org/_images/OF_image11.png)

您可以在 WAN 配置中複製貼上完整選項，而無需前 2 個位元組 (5a 46)

---

