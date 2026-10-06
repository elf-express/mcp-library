---
title: "UIBootgrid"
source: "https://docs.opnsense.org/development/frontend/bootgrid.html"
chapter: ["Development Manual","Frontend"]
order: 262
lang: "bilingual"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:33:53.586Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：View construction (and tools)｜查看施工（和工具）](<261 查看施工（和工具）.md>)　｜　[下一篇：Dashboard widgets｜儀錶板小部件 ➡](<263 儀錶板小部件.md>)

# UIBootgrid

> 章節：[Development Manual](<000 目錄.md#c-52>) › [Frontend](<000 目錄.md#c-55>)

The UIBootgrid system is a wrapper around [Tabulator](https://tabulator.info/) and provides a generic table system that is reusable on all pages requiring data listing and manipulation.

UIBootgrid 系統是 [Tabulator](https://tabulator.info/)的封裝，它提供了一個通用的表格系統，可以在所有需要資料清單和操作的頁面上重複使用。

## Setup｜設定

To get started, see [Using grids module & plugin](<367 使用網格模組和插件.md>). The example will show you how to get started with a minimal grid setup and how this front-end code ties to the controller layer.

首先，請參閱[使用網格模組和插件](<367 使用網格模組和插件.md>) 。此範例將向您展示如何使用最小的網格設定開始，以及此前端程式碼如何與控制器層關聯。

## Basic Layout｜基本佈局

Since the controller layer defines standardized output and expects standardized input, it’s possible to construct and feed a grid by simply defining a set of endpoints as explained in the setup:

由於控制器層定義了標準化的輸出並期望標準化的輸入，因此只需定義一組端點即可建立網格並為其提供數據，如設定中所述：

```
$("#{{formGridAddress['table_id']}}").UIBootgrid(
    {
        search:'/api/gridexample/settings/search_item/',
        get:'/api/gridexample/settings/get_item/',
        set:'/api/gridexample/settings/set_item/',
        add:'/api/gridexample/settings/add_item/',
        del:'/api/gridexample/settings/del_item/',
        toggle:'/api/gridexample/settings/toggle_item/',
        info:'/api/gridexample/settings/info'
    }
);
```

You can use the browser developer tool to inspect the request/response structures of each operation. For example, the `search` endpoint looks like this:

您可以使用瀏覽器開發者工具來檢查每個操作的請求/回應結構。例如， `search`端點如下圖所示：

**Request:**

**要求：**

```json
{
    "current": 1,
    "rowCount": 50,
    "sort": {}
}
```

**Response:**

**回覆:**

```
{
    "rows": [
        {
            "uuid": "3b4e949d-443b-4127-a709-1e41589db462",
            ...
        },
        ...
    ],
    "rowCount": 1,
    "total": 1,
    "current": 1
}
```

Note

筆記

`info` endpoints are not used very often (and can safely be omitted), these are mainly intended as simple trigger to display an info dialog.

`info`端點不常用（可以安全地省略），它們主要用作顯示訊息對話框的簡單觸發器。

## Column Setup｜列設定

The columns and the associated properties can be defined in two ways:

列及其相關屬性可以透過兩種方式定義：

-   Through a form, if creation, deletion, updating and adding are to be supported.  
    透過表單，支援建立、刪除、更新和新增操作。
    
-   Through a `<table>` structure, only if the `search` endpoint is exclusively required (static data)  
    透過`<table>`結構，僅當`search`端點是絕對必需的（靜態資料）時才需要。
    

## `form`

In forms, column properties are defined in the `<grid_view>` tag as explained in [Define dialog items](<367 使用網格模組和插件.md#define-dialog-items>)

在表單中，列屬性在`<grid_view>`標籤中定義，如 [定義對話方塊項目](<367 使用網格模組和插件.md#define-dialog-items>)中所述。

## `table`

When using a table, column properties are set as `data-` attributes. For example:

使用表格時，列屬性設定為`data-`屬性。例如：

```xml
<table id="livelog-table" class="table table-condensed table-hover table-striped table-responsive">
    <thead>
        <tr>
            <th data-column-id="interface" data-formatter="interface" data-sortable="false" data-width="80">{{ lang._('Interface') }}</th>
            <th data-column-id="dir" data-type="string" data-formatter="direction" data-sortable="false" data-width="30"></th>
            ...
        <tr>
    </thead>
</table>
```

If constructing using a `table`, the minimum setup requires a `data-column-id` to be set in order to map the row data to the appropriate cell. Additionally, column header text (`label`) is set on the element itself.

如果使用`table`進行構造，則最低設定要求是設定`data-column-id`以便將行資料對應到對應的儲存格。此外，還需要在元素本身上設定列標題文字 ( `label` )。

Note

筆記

Internally, forms are translated to table structures.

在內部，表單被轉換為表格結構。

## `properties`

The following column properties are available:

以下列屬性可用：

| Property<br>屬性 | Type<br>類型 | Default<br>預設值 | Description<br>描述 |
| --- | --- | --- | --- |
| `sorter` | `string` | `null` | Sorter function to use if `ajax: false`.<br>如果`ajax: false`則使用排序函數。 |
| `formatter` | `string` | `null` | Formatter function to use for this column. See [options.formatters](#formatters).<br>此列要使用的格式化函數。請參閱 [options.formatters](#formatters) 。 |
| `headerFormatter` | `string` | `null` | Header formatter function to use for this column. See [options.headerFormatters](#headerformatters).<br>此列所使用的標題格式化函數。請參閱 [options.headerFormatters](#headerformatters) 。 |
| `visible` | `boolean` | `true` | If this column should be rendered by default. Users are always allow to toggle the column visibility, unless this has been disabled through `selectable`.<br>如果此列預設顯示，則使用者可以隨時切換列的可見性，除非已透過`selectable`停用此功能。 |
| `selectable` | `boolean` | `true` | If the visibility of this column can be toggled on/off. Use this if you require columns to be (in)visible at all times.<br>是否可以開啟/關閉該列的可見性。如果您需要列始終可見（不可見），請使用此選項。 |
| `sequence` | `number` | `null` | Sequence number to force columns in a certain order. Keep in mind that users can re-order columns.<br>用於強制列依特定順序排列的序號。請注意，使用者可以重新排列列的順序。 |
| `width` | `number` | `null` | Default width in pixels. Users can change this by resizing the columns.<br>預設寬度（像素）。使用者可以透過調整列寬來變更此值。 |
| `min-width` | `number` | `null` | Minimum width in pixels. Use this to prevent users resizing lower than this given threshold.<br>最小寬度（像素）。使用此設定可防止使用者將影像調整到小於此閾值的大小。 |
| `max-width` | `number` | `null` | Maximum width in pixels. Use this to prevent users resizing higher than this given threshold.<br>最大寬度（像素）。使用此設定可防止使用者將影像調整到超過此閾值的大小。 |
| `sortable` | `boolean` | `true` | If this columnm header can be clicked to sort on this column.<br>若可以點選此列標題依此列排序。 |

## Configuration Reference｜配置參考

The `UIBootgrid` initialization object starts with the CRUD methods as stated above, but the whole structure contaions a lot of options to modify the behavior to fit your purpose.

`UIBootgrid`初始化物件以上面提到的CRUD方法開始，但整個結構包含許多選項，可以修改行為以適應您的目的。

The top-level options are layed out as follows:

頂級選項如下：

```
config
├── search
├── get
├── set
├── add
├── del
├── toggle
├── info
├── options
│   ├── ...
│   ├── ...
│   └── ...
├── commands
│   ├── ...
│   └── ...
├── tabulatorOptions
    ├── ...
    └── ...
```

## `options`

General settings for bootgrid behavior

引導網格行為的常規設置

<table>
<tr><th>Property<br>屬性</th><th>Type<br>類型</th><th>Default<br>預設值</th><th>Description<br>描述</th></tr>
<tr><td><code>datakey<br>資料鍵</code></td><td><code>string<br>字串</code></td><td><code>"uuid"</code></td><td>Defines the property in the data that is used for indexing into the grid. Since most model data is uniquely identified through a<br>定義用於在網格中建立索引的資料屬性。由於大多數模型資料都透過UUID, this property defaults to<br>唯一標識，因此此屬性預設為<code>uuid</code>. However, in some situations you may wish to override this if the data uses a different key.<br>。但是，在某些情況下，如果資料使用不同的鍵，您可能需要覆寫此值</td></tr>
<tr><td><code>disableScroll</code></td><td><code>boolean</code></td><td><code>false</code></td><td>Disables in-grid vertical scrolling behavior. Setting this to<br>停用網格內垂直捲動。將其設為<code>true</code>means all rows will be rendered if not constrained by pagination, so be aware of the performance impact if your grid contains many rows.<br>表示如果未受分頁限制，則所有行都會渲染，因此如果您的網格包含很多行，請注意效能影響</td></tr>
<tr><td><code>sorting<br>排序</code></td><td><code>boolean<br>布爾值</code></td><td><code>true</code></td><td>Whether sorting should be enabled. Sorting is triggered through header clicks.<br>是否啟用排序。排序透過點擊標題列觸發。</td></tr>
<tr><td><code>rowCount<br>行數</code></td><td><code>array<br>數組</code></td><td><code>[50, 100, 200, 500, 1000, true]</code></td><td>An array of numbers that defines the selection of row counts a user can select. The special value<br>一個數字數組，用於定義使用者可以選擇的行數範圍。特殊值<code>true</code>, means “all rows”.<br>表示「所有行」。</td></tr>
<tr><td><code>formatters<br>格式化程式</code></td><td><code>object<br>物件</code></td><td><code>Internal formatters<br>內部格式化程式</code></td><td>Formatters for values in cells. See<br>單元格值格式化程式。請參閱<a href="https://docs.opnsense.org/development/frontend/bootgrid.html#formatters">options.formatters</a>.</td></tr>
<tr><td><code>headerFormatters<br>列標題格式化程式</code></td><td><code>object<br>物件</code></td><td><code>{}</code></td><td>Formatters for the headers of columns. See<br>列標題的格式化程式。參見<a href="https://docs.opnsense.org/development/frontend/bootgrid.html#headerformatters">options.headerFormatters</a>.</td></tr>
<tr><td><code>statusMapping<br>狀態映射</code></td><td><code>object<br>目的</code></td><td><code>{}</code></td><td>A key-value pair representing status colors. For example:<br>表示狀態顏色的鍵值對。例如：<br>statusMapping: { 0: "fw-pass", 1: "fw-nat", 2: "fw-block", }<br>狀態映射：{ 0: "fw-pass", 1: "fw-nat", 2: "fw-block", }<br><br>To use this, each row must contain a<br>要使用此功能，每一行必須包含一個<code>status<br>地位</code>property set to one of the keys defined in the status mapping. UIBootgrid will automatically add the value as a class to the cell element. The values must be valid classes defined in<br>屬性設定為狀態映射中定義的某個鍵。 UIBootGrid 會自動將該值作為類別新增至單元格元素。這些值必須是已定義的有效類別。CSS. This is mainly used to give rows a specific background color based on their status.<br>此功能主要用於根據行的狀態為其賦予特定的背景顏色。</td></tr>
<tr><td><code>sorters</code></td><td><code>object</code></td><td><code>Internal sorters</code></td><td>Specify one or more custom sorter functions indexed by key. To instruct a column to use this sorter, set the <code>sorter</code> property through the <code>grid_view</code> tag as explained in <a href="https://docs.opnsense.org/development/examples/using_grids.html#define-dialog-items">Define dialog items</a>. These sorters are only applied if <code>ajax: false</code>, meaning that all sorting logic happens locally.</td></tr>

<tr><td><code>排序器</code></td><td><code>物件</code></td><td><code>內部排序器</code></td><td>指定一個或多個按鍵索引的自訂排序函數。若要指示列使用此排序器，請依照<code>定義對話方塊項目</code>中的說明<a href="https://docs.opnsense.org/development/examples/using_grids.html#define-dialog-items">透過<code> grid_view </code>標籤設定 sorter </a>屬性。這些排序器僅在<code> : false </code>時應用，這表示所有排序邏輯都在本地執行</td></tr>
<tr><td><code>requestHandler</code></td><td><code>function</code></td><td><code>null</code></td><td>Request handler callback function that’s executed before the<br>在AJAXcall.<br>调用之前执行的请求处理程序回调函数。<br>The function expects 1 parameter:<br>此函數需要1個參數：<code>params</code>and must return this same parameter. This parameter is an object that contains all data to be sent to the endpoint. With this function you may modify/override the data sent to the endpoint before it’s sent.<br>且必須傳回相同的參數。此參數是一個對象，包含要傳送到端點的所有資料。使用此功能，您可以在發送之前修改/覆蓋發送到端點的資料。</td></tr>
<tr><td><code>responseHandler</code></td><td><code>function</code></td><td><code>null</code></td><td>Response handler callback function that’s executed after<br>響應處理回呼函數，在AJAXresponse. This function expects 1 parameter:<br>response 之後執行。此函數接受一個參數：<code>response</code>and must return this same parameter. This parameter contains the response from the called endpoint. You may use this function to modify/override the response before it’s used by the grid system.<br>並且必須傳回該參數。此參數包含來自被呼叫端點的回應。您可以使用此函數在網格系統使用回應之前對其進行修改/覆蓋</td></tr>
<tr><td><code>resetButton<br>重設按鈕</code></td><td><code>boolean<br>布爾值</code></td><td><code>true</code></td><td>Determines if the grid reset button should be rendered. The grid locally persists certain changes by default, such as column resizes, sorting behavior etc. This button clears the persistence and resets the grid to all defaults.<br>確定是否應渲染網格重設按鈕。預設情況下，網格會在本機上儲存某些更改，例如列寬調整、排序方式等。此按鈕會清除這些儲存設置，並將網格重設為所有預設值。</td></tr>
<tr><td><code>searchSettings<br>搜尋設定</code></td><td><code>object<br>物件</code></td><td><code>{delay: 1000}<br>{延遲: 1000}</code></td><td>Allows modifying search behaviour of the grid. Currently only “delay” is defined and set to 1000ms by default. Delay is the amount of time waiting before reloading the grid after search.<br>允許修改網格的搜尋行為。目前僅定義了「延遲」選項，預設值為 1000 毫秒。延遲是指搜尋後重新載入網格之前等待的時間。</td></tr>
<tr><td><code>navigation<br>導覽</code></td><td><code>boolean<br>布爾值</code></td><td><code>true</code></td><td>If the action bar, pagination and footer should be rendered.<br>是否渲染操作列、分頁及頁尾。</td></tr>
<tr><td><code>ajax</code></td><td><code>boolean</code></td><td><code>true</code></td><td>If disabled, ignores any<br>如果禁用，则忽略定义的任何CRUDendpoint defined. Use the<br>端点。使用<a href="https://docs.opnsense.org/development/frontend/bootgrid.html#replace">replace(rows)</a>or<br>或<a href="https://docs.opnsense.org/development/frontend/bootgrid.html#append">append(rows)</a>functions to add data to the grid yourself. If disabled, any sorting, filtering or pagination will happen locally, as all data is expected to be present in the grid. You can use the<br>函數自行將資料加入網格中。如果停用，任何排序、過濾或分頁都將在本地進行，因為所有資料都應出現在網格中。您可以使用<code>sorters<br>排序器</code>to define sorting logic yourself.<br>自己定義排序邏輯。<br>If enabled, uses the defined<br>如果启用，则使用定义的CRUDendpoints to fetch/filter/sort and modify the data.<br>端点来获取/过滤/排序和修改数据。</td></tr>
<tr><td><code>ajaxConfig</code></td><td><code>object</code></td><td>See description<br>請參閱描述</td><td>Ajax configuration used in all ajax calls. The defaults are:<br>所有 Ajax 呼叫中所使用的 Ajax 配置。預設值為：<br>{ method: "POST"（郵政）, dataType: "json", headers: { "Content-type"（內容類型）: "application/json;charset=utf8" } }<br><br>Override for advanced purposes.<br></td></tr>
<tr><td><code>responsive<br>響應式</code></td><td><code>boolean<br>布爾值</code></td><td><code>false</code></td><td>If this grid is allowed to split longer lines into newlines, creating variable height grid rows. Use this if the cell content should always be visible, otherwise, the content will be cut off with an ellipsis and dynamically assigned a tooltip so hovering over the data will show the full content.<br>如果允許此網格將較長的行拆分為換行符，則可建立可變高度的網格行。如果儲存格內容應始終可見，請使用此選項；否則，內容將被省略號截斷，並動態分配工具提示，以便將滑鼠懸停在資料上時顯示完整內容</td></tr>
<tr><td><code>onBeforeRenderDialog</code></td><td><code>function<br>函數</code></td><td><code>null</code></td><td>function handler which will be called before an edit dialog is being displayed, can be used to change the otherwise static dialogs. Should return a $.Deferred() object. (e.g.<br>函數處理程序，將在編輯對話框顯示之前調用，可用於更改原本靜態的對話框。應傳回一個 $.Deferred() 物件。 (例如<code>return (new $.Deferred()).resolve();</code>)</td></tr>
<tr><td><code>virtualDOM</code></td><td><code>boolean<br>布爾值</code></td><td><code>false</code></td><td>Enable or disable the virtual rendering mode of the grid. See<br>啟用或停用網格的虛擬渲染模式。請參閱<a href="https://tabulator.info/docs/6.4/virtual-dom">the Tabulator docs<br>Tabulator 文件</a>. In essence this option makes sure that not all rows are rendered by default, but are rendered on the fly as they are needed when the user scrolls down/up. This makes it possible to render an extremely large amount of rows with very little performance impact.<br>。本質上，此選項可確保預設並非所有行都會渲染，而是在使用者上下滾動時根據需要動態渲染。這使得渲染大量行成為可能，而效能影響卻很小<br>When using this options, keep in mind that each row may not be available in the<br>使用此選項時，請記住，在任何給定時間，每行可能都無法在DOMyet at any given time for direct referencing in code. Therefore, the proper<br>中直接引用。因此，如果您希望直接引用此元素，則應使用正確的<code>onRendered</code>callbacks should be used if you wish to refer to this element directly. See<br>回呼。請參閱<a href="https://docs.opnsense.org/development/frontend/bootgrid.html#formatters">options.formatters<br>選項.格式化程式</a>and<br>和<a href="https://docs.opnsense.org/development/frontend/bootgrid.html#commands">commands<br>指令</a>.</td></tr>
<tr><td><code>selection<br>選擇</code></td><td><code>boolean<br>布爾值</code></td><td><code>true<br>真</code></td><td>Whether individual rows should be selectable through a checkbox in a left-frozen column.<br>是否允許透過左側凍結列中的複選框選擇單一行。</td></tr>
<tr><td><code>multiSelect</code></td><td><code>boolean</code></td><td><code>true</code></td><td>Whether multiple rows may be selected for actions (<code>delete-selected</code>, <code>enable-selected</code>, <code>disable-selected</code>). Only relevant if <code>selection: true</code></td></tr>

<tr><td><code>多選</code></td><td><code>布爾值</code></td><td><code> true </code></td><td>是否可選擇多行進行操作（ <code>刪除所選行</code>, <code>啟用所選</code> </code>, <code> 。僅當<code> selection: true </code></td></tr>時相關
<tr><td><code>stickySelect</code></td><td><code>boolean</code></td><td><code>false</code></td><td>Ignores <code>multiSelect</code>. Enable this if selecting a row should disable the selection of another row, forcing exactly one row to be selected at all times. This is often used in master-detail views, where one row corresponds to the entries in another grid. Only relevant if<br>. 因此選擇一行時應停用另一行這通常用於主從視圖，其中一行對應於另一個網格中的條目。僅當<code>selection: true</code></td></tr>
<tr><td><code>rowSelect</code></td><td><code>boolean</code></td><td><code>false</code></td><td>Whether rows should be selectable by clicking in any of the row cells. Keep in mind that in<br>是否可以透過點選任何行單元格來選取行。請記住，用UXterms, this makes it difficult for users to select values in a grid for copy+pasting purposes.<br>術語來說，這使得用戶很難在網格中選擇值以進行複製+貼上。</td></tr>
<tr><td><code>batchToggle</code></td><td><code>boolean</code></td><td><code>true</code></td><td>Enable/disable the batching of the <code>enable/disabled-selected</code> actions. Batching involves taking all of the <code>datakey</code> strings of the selected rows and splitting these up into <code>batchToggleSize</code>-length chunks, and firing one toggle request per batch. The request contains all <code>datakey</code> strings as a single comma-separate parameter. Therefore, the controller should be capable of dealing with these keys (<code>toggleBase</code>). Set this to <code>false</code> only if your controller endpoint is not capable of dealing with multiple values in one request.</td></tr>

<tr><td><code> batchToggle </code></td><td><code> boolean </code></td><td><code> true </code></td><td>啟用/停用<code>啟用/停用所選</code>操作的批次處理。批次處理是指取得所選行的所有<code> datakey </code>字串，並將它們拆分為<code> batchToggleSize </code>長度的區塊，並為每個區塊發送切換請求。此請求包含所有<code> datakey </code>字串，並以逗號分隔的單一參數形式提供。因此，控制器應該能夠處理這些鍵（ <code> toggleBase </code> ）。只有當您的控制器端點無法在單一請求中處理多個值時， </td></tr>將其設定為<code> false </code>
<tr><td><code>batchToggleSize</code></td><td><code>number</code></td><td><code>40</code></td><td>Default maximum batch side for<br><code>batchToggle</code>. This number roughly corresponds to the length of a single<br>的預設最大批次邊。該數字大致相當於單一UUID* 40 to keep the length of a<br>* 40 的長度，以將URLbelow its maximum. Adjust this number if the<br>的長度保持在其最大值以下。如果<code>datakey</code>is not a<br>不是UUID.</td></tr>
<tr><td><code>batchDelete</code></td><td><code>boolean</code></td><td><code>true</code></td><td>Enable/disable the batching of the<br>啟用/停用批次刪除<code>delete-selected<br>選定行</code>action. Batching involves taking all of the<br>操作。批次處理是指取得所有選取行的<code>datakey</code>strings of the selected rows and splitting these up into<br>字串，並將它們拆分成<code>batchDeleteSize</code>-length chunks, and firing one delete request per batch. The request contains all<br>長度的區塊，然後為每個區塊發送刪除請求。該請求包含所有<code>datakey</code>strings as a single comma-separate parameter. Therefore, the controller should be capable of dealing with these keys. Set this to<br>字串，它們作為一個以逗號分隔的參數。因此，控制器應該能夠處理這些鍵。只有當您的控制器端點無法處理單一請求中的多個值時，才將此項目設定為<code>false</code>only if your controller endpoint is not capable of dealing with multiple values in one request.<br></td></tr>
<tr><td><code>batchDeleteSize</code></td><td><code>number</code></td><td><code>40</code></td><td>Default maximum batch side for<br><code>batchDelete<br></code>. This number roughly corresponds to the length of a single<br>的預設最大批處理邊長。此數值大致對應於單一UUID* 40 to keep the length of a<br>* 40 的長度，以確保URLbelow its maximum. Adjust this number if the<br>的長度小於其最大值。如果<code>datakey</code>is not a<br>不是UUID.</td></tr>
<tr><td><code>triggerEditFor</code></td><td><code>string</code></td><td><code>null</code></td><td>Set this value to a<br>將此值設為<code>datakey</code>value (such as a<br>值（例如UUID) to trigger the edit dialog of this particular row. This is used in cases where we are referred to from a different page to load both the grid and immediately open the right entity for editing.<br>datakey這用於從不同頁面引用我們來載入網格並立即開啟正確實體進行編輯的情況。<br>If we came from a different page, the<br>如果我們來自不同頁面，<code>edit</code> URLparameter will be set to the<br>參數將設定為<code>datakey</code>value. This parameter can be fetched through<br>值。此參數可以透過<code>getUrlHash('edit')</code>.<br>In most cases, if triggering an edit on referral is necessary,<br>取得。大多數情況下，如果需要觸發引用編輯，則應使用<code>getUrlHash('edit')</code>should be used. If the referrer sets a different<br>。如果引薦來源設定了不同的URLparameter, adjust your logic accordingly.<br>參數，請相應地調整您的邏輯。</td></tr>
<tr><td><code>initialSearchPhrase</code></td><td><code>string</code></td><td><code>null</code></td><td>Same behaviour as<br>與<code>triggerEditfor</code>, but for a search phrase value. If set, the grid will load with the search value set to this string so the controller can filter on it.<br>相同的行為，但針對搜尋短語值。如果設置，網格將加載設置為此字串的搜尋值，以便控制器可以對其進行過濾。<br>The standardized method to get this value is<br>取得此值的標準化方法是<code>getUrlHash('search')</code>.</td></tr>
<tr><td><code>static<br>靜態</code></td><td><code>boolean<br>布爾值</code></td><td><code>false</code></td><td>Disables persistent storage and resizable columns so the dimensions of the grid are predictable at all times.<br>禁用持久存儲和可調整大小的列，以便網格的尺寸始終可預測。</td></tr>
<tr><td><code>bottomReserveElement</code></td><td><code>string | Element | JQuery object<br>string | Element | jQuery object</code></td><td><code>'.grid-bottom-reserve''</code></td><td>If there is an element below the grid that should be visible at all times (no page scrollbar), you can specify this element here so the grid height calculation takes the height of this element into account.<br>如果網格下方有一個元素需要始終可見（無頁條元素的元素，以便在此處計算元素，以便在此處計算元素時需要始終可見（無頁數）</td></tr>
</table>

## `options.formatters`

Formatters are functions that are executed for each cell whose column has a formatter specified and determine the value that is presented to the user in the cell. Formatters allow you to manipulate the data fetched from the controller into a format that is more easily digestable for a user.

格式化程序是針對指定了格式化程序的列中的每個單元格執行的函數，用於確定單元格中顯示給使用者的值。格式化程式可讓您將從控制器取得的資料轉換為更易於使用者理解的格式。

The `formatters` option is an object that contains `key` - `function` pairs, where each key corresponds to the `formatter` value in the grid form as explained in [Define dialog items](<367 使用網格模組和插件.md#define-dialog-items>).

`formatters`選項是一個包含`key` - `function`對的對象，其中每個鍵對應於網格表單中的`formatter`值，如 [定義對話框項](<367 使用網格模組和插件.md#define-dialog-items>)中所述。

For example:

例如：

```
formatters: {
    myformatter: function (column, row, onRendered) {
        return row[column.id];
    }
}
```

The above example simply returns the value of the row without modifications.

上述範例只是簡單地傳回該行的值，不做任何修改。

The `column` parameter is an object that contains the `id` and the `visibility` status of the column.

`column`參數是一個對象，其中包含列的`id`和`visibility`狀態。

The `row` parameter is an object that contains the data for this row.

`row`參數是一個包含此行資料的物件。

The `onRendered` parameter is a callback function that allows you to execute a function when the cell has been rendered. For example:

`onRendered`參數是一個回呼函數，可讓您在儲存格渲染完成後執行某個函數。例如：

```
formatters: {
    myformatter: function (column, row, onRendered) {
        onRendered((cell) => {
            console.log(`grid cell has been rendered. cell data: ${cell.getData()}`);
        })
        return row[column.id];
    }
}
```

This is useful if you want to bind event handlers to the rendered DOM element, or do work if the cell contains more complex objects such as graphs that are initialized asynchronously.

如果您想將事件處理程序綁定到渲染的DOM元素，或者如果單元格包含非同步初始化的更複雜的物件（例如圖表），則此方法非常有用。

The callback function expects a single parameter, `cell`, which you can access to get the [cell object](https://tabulator.info/docs/6.4/components#component-cell)

回呼函數需要一個參數`cell` ，您可以透過存取該參數來取得[單元格物件](https://tabulator.info/docs/6.4/components#component-cell)

## `options.headerFormatters`

Functionally equivalent to [options.formatters](#formatters), but applied to the column header value instead. By default it’s not necessary to specify a `headerFormatter` tag in the `grid_view` tag of a form, as the keys match to the row keys. For example:

功能上等同於 [options.formatters](#formatters) ，但應用於列標題值。預設情況下，無需在表單的`grid_view`標籤中指定`headerFormatter`標籤，因為鍵與行鍵相符。例如：

```
headerFormatters: {
    enabled: function(column) {
        return '<i class="fa-solid fa-fw fa-check-square" data-toggle="tooltip" title="{{ lang._('Enabled') }}"></i>';
    }
}
```

The above example will match on the `enabled` row key and return an icon with a tooltip showing the translated value of the column title.

上面的範例將匹配`enabled`行鍵，並傳回一個帶有工具提示的圖標，該工具提示顯示列標題的翻譯值。

The function expects only a single parameter, `column`, which is an object containing `id`, `visible`, `title`.

函數只接受一個參數`column` ，它是一個包含`id`, `visible`, `title`的物件。

## `commands`

The `Commands` column is a special column that is situated frozen on the right side of the grid to ease access regardless of scroll position. This column contains buttons that are linked to actions that can be defined/extended in this configuration section.

`Commands`列是一個特殊的列，它固定在網格的右側，以便於訪問，不受滾動位置的影響。此列包含一些按鈕，這些按鈕連結到可以在此配置部分定義/擴展的操作。

Besides the commands defined in the commands column, there are also command buttons placed below the grid which are linked to actions that are not related to one grid row specifically, such as `add` or `delete-selected`. These buttons can also be defined in the command structure, but with the `footer` property set to `true`.

除了命令列中定義的命令外，網格下方還放置了一些命令按鈕，這些按鈕連結到與特定網格行無關的操作，例如`add`或`delete-selected` 。這些按鈕也可以在指令結構中定義，但需要將`footer`屬性設為`true` 。

The following commands are built-in by default and are rendered automatically based on their respective CRUD endpoint requirements:

以下命令預設內置，並根據各自的CRUD端點要求自動呈現：

-   `add`. Requires `get`, `set`.  
    `add` . 需要`get`, `set` .
    
-   `edit`. Requires `get`, `set`.  
    `edit` . 需要`get`, `set` .
    
-   `delete`. Requires `del`.  
    `delete` . 需要`del` .
    
-   `copy`. Requires `get`, `sets`.  
    `copy` 。需要`get`, `sets` 。
    
-   `info`. Requires `info`,  
    `info` 。需要`info` ，
    
-   `toggle`. Requires `toggle`.  
    `toggle` . 需要`toggle` .
    
-   `enable-selected`. Requires `toggle` (See `batchToggle` option).  
    `enable-selected` 。需要`toggle` （參見`batchToggle`選項）。
    
-   `disable-selected`. Requires `toggle` (See `batchToggle` option).  
    `disable-selected` 。需要`toggle` （參見`batchToggle`選項）。
    
-   `delete-selected`. Requires `del` (See `batchDelete` option).  
    `delete-selected` 。需要`del` （參見`batchDelete`選項）。
    

You may override a specific property of the above built-in commands, as the `commands` object is deeply merged, e.g.:

您可以覆寫上述內建指令的特定屬性，因為`commands`物件是深度合併的，例如：

```
edit: {
    sequence: 200
}
```

Will preserve all `edit` command options, but change the sequence from its default of `100` to `200`.

將保留所有`edit`命令選項，但將序列從預設的`100`更改為`200` 。

Extra commands can be defined in the top-level `commands` object. The structure of a command starts with a unique key and contains an object with the following schema:

可以在頂層物件`commands`中定義額外的命令。命令的結構以一個唯一的鍵開始，並包含一個具有以下模式的物件：

| Property<br>屬性 | Type<br>類型 | Required<br>必填 | Description<br>說明 |
| --- | --- | --- | --- |
| `method` | `function` | No<br>否 | A function that is executed on command click. Function signature is `(event, cell)`. The [cell object](https://tabulator.info/docs/6.4/components#component-cell) is passed in only if `footer` is `false`.<br>點選指令時執行的函數。函數簽名是`(event, cell)` 。僅當`footer`為`false`時，才會傳入 [單元格物件](https://tabulator.info/docs/6.4/components#component-cell) 。 |
| `title` | `string \| function` | No<br>否 | Translated title to be shown as a tooltip. If the title depends on state, this property can also be a function. If it’s a function, the Cell object is passed as a parameter.<br>翻譯後的標題將顯示為工具提示。如果標題取決於狀態，則此屬性也可以是函數。如果是函數，則 Cell 物件將作為參數傳遞。 |
| `requires` | `array` | No<br>沒有 | An optional array of strings that define if this command depends on one or more CRUD actions. For example, the default `add` command depends on `get` and `set`, otherwise the form logic tied to this action wouldn’t be able to get the structure needed to construct the form, nor would it be able to call the right endpoint once “save” has been clicked. If any of the required endpoints are missing, the button isn’t rendered.<br>可選的字串數組，定義此指令是否依賴於一個或多個 CRUD 操作。例如，預設的`add`指令依賴`get`和`set`，否則與此操作相關的表單邏輯將無法取得建置表單所需的結構，也無法在按一下「儲存」後呼叫正確的端點。如果缺少任何必要的端點，則不會呈現該按鈕。 |
| `sequence` | `number` | No<br>否 | A number to control how the button is ordered amongst the other buttons.<br>用於控制該按鈕在其他按鈕中排序的數字。 |
| `footer` | `boolean` | No<br>否 | Whether this command should be rendered in the footer or as part of a row.<br>此指令應顯示在頁尾還是作為行的一部分。 |
| `primary` | `boolean` | No<br>否 | Whether this command should be rendered as part of the primary button container. Only relevant when `footer` is `true`.<br>此指令是否應作為主按鈕容器的一部分呈現。僅當`footer`為`true`時才相關。 |
| `classname` | `string` | Yes<br>是 | Icon class added to the `<span>` inside the button element.<br>圖標類別已新增至按鈕元素內的`<span>` 。 |
| `filter` | `function` | No<br>否 | A function that, if defined, must return true or false and determines if this command should be rendered. The Cell object is only passed in if `footer` is `false`.<br>一個函數，如果已定義，則必須傳回 true 或 false，並確定是否應呈現此命令。僅當`footer`為`false`時，才會傳入 Cell 物件。 |
| `onRendered` | `function` | No<br>否 | A function that runs after the element including event bindings have been rendered. This allows the caller to override the behavior of the command. The element is bound to the function and can be access through `$(this)`, but the full Cell object is passed in as a parameter as well, but only if `footer` is `false`. This function has priority over `method`.<br>This function can be used to bind the rendered command DOM element to other system components, such as [$.SimpleFileUploadDlg](<261 查看施工（和工具）.md#simplefileuploaddlg>).<br>此函數在包含事件綁定的元素渲染完成後運行。它允許呼叫者覆蓋命令的行為。元素綁定到此函數，可透過`$(this)`訪問，但完整的 Cell 物件也會作為參數傳遞，前提是`footer`為`false` 。此函數的優先權高於`method`.<br>此函數可用於將渲染的命令DOM元素綁定到其他系統元件，例如 [$.SimpleFileUploadDlg](<261 查看施工（和工具）.md#simplefileuploaddlg>) 。 |

There are default commands built-in to the UIBootgrid framework that work in tandem with the default controller actions to facilitate basic CRUD behavior.

UIBootgrid 框架內建了一些預設命令，這些命令與預設控制器操作協同工作，以方便實現基本的CRUD行為。

For advanced use cases, you can also call the built-in `command` methods directly. For an example, see the [Unbound overrides template](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/views/OPNsense/Unbound/overrides.volt)

對於進階用例，您也可以直接呼叫內建的`command`方法。例如，請參閱 [Unbound overrides template](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/views/OPNsense/Unbound/overrides.volt)

## `tabulatorOptions`

Any option set here will be passed directly to Tabulator. Refer to their [docs](https://tabulator.info/docs/).

此處設定的任何選項都將直接傳遞給 Tabulator。請參閱其[文件](https://tabulator.info/docs/) 。

## Methods｜方法

Methods on UIBootgrid can be called through the JQuery bootgrid API:

可以透過 jQuery bootgrid API呼叫 UIBootgrid 上的方法：

```
$('#<grid-id>').bootgrid('<method>', ...params);
```

### `append(rows)`

Appends `rows` to the grid. This is a lot slower than [replace(rows)](#replace). Since most of the sorting/filtering logic happens remotely, `replace` should be the preferred method to manipulate data in the grid.

將`rows`加入網格中。這比 [replace(rows)](#replace)慢很多。由於大多數排序/篩選邏輯都在遠端執行，因此`replace`應該是操作網格中資料的首選方法。

### `replace(rows)`

Replaces all data in the grid by `rows`. Use this function if `ajax: false` to set data in the grid.

將網格中的所有資料替換為`rows` 。如果使用`ajax: false`設定網格中的數據，則使用此函數。

### `getTable()`

Gets the Tabulator grid instance bound to this `UIBootgrid`.

取得綁定到此`UIBootgrid` Tabulator 網格實例。

### `clear()`

Clears any data in the grid.

清除網格中的所有資料。

### `reload()`

Reload the grid. Triggers a new AJAX request.

重新載入網格。觸發新的AJAX請求。

### `getRowCount()`

Gets currently selected row count

取得目前選定的行數

### `getSelectedRows()`

Gets the `datakey` values of the currently selected rows

取得目前選取行的`datakey`值

### `getCurrentRows()`

Gets all `datakey` values of all rows in the table

取得表中所有行的所有`datakey`值

### `getCurrentPage()`

Gets current paginated page.

取得目前分頁頁碼。

### `destroy()`

Destroy the grid

摧毀電網

### `setColumns(columns)`

Enable the visibility of columns. The `columns` parameter expects an array of column IDs.

啟用列的可見性。 `columns` 參數需要一個列 ID 陣列。

### `unsetColumns(columns)`

Disable the visibility of columns. The `columns` parameter expects an array of column IDs.

禁用列的可見性。 `columns` 參數需要一個列 ID 陣列。

### `search(value, event)`

Search for `value` in the grid (triggering an AJAX request if `ajax: true`).

在網格中搜尋`value` （如果`ajax: true`存在，則觸發AJAX請求）。

### `select(ids)`

Programatically select rows. Expects an array of `datakey` strings.

透過程式方式選擇行。需要一個包含`datakey`字串的陣列。

### `getSearchPhrase()`

Get current search phrase.

取得目前搜尋詞。

### `setPersistence(value)`

Enable or disable grid persistence (column setup in local storage). Expects a boolean.

啟用或停用網格持久化（本機儲存中的列設定）。需要一個布林值。

## Other components｜其他部件

If an `apply` button is rendered on the page through [$.SimpleActionButton](<261 查看施工（和工具）.md#simpleactionbutton>), :`UIBootgrid` will automatically signal to that element to prompt the user to apply if something in the grid changed, e.g. when a row has been edited. Internally it does this by simply calling `$(document).trigger("settings-changed");`.

如果透過 [$.SimpleActionButton] 在頁面上渲染`apply`按鈕，則(https://docs.opnsense.org/development/frontend/view_js_helpers.html#simpleactionbutton), :`UIBootgrid`會自動向該元素發出訊號，提示使用者在網格中的某些內容發生變更時（例如，當行被編輯時）套用變更。其內部實作方式是簡單地呼叫`$(document).trigger("settings-changed");` 。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：View construction (and tools)｜查看施工（和工具）](<261 查看施工（和工具）.md>)　｜　[下一篇：Dashboard widgets｜儀錶板小部件 ➡](<263 儀錶板小部件.md>)
