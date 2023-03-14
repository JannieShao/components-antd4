import React, {
  useImperativeHandle, forwardRef, useEffect, useState, useRef,
} from 'react';
import { Form } from 'antd';
import Item from './Item';

const RenderList = forwardRef(({ model, itemRender, ...props }, ref) => {
  const { value } = props;
  const compListItem = useRef();

  const [data, setData] = useState([{}]);

  useEffect(() => {
    const val = value || [];
    if (val.length === 0) {
      props?.onChange && props?.onChange([{}]);
      return;
    }
    setData(value);
  }, [value]);

  useImperativeHandle(ref, () => ({
    ...(compListItem.current || {}),
  }));
  return (
    <Form.List {...props}>
      {(fields, operation) => (
        <Item
          ref={compListItem}
          fields={fields}
          operation={operation}
          model={model}
          data={data}
          itemRender={itemRender}
        />
      )}
    </Form.List>
  );
});
export default RenderList;
