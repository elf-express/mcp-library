---
title: "安裝 OPNsense AWS鏡像"
title_original: "Installing OPNsense AWS image"
source: "https://docs.opnsense.org/manual/how-tos/installaws.html"
chapter: ["Installation and setup","Setup guides"]
order: 61
lang: "zh-TW"
translated_by: "google_v2"
captured: "2026-09-26T11:32:10.780Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：序列存取](<60 序列存取.md>)　｜　[下一篇：安裝 OPNsense OVA鏡像 ➡](<62 安裝 OPNsense OVA鏡像.md>)

# 安裝 OPNsense AWS鏡像

> 章節：[Installation and setup](<000 目錄.md#c-5>) › [Setup guides](<000 目錄.md#c-6>)

[![../../_images/amazon-web-services.png](<../images/84fe639e-amazon-web-services.png>)](https://docs.opnsense.org/_images/amazon-web-services.png)

我們的EC2鏡像可在 [aws marketplace](https://aws.amazon.com/marketplace/pp/prodview-lu5v2tokic3py)中找到。

## 步驟 1 - 新建實例

若要啟動新實例，請在EC2視圖中前往“實例”，然後選擇“啟動實例”。

接下來前往「 AWS Marketplace」並搜尋「OPNsense」。我們的官方圖片由Deciso Sales BV銷售。

[![../../_images/aws_step1_choose_ami.png](<../images/8793be5d-aws_step1_choose_ami.png>)](https://docs.opnsense.org/_images/aws_step1_choose_ami.png)

## 步驟 2 - 選擇類型

選擇實例類型

[![../../_images/aws_launch_new_image.png](<../images/2102c960-aws_launch_new_image.png>)](https://docs.opnsense.org/_images/aws_launch_new_image.png)

## 步驟 3 - 設定實例詳細信息

您可以在此處設定網路詳細信息，預設會指派一個可透過外部 IPv4 位址存取的網路。

在頁面底部的“高級詳細資料”部分，您還可以提供“使用者資料”，您可以使用此資料為 ec2 使用者設定初始密碼。

注意事項

如果省略密碼，系統將自動為您產生密碼並顯示在控制台上（取得系統日誌）。

## 步驟 4 - 新增儲存空間

您可以在此處變更初始儲存大小和要使用的磁碟區類型。

## 步驟 5 - 新增標籤

您可以選擇性地在執行個體中新增標籤，也可以將其留空。

## 步驟 6 - 設定安全群組

若要設定安全群組，請確保允許從您自己的網路存取HTTPS 。由於這些鏡像預設也啟用了SSH ，您也可以從您的網路啟用連接埠 22 ( SSH )。

[![../../_images/aws_configure_security_group.png](<../images/9fbaf50b-aws_configure_security_group.png>)](https://docs.opnsense.org/_images/aws_configure_security_group.png)

## 步驟 7 - 檢查您的設置

[![../../_images/aws_review_settings.png](<../images/4e14feda-aws_review_settings.png>)](https://docs.opnsense.org/_images/aws_review_settings.png)

## 步驟 8 - SSH金鑰對

選擇 SSH 金鑰對或跳過，所選 SSH 金鑰將附加到 ec2 用戶，之後您可以從用戶管理員變更此設定。 （系統 -> 存取 -> 使用者）

[![../../_images/aws_ssh_keypair.png](<../images/c79fabbc-aws_ssh_keypair.png>)](https://docs.opnsense.org/_images/aws_ssh_keypair.png)

## 步驟 9 - 查看狀態頁面

[![../../_images/aws_status.png](<../images/eb6e26ba-aws_status.png>)](https://docs.opnsense.org/_images/aws_status.png)

## 步驟 10 - AWS實例

前往您的AWS實例

[![../../_images/aws_instances.png](<../images/6512c276-aws_instances.png>)](https://docs.opnsense.org/_images/aws_instances.png)

選擇鏡像，進入“鏡像設定”，然後“取得系統日誌”以取得 ec2-user 的初始密碼（如果使用者資料中未指定）和初始 root 密碼。

注意事項

根據我們的經驗，有時控制台設定可能需要一段時間才會出現在「系統日誌」中，當狀態檢查報告完成後，輸出才會可用。

## 步驟 11 - 初始 root 密碼

複製你的初始root密碼（行 \** set initial….）

```yaml
.....
Configuring system logging...done.
>>> Invoking start script 'aws'
**********************************************************************************************************
*** set initial ec2-user password to : J4heQUAaRWJFGkXrfUKssjQ9jyFiBmaRgqaBiYRK7iiL2lUtvG
*** !!! remember to change this immediately
*** openssh-key provided, set to ec2-user
*** set initial root password to : SNFpd2lcefYXXjyRezPrloTWTF3LjhgZPV3zLuDxEdVkiBGWxn
*** remember to change this immediately
**********************************************************************************************************
>>> Invoking start script 'newwanip'
Reconfiguring IPv4 on xn0: OK
Reconfiguring routes: OK
>>> Invoking start script 'freebsd'
>>> Invoking start script 'syslog-ng'
Stopping syslog_ng.
Waiting for PIDS: 57924.
Starting syslog_ng.
>>> Invoking start script 'carp'
>>> Invoking start script 'cron'
Starting Cron: OK
>>> Invoking start script 'beep'
Root file system: /dev/gpt/rootfs
Sat Feb  5 17:58:45 UTC 2022

*** OPNsense.localdomain: OPNsense 21.7.7 (amd64/OpenSSL) ***

 WAN (xn0)       -> v4/DHCP4: 172.31.27.130/20

 HTTPS: SHA256 52 87 3F 28 48 59 A3 7D 59 66 26 36 01 2C 77 61
               FB 8E 78 C8 C4 C4 80 2C 97 C6 67 AA CB 28 48 60
 SSH:   SHA256 pwupAQ6U+TOKoI1NAvcFpKF90Is02W0YMem7CNPG9j8 (ECDSA)
 SSH:   SHA256 +JOMcgZ14lUnUxp4jEbEWf7Q+OvHJufvjhFzybJG1/M (ED25519)
 SSH:   SHA256 2mR9csHFwDgBl7SGfOPeW2r9E15zMP9OuMpHnBrGwUI (RSA)

FreeBSD/amd64 (OPNsense.localdomain) (ttyu0)

login:
```

提示

當 ec2 控制台未顯示初始密碼時，您也可以使用已設定的 ssh shell，透過選單中的`sudo /usr/local/sbin/opnsense-shell`和選項`3`來重設 root 密碼。

## 第 11 步 - 搜尋目前地址並登入

[![../../_images/aws_search_current_ip.png](<../images/865f24ec-aws_search_current_ip.png>)](https://docs.opnsense.org/_images/aws_search_current_ip.png)

使用提供的地址登入 OPNsense。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：序列存取](<60 序列存取.md>)　｜　[下一篇：安裝 OPNsense OVA鏡像 ➡](<62 安裝 OPNsense OVA鏡像.md>)
