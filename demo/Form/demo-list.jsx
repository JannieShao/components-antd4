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
            props: { layout: listLayout },
            items: [
              { name: 'listItem1', type: 'input', props: { placeholder: 'List Field 1' } },
              { name: 'listItem2', type: 'input', props: { placeholder: 'List Field 2' } },
            ]
          },
        ]}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default App;
