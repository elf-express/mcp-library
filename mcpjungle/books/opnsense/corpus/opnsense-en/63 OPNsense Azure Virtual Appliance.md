---
title: "OPNsense Azure Virtual Appliance"
source: https://docs.opnsense.org/manual/how-tos/installazure.html
chapter: ["Installation and setup","Setup guides"]
order: 63
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:32:11.791Z"
---

# OPNsense Azure Virtual Appliance

OPNsense is a fully featured security platform that secures your network with high-end features such as inline intrusion prevention, virtual private networking, two factor authentication, captive portal and filtering web proxy. The optional high availability setup ensures stable network performance with automatic failover and synchronised states, minimising disruption. Keep your network secure and the good packets flowing.

The Virtual Appliance is available on the Microsoft Azure Marketplace ([here](https://azuremarketplace.microsoft.com/en-en/marketplace/apps/decisosalesbv.opnsense?tab=Overview)).

[圖](https://docs.opnsense.org/_images/azure_offer.png)

Our installation manual will guide you through a simple installation scenario using 1 network interface, for more advanced network setups you best checkout the Azure [documentation](https://docs.microsoft.com/en-en/azure/virtual-machines/linux/multiple-nics).

## Setup : Basic settings

The Marketplace create button guides you to the initial virtual machine setup, choose your subscription and system preferences here and name your virtual machine.

[圖](https://docs.opnsense.org/_images/azure_deploy_basics.png)

Next make sure you create an initial administrative user, since some names are reserved (like admin and root), you need to choose another one here. In our example we choose `adm001` here.

Note

You can enable the root user after installation, the setup user can access the system using ssh or https after installation todo so.

[圖](https://docs.opnsense.org/_images/azure_deploy_basics_user.png)

## Setup : Disks

Next you can choose a disk type to use, **standard SSD** is fast enough for most workloads.

[圖](https://docs.opnsense.org/_images/azure_deploy_disks.png)

## Setup : Network

For our example, we kept our settings simple using a **private IP** which is accessible over port **443 (https)** after bootup. Most settings can be changed after deployment.

[圖](https://docs.opnsense.org/_images/azure_deploy_network.png)

Note

Microsoft has quite some information available about different networking settings and options [here](https://docs.microsoft.com/en-en/azure/virtual-machines/windows/network-overview)

## Create

Proceed to **Review + create** to finalize the deployment.

## Login to your instance

When the virtual machine is created and booted for the first time, you can login using the assigned user (`adm001`), now you can enable the root user if you like in System -> Access -> Users

[圖](https://docs.opnsense.org/_images/azure_startup_users.png)

Note

Our Azure virtual appliance has ssh enabled by default, you can change these settings in System -> Settings -> Administration