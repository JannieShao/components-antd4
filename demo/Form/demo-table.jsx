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
          no: 1, left: 1, opt: 1, right: 2,
        },
        { no: 3, left: 2, opt: 2 },
      ],
    });
  }, []);
  return (
    <>
      <Button onClick={handleAddTableItem}> Add </Button>
      <Form
        ref={compFormTable}
        layout="vertical"
        model={[
          {
            name: 'table',
            type: 'table',
            formProps: { ref: compFormItemTable },
            props: {
              max: 5,
              startIdx: 1,
              showSN: true,
              useKeyAsSN: true,
              useOperation: true,
              snConfig: {
                snKey: 'no',
                snLabel: 'No',
              },
              checkOpt: ({ type, optConfig }) => {
                const {
                  record, idx, maxKey, isLast, isOnly,
                } = optConfig;
                if (record.no === maxKey - 1) return false;
                if (type === 'remove' && idx === 0) return false;
                if (type === 'add' && (isLast || isOnly)) return true;
                return true;
              },
            },
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
              {
                name: 'right',
                type: 'input',
                label: 'Right',
                props: ({ sn, record, idx }) => ({
                  placeholder: `No: ${sn}; Left: ${record.left || ''}; Line: ${idx + 1}`,
                }),
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
