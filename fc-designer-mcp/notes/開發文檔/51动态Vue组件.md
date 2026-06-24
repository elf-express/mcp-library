# 动态Vue组件

> Source: https://pro.form-create.com/doc/dynamic-render

---

# 動態Vue元件 ​

動態Vue元件允許您透過字串形式的Vue單檔案元件（SFC）內容來動態建立和渲染Vue元件。該元件支援完整的Vue SFC語法，包括template、script和style部分，並提供了樣式隔離和錯誤處理機制。

## 基礎使用 ​

### 基本渲染 ​

透過傳入Vue單檔案元件字串來動態渲染元件：

js

```
const vueContent = `
<template>
  <div class="dynamic-component">
    <h3>{{ title }}</h3>
    <p>{{ message }}</p>
    <button @click="handleClick">点击我</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '动态组件',
      message: '这是一个动态渲染的Vue组件'
    }
  },
  methods: {
    handleClick() {
      this.message = '按钮被点击了！'
    }
  }
}
</script>

<style scoped>
.dynamic-component {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
</style>
`
```

### 在FormCreate中使用 ​

js

```
const rule = [
  {
    type: 'dynamic-render',
    field: 'dynamicComponent',
    props: {
      vueContent: vueContent
    }
  }
]
```

## 配置項 ​

動態Vue元件提供了以下配置選項：

| 屬性名 | 型別 | 預設值 | 必需 | 說明 |
| --- | --- | --- | --- | --- |
| vueContent | String | - | 是 | Vue單檔案元件字串內容 |

## 事件 ​

動態Vue元件提供了豐富的事件，方便您監聽元件狀態變化：

| 事件名 | 引數 | 說明 |
| --- | --- | --- |
| mounted | element | 元件掛載完成事件，當動態元件渲染完成時觸發 |
| error | error | 元件解析錯誤事件，當Vue內容解析失敗時觸發 |
| update:modelValue | value | 雙向繫結值更新事件，當元件值變化時觸發 |

### 事件使用示例 ​

**監聽元件掛載**：

js

```
function handleMounted(element) {
    console.log('动态组件已挂载:', element);
    // 可以在这里进行DOM操作或初始化
}
```

**監聽解析錯誤**：

js

```
function handleError(error) {
    console.error('组件解析失败:', error);
    // 显示错误提示给用户
    showErrorMessage('组件内容解析失败，请检查语法');
}
```

**監聽值變化**：

js

```
function handleValueChange(value) {
    console.log('组件值变化:', value);
    // 可以实时保存数据或触发其他操作
}
```

## 方法 ​

動態Vue元件提供了多種方法，方便您進行程式化控制：

| 方法名 | 引數 | 說明 | 返回值 |
| --- | --- | --- | --- |
| reRender | - | 重新渲染元件 | - |
| removeStyle | id | 移除指定樣式 | Boolean |
| clearAllStyles | - | 清除所有動態新增的樣式 | Number |

### 方法使用示例 ​

**重新渲染元件**：

js

```
function refreshComponent($inject) {
    const dynamicRender = $inject.api.el('ref_dynamic_render');
    dynamicRender.reRender();
}
```

**清除樣式**：

js

```
function clearStyles($inject) {
    const dynamicRender = $inject.api.el('ref_dynamic_render');
    const removedCount = dynamicRender.clearAllStyles();
    console.log(`清除了 ${removedCount} 个样式`);
}
```

## 支援的Vue語法 ​

### Template語法 ​

支援完整的Vue模板語法：

vue

```
<template>
  <!-- 条件渲染 -->
  <div v-if="showContent">内容显示</div>

  <!-- 列表渲染 -->
  <ul>
    <li v-for="item in list" :key="item.id">
      {{ item.name }}
    </li>
  </ul>

  <!-- 事件处理 -->
  <button @click="handleClick">点击</button>

  <!-- 属性绑定 -->
  <input v-model="inputValue" :placeholder="placeholder" />
</template>
```

### Script語法 ​

Vue 2 Options API

vue

```
<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  computed: {
    doubleCount() {
      return this.count * 2
    }
  },
  methods: {
    increment() {
      this.count++
    }
  },
  watch: {
    count(newVal) {
      console.log('count changed:', newVal)
    }
  }
}
</script>
```

### Style語法 ​

支援CSS樣式：

vue

```
<style>
.component-wrapper {
  padding: 20px;
  background: #f5f5f5;
}

.component-wrapper h3 {
  color: #333;
  margin-bottom: 10px;
}
</style>
```

## 匯入外部依賴 ​

雖然動態元件不支援 `import` 語法，但您可以透過以下方式實現相同的功能：

### 方案一：使用外部變數（推薦） ​

透過 `formCreate.setData` 設定外部變數，然後在動態元件中透過 `api.getData` 獲取。這是最推薦的方式，詳細說明請檢視[匯入外部資料文件](https://pro.form-create.com/doc/get-data)。

**1. 在應用啟動時設定外部變數**：

js

```
// main.js 或应用入口文件
import { formCreate } from 'path/to/fcDesignerPro';
import axios from 'axios';
import { formatDate, formatCurrency } from '@/utils/format';

// 设置工具函数
formCreate.setData('formatDate', formatDate);
formCreate.setData('formatCurrency', formatCurrency);

// 设置 API 实例
formCreate.setData('axios', axios);

// 设置工具对象
formCreate.setData('utils', {
  formatDate,
  formatCurrency,
  debounce: (fn, delay) => {
    let timer = null;
    return function(...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }
});
```

**2. 在動態元件中使用外部變數**：

vue

```
<template>
  <div class="dynamic-component">
    <p>格式化日期：{{ formattedDate }}</p>
    <p>格式化金额：{{ formattedAmount }}</p>
    <button @click="fetchData">获取数据</button>
  </div>
</template>

<script>
export default {
  props: {
    formCreateInject: Object
  },
  data() {
    return {
      date: new Date(),
      amount: 1234.56,
      formattedDate: '',
      formattedAmount: ''
    }
  },
  mounted() {
    // 通过 $inject.api.getData 获取外部变量
    const formatDate = this.formCreateInject.api.getData('formatDate');
    const formatCurrency = this.formCreateInject.api.getData('formatCurrency');

    if (formatDate) {
      this.formattedDate = formatDate(this.date);
    }
    if (formatCurrency) {
      this.formattedAmount = formatCurrency(this.amount);
    }
  },
  methods: {
    async fetchData() {
      // 获取 axios 实例
      const axios = this.formCreateInject.api.getData('axios');
      if (axios) {
        try {
          const response = await axios.get('/api/data');
          console.log('获取到的数据:', response.data);
        } catch (error) {
          console.error('请求失败:', error);
        }
      }
    }
  }
}
</script>
```

### 方案二：使用 loadjs 動態載入庫 ​

對於需要動態載入的第三方庫，可以使用 `loadjs.loadDepend` 方法。詳細說明請檢視[依賴資源載入文件](https://pro.form-create.com/doc/loadjs-depend)。

vue

```
<template>
  <div class="dynamic-component">
    <p>处理后的数据：{{ processedData }}</p>
    <button @click="processData">处理数据</button>
  </div>
</template>

<script>
export default {
  props: {
    formCreateInject: Object
  },
  data() {
    return {
      rawData: [1, 2, 3, 4, 5],
      processedData: []
    }
  },
  methods: {
    async processData() {
      // 动态加载 lodash 库
      this.formCreateInject.form.loadjs('https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js', () => {
          // 使用加载的库（通常会挂载到 window 对象）
          if (window._) {
              this.processedData = window._.map(this.rawData, n => n * 2);
          }
      });
    }
  }
}
</script>
```

### 方案三：擴展 API（推薦用於業務方法） ​

透過 `formCreate.extendApi` 擴展 API，將自定義方法新增到 API 物件上，這樣在動態元件中就可以直接透過 `api` 物件呼叫這些方法。

**1. 在應用啟動時擴展 API**：

js

```
// main.js
import { formCreate } from 'path/to/fcDesignerPro';
import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';

// 扩展 API，添加自定义方法
formCreate.extendApi(api => {
  return {
    // 自定义 HTTP 请求方法
    async request(url, options = {}) {
      try {
        const response = await axios({
          url,
          method: options.method || 'GET',
          data: options.data,
          headers: options.headers || {}
        });
        return response.data;
      } catch (error) {
        console.error('请求失败:', error);
        throw error;
      }
    },

    // 自定义消息提示方法
    showMessage(message, type = 'success') {
      return ElMessage({
        message,
        type,
        duration: 3000
      });
    },

    // 自定义确认对话框方法
    showConfirm(message, title = '提示') {
      return ElMessageBox.confirm(message, title, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      });
    },

    // 自定义工具方法
    formatDate(date, format = 'YYYY-MM-DD') {
      // 使用 dayjs 或其他日期库
      if (window.dayjs) {
        return window.dayjs(date).format(format);
      }
      return new Date(date).toLocaleDateString();
    },

    // 自定义数据处理方法
    processData(data) {
      // 自定义数据处理逻辑
      return data.map(item => ({
        ...item,
        processed: true
      }));
    }
  };
});
```

**2. 在動態元件中使用擴展的 API**：

vue

```
<template>
  <div class="dynamic-component">
    <p>格式化日期：{{ formattedDate }}</p>
    <button @click="fetchData">获取数据</button>
    <button @click="handleSubmit">提交</button>
  </div>
</template>

<script>
export default {
  props: {
    formCreateInject: Object
  },
  data() {
    return {
      formattedDate: '',
      data: []
    }
  },
  mounted() {
    // 通过 $inject.api 访问扩展的 API
    const api = this.formCreateInject.api;
    if (api.formatDate) {
      this.formattedDate = api.formatDate(new Date());
    }
  },
  methods: {
    async fetchData() {
      const api = this.formCreateInject.api;
      if (api) {
        try {
          // 使用扩展的 request 方法
          if (api.request) {
            const result = await api.request('/api/data', {
              method: 'GET'
            });
            this.data = api.processData ? api.processData(result) : result;

            // 使用扩展的 showMessage 方法
            if (api.showMessage) {
              api.showMessage('数据加载成功', 'success');
            }
          }
        } catch (error) {
          if (api.showMessage) {
            api.showMessage('数据加载失败', 'error');
          }
        }
      }
    },

    async handleSubmit() {
      const api = this.formCreateInject.api;
      if (api.showConfirm) {
        try {
          // 使用扩展的 confirm 方法
          await api.showConfirm('确定要提交吗？', '提交确认');

          // 确认后执行提交
          if (api.request) {
            await api.request('/api/submit', {
              method: 'POST',
              data: this.data
            });

            if (api.showMessage) {
              api.showMessage('提交成功', 'success');
            }
          }
        } catch (error) {
          // 用户取消或请求失败
          if (error !== 'cancel' && api.showMessage) {
            api.showMessage('提交失败', 'error');
          }
        }
      }
    }
  }
}
</script>
```

### 方案四：使用全域變數 ​

如果庫已經透過 `<script>` 標籤載入到全域，可以直接使用：

vue

```
<script>
export default {
  methods: {
    // ✅ 使用全局变量（需要确保库已通过 script 标签加载）
    useGlobalLibrary() {
      if (window.axios) {
        window.axios.get('/api/data').then(res => {
          console.log('数据:', res.data);
        });
      }

      if (window._) {
        const result = window._.chunk([1, 2, 3, 4, 5], 2);
        console.log('分块结果:', result);
      }
    }
  }
}
</script>
```

最佳實踐

1. **優先使用擴展 API**：對於業務相關的通用方法（如訊息提示、資料請求、工具函式等），建議透過 `formCreate.extendApi` 擴展 API，這樣在動態元件中可以直接透過 `api` 物件呼叫，程式碼更簡潔統一
2. **使用外部變數**：對於需要共享的資料、例項物件等，透過 `formCreate.setData` 設定，在動態元件中透過 `api.getData` 獲取
3. **清理資源**：在元件解除安裝時，記得清理透過 `formCreate.setData` 設定的資料，避免記憶體洩漏

## 示例 ​

動態元件可以完美整合到FormCreate表單中：

js

```
const rule = [
  {
    type: 'dynamic-render',
    field: 'customComponent',
    props: {
      vueContent: `
        <template>
          <div>
            <el-input v-model="inputValue" placeholder="请输入内容" />
            <el-button @click="submit">提交</el-button>
          </div>
        </template>
        <script>
        export default {
          data() {
            return {
              inputValue: ''
            }
          },
          methods: {
            submit() {
              console.log('提交值:', this.inputValue)
            }
          }
        }
        </script>
      `
    },
    on: {
      mounted: (element) => {
        console.log('自定义组件已挂载')
      }
    }
  }
]
```

### 動態更新元件內容 ​

js

```
function updateComponentContent($inject, newContent) {
    const dynamicRender = $inject.api.el('ref_dynamic_render');
    // 更新vueContent属性会触发重新渲染
    dynamicRender.vueContent = newContent;
}
```

### 錯誤處理 ​

元件內建了完善的錯誤處理機制：

js

```
const rule = [
  {
    type: 'dynamic-render',
    field: 'errorHandling',
    props: {
      vueContent: invalidVueContent
    },
    on: {
      error: (error) => {
        console.error('组件解析错误:', error);
        // 可以显示友好的错误提示
        showErrorToast('组件内容有误，请检查语法');
      }
    }
  }
]
```

## 注意事項 ​

注意

該元件需要匯入完整的 Vue 版本才能正常工作，請確保在構建配置中正確設定 Vue 別名。

### 1. Vue 版本配置 ​

動態元件需要完整的 Vue 版本支援，請在構建配置中新增以下別名設定：

**Vue 3 配置**：

js

```
// vite.config.js
export default {
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js'
    }
  }
}
```

js

```
// webpack.config.js
module.exports = {
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js'
    }
  }
}
```

**Vue 2 配置**：

js

```
// vite.config.js
export default {
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm.js'
    }
  }
}
```

js

```
// webpack.config.js
module.exports = {
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm.js'
    }
  }
}
```

### 2. 外部資源限制 ​

限制

動態元件內部不能透過 `import` 或 `require` 匯入外部資源，包括：

- 外部 JavaScript 模組
- CSS 檔案
- 圖片資源
- 字型檔案

**不支援的用法**：

vue

```
<script>
// ❌ 不支持外部模块导入
import { someFunction } from './utils'
import axios from 'axios'

// ❌ 不支持外部样式导入
import './styles.css'

export default {
  data() {
    return {}
  }
}
</script>

<style>
/* ❌ 不支持外部资源引用 */
@import url('https://fonts.googleapis.com/css2?family=Roboto');
</style>
```

替代方案

動態元件雖然不支援 `import` 語法，但您可以透過多種方式實現相同的功能。詳細說明和示例請檢視匯入外部依賴章節。