import React, { useRef } from 'react';
import { Form } from '@smj/components-antd4';

const App = () => {
  const compForm1 = useRef();
  const handleSubmit = (data) => {
    console.log('form data:', data);
  };
  return (
    <Form
      ref={compForm1}
      layout="horizontal"
      model={[
        {
          name: 'title',
          type: 'input',
          formProps: {
            label: 'Title',
            rules: [{ required: true, message: 'Please input Title!', whitespace: true }],
          },
        },
        {
          name: 'user',
          type: 'autoComplate',
          formProps: { label: 'User' },
          props: {
            autoList: [
              { key: 'uId', label: 'User ID', ruleType: 'empId' },
              { key: 'uName', label: 'User Nick' },
            ],
          }
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
            {
              name: 'f2',
              type: 'inputSelect',
              formProps: { label: 'Group 1 Field 2' },
              props: {
                options: [
                  { label: 'f2 - opt 1', value: 'g1' },
                  { label: 'f2 - opt 2', value: 'g2' },
                ],
              }
            },
          ]
        },
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
      ]}
      onSubmit={handleSubmit}
    />
  );
};

export default App;
