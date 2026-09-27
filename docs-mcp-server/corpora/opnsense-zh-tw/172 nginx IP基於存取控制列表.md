---
title: "nginx IP基於存取控制列表"
title_original: "nginx IP Based Access Control Lists"
source: "https://docs.opnsense.org/manual/how-tos/nginx_ip_acl.html"
chapter: ["Community Plugins","Web"]
order: 172
lang: "zh-TW"
translated_by: "google_v2"
captured: "2026-09-26T11:33:08.996Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：nginx 基本驗證與授權](<171 nginx 基本驗證與授權.md>)　｜　[下一篇：nginx TLS指紋 ➡](<173 nginx TLS指紋.md>)

# nginx IP基於存取控制列表

> 章節：[Community Plugins](<000 目錄.md#c-36>) › [Web](<000 目錄.md#c-37>)

## nginx： IP基於存取控制列表

警告

由於協定是無連線的， UDP的來源 IP 位址可能被偽造。如果攻擊者能夠操縱您的WAN ，他們也可以使用任何已列入白名單的WAN IP 。因此，不建議僅使用此方法來保護您的 Web 服務，這樣做更為安全。

## 背景資訊

基於IP存取控制清單 (ACL) 可以外部使用，僅允許客戶存取特定的 Web 服務（白名單策略），從而輕鬆封鎖大部分惡意流量。但這也有一些缺點：例如，網站可能無法被搜尋引擎收錄。另一方面，您也可以將一些機器人 IP 位址和一些 [防盜](https://en.wikipedia.org/wiki/Bulletproof_hosting)主機位址範圍列入黑名單（黑名單原則）。

## 配置

### 創建用戶

導覽至 Access ‣ IP ACL選項卡。

![../../_images/nginx_ip_acl_01_list_view.png](<../images/3d634c54-nginx_ip_acl_01_list_view.png>)

點擊 + 按鈕建立新的ACL 。

![../../_images/nginx_ip_acl_02_create_acl_view.png](<../images/7b6cb0e4-nginx_ip_acl_02_create_acl_view.png>)

接下來輸入一個適當的標題，例如這裡使用的是「允許私有 IP」。現在可以輸入不同的IP位址或IP位址範圍。在本例中，允許了一些常見的私有IP位址範圍，並將預設規則設定為封鎖。點擊「+」圖示可以新增新行，點擊垃圾桶圖示可以刪除目前行。這意味著此服務應該僅在內部可見。

警告

請注意，運營商級的NAT （ CGN ）也可能與這些ACL有相容性問題。請先檢查您的流量處理方式。

### 將其分配給位置、 HTTP或串流媒體伺服器

最後一步，必須將使用者清單新增至支援該清單的物件中。目前支援的物件包括HTTP伺服器、串流媒體伺服器和HTTP位置。例如，要將ACL新增至某個位置，請開啟該位置並在下拉清單中選擇ACL ：

![../../_images/nginx_ip_acl_03_location.png](<../images/36f7df03-nginx_ip_acl_03_location.png>)

儲存位置並重新啟動 nginx 後，就完成了。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：nginx 基本驗證與授權](<171 nginx 基本驗證與授權.md>)　｜　[下一篇：nginx TLS指紋 ➡](<173 nginx TLS指紋.md>)
