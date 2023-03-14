import React, { useRef, useEffect } from 'react';
import { Select, Button } from 'antd';
import { Form } from '@jannie-shao/components-antd4';

const App = () => {
  const compFormTable = useRef();
  const compFormItemTable = useRef();

  const handleSubmit = (data) => {
    console.log('form data:', data);
  };
  const handleAddTableItem = () => {
    compFormItemTable.current && compFormItemTable.current.add();
  };
  useEffect(() => {
    compFormTable.current.setFieldsValue({
      table: [
        {
          sn: 1, left: 1, opt: 1, right: 2,
        },
        { sn: 3, left: 2, opt: 2 },
      ],
    });
  }, []);
  return (
    <>
      <Button onClick={handleAddTableItem}> + </Button>
      <Form
        ref={compFormTable}
        layout="vertical"
        model={[
          {
            name: 'table',
            type: 'table',
            max: 3,
            startIdx: 1,
            showSN: true,
            useKeyAsSN: true,
            formProps: { ref: compFormItemTable },
            items: [
              {
                name: 'left',
                type: 'select',
                label: 'Left',
                props: {
                  options: [
                    { value: 1, label: 'field_1' },
                    { value: 2, label: 'field_2' },
                  ],
                  onChange: ({ updateFields }, v, ...arg) => {
                    updateFields({ left: v, opt: undefined });
                    console.log(arg);
                  },
                },
              },
              {
                name: 'opt',
                label: 'Opt',
                render: ({ record }) => (
                  <Select options={record.left === 1
                    ? [{ value: 1, label: '=' }, { value: 2, label: 'null' }]
                    : [{ value: 2, label: 'null' }]}
                  />
                ),
              },
              { name: 'right', type: 'input', label: 'Right' },
            ]
          },
        ]}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default App;
