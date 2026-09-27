---
title: "無線網路介面（ INTERNAL ）"
title_original: "Interfaces Wireless Networks (INTERNAL)"
source: "https://docs.opnsense.org/manual/how-tos/interface_wireless_internal.html"
chapter: ["Interfaces","Setup Guides","Wireless and Cellular"]
order: 119
lang: "zh-TW"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:32:41.448Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：透明過濾橋](<118 透明過濾橋.md>)　｜　[下一篇：配置蜂巢式調變解調器 ➡](<120 配置蜂巢式調變解調器.md>)

# 無線網路介面（ INTERNAL ）

> 章節：[Interfaces](<000 目錄.md#c-19>) › [Setup Guides](<000 目錄.md#c-21>) › [Wireless and Cellular](<000 目錄.md#c-23>)

## 介面：無線網路（ INTERNAL ）

本頁面介紹如何設定無線介面的接入點模式，以建立您自己的WLAN 。在此模式下，您的筆記型電腦和手持裝置無需外部存取點即可連接到您的OPNsense，適用於家庭和企業環境。對於家庭網絡，請跳過步驟二，並且不要在網路設定中設定802.1X服務。對於外部存取點，只需建立有線網路（通常為乙太網路），並將存取點連接到網路的另一端即可。

警告

FreeBSD 支援無線網路卡的存取點（基礎架構）模式，但此功能僅限於部分驅動程序，並且可能存在一些驅動程式不支援所有可透過 Web 介面存取的選項。為避免這些問題，請確保您購買的無線網卡支援。

注意事項

本指南要求安裝並啟用 FreeRADIUS 外掛程式（透過系統 ‣ 韌體 ‣ 外掛程式和服務 ‣ FreeRADIUS ‣ 常規）。

## 配置

### 步驟 1

建立無線克隆介面並進行指派。

### 步驟 2 - 準備RADIUS

![../../_images/interface_wireless_radius_2.png](<../images/97733a8a-interface_wireless_radius_2.png>)

建立一個新的客戶端，即AP 。例如，將其命名為localhost，選擇一個金鑰，即CIDR 127.0.0.0/8 。該密鑰稍後將在無線設定中使用。

![../../_images/interface_wireless_radius_4.png](<../images/b3db8a78-interface_wireless_radius_4.png>)

接下來，切換到使用者選單並建立新使用者（例如，建立自己的使用者）。使用者名稱和密碼將用於後續的身份驗證。其餘設定可以保留預設值。

### 步驟 3 - 準備WLAN

![../../_images/interface_wireless_radius_1.png](<../images/253f6d77-interface_wireless_radius_1.png>)

|   |   |
| --- | --- |
| 啟用 | 檢查 |
| 描述 | WLAN |
| IPv4 設定類型 | 靜態 IPv4 |

|   |   |
| --- | --- |
| IPv4位址|一個網路|
| IPv4 上游網關 | WLAN |

|   |   |
| --- | --- |
| 保留通用設定 | 勾選（儲存至所有複製） |
| 標準 | 802.11g 或您的適配器支援的其他標準 |
| 監管設定 | 選擇您的國家/地區 |
| 模式 | 接入點 |
| SSID | 無線網路名稱 |
| WEP | 未選取 |
| WPA | 已使用您的PSK （ WLAN密碼，如果需要）進行檢查 |
| WPA模式 | WPA2 |
| WPA金鑰管理模式 | 可擴充身份驗證 |
| 身份驗證 | 開放系統身份驗證 |
| WPA成對 | AES |
| 啟用IEEE802 .1X 驗證 | 勾選是否要使用RADIUS身份驗證 |
| 802.1X 伺服器IP位址 | 127.0.0.1 （若需要RADIUS ） |
| 802.1X 伺服器連接埠 | 1812（如果您需要RADIUS ） |
| 802.1X 伺服器共用金鑰 | 您在步驟 2 中設定的密碼（如果您需要RADIUS ） |

### 第四步 - 連接

注意事項

這是系統特有的－此螢幕截圖適用於安裝了KDE Plasma Workspaces 5 的 Linux 發行版，系統語言設定為德語。

![../../_images/interface_wireless_radius_3.png](<../images/f6dae6fd-interface_wireless_radius_3.png>)

若要連接到網絡，請將安全設定設為“ WPA/WPA2企業版”，並將身分驗證設定設為“受保護的EAP ( PEAP )”。內部驗證應設定為 MSCHAPv2，使用者名稱和密碼是您在RADIUS插件中設定的值。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：透明過濾橋](<118 透明過濾橋.md>)　｜　[下一篇：配置蜂巢式調變解調器 ➡](<120 配置蜂巢式調變解調器.md>)
