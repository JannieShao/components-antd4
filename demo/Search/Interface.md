---
order: 3
# docGenIncludes:
---

### Interface

| 属性 | 说明 |
| -------- | -------- |
| setFilter | 设置查询条件，同 Form.setFieldsValue |
| getFilter | 获取查询条件，同 Form.getFieldsValue |
| getStore | 获取查询数据，返回对象，包含属性：filter, page, total, list |
| autoSearch | 使用默认条件查询，(obj) => void |
| handleSearch | 查询，与点击查询按钮等效 |
| reload | 更新查询结果 |
| reset | 重置查询。autoSearch 为 true 时，重置查询表单并使用默认条件查询；为 false 时，只重置表单 |
| resetSubmit | 重置查询表单并使用默认条件查询 |
