import React from 'react';
import { GridList } from '@smj/components-antd4';

const App = () => (
  <GridList
    col={3}
    columns={[
      { title: 'label1', dataIndex: 'val1' },
      { title: 'label2', dataIndex: 'val2' },
      { title: 'label3', dataIndex: 'val3' },
      { title: 'label4', dataIndex: 'val4' },
      { title: 'label5', dataIndex: 'val5', render: (_, record) => `[${record.val4}] ${_}` },
    ]}
    dataSource={{
      val1: 'test1', val2: 'test2', val3: 'test3', val4: 'test4', val5: 'test5',
    }}
  />
);

export default App;
