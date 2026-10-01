---
title: "IPS區塊SSL證書"
title_original: "IPS Block SSL certificates"
source: "https://docs.opnsense.org/manual/how-tos/ips-sslfingerprint.html"
chapter: ["Services","Intrusion Prevention System","How-tos"]
order: 204
lang: "zh-TW"
translated_by: "gtx"
captured: "2026-09-26T11:33:24.142Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：IPS SSL黑名單和 Feodo 追蹤器](<203 IPS SSL黑名單和 Feodo 追蹤器.md>)　｜　[下一篇：IPS 繞過本地流量進行檢查 ➡](<205 IPS 繞過本地流量進行檢查.md>)

# IPS區塊SSL證書

> 章節：[Services](<000 目錄.md#c-40>) › [Intrusion Prevention System](<000 目錄.md#c-43>) › [How-tos](<000 目錄.md#c-44>)

本教學介紹如何設定 IPS 系統以根據 SHA1 指紋阻止 ssl 憑證。

## 先決條件

-   始終首先升級到最新版本。請參閱[初始安裝與設定](<55 初始安裝和配置.md>) 和/或升級至最新版本：系統 ‣ 韌體 ‣ 取得更新。
    

[![../../_images/firmware.png](<../images/75ac81b7-firmware.png>)](https://docs.opnsense.org/_images/firmware.png)

-   建議的最小記憶體為 2 GB，並且有足夠的可用磁碟空間用於日誌記錄（建議 >10 GB）。
    
-   停用 **介面設定** 下的所有硬體卸載
    

[![../../_images/disable_offloading.png](<../images/0908ab5c-disable_offloading.png>)](https://docs.opnsense.org/_images/disable_offloading.png)

警告

套用後，您需要重新啟動 OPNsense，否則卸載可能不會完全停用，IPS 模式將無法運作。

要開始，請前往服務‣入侵偵測

![ids_menu](<../images/1212758a-ids_menu.png>)

## 使用者定義

選擇選項卡**使用者定義**。

![ids_tabs_user](<../images/73be56cb-ids_tabs_user.png>)

## 建立新規則

選擇![add](<../images/4f010d6b-ids_tabs_user_add.png>)新增規則。

### 取得網站指紋

找出網站的SSL指紋相對容易。為了演示，我們將阻止 facebook 並使用 Firefox 來確定指紋。

打開瀏覽器並轉到[https://facebook.com](https://facebook.com/)，載入後點選地址旁的鎖：![lock](<../images/11cda6f2-facebook_lock.png>)。

現在您將看到類似以下內容的內容：

[![../../_images/facebook_click.png](<../images/9097bee1-facebook_click.png>)](https://docs.opnsense.org/_images/facebook_click.png)

點擊箭頭 ( **\>**)，然後選擇**更多信息** 現在打開證書詳細信息，您將看到如下所示的內容：

[![../../_images/certificate.png](<../images/938d5e37-certificate.png>)](https://docs.opnsense.org/_images/certificate.png)

複製SHA1證書指紋(A0:4E:AF:B3:48:C2:6B:15:A8:C1:AA:87:A3:33:CA:A3:CD:EE:C9:C9)。

將其貼到新規則中：

[![../../_images/ips_rule_details.png](<../images/a9dfbf72-ips_rule_details.png>)](https://docs.opnsense.org/_images/ips_rule_details.png)

選擇操作（警報或刪除）：

[![../../_images/ips_action.png](<../images/a7229d8b-ips_action.png>)](https://docs.opnsense.org/_images/ips_action.png)

新增描述：

[![../../_images/ips_description.png](<../images/32c7e55b-ips_description.png>)](https://docs.opnsense.org/_images/ips_description.png)

然後點選**儲存變更** ![save](<../images/b37c3ee8-ips_save.png>)

## 啟用入侵偵測和預防

要啟用IDS/IPS，只需前往服務‣入侵偵測並選擇**啟用和IPS模式**。確保您為正在執行的入侵偵測系統選擇了正確的介面。對於我們的範例，我們將使用 WAN 接口，因為這很可能是您與公共互聯網的連接。

[![../../_images/idps.png](<../images/4189abe6-idps.png>)](https://docs.opnsense.org/_images/idps.png)

## 應用程式配置

首先按下表單底部的 **Apply** 按鈕套用配置。

![../../_images/applybtn.png](<../images/ca819e9a-applybtn.png>)

## 清除瀏覽器快取並測試

由於您的瀏覽器已快取 ssl 證書，因此您需要先清除快取。之後，您可以進行測試，並將在**警報**中看到以下內容：

[![../../_images/ips_facebook_alert.png](<../images/16ed3520-ips_facebook_alert.png>)](https://docs.opnsense.org/_images/ips_facebook_alert.png)

注意事項

如果瀏覽器已快取證書，則不會進行SSL證書交換，且網站不會被封鎖。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：IPS SSL黑名單和 Feodo 追蹤器](<203 IPS SSL黑名單和 Feodo 追蹤器.md>)　｜　[下一篇：IPS 繞過本地流量進行檢查 ➡](<205 IPS 繞過本地流量進行檢查.md>)
