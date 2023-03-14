import React, {
  useImperativeHandle, forwardRef, useRef,
} from 'react';
import { Form } from 'antd';
import FormItemTable from '../components/item-table/index';

const RenderTable = forwardRef(({ model, itemRender, ...props }, ref) => {
  const compFormItemTable = useRef();

  useImperativeHandle(ref, () => ({
    ...(compFormItemTable.current || {}),
  }));
  return (
    <Form.Item {...props}>
      <FormItemTable
        {...props}
        ref={compFormItemTable}
        model={model}
      />
    </Form.Item>
  );
});

export default RenderTable;
