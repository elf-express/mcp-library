---
title: "IPS SSLBlacklists & Feodo Tracker"
source: https://docs.opnsense.org/manual/how-tos/ips-feodo.html
chapter: ["Services","Intrusion Prevention System","How-tos"]
order: 203
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:33:23.633Z"
---


# IPS SSLBlacklists & Feodo Tracker


This tutorial explains how to setup the IPS system to drop SSL certificates listed on the [abuse.ch](https://www.abuse.ch/) SSL Blacklists & Feodo Tracker.

Feodo (also known as Cridex or Bugat) is a Trojan used to commit e-banking fraud and steal sensitive information from the victim’s computer, such as credit card details or credentials. For more information see [https://feodotracker.abuse.ch](https://feodotracker.abuse.ch/)

## Prerequisites

-   Always upgrade to latest release first. See [Initial Installation & Configuration](<55 Initial Installation & Configuration.md>) and/or upgrade to latest release: System ‣ Firmware ‣ Fetch updates
    

[圖：../../_images/firmware.png](https://docs.opnsense.org/_images/firmware.png)

-   Minimum Advisable Memory is 2 Gigabyte and sufficient free disk space for logging (>10 GB advisable).
    
-   Disable all Hardware Offloading Under **Interface-Settings**
    

[圖：../../_images/disable_offloading.png](https://docs.opnsense.org/_images/disable_offloading.png)

Warning

After applying you need to reboot OPNsense otherwise offloading may not completely be disabled and IPS mode will not function.

Note

Some features described on this page were added in version 16.1.1. Always keep your system up to date.

## Setup Intrusion Detection & Prevention

To enable IDS/IPS just go to Services ‣ Intrusion Detection and select **enabled & IPS mode**. Make sure you have selected the right interface for the intrusion detection system too run on. For our example we will use the WAN interface, as that will most likely be you connection with the public Internet.

[圖：../../_images/idps.png](https://docs.opnsense.org/_images/idps.png)

## Apply configuration

First apply the configuration by pressing the **Apply** button at the bottom of the form.



## Fetch Rule sets

For this example we will only fetch the abuse.ch SSL & Dodo Tracker rulesets. To do so: select Enabled after each one.

[圖：../../_images/rulesets_enable.png](https://docs.opnsense.org/_images/rulesets_enable.png)

To download the rule sets press **Download & Update Rules**.



## Change default behavior

To block matches instead of alerting on them, go to the Service -> Intrusion Detection -> Policies page and add a new policy. You can easily select the associated rulesets here (all staring with abuse.ch) and select action “Alert” next go to the new action, which should be “Drop”.

Apply the settings at the bottom of the page when done.

## Apply fraud drop actions

Now press **Download & Update Rules** again to change the behavior to drop.



## Keep up to date

Now schedule a regular fetch to keep your server up to date.

Click on schedule, a popup window will appear:

[圖：../../_images/schedule.png](https://docs.opnsense.org/_images/schedule.png)

Select **enabled** and choose a time. For the example it is set to each day at 11:12. Select **Save changes** and wait until you have returned to the IDS screen.

## DONE

Your system has now been fully setup to drop known fraudulent SSL certificates as well data phishing attempts by utilizing the Feodo tracking list.

## Sample alert

Currently there is no test service available to check your block rules against, however here is a sample of an actual alert that has been blocked:

[圖：../../_images/alerts.jpg](https://docs.opnsense.org/_images/alerts.jpg)

---

