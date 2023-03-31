---
order: 2
# docGenIncludes:
---

### API

| 属性 | 说明 | 类型 | 默认 |
| -------- | -------- | -------- | -------- |
| btnText | 默认子组件按钮文案 | string | Create |
| useChildren | 是否使用子组件控制弹窗展示，若为 false，可在需要时调用 interface：handleShowForm | bool | true |
| title | 弹窗标题 | string | New |
| addonBefore | 表单前插入节点 | node | - |
| model | 表单项配置，详见 Form model | array | - |
| initialValues | 表单默认数据 | object | - |
| values | 表单数据 | object | - |
| btnGroup | 表单按钮 | array("submit" \| "resetSubmit" \| "reset" \| "cancel" \| \<node\>) | [{ opType: 'submit', btnText: 'Ok' }, 'cancel'] |
| formProps | 额外的表单属性 | object | - |
| beforePop | 弹窗展示前调用的方法 | function | - |
| afterPopSubmit | 弹窗表单提交后调用的方法 | () => void | - |
| afterClose | 弹窗关闭后调用的方法 | () => void | - |
| onSubmit | 表单提交触发的事件 | (values) => void | - |
