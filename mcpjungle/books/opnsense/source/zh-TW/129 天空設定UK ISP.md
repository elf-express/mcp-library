---
title: "天空設定UK ISP"
title_original: "Setup for Sky UK ISP"
source: "https://docs.opnsense.org/manual/how-tos/SkyUK.html"
chapter: ["Interfaces","Setup Guides","ISP Configuration"]
order: 129
lang: "zh-TW"
translated_by: "gtx"
captured: "2026-09-26T11:32:47.587Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：SFRRED 法國 FTTH IPv4 & IPv6 & 電話](<128 SFRRED 法國 FTTH IPv4 & IPv6 & 電話.md>)　｜　[下一篇：防火牆 ➡](<130 防火牆.md>)

# 天空設定UK ISP

> 章節：[Interfaces](<000 目錄.md#c-19>) › [Setup Guides](<000 目錄.md#c-21>) › [ISP Configuration](<000 目錄.md#c-25>)

**原作者：**馬丁沃斯利

## **介紹**

本文檔介紹了 Sky UK VDSL 連接上的 OPNsense 設定。

Sky 使用簡單的 IPoE 連接，所需要的只是在橋接模式下合適的數據機。如果使用標準 OpenReach 數據機，則數據機本身不需要任何設定。

## **WAN接口**

將 IPv4 和 IPv6 設定類型分別設定為DHCP 和 DHCPv6。

[![../../_images/skyuk_wan_1.png](<../images/a9e1397c-skyuk_wan_1.png>)](https://docs.opnsense.org/_images/skyuk_wan_1.png)

## **選項 61 - dhcp 客戶端識別碼**

我們現在需要發送 Sky 登入憑證。使用VDSL時，我們不需要使用特定的憑證，只要它們的格式正確就可以了。

在DHCP客戶端配置下選擇進階按鈕。

[![../../_images/skyuk_lan_2.png](<../images/dcd64640-skyuk_lan_2.png>)](https://docs.opnsense.org/_images/skyuk_lan_2.png)

有一個條目“發送選項”，在此輸入使用者名稱和密碼，格式為：

dhcp-客戶端識別碼“[使用者\_ID@skydsl|密碼](mailto:user_ID%40skydsl|password)”

據說 option61 字串中發送的內容並不重要，只要發送了一些內容，我更喜歡安全起見，所以請堅持如圖所示的格式。例如，下面的程式碼將會非常愉快地工作。

dhcp-客戶端標識符“[12345678@skydsl|12345678](mailto:12345678%40skydsl|12345678)”

ID的另一部分稱為Option60，對於是否還需要它有不同的想法，包含它沒有什麼壞處，所以我們會這樣做。

dhcp 類別標識符“7.16a4N\_UNI|PCBAFAST2504Nv1.0”

因此，「租賃要求」發送選項的完整條目為：

*dhcp-client-identifier“12345678@skydsl | 12345678”，dhcp-class-identifier“7.16a4N \ _UNI | PCBAFAST2504Nv1.0”*

下一步是設定 DHCPv6 所需的參數，這些參數位於如下所示的WAN 介面的 DHCPv6 用戶端設定部分。

[![../../_images/skyuk_wan_2.png](<../images/7b86f455-skyuk_wan_2.png>)](https://docs.opnsense.org/_images/skyuk_wan_2.png)

Sky 提供 /56 IPv6 委派，他們不在WAN 介面上提供全域 IPv6 位址，這只是連結本地。前綴委託大小應設定為 56。

點擊“儲存”和“應用”

唯一的其他要求可以在IPV6 DHCP下的介面：設定選單中找到。 “阻止釋放”選項。

[![../../_images/skyuk_dhcp6c_interface_settings.png](<../images/4259ec7a-skyuk_dhcp6c_interface_settings.png>)](https://docs.opnsense.org/_images/skyuk_dhcp6c_interface_settings.png)

這是因為 Sky DHCPv6 伺服器使用「黏性」位址。如果 OPNsense dhcp6 用戶端向伺服器發送釋放訊號，則分配的前綴很可能會更改，因此此設定以及「DHCP唯一識別碼」設定將嘗試減輕此風險。

輸入這些設定後，按一下“儲存”，然後按一下“應用”。

## **DHCP 唯一識別碼**

儘管 OPNsense 儲存 IPv6 DUID，但它可能會遺失，這可能會再次導致給出新的前綴，因此介面：設定選單中提供了輸入和儲存 DUID 的選項。

[![../../_images/skyuk_wan_3.png](<../images/80d496a2-skyuk_wan_3.png>)](https://docs.opnsense.org/_images/skyuk_wan_3.png)

標識符可以手動輸入，或者如果使用者點擊「i」圖標，則可以透過點擊「在此處插入現有的 DUID」圖例，將現有的 DUID 自動輸入到欄位中。

點選“儲存”。

## **LAN 接口**

LAN 介面 Ipv4 位址應該在系統初始安裝時設置，如果沒有，則可以在 Interfaces:\[LAN\] 選單中調整LAN 設定。

我建議不要使用私有子網範圍192.168.\*.0，因為該範圍經常被酒店和其他公共網絡用於訪問，這可能會在使用VPN時導致問題。我首選的地址方法是使用 10.\*.\*.0 子網，其中第二個和第三個四位組是出生日期或其他一些容易記住的數字。即 10.1.11.0 是 11 月 1 日。這更加隨機，並且在公共網路上出現相同範圍的機會大大減少，但是位址範圍很容易記住。

[![../../_images/ZenUK_image3.png](<../images/0cbc37be-ZenUK_image3.png>)](https://docs.opnsense.org/_images/ZenUK_image3.png) [![../../_images/skyuk_lan_1.png](<../images/30835279-skyuk_lan_1.png>)](https://docs.opnsense.org/_images/skyuk_lan_1.png)

一旦設定了 LAN IPv4 位址，LAN 介面中剩下的就是將介面設定為使用已指派的 IPv6 前綴。

將追蹤 IPv6 介面設定為WAN，除非有本文檔未涵蓋的特殊要求，否則將 IPv6 前綴ID 設定為 0。

[![../../_images/ZenUK_image4.png](<../images/c07b0597-ZenUK_image4.png>)](https://docs.opnsense.org/_images/ZenUK_image4.png)

點擊“儲存”，然後點擊“應用”。

本文檔未介紹如何設定 IPv4 DHCP 伺服器，但這是必要的。

此時建議重啟系統。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：SFRRED 法國 FTTH IPv4 & IPv6 & 電話](<128 SFRRED 法國 FTTH IPv4 & IPv6 & 電話.md>)　｜　[下一篇：防火牆 ➡](<130 防火牆.md>)
