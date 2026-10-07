---
title: "OPNsense Azure虛擬設備"
title_original: "OPNsense Azure Virtual Appliance"
source: https://docs.opnsense.org/manual/how-tos/installazure.html
chapter: ["Installation and setup","Setup guides"]
order: 63
lang: "zh-TW"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:32:11.791Z"
---

# OPNsense Azure虛擬設備

OPNsense 是一款功能齊全的安全平台，它利用內聯入侵防禦、虛擬專用網路 (VPN)、雙重認證、強制入口網站和過濾式 Web 代理程式等高階功能，為您的網路提供全方位保護。選購的高可用性配置可確保網路效能穩定，實現自動故障轉移和狀態同步，最大限度地減少中斷。保障您的網路安全，確保資料包暢通無阻。

虛擬裝置可在 Microsoft Azure Marketplace 上購買（[此處](https://azuremarketplace.microsoft.com/en-en/marketplace/apps/decisosalesbv.opnsense?tab=Overview) ）。

[圖](https://docs.opnsense.org/_images/azure_offer.png)

我們的安裝手冊將引導您完成使用 1 個網路介面的簡單安裝場景，對於更進階的網路設置，您最好查看 Azure [文件](https://docs.microsoft.com/en-en/azure/virtual-machines/linux/multiple-nics) 。

## 設定：基本設定

Marketplace 建立按鈕會引導您完成初始虛擬機器設置，在這裡選擇您的訂閱和系統首選項，並為您的虛擬機器命名。

[圖](https://docs.opnsense.org/_images/azure_deploy_basics.png)

接下來，請確保建立初始管理員用戶，因為某些名稱已保留（例如 admin 和 root），所以您需要選擇另一個名稱。在我們的範例中，我們選擇`adm001` 。

注意事項

安裝完成後，您可以啟用 root 用戶，安裝完成後，設定用戶可以使用 ssh 或 https 存取系統來執行此操作。

[圖](https://docs.opnsense.org/_images/azure_deploy_basics_user.png)

## 安裝：磁碟

接下來您可以選擇要使用的磁碟類型，**標準SSD** 對於大多數工作負載來說速度足夠快。

[圖](https://docs.opnsense.org/_images/azure_deploy_disks.png)

## 設定：網路

對於我們的範例，我們使用 **私有 IP**來保持設定簡單，啟動後可透過連接埠**443 (https)** 存取。大多數設定可以在部署後更改。

[圖](https://docs.opnsense.org/_images/azure_deploy_network.png)

注意事項

微軟提供了大量關於不同網路設定和選項的資訊[此處](https://docs.microsoft.com/en-en/azure/virtual-machines/windows/network-overview)

## 創造

接下來執行**審核+建立**以完成部署。

## 登入您的實例

虛擬機器建立並首次啟動後，您可以使用指派的使用者（ `adm001` ）登入。現在，您可以根據需要啟用 root 用戶，方法是：系統 -> 存取 -> 用戶

[圖](https://docs.opnsense.org/_images/azure_startup_users.png)

注意事項

我們的 Azure 虛擬設備預設啟用 SSH，您可以在「系統」->「設定」->「管理」中變更這些設定。