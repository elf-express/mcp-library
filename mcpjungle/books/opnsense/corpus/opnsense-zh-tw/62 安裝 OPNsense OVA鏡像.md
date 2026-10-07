---
title: "安裝 OPNsense OVA鏡像"
title_original: "Installing OPNsense OVA image"
source: https://docs.opnsense.org/manual/how-tos/installova.html
chapter: ["Installation and setup","Setup guides"]
order: 62
lang: "zh-TW"
translated_by: "google_v2"
captured: "2026-09-26T11:32:11.274Z"
---

# 安裝 OPNsense OVA鏡像

OPNsense 以 Open Virtual Appliance ( OVA ) 軟體套件的形式提供，可部署在各種虛擬化產品（例如 VMWare、Virtualbox）中。

該圖片並非作為社區免費下載提供，但可以從 Deciso 獲取。

本文檔介紹了在 VirtualBox 中部署的簡單步驟，其他受支援的平台的操作也十分類似。

## 步驟 1 - 導入電器

在頂部選單中，選擇“檔案”‣“匯入裝置”，然後選擇您下載的映像，應該會顯示下列對話方塊。

[圖](https://docs.opnsense.org/_images/ova_import_dialog_1.png)

點擊匯入，接受許可協議，圖像就會傳輸到您的電腦。

## 步驟 2 - 網路設置

OVA範本預設配置了兩個介面（如有需要，您可以稍後新增更多介面）。使用 OPNsense 前，請務必選擇正確的網路類型，匯入的適配器在匯入後可能不會自動分配類型。

注意事項

請注意，虛擬化產品中網路卡的順序可能與作業系統中顯示的順序不同。在 VirtualBox 中，「適配器 1」似乎連接到WAN (em1)。

## 步驟 3 - 初始配置

虛擬機器現在可以運行了，初始配置與其他設定類似，如[初始安裝和配置](<55 初始安裝和配置.md>)中所述。