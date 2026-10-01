---
title: "Installing OPNsense OVA image｜安裝 OPNsense OVA鏡像"
title_original: "Installing OPNsense OVA image"
source: "https://docs.opnsense.org/manual/how-tos/installova.html"
chapter: ["Installation and setup","Setup guides"]
order: 62
lang: "bilingual"
translated_by: "google_v2"
captured: "2026-09-26T11:32:11.274Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Installing OPNsense AWS image｜安裝 OPNsense AWS鏡像](<61 安裝 OPNsense AWS鏡像.md>)　｜　[下一篇：OPNsense Azure Virtual Appliance｜OPNsense Azure虛擬設備 ➡](<63 OPNsense Azure虛擬設備.md>)

# Installing OPNsense OVA image｜安裝 OPNsense OVA鏡像

> 章節：[Installation and setup](<000 目錄.md#c-5>) › [Setup guides](<000 目錄.md#c-6>)

OPNsense is available as an Open Virtual Appliance (OVA) package, which can be deployed in various virtualization products (e.g. VMWare, Virtualbox).

OPNsense 以開放虛擬設備 ( OVA ) 軟體包的形式提供，可部署在各種虛擬化產品（例如 VMWare、Virtualbox）中。

The image is not provided as a community free download, but can be acquired from Deciso.

該圖片並非作為社區免費下載提供，但可以從 Deciso 獲取。

In this document we describe the simple steps when deploying in VirtualBox, other supported platforms function quite similar.

本文檔介紹了在 VirtualBox 中部署的簡單步驟，其他受支援的平台的操作也十分類似。

## Step 1 - Import appliance｜步驟 1 - 導入電器

In the top menu, choose File ‣ Import appliance and select the image you downloaded, it should show a dialog like the following.

在頂部選單中，選擇“檔案”‣“匯入裝置”，然後選擇您下載的映像，應該會顯示下列對話方塊。

[![../../_images/ova_import_dialog_1.png](<../images/9ff85f81-ova_import_dialog_1.png>)](https://docs.opnsense.org/_images/ova_import_dialog_1.png)

Just click import, accept the license and the image should be transferred to your machine.

點擊匯入，接受許可協議，圖像就會傳輸到您的電腦。

## Step 2 - Network setup｜步驟 2 - 網路設置

The OVA template comes with two interfaces configured by default (you can add more later if needed). Always choose the right type of network before using OPNsense, the imported adapters might not be assigned to a type after import.

OVA範本預設配置了兩個介面（如有需要，您可以稍後新增更多介面）。使用 OPNsense 前，請務必選擇正確的網路類型，匯入的適配器在匯入後可能不會自動分配類型。

Note

注意事項

Please be aware that the order of the network cards in the virtualization product may differ from how they are presented to the operating system. In VirtualBox “Adapter 1”（適配器 1） seems to connect to WAN (em1)

請注意，虛擬化產品中網路卡的順序可能與作業系統中顯示的順序不同。在 VirtualBox 中“Adapter 1”（適配器 1）似乎連接到WAN (em1)。

## Step 3 - Initial configuration｜步驟 3 - 初始配置

The virtual machine is operational now, initial configuration is performed similar to other setups, as described in [Initial Installation & Configuration](<55 初始安裝和配置.md>).

虛擬機器現在可以運行了，初始配置與其他設定類似，如[初始安裝和配置](<55 初始安裝和配置.md>)中所述。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Installing OPNsense AWS image｜安裝 OPNsense AWS鏡像](<61 安裝 OPNsense AWS鏡像.md>)　｜　[下一篇：OPNsense Azure Virtual Appliance｜OPNsense Azure虛擬設備 ➡](<63 OPNsense Azure虛擬設備.md>)
