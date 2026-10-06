---
title: "nginx IP Based Access Control Lists｜nginx IP基於存取控制列表"
title_original: "nginx IP Based Access Control Lists"
source: "https://docs.opnsense.org/manual/how-tos/nginx_ip_acl.html"
chapter: ["Community Plugins","Web"]
order: 172
lang: "bilingual"
translated_by: "google_v2"
captured: "2026-09-26T11:33:08.996Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：nginx Basic Authentication & Authorization｜nginx 基本驗證與授權](<171 nginx 基本驗證與授權.md>)　｜　[下一篇：nginx TLS Fingerprints｜nginx TLS指紋 ➡](<173 nginx TLS指紋.md>)

# nginx IP Based Access Control Lists｜nginx IP基於存取控制列表

> 章節：[Community Plugins](<000 目錄.md#c-36>) › [Web](<000 目錄.md#c-37>)

## nginx: IP Based Access Control Lists｜nginx： IP基於存取控制列表

Warning

警告

Source IPs of UDP may be spoofed because the protocol is connectionless. If there is an attacker who can manipulte your WAN, the attacker can also use any WAN IP which has been whitelisted. It is safer, not to use this as the only protection for your webservices.

由於協定是無連線的， UDP的來源 IP 位址可能被偽造。如果攻擊者能夠操縱您的WAN ，則攻擊者也可以使用任何已列入白名單的WAN IP 。因此，不建議僅使用此方法來保護您的 Web 服務，這樣做更為安全。

## Background Information｜背景資訊

IP based ACLs can be externally used to allow access (whitelist strategy) to a specific web service only by customers so you can easily get rid of most of the malicious traffic to the application server. This also has some downsides: For example, the site will probably not be visible to search engines and will therefore not be indexed. On the other hand you can also blacklist (blacklist strategy) some bot IPs and some [bulletproof](https://en.wikipedia.org/wiki/Bulletproof_hosting) hosting ranges.

基於IP存取控制清單 (ACL) 可以外部使用，僅允許客戶存取特定的 Web 服務（白名單策略），從而輕鬆封鎖大部分惡意流量。但這也有一些缺點：例如，網站可能無法被搜尋引擎收錄。另一方面，您也可以將一些機器人 IP 位址和一些 [防不勝防的](https://en.wikipedia.org/wiki/Bulletproof_hosting)主機位址範圍列入黑名單（黑名單策略）。

## Configuration｜配置

### Create Users｜創建用戶

Navigate to the Access ‣ IP ACL tab.

導覽至 Access ‣ IP ACL選項卡。

![../../_images/nginx_ip_acl_01_list_view.png](<../images/3d634c54-nginx_ip_acl_01_list_view.png>)

Click the + button to create a new ACL.

點擊 + 按鈕建立新的ACL 。

![../../_images/nginx_ip_acl_02_create_acl_view.png](<../images/7b6cb0e4-nginx_ip_acl_02_create_acl_view.png>)

Next enter a reasonable title, for example here “Allow Private IPs”（允許私有IP位址） was used. Now the different IP addresses or IP ranges can be entered. In this case some common private IP ranges were allowed and the default rule was set to block. A new line can be added by clicking the + icon while the trash can icon deletes the row. This means that this service should be only visible internally.

接下來輸入一個適合的標題，例如這裡使用了“Allow Private IPs”（允許私有IP位址） 。現在可以輸入不同的IP位址或IP範圍。在本例中，允許使用一些常見的私有IP範圍，並將預設規則設定為封鎖。點選「+」圖示可以新增新行，點選垃圾桶圖示可以刪除該行。這意味著此服務僅對內部可見。

Warning

警告

Keep in mind that carrier grade NAT (CGN) may cause some trouble with these ACLs too. Please check how your traffic is handled first.

請注意，運營商級的NAT （ CGN ）也可能與這些ACL有相容性問題。請先檢查您的流量處理方式。

### Assign it to a Location, HTTP or Stream-Server｜將其分配給位置、 HTTP或流伺服器

In the last step, the user list must be added to the object, that supports it. At the moment this are the HTTP Server, the Stream Server and the HTTP locations. For example to add the ACL to a location, open it and select the ACL in the dropdown:

最後一步，必須將使用者清單新增至支援該清單的物件中。目前支援的物件包括HTTP伺服器、串流媒體伺服器和HTTP位置。例如，要將ACL新增至某個位置，請開啟該位置並在下拉清單中選擇ACL ：

![../../_images/nginx_ip_acl_03_location.png](<../images/36f7df03-nginx_ip_acl_03_location.png>)

After saving the location and restarting nginx, you are done.

儲存位置並重新啟動 nginx 後，就完成了。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：nginx Basic Authentication & Authorization｜nginx 基本驗證與授權](<171 nginx 基本驗證與授權.md>)　｜　[下一篇：nginx TLS Fingerprints｜nginx TLS指紋 ➡](<173 nginx TLS指紋.md>)
