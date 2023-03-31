import React, {
  useImperativeHandle, forwardRef, useEffect, useState, useRef,
} from 'react';
import { Form } from 'antd';
import Item from './Item';

const RenderList = forwardRef(({ model, itemRender, ...props }, ref) => {
  const { value } = props;
  const compListItem = useRef();
  // 用于透出 add 方法时，实现条数限制
  const eleCount = useRef(1);

  const [data, setData] = useState([{}]);

  useEffect(() => {
    const val = value || [];
    if (val.length === 0) {
      props?.onChange && props?.onChange([{}]);
      return;
    }
    setData(value);
    eleCount.current = value.length;
  }, [value]);

  useImperativeHandle(ref, () => ({
    ...(compListItem.current || {}),
  }));
  return (
    <Form.List {...props}>
      {(fields, operation) => (
        <Item
          ref={compListItem}
          eleCount={eleCount}
          fields={fields}
          operation={operation}
          model={model}
          data={data}
          onChange={props?.onChange}
          itemRender={itemRender}
        />
      )}
    </Form.List>
  );
});
export default RenderList;
