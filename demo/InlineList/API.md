---
order: 2
# docGenIncludes:
---

### API

| 属性 | 说明 | 类型 | 默认 |
| -------- | -------- | -------- | -------- |
| className | 样式名 | string | - |
| col | 列数 | number | 2 |
| columns | 展示的列配置 | array | [] |
| columnsMore | 更多展示的列配置 | array | [] |
| dataSource | 展示的数据 | object | {} |

**columns**

| 属性 | 说明 | 类型 | 默认 |
| -------- | -------- | -------- | -------- |
| title | 展示的参数名 | string | - |
| dataIndex | 参数路径 | string | - |
| render | 格式化参数信息 | function | - |
| hideEmpty | 配置为空是不展示 | boolean | false |
| checkShow | 检测当前是否需要展示 | function | - |
