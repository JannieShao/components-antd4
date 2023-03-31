---
title: 一 Table
order: 53
---

### API

| 属性 | 说明 | 类型 | 默认 |
| -------- | -------- | -------- | -------- |
| disabled | 是否可编辑(当子组件使用非 render 方法构建时，会自动写子组件的 disabled 属性) | boolean | false |
| max | 最大数量(0 或 不配置为不限) | number | - |
| startIdx | 行序号计算开始值 | number | 0 |
| snConfig | 行序号配置(snKey: 行序号属性名，snLabel: 行序号展示名称) | object | { snKey: 'sn', snLabel: 'SN' } |
| showSN | 是否展示行序号 | boolean | true |
| useKeyAsSN | 是否使用行唯一标识作为行序号， 如果为 false，则展示的行序号会跟随行数变化；如果为 true，则行序号不会变化，且返回数据会包含行序号 | boolean | false |
| useOperation | 是否展示操作列 | boolean | true |
| checkOpt | 动态监测操作按钮是否可展示<br>type:<br>- 类型：String<br>- 可选值：add、remove<br>optConfig:<br>- 类型：Object<br>- 属性：record(行数据)、idx(行下标)、maxKey(当前最大行序号)、isLast(是否是最后一行)、isOnly(是否是唯一行) | (type, optConfig) => {return true/false;} | - |
| opRender | 自定义 operation | (optConfig, { add, remove}) => void | 0 |

### Interface

| 属性 | 说明 | 类型 |
| -------- | -------- | -------- |
| add | 增加表单项 | (defaultValue?:Object) => void |
| remove | 删除表单项 | (index: number \| number\[\]) => void |

### 演示代码

```jsx
 <DemoCode src="./demo-table.jsx" />
```
