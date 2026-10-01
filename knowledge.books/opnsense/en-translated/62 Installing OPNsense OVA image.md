---
title: "Installing OPNsense OVA image"
source: "https://docs.opnsense.org/manual/how-tos/installova.html"
chapter: ["Installation and setup","Setup guides"]
order: 62
lang: "en"
translated_by: "native"
captured: "2026-09-26T11:32:11.274Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Installing OPNsense AWS image](<61 Installing OPNsense AWS image.md>)　｜　[下一篇：OPNsense Azure Virtual Appliance ➡](<63 OPNsense Azure Virtual Appliance.md>)

# Installing OPNsense OVA image

> 章節：[Installation and setup](<000 目錄.md#c-5>) › [Setup guides](<000 目錄.md#c-6>)

OPNsense is available as an Open Virtual Appliance (OVA) package, which can be deployed in various virtualization products (e.g. VMWare, Virtualbox).

The image is not provided as a community free download, but can be acquired from Deciso.

In this document we describe the simple steps when deploying in VirtualBox, other supported platforms function quite similar.

## Step 1 - Import appliance

In the top menu, choose File ‣ Import appliance and select the image you downloaded, it should show a dialog like the following.

[![../../_images/ova_import_dialog_1.png](<../images/9ff85f81-ova_import_dialog_1.png>)](https://docs.opnsense.org/_images/ova_import_dialog_1.png)

Just click import, accept the license and the image should be transferred to your machine.

## Step 2 - Network setup

The OVA template comes with two interfaces configured by default (you can add more later if needed). Always choose the right type of network before using OPNsense, the imported adapters might not be assigned to a type after import.

Note

Please be aware that the order of the network cards in the virtualization product may differ from how they are presented to the operating system. In VirtualBox “Adapter 1” seems to connect to WAN (em1)

## Step 3 - Initial configuration

The virtual machine is operational now, initial configuration is performed similar to other setups, as described in [Initial Installation & Configuration](<55 Initial Installation & Configuration.md>).

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Installing OPNsense AWS image](<61 Installing OPNsense AWS image.md>)　｜　[下一篇：OPNsense Azure Virtual Appliance ➡](<63 OPNsense Azure Virtual Appliance.md>)
