import React from 'react';
import { Form } from '@jannie-shao/components-antd4';

const App = () => (
  <Form
    layout="horizontal"
    model={new Array(20).fill(1).map((_, idx) => ({
      name: `title_${idx}`,
      type: 'input',
      formProps: { label: `File_${idx + 1}` },
    }))}
    col={0}
    row={3}
  />
);

export default App;
