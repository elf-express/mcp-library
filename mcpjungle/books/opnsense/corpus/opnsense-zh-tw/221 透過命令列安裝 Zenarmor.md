---
title: "透過命令列安裝 Zenarmor"
title_original: "Zenarmor Installing via Command Line"
source: https://docs.opnsense.org/vendor/sunnyvalley/zenarmor_cmd_install.html
chapter: ["Third-party Plugins","Sunnyvalley"]
order: 221
lang: "zh-TW"
translated_by: "google_v2"
captured: "2026-09-26T11:33:32.284Z"
---


# 透過命令列安裝 Zenarmor


## Zenarmor：透過命令列安裝

雖然首選的安裝方式是透過網頁介面，但也可以經由SSH命令列介面或直接系統存取來安裝 Zenarmor。安裝完成後，您需要使用網頁介面完成初始設定。

若要使用命令列介面在 OPNsense 中安裝 Sensei，您必須使用具有 shell 存取權限的管理員帳戶。

## 命令列安裝

在 Zenarmor 正式上線 OPNsense Web 介面的「插件」頁面之前，命令列安裝是其主要安裝方式。對於那些可以直接存取 OPNsense 系統但喜歡使用命令列工具，或者只能透過SSH遠端 shell 存取來管理 OPNsense 安裝的使用者來說，命令列安裝仍然可用。但是，安裝完成後，仍然需要存取 Web 介面來完成 Zenarmor 的初始配置。

如果您有本機系統存取權限，可以使用SSH進行遠端訪問，則可以安裝 Zenarmor。

### 本地系統訪問

如果您擁有 OPNsense 的本機存取權限，只需使用「root」使用者或其他管理員帳戶登入 OPNsense 即可。您應該會看到 OPNsense 選單選項清單。

[圖：../../_images/opnsense-direct-system-access.png](https://docs.opnsense.org/_images/opnsense-direct-system-access.png)

### SSH訪問

如果您只有 OPNsense 的 shell 存取權限，則可以使用以下命令透過SSH用戶端登入 OPNsense 來遠端安裝 Zenarmor，其中「root」是管理員帳戶，「your-firewall-ip」是 OPNsense 系統的IP地址或主機名稱。您應該會看到 OPNsense 選單選項清單。

```bash
$ ssh root@your-firewall-ip
```

[圖：../../_images/opnsense-ssh-login.png](https://docs.opnsense.org/_images/opnsense-ssh-login.png)

### 下載並運行 Zenarmor 安裝程序

成功登入 OPNsense（可透過本機系統存取或SSH後，輸入選項「8」開啟 shell。執行以下命令安裝供應商倉庫和 Zenarmor 軟體套件。

```
pkg install os-sunnyvalley
```

```
pkg install os-sensei
```

這會將安裝檔案複製到檔案系統中，並在 OPNsense Web 介面中新增一個頂級選單項目。根據您的硬體速度和網路連線速度，安裝可能需要幾分鐘才能完成。

安裝完成後，您可以中斷與終端機會話的連線。

現在您需要完成「初始設定精靈」才能讓 Zenarmor 完全正常運作。有關詳細信息，請參閱 [初始配置精靈](<220 Zenarmor（Sensei）透過網頁介面安裝.md#sensei-initial-configuration-wizard>)部分。

---

