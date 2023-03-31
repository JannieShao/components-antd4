---
title: 一 List
order: 52
---

### API

| 属性 | 说明 | 类型 | 默认 |
| -------- | -------- | -------- | -------- |
| disabled | 是否可编辑(当子组件使用非 render 方法构建时，会自动写子组件的 disabled 属性) | boolean | false |
| max | 最大数量(0 或 不配置为不限) | number | - |
| layout | 行序号计算开始值 | vertical \| inline | vertical |

### Interface

| 属性 | 说明 | 类型 |
| -------- | -------- | -------- |
| add | 增加表单项 | (defaultValue?:Object) => void |
| remove | 删除表单项 | (index: number \| number\[\]) => void |

### 演示代码

```jsx
 <DemoCode src="./demo-list.jsx" />
```
