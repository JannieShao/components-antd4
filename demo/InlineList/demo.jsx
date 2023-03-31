import React from 'react';
import { InlineList } from '@jannie-shao/components-antd4';

const App = () => (
  <InlineList
    col={3}
    columns={[
      { title: 'label1', dataIndex: 'val1' },
      { title: 'label2', dataIndex: 'val2', hideEmpty: true },
      { title: 'label3', dataIndex: 'val3', render: (_, record) => `[${record.val4}] ${_}` },
    ]}
    columnsMore={[
      { title: 'label4', dataIndex: 'val4' },
      { title: 'label5', dataIndex: 'val5' },
    ]}
    dataSource={{
      val1: 'test1', val2: '', val3: 'test3', val4: 'test4', val5: 'test5',
    }}
  />
);

export default App;
