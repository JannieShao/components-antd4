import React, {
  useImperativeHandle, forwardRef,
} from 'react';
import { cloneDeep } from 'lodash';
import { Button, Space } from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import IconFont from '../../../icon-font';
import { rootPrefix } from '../../../style/config';

const prefix = `${rootPrefix}-form-item`;

const Item = forwardRef((props, ref) => {
  const {
    eleCount, fields, operation, model, data, onChange, itemRender,
  } = props;
  const { add, remove } = operation;
  const { layout = 'vertical', max, disabled = false } = model.props || {};

  const handleAdd = (d = {}) => {
    if (disabled) return;
    if (max && eleCount.current >= max) return;
    add(d);
  };

  const handleUpdateFields = (idx, values = {}) => {
    if (disabled) return;
    const dataNow = cloneDeep(data);
    if (!dataNow[idx]) {
      dataNow[idx] = {};
    }
    Object.keys(values).forEach((key) => {
      dataNow[idx][key] = values[key];
    });
    onChange && onChange(dataNow);
  };

  const makeItems = ({ key, name, fieldKey }, idx) => {
    const recordInfo = {
      sn: key, record: data[idx] || {}, idx, dataSource: data,
    };
    const updateFields = values => handleUpdateFields(idx, values);
    // 获取子组件
    const items = Object.prototype.toString.call(model.items) === '[object Function]'
      ? model.items({ ...recordInfo, updateFields })
      : model.items;
    // 构造子组件
    return items.map((item) => {
      const itemNow = cloneDeep(item);
      itemNow.name = [name, item.name];
      itemNow.formProps = {
        ...(item.formProps || {}),
        name: [name, item.name],
        key: [key, item.name],
        fieldKey: [fieldKey, item.name],
      };
      // 获取子组件的 props 并改造属性，比如 onChange 事件
      itemNow.props = typeof itemNow.props === 'function' ? itemNow.props(recordInfo) : (itemNow.props || {});
      itemNow.props.disabled = disabled || itemNow.props.disabled;
      if (itemNow.props.onChange) {
        itemNow.props.onChange = (...arg) => item.props.onChange({
          ...recordInfo, updateFields,
        }, ...arg);
      }
      return itemRender([itemNow]);
    });
  };

  useImperativeHandle(ref, () => ({
    ...operation,
    add: handleAdd,
  }));
  return (fields || []).map((field, idx) => {
    const isLast = idx === data.length - 1 && !(max && data.length === max);
    const isOnly = idx === 0 && isLast;
    const canAdd = isLast && !disabled;
    const canRemove = !isOnly && !disabled;
    return (
      <div key={field.key} className={`${prefix}-list`} data-layout={layout}>
        {layout === 'inline' && (
          <Space className={`${prefix}-list-item`} align="baseline">
            {makeItems(field, idx)}
            {canRemove && <MinusCircleOutlined onClick={() => remove(idx)} />}
            {canAdd && <PlusCircleOutlined onClick={() => handleAdd()} />}
          </Space>
        )}
        {layout === 'vertical' && (
          <>
            <div className={`${prefix}-list-item`}>
              <div className={`${prefix}-list-item-fields`}>
                {makeItems(field, idx)}
              </div>
              <div className={`${prefix}-list-item-opts`}>
                {canRemove && <IconFont.Delete onClick={() => remove(idx)} />}
              </div>
            </div>
            {canAdd && (
              <div className={`${prefix}-list-item`}>
                <div className={`${prefix}-list-item-fields`}>
                  <Button type="dashed" onClick={() => handleAdd()} block icon={<PlusOutlined />}>
                    Add
                  </Button>
                </div>
                <div className={`${prefix}-list-item-opts`} />
              </div>
            )}
          </>
        )}
      </div>
    );
  });
});

export default Item;
