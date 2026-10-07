---
title: "nginx TLS身份驗證與授權"
title_original: "nginx TLS Authentication & Authorization"
source: https://docs.opnsense.org/manual/how-tos/nginx_tls_auth.html
chapter: ["Community Plugins","Web"]
order: 174
lang: "zh-TW"
translated_by: "google_v2"
captured: "2026-09-26T11:33:08.475Z"
---


# nginx TLS身份驗證與授權


## nginx： TLS身份驗證與授權

警告

即使這可能是最安全的身份驗證方式，但許多客戶端並不支援。此外，配置客戶端憑證對使用者來說也可能很困難。

建議將此身份驗證機制用於機器對機器通訊和經驗豐富的用戶。

## 背景資訊

TLS身份驗證在HTTPS連線建立時進行，因此您無法按目錄進行設定（此資訊尚未收到）。如果您想在自訂應用程式中使用此驗證類型，nginx 外掛程式會設定 nginx 向您發送所需訊息，例如CN ）。

## 配置

首先，你需要一個CA ，一個客戶端憑證和一個伺服器憑證。

請依照 [Setup SSL VPN Road Warrior](https://docs.opnsense.org/manual/how-tos/sslvpn_client.html)中的說明進行建立。如果您希望您的VPN用戶可以使用相同的憑證登入您的應用程序，您可以使用相同的CA 。



接下來，選擇憑證CA ，並將用戶端驗證設定為*開啟*。這將拒絕任何沒有有效證書的用戶端的連線。

## 測試

```bash
curl https://192.168.1.1:444/file.txt --cacert ../MyOPNsenseCA.crt
<html>
<head><title>400 No required SSL certificate was sent</title></head>
<body bgcolor="white">
<center><h1>400 Bad Request</h1></center>
<center>No required SSL certificate was sent</center>
<hr><center>nginx</center>
</body>
</html>
```

```bash
curl https://192.168.1.1:444/file.txt --cert ../nginx_client_test_cert.crt --key ../nginx_client_test_cert.key --cacert ../MyOPNsenseCA.crt
Hello World
```

---

