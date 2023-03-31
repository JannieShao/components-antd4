import React, { useRef } from 'react';
import { Button } from 'antd';
import { Form } from '@jannie-shao/components-antd4';

const App = () => {
  const compFormItemList = useRef();

  const handleSubmit = (data) => {
    console.log('form data:', data);
  };
  const handleAddListItem = () => {
    compFormItemList.current && compFormItemList.current.add();
  };
  return (
    <>
      <Button onClick={handleAddListItem}> + </Button>
      <Form
        layout="vertical"
        model={[
          {
            name: 'list',
            type: 'list',
            formProps: { ref: compFormItemList },
            props: { max: 3 },
            items: [
              {
                name: 'table',
                type: 'table',
                items: [
                  { label: 'Field1', name: 'f1', type: 'input' },
                  { label: 'Field2', name: 'f2', type: 'input' },
                ],
              },
            ],
          },
        ]}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default App;
