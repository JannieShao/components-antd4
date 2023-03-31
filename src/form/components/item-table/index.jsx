import React, {
  useImperativeHandle, forwardRef, useEffect, useMemo, useRef, useState,
} from 'react';
import { max } from 'lodash';
import { Form } from 'antd';
import Item from './Item';

const FormItemTable = forwardRef(({ model, ...props }, ref) => {
  const { value } = props;
  const {
    startIdx = 0, showSN = true, useKeyAsSN = false, snConfig = {},
  } = model.props || {};
  const { snKey = 'sn' } = snConfig;

  const compItem = useRef();
  const defaultKey = useMemo(() => (startIdx || 0), [startIdx]);
  const defaultData = useMemo(() => (
    (showSN && useKeyAsSN) ? [{ [snKey]: defaultKey }] : [{}]
  ), [showSN, useKeyAsSN, defaultKey]);

  const [maxKey, setMaxKey] = useState(defaultKey);
  const [data, setData] = useState(defaultData);
  // 用于透出 add 方法时，实现条数限制
  const eleCount = useRef(1);

  useEffect(() => {
    const val = value || [];
    if (val.length === 0) {
      props?.onChange && props.onChange(defaultData);
      return;
    }
    const unFillValLen = val.filter(v => v?.[snKey] === undefined).length;
    const fillValSN = val.filter(v => v?.[snKey] !== undefined).map(v => v[snKey]);
    let maxSN = maxKey.current;
    if (unFillValLen === 0 && fillValSN.length === 0) {
      maxSN = defaultKey;
    } else if (fillValSN.length === 0) {
      maxSN = defaultKey + unFillValLen - 1;
    } else {
      maxSN = max(fillValSN) + unFillValLen;
    }
    setMaxKey(maxSN);
    setData(value);
    eleCount.current = value.length;
  }, [value]);

  useImperativeHandle(ref, () => ({
    ...(compItem.current || {}),
  }));
  return (
    <Form.List {...props}>
      {(_, operation) => (
        <Item
          ref={compItem}
          maxKey={maxKey}
          eleCount={eleCount}
          operation={operation}
          model={model}
          data={data}
          onChange={props?.onChange}
        />
      )}
    </Form.List>
  );
});

export default FormItemTable;
