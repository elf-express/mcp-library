# 表单 API

> Source: https://pro.form-create.com/doc/api

---

# 表單 API ​

FormCreate 提供了豐富的 API 介面，允許開發者在表單的各個階段進行全面控制，包括表單的生成、動態更新、驗證和資料處理等功能。這些 API 可以幫助您輕鬆實現各種複雜的表單需求。

注意

更多詳細使用方法請參考[Api文件](https://form-create.com/v3/instance/)

## 獲取API ​

FormCreate 提供了多種方式獲取 API 物件，以便開發者可以在不同的場景中操作和管理表單。

### **在事件中獲取** ​

ts

```
const api = $inject.api;
```

### **在自定義驗證函式中獲取** ​

ts

```
const api = this.api;
```

### **在鉤子事件中獲取** ​

ts

```
const api = data.api;
```

### **自定義元件注入** ​

如果您使用自定義元件，FormCreate 會自動注入一些關鍵引數，幫助您在元件內部操作表單。

- `formCreateInject` 物件包含以下屬性： 

- `formCreateInject.api` 表單 API 物件，用於操作表單。
- `formCreateInject.options` 表單元件的全域配置。
- `formCreateInject.rule` 生成規則物件，定義了元件的所有配置。
- `formCreateInject.field` 欄位名稱，與表單資料繫結。

**示例：** 在自定義元件中使用 formCreateInject 物件進行操作：

js

```
const customComponent = defineComponent({
  name: 'custom-component',
  props: {
    formCreateInject: Object, // 自动注入的表单参数
  },
  mounted() {
    console.log(this.formCreateInject.api);  // 在组件内部访问 API
  }
});
```

## API屬性 ​

API 提供了一些關鍵屬性，幫助開發者控制和操作表單。

| 屬性名稱 | 型別 | 說明 |
| --- | --- | --- |
| config | Object | 表單的全域配置物件，包含了所有表單的配置資訊 |
| formulas | Record<string, (...args: any[]) => any> | 當前表單執行時可用的計算公式登錄檔。內建公式函式 |
| index | number\|undefined | 獲取當前表單在子表單(group)中的索引（如果表單是巢狀的子表單） |
| siblings | Api[]\|undefined | 獲取當前表單所在的子表單(group)中所有表單的API（如果表單是巢狀的子表單） |
| rule | Rule[] | 當前表單的生成規則列表，定義了表單的結構和元件 |
| form | Object | 當前表單的資料物件，其中包含了所有欄位的值 |
| parent | Api \|undefined | 父級表單的 Api 物件（如果表單是巢狀的子表單） |
| top | Api | 最頂層表單的 Api 物件（適用於巢狀表單的場景） |
| children | Api[] | 子表單的 Api 物件陣列，允許對巢狀的子表單進行操作 |

## API方法 ​

API 提供了一系列豐富的方法，允許開發者在表單的各個階段動態控制和操作表單。

| 方法名稱 | 型別 | 說明 |
| --- | --- | --- |
| print | (config: Object)=>void | 列印當前表單，檢視詳細文件。 |
| exportPdf | (config: Object)=>void | 匯出當前表單為 PDF，檢視詳細文件。 |
| message | (message:string, type?: string)=>void | 彈出框提示訊息 |
| confirm | (mssage: string, title?: string)=> Promise<any> | 確認對話方塊 |
| formEl | ()=> undefined\|ComponentInternalInstance | 獲取整個表單的 Vue 元件例項，便於直接操作元件的內部方法或屬性 |
| wrapEl | (id: string)=> undefined\|ComponentInternalInstance | 獲取指定表單項的 Vue 元件例項，用於對具體表單項的操作 |
| formData | (field?: string[])=> Object | 獲取當前表單的資料物件，返回所有欄位的值 |
| getValue | (field: string)=> any | 獲取指定欄位的值 |
| coverValue | (formData: Object)=> void | 用新的資料覆蓋表單的當前值 |
| setValue | (formData: Object)=> void\|(field: string, value: any)=> void | 設定表單的值，可以為整個表單設定，也可以為特定欄位設定 |
| fields | ()=> string[] | 獲取表單中所有欄位的名稱 |
| hidden | (hidden: Boolean, field?: string\|string[])=> void | 隱藏或顯示錶單的指定元件(無 DOM 節點) |
| display | (display: Boolean, field?: string\|string[])=> void | 控制表單元件的顯示與否(有 DOM 節點) |
| disabled | (disabled: Boolean, field?: string\|string[])=> void | 禁用或啟用表單的指定元件 |
| onSubmit | (fn: (formData: Object, api: Api) => void)=> void | 監聽表單提交事件，當表單被提交時執行回撥 |
| updateOptions | (options: Options)=> void | 更新表單的全域配置 |
| submit | (success?: (formData: Object, api: Api) => void, fail?: (api: Api) => void)=> Promise<any> | 手動提交表單，觸發提交流程並執行成功或失敗的回撥 |
| getRule | (id: string)=> Rule\|undefined | 透過name或者field獲取指定欄位的生成規則 |
| getRenderRule | (id: string)=> Rule\|undefined | 透過name或者field獲取元件最終渲染的規則，包含動態變化後的內容 |
| validate | (callback?: (state: any) => void)=> Promise<any> | 驗證表單，返回驗證結果的 Promise |
| validateField | (field: string, callback?: (state: any) => void)=> Promise<any> | 驗證指定欄位，返回驗證結果的 Promise |
| clearValidateState | (fields?: string\|string[], clearSub?: Boolean)=> void | 清理指定欄位或整個表單的驗證狀態 |
| resetFields | (field?: string\| string[])=> void | 重置表單，將所有欄位的值重置為初始狀態 |
| nextTick | (fn: (api: Api) => void)=> void | 在表單渲染後執行回撥，確保所有元件都已載入完畢 |
| fetch | (option: FetchOption)=> Promise<any> | 傳送遠端請求，支援自定義的請求邏輯和處理方式 |
| setData | (id: string, value?: any)=> void | 設定外部資料，支援在表單中使用外部資料來源 |
| getData | (id: string, defaultValue?: any)=> any | 獲取外部資料，返回之前設定的資料物件 |
| refreshData | (id: string)=> void | 重新整理與外部資料相關的元件，確保資料變更後 UI 同步更新 |

## API.bus ​

API 提供了一套內建的事件管理系統，幫助開發者在表單中靈活地管理和觸發自定義事件。這些事件可以用於元件之間的通訊、狀態管理、動態行為觸發等場景。

| 方法名稱 | 型別 | 說明 |
| --- | --- | --- |
| $emit | (event: string, ...args: any[])=> void | 手動觸發事件 |
| $on | $on(event: string\|string[], callback: Function)=> void | 監聽事件 |
| $once | $once(event: string\|string[], callback: Function)=> void | 監聽一次性事件 |
| $off | $off(event: string\|string[], callback: Function)=> void | 取消事件監聽 |

## 示例 ​

### 傳送請求 ​

在事件中可以透過 `fetch` 方法手動傳送遠端請求

js

```
api.fetch({
    action: '/api/getdata',
    query: {
        name: api.getValue('name')
    }
}).then(res=>{
    //todo
});
```

### 禁用元件 ​

透過 `disabled` 方法禁用指定元件

js

```
//通过组件的 field 禁用组件
api.disabled(true, ['field1', 'field2', 'field3']);
//通过组件的 name 禁用组件
api.disabled(true, ['name1', 'name2', 'name3']);
```

### 隱藏元件 ​

透過 `hidden` 方法隱藏指定元件

js

```
//通过组件的 field 隐藏组件
api.hidden(true, ['field1', 'field2', 'field3']);
//通过组件的 name 隐藏组件
api.hidden(true, ['name1', 'name2', 'name3']);
```

### 呼叫元件方法 ​

透過 `el` 方法呼叫元件例項方法

js

```
//获取 elTable 组件选中的行
api.el('elTable').getSelectionRows();
```

### 修改表單值 ​

透過 `setValue` 方法修改表單值

js

```
api.setValue({
    field1: 'value1',
    field2: 'value2',
    field3: 'value3',
});
```

### 修改元件的屬性 ​

透過 `getRule` 方法獲取元件規則並修改, **可以透過設計器右側的 JSON 面板檢視元件的對應配置的層級和配置名**

js

```
//通过组件的 field 获取组件规则
const rule1 = api.getRule('field');
//通过组件的 name 获取组件规则
const rule2 = api.getRule('name');

axios.get('/api/getForm').then(data => {
    //修改组件配置项中的 data 数据
    rule1.props.data = data;
})
//修改组件是否必填
rule2.$required = true;
//修改组件的文字
rule2.children[0] = '新文字';
```

### 手動驗證指定欄位 ​

透過 api.validateField 方法手動觸發對指定欄位的表單驗證

js

```
api.validateField('field').then(() => {
    // 验证通过
});
```

### 手動觸發表單驗證 ​

透過 api.validate 方法手動觸發表單的整體驗證

js

```
api.validate().then(() => {
    // 验证通过
});
```

### 手動觸發表單提交 ​

透過呼叫 api.submit() 方法，無需使用者點選提交按鈕即可手動觸發表單的提交操作

js

```
api.submit();
```

### 設定/獲取外部資料 ​

js

```
api.setData('Token', 'xxx');
const token = api.getData('Token');
```

### 使用 formulas 呼叫內建 ​

`api.formulas` 與視覺化配置、公式欄中使用的**同一套**計算函式。可在任意能拿到 `api` 的指令碼里，按[內建公式函式](https://pro.form-create.com/doc/formula_function)中的函式名直接呼叫。

**示例一：在事件中用內建函式做金額小計與四捨五入**

js

```
function onChangePrice($inject) {
  const api = $inject.api;
  const price = api.formulas.TONUMBER(api.getValue('price'));
  const qty = api.formulas.TONUMBER(api.getValue('quantity'));
  const line = api.formulas.MUL(price, qty);
  api.setValue({ lineTotal: api.formulas.ROUND(line, 2) });
}
```

**示例二：條件與字串拼接（邏輯函式、文字函式）**

js

```
function syncSummary($inject) {
  const api = $inject.api;
  const name = api.getValue('name') || '';
  const needTag = api.formulas.NOTEMPTY(name);
  const label = api.formulas.IF(needTag, api.formulas.CONCAT('客户：', name), '未填写');
  api.setValue({ summaryLabel: label });
}
```