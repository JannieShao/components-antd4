import React, {
  useImperativeHandle, forwardRef,
} from 'react';
import { cloneDeep } from 'lodash';
import { Button, Space } from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import IconFont from '../../../icon-font';
import { rootPrefix } from '../../../style/config';

const prefix = `${rootPrefix}-form-item`;

const Item = forwardRef(({
  fields, operation, model, data, itemRender,
}, ref) => {
  const { add, remove } = operation;
  const { layout = 'vertical' } = model.props || {};

  const makeItems = ({ key, name, fieldKey }) => model.items.map((item) => {
    const itemNow = cloneDeep(item);
    itemNow.name = [name, item.name];
    itemNow.formProps = {
      ...(item.formProps || {}),
      name: [name, item.name],
      key: [key, item.name],
      fieldKey: [fieldKey, item.name],
    };
    return itemRender([itemNow]);
  });

  useImperativeHandle(ref, () => ({
    ...operation,
  }));
  return (fields || []).map((field, idx) => {
    const isLast = idx === data.length - 1 && !(model.max && data.length === model.max);
    const isOnly = idx === 0 && isLast;
    return (
      <div key={field.key} className={`${prefix}-list`} data-layout={layout}>
        {layout === 'inline' && (
          <Space className={`${prefix}-list-item`} align="baseline">
            {makeItems(field)}
            {!isOnly && <MinusCircleOutlined onClick={() => remove(idx)} />}
            {isLast && <PlusCircleOutlined onClick={() => add()} />}
          </Space>
        )}
        {layout === 'vertical' && (
          <>
            <div className={`${prefix}-list-item`}>
              <div className={`${prefix}-list-item-fields`}>
                {makeItems(field)}
              </div>
              <div className={`${prefix}-list-item-opts`}>
                {!isOnly && <IconFont.Delete onClick={() => remove(idx)} />}
              </div>
            </div>
            {isLast && (
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add
              </Button>
            )}
          </>
        )}
      </div>
    );
  });
});

export default Item;
