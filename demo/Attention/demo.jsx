import React from 'react';
import { Attention } from '@jannie-shao/components-antd4';

const list = ['第一条', <span style={{color:'red'}}>第二条</span>, '第三条'];

const App = () => (
  <Attention ul={list}>
    这是个 children
  </Attention>
);

export default App;
