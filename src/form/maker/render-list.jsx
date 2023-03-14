import React, {
  useImperativeHandle, forwardRef, useRef,
} from 'react';
import { Form } from 'antd';
import FormItemList from '../components/item-list/index';

const RenderList = forwardRef(({ model, itemRender, ...props }, ref) => {
  const compFormItemList = useRef();

  useImperativeHandle(ref, () => ({
    ...(compFormItemList.current || {}),
  }));
  return (
    <Form.Item {...props}>
      <FormItemList
        {...props}
        ref={compFormItemList}
        model={model}
        itemRender={itemRender}
      />
    </Form.Item>
  );
});

export default RenderList;
