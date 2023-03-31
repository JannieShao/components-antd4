import React from 'react';
import { Space, Alert } from 'antd';
import { PopForm } from '@jannie-shao/components-antd4';
const formItems = [
  {
    name: 'title',
    type: 'input',
    formProps: {
      label: 'Title',
      rules: [{ required: true, message: 'Please input Title!', whitespace: true }],
    },
  },
  {
    name: 'type',
    type: 'select',
    formProps: { label: 'Type' },
    props: {
      options: [
        { label: '第1组', value: 'g1' },
        { label: '第2组', value: 'g2' },
      ],
    }
  },
  {
    type: 'dependent',
    dependencies: { key: 'type', val: 'g1' },
    items: [
      { name: 'f1', type: 'input', formProps: { label: 'Group 1 Field 1' } },
      { name: 'f2', type: 'input', formProps: { label: 'Group 1 Field 2' } },
    ],
  },
  {
    type: 'dependent',
    dependencies: { key: 'type', val: 'g2' },
    items: [
      {
        name: 'nameList',
        type: 'batchInput',
        formProps: { label: 'Name List' },
      },
      {
        name: 'description',
        type: 'textarea',
        formProps: { label: 'Description' },
      },
    ],
  },
];

const App = () => {
  const handlePop = () => {
    console.log('before pop form');
  };
  const handleSubmit = (data) => {
    console.log('form data:', data);
  };
  return (
    <Space>
      <PopForm
        btnText="Pop Form"
        title="PopForm Title"
        addonBefore={<Alert message="Warning Text" type="warning" showIcon />}
        model={formItems}
        initialValues={{ type: 'g1' }}
        beforePop={handlePop}
        onSubmit={handleSubmit}
      />
      <PopForm
        title="PopForm Title"
        model={formItems}
        beforePop={handlePop}
        onSubmit={handleSubmit}
      >
        <a>PopForm</a>
      </PopForm>
    </Space>
  );
};

export default App;
