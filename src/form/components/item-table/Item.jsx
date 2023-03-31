import React, {
  useImperativeHandle, forwardRef,
} from 'react';
import { cloneDeep } from 'lodash';
import { Form, Input } from 'antd';
import { PlusSquareOutlined } from '@ant-design/icons';
import Table from '../../../table';
import IconFont from '../../../icon-font';
import { rootPrefix } from '../../../style/config';
import { makerFun } from '../../maker/render-fun';

const prefix = `${rootPrefix}-form-item`;

const Item = forwardRef((props, ref) => {
  const {
    maxKey, eleCount, operation, model, data, onChange,
  } = props;
  const {
    disabled = false, max, startIdx = 0, snConfig = {},
    showSN = true, useKeyAsSN = false, useOperation = true,
    opRender, checkOpt = (() => true),
  } = model.props || {};
  const { snKey = 'sn', snLabel = 'SN' } = snConfig;
  const { add, remove } = operation;

  const getDefaultSN = (record = {}) => (record[snKey] === undefined ? maxKey : record[snKey]);

  const handleAdd = (d = {}) => {
    if (disabled) return;
    if (max && eleCount.current >= max) return;
    const defaultData = useKeyAsSN ? { [snKey]: maxKey + 1 } : {};
    const dataToAdd = { ...d, ...defaultData };
    add(dataToAdd);
  };

  const handleRemove = (idx) => {
    remove(idx);
    if (eleCount.current < 1) {
      handleAdd();
    }
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

  useImperativeHandle(ref, () => ({
    ...operation,
    add: (d = {}) => {
      if (disabled) return;
      if (max && eleCount.current >= max) return;
      add(d);
    },
    remove: handleRemove,
  }));
  return (
    <div className={`${prefix}-table`}>
      <Table
        pagination={false}
        dataSource={data.map((d, idx) => ({ ...d, __rowKey__: `row:${d[snKey]}:${idx}` }))}
        rowKey="__rowKey__"
        columns={[].concat(showSN ? [
          {
            title: snLabel,
            dataIndex: snKey,
            width: 62,
            render: (_, record = {}, idx) => {
              if (!useKeyAsSN) {
                return startIdx + idx;
              }
              return (
                <Form.Item
                  key={[idx, snKey]}
                  name={[idx, snKey]}
                  fieldKey={[idx, snKey]}
                  initialValue={getDefaultSN(record)}
                >
                  <Input bordered={false} style={{ color: 'rgba(0, 0, 0, 0.85)', cursor: 'default' }} disabled />
                </Form.Item>
              );
            },
          },
        ] : [], model.items.map((item) => {
          const label = typeof item === 'string' ? item : item.label;
          return {
            title: label,
            dataIndex: item.name,
            render: (_, record = {}, idx) => {
              const sn = getDefaultSN(record);
              const recordInfo = {
                sn, record, idx, dataSource: data,
              };
              const updateFields = values => handleUpdateFields(idx, values);
              // 构造子组件
              const itemNow = cloneDeep(item);
              // 获取子组件的 props 并改造 onChange 事件
              itemNow.props = typeof itemNow.props === 'function' ? itemNow.props(recordInfo) : (itemNow.props || {});
              itemNow.props.disabled = disabled || itemNow.props.disabled;
              if (itemNow.props.onChange) {
                itemNow.props.onChange = (...arg) => item.props.onChange({
                  ...recordInfo, updateFields,
                }, ...arg);
              }
              return (
                <Form.Item
                  {...(item.formProps || {})}
                  key={[idx, item.name]}
                  name={[idx, item.name]}
                  fieldKey={[idx, item.name]}
                >
                  {typeof item.render === 'function' ? item.render({ ...recordInfo, updateFields }) : makerFun(itemNow)}
                </Form.Item>
              );
            },
          };
        }), useOperation ? [
          {
            title: 'Operation',
            dataIndex: '__OPERATION',
            render: (_, record = {}, idx) => {
              if (disabled) return <></>;
              const isLast = idx === data.length - 1 && !(max && data.length >= max);
              const isOnly = idx === 0 && isLast;
              const optConfig = {
                record, idx, maxKey, isLast, isOnly,
              };
              const render = opRender
                ? opRender(optConfig, { add: handleAdd, remove: handleRemove }) : null;
              if (render) return render;
              const opts = [];
              if (!isOnly && checkOpt({ type: 'remove', optConfig })) {
                opts.push((
                  <IconFont.Delete
                    key="remove"
                    onClick={() => handleRemove(idx)}
                    className={`${prefix}-table-operation`}
                  />
                ));
              }
              if (isLast && checkOpt({ type: 'add', optConfig })) {
                opts.push((
                  <PlusSquareOutlined
                    key="add"
                    onClick={() => handleAdd()}
                    className={`${prefix}-table-operation`}
                  />
                ));
              }
              return opts;
            },
          },
        ] : [])}
      />
    </div>
  );
});

export default Item;
