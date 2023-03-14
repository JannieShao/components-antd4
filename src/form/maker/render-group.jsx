import React from 'react';
import { Form } from 'antd';
import { rootPrefix } from '../../style/config';

const prefix = `${rootPrefix}-form-item`;

const RenderGroup = ({ model, itemRender, ...props }) => (
  <Form.Item {...props}>
    <div className={`${prefix}-group`}>
      {itemRender(model.items || [])}
    </div>
  </Form.Item>
);

export default RenderGroup;
