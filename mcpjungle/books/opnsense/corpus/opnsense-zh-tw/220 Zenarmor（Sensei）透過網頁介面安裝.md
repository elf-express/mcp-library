---
title: "Zenarmor（Sensei）透過網頁介面安裝"
title_original: "Zenarmor (Sensei) Installing via Web Interface"
source: https://docs.opnsense.org/vendor/sunnyvalley/zenarmor_install.html
chapter: ["Third-party Plugins","Sunnyvalley"]
order: 220
lang: "zh-TW"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:33:34.831Z"
---

# Zenarmor（Sensei）透過網頁介面安裝

## Zenarmor（Sensei）：透過網頁介面安裝

注意事項

Zenarmor 免費版**永久免費**。我們強烈建議您註冊，以便隨時了解更新和新功能。您可以在 [https://www.zenarmor.com/zenarmor-next-generation-firewall](https://www.zenarmor.com/zenarmor-next-generation-firewall)註冊。

Zenarmor 可以透過 OPNsense 的 Web 介面安裝，也可以透過命令列介面SSH或本機系統存取進行安裝（請參閱 [Zenarmor：透過命令列安裝](<221 透過命令列安裝 Zenarmor.md>) ）。建議使用 Web 介面，因為在 OPNsense 中安裝插件的過程很簡單，而且 Zenarmor 需要透過 Web 介面完成安裝後的初始設定。

要在 OPNsense 中安裝插件，您必須使用具有管理員權限的帳戶。

注意事項

安裝 Zenarmor 前，請確保您的系統符合運行 Zenarmor 或獲得最佳使用者體驗的最低系統要求。更多信息，請參閱 [Zenarmor (Sensei)：硬體要求](<219 Zenarmor（Sensei）硬體需求.md>) 。

## Web介面安裝

要安裝 Zenarmor，您必須先安裝 Sunny Valley Networks 供應商儲存庫外掛程式。轉到“系統”‣“韌體”‣“插件”頁面。點擊 os-sunnyvalley 旁邊的“+”圖示以安裝該插件。

安裝完供應商插件後，您應該可以在插件清單中看到 Zenarmor 插件，名稱為 os-sensei。如果您沒有看到 Zenarmor 插件，可能需要刷新「插件」頁面。點擊 os-sensei 旁邊的「+」圖示即可安裝該插件。

安裝 Zenarmor 後，您應該會在 OPNsense Web 介面的左側邊欄看到 Zenarmor 選單。如果您沒有看到新的頂級選單，可能需要重新整理頁面。

[圖](https://docs.opnsense.org/_images/zenarmor-install-complete.png)

接下來，您需要完成“初始設定精靈”，Zenarmor 才能完全運作。

## 初始配置精靈

無論你使用哪種安裝方法，都需要先完成初始設定精靈才能開始使用 Zenarmor。

啟動“初始設定精靈”：

-   登入您的 OPNsense Web 介面
    
-   點選左側選單中的 Zenarmor
    
-   點選「儀表板」子選單開啟設定精靈
    

### 1- 歡迎

-   點擊複選框，即表示您接受服務條款和隱私權政策。
    

[圖](https://docs.opnsense.org/_images/zenarmor-wizard-welcome.png)

-   點擊「我同意」按鈕繼續進入硬體檢查和報告資料庫部分。
    

### 2- 硬體檢查與報告資料庫

我們將分析您的硬件，以確保其滿足最低要求。您將收到以下三種回覆之一：相容硬體、低階硬體或不相容硬體。如果您的硬體不相容，安裝過程將無法繼續。

[圖](https://docs.opnsense.org/_images/zenarmor-wizard-hardware-high-end.png)

*相容的*

[圖](https://docs.opnsense.org/_images/zenarmor-wizard-hardware-low-end.png)

*低端*

[圖](https://docs.opnsense.org/_images/zenarmor-wizard-hardware-incompatible.png)

*不相容*

-   選擇您要用於產生報表的資料庫。高階系統將提供 3 個選項，而低端系統只有 2 個選項。
    

嚮導完成硬體分析後，選擇要用於報表的資料庫。高階系統將有 4 個選項，而低端系統除了本地 ElasticSearch DB外，只有 3 個選項。

注意事項

Zenarmor 提供以下資料庫部署選項：

-   本地 ElasticSearch DB
    
-   遠端 ElasticSearch DB
    
-   MongoDB資料庫
    
-   SQLite資料庫
    

警告

如果您希望使用遠端 ElasticSearch 資料庫，則必須現在進行選擇，因為在初始設定精靈完成後將無法變更此設定。

[圖](https://docs.opnsense.org/_images/zenarmor-wizard-reporting-database-high-end.png)

*高端*

[圖](https://docs.opnsense.org/_images/zenarmor-wizard-reporting-database-low-end.png)

*低端*

-   如果您選擇“使用遠端 Elasticsearch 資料庫”，系統將提示您輸入URL 、使用者名稱和密碼。
    

注意事項

如果您擁有 Zenarmor SOHO或更高版本的付費訂閱，我們建議您在進行初始設定精靈之前安裝許可證金鑰，因為這將啟動一項功能，使您能夠從單一 Elasticsearch 實例集中查看多個防火牆的報告。否則，單一防火牆只能使用一個遠端ES實例。

[圖](https://docs.opnsense.org/_images/zenarmor-wizard-reporting-database-remote.png)

按一下「安裝資料庫」按鈕安裝本機資料庫（如果已選擇），然後繼續進入「介面選擇」部分。

[圖](https://docs.opnsense.org/_images/zenarmor-installing-ecs.png)

點選“下一步”按鈕繼續選擇介面。

[圖](https://docs.opnsense.org/_images/zenarmor-db-install-finished.png)

-   點擊“下一步”按鈕，進入“介面選擇”部分。
    

### 3-部署模式和介面選擇

您可以按照以下說明選擇 Zenarmor 部署模式和介面：

根據您的拓撲結構和需求選擇部署模式。預設情況下，OPNsense 會選擇具有類比 netmap 驅動程式選項的路由模式。您可以在“部署模式指南”中找到詳細信息，請參閱[此處](https://www.zenarmor.com/docs/guides/deployment-modes) 。

**PREREQUISITE**

在選擇 Netmap 驅動程式部署選項之前，請確保節點上的硬體卸載功能已停用。因為硬體卸載功能與 Netmap 不相容。

[圖](https://docs.opnsense.org/_images/zenarmor-selecting-deployment-mode.png)

您可以勾選CPU進程綁定」選項。 ZenArmor 提供了一個設置，可以將CPU進程綁定」設為可選，讓您在配置系統以獲得最佳效能時擁有更大的靈活性。預設情況下，ZenArmor 會綁定到一個專用核心，以防止CPU上下文切換開銷」。因為如果進程在CPU處理器”之間來回切換，就會發生CPU快取未命中”，從而對效能產生負面影響。

您可以根據需要停用此設置，方法是點擊「不要將引擎資料包處理器固定到專用CPU核心」選項。

-   選擇要保護的乙太網路介面。為此，請按一下一個接口，然後使用向右或向左箭頭按鈕將其移至受保護/未受保護接口組合框中。
    

有關“部署模式”的詳細信息，請參閱[此處](https://www.zenarmor.com/docs/guides/deployment-modes) 。

[圖](https://docs.opnsense.org/_images/zenarmor-wizard-interface-selection-available.png)

點選「設定安全區域」下拉式選單，為介面分配標籤。您可以設定自訂安全區域名稱，也可以選擇可用選項之一，例如DMZ, LAN 、訪客、wifi 或 wan。

[圖](https://docs.opnsense.org/_images/zenarmor-wizard-set-security-zone.png)

若要新增自訂安全區域標籤，請點選「設定安全區域」下拉式選單中的「自訂」按鈕。輸入新的安全區域名稱（例如 vpn）後，點擊「新增」按鈕。

### 4. 啟用訂閱

安裝精靈在此步驟中為您提供以下選項：

-   立即開始 15 天免費試用企業訂閱
    
-   啟動您目前的訂閱金鑰
    
-   繼續使用免費版
    

如果您想試用 15 天免費商業版，請選擇「取得 15 天免費商業訂閱試用」選項，然後輸入您的電子郵件地址以領取您的訂閱金鑰。

**提示**

所有安裝 Zenarmor 並登入 Zenconsole 的用戶都可以享受 Zenarmor 商業版 15 天免費試用，無需輸入信用卡資訊。

-   點擊“下一步”繼續進入“完成”部分。
    

如果您已訂閱，請選擇「我已經有訂閱金鑰」選項以啟動您的訂閱金鑰。

[圖](https://docs.opnsense.org/_images/zenarmor-wizard-activating-subscription.png)

您也可以選擇「取得免費版」選項來使用免費版。如果您想訂閱 Zenarmor 的郵件清單以了解最新資訊，可以輸入您的電子郵件地址。

[圖](https://docs.opnsense.org/_images/zenarmor-getting-free-edition.png)

點擊“下一步”進入“完成”部分。

### 5- 完成

-   點擊「完成」按鈕儲存初始設定資料並開始使用 Zenarmor。
    

[圖](https://docs.opnsense.org/_images/zenarmor-wizard-finish.png)