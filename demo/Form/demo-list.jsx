import React, { useState } from 'react';
import { Space, Button, Divider } from 'antd';
import { Form } from '@jannie-shao/components-antd4';

const App = () => {
  const [listLayout, setListLayout] = useState('inline');

  const handleSubmit = (data) => {
    console.log('form data:', data);
  };
  return (
    <>
      <Space>
        <Button
          type={listLayout === 'inline' ? 'primary' : 'default'}
          onClick={() => setListLayout('inline')}
        >
          Inline
        </Button>
        <Button
          type={listLayout === 'vertical' ? 'primary' : 'default'}
          onClick={() => setListLayout('vertical')}
        >
          Vertical
        </Button>
      </Space>
      <Divider />
      <Form
        layout="horizontal"
        model={[
          {
            name: 'list',
            type: 'list',
            formProps: { label: 'List' },
            props: { layout: listLayout, max: 5 },
            items: ({ sn, record, idx }) => [
              {
                name: 'listItem1',
                type: 'select',
                props: {
                  placeholder: 'List Field 1',
                  options: [
                    { label: 'f1-1', value: 1 },
                    { label: 'f1-2', value: 2 },
                  ],
                  onChange: ({ updateFields }, valNow) => {
                    updateFields({
                      listItem1: valNow,
                      listItem2: `Set by Field 1 with ${valNow}`,
                    });
                  },
                },
              },
              {
                name: 'listItem2',
                type: 'input',
                props: { placeholder: 'List Field 2' },
              },
              {
                name: 'listItem3',
                type: 'input',
                props: { placeholder: `SN: ${sn}; ListItem1: ${record.listItem1 || ''}; Line: ${idx + 1}` },
              },
            ]
          },
        ]}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default App;
