---
order: 2
# docGenIncludes:
---

### API

| 属性 | 说明 | 类型 | 默认 |
| -------- | -------- | -------- | -------- |
| className | 样式名 | string | - |
| model | 筛选条件，form表单配置 | array | - |
| defaultFilter | 默认筛选项 | object | - |
| columns | 展示的列, 同 Table 的 columns | array | - |
| useSearchBar | 是否展示查询表单 | boolean | true |
| searchBarProps | 查询表单属性，详见 searchBarProps | object | - |
| searchRetProps | 查询表单属性，详见 searchRetProps | object | - |
| onFilterChange | 查询参数改变后的回调 | (changedKeys, allValues) => void | - |
| onSearch | 查询方法, 返回对象，包含 total(查询结果总数), list(查询结果集合) | ({ filter, page }) => object | - |
| autoSearch | 是否自动查询 | boolean | true |
| resetAutoSearch | reset 的时候是否自动查询（当且仅当 autoSearch 为 false 时有效）| boolean | false |

**searchBarProps**

| 属性 | 说明 | 类型 | 默认 |
| -------- | -------- | -------- | -------- |
| useLoading | 是否监听加载状态 | boolean | false |
| layout | 查询表单的 Layout | string | auto |
| btnGroup | 查询表单的按钮配置，同 Form 的 btnGroup | array | [{opType:'submit', btnText:'Search'},(autoSearch ? 'resetSubmit' : 'reset')] |

其他属性会自动添加到 Form 上


**searchRetProps**

| 属性 | 说明 | 类型 | 默认 |
| -------- | -------- | -------- | -------- |
| useLoading | 是否监听加载状态 | boolean | true |
| usePagination | 是否展示分页 | boolean | true |
| topBar | 表格上方展示的按钮等 | node | - |
| layout | 同 Table 的 Layout | string | auto |

其他属性会自动添加到 Table 上
