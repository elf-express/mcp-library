---
title: "Hello world 模組和插件"
title_original: "Hello world module & plugin"
source: "https://docs.opnsense.org/development/examples/helloworld.html"
chapter: ["Development Manual","Examples"]
order: 366
lang: "zh-TW"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:34:45.939Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：範例](<365 範例.md>)　｜　[下一篇：使用網格模組和插件 ➡](<367 使用網格模組和插件.md>)

# Hello world 模組和插件

> 章節：[Development Manual](<000 目錄.md#c-52>) › [Examples](<000 目錄.md#c-62>)

創建 Hello World 模組

[![../../_images/Hello-World.jpg](<../images/c297a591-Hello-World.jpg>)](https://docs.opnsense.org/_images/Hello-World.jpg)

## 目標

本樣本的目標

---

本範例中建立的「Hello world」模組的目標是控制系統上名為「testConnection.py」的程序，該程式是[GitHub上提供的範例套件](#example-source)的一部分。它將嘗試使用純SMTP發送電子郵件，並以JSON文字訊息的形式回覆該嘗試的結果。

我們的應用程式需要一些設定才能正常運行，例如 IP 位址和電子郵件地址，而且我們需要能夠運行該應用程式。由於該應用程式會為用戶返回一些有價值的數據，因此我們需要能夠獲取回應數據。

[![overview](<../images/bc1dc75e-Helloworld_overview.png>)](https://docs.opnsense.org/_images/Helloworld_overview.png)

---

## 指南

指南和編碼風格

所有 OPNsense 模組和應用程式都有一些基本的風格和編碼指南，您應該遵循這些指南。

### 我們

為 OPNsense 建立模組時，請務必依照以下格式命名元件：供應商名稱/模組名稱

在我們的範例中，這將是：OPNsense/HelloWorld

### PHP代碼

請對所有新程式碼使用PSR -12 樣式 ([https://www.php-fig.org/psr/psr-12/](https://www.php-fig.org/psr/psr-12/) )。

### 大樓

務必確保職責分離清晰，後端呼叫（例如 shell 腳本）應使用 configd 系統實現，所有與客戶端的通訊都應透過API端點處理。 （範例提供了更多關於其工作原理的見解）。

後端程式不應直接存取 config.xml 檔案。如果需要數據，則應由範本系統處理所需的輸出（大多數應用程式、守護程式和工具都有其自身的配置格式）。通常情況下，沒有充分的理由去規避現有的標準。

如果您遵循這些基本規則，您將自動為系統管理員建立命令結構，並為組件的API提供第三方工具的連接器。

### 目錄結構

我們將逐步建立 HelloWorld 範例，並建立多個檔案。以下是目錄結構以及將要建立的檔案：

```
./src/opnsense/
  ├── mvc/
  |   └── app/
  |       ├── controllers/
  |       |   └── OPNsense/HelloWorld/
  |       |       ├── IndexController.php
  |       |       ├── Api/
  |       |       |   ├── ServiceController.php
  |       |       |   ├── SettingsController.php
  |       |       └── forms/
  |       |           └── general.xml
  |       ├── models/
  |       |   └── OPNsense/HelloWorld/
  |       |       ├── HelloWorld.php
  |       |       ├── HelloWorld.xml
  |       |       ├── ACL/
  |       |       |   └── ACL.xml
  |       |       └── Menu/
  |       |           └── Menu.xml
  |       └── views/
  |           └── OPNsense/HelloWorld/
  |               └── index.volt
  ├── scripts/
  |   └── helloworld/
  |       └── testConnection.py
  └── service/
      ├── templates/
      |   └── OPNsense/HelloWorld/
      |       ├── +TARGETS
      |       └── helloworld.conf
      └── conf/actions.d/
          └── actions_helloworld.conf
```

## 骨骼

搭建前端/中介軟體框架

我們專案的第一步是建立一個框架，用來承載前端/中介軟體的結構。請記住，只需建立框架即可，添加空文件會導致錯誤。

### 模型

對於我們的範例應用程序，我們需要設定一些配置數據，所有新風格的項目都應該將這些數據放在自己的模型中。

首先，我們在 models/OPNsense/HelloWorld 目錄下建立兩個檔案。

第一個是模型類別的樣板，它應該包含模型特定的方法，並且（透過從 BaseModel 派生）自動理解第二個檔案。

/usr/local/opnsense/mvc/app/models/OPNsense/HelloWorld/HelloWorld.php

```php
<?php
namespace OPNsense\HelloWorld;

use OPNsense\Base\BaseModel;

class HelloWorld extends BaseModel
{
}
```

並非所有模組都在PHP類中包含額外的程式碼，有時所有標準行為對於您的模組/應用程式來說已經足夠了。

注意事項

當儲存的資料具有衍生資料時，模型通常是建立這些衍生資料的地方。一個很好的例子是，當服務依賴資料內部的結構時，可以使用標誌來確定服務是否已啟用（例如，可以啟用和/或停用的介面清單）。

這是模型XML模板，我們的框架結構大致如下：

/usr/local/opnsense/mvc/app/models/OPNsense/HelloWorld/HelloWorld.xml

```xml
<model>
    <mount>//OPNsense/helloworld</mount>
    <description>the OPNsense "Hello World" application</description>
    <items>
        <!-- container -->
    </items>
</model>
```

mount 標籤的內容非常重要，它指定了該模型在 config.xml 檔案中負責配置的位置。其他模型無法向同一區域寫入資料。您應該使用供應商名稱和模組名稱來命名此位置，以便其他人可以輕鬆識別。

使用描述標籤來標識你的模型，最後一個標籤是項目標籤，實際的定義將放在這裡。現在我們暫時將其留空，因為我們將繼續進行創建模型框架的下一步。

### 看法

頁面模板（視圖）

我們應該添加一個（Volt）模板，用於我們模組的索引頁；我們將在這裡使用相同的命名約定。

在 views/OPNsense/HelloWorld 目錄下建立一個名為 index.volt 的模板，其中包含以下資料：

/usr/local/opnsense/mvc/app/views/OPNsense/HelloWorld/index.volt

```xml
<h1>Hello World!</h1>
```

### 控制器

下一步是新增控制器，系統路由會自動識別這些控制器。控制器將使用者互動與邏輯和表現部分連接起來。

每個 OPNsense 模組都應該將表現部分與邏輯部分分離，因此每個模組都應該有多個控制器。

我們的第一個控制器負責將模板渲染給用戶，並連接我們剛剛建立的用戶視圖。首先，我們在 controllers/OPNsense/HelloWorld/ 目錄下建立一個名為 IndexController.php PHP文件，內容如下：

/usr/local/opnsense/mvc/app/controllers/OPNsense/HelloWorld/IndexController.php

```php
<?php
namespace OPNsense\HelloWorld;
class IndexController extends \OPNsense\Base\IndexController
{
    public function indexAction()
    {
        // pick the template to serve to our users.
        $this->view->pick('OPNsense/HelloWorld/index');
    }
}
```

此時，您應該能夠透過造訪以下位置（在以 root 使用者身分登入防火牆後）來測試您目前的工作是否成功：

```
http[s]://<your ip>/ui/helloworld/
```

這樣就能顯示你在範本中加入的「Hello World!」文字了。

[![Serving the first "hello world" page](<../images/c91981d5-HelloWorld_Empty_template.png>)](https://docs.opnsense.org/_images/HelloWorld_Empty_template.png)

接下來我們要建立的兩個控制器將用於系統的 API，它們應該負責服務操作和配置資料的擷取/變更。

它們應該位於名為 Api 的控制器子目錄中，並繼承相應的類別。

對於我們的模組，我們創建了兩個API控制器，一個用於控制設置，另一個用於執行服務操作。 （分別命名為 SettingsController.php 和 ServiceController.php）

/usr/local/opnsense/mvc/app/controllers/OPNsense/HelloWorld/Api/SettingsController.php

```php
<?php
namespace OPNsense\HelloWorld\Api;

use \OPNsense\Base\ApiMutableModelControllerBase;
class SettingsController extends ApiMutableModelControllerBase
{
}
```

/usr/local/opnsense/mvc/app/controllers/OPNsense/HelloWorld/Api/ServiceController.php

```php
<?php
namespace OPNsense\HelloWorld\Api;

use \OPNsense\Base\ApiMutableServiceControllerBase;
class ServiceController extends ApiMutableServiceControllerBase
{
}
```

注意事項

為了簡單起見，我們在範例中使用`ApiMutableModelControllerBase` ，實際上，該類別衍生自`ApiControllerBase` ，這是 API 端點的必要條件。使用`ApiMutableModelControllerBase`可以避免重複編寫樣板程式碼。

## 第一份輸入表單

建立您的第一個輸入表單

建立表單的第一步是確定我們應該收集哪些資訊。

我們的簡單應用程式將使用設定檔 XML 中的資料發送電子郵件。對於此模組，我們希望收集以下資訊：

| 屬性 | 預設值 | 描述 |
| --- | --- | --- |
| 常規.已啟用 | 已啟用 (1) | 是否啟用此模組（布林值） |
| General.SMTPHost | <empty> | IP遠端 SMTP 主機的位址 |
| 一般.FromEmail | [sample@example.com](mailto:sample%40example.com) | 寄件者電子郵件地址 |
| 一般.ToEmail | <empty> | 用於接收測試郵件的電子郵件地址 |
| 常規描述 | <empty> | 描述，用作電子郵件主題。 |

### 新增字段

向模型添加字段

在建立框架時，我們創建了一個空模型（ XML ），現在我們將為其填充一些屬性。模型的 items 部分XML應包含您希望在應用程式中使用的結構，您可以建立樹狀結構來儲存資料。所有葉子節點都應包含一個字段類型，用於標識和驗證其內容。我們應用程式的屬性清單可以表示為：

/usr/local/opnsense/mvc/app/models/OPNsense/HelloWorld/HelloWorld.xml

```
………
<items>
    <!-- container -->
    <general>
        <!-- fields -->
        <Enabled type="BooleanField">
            <default>1</default>
            <Required>Y</Required>
        </Enabled>
        <SMTPHost type="NetworkField">
            <Required>Y</Required>
        </SMTPHost>
        <FromEmail type="EmailField">
            <default>sample@example.com</default>
            <Required>Y</Required>
        </FromEmail>
        <ToEmail type="EmailField">
            <Required>Y</Required>
        </ToEmail>
        <Description type="TextField">
            <Required>Y</Required>
        </Description>
    </general>
</items>
………
```

所有可用的欄位類型都可以在 models/OPNsense/Base/FieldTypes 目錄中找到。如果特定欄位類型支援其他參數（例如用於驗證），則也應該在模型中註冊這些參數（就像 Enabled 中的預設標籤一樣）。

提示

有關[創建模型](<251 創建模型.md>)中字段類型的更多內容。

### XML

建立簡報XML以填滿您的模板

由於建立表單是系統的關鍵功能之一，我們建立了一些易於使用的包裝器來引導您完成整個過程。首先，我們建立一個用於展示的XML文件，該文件定義了要使用的字段，並添加了一些供模板渲染的資訊。在控制器目錄下的 forms 子目錄中建立一個名為 general.xml 的檔案。接下來，複製以下內容：

/usr/local/opnsense/mvc/app/controllers/OPNsense/HelloWorld/forms/general.xml

```xml
<form>
    <field>
        <id>helloworld.general.Enabled</id>
        <label>enabled</label>
        <type>checkbox</type>
        <help>Enable this feature</help>
    </field>
    <field>
        <id>helloworld.general.SMTPHost</id>
        <label>SMTPHost</label>
        <type>text</type>
        <help><![CDATA[ip address of the mail host]]></help>
        <hint>choose a valid IPv4/v6 address</hint>
    </field>
    <field>
        <id>helloworld.general.FromEmail</id>
        <label>Email (from)</label>
        <type>text</type>
    </field>
    <field>
        <id>helloworld.general.ToEmail</id>
        <label>Email (to)</label>
        <type>text</type>
    </field>
    <field>
        <id>helloworld.general.Description</id>
        <label>Description</label>
        <type>text</type>
    </field>
 </form>
```

所有項目應至少包含一個 ID（用於對應資料來源/目標位置）、一個類型（用於顯示方式）和一個標籤（用於向使用者標識該項目）。您也可以選擇新增其他字段，例如說明訊息，或將某些功能標記為僅供進階使用者使用。 （Volt 模板定義了哪些屬性可用。）

現在我們需要告訴控制器使用這些資訊並將其傳遞給模板，因此請修改 IndexController.php 檔案並添加以下程式碼行：

```
$this->view->generalForm = $this->getForm("general");
```

我們準備用這些資訊更新 (Volt) 模板。讓我們刪除「 <h1> Hello World! </h1> 」這一行，並將其替換為類似這樣的內容：

```
{{ partial("layout_partials/base_form",['fields':generalForm,'id':'frm_GeneralSettings'])}}
```

這指示範本系統使用 generalForm 的內容在HTML頁面中新增一個名為 frm\_GeneralSettings 的表單。此表單基於標準系統中已包含的標準範本零件 base\_form.volt。

再次開啟頁面時，頁面將呈現如下效果：

[![Template with fields without content](<../images/ced1cee3-HelloWorld_Template_no_content.png>)](https://docs.opnsense.org/_images/HelloWorld_Template_no_content.png)

### 創建API呼叫

建立API呼叫以檢索和儲存數據

該框架提供了一些實用工具，可以使用您定義的模型從配置XML獲取和設定資料。將模型綁定到系統的第一步是將`SettingsController`指向該模型，並告訴它如何傳回資料。為此，我們需要在先前建立的控制器中添加兩行程式碼：

/usr/local/opnsense/mvc/app/controllers/OPNsense/HelloWorld/Api/SettingsController.php

```php
 class SettingsController extends ApiMutableModelControllerBase
 {
     protected static $internalModelClass = 'OPNsense\HelloWorld\HelloWorld';
     protected static $internalModelName = 'helloworld';

     public function getAction()
     {
         $data = parent::getAction();
         $data[self::$internalModelName]['general']['%ToEmail'] = gettext('Enter recipient here');

         return $data;
     }
 }
```

注意事項

`getAction()`函數可以為資料獲取添加動態的額外資訊。稍後在資料取得部分會對此進行更詳細的解釋。

`$internalModelClass`為您建立模型，因此您不必手動建立模型（並定義獲取和設定操作）， `$internalModelName`命名回應容器。

同樣，我們也會對`ServiceController`進行同樣的操作。

/usr/local/opnsense/mvc/app/controllers/OPNsense/HelloWorld/Api/SettingsController.php

```
 class ServiceController extends ApiMutableServiceControllerBase
 {
     protected static $internalServiceClass = 'OPNsense\HelloWorld\HelloWorld';
     protected static $internalServiceClass = 'helloworld';
 }
```

您可以（以 root 使用者身分登入）透過造訪以下地址來測試結果：

```
http[s]://<your ip>/api/helloworld/settings/get
```

這將在瀏覽器中輸出類似這樣的 JSON 結構：

```json
{
    "helloworld": {
        "general": {
        "Enabled": "1",
        "SMTPHost": "",
        "FromEmail": "sample@example.com",
        "ToEmail": "",
        "%ToEmail": "Enter recipient here",
        "Description": ""
        }
    }
}
```

注意事項

外部容器名為“helloworld”，包含模型中定義的所有欄位。

注意事項

`ApiMutableModelControllerBase`還包含更多用於網格操作的共享功能，我們的大多數 API 控制器都以此為基礎。如果對 get 操作本身的內部機制感興趣，請在`ApiMutableModelControllerBase.php`中搜尋`getAction` 。

注意事項

`%ToEmail` 與 `<hint>Enter recipient here</hint>` 類似，不同之處在於它可用於在資料擷取期間產生動態提示。帶有 `%` 前綴的字段無法存儲，並且與模型數據無關，但確實引用不帶前綴的相應字段類型。

### 支援 jQuery API調用

更新視圖以支援使用 jQuery 的API調用

現在我們需要將事件與後端程式碼關聯起來，以便能夠載入和保存表單。透過使用 OPNsense 庫，您可以自動驗證資料。

將以下內容新增至 HelloWorld 模組的 index.volt 範本：

```html
<script type="text/javascript">
    $( document ).ready(function() {
        mapDataToFormUI({'frm_GeneralSettings':"/api/helloworld/settings/get"}).done(function(data){
            // place actions to run after load, for example update form styles.
        });

        // link save button to API set action
        $("#saveAct").click(function(){
            saveFormToEndpoint("/api/helloworld/settings/set",'frm_GeneralSettings',function(){
                // action to run after successful save, for example reconfigure service.
            });
        });
    });
</script>

<div class="col-md-12">
    <button class="btn btn-primary"  id="saveAct" type="button"><b>{{ lang._('Save') }}</b></button>
</div>
```

第一段 JavaScript 程式碼用於處理開啟表單時的資料加載，然後將一個按鈕連結到儲存事件。

我們來試一試，直接保存數據，不做任何修改。

[![Form with validation errors](<../images/e2509714-HelloWorld_form_validation_error.png>)](https://docs.opnsense.org/_images/HelloWorld_form_validation_error.png)

接下來，請更正錯誤並再次儲存。儲存成功後，資料應該會儲存在 config.xml 檔案中。如果您想更改驗證訊息，只需編輯模型XML並在 ValidationMessage 標籤中新增您的訊息即可。例如：

/usr/local/opnsense/mvc/app/models/OPNsense/HelloWorld/HelloWorld.xml

```xml
<ToEmail type="EmailField">
    <Required>Y</Required>
    <ValidationMessage>Please specify a valid email address.</ValidationMessage>
</ToEmail>
```

當提供的電子郵件地址無效時，會將「電子郵件地址無效。」變更為「請提供有效的電子郵件地址。」。由於此字段為必填項，因此對於空字段，驗證訊息始終顯示為“必須輸入值。”

### 新增操作

為模組添加一些活動

我們的基礎模組提供了一種透過 Web 介面讀取和修改配置資料的方法（未來也將透過 API 供其他使用者使用）。下一步是為系統添加一些活動，所有後端應用程式都應該使用各自的配置，在實際應用中，我們將盡可能保持配置的標準化。

在本範例中，我們將遵循與其他服務相同的流程，開始為範例應用程式編寫一些設定資料。這意味著，建立一個範本並將其連接到我們的保存操作中。

我們的範例將寫入一個簡單的配置文件，該文件儲存在 /usr/local/etc/helloworld/helloworld.conf。

configd 系統負責在收到請求時更新該檔案的內容，它透過在其範本資料夾中找到的定義來實現這一點。本範例將使用以下路徑來儲存後端範本：

```
/usr/local/opnsense/service/templates/OPNsense/HelloWorld/
```

首先，我們新增內容定義，建立一個名為 + TARGETS的文件，該文件應包含以下資訊：

```
helloworld.conf:/usr/local/etc/helloworld/helloworld.conf
```

這實際上是告訴引擎，在同一資料夾中會有一個名為「helloworld.conf」的文件，該文件與config.xml一起為/usr/local/etc/helloworld/helloworld.conf檔案中的檔案提供資料。

接下來需要在模板目錄中建立 helloworld.conf 檔案。為了保持簡潔，我們只需在啟用模組時，將資料複製到 ini 檔案中進行結構化配置即可。

/usr/local/opnsense/service/templates/OPNsense/HelloWorld/helloworld.conf

```
{% if not helpers.empty('OPNsense.helloworld.general.Enabled') %}
[general]
SMTPHost={{ OPNsense.helloworld.general.SMTPHost|default("") }}
FromEmail={{ OPNsense.helloworld.general.FromEmail|default("") }}
ToEmail={{ OPNsense.helloworld.general.ToEmail|default("") }}
Subject={{ OPNsense.helloworld.general.Description|default("") }}
{% endif %}
```

現在我們需要透過在 ServiceController 中新增服務操作來重新載入此模組（或在實際應用中，這可能是一個服務）。編輯 controllers/OPNsense/HelloWorld/Api/ServiceController.php 文件，並將後端模組新增至 use 部分，如下所示：

```
use \OPNsense\Core\Backend;
```

這樣我們就可以在此類中使用後端通訊了。接下來，使用以下程式碼在類別中新增一個名為「reloadAction」的新動作：

/usr/local/opnsense/mvc/app/controllers/OPNsense/HelloWorld/Api/ServiceController.php

```php
public function reloadAction()
{
    $status = "failed";
    if ($this->request->isPost()) {
        $status = strtolower(trim((new Backend())->configdRun('template reload OPNsense/HelloWorld')));
    }
    return ["status" => $status];
}
```

此操作會驗證操作類型（必須始終為POST才能啟用CSRF保護），並新增一個用於重新載入範本的後端操作。成功後，該操作會將“status”:”ok”作為 JSON 物件傳回給客戶端。

現在我們可以刷新模板內容了，但使用者介面還不知道這一點。為了將範本載入關聯到保存操作中，我們將返回 index.volt 視圖，並在「saveFormToEndPoint」的大括號內新增以下 jQuery/框架程式碼。

/usr/local/opnsense/mvc/app/views/OPNsense/HelloWorld/index.volt

```
ajaxCall(url="/api/helloworld/service/reload", sendData={},callback=function(data,status) {
    // action to run after reload
});
```

如果您現在儲存表單（啟用此功能後），您應該會看到一個新檔案。

```
helloworld.conf:/usr/local/etc/helloworld/helloworld.conf
```

包含類似這樣的內容：

```
[general]
SMTPHost=127.0.0.1
FromEmail=sample@example.com
ToEmail=sample@example.com
Subject=test
```

現在我們已經實現了以下功能：輸入資料、驗證資料並將其保存為使用該資料的實際服務或應用程式所需的格式。因此，如果您有一個想要整合到用戶介面中的第三方應用程序，現在您應該能夠生成它所需的數據了。 （還有更多內容需要學習，但這些是基礎知識。）

但是我們現在應該如何控制第三方程式呢？這是下一步需要解決的問題。

## 控制樣本

與其直接從PHP程式碼運行各種 shell 命令（這些命令通常需要 root 權限，例如啟動/停止服務等），我們應該始終與後端進程通信，後端進程保存著可以運行的模板，並保護您的系統免受任意命令的執行。

這種方法的另一個優點是，這裡定義的所有命令都可以從防火牆的命令列運行，從而簡化了維護工作。例如，可以透過執行以下命令從命令列刷新 helloworld 配置：

```
configctl template reload OPNsense/HelloWorld
```

為新應用程式向系統註冊新操作時，首先要做的是建立配置模板。

```
/usr/local/opnsense/service/conf/actions.d/actions_helloworld.conf
```

然後在模板中加入以下命令：

```yaml
[test]
command:/usr/local/opnsense/scripts/helloworld/testConnection.py
parameters:
type:script_output
message:hello world module test
```

讓我們透過命令列重啟 configd 來測試一下新命令：

```
service configd restart
```

並使用以下命令測試我們的新命令：

```
configctl helloworld test
```

應該會傳回 JSON 格式的回應。

下一步是在控制器（中間件）中使用此命令，就像我們在模板操作中所做的那樣。為了保持一致性，我們將操作命名為 testAction，並讓它在使用POST類型請求時將 JSON 資料傳遞給客戶端。

/usr/local/opnsense/mvc/app/controllers/OPNsense/HelloWorld/Api/ServiceController.php

```php
public function testAction()
{
    if ($this->request->isPost()) {
        $bckresult = json_decode(trim((new Backend())->configdRun("helloworld test")), true);
        if ($bckresult !== null) {
            // only return valid json type responses
            return $bckresult;
        }
    }
    return ["message" => "unable to run config action"];
}
```

現在我們可以讓使用者介面感知到該操作，放置一個按鈕，並在 index.volt 中連結一個操作。使用以下元素：

  

（在腳本部分）

/usr/local/opnsense/mvc/app/views/OPNsense/HelloWorld/index.volt

```
$("#testAct").SimpleActionButton({
    onAction: function(data) {
        $("#responseMsg").removeClass("hidden").html(data['message']);
    }
});
```

（在HTML部分）

/usr/local/opnsense/mvc/app/views/OPNsense/HelloWorld/index.volt

```html
<div class="alert alert-info hidden" role="alert" id="responseMsg">

</div>
<button class="btn btn-primary" id="testAct" data-endpoint="/api/helloworld/service/test" data-label="{{ lang._('Test') }}"></button>
```

提示

您可能已經注意到， `testAct`按鈕使用不同的方法來呼叫端點，它使用了 [SimpleActionButton](<261 看構造（和工具）.md#simpleactionbutton>)包裝器，這簡化了簡單操作的實作。

現在返回頁面，使用儲存按鈕儲存一些數據，然後按測試按鈕查看結果。

[![test the application action](<../images/2756af97-HelloWorld_first_test_action.png>)](https://docs.opnsense.org/_images/HelloWorld_first_test_action.png)

## 多語言/翻譯

OPNsense 支援多種語言，例如英語、德語和日語。這要歸功於我們使用了 gettext 函式庫，該函式庫可供所有GUI元件使用。雖然基於XML的使用者介面會自動支援它，但可能仍需要手動呼叫（例如按鈕、選項卡等）。

如果您有一個靜態字串，則應按如下方式將其新增至經典的PHP頁面中：

```
<?= gettext('your string here') ?>
```

這樣就得到了一個Volt模板：

```
{{ lang._('your string here') }}
```

如果您的字串並非純文本，而是包含非靜態字詞、 HTML標籤和其他動態內容，則需要使用格式字串。這樣，您可以使用佔位符來表示不應出現在翻譯檔案中的元素。

對於 PHP 來說，它的運作方式如下：

```
<?= sprintf(gettext('your %s here'), $data) ?>
```

對於 Volt 模板，其工作原理如下：

```
{{ lang._('your %s here') | format(data) }}
```

注意事項

你應該將NEVER應該像句子一樣連在一起的字串拆分。這樣做會使插件難以翻譯，並降低 OPNsense 在其他語言中的品質。

## 選單系統插件

大多數模組和應用程式都需要在選單系統中佔有一席之地，您可以透過在模型目錄下的 Menu/Menu.xml 中為您的模組建立 Menu.xml 定義來輕鬆實現這一點。

現在，讓我們將「hello world」程式註冊到選單的使用者部分，方法是將以下內容新增到 Menu.xml 檔案中：

/usr/local/opnsense/mvc/app/models/OPNsense/HelloWorld/Menu/Menu.xml

```xml
<menu>
    <Lobby>
        <HelloWorld VisibleName="Hello World!" cssClass="fa fa-comment-o fa-fw" url="/ui/helloworld"/>
    </Lobby>
</menu>
```

選單系統會進行緩存，因此您可能暫時無法在UI檔案中看到變更。如果`/tmp/opnsense_menu_cache.xml`檔案存在，請將其刪除。現在，當您刷新頁面時，應該會發現選單系統會自動更新資訊。

[![menu registration](<../images/bca19158-HelloWorld_menu_registration.png>)](https://docs.opnsense.org/_images/HelloWorld_menu_registration.png)

## 存取控制插件（ ACL ）

如果要授權使用者存取此模組，我們可以向該模組新增一個ACL 。如果沒有它，則只有管理員使用者才能存取。在模型目錄下建立一個名為ACL/ACL XML文件，並將以下內容放入其中：

/usr/local/opnsense/mvc/app/models/OPNsense/HelloWorld/ ACL/ACL .xml

```xml
<acl>
    <!-- unique acl key, must be globally unique for all ACLs  -->
    <page-user-helloworld>
        <name>WebCfg - Users: Hello World! </name>
        <description>Allow access to the Hello World! module</description>
        <patterns>
            <pattern>ui/helloworld/*</pattern>
            <pattern>api/helloworld/*</pattern>
        </patterns>
    </page-user-helloworld>
</acl>
```

這將建立一個名為「page-user-helloworld」的ACL金鑰，該金鑰授權存取此應用程式的使用者介面和API 。現在，您可以從系統使用者管理員授予此模組的存取權限。

由於ACL系統啟用了緩存，您可能暫時無法在使用者管理頁面看到變更。如果`/tmp/opnsense_acl_cache.json`檔案存在，請將其刪除。現在，刷新用戶管理頁面，您應該可以看到新的ACL可以分配了。

## 創建一個可安裝的插件

所有文件都已建立在其原始位置（OPNsense 機器上的 /usr/local/…），現在我們可以從中建立軟體包了。要充分利用此流程並建立實際的軟體包，最好設定一個完整的建置環境（詳情請參閱此處：[https://github.com/opnsense/tools](https://github.com/opnsense/tools) ）。

一切準備就緒後，我們將建立一個新的插件目錄。在本例中，我們將使用以下目錄：

```
/usr/plugins/devel/helloworld/
```

新增一個新的 Makefile 文件，其中包含我們插件的資訊：

```
PLUGIN_NAME=     helloworld
PLUGIN_VERSION=        1.0
PLUGIN_COMMENT=        A sample framework application
#PLUGIN_DEPENDS=
PLUGIN_MAINTAINER= user@domain

.include "../../Mk/plugins.mk"
```

  

然後在此處建立 src 目錄：

```
/usr/plugins/devel/helloworld/src/
```

接下來，將 /usr/local/ 目錄下建立的所有檔案複製到這個新的 src 目錄中，結果將會得到以下檔案清單：

```
src/opnsense/mvc/app/controllers/OPNsense/HelloWorld/Api/ServiceController.php
src/opnsense/mvc/app/controllers/OPNsense/HelloWorld/Api/SettingsController.php
src/opnsense/mvc/app/controllers/OPNsense/HelloWorld/IndexController.php
src/opnsense/mvc/app/controllers/OPNsense/HelloWorld/forms/general.xml
src/opnsense/mvc/app/models/OPNsense/HelloWorld/ACL/ACL.xml
src/opnsense/mvc/app/models/OPNsense/HelloWorld/HelloWorld.php
src/opnsense/mvc/app/models/OPNsense/HelloWorld/HelloWorld.xml
src/opnsense/mvc/app/models/OPNsense/HelloWorld/Menu/Menu.xml
src/opnsense/mvc/app/views/OPNsense/HelloWorld/index.volt
src/opnsense/scripts/helloworld/testConnection.py
src/opnsense/service/templates/OPNsense/HelloWorld/+TARGETS
src/opnsense/service/templates/OPNsense/HelloWorld/helloworld.conf
src/opnsense/service/conf/actions.d/actions_helloworld.conf
```

一切準備就緒後，您可以使用 `/usr/tools` 目錄下的 `make plugins` 指令建立插件包。建置結果將是一個標準的 pkg 軟體包，您可以將其安裝到任何 OPNsense 系統上，安裝後即可立即使用。所有插件都以 `os-` 為前綴，因此我們新的軟體包檔案名稱為：

```
os-helloworld-1.0.txz
```

（- 1.0來自 makefile 中的版本）

參考

-   此範例的來源：[https://github.com/opnsense/plugins/tree/master/devel/helloworld](https://github.com/opnsense/plugins/tree/master/devel/helloworld)
    
-   組裝說明：[https://github.com/opnsense/tools](https://github.com/opnsense/tools)
    
-   實用前端開發：[https://github.com/opnsense/ui\_devtools](https://github.com/opnsense/ui_devtools)
    
-   前端模板語言參考（Volt）：[https://docs.phalcon.io/latest/volt/](https://docs.phalcon.io/latest/volt/)
    
-   配置模板語言參考（與 Volt 基本相同）：[https://jinja.palletsprojects.com/en/stable/](https://jinja.palletsprojects.com/en/stable/)
    
-   OPNsense 架構 [架構](<242 大樓.md>)
    
-   OPNsense 建立模型 [開發：前端/建立模型](https://docs.opnsense.org/index.php/Develop:Frontend/Creating_models)

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：範例](<365 範例.md>)　｜　[下一篇：使用網格模組和插件 ➡](<367 使用網格模組和插件.md>)
