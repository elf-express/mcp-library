---
title: "Zenarmor (Sensei) Installing via Web Interface"
source: "https://docs.opnsense.org/vendor/sunnyvalley/zenarmor_install.html"
chapter: ["Third-party Plugins","Sunnyvalley"]
order: 220
lang: "en"
translated_by: "native"
captured: "2026-09-26T11:33:34.831Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Zenarmor (Sensei) Hardware Requirements](<219 Zenarmor (Sensei) Hardware Requirements.md>)　｜　[下一篇：Zenarmor Installing via Command Line ➡](<221 Zenarmor Installing via Command Line.md>)

# Zenarmor (Sensei) Installing via Web Interface

> 章節：[Third-party Plugins](<000 目錄.md#c-47>) › [Sunnyvalley](<000 目錄.md#c-48>)

## Zenarmor (Sensei): Installing via Web Interface

Note

Zenarmor Free Edition is **forever free-of-charge**. We strongly recommend you register to keep in touch with updates and new features. You can register at [https://www.zenarmor.com/zenarmor-next-generation-firewall](https://www.zenarmor.com/zenarmor-next-generation-firewall)

Zenarmor may be installed using the web interface in OPNsense or using the command line interface via SSH or local system access (see [Zenarmor : Installing via Command Line](<221 Zenarmor Installing via Command Line.md>)). The preferred method is the web interface because the process of installing plugins in OPNsense is simple, and Zenarmor requires the use of the web interface to complete the initial configuration after installation.

To install plugins in OPNsense, you must use an account with administrative access.

Note

Before installing Zenarmor, you should ensure you meet the minimum system requirements in order to run Zenarmor or have the best user experience. See [Zenarmor (Sensei): Hardware Requirements](<219 Zenarmor (Sensei) Hardware Requirements.md>) for more information.

## Web Interface Installation

To install Zenarmor, you must first install the Sunny Valley Networks vendor repository plugin. Go to the System ‣ Firmware ‣ Plugins page. Click on the “+” icon next to os-sunnyvalley to install the plugin.

Once the vendor plugin is installed, you should see the Zenarmor plugin available in the list of plugins as os-sensei. If you do not see the Zenarmor plugin, you may need to refresh the “Plugins” page. Click the “+” icon next to os-sensei to install the plugin.

After installing Zenarmor, you should see the Zenarmor menu in the left sidebar of the OPNsense web interface. If you do not see the new, top-level menu, you may need to refresh the page.

[![../../_images/zenarmor-install-complete.png](<../images/22b92a16-zenarmor-install-complete.png>)](https://docs.opnsense.org/_images/zenarmor-install-complete.png)

Next, you will need to complete the “Initial Configuration Wizard” for Zenarmor to be fully operational.

## Initial Configuration Wizard

Regardless of the installation method you used, you will need to complete the initial configuration wizard before you may start using Zenarmor.

To start the “Initial Configuration Wizard”:

-   Log in to your OPNsense web interface
    
-   Click Zenarmor from the left menu
    
-   Click on the Dashboard sub-menu to open the configuration wizard
    

### 1- Welcome

-   Accept the Terms of Service and Privacy Policy by clicking on the checkbox.
    

[![../../_images/zenarmor-wizard-welcome.png](<../images/dc52a5ed-zenarmor-wizard-welcome.png>)](https://docs.opnsense.org/_images/zenarmor-wizard-welcome.png)

-   Click the I Agree button to continue to the Hardware Check & Reporting Database section.
    

### 2- Hardware Check & Reporting Database

Your hardware will be analyzed to ensure it meets the minimum requirements. You will receive one of the following responses: compatible hardware, low-end hardware, incompatible hardware. The setup will not continue if you have incompatible hardware.

[![../../_images/zenarmor-wizard-hardware-high-end.png](<../images/00e88d82-zenarmor-wizard-hardware-high-end.png>)](https://docs.opnsense.org/_images/zenarmor-wizard-hardware-high-end.png)

*Compatible*

[![../../_images/zenarmor-wizard-hardware-low-end.png](<../images/55819cee-zenarmor-wizard-hardware-low-end.png>)](https://docs.opnsense.org/_images/zenarmor-wizard-hardware-low-end.png)

*Low-end*

[![../../_images/zenarmor-wizard-hardware-incompatible.png](<../images/59125057-zenarmor-wizard-hardware-incompatible.png>)](https://docs.opnsense.org/_images/zenarmor-wizard-hardware-incompatible.png)

*Incompatible*

-   Select the database you wish to use for reporting. High-end systems will have 3 options, while low-end systems only have 2 options.
    

After the wizard completes the hardware analysis, select the database you wish to use for reporting. High-end systems will have 4 options, while low-end systems only have 3 options except Local ElasticSearch DB.

Note

Zenarmor offers the following Database deployment options:

-   Local ElasticSearch DB
    
-   Remote ElasticSearch DB
    
-   MongoDB Database
    
-   SQLite Database
    

Warning

If you wish to use a remote ElasticSearch database, you must choose it now since you cannot change this after the initial configuration wizard has been completed.

[![../../_images/zenarmor-wizard-reporting-database-high-end.png](<../images/16f47796-zenarmor-wizard-reporting-database-high-.png>)](https://docs.opnsense.org/_images/zenarmor-wizard-reporting-database-high-end.png)

*High-end*

[![../../_images/zenarmor-wizard-reporting-database-low-end.png](<../images/0b2b341a-zenarmor-wizard-reporting-database-low-e.png>)](https://docs.opnsense.org/_images/zenarmor-wizard-reporting-database-low-end.png)

*Low-end*

-   If you select “Use a Remote Elasticsearch Database”, you will be prompted to enter the URL, username, and password.
    

Note

If you have SOHO or higher Zenarmor paid subscription, we recommend that you install your license key before proceeding with the initial configuration wizard since this will activate a feature that will enable you to have central reporting for many firewalls from a single Elasticsearch instance. Otherwise, only a single remote ES instance can be used with a single firewall.

[![../../_images/zenarmor-wizard-reporting-database-remote.png](<../images/03c7c600-zenarmor-wizard-reporting-database-remot.png>)](https://docs.opnsense.org/_images/zenarmor-wizard-reporting-database-remote.png)

Click the Install Database button to install the local database if one is chosen and to continue to the Interface Selection section.

[![../../_images/zenarmor-installing-ecs.png](<../images/64892902-zenarmor-installing-ecs.png>)](https://docs.opnsense.org/_images/zenarmor-installing-ecs.png)

Click the Next button to proceed with interface selection.

[![../../_images/zenarmor-db-install-finished.png](<../images/938ae792-zenarmor-db-install-finished.png>)](https://docs.opnsense.org/_images/zenarmor-db-install-finished.png)

-   Click the Next button Interface Selection section.
    

### 3- Deployment Mode & Interface Selection

You may follow the instructions for Zenarmor deployment mode and interface selection:

Select the deployment mode depending on your topology and requirements. By default, the Routed mode with emulated netmap driver option is selected on OPNsense. You may find detailed information in the “Deployment Modes Guide”, see [here](https://www.zenarmor.com/docs/guides/deployment-modes).

**PREREQUISITE**

Before selecting Netmap driver deployment options, make sure that the hardware offloadings are disabled on your node. Since the Hardware Offloading feature is incompatible with Netmap.

[![../../_images/zenarmor-selecting-deployment-mode.png](<../images/98976c0f-zenarmor-selecting-deployment-mode.png>)](https://docs.opnsense.org/_images/zenarmor-selecting-deployment-mode.png)

You may check the CPU Pinning option. Zenarmor has a setting to make CPU pinning optional, giving you more flexibility in how you configure your system for optimal performance. By default, Zenarmor is pinned to a dedicated core in order to prevent CPU context-switching overhead. Because if the process wanders between CPU processors, CPU cache misses occur, which has a negative impact on performance.

You may disable this setting depending on your requirements by clicking on the Do not pin engine packet processors to dedicated CPU cores option.

-   Select the Ethernet Interface(s) to protect. To do so, click on an interface and use the right or left arrow buttons to move it to the protected/unprotected interfaces combo box.
    

For detailed information on “Deployment Modes”, see [here](https://www.zenarmor.com/docs/guides/deployment-modes).

[![../../_images/zenarmor-wizard-interface-selection-available.png](<../images/be348d7f-zenarmor-wizard-interface-selection-avai.png>)](https://docs.opnsense.org/_images/zenarmor-wizard-interface-selection-available.png)

Click the Set Security Zone drop-down menu to assign a tag for the interface. You may set a custom security zone name or select one of the options available, such as DMZ, LAN, guest, wifi, or wan.

[![../../_images/zenarmor-wizard-set-security-zone.png](<../images/3e7977ff-zenarmor-wizard-set-security-zone.png>)](https://docs.opnsense.org/_images/zenarmor-wizard-set-security-zone.png)

To add a custom security zone tag, click the Custom button in the Set Security Zone drop-down menu. After typing the new security zone name, such as vpn, click Add button.

### 4- Activate Subscription

Installation wizard offers you the following options in this step:

-   Start 15-day Free Trial of a Business Subscription
    
-   Activate your current subscription key
    
-   Continue with the Free Edition
    

If you wish to try the 15-day Free Business Edition, select the Get Me 15-day Free Trial of Business Subscription option and type your e-mail address to claim your subscription key.

**Tip**

Everyone who installs Zenarmor and login into their Zenconsole may take advantage of a 15-Day Free Trial of Zenarmor Business Edition without entering credit card information.

-   Click Next to continue to the Finish section.
    

If you have a subscription, select I already have my subscription key option to activate your subscription key.

[![../../_images/zenarmor-wizard-activating-subscription.png](<../images/2ca22f45-zenarmor-wizard-activating-subscription.png>)](https://docs.opnsense.org/_images/zenarmor-wizard-activating-subscription.png)

You may also use the Free Edition by selecting the Get Me the Free Edition option. You may enter your email address if you wish to subscribe to the Zenarmor email list to stay up-to-date on the latest news.

[![../../_images/zenarmor-getting-free-edition.png](<../images/56a757e1-zenarmor-getting-free-edition.png>)](https://docs.opnsense.org/_images/zenarmor-getting-free-edition.png)

Click Next to proceed to the Finish section.

### 5- Finish

-   Click the Complete button to save your initial configuration data and start using Zenarmor.
    

[![../../_images/zenarmor-wizard-finish.png](<../images/fda2489a-zenarmor-wizard-finish.png>)](https://docs.opnsense.org/_images/zenarmor-wizard-finish.png)

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Zenarmor (Sensei) Hardware Requirements](<219 Zenarmor (Sensei) Hardware Requirements.md>)　｜　[下一篇：Zenarmor Installing via Command Line ➡](<221 Zenarmor Installing via Command Line.md>)
