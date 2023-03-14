---
title: btnGroup
order: 23
# docGenIncludes:
---

######

[ string / object ]

string: 按钮操作类型，详见 opType

object:

| 属性 | 说明 | 类型 | 默认 |
| -------- | -------- | -------- | -------- |
| opType | 操作类型，详见 opType | string | - |
| type | 按钮类型 | string | 不同 opType 默认不同，比如 submit 默认 primary |
| btnText | 按钮文案 | string | 不同 opType 默认不同，比如 submit 默认 submit |
| render | 自定义按钮，当 opType 存在时无效 | node | - |

