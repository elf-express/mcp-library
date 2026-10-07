---
title: "IPS SSL黑名單和 Feodo 追蹤器"
title_original: "IPS SSLBlacklists & Feodo Tracker"
source: https://docs.opnsense.org/manual/how-tos/ips-feodo.html
chapter: ["Services","Intrusion Prevention System","How-tos"]
order: 203
lang: "zh-TW"
translated_by: "gtx"
captured: "2026-09-26T11:33:23.633Z"
---


# IPS SSL黑名單和 Feodo 追蹤器


本教學介紹如何設定 IPS 系統以刪除 [abuse.ch](https://www.abuse.ch/) SSL 黑名單和 Feodo Tracker 上列出的 SSL 憑證。

Feodo（也稱為 Cridex 或 Bugat）是一種特洛伊木馬，用於實施電子銀行欺詐並從受害者的計算機竊取敏感信息，例如信用卡詳細信息或憑據。更多資訊請參閱[https://feodotracker.abuse.ch](https://feodotracker.abuse.ch/)

## 先決條件

-   始終首先升級到最新版本。請參閱[初始安裝與設定](<55 初始安裝和配置.md>) 和/或升級至最新版本：系統 ‣ 韌體 ‣ 取得更新
    

[圖：../../_images/firmware.png](https://docs.opnsense.org/_images/firmware.png)

-   建議的最小記憶體為 2 GB，並且有足夠的可用磁碟空間用於日誌記錄（建議 >10 GB）。
    
-   停用 **介面設定** 下的所有硬體卸載
    

[圖：../../_images/disable_offloading.png](https://docs.opnsense.org/_images/disable_offloading.png)

警告

套用後，您需要重新啟動 OPNsense，否則卸載可能不會完全停用，IPS 模式將無法運作。

注意事項

本頁所描述的一些功能是在版本16.1.1中加入的。始終保持您的系統處於最新狀態。

## 設定入侵偵測和預防

要啟用IDS/IPS，只需前往服務‣入侵偵測並選擇**啟用和IPS模式**。確保您為正在執行的入侵偵測系統選擇了正確的介面。對於我們的範例，我們將使用 WAN 接口，因為這很可能是您與公共互聯網的連接。

[圖：../../_images/idps.png](https://docs.opnsense.org/_images/idps.png)

## 應用程式配置

首先按下表單底部的 **Apply** 按鈕套用配置。



## 取得規則集

對於此範例，我們將只取得abuse.ch SSL 和 Dodo Tracker 規則集。為此：在每一項後選擇啟用。

[圖：../../_images/rulesets_enable.png](https://docs.opnsense.org/_images/rulesets_enable.png)

若要下載規則集，請按**下載和更新規則**。



## 更改預設行為

若要阻止配對而不是對其發出警報，請前往服務 -> 入侵偵測 -> 策略頁面並新增策略。您可以在此處輕鬆選擇關聯的規則集（全部以濫用.ch 開頭），然後選擇操作“警報”，然後轉到新操作，該操作應為“刪除”。

完成後應用頁面底部的設定。

## 應用欺詐丟棄操作

現在再次按 **下載和更新規則** 以更改要刪除的行為。



## 保持最新狀態

現在安排定期獲取以使您的伺服器保持最新狀態。

點擊日程，會出現一個彈出視窗：

[圖：../../_images/schedule.png](https://docs.opnsense.org/_images/schedule.png)

選擇**啟用**並選擇時間。對於範例，它設定為每天的 11:12。選擇**儲存變更**並等待返回IDS畫面。

## DONE

您的系統現在已完全設定為利用 Feodo 追蹤清單刪除已知的詐騙 SSL 憑證以及資料網路釣魚嘗試。

## 警報範例

目前沒有可用的測試服務來檢查您的封鎖規則，但以下是已封鎖的實際警報的範例：

[圖：../../_images/alerts.jpg](https://docs.opnsense.org/_images/alerts.jpg)

---

