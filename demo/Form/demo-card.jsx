import React from 'react';
import { Form } from '@jannie-shao/components-antd4';

const App = () => (
  <Form
    layout="horizontal"
    model={[
      {
        key: 'card1',
        type: 'card',
        props: {
          title: 'Form Card 1',
        },
        items: [
          { name: 'card1_item1', type: 'input', formProps: { label: 'Item1' } },
          { name: 'card1_item2', type: 'input', formProps: { label: 'Item2' } },
        ],
      },
      {
        key: 'card2',
        type: 'card',
        props: {
          title: 'Form Card 2',
        },
        items: [
          { name: 'card2_item1', type: 'input', formProps: { label: 'Item1' } },
          { name: 'card2_item2', type: 'input', formProps: { label: 'Item2' } },
        ],
      }
    ]}
    onSubmit={d => console.log(d)}
  />
);

export default App;
