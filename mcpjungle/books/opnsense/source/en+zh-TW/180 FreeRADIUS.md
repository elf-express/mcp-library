---
title: "FreeRADIUS"
source: "https://docs.opnsense.org/manual/how-tos/freeradius.html"
chapter: ["Community Plugins","Other"]
order: 180
lang: "bilingual"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:33:12.023Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Caching Proxy｜快取代理](<179 快取代理.md>)　｜　[下一篇：Setup FreeRADIUS for accounting｜設定 FreeRADIUS 用於會計 ➡](<181 設定 FreeRADIUS 用於會計.md>)

# FreeRADIUS

> 章節：[Community Plugins](<000 目錄.md#c-36>) › [Other](<000 目錄.md#c-38>)

## Installation｜安裝

First of all, you have to install the FreeRADIUS plugin (os-freeradius) from the plugins view.

首先，您需要從外掛程式視圖安裝 FreeRADIUS 外掛程式 (os-freeradius)。

![../../_images/menu_plugins.png](<../images/a11a0992-menu_plugins.png>)

After a page reload you will get a new menu entry under services for FreeRADIUS. Select and a submenu will pop up with the entries **General, User** and **Client**:

頁面重新載入後，您將在 FreeRADIUS 服務下看到一個新的選單項目。選擇後，將彈出一個子選單，其中包含 **General、User**和**Client** 條目：

## General Settings｜常規設定

![../../_images/freeradius_general.png](<../images/3d9c96a1-freeradius_general.png>)

Enable

使能夠

To enable the service, you have to check this box.

若要啟用此服務，您必須選取此核取方塊。

Enable VLAN assignment

啟用VLAN賦值

If you check this box, the RADIUS packets will have some unencrypted tags for the network device to allow dynamic VLAN assignment. In this case, the authentication is still encrypted but some metadata will be readable. You need to enable this checkbox, if you want to set a VLAN on a switchport, which depends on the authenticated user.

勾選此複選框後， RADIUS封包將包含一些未加密的標籤，供網路設備動態分配VLAN 。在這種情況下，身份驗證仍然加密，但部分元資料將可讀。如果您希望在交換器連接埠上設定一個取決於已驗證使用者的VLAN ，則需要啟用此核取方塊。

## Users｜使用者

![../../_images/freeradius_users.png](<../images/aaacbb31-freeradius_users.png>)

A user is an entity, which is meant to authenticate against the RADIUS server (computer or human).

使用者是一個實體，旨在向RADIUS伺服器（電腦或人）進行身份驗證。

To create a user, click the + button.

若要建立用戶，請點選“+”按鈕。

![../../_images/freeradius_edit_user.png](<../images/14792103-freeradius_edit_user.png>)

Enabled

啟用

This user will be written to disk and can be used. You can toggle this value to temporary disable users.

此用戶資訊將被寫入磁碟並可供使用。您可以切換此值以暫時停用使用者。

Username

使用者名稱

The name which the user will use to authenticate.

使用者用於身份驗證的名稱。

Password

密碼

The password the user will use to authenticate.

使用者用於身份驗證的密碼。

Description

描述

Internal information for you to use to find the user. This setting can be used to add some infos like a department.

供您尋找使用者的內部資訊。此設定可用於添加一些信息，例如部門。

IP Address and Subnetmask

IP位址和子網路遮罩

If you want to use FreeRADIUS for point to point links, you can add an IP address here which will be assigned to the client. The same is valid for Subnetmask.

如果您想使用 FreeRADIUS 建立點對點鏈路，可以在此處新增一個IP位址，該位址將被指派給用戶端。子網路遮罩也適用同樣的規則。

VLAN ID

A layer 2 device like a switch, which supports 802.1X authentication can use this Field to dynamically assign an VLAN number to a switchport based on the authentication result. This is especially useful if you are having moving users (for example if an employee can attach his computer to a docking station at a desk and the switch will assign the VLAN ID of the employee to the switchport. Be aware that the Layer 2 device has to be able to read this information, which means that **you have to enable corresponding option in General**

支援 802.1X 認證的二層設備（例如交換器）可以使用此字段，根據認證結果動態地為交換器端口分配一個VLAN編號。如果您有行動用戶（例如，員工可以將電腦連接到辦公桌上的擴充塢，交換機會將該員工的VLAN ID編號分配給相應的連接埠），這將非常有用。請注意，二層設備必須能夠讀取此訊息，這表示**您必須在「常規」設定中啟用相應的選項**。

## Clients｜客戶

![../../_images/freeradius_clients.png](<../images/bfe6fb7d-freeradius_clients.png>)

A client in RADIUS is a intermediate device / network device like a VPN gateway, a switch or an access point.

RADIUS中的客戶端是中間設備/網路設備，例如VPN網關、交換器或存取點。

To create a new client, click the + button:

若要建立新客戶，請點選“+”按鈕：

![../../_images/freeradius_edit_client.png](<../images/b3aaa087-freeradius_edit_client.png>)

Enabled

啟用

This client will be written to disk and can be used. You can toggle this value to temporary disable clients.

此客戶端將寫入磁碟並可供使用。您可以切換此值以暫時停用客戶端。

Name

姓名

A name used for the client.

客戶使用的名稱。

Secret

秘密

The secret is used to provide a trust relationship between the client and the FreeRADIUS server. This password should be strong as you only have to type it twice (once in the FreeRADIUS configuration and once in your client configuration) or even copy it. If the passwords do not match, FreeRADIUS will reject all attempts to authenticate.

此金鑰用於在客戶端和 FreeRADIUS 伺服器之間建立信任關係。此密碼應足夠複雜，因為您只需輸入兩次（一次在 FreeRADIUS 配置中，一次在客戶端配置中），甚至可以複製貼上。如果密碼不匹配，FreeRADIUS 將拒絕所有驗證嘗試。

IP Address or Network with CIDR

IP與CIDR的地址或網絡

This is the IP address of the Client (not the authenticating device). For example this could be the IP address of your switch.

這是客戶端（而非認證設備）的IP位址。例如，這可能是您的交換器的IP位址。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Caching Proxy｜快取代理](<179 快取代理.md>)　｜　[下一篇：Setup FreeRADIUS for accounting｜設定 FreeRADIUS 用於會計 ➡](<181 設定 FreeRADIUS 用於會計.md>)
