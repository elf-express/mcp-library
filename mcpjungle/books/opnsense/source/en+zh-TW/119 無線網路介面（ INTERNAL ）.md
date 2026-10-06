---
title: "Interfaces Wireless Networks (INTERNAL)｜無線網路介面（ INTERNAL ）"
title_original: "Interfaces Wireless Networks (INTERNAL)"
source: "https://docs.opnsense.org/manual/how-tos/interface_wireless_internal.html"
chapter: ["Interfaces","Setup Guides","Wireless and Cellular"]
order: 119
lang: "bilingual"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:32:41.448Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Transparent Filtering Bridge｜透明過濾橋](<118 透明過濾橋.md>)　｜　[下一篇：Configuring Cellular Modems｜配置蜂巢式調變解調器 ➡](<120 配置蜂巢式調變解調器.md>)

# Interfaces Wireless Networks (INTERNAL)｜無線網路介面（ INTERNAL ）

> 章節：[Interfaces](<000 目錄.md#c-19>) › [Setup Guides](<000 目錄.md#c-21>) › [Wireless and Cellular](<000 目錄.md#c-23>)

## Interfaces: Wireless Networks (INTERNAL)｜介面：無線網路（ INTERNAL ）

This page is about setting up a wireless interface in access point mode to create your own WLAN. In this mode, your Laptops and handhelds can connect to your OPNsense without an external access point for home and enterprise environments. For home networks step over step two and don’t setup the 802.1X service in the network settings. For external access point, just create a cabled network (usually Ethernet) and connect the access point to the other end.

本頁面介紹如何設定無線介面的接入點模式，以建立您自己的WLAN 。在此模式下，您的筆記型電腦和手持裝置無需外部存取點即可連接到您的OPNsense，適用於家庭和企業環境。對於家庭網絡，請跳過步驟二，並且不要在網路設定中設定802.1X服務。對於外部存取點，只需建立有線網路（通常為乙太網路），並將存取點連接到網路的另一端即可。

Warning

警告

FreeBSD supports wireless adapters in access point (infrastructure) mode, but this functionality is limited to some drivers and there may be some, which do not support all options available via the web interface. Please make sure that you buy a wireless card that is supported to avoid these problems.

FreeBSD 支援無線網路卡的存取點（基礎架構）模式，但此功能僅限於部分驅動程序，並且可能存在一些驅動程式不支援所有可透過 Web 介面存取的選項。為避免這些問題，請確保您購買的無線網卡支援。

Note

注意事項

This guide requires the FreeRADIUS plugin to be installed and enabled (via System ‣ Firmware ‣ Plugins and Services ‣ FreeRADIUS ‣ General) .

本指南要求安裝並啟用 FreeRADIUS 外掛程式（透過系統 ‣ 韌體 ‣ 外掛程式和服務 ‣ FreeRADIUS ‣ 常規）。

## Configuration｜配置

### Step 1｜步驟 1

Create a wireless clone interface and assign it.

建立無線克隆介面並進行指派。

### Step 2 - Prepare RADIUS｜步驟 2 - 準備RADIUS

![../../_images/interface_wireless_radius_2.png](<../images/97733a8a-interface_wireless_radius_2.png>)

Create a new client, which is the AP. For example, name it localhost, choose a secret and the CIDR 127.0.0.0/8. The secret is later used in the wireless settings.

建立一個新的客戶端，即AP 。例如，將其命名為localhost，選擇一個金鑰，即CIDR 127.0.0.0/8 。該密鑰稍後將在無線設定中使用。

![../../_images/interface_wireless_radius_4.png](<../images/b3db8a78-interface_wireless_radius_4.png>)

Next, switch to the users menu and create a new user (for example for yourself). The username and the password are used to authenticate later. The rest of the settings can be left on their defaults.

接下來，切換到使用者選單並建立新使用者（例如，建立自己的使用者）。使用者名稱和密碼將用於後續的身份驗證。其餘設定可以保留預設值。

### Step 3 - Prepare WLAN｜步驟 3 - 準備WLAN

![../../_images/interface_wireless_radius_1.png](<../images/253f6d77-interface_wireless_radius_1.png>)

|   |   |
| --- | --- |
| Enable<br>啟用 | Check<br>檢查 |
| Description<br>描述 | WLAN |
| IPv4 Configuration Type<br>IPv4 設定類型 | Static IPv4<br>靜態 IPv4 |

|   |   |
| --- | --- |
| IPv4 address<br>IPv4位址 | A network<br>一個網路 |
| IPv4 Upstream Gateway<br>IPv4 上游網關 | WLAN |

|   |   |
| --- | --- |
| Persist common settings<br>保留通用設定 | Check (save for all clones)<br>勾選（儲存至所有複製） |
| Standard<br>標準 | 802.11g or another standard your adapter supports<br>802.11g 或您的適配器支援的其他標準 |
| Regulatory settings<br>監管設定 | Choose your country<br>選擇您的國家/地區 |
| Mode<br>模式 | Access Point<br>接入點 |
| SSID | Name of the wireless network<br>無線網路名稱 |
| WEP | Unchecked<br>未選取 |
| WPA | Checked with your PSK (WLAN password if wanted)<br>已使用您的PSK （ WLAN密碼，如果需要）進行檢查 |
| WPA Mode<br>WPA模式 | WPA2 |
| WPA Key Management Mode<br>WPA金鑰管理模式 | Extensible Authentication<br>可擴充身份驗證 |
| Authentication<br>身份驗證 | Open System Authentication<br>開放系統身份驗證 |
| WPA Pairwise<br>WPA成對 | AES |
| Enable IEEE802.1X Authentication<br>啟用IEEE802 .1X 驗證 | Check if you want to use RADIUS authentication<br>勾選是否要使用RADIUS身份驗證 |
| 802.1X Server IP Address<br>802.1X 伺服器IP位址 | 127.0.0.1 (if you want RADIUS)<br>127.0.0.1 （若需要RADIUS ） |
| 802.1X Server Port<br>802.1X 伺服器連接埠 | 1812 (if you want RADIUS)<br>1812（如果您需要RADIUS ） |
| 802.1X Server Shared Secret<br>802.1X 伺服器共用金鑰 | The password you configured in step 2 (if you want RADIUS)<br>您在步驟 2 中設定的密碼（如果您需要RADIUS ） |

### Step 4 - Connect｜第四步 - 連接

Note

注意事項

This is system specific - this screenshot is for a Linux distribution with KDE Plasma Workspaces 5, with the system language set to German.

這是系統特有的－此螢幕截圖適用於安裝了KDE Plasma Workspaces 5 的 Linux 發行版，系統語言設定為德語。

![../../_images/interface_wireless_radius_3.png](<../images/f6dae6fd-interface_wireless_radius_3.png>)

To connect to the network, set the security setting to “WPA/WPA2 Enterprise” and the authentication setting to “Protected EAP (PEAP)”. The inner authentication should be set to MSCHAPv2, and the username and password are the ones you set up in the RADIUS plugin.

若要連接到網絡，請將安全設定設為“ WPA/WPA2企業版”，並將身分驗證設定設為“受保護的EAP ( PEAP )”。內部驗證應設定為 MSCHAPv2，使用者名稱和密碼是您在RADIUS插件中設定的值。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Transparent Filtering Bridge｜透明過濾橋](<118 透明過濾橋.md>)　｜　[下一篇：Configuring Cellular Modems｜配置蜂巢式調變解調器 ➡](<120 配置蜂巢式調變解調器.md>)
