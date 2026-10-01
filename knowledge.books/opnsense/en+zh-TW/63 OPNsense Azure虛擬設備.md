---
title: "OPNsense Azure Virtual Appliance｜OPNsense Azure虛擬設備"
title_original: "OPNsense Azure Virtual Appliance"
source: "https://docs.opnsense.org/manual/how-tos/installazure.html"
chapter: ["Installation and setup","Setup guides"]
order: 63
lang: "bilingual"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:32:11.791Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Installing OPNsense OVA image｜安裝 OPNsense OVA鏡像](<62 安裝 OPNsense OVA鏡像.md>)　｜　[下一篇：Official hardware｜官方硬體 ➡](<64 官方硬體.md>)

# OPNsense Azure Virtual Appliance｜OPNsense Azure虛擬設備

> 章節：[Installation and setup](<000 目錄.md#c-5>) › [Setup guides](<000 目錄.md#c-6>)

OPNsense is a fully featured security platform that secures your network with high-end features such as inline intrusion prevention, virtual private networking, two factor authentication, captive portal and filtering web proxy. The optional high availability setup ensures stable network performance with automatic failover and synchronised states, minimising disruption. Keep your network secure and the good packets flowing.

OPNsense 是一款功能齊全的安全平台，它利用內聯入侵防禦、虛擬專用網路 (VPN)、雙重認證、強制入口網站和過濾式 Web 代理程式等高階功能，為您的網路提供全方位保護。選購的高可用性配置可確保網路效能穩定，實現自動故障轉移和狀態同步，最大限度地減少中斷。保障您的網路安全，確保資料包暢通無阻。

The Virtual Appliance is available on the Microsoft Azure Marketplace ([here](https://azuremarketplace.microsoft.com/en-en/marketplace/apps/decisosalesbv.opnsense?tab=Overview)).

虛擬裝置可在 Microsoft Azure Marketplace 上購買（[此處](https://azuremarketplace.microsoft.com/en-en/marketplace/apps/decisosalesbv.opnsense?tab=Overview) ）。

[![../../_images/azure_offer.png](<../images/18ab8746-azure_offer.png>)](https://docs.opnsense.org/_images/azure_offer.png)

Our installation manual will guide you through a simple installation scenario using 1 network interface, for more advanced network setups you best checkout the Azure [documentation](https://docs.microsoft.com/en-en/azure/virtual-machines/linux/multiple-nics).

我們的安裝手冊將引導您完成使用 1 個網路介面的簡單安裝場景，對於更進階的網路設置，您最好查看 Azure [文件](https://docs.microsoft.com/en-en/azure/virtual-machines/linux/multiple-nics) 。

## Setup : Basic settings｜設定：基本設定

The Marketplace create button guides you to the initial virtual machine setup, choose your subscription and system preferences here and name your virtual machine.

Marketplace 建立按鈕會引導您完成初始虛擬機器設置，在這裡選擇您的訂閱和系統首選項，並為您的虛擬機器命名。

[![../../_images/azure_deploy_basics.png](<../images/7e70f8c3-azure_deploy_basics.png>)](https://docs.opnsense.org/_images/azure_deploy_basics.png)

Next make sure you create an initial administrative user, since some names are reserved (like admin and root), you need to choose another one here. In our example we choose `adm001` here.

接下來，請確保建立初始管理員用戶，因為某些名稱已保留（例如 admin 和 root），所以您需要選擇另一個名稱。在我們的範例中，我們選擇`adm001` 。

Note

注意事項

You can enable the root user after installation, the setup user can access the system using ssh or https after installation todo so.

安裝完成後，您可以啟用 root 用戶，安裝完成後，設定用戶可以使用 ssh 或 https 存取系統來執行此操作。

[![../../_images/azure_deploy_basics_user.png](<../images/71a9a1a1-azure_deploy_basics_user.png>)](https://docs.opnsense.org/_images/azure_deploy_basics_user.png)

## Setup : Disks｜安裝：磁碟

Next you can choose a disk type to use, **standard SSD** is fast enough for most workloads.

接下來您可以選擇要使用的磁碟類型，**標準SSD** 對於大多數工作負載來說速度足夠快。

[![../../_images/azure_deploy_disks.png](<../images/10af82e8-azure_deploy_disks.png>)](https://docs.opnsense.org/_images/azure_deploy_disks.png)

## Setup : Network｜設定：網路

For our example, we kept our settings simple using a **private IP** which is accessible over port **443 (https)** after bootup. Most settings can be changed after deployment.

對於我們的範例，我們使用 **私有 IP**來保持設定簡單，啟動後可透過連接埠**443 (https)** 存取。大多數設定可以在部署後更改。

[![../../_images/azure_deploy_network.png](<../images/0c3b8dc8-azure_deploy_network.png>)](https://docs.opnsense.org/_images/azure_deploy_network.png)

Note

注意事項

Microsoft has quite some information available about different networking settings and options [here](https://docs.microsoft.com/en-en/azure/virtual-machines/windows/network-overview)

微軟提供了大量關於不同網路設定和選項的資訊[此處](https://docs.microsoft.com/en-en/azure/virtual-machines/windows/network-overview)

## Create｜創造

Proceed to **Review + create** to finalize the deployment.

接下來執行**審核+建立**以完成部署。

## Login to your instance｜登入您的實例

When the virtual machine is created and booted for the first time, you can login using the assigned user (`adm001`), now you can enable the root user if you like in System -> Access -> Users

虛擬機器建立並首次啟動後，您可以使用指派的使用者（ `adm001` ）登入。現在，您可以根據需要啟用 root 用戶，方法是：系統 -> 存取 -> 用戶

[![../../_images/azure_startup_users.png](<../images/20071c86-azure_startup_users.png>)](https://docs.opnsense.org/_images/azure_startup_users.png)

Note

注意事項

Our Azure virtual appliance has ssh enabled by default, you can change these settings in System -> Settings -> Administration

我們的 Azure 虛擬設備預設啟用 SSH，您可以在「系統」->「設定」->「管理」中變更這些設定。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Installing OPNsense OVA image｜安裝 OPNsense OVA鏡像](<62 安裝 OPNsense OVA鏡像.md>)　｜　[下一篇：Official hardware｜官方硬體 ➡](<64 官方硬體.md>)
