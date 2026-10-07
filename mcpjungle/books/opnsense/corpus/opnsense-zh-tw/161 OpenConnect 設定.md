---
title: "OpenConnect 設定"
title_original: "OpenConnect Setup"
source: https://docs.opnsense.org/manual/how-tos/openconnect.html
chapter: ["Virtual Private Networking","Plugin VPN options"]
order: 161
lang: "zh-TW"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:33:01.905Z"
---

# OpenConnect 設定

## 介紹

OpenConnect 是一款SSL VPN客戶端，最初是為了支援 Cisco 的 AnyConnect SSL VPN而創建的。後來，它被移植到 Juniper SSL VPN平台，該平台現在被稱為 Pulse Connect Secure。未來也將支援 Palo Altos Global Protect，當然也支援 OpenConnect 自有的伺服器。

## 第 1 步 - 安裝

進入系統‣韌體‣插件，搜尋**os-openconnect**。像往常一樣安裝插件，刷新頁面，然後您將透過VPN找到客戶端。

## 步驟 2 - 設定

客戶端的設定非常簡單。只需勾選**啟用**並填寫**VPN伺服器**、**使用者名稱**和**密碼**。確保 FQDN 與證書中的名稱匹配，否則您將收到錯誤。通配符證書也可能產生錯誤。

啟用後，將出現一個用於指定防火牆規則的新介面；「防火牆」‣「規則」‣「OpenConnect」將會出現。

## 步驟 3 - 排除故障

若要排查連線問題，最好透過CLI登入並手動啟動OpenConnect：

## /usr/local/etc/rc.d/opnsense-openconnect start

注意類似這樣的錯誤

`To trust this server in future, perhaps add this to your command line: --servercert sha256:9f97a3395d18093a14f0d8e768dabee231af34d9ba35432dfe838d58dd633333`

現在欄位**憑證雜湊**開始發揮作用，因此請插入上面不帶雜湊大小的字串，並在欄位**憑證雜湊類型**中設定字串。