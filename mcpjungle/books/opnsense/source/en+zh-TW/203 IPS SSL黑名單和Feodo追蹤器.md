---
title: "IPS SSLBlacklists & Feodo Tracker｜IPS SSL黑名單和Feodo追蹤器"
title_original: "IPS SSLBlacklists & Feodo Tracker"
source: "https://docs.opnsense.org/manual/how-tos/ips-feodo.html"
chapter: ["Services","Intrusion Prevention System","How-tos"]
order: 203
lang: "bilingual"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:33:23.633Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Intrusion Prevention System｜入侵防禦系統](<202 入侵防禦系統.md>)　｜　[下一篇：IPS Block SSL certificates｜IPS塊SSL證書 ➡](<204 IPS塊SSL證書.md>)

# IPS SSLBlacklists & Feodo Tracker｜IPS SSL黑名單和Feodo追蹤器

> 章節：[Services](<000 目錄.md#c-40>) › [Intrusion Prevention System](<000 目錄.md#c-43>) › [How-tos](<000 目錄.md#c-44>)

This tutorial explains how to setup the IPS system to drop SSL certificates listed on the [abuse.ch](https://www.abuse.ch/) SSL Blacklists & Feodo Tracker.

本教學說明如何設定IPS系統以刪除 [abuse.ch](https://www.abuse.ch/) SSL黑名單和 Feodo Tracker 上列出的SSL憑證。

Feodo (also known as Cridex or Bugat) is a Trojan used to commit e-banking fraud and steal sensitive information from the victim’s computer, such as credit card details or credentials. For more information see [https://feodotracker.abuse.ch](https://feodotracker.abuse.ch/)

Feodo（又稱 Cridex 或 Bugat）是一種木馬程序，用於實施網上銀行詐騙，並從受害者的計算機中竊取敏感信息，例如信用卡詳細信息或憑證。更多資訊請參閱 [https://feodotracker.abuse.ch](https://feodotracker.abuse.ch/)

## Prerequisites｜先決條件

-   Always upgrade to latest release first. See [Initial Installation & Configuration](<55 初始安裝和配置.md>) and/or upgrade to latest release: System ‣ Firmware ‣ Fetch updates  
    務必先升級到最新版本。請參閱[初始安裝與設定](<55 初始安裝和配置.md>)和/或升級至最新版本：系統‣韌體‣取得更新
    

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

Note

筆記

Some features described on this page were added in version 16.1.1. Always keep your system up to date.

本頁所述的部分功能是在16.1.1版本中新增的。請務必保持您的系統處於最新狀態。

## Setup Intrusion Detection & Prevention｜設定入侵偵測與防禦

To enable IDS/IPS just go to Services ‣ Intrusion Detection and select **enabled & IPS mode**. Make sure you have selected the right interface for the intrusion detection system too run on. For our example we will use the WAN interface, as that will most likely be you connection with the public Internet.

要啟用IDS/IPS只需轉到“服務”‣“入侵檢測”，然後選擇**啟用並啟用IPS模式**。請確保您已為入侵偵測系統選擇正確的介面。在本範例中，我們將使用WAN接口，因為這很可能是您與公共互聯網的連接。

[![../../_images/idps.png](<../images/4189abe6-idps.png>)](https://docs.opnsense.org/_images/idps.png)

## Apply configuration｜應用程式配置

First apply the configuration by pressing the **Apply** button at the bottom of the form.

首先，按下表單底部的**套用**按鈕來套用配置。

![../../_images/applybtn.png](<../images/ca819e9a-applybtn.png>)

## Fetch Rule sets｜取得規則集

For this example we will only fetch the abuse.ch SSL & Dodo Tracker rulesets. To do so: select Enabled after each one.

在這個範例中，我們只會取得 abuse.ch SSL和 Dodo Tracker 規則集。為此，請在每個規則集後選擇“啟用”。

[![../../_images/rulesets_enable.png](<../images/20818eb3-rulesets_enable.png>)](https://docs.opnsense.org/_images/rulesets_enable.png)

To download the rule sets press **Download & Update Rules**.

若要下載規則集，請按**下載和更新規則**。

![../../_images/downloadbtn.png](<../images/dbff795c-downloadbtn.png>)

## Change default behavior｜更改預設行為

To block matches instead of alerting on them, go to the Service -> Intrusion Detection -> Policies page and add a new policy. You can easily select the associated rulesets here (all staring with abuse.ch) and select action “Alert”（警報） next go to the new action, which should be “Drop”（降低）.

若要阻止符合項目而不是發出警報，請前往「服務」->「入侵偵測」->「策略」頁面並新增策略。您可以在此處輕鬆選擇關聯的規則集（所有規則集均以 abuse.ch 開頭），然後選擇操作“Alert”（警報） ，接下來轉到新操作，該操作應為“Drop”（降低） 。

Apply the settings at the bottom of the page when done.

完成後，請套用頁面底部的設定。

## Apply fraud drop actions｜應用欺詐放棄操作

Now press **Download & Update Rules** again to change the behavior to drop.

現在再次按下**下載並更新規則**，將行為更改為丟棄。

![../../_images/downloadbtn.png](<../images/dbff795c-downloadbtn.png>)

## Keep up to date｜保持更新

Now schedule a regular fetch to keep your server up to date.

現在安排定期獲取數據，以保持伺服器更新。

Click on schedule, a popup window will appear:

點擊日程安排，將彈出一個視窗：

[![../../_images/schedule.png](<../images/ad2c8d07-schedule.png>)](https://docs.opnsense.org/_images/schedule.png)

Select **enabled** and choose a time. For the example it is set to each day at 11:12. Select **Save changes** and wait until you have returned to the IDS screen.

選擇**啟用**並選擇時間。對於範例，它設定為每天的 11:12。選擇**儲存變更**並等待返回IDS畫面。

## DONE

Your system has now been fully setup to drop known fraudulent SSL certificates as well data phishing attempts by utilizing the Feodo tracking list.

您的系統現已完全設置，可利用 Feodo 追蹤清單丟棄已知的詐欺性SSL證書以及資料網路釣魚嘗試。

## Sample alert｜範例警報

Currently there is no test service available to check your block rules against, however here is a sample of an actual alert that has been blocked:

目前沒有可用的測試服務來驗證您的攔截規則，但以下是一個已被攔截的實際警報範例：

[![../../_images/alerts.jpg](<../images/54701c85-alerts.jpg>)](https://docs.opnsense.org/_images/alerts.jpg)

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Intrusion Prevention System｜入侵防禦系統](<202 入侵防禦系統.md>)　｜　[下一篇：IPS Block SSL certificates｜IPS塊SSL證書 ➡](<204 IPS塊SSL證書.md>)
