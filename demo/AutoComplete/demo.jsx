import React, { useState } from 'react';
import { Space } from 'antd';
import { AutoComplete } from '@jannie-shao/components-antd4';

const autoList = [
  { key: 'empId', label: 'EmpId', ruleType: 'empId' },
  { key: 'nick', label: 'Name' },
  {
    key: 'cardId', label: 'CardId', rule: /^[1-9]\d*$/, forceType: 'number',
  },
];

const App = () => {
  const [valueNow, setValueNow] = useState({});
  const onChange = (v) => {
    setValueNow(v);
  };
  return (
    <Space>
      <AutoComplete
        getPopupContainer={false}
        style={{ width: 300 }}
        autoList={autoList}
        onChange={onChange}
      />
      <span>{JSON.stringify(valueNow)}</span>
    </Space>
  );
};

export default App;
