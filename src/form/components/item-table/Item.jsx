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
  const { add, remove } = operation;

  const handleAdd = (d = {}) => {
    if (model.max && eleCount.current >= model.max) return;
    const defaultData = model.useKeyAsSN ? { sn: maxKey + 1 } : {};
    const dataToAdd = { ...d, ...defaultData };
    add(dataToAdd);
  };

  const handleUpdateFields = (idx, values = {}) => {
    const dataNow = cloneDeep(data);
    if (!dataNow[idx]) return;
    Object.keys(values).forEach((key) => {
      dataNow[idx][key] = values[key];
    });
    onChange && onChange(dataNow);
  };

  useImperativeHandle(ref, () => ({
    ...operation,
    add: (d = {}) => {
      if (model.max && eleCount.current >= model.max) return;
      add(d);
    },
  }));
  return (
    <div className={`${prefix}-table`}>
      <Table
        pagination={false}
        dataSource={data.map((d, idx) => ({ ...d, __rowKey__: `row:${d.sn}:${idx}` }))}
        rowKey="__rowKey__"
        columns={[].concat(model.showSN ? [
          {
            title: 'SN',
            dataIndex: 'sn',
            width: 62,
            render: (_, record = {}, idx) => {
              if (!model.useKeyAsSN) {
                return model.startIdx + idx;
              }
              return (
                <Form.Item
                  key={[idx, 'sn']}
                  name={[idx, 'sn']}
                  fieldKey={[idx, 'sn']}
                  initialValue={record.sn === undefined ? maxKey : record.sn}
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
              const { sn = idx } = record;
              const itemNow = cloneDeep(item);
              if (itemNow.props?.onChange) {
                itemNow.props.onChange = (...arg) => item.props.onChange({
                  idx, sn, updateFields: values => handleUpdateFields(idx, values),
                }, ...arg);
              }
              return (
                <Form.Item
                  {...(item.formProps || {})}
                  key={[idx, item.name]}
                  name={[idx, item.name]}
                  fieldKey={[idx, item.name]}
                >
                  {typeof item.render === 'function' ? item.render({ sn, record, idx }) : makerFun(itemNow)}
                </Form.Item>
              );
            },
          };
        }), [
          {
            title: 'Operation',
            dataIndex: '__OPERATION',
            render: (_, record = {}, idx) => {
              const isLast = idx === data.length - 1 && !(model.max && data.length >= model.max);
              const isOnly = idx === 0 && isLast;
              const opRender = model.opRender
                ? model.opRender({
                  record, idx, maxKey, isLast, isOnly,
                }, { add: handleAdd, remove }) : null;
              if (opRender) return opRender;
              const opts = [];
              if (!isOnly) {
                opts.push((
                  <IconFont.Delete
                    key="remove"
                    onClick={() => remove(idx)}
                    className={`${prefix}-table-operation`}
                  />
                ));
              }
              if (isLast) {
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
        ])}
      />
    </div>
  );
});

export default Item;
