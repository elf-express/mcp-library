---
title: "IPS區塊SSL證書"
title_original: "IPS Block SSL certificates"
source: https://docs.opnsense.org/manual/how-tos/ips-sslfingerprint.html
chapter: ["Services","Intrusion Prevention System","How-tos"]
order: 204
lang: "zh-TW"
translated_by: "gtx"
captured: "2026-09-26T11:33:24.142Z"
---

# IPS區塊SSL證書

本教學介紹如何設定 IPS 系統以根據 SHA1 指紋阻止 ssl 憑證。

## 先決條件

-   始終首先升級到最新版本。請參閱[初始安裝與設定](<55 初始安裝和配置.md>) 和/或升級至最新版本：系統 ‣ 韌體 ‣ 取得更新。
    

[圖](https://docs.opnsense.org/_images/firmware.png)

-   建議的最小記憶體為 2 GB，並且有足夠的可用磁碟空間用於日誌記錄（建議 >10 GB）。
    
-   停用 **介面設定** 下的所有硬體卸載
    

[圖](https://docs.opnsense.org/_images/disable_offloading.png)

警告

套用後，您需要重新啟動 OPNsense，否則卸載可能不會完全停用，IPS 模式將無法運作。

要開始，請前往服務‣入侵偵測

ids_menu

## 使用者定義

選擇選項卡**使用者定義**。

ids_tabs_user

## 建立新規則

選擇add新增規則。

### 取得網站指紋

找出網站的SSL指紋相對容易。為了演示，我們將阻止 facebook 並使用 Firefox 來確定指紋。

打開瀏覽器並轉到[https://facebook.com](https://facebook.com/)，載入後點選地址旁的鎖：lock。

現在您將看到類似以下內容的內容：

[圖](https://docs.opnsense.org/_images/facebook_click.png)

點擊箭頭 ( **\>**)，然後選擇**更多信息** 現在打開證書詳細信息，您將看到如下所示的內容：

[圖](https://docs.opnsense.org/_images/certificate.png)

複製SHA1證書指紋(A0:4E:AF:B3:48:C2:6B:15:A8:C1:AA:87:A3:33:CA:A3:CD:EE:C9:C9)。

將其貼到新規則中：

[圖](https://docs.opnsense.org/_images/ips_rule_details.png)

選擇操作（警報或刪除）：

[圖](https://docs.opnsense.org/_images/ips_action.png)

新增描述：

[圖](https://docs.opnsense.org/_images/ips_description.png)

然後點選**儲存變更** save

## 啟用入侵偵測和預防

要啟用IDS/IPS，只需前往服務‣入侵偵測並選擇**啟用和IPS模式**。確保您為正在執行的入侵偵測系統選擇了正確的介面。對於我們的範例，我們將使用 WAN 接口，因為這很可能是您與公共互聯網的連接。

[圖](https://docs.opnsense.org/_images/idps.png)

## 應用程式配置

首先按下表單底部的 **Apply** 按鈕套用配置。



## 清除瀏覽器快取並測試

由於您的瀏覽器已快取 ssl 證書，因此您需要先清除快取。之後，您可以進行測試，並將在**警報**中看到以下內容：

[圖](https://docs.opnsense.org/_images/ips_facebook_alert.png)

注意事項

如果瀏覽器已快取證書，則不會進行SSL證書交換，且網站不會被封鎖。