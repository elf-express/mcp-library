---
title: "OpenConnect Setup｜OpenConnect 設定"
title_original: "OpenConnect Setup"
source: "https://docs.opnsense.org/manual/how-tos/openconnect.html"
chapter: ["Virtual Private Networking","Plugin VPN options"]
order: 161
lang: "bilingual"
translated_by: "gtx"
captured: "2026-09-26T11:33:01.905Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：WireGuard Selective Routing to External VPN Endpoint｜WireGuard 选择性路由到外部 VPN 端点](<160 WireGuard 选择性路由到外部 VPN 端点.md>)　｜　[下一篇：Stunnel｜隧道 ➡](<162 隧道.md>)

# OpenConnect Setup｜OpenConnect 設定

> 章節：[Virtual Private Networking](<000 目錄.md#c-32>) › [Plugin VPN options](<000 目錄.md#c-35>)

## Introduction｜介紹

OpenConnect is a SSL VPN client initially created to support Cisco’s AnyConnect SSL VPN. It has since been ported to support the Juniper SSL VPN which is now known as Pulse Connect Secure. Palo Altos Global Protect will also be supported in future and of course the own OpenConnect Server.

OpenConnect 是一個SSL VPN 用戶端，最初是為了支援 Cisco 的 AnyConnect SSL VPN 而創建的。此後，它已被移植以支援 Juniper SSL VPN，現在稱為 Pulse Connect Secure。未來也將支援 Palo Altos Global Protect，當然還有自己的 OpenConnect 伺服器。

## Step 1 - Installation｜第 1 步 - 安裝

Go to System ‣ Firmware ‣ Plugins and search for **os-openconnect**. Install the plugin as usual, refresh and page and the you’ll find the client via VPN ‣ OpenConnect.

前往 System ‣ Firmware ‣ Plugins 並搜尋 **os-openconnect**。像往常一樣安裝插件，刷新並頁面，您將透過VPN‣OpenConnect找到客戶端。

## Step 2 - Setup｜第 2 步 - 設定

The setup of the client is very simple. Just tick **Enable** and fill out **VPN Server**, **Username** and **Password**. Be sure that the FQDN matches the name in the certificate or you will receive an error. Also wildcard certificates can produce errors.

客戶端的設定非常簡單。只需勾選**啟用**並填寫**VPN伺服器**、**使用者名稱**和**密碼**。確保 FQDN 與證書中的名稱匹配，否則您將收到錯誤。通配符證書也可能產生錯誤。

Once enabled, a new interface will be available for specifying firewall rules; Firewall ‣ Rules ‣ OpenConnect will appear.

啟用後，將提供一個新的介面來指定防火牆規則；將出現防火牆 ‣ 規則 ‣ OpenConnect。

## Step 3 - Troubleshoot problems｜第 3 步 - 解決問題

To troubleshoot connection problems it’s best to login via CLI and start OpenConnect manually:

要解決連線問題，最好透過 CLI 登入並手動啟動 OpenConnect：

\# /usr/local/etc/rc.d/opnsense-openconnect start

\# /usr/local/etc/rc.d/opnsense-openconnect 啟動

Look out for errors like

留意類似的錯誤

`To trust this server in future, perhaps add this to your command line: --servercert sha256:9f97a3395d18093a14f0d8e768dabee231af34d9ba35432dfe838d58dd633333`

Now the field **Certificate Hash** comes into play, so please insert the string above without the hash size and set this one in field **Certificate Hash Type**.

現在欄位**憑證雜湊**開始發揮作用，因此請插入上面不帶雜湊大小的字串，並在欄位**憑證雜湊類型**中設定字串。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：WireGuard Selective Routing to External VPN Endpoint｜WireGuard 选择性路由到外部 VPN 端点](<160 WireGuard 选择性路由到外部 VPN 端点.md>)　｜　[下一篇：Stunnel｜隧道 ➡](<162 隧道.md>)
