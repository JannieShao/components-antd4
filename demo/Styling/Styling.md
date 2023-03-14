---
title: 基本用法
order: 1
---

### Styling
---
组件样式化

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Space } from 'antd';
import { Styling, Button } from '@smj/components-antd4';
import '../../src/style/chunk.less';

const App = () => (
  <div>
    <div style={{ paddingBottom: '12px' }}>
      <Space>
        <Styling type="txtPrimary">txtPrimary</Styling>
        <Styling type="txtSuccess">txtSuccess</Styling>
        <Styling type="txtWarning">txtWarning</Styling>
        <Styling type="txtDanger">txtDanger</Styling>
      </Space>
    </div>
    <div style={{ paddingBottom: '12px' }}>
      <Space>
        <Button type="success">Success</Button>
        <Button type="success" ghost>Success</Button>
        <Button type="success" disabled>Success</Button>
      </Space>
    </div>
    <div style={{ paddingBottom: '12px' }}>
      <Space>
        <Button type="warning">Warning</Button>
        <Button type="warning" ghost>Warning</Button>
        <Button type="warning" disabled>Warning</Button>
      </Space>
    </div>
    <div style={{ paddingBottom: '12px' }}>
      <Styling type="toInput">input style</Styling>
    </div>
  </div>
);

ReactDOM.render(<App />, mountNode);
```
