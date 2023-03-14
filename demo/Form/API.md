---
order: 20
# docGenIncludes:
---

### API

| 属性 | 说明 | 类型 | 默认 |
| -------- | -------- | -------- | -------- |
| isLoading | 是否加载中 | boolean | false |
| layout | 表单布局，同 Antd Form layout 属性 | horizontal \| vertical \| inline | inline |
| col | 每行展示的 FormItem 数量，0 为自动计算。仅 layout 为 horizontal 有效 | number | -1 (不限) |
| row | 默认展示的最大行数，仅 layout 为 horizontal 有效 | number | 1 |
| perMaxWidth | FormItem 的最长宽度，仅 layout 为 horizontal 且 col 为 0 时有效 | number | 240 |
| initialCol | 默认每行展示的 FormItem 数量  | number | - |
| minCol | 每行展示的 FormItem 最少数量，仅 layout 为 horizontal 且 col 为 0 时有效 | number | 1 |
| model | 表单项配置，详见 model | array | - |
| btnGroup | 表单按钮 | array("submit" \| "resetSubmit" \| "reset" \| "cancel" \| \<node\>) | ['submit', 'cancel'] |
| onSubmit | 表单提交触发的事件 | function(values) | - |
| onReset | 表单重置触发的事件 | function() | - |
| onCancel | 表单取消触发的事件 | function() | - |

其他属性和 Antd 的 Form 一致。
