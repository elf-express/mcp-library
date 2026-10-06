---
title: "IPS Block SSL certificates｜IPS塊SSL證書"
title_original: "IPS Block SSL certificates"
source: "https://docs.opnsense.org/manual/how-tos/ips-sslfingerprint.html"
chapter: ["Services","Intrusion Prevention System","How-tos"]
order: 204
lang: "bilingual"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:33:24.142Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：IPS SSLBlacklists & Feodo Tracker｜IPS SSL黑名單和Feodo追蹤器](<203 IPS SSL黑名單和Feodo追蹤器.md>)　｜　[下一篇：IPS Bypass local traffic from inspection｜IPS繞過本地交通進行檢查 ➡](<205 IPS繞過本地交通進行檢查.md>)

# IPS Block SSL certificates｜IPS塊SSL證書

> 章節：[Services](<000 目錄.md#c-40>) › [Intrusion Prevention System](<000 目錄.md#c-43>) › [How-tos](<000 目錄.md#c-44>)

This tutorial explains how to setup the IPS system to block ssl certificates based on their SHA1 fingerprint.

本教學說明如何設定IPS系統，以根據SHA1指紋阻止 SSL 憑證。

## Prerequisites｜先決條件

-   Always upgrade to latest release first. See [Initial Installation & Configuration](<55 初始安裝和配置.md>) and/or upgrade to latest release: System ‣ Firmware ‣ Fetch updates.  
    務必先升級到最新版本。請參閱[初始安裝和設定](<55 初始安裝和配置.md>)和/或升級至最新版本：系統‣韌體‣取得更新。
    

[![../../_images/firmware.png](<../images/75ac81b7-firmware.png>)](https://docs.opnsense.org/_images/firmware.png)

-   Minimum Advisable Memory is 2 Gigabyte and sufficient free disk space for logging (>10 GB advisable).  
    建議最低記憶體為 2 GB，並有足夠的可用磁碟空間用於日誌記錄（建議 >10 GB ）。
    
-   Disable all Hardware Offloading Under **Interface-Settings**  
    停用 **介面設定** 下的所有硬體卸載
    

[![../../_images/disable_offloading.png](<../images/0908ab5c-disable_offloading.png>)](https://docs.opnsense.org/_images/disable_offloading.png)

Warning

警告

After applying you need to reboot OPNsense otherwise offloading may not completely be disabled and IPS mode will not function.

應用後需要重新啟動 OPNsense，否則卸載功能可能無法完全停用， IPS模式將無法運作。

To start go to Services ‣ Intrusion Detection

首先，請前往「服務」‣「入侵偵測」。

![ids_menu](<../images/1212758a-ids_menu.png>)

## User defined｜使用者定義

Select the tab **User defined**.

選擇選項卡**使用者定義**。

![ids_tabs_user](<../images/73be56cb-ids_tabs_user.png>)

## Create a new Rule｜建立新規則

Select ![add](<../images/4f010d6b-ids_tabs_user_add.png>) to add a new rule.

選擇![add](<../images/4f010d6b-ids_tabs_user_add.png>)新增規則。

### Get fingerprint of website｜取得網站指紋

It is relatively easy to find out the SSL fingerprint of a website. For demonstration we will block facebook and use Firefox to determine the fingerprint.

尋找網站的SSL指紋相對容易。為了演示，我們將封鎖Facebook並使用Firefox瀏覽器來確定其指紋。

Open your browser and go to [https://facebook.com](https://facebook.com/) when loaded click on the lock next to the address : ![lock](<../images/11cda6f2-facebook_lock.png>).

開啟瀏覽器，造訪 [https://facebook.com](https://facebook.com/)載入完成後，點選位址旁的鎖： ![lock](<../images/11cda6f2-facebook_lock.png>) 。

Now you will see something similar to:

現在你會看到類似這樣的內容：

[![../../_images/facebook_click.png](<../images/9097bee1-facebook_click.png>)](https://docs.opnsense.org/_images/facebook_click.png)

Click on the arrow ( **\>** ) and then Select **More Information** Now open the certificate details and you will see something that looks like this:

點擊箭頭（**>**），然後選擇**更多資訊**。現在打開證書詳細信息，您將看到類似這樣的內容：

[![../../_images/certificate.png](<../images/938d5e37-certificate.png>)](https://docs.opnsense.org/_images/certificate.png)

Copy the SHA1 certificate fingerprint (A0:4E:AF:B3:48:C2:6B:15:A8:C1:AA:87:A3:33:CA:A3:CD:EE:C9:C9).

複製SHA1證書指紋 ( A0:4E:AF:B3:48:C2:6B:15:A8:C1:AA:87:A3:33:CA:A3:CD:EE:C9:C9 )。

Paste this into the new rule:

將以下內容貼到新規則中：

[![../../_images/ips_rule_details.png](<../images/a9dfbf72-ips_rule_details.png>)](https://docs.opnsense.org/_images/ips_rule_details.png)

Select the Action (Alert or Drop):

選擇操作（提醒或丟棄）：

[![../../_images/ips_action.png](<../images/a7229d8b-ips_action.png>)](https://docs.opnsense.org/_images/ips_action.png)

Add a description:

新增描述：

[![../../_images/ips_description.png](<../images/32c7e55b-ips_description.png>)](https://docs.opnsense.org/_images/ips_description.png)

And click **Save changes** ![save](<../images/b37c3ee8-ips_save.png>)

然後點選**儲存變更** ![save](<../images/b37c3ee8-ips_save.png>)

## Enable Intrusion Detection & Prevention｜啟用入侵偵測與防禦

To enable IDS/IPS just go to Services ‣ Intrusion Detection and select **enabled & IPS mode**. Make sure you have selected the right interface for the intrusion detection system too run on. For our example we will use the WAN interface, as that will most likely be you connection with the public Internet.

要啟用IDS/IPS只需轉到“服務”‣“入侵偵測”，然後選擇**啟用並啟用IPS模式**。請確保您已為入侵偵測系統選擇正確的介面。在本範例中，我們將使用WAN接口，因為這很可能是您與公共互聯網的連接。

[![../../_images/idps.png](<../images/4189abe6-idps.png>)](https://docs.opnsense.org/_images/idps.png)

## Apply configuration｜應用程式配置

First apply the configuration by pressing the **Apply** button at the bottom of the form.

首先，按下表單底部的**套用**按鈕來套用配置。

![../../_images/applybtn.png](<../images/ca819e9a-applybtn.png>)

## Clear Browser Cache and test｜清除瀏覽器快取並測試

Since your browser has cached the ssl certificate you will need to clear your cache first. After that you can test and will see the following in **Alerts**:

由於您的瀏覽器已快取 ssl 證書，因此您需要先清除快取。之後，您可以進行測試，並將在**警報**中看到以下內容：

[![../../_images/ips_facebook_alert.png](<../images/16ed3520-ips_facebook_alert.png>)](https://docs.opnsense.org/_images/ips_facebook_alert.png)

Note

筆記

If the browser has cached the certificate no SSL certificate exchange will be done and the website will not be blocked.

如果瀏覽器已快取證書，則不會進行SSL證書交換，網站也不會被封鎖。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：IPS SSLBlacklists & Feodo Tracker｜IPS SSL黑名單和Feodo追蹤器](<203 IPS SSL黑名單和Feodo追蹤器.md>)　｜　[下一篇：IPS Bypass local traffic from inspection｜IPS繞過本地交通進行檢查 ➡](<205 IPS繞過本地交通進行檢查.md>)
