# 导出Vue组件

> Source: https://pro.form-create.com/doc/sfc

---

# 匯出Vue元件 ​

`FcDesigner` 提供了生成兩種型別的 Vue 元件的功能：**SFC 檔案** 和 **基於 FormCreate 的 Vue 元件**。這兩種方式在功能和用途上有所不同。

![sfc](https://pro.form-create.com/doc/img/sfc.png)

## 生成Vue2語法的模板 ​

透過配置項`config.useTemplate = true`可以生成Vue2語法的模板，預設是Vue3語法

## 單檔案元件（SFC） ​

透過 FcDesigner，您可以生成 單檔案元件（SFC） 檔案。SFC 檔案是 Vue 元件的標準格式，包含模板、指令碼和樣式。這種方式適用於那些需要將表單設計為獨立元件並在其他 Vue 專案中使用的場景。

**特點**

- **靜態生成：** SFC 檔案生成的是靜態的 Vue 元件檔案。這意味著生成的元件不支援動態表單功能。
- **無互動邏輯：** SFC 檔案不包含表單的動態互動邏輯、API 方法呼叫、事件響應等，因此無法在執行時變更表單。

## 基於 FormCreate 的 Vue 元件 ​

另一種方式是生成基於 FormCreate 的 Vue 元件，這種元件能夠保留設計器中定義的動態表單功能，包括互動邏輯控制、API 方法呼叫、事件響應等。

**特點**

- **動態表單：** 基於 FormCreate 的元件支援動態表單的所有功能，您可以在執行時對錶單進行更改。
- **互動和擴展性：** 可以使用 FormCreate 提供的 API 進行動態控制和擴展，滿足複雜業務需求。