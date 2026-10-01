---
title: "Zenarmor Installing via Command Line｜透過命令列安裝 Zenarmor"
title_original: "Zenarmor Installing via Command Line"
source: "https://docs.opnsense.org/vendor/sunnyvalley/zenarmor_cmd_install.html"
chapter: ["Third-party Plugins","Sunnyvalley"]
order: 221
lang: "bilingual"
translated_by: "google_v2"
captured: "2026-09-26T11:33:32.284Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Zenarmor (Sensei) Installing via Web Interface｜Zenarmor（Sensei）透過網頁介面安裝](<220 Zenarmor（Sensei）透過網頁介面安裝.md>)　｜　[下一篇：Q-Feeds connector｜Q-Feeds 連接器 ➡](<222 Q-Feeds 連接器.md>)

# Zenarmor Installing via Command Line｜透過命令列安裝 Zenarmor

> 章節：[Third-party Plugins](<000 目錄.md#c-47>) › [Sunnyvalley](<000 目錄.md#c-48>)

## Zenarmor : Installing via Command Line｜Zenarmor：透過命令列安裝

Although the preferred method of installation is the web interface, Zenarmor may also be installed using the command line interface via SSH or direct system access. Once Zenarmor is installed, you will need to complete the initial configuration using the web interface.

雖然首選的安裝方式是透過網頁介面，但也可以經由SSH命令列介面或直接系統存取來安裝 Zenarmor。安裝完成後，您需要使用網頁介面完成初始設定。

To install Sensei in OPNsense with the command line interface, you must use an administrative account with shell access.

若要使用命令列介面在 OPNsense 中安裝 Sensei，您必須使用具有 shell 存取權限的管理員帳戶。

## Command Line Installation｜命令列安裝

The command line installation method was the primary means for installing Zenarmor before it was officially available on the “Plugins”（外掛） page in the OPNsense web interface. This option is still available for users who have direct access to the OPNsense system yet prefer using command line tools or who may only have remote shell access via SSH to administrate their OPNsense installations. However, accessing the web interface is still necessary after installation to complete the initial configuration of Zenarmor.

在 ZenArmor 正式上線 OPNsense Web 介面的“Plugins”（外掛）頁面之前，命令列安裝是主要的安裝方式。對於那些可以直接存取 OPNsense 系統但喜歡使用命令列工具，或者只能透過SSH遠端存取 shell 來管理 OPNsense 安裝的使用者來說，命令列安裝仍然可用。但是，安裝完成後，仍然需要存取 Web 介面來完成 ZenArmor 的初始配置。

You may install Zenarmor if you have local system access to OPNsense or remote access using SSH.

如果您有本機系統存取權限，可以使用SSH進行遠端訪問，則可以安裝 Zenarmor。

### Local System Access｜本地系統訪問

When you have local access to OPNsense, you may simply log into OPNsense using the “root” user or another administrator account. You should see a list of OPNsense menu options.

如果您擁有 OPNsense 的本機存取權限，只需使用「root」使用者或其他管理員帳戶登入即可。您應該會看到 OPNsense 選單選項清單。

[![../../_images/opnsense-direct-system-access.png](<../images/5ab77e10-opnsense-direct-system-access.png>)](https://docs.opnsense.org/_images/opnsense-direct-system-access.png)

### SSH Access｜SSH訪問

If you only have shell access to OPNsense, you may install Zenarmor remotely by logging into OPNsense using a SSH client with the following command where “root” is the administrator account and “your-firewall-ip” is the IP address or hostname of the OPNsense system. You should see a list of OPNsense menu options.

如果您只有 OPNsense 的 shell 存取權限，則可以使用以下命令透過用戶SSH遠端登入 OPNsense 來安裝 Zenarmor，其中「root」是管理員帳戶，「your-firewall-ip」是IP系統的位址或主機名稱。您應該會看到 OPNsense 選單選項清單。

```bash
$ ssh root@your-firewall-ip
```

[![../../_images/opnsense-ssh-login.png](<../images/a1545dda-opnsense-ssh-login.png>)](https://docs.opnsense.org/_images/opnsense-ssh-login.png)

### Download & Run Zenarmor Installer｜下載並運行 Zenarmor 安裝程序

Once you are successfully logged into OPNsense either by local system access or SSH, enter option “8” to open the shell. Run the following commands to install vendor repository and Zenarmor package.

成功登入 OPNsense（可透過本機系統存取或SSH後，輸入選項「8」開啟 shell。執行以下命令安裝供應商倉庫和 Zenarmor 軟體套件。

```
pkg install os-sunnyvalley
```

```
pkg install os-sensei
```

This will copy the installation files onto the filesystem and will add a top-level menu item within the OPNsense web interface. Depending on the speed of your hardware and Internet connection, the installation may take several minutes to complete.

這會將安裝檔案複製到檔案系統中，並在 OPNsense Web 介面中新增一個頂級選單項目。根據您的硬體速度和網路連線速度，安裝可能需要幾分鐘才能完成。

Once the installation has been completed, you may disconnect from your terminal session.

安裝完成後，您可以中斷與終端機會話的連線。

You will now need to complete the “Initial Configuration Wizard”（初始配置精靈） for Zenarmor to be fully operational. See the [Initial Configuration Wizard](<220 Zenarmor（Sensei）透過網頁介面安裝.md#sensei-initial-configuration-wizard>) section for information.

您現在需要完成“Initial Configuration Wizard”（初始配置精靈）才能使Zenarmor完全正常運作。有關信息，請參閱[初始配置精靈](<220 Zenarmor（Sensei）透過網頁介面安裝.md#sensei-initial-configuration-wizard>)部分。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Zenarmor (Sensei) Installing via Web Interface｜Zenarmor（Sensei）透過網頁介面安裝](<220 Zenarmor（Sensei）透過網頁介面安裝.md>)　｜　[下一篇：Q-Feeds connector｜Q-Feeds 連接器 ➡](<222 Q-Feeds 連接器.md>)
