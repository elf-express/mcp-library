---
title: "Zenarmor (Sensei) Installing via Web Interface｜Zenarmor（Sensei）透過網頁介面安裝"
title_original: "Zenarmor (Sensei) Installing via Web Interface"
source: "https://docs.opnsense.org/vendor/sunnyvalley/zenarmor_install.html"
chapter: ["Third-party Plugins","Sunnyvalley"]
order: 220
lang: "bilingual"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:33:34.831Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Zenarmor (Sensei) Hardware Requirements｜Zenarmor（Sensei）硬體需求](<219 Zenarmor（Sensei）硬體需求.md>)　｜　[下一篇：Zenarmor Installing via Command Line｜透過命令列安裝 Zenarmor ➡](<221 透過命令列安裝 Zenarmor.md>)

# Zenarmor (Sensei) Installing via Web Interface｜Zenarmor（Sensei）透過網頁介面安裝

> 章節：[Third-party Plugins](<000 目錄.md#c-47>) › [Sunnyvalley](<000 目錄.md#c-48>)

## Zenarmor (Sensei): Installing via Web Interface｜Zenarmor（Sensei）：透過網頁介面安裝

Note

筆記

Zenarmor Free Edition is **forever free-of-charge**. We strongly recommend you register to keep in touch with updates and new features. You can register at [https://www.zenarmor.com/zenarmor-next-generation-firewall](https://www.zenarmor.com/zenarmor-next-generation-firewall)

Zenarmor 免費版**永久免費**。我們強烈建議您註冊，以便隨時了解更新和新功能。您可以在 [https://www.zenarmor.com/zenarmor-next-generation-firewall](https://www.zenarmor.com/zenarmor-next-generation-firewall)註冊。

Zenarmor may be installed using the web interface in OPNsense or using the command line interface via SSH or local system access (see [Zenarmor : Installing via Command Line](<221 透過命令列安裝 Zenarmor.md>)). The preferred method is the web interface because the process of installing plugins in OPNsense is simple, and Zenarmor requires the use of the web interface to complete the initial configuration after installation.

Zenarmor 可以透過 OPNsense 的 Web 介面安裝，也可以透過命令列介面SSH或本機系統存取進行安裝（請參閱 [Zenarmor：透過命令列安裝](<221 透過命令列安裝 Zenarmor.md>) ）。建議使用 Web 介面，因為在 OPNsense 中安裝插件的過程很簡單，而且 Zenarmor 需要透過 Web 介面完成安裝後的初始設定。

To install plugins in OPNsense, you must use an account with administrative access.

要在 OPNsense 中安裝插件，您必須使用具有管理員權限的帳戶。

Note

筆記

Before installing Zenarmor, you should ensure you meet the minimum system requirements in order to run Zenarmor or have the best user experience. See [Zenarmor (Sensei): Hardware Requirements](<219 Zenarmor（Sensei）硬體需求.md>) for more information.

安裝 Zenarmor 前，請確保您的系統符合運行 Zenarmor 或獲得最佳使用者體驗的最低系統要求。更多信息，請參閱 [Zenarmor (Sensei)：硬體要求](<219 Zenarmor（Sensei）硬體需求.md>) 。

## Web Interface Installation｜Web介面安裝

To install Zenarmor, you must first install the Sunny Valley Networks vendor repository plugin. Go to the System ‣ Firmware ‣ Plugins page. Click on the “+” icon next to os-sunnyvalley to install the plugin.

要安裝 Zenarmor，您必須先安裝 Sunny Valley Networks 供應商儲存庫外掛程式。轉到“系統”‣“韌體”‣“插件”頁面。點擊 os-sunnyvalley 旁邊的“+”圖示以安裝該插件。

Once the vendor plugin is installed, you should see the Zenarmor plugin available in the list of plugins as os-sensei. If you do not see the Zenarmor plugin, you may need to refresh the “Plugins”（外掛） page. Click the “+” icon next to os-sensei to install the plugin.

安裝完供應商插件後，您應該可以在插件清單中看到 Zenarmor 插件，名稱為 os-sensei。如果您沒有看到 Zenarmor 插件，可能需要重新整理“Plugins”（外掛）頁面。點擊 os-sensei 旁邊的「+」圖示即可安裝該插件。

After installing Zenarmor, you should see the Zenarmor menu in the left sidebar of the OPNsense web interface. If you do not see the new, top-level menu, you may need to refresh the page.

安裝 Zenarmor 後，您應該會在 OPNsense Web 介面的左側邊欄看到 Zenarmor 選單。如果您沒有看到新的頂級選單，可能需要重新整理頁面。

[![../../_images/zenarmor-install-complete.png](<../images/22b92a16-zenarmor-install-complete.png>)](https://docs.opnsense.org/_images/zenarmor-install-complete.png)

Next, you will need to complete the “Initial Configuration Wizard”（初始配置精靈） for Zenarmor to be fully operational.

接下來，您需要完成“Initial Configuration Wizard”（初始配置精靈）才能讓 Zenarmor 完全運作。

## Initial Configuration Wizard｜初始配置精靈

Regardless of the installation method you used, you will need to complete the initial configuration wizard before you may start using Zenarmor.

無論你使用哪種安裝方法，都需要先完成初始設定精靈才能開始使用 Zenarmor。

To start the “Initial Configuration Wizard”（初始配置精靈）:

開始“Initial Configuration Wizard”（初始配置精靈） ：

-   Log in to your OPNsense web interface  
    登入您的 OPNsense Web 介面
    
-   Click Zenarmor from the left menu  
    點選左側選單中的 Zenarmor
    
-   Click on the Dashboard sub-menu to open the configuration wizard  
    點選「儀表板」子選單開啟設定精靈
    

### 1- Welcome｜1- 歡迎

-   Accept the Terms of Service and Privacy Policy by clicking on the checkbox.  
    點擊複選框，即表示您接受服務條款和隱私權政策。
    

[![../../_images/zenarmor-wizard-welcome.png](<../images/dc52a5ed-zenarmor-wizard-welcome.png>)](https://docs.opnsense.org/_images/zenarmor-wizard-welcome.png)

-   Click the I Agree button to continue to the Hardware Check & Reporting Database section.  
    點擊「我同意」按鈕繼續進入硬體檢查和報告資料庫部分。
    

### 2- Hardware Check & Reporting Database｜2- 硬體檢查與報告資料庫

Your hardware will be analyzed to ensure it meets the minimum requirements. You will receive one of the following responses: compatible hardware, low-end hardware, incompatible hardware. The setup will not continue if you have incompatible hardware.

我們將分析您的硬件，以確保其滿足最低要求。您將收到以下三種回覆之一：相容硬體、低階硬體或不相容硬體。如果您的硬體不相容，安裝過程將無法繼續。

[![../../_images/zenarmor-wizard-hardware-high-end.png](<../images/00e88d82-zenarmor-wizard-hardware-high-end.png>)](https://docs.opnsense.org/_images/zenarmor-wizard-hardware-high-end.png)

*Compatible*

*相容的*

[![../../_images/zenarmor-wizard-hardware-low-end.png](<../images/55819cee-zenarmor-wizard-hardware-low-end.png>)](https://docs.opnsense.org/_images/zenarmor-wizard-hardware-low-end.png)

*Low-end*

*低端*

[![../../_images/zenarmor-wizard-hardware-incompatible.png](<../images/59125057-zenarmor-wizard-hardware-incompatible.png>)](https://docs.opnsense.org/_images/zenarmor-wizard-hardware-incompatible.png)

*Incompatible*

*不相容*

-   Select the database you wish to use for reporting. High-end systems will have 3 options, while low-end systems only have 2 options.  
    選擇您要用於產生報表的資料庫。高階系統將提供 3 個選項，而低端系統只有 2 個選項。
    

After the wizard completes the hardware analysis, select the database you wish to use for reporting. High-end systems will have 4 options, while low-end systems only have 3 options except Local ElasticSearch DB.

嚮導完成硬體分析後，選擇要用於報表的資料庫。高階系統將有 4 個選項，而低端系統除了本地 ElasticSearch DB外，只有 3 個選項。

Note

筆記

Zenarmor offers the following Database deployment options:

Zenarmor 提供以下資料庫部署選項：

-   Local ElasticSearch DB  
    本地 ElasticSearch DB
    
-   Remote ElasticSearch DB  
    遠端 ElasticSearch DB
    
-   MongoDB Database  
    MongoDB資料庫
    
-   SQLite Database  
    SQLite資料庫
    

Warning

警告

If you wish to use a remote ElasticSearch database, you must choose it now since you cannot change this after the initial configuration wizard has been completed.

如果您希望使用遠端 ElasticSearch 資料庫，則必須現在進行選擇，因為在初始設定精靈完成後將無法變更此設定。

[![../../_images/zenarmor-wizard-reporting-database-high-end.png](<../images/16f47796-zenarmor-wizard-reporting-database-high-.png>)](https://docs.opnsense.org/_images/zenarmor-wizard-reporting-database-high-end.png)

*High-end*

*高端*

[![../../_images/zenarmor-wizard-reporting-database-low-end.png](<../images/0b2b341a-zenarmor-wizard-reporting-database-low-e.png>)](https://docs.opnsense.org/_images/zenarmor-wizard-reporting-database-low-end.png)

*Low-end*

*低端*

-   If you select “Use a Remote Elasticsearch Database”（使用遠端 Elasticsearch 資料庫）, you will be prompted to enter the URL, username, and password.  
    如果您選擇“Use a Remote Elasticsearch Database”（使用遠端 Elasticsearch 資料庫） ，系統將提示您輸入URL 、使用者名稱和密碼。
    

Note

筆記

If you have SOHO or higher Zenarmor paid subscription, we recommend that you install your license key before proceeding with the initial configuration wizard since this will activate a feature that will enable you to have central reporting for many firewalls from a single Elasticsearch instance. Otherwise, only a single remote ES instance can be used with a single firewall.

如果您擁有 Zenarmor SOHO或更高版本的付費訂閱，我們建議您在進行初始設定精靈之前安裝許可證金鑰，因為這將啟動一項功能，使您能夠從單一 Elasticsearch 實例集中查看多個防火牆的報告。否則，單一防火牆只能使用一個遠端ES實例。

[![../../_images/zenarmor-wizard-reporting-database-remote.png](<../images/03c7c600-zenarmor-wizard-reporting-database-remot.png>)](https://docs.opnsense.org/_images/zenarmor-wizard-reporting-database-remote.png)

Click the Install Database button to install the local database if one is chosen and to continue to the Interface Selection section.

按一下「安裝資料庫」按鈕安裝本機資料庫（如果已選擇），然後繼續進入「介面選擇」部分。

[![../../_images/zenarmor-installing-ecs.png](<../images/64892902-zenarmor-installing-ecs.png>)](https://docs.opnsense.org/_images/zenarmor-installing-ecs.png)

Click the Next button to proceed with interface selection.

點選“下一步”按鈕繼續選擇介面。

[![../../_images/zenarmor-db-install-finished.png](<../images/938ae792-zenarmor-db-install-finished.png>)](https://docs.opnsense.org/_images/zenarmor-db-install-finished.png)

-   Click the Next button Interface Selection section.  
    點擊“下一步”按鈕，進入“介面選擇”部分。
    

### 3- Deployment Mode & Interface Selection｜3-部署模式與介面選擇

You may follow the instructions for Zenarmor deployment mode and interface selection:

您可以按照以下說明進行 Zenarmor 部署模式和介面選擇：

Select the deployment mode depending on your topology and requirements. By default, the Routed mode with emulated netmap driver option is selected on OPNsense. You may find detailed information in the “Deployment Modes Guide”（部署模式指南）, see [here](https://www.zenarmor.com/docs/guides/deployment-modes).

根據您的拓撲結構和需求選擇部署模式。預設情況下，OPNsense 會選擇具有類比 netmap 驅動程式選項的路由模式。您可以在“Deployment Modes Guide”（部署模式指南）中找到詳細信息，請參閱[此處](https://www.zenarmor.com/docs/guides/deployment-modes) 。

**PREREQUISITE**

Before selecting Netmap driver deployment options, make sure that the hardware offloadings are disabled on your node. Since the Hardware Offloading feature is incompatible with Netmap.

在選擇 Netmap 驅動程式部署選項之前，請確保節點上的硬體卸載功能已停用。因為硬體卸載功能與 Netmap 不相容。

[![../../_images/zenarmor-selecting-deployment-mode.png](<../images/98976c0f-zenarmor-selecting-deployment-mode.png>)](https://docs.opnsense.org/_images/zenarmor-selecting-deployment-mode.png)

You may check the CPU Pinning option. Zenarmor has a setting to make CPU pinning optional, giving you more flexibility in how you configure your system for optimal performance. By default, Zenarmor is pinned to a dedicated core in order to prevent CPU context-switching overhead. Because if the process wanders between CPU processors, CPU cache misses occur, which has a negative impact on performance.

您可以勾選CPU進程綁定」選項。 ZenArmor 提供了一個設置，可以將CPU進程綁定」設為可選，讓您可以更靈活地配置系統以獲得最佳效能。預設情況下，ZenArmor 會綁定到一個專用核心，以防止CPU上下文切換開銷」。因為如果進程在CPU處理器”之間來回切換，就會發生CPU快取未命中”，從而對效能產生負面影響。

You may disable this setting depending on your requirements by clicking on the Do not pin engine packet processors to dedicated CPU cores option.

您可以根據需要停用此設置，方法是點擊「不要將引擎資料包處理器固定到專用CPU核心」選項。

-   Select the Ethernet Interface(s) to protect. To do so, click on an interface and use the right or left arrow buttons to move it to the protected/unprotected interfaces combo box.  
    選擇要保護的乙太網路介面。為此，請按一下一個接口，然後使用向右或向左箭頭按鈕將其移至受保護/未受保護接口組合框中。
    

For detailed information on “Deployment Modes”（部署模式）, see [here](https://www.zenarmor.com/docs/guides/deployment-modes).

有關“Deployment Modes”（部署模式）的詳細信息，請參閱[此處](https://www.zenarmor.com/docs/guides/deployment-modes) 。

[![../../_images/zenarmor-wizard-interface-selection-available.png](<../images/be348d7f-zenarmor-wizard-interface-selection-avai.png>)](https://docs.opnsense.org/_images/zenarmor-wizard-interface-selection-available.png)

Click the Set Security Zone drop-down menu to assign a tag for the interface. You may set a custom security zone name or select one of the options available, such as DMZ, LAN, guest, wifi, or wan.

點選「設定安全區域」下拉式選單，為介面分配標籤。您可以設定自訂安全區域名稱，也可以選擇可用選項之一，例如DMZ, LAN 、訪客、wifi 或 wan。

[![../../_images/zenarmor-wizard-set-security-zone.png](<../images/3e7977ff-zenarmor-wizard-set-security-zone.png>)](https://docs.opnsense.org/_images/zenarmor-wizard-set-security-zone.png)

To add a custom security zone tag, click the Custom button in the Set Security Zone drop-down menu. After typing the new security zone name, such as vpn, click Add button.

若要新增自訂安全區域標籤，請點選「設定安全區域」下拉式選單中的「自訂」按鈕。輸入新的安全區域名稱（例如 vpn）後，點擊「新增」按鈕。

### 4- Activate Subscription｜4. 啟用訂閱

Installation wizard offers you the following options in this step:

安裝精靈在此步驟中為您提供以下選項：

-   Start 15-day Free Trial of a Business Subscription  
    立即開始 15 天免費試用企業訂閱
    
-   Activate your current subscription key  
    啟動您目前的訂閱金鑰
    
-   Continue with the Free Edition  
    繼續使用免費版
    

If you wish to try the 15-day Free Business Edition, select the Get Me 15-day Free Trial of Business Subscription option and type your e-mail address to claim your subscription key.

如果您想試用 15 天免費商業版，請選擇「取得 15 天免費商業訂閱試用」選項，然後輸入您的電子郵件地址以領取您的訂閱金鑰。

**Tip**

**提示**

Everyone who installs Zenarmor and login into their Zenconsole may take advantage of a 15-Day Free Trial of Zenarmor Business Edition without entering credit card information.

所有安裝 Zenarmor 並登入 Zenconsole 的用戶都可以享受 Zenarmor 商業版 15 天免費試用，無需輸入信用卡資訊。

-   Click Next to continue to the Finish section.  
    點擊“下一步”繼續進入“完成”部分。
    

If you have a subscription, select I already have my subscription key option to activate your subscription key.

如果您已訂閱，請選擇「我已經有訂閱金鑰」選項以啟動您的訂閱金鑰。

[![../../_images/zenarmor-wizard-activating-subscription.png](<../images/2ca22f45-zenarmor-wizard-activating-subscription.png>)](https://docs.opnsense.org/_images/zenarmor-wizard-activating-subscription.png)

You may also use the Free Edition by selecting the Get Me the Free Edition option. You may enter your email address if you wish to subscribe to the Zenarmor email list to stay up-to-date on the latest news.

您也可以選擇「取得免費版」選項來使用免費版。如果您想訂閱 Zenarmor 的郵件清單以了解最新資訊，可以輸入您的電子郵件地址。

[![../../_images/zenarmor-getting-free-edition.png](<../images/56a757e1-zenarmor-getting-free-edition.png>)](https://docs.opnsense.org/_images/zenarmor-getting-free-edition.png)

Click Next to proceed to the Finish section.

點擊“下一步”進入“完成”部分。

### 5- Finish｜5- 完成

-   Click the Complete button to save your initial configuration data and start using Zenarmor.  
    點擊「完成」按鈕儲存初始設定資料並開始使用 Zenarmor。
    

[![../../_images/zenarmor-wizard-finish.png](<../images/fda2489a-zenarmor-wizard-finish.png>)](https://docs.opnsense.org/_images/zenarmor-wizard-finish.png)

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Zenarmor (Sensei) Hardware Requirements｜Zenarmor（Sensei）硬體需求](<219 Zenarmor（Sensei）硬體需求.md>)　｜　[下一篇：Zenarmor Installing via Command Line｜透過命令列安裝 Zenarmor ➡](<221 透過命令列安裝 Zenarmor.md>)
