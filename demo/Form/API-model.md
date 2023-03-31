---
title: model
order: 41
# docGenIncludes:
---

######

| 属性 | 说明 | 类型 |
| -------- | -------- | -------- |
| name | 字段名称 | string |
| type | 字段类型，内置了部分常用类型，详见 fieldType | string |
| formProps | 添加到 FormItem 的更多属性，常见 label、rules | object |
| props | 标签属性，比如 Select 的 options | object |
| items | 仅当 type 为 group / dependent 时有效 | array |
| dependencies | 依赖的更新字段，暂时只支持一个字段，后续计划支持多个字段，and / or 关系 | object |
| render | 暂未支持配置的类型，可以用 render函数创建节点 | function |
