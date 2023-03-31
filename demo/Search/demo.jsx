import React, { useEffect, useRef, useState } from 'react';
import { Space, Button } from 'antd';
import { Search, PopForm } from '@jannie-shao/components-antd4';

const filter = [
  {
    name: 'seller',
    type: 'autoComplate',
    props: {
      allowClear: true,
      autoList: [
        {
          key: 'sellerId', label: 'Seller Id', rule: /^\d{1,}$/, forceType: 'number',
        },
        { key: 'shortCode', label: 'Short Code' },
      ],
    },
  },
  {
    name: 'period',
    keys: ['fromDate', 'toDate'],
    type: 'dateRange',
    props: { allowClear: false },
  },
];

const defaultFilter = {
  seller: { key: 'shortCode', value: 'PH123456' },
};

const columns = [
  { title: 'User', dataIndex: 'nick' },
  { title: 'Created', dataIndex: 'createTime' },
  { title: 'Process', dataIndex: 'process' },
];

const App = () => {
  const compList = useRef();
  const [layout, setLayout] = useState('horizontal');

const handleSearch = (filterNow) => new Promise((resolve) => {
    console.log(filterNow);
    setTimeout(() => {
      resolve({
        total: 50,
        list: [
          { nick: 'abc', createTime: '2023-03-30 10:22:00', process: 'running' },
          { nick: 'abcd', createTime: '2023-03-30 10:27:00', process: 'running' },
        ],
      });
    }, 2000);
  });
  useEffect(() => {
    if (!compList.current) return;
    compList.current.setFilter({ seller: { key: 'sellerId', value: '123' } });
    compList.current.handleSearch();
  }, [compList.current]);
  return (
    <>
      <Space>
        <Button onClick={() => setLayout('auto')}>Default</Button>
        <Button onClick={() => setLayout('horizontal')}>Horizontal</Button>
      </Space>
      <div>Use Layout : {layout}</div>
      <Search
        ref={compList}
        autoSearch={false}
        model={filter.concat(new Array(20).fill(1).map((_, idx) => ({
          name: `title_${idx}`,
          type: 'input',
          props: { placeholder: `File_${idx + 1}` },
        })))}
        defaultFilter={defaultFilter}
        columns={columns}
        searchBarProps={{
          layout,
          col: 3,
          row: 2,
        }}
        searchRetProps={{
          useLoading: true,
          topBar: (
            <Space>
              <PopForm
                model={[
                  {
                    name: 'name',
                    type: 'input',
                    formProps: {
                      label: 'Name',
                      rules: [{ required: true, message: 'Please input Name!', whitespace: true }],
                    },
                  },
                  {
                    name: 'description',
                    type: 'textarea',
                    formProps: {
                      label: 'Description',
                      rules: [{ required: true, message: 'Please input Description!', whitespace: true }],
                    },
                  },
                ]}
              >
                <Button type="primary">Add</Button>
              </PopForm>
              <Button danger>Del</Button>
              <Button onClick={() => console.log(compList.current && compList.current.getStore())}>Get Store</Button>
            </Space>
          ),
        }}
        onSearch={handleSearch}
      />
    </>
  );
};

export default App;
