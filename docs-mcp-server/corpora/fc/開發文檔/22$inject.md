# $inject

> Source: https://pro.form-create.com/doc/inject

---

# $inject ​

本文詳解事件回撥中 `$inject` 引數的資料結構及各項屬性說明。

![request.png](https://pro.form-create.com/doc/img/request.png)

## 資料結構 ​

ts

```
type Inject = {
    api: API,        // 表单的 API 实例
    rule: Rule[],    // 当前表单完整规则数组
    self: Rule,      // 当前组件的生成规则
    option: Object,  // 表单全局配置对象
    args: any[],     // 函数的原始参数数组
}
```

重要說明

`$inject` 是 FormCreate 設計器在事件回撥中自動注入的引數物件，它提供了訪問表單 API、規則、配置等核心功能的能力。正確使用 `$inject` 可以大大增強元件的互動性和資料處理能力。

## 示例 1: 呼叫 API 方法 ​

js

```
const api = $inject.api;
const formData = api.formData();
```

### 常用 API 方法 ​

js

```
// 获取表单数据
const formData = $inject.api.formData();
// 设置表单数据
$inject.api.setValue({ field: 'value' });
// 获取指定字段的值
const fieldValue = $inject.api.getValue('fieldName');
// 设置指定字段的值
$inject.api.setValue('fieldName', 'newValue');
// 验证表单（返回 Promise）
$inject.api.validate().then(isValid => {
    console.log('验证结果:', isValid);
}).catch(error => {
    console.error('验证失败:', error);
});
// 重置表单
$inject.api.resetFields();
```

## 示例 2: 獲取事件的原始引數 ​

**例如元件觸發 change 事件時，會傳遞出當前的 value 值。**

js

```
emit('change', value);
//or
//props.change(value);
```

獲取 value 值

js

```
const value = $inject.args[0];
```

**如果事件存在多個引數時**

js

```
emit('beforeUpload', file, fileList);
//or
//props.beforeUpload(file, fileList);
```

獲取引數

js

```
const file = $inject.args[0];
const fileList = $inject.args[1];
```

## 示例3: 修改當前元件規則 ​

例如當 value 修改後透過介面修改元件狀態

js

```
const api = $inject.api;
const value = $inject.args[0];
api.fetch({
    action: '/api/getdata',
    query:{
        value
    }
}).then(res=>{
    //修改自己
    $inject.self.options = res.data;
    //修改其他组件
    $inject.api.getRule('name').value = res.name;
})
```