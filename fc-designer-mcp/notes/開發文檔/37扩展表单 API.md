# 扩展表单 API

> Source: https://pro.form-create.com/doc/extend-api

---

# 擴展表單 API ​

FormCreate 的 API 具有高度的擴展性，允許開發者建立自定義的操作和功能，以滿足複雜的業務需求。透過 `formCreate.extendApi` 方法，您可以輕鬆地為 API 物件新增新的方法和屬性。

獲取 API

在使用擴展的 API 之前，您需要先獲取 API 物件。API 物件可以透過事件、驗證函式、鉤子函式等方式獲取。

詳細說明請檢視：[如何獲取 API](https://pro.form-create.com/doc/api#%E8%8E%B7%E5%8F%96api)

## 基本用法 ​

js

```
import formCreate from '@form-create/element-ui';

formCreate.extendApi((api) => {
  return {
    customMethod() {
      // 执行自定义操作
      console.log('这是一个自定义 API 方法');
    },
    // 自定义 HTTP 请求方法
    async customRequest(url, options = {}) {
      // 实现自定义请求逻辑
      const response = await fetch(url, options);
      return response.json();
    },

    // 自定义工具方法
    formatDate(date, format = 'YYYY-MM-DD') {
      // 格式化日期
      return new Date(date).toLocaleDateString();
    },

    // 自定义数据处理方法
    processData(data) {
      // 处理数据
      return data.map(item => ({ ...item, processed: true }));
    }
  };
});
```

## 使用擴展的 API ​

擴展後的 API 可以在表單事件、驗證函式等任何可以訪問 `api` 物件的地方使用：

js

```
// 在事件中使用
function handleClick($inject) {
  const api = $inject.api;

  // 调用扩展的方法
  api.customMethod();

  // 使用扩展的请求方法
  api.customRequest('/api/data').then(data => {
    console.log('数据:', data);
  });
}
```

透過這種方式，您可以在整個應用中統一使用擴展的 API，提高程式碼的可維護性和複用性。