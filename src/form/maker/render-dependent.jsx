import React from 'react';
import { Form } from 'antd';

const RenderDependent = ({ model, itemRender, ...props }) => (
  <Form.Item
    {...props}
    noStyle
    shouldUpdate={(prevValues, currentValues) => (
      prevValues[model.dependencies.key] !== currentValues[model.dependencies.key]
    )}
  >
    {
      ({ getFieldValue }) => {
        const val = getFieldValue(model.dependencies.key);
        const mVal = model.dependencies.val;
        if (
          (Object.prototype.toString.call(mVal) === '[object Function]' && mVal(val))
          || (Array.isArray(mVal) && mVal.includes(val))
          || mVal === val
        ) {
          if (Object.prototype.toString.call(model.items) === '[object Function]') {
            return itemRender(model.items(val));
          }
          return itemRender(model.items || []);
        }
        return null;
      }
    }
  </Form.Item>
);

export default RenderDependent;
