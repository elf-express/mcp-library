---
title: "IPS Block SSL certificates"
source: "https://docs.opnsense.org/manual/how-tos/ips-sslfingerprint.html"
chapter: ["Services","Intrusion Prevention System","How-tos"]
order: 204
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:33:24.142Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：IPS SSLBlacklists & Feodo Tracker](<203 IPS SSLBlacklists & Feodo Tracker.md>)　｜　[下一篇：IPS Bypass local traffic from inspection ➡](<205 IPS Bypass local traffic from inspection.md>)

# IPS Block SSL certificates

> 章節：[Services](<000 目錄.md#c-40>) › [Intrusion Prevention System](<000 目錄.md#c-43>) › [How-tos](<000 目錄.md#c-44>)

This tutorial explains how to setup the IPS system to block ssl certificates based on their SHA1 fingerprint.

## Prerequisites

-   Always upgrade to latest release first. See [Initial Installation & Configuration](<55 Initial Installation & Configuration.md>) and/or upgrade to latest release: System ‣ Firmware ‣ Fetch updates.
    

[![../../_images/firmware.png](<../images/75ac81b7-firmware.png>)](https://docs.opnsense.org/_images/firmware.png)

-   Minimum Advisable Memory is 2 Gigabyte and sufficient free disk space for logging (>10 GB advisable).
    
-   Disable all Hardware Offloading Under **Interface-Settings**
    

[![../../_images/disable_offloading.png](<../images/0908ab5c-disable_offloading.png>)](https://docs.opnsense.org/_images/disable_offloading.png)

Warning

After applying you need to reboot OPNsense otherwise offloading may not completely be disabled and IPS mode will not function.

To start go to Services ‣ Intrusion Detection

![ids_menu](<../images/1212758a-ids_menu.png>)

## User defined

Select the tab **User defined**.

![ids_tabs_user](<../images/73be56cb-ids_tabs_user.png>)

## Create a new Rule

Select ![add](<../images/4f010d6b-ids_tabs_user_add.png>) to add a new rule.

### Get fingerprint of website

It is relatively easy to find out the SSL fingerprint of a website. For demonstration we will block facebook and use Firefox to determine the fingerprint.

Open your browser and go to [https://facebook.com](https://facebook.com/) when loaded click on the lock next to the address : ![lock](<../images/11cda6f2-facebook_lock.png>).

Now you will see something similar to:

[![../../_images/facebook_click.png](<../images/9097bee1-facebook_click.png>)](https://docs.opnsense.org/_images/facebook_click.png)

Click on the arrow ( **\>** ) and then Select **More Information** Now open the certificate details and you will see something that looks like this:

[![../../_images/certificate.png](<../images/938d5e37-certificate.png>)](https://docs.opnsense.org/_images/certificate.png)

Copy the SHA1 certificate fingerprint (A0:4E:AF:B3:48:C2:6B:15:A8:C1:AA:87:A3:33:CA:A3:CD:EE:C9:C9).

Paste this into the new rule:

[![../../_images/ips_rule_details.png](<../images/a9dfbf72-ips_rule_details.png>)](https://docs.opnsense.org/_images/ips_rule_details.png)

Select the Action (Alert or Drop):

[![../../_images/ips_action.png](<../images/a7229d8b-ips_action.png>)](https://docs.opnsense.org/_images/ips_action.png)

Add a description:

[![../../_images/ips_description.png](<../images/32c7e55b-ips_description.png>)](https://docs.opnsense.org/_images/ips_description.png)

And click **Save changes** ![save](<../images/b37c3ee8-ips_save.png>)

## Enable Intrusion Detection & Prevention

To enable IDS/IPS just go to Services ‣ Intrusion Detection and select **enabled & IPS mode**. Make sure you have selected the right interface for the intrusion detection system too run on. For our example we will use the WAN interface, as that will most likely be you connection with the public Internet.

[![../../_images/idps.png](<../images/4189abe6-idps.png>)](https://docs.opnsense.org/_images/idps.png)

## Apply configuration

First apply the configuration by pressing the **Apply** button at the bottom of the form.

![../../_images/applybtn.png](<../images/ca819e9a-applybtn.png>)

## Clear Browser Cache and test

Since your browser has cached the ssl certificate you will need to clear your cache first. After that you can test and will see the following in **Alerts**:

[![../../_images/ips_facebook_alert.png](<../images/16ed3520-ips_facebook_alert.png>)](https://docs.opnsense.org/_images/ips_facebook_alert.png)

Note

If the browser has cached the certificate no SSL certificate exchange will be done and the website will not be blocked.

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：IPS SSLBlacklists & Feodo Tracker](<203 IPS SSLBlacklists & Feodo Tracker.md>)　｜　[下一篇：IPS Bypass local traffic from inspection ➡](<205 IPS Bypass local traffic from inspection.md>)
