# Mermaid 图表组件

> Source: https://pro.form-create.com/doc/mermaid

---

# Mermaid 圖表元件 ​

Mermaid 圖表元件是一個基於 Mermaid.js 的 Vue 圖表元件，支援透過簡單的文字語法建立流程圖、時序圖、甘特圖、類圖等多種圖表型別。元件提供了豐富的配置選項和事件支援，可以輕鬆整合到表單設計器中。

學習 Mermaid 語法

Mermaid 使用簡單的文字語法來建立圖表。如果您是第一次使用 Mermaid，建議先檢視官方文件學習語法：

- 📖 [Mermaid 官方文件](https://mermaid.nodejs.cn/intro/) - 完整的語法教程和圖表型別說明
- 🎨 [Mermaid 線上編輯器](https://mermaid-live.nodejs.cn/edit) - 線上編寫和預覽 Mermaid 圖表，快速測試語法

在編輯器中編寫和測試您的 Mermaid 程式碼後，將程式碼複製到元件的 `content` 屬性中即可。

## 基礎使用 ​

### 修改圖表內容 ​

透過注入的 `api.getRule` 方法可以動態修改 Mermaid 圖表的內容和配置：

js

```
function onChange($inject) {
    const newContent = `
graph TD
    A[开始] --> B{判断条件}
    B -->|是| C[执行操作A]
    B -->|否| D[执行操作B]
    C --> E[结束]
    D --> E
`;
    $inject.api.getRule('ref_F2vulxvqc841dac').props.content = newContent;
}
```

### 獲取元件例項 ​

透過注入的 `api.el` 方法可以獲取元件例項，進行更高階的操作：

js

```
function getMermaidInstance($inject) {
    const mermaidComponent = $inject.api.el('ref_F2vulxvqc841dac');

    if (mermaidComponent) {
        // 重新加载图表
        mermaidComponent.load();

        // 修改内容后重新加载
        mermaidComponent.$props.content = '新的 Mermaid 代码';
        mermaidComponent.load();
    }
}
```

## 配置項 ​

Mermaid 元件提供了豐富的配置選項，您可以透過在設計器中配置屬性來自定義圖表的行為和外觀。

| 屬性名 | 型別 | 預設值 | 必需 | 說明 |
| --- | --- | --- | --- | --- |
| content | String | '' | 是 | Mermaid 圖表程式碼，支援流程圖、時序圖、甘特圖等多種圖表語法 |
| config | Object | {} | 否 | Mermaid 配置物件，用於自定義圖表的渲染配置 |
| theme | String | 'default' | 否 | 圖表主題，可選值：default、dark、forest、neutral 等 |
| width | String | '100%' | 否 | 圖表容器寬度，支援 CSS 單位（如 px、%、em 等） |

## 事件 ​

Mermaid 元件提供了事件，方便您監聽圖表狀態變化並執行相應的處理。

| 事件名 | 引數 | 說明 |
| --- | --- | --- |
| beforeLoad | content | 圖表載入前事件，在圖表初始化前觸發 |
| loaded | { svg } | 圖表載入完成事件，在圖表渲染完成後觸發 |

## 方法 ​

Mermaid 元件提供了方法，方便您進行程式化控制。

| 方法名 | 引數 | 說明 | 返回值 |
| --- | --- | --- | --- |
| load | - | 重新載入圖表 | - |

## 圖表型別 ​

Mermaid 支援多種圖表型別，每種型別都有其特定的語法。以下是常用的圖表型別：

### 支援的圖表型別 ​

| 型別名 | 說明 | 語法示例 |
| --- | --- | --- |
| flowchart | 流程圖 | graph TD 或 flowchart LR |
| sequence | 時序圖 | sequenceDiagram |
| gantt | 甘特圖 | gantt |
| class | 類圖 | classDiagram |
| state | 狀態圖 | stateDiagram-v2 |
| er | 實體關係圖 | erDiagram |
| journey | 使用者旅程圖 | journey |
| pie | 餅圖 | pie |
| gitgraph | Git 圖 | gitgraph |
| mindmap | 思維導圖 | mindmap |
| timeline | 時間線 | timeline |
| quadrantChart | 象限圖 | quadrantChart |
| requirement | 需求圖 | requirementDiagram |
| C4Context | C4 上下文圖 | C4Context |

### 圖表型別示例 ​

**流程圖示例**：

mermaid

```
graph TD
    A[开始] --> B{判断条件}
    B -->|是| C[执行操作A]
    B -->|否| D[执行操作B]
    C --> E[结束]
    D --> E
```

**時序圖示例**：

mermaid

```
sequenceDiagram
    participant A as 用户
    participant B as 系统
    A->>B: 发送请求
    B-->>A: 返回响应
```

**甘特圖示例**：

mermaid

```
gantt
    title 项目进度
    dateFormat YYYY-MM-DD
    section 阶段一
    任务A :a1, 2024-01-01, 30d
    任务B :a2, after a1, 20d
    section 阶段二
    任务C :2024-02-01, 30d
```

## 主題配置 ​

Mermaid 元件支援多種內建主題，您可以透過 `theme` 屬性進行配置：

| 主題名 | 說明 |
| --- | --- |
| default | 預設主題（淺色） |
| dark | 深色主題 |
| forest | 森林主題 |
| neutral | 中性主題 |

### 主題使用示例 ​

js

```
{
    type: 'mermaid',
    field: 'diagram',
    props: {
        content: 'graph TD\n    A --> B',
        theme: 'dark'  // 使用深色主题
    }
}
```

## 高階配置 ​

透過 `config` 屬性，您可以傳遞 Mermaid 的完整配置物件，實現更精細的控制：

js

```
{
    type: 'mermaid',
    field: 'advanced',
    props: {
        content: 'graph TD\n    A --> B',
        config: {
            startOnLoad: true,
            theme: 'dark',
            flowchart: {
                useMaxWidth: true,
                htmlLabels: true,
                curve: 'basis'
            },
            sequence: {
                diagramMarginX: 50,
                diagramMarginY: 10,
                actorMargin: 50
            },
            gantt: {
                leftPadding: 75,
                gridLineStartPadding: 35
            }
        }
    }
}
```