# 消息提示 API

> Source: https://pro.form-create.com/doc/api-message

---

# 訊息提示 API ​

FormCreate 提供了 `api.message` 和 `api.confirm` 兩個便捷的訊息提示 API，讓您可以在表單事件中輕鬆顯示訊息提示和確認對話方塊。

> **v6.1 新增功能**：該 API 在 6.1 版本中引入，提供了統一的訊息提示和確認對話方塊介面。

獲取 API

在使用訊息提示 API 之前，您需要先獲取 API 物件。API 物件可以透過事件、驗證函式、鉤子函式等方式獲取。

詳細說明請檢視：[如何獲取 API](https://pro.form-create.com/doc/api#%E8%8E%B7%E5%8F%96api)

## 資料型別 ​

ts

```
type Message = (message: string, type?: string, options?: Object) => any;
type Confirm = (message: string, title?: string, options?: Object) => Promise;
```

## api.message ​

用於顯示訊息提示，支援多種訊息型別（success、error、warning、info 等），可以在表單操作後給使用者提供即時反饋。

### 基本用法 ​

js

```
// 字符串参数
api.message('这是一条消息');
api.message('操作成功', 'success');
```

### 訊息型別 ​

- `success` - 成功訊息
- `error` - 錯誤訊息
- `warning` - 警告訊息
- `info` - 資訊訊息
- `primary` - 主要訊息

### 使用示例 ​

js

```
{
    type: 'button',
    field: 'submitBtn',
    title: '提交',
    on: {
        click: function($inject) {
            const api = $inject.api;
            api.validate().then(() => {
                api.message('提交成功！', 'success');
            }).catch(() => {
                api.message('请检查表单数据', 'warning');
            });
        }
    }
}
```

## api.confirm ​

用於顯示確認對話方塊，常用於刪除確認、操作確認等需要使用者二次確認的場景。該方法返回 Promise，可以透過 `.then()` 和 `.catch()` 處理使用者的選擇。

### 基本用法 ​

js

```
api.confirm('确定要删除这条记录吗？', '提示').then(() => {
    // 用户点击确定
    api.message('操作已确认', 'success');
}).catch(() => {
    // 用户点击取消或关闭
    api.message('操作已取消');
});
```

### 引數說明 ​

- **message** (string) - 確認對話方塊的提示資訊
- **title** (string, 可選) - 對話方塊的標題
- **options** (object, 可選) - 配置選項

### 返回值 ​

返回 Promise：`resolve` 表示使用者點選確定，`reject` 表示使用者點選取消或關閉。

### 使用示例 ​

js

```
{
    type: 'button',
    field: 'deleteBtn',
    title: '删除',
    on: {
        click: function($inject) {
            const api = $inject.api;
            api.confirm('确定要删除吗？删除后无法恢复！', '删除确认').then(() => {
                api.message('删除成功', 'success');
            });
        }
    }
}
```

## 不同 UI 版本的差異 ​

### Element Plus 版本 ​

- **message 型別**：支援 `success`、`error`、`warning`、`info`、`primary`
- **confirm 配置**：支援 Element Plus `ElMessageBox.confirm` 的所有配置選項
- **返回值**：`api.message` 返回 `ElMessage` 例項，可呼叫 `close()` 方法

js

```
// Element Plus 特有配置
api.message({
    showClose: true,        // 显示关闭按钮
    center: true,           // 文字居中
    dangerouslyUseHTMLString: true
});

api.confirm('提示', '标题', {
    distinguishCancelAndClose: true,  // 区分取消和关闭
    roundButton: true,                 // 圆角按钮
    buttonSize: 'large'                // 按钮大小
});
```

### Ant Design Vue 版本 ​

- **message 型別**：支援 `success`、`error`、`warning`、`info`（不支援 `primary`）
- **message 引數**：物件配置中可使用 `content` 或 `message` 作為訊息內容
- **confirm 配置**：支援 Ant Design Vue `Modal.confirm` 的所有配置選項

js

```
// Ant Design Vue 特有用法
api.message({
    content: '提示信息',  // 可使用 content 或 message
    type: 'success'
});

api.confirm('提示内容', '标题', {
    okText: '确定',       // 确认按钮文字（替代 confirmButtonText）
    cancelText: '取消',   // 取消按钮文字（替代 cancelButtonText）
    okType: 'danger'      // 确认按钮类型
});
```

### 移動端版本（Vant） ​

- **message 型別**：`error` 自動對映為 `fail`，`primary` 自動對映為 `text`
- **支援型別**：`success`、`fail`、`loading`、`text`
- **confirm 配置**：支援 Vant `showConfirmDialog` 的所有配置選項

js

```
// Vant 特有用法
api.message('加载中...', 'loading');
api.message('操作失败', 'error');  // 实际显示为 fail 类型

api.confirm('提示', '标题', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    confirmButtonColor: '#ee0a24'  // 确认按钮颜色
});
```

## 相關連結 ​

- [Element Plus Message](https://element-plus.org/zh-CN/component/message.html)
- [Element Plus MessageBox](https://element-plus.org/zh-CN/component/message-box.html)
- [Ant Design Vue Message](https://antdv.com/components/message-cn)
- [Ant Design Vue Modal](https://antdv.com/components/modal-cn)
- [Vant Toast](https://vant-ui.github.io/vant/#/zh-CN/toast)
- [Vant Dialog](https://vant-ui.github.io/vant/#/zh-CN/dialog)
- [表單 API 文件](https://pro.form-create.com/doc/api)