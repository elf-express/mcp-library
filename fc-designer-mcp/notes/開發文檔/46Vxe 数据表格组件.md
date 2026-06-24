# Vxe 数据表格组件

> Source: https://pro.form-create.com/doc/vxe-data-table

---

# Vxe 資料表格元件 ​

Vxe 資料表格元件是一個基於 vxe-table 的 Vue 資料表格元件，支援靈活的列配置、多種資料來源、分頁、排序、篩選、可編輯單元格等專業級表格能力。元件提供豐富的配置選項和事件支援，可以輕鬆整合到表單設計器中，實現複雜的資料管理和展示場景。

![vxe-data-table.png](https://pro.form-create.com/doc/img/vxe-data-table.png)

瞭解 vxe-table

Vxe 資料表格基於強大的開源表格元件 vxe-table 構建。如需瞭解更多高階用法，可參考：

- [vxe-table 官方文件](https://vxetable.cn/) - 完整的 API 和功能說明

## 安裝與掛載 ​

Vxe 資料表格依賴 vxe-table 元件，**設計器打包時不會將其打包進去**，需要您在自己的專案中安裝並在 Vue 中全域掛載。

### 安裝依賴 ​

**Vue 3 專案**：

bash

```
npm install vxe-table@4.17.48 vxe-pc-ui@4.12.31
```

**Vue 2 專案**：

bash

```
npm install vxe-table@3.19.49 vxe-pc-ui@3.12.31
```

### 全域掛載 ​

**Vue 3**：

js

```
import VxeUIBase from 'vxe-pc-ui';
import 'vxe-pc-ui/es/style.css';
import { VxeGrid } from 'vxe-table';
import 'vxe-table/es/style.css';

app.use(VxeUIBase);
app.use(VxeGrid);
```

**Vue 2**：

js

```
import VxeUIBase from 'vxe-pc-ui';
import 'vxe-pc-ui/es/style.css';
import { VxeGrid } from 'vxe-table';
import 'vxe-table/es/style.css';

Vue.use(VxeUIBase);
Vue.use(VxeGrid);
```

更多安裝方式、按需引入等說明請參閱 [vxe-table 官方安裝文件](https://vxetable.cn/#/start/useUI/install)。

## 基礎使用 ​

### 獲取表格資料 ​

透過注入的 `api.el` 方法可以獲取資料表格元件例項，訪問表格資料：

js

```
function onChange($inject) {
    const dataTableInstance = $inject.api.el('ref_F2vulxvqc841dac');
    const list = dataTableInstance.list;
    const total = dataTableInstance.total;
    const currentPage = dataTableInstance.currentPage;
    console.log('当前表格数据:', list);
}
```

### 獲取表格例項與選中行 ​

透過 `getEl` 方法可以獲取底層 VxeGrid 例項，進行更高階的操作。選中行的獲取需根據 `selection` 型別呼叫對應方法：

js

```
function getSelectedRows($inject) {
    const dataTableInstance = $inject.api.el('ref_F2vulxvqc841dac');
    const tableEl = dataTableInstance.getEl();
    if (!tableEl || !dataTableInstance.selection) return;

    if (dataTableInstance.selection === 'checkbox') {
        const selectedRows = tableEl.getCheckboxRecords();
        console.log('多选中的行:', selectedRows);
    } else if (dataTableInstance.selection === 'radio') {
        const selectedRow = tableEl.getRadioRecord();
        console.log('单选中的行:', selectedRow);
    }
}
```

### 重新整理表格資料 ​

使用 `initPage` 方法可以重新初始化表格並重新整理資料：

js

```
function refreshTable($inject) {
    const dataTableInstance = $inject.api.el('ref_F2vulxvqc841dac');
    dataTableInstance.initPage();
}
```

### 修改列配置 ​

透過 `api.getRule` 方法可以動態修改表格列配置：

js

```
function onChange($inject) {
    const rule = $inject.api.getRule('ref_F2vulxvqc841dac');
    rule.props.column = [
        { prop: 'name', label: '姓名', width: 120, format: 'default' },
        { prop: 'age', label: '年龄', width: 80, format: 'default' },
    ];
}
```

## 配置項 ​

Vxe 資料表格提供了豐富的配置選項，您可以透過在設計器中配置屬性來自定義表格的行為和外觀。

### 表格屬性 ​

| 屬性名 | 型別 | 預設值 | 必需 | 說明 |
| --- | --- | --- | --- | --- |
| column | Array | [] | 是 | 表格列配置，包括欄位、標題、寬度、對齊方式、排序、可編輯等 |
| data | Array | [] | 否 | 靜態資料，當不使用 fetch 或 globalDataKey 時使用 |
| globalDataKey | String, Object | - | 否 | 全域資料鍵名，使用預定義的全域資料來源 |
| fetch | Object | - | 否 | 遠端資料獲取配置，支援 POST/GET 請求 |
| page | Object | - | 否 | 分頁配置，包含 open、position、pageSizes、totalField、dataField 等 |
| button | Object | - | 否 | 操作列配置，包含 open、column、label、fixed、width |
| index | Boolean | - | 否 | 是否顯示序號列 |
| selection | Boolean, String | - | 否 | 是否顯示選擇列，可選 checkbox、radio |
| showHeader | Boolean | true | 否 | 是否顯示錶頭 |
| headerAlign | String | - | 否 | 表頭對齊方式，可選 left、center、right |
| align | String | - | 否 | 單元格對齊方式，可選 left、center、right |
| showFooter | Boolean | false | 否 | 是否顯示錶尾 |
| footerData | Array | - | 否 | 表尾資料 |
| mergeCells | Array | - | 否 | 合併單元格配置 |
| showOverflow | Boolean, String | - | 否 | 單元格內容溢位時顯示方式，可選 title、ellipsis、tooltip |
| showHeaderOverflow | Boolean, String | - | 否 | 表頭內容溢位時顯示方式 |
| showFooterOverflow | Boolean, String | - | 否 | 表尾內容溢位時顯示方式 |
| allowCurrent | Boolean, String | - | 否 | 是否高亮當前行/列，可選 col、row |
| treeNode | Boolean | false | 否 | 是否啟用樹形結構 |
| rowDrag | Boolean | false | 否 | 是否開啟行拖拽排序 |
| columnDrag | Boolean | false | 否 | 是否開啟列拖拽排序 |
| autoInit | Boolean | true | 否 | 是否自動初始化載入資料 |

### 分頁配置 (page) ​

| 屬性名 | 型別 | 預設值 | 說明 |
| --- | --- | --- | --- |
| open | Boolean | - | 是否開啟分頁 |
| position | String | 'right' | 分頁元件位置，可選 left、center、right |
| pageField | String | 'page' | 請求引數欄位名（頁碼） |
| pageSizeField | String | 'limit' | 請求引數欄位名（每頁條數） |
| orderField | String | 'order' | 排序欄位引數欄位名 |
| orderByField | String | 'orderBy' | 排序方式引數欄位名 |
| totalField | String | 'count' | 響應資料中總數的欄位路徑 |
| dataField | String | 'list' | 響應資料中列表的欄位路徑 |
| pageSizes | String, Array | '10, 20, 50, 100' | 每頁條數選項 |
| props | Object | - | 傳遞給 el-pagination 的額外屬性 |

### 列配置 (column) ​

每列支援以下配置：

| 屬性名 | 型別 | 說明 |
| --- | --- | --- |
| prop | String | 列繫結的欄位名 |
| label | String | 列標題（必填） |
| width | Number, String | 列寬度 |
| minWidth | Number, String | 列最小寬度 |
| align | String | 列對齊方式 |
| headerAlign | String | 表頭對齊方式 |
| fixed | String | 固定列，可選 left、right |
| sortable | Boolean, String | 是否可排序，custom 表示服務端排序 |
| resizable | Boolean | 是否可調整列寬 |
| hidden | Boolean | 是否隱藏列 |
| className | String | 列單元格的 class 名 |
| titlePrefix | String, Object | 列標題字首 |
| format | String | 單元格渲染格式，可選 default、tag、image、custom |
| render | Function | 當 format 為 custom 時的自定義渲染函式 |
| editRender | String | 可編輯渲染器，可選 input、textarea、number、select |
| editRenderOptions | Array | 當 editRender 為 select 時的選項，格式 [{label, value}] |
| filter | Array | 列篩選值陣列，用於前端過濾 |
| children | Array | 子列配置，用於多級表頭 |

### 操作按鈕配置 (button) ​

| 屬性名 | 型別 | 說明 |
| --- | --- | --- |
| open | Boolean | 是否顯示操作列 |
| label | String | 操作列標題 |
| fixed | String | 固定位置，left、right |
| width | Number, String | 操作列寬度 |
| column | Array | 按鈕配置列表 |

按鈕項配置：

| 屬性名 | 型別 | 說明 |
| --- | --- | --- |
| name | String | 按鈕文字 |
| key | String | 按鈕唯一標識 |
| type | String | 按鈕型別，如 primary、danger |
| size | String | 按鈕尺寸 |
| prop | Array | 按鈕屬性，如 ['round']、['plain']、['disabled'] |
| click | String | 點選時執行的函式，引數 (scope, api) |
| handle | String | 返回按鈕 props 的函式，可動態控制 disabled |
| hide | String | 返回布林值的函式，控制按鈕顯隱 |
| hidden | Boolean | 是否隱藏 |

## 事件 ​

Vxe 資料表格提供了事件，方便您監聽表格狀態變化並執行相應的處理。

| 事件名 | 說明 |
| --- | --- |
| ready | 表格就緒事件，渲染完成後觸發 |
| handleClick | 操作按鈕點選事件，引數 {name, key, scope, column} |
| radioChange | 單選變化事件，單選列選中/取消時觸發 |
| checkboxChange | 多選變化事件，多選列選中/取消時觸發 |
| checkboxAll | 全選/取消全選事件 |
| cellClick | 單元格點選事件 |
| headerCellClick | 表頭單元格點選事件 |
| footerCellClick | 表尾單元格點選事件 |
| sortChange | 排序變化事件，點選列標題排序時觸發 |
| clearSort | 清除排序事件 |
| editActivated | 單元格編輯啟用事件 |
| editClosed | 單元格編輯關閉事件 |
| currentRowChange | 當前行變化事件 |
| currentChange | 頁碼變化事件 |
| currentColumnChange | 當前列變化事件 |
| pageSizeChange | 每頁條數變化事件 |
| rowDragstart | 行拖拽開始事件 |
| rowDragend | 行拖拽結束事件 |
| columnDragstart | 列拖拽開始事件 |
| columnDragend | 列拖拽結束事件 |

### 事件使用示例 ​

**監聽操作按鈕點選**：

js

```
function handleClick({ name, key, scope, column }) {
    console.log('按钮名称:', name);
    console.log('当前行数据:', scope.row);
    if (name === '编辑') {
        // 编辑逻辑
    } else if (name === '删除') {
        // 删除逻辑
    }
}
```

**監聽頁碼變化**：

js

```
function handleCurrentChange(pageNum) {
    console.log('切换到的页码:', pageNum);
}
```

## 方法 ​

Vxe 資料表格提供了方法，方便您進行程式化控制。

| 方法名 | 引數 | 說明 | 返回值 |
| --- | --- | --- | --- |
| getEl | - | 獲取底層 VxeGrid 例項 | VxeGrid |
| initPage | - | 重新初始化並重新整理資料 | - |
| changePage | n | 切換到指定頁碼 | - |
| changePageSize | size | 切換每頁條數 | - |
| getLimit | - | 獲取當前每頁條數 | Number |

### 方法使用示例 ​

**切換頁碼**：

js

```
function goToPage($inject, pageNum) {
    const dataTableInstance = $inject.api.el('ref_F2vulxvqc841dac');
    dataTableInstance.changePage(pageNum);
}
```

**切換每頁條數**：

js

```
function changePageSize($inject, size) {
    const dataTableInstance = $inject.api.el('ref_F2vulxvqc841dac');
    dataTableInstance.changePageSize(size);
}
```

### VxeGrid 例項方法 ​

`getEl()` 返回 vxe-table 的 VxeGrid 例項，可直接呼叫 vxe-table 提供的 API：

| 方法名 | 說明 | 適用場景 |
| --- | --- | --- |
| getCheckboxRecords() | 獲取多選選中的行資料陣列 | selection 為 checkbox |
| getRadioRecord() | 獲取單選選中的行資料 | selection 為 radio |
| getCurrentRecord() | 獲取當前聚焦的行資料 | 通用 |
| clearCheckboxRow() | 清空多選選中狀態 | - |
| clearRadioRow() | 清空單選選中狀態 | - |

更多 API 請參考 [vxe-table 官方文件](https://vxetable.cn/)。

## 單元格格式 ​

列支援多種單元格渲染格式：

| 格式值 | 說明 |
| --- | --- |
| default | 預設文字顯示 |
| tag | 使用 el-tag 元件渲染 |
| image | 圖片列表，支援單圖或多圖預覽 |
| custom | 自定義渲染，需配置 render 函式 |

### 自定義渲染示例 ​

當 `format` 為 `custom` 時，需配置 `render` 函式：

js

```
{
    prop: 'status',
    label: '状态',
    format: 'custom',
    render: (scope, h, resolveComponent, api) => {
        const status = scope.row.status;
        return h(resolveComponent('el-tag'), {
            type: status === 1 ? 'success' : 'info'
        }, () => [status === 1 ? '启用' : '禁用']);
    }
}
```

## 可編輯列 ​

配置 `editRender` 可啟用單元格雙擊編輯，支援以下型別：

| 型別 | 說明 |
| --- | --- |
| input | 輸入框 |
| textarea | 多行文字 |
| number | 數字輸入框 |
| select | 下拉選擇，需配置 editRenderOptions |

編輯時觸發方式為雙擊單元格。

## 內部資料 ​

| 資料名 | 初始值 | 說明 |
| --- | --- | --- |
| total | 0 | 總資料量 |
| loading | false | 載入狀態 |
| list | [] | 當前頁資料 |
| currentPage | 1 | 當前頁碼 |
| order | '' | 排序欄位 |
| orderBy | '' | 排序方式 |
| currentSize | undefined | 當前每頁條數 |
| filterList | Array | 列過濾後的資料列表 |

---

更多 vxe-table 安裝方式、按需引入等說明請參閱 [vxe-table 官方安裝文件](https://vxetable.cn/#/start/useUI/install)。