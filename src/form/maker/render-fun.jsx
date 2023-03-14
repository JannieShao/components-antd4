import React from 'react';
import {
  Form, Input, InputNumber, Select, Radio, TimePicker, DatePicker,
} from 'antd';
import Layedit from '../../layedit';
import AutoComplete from '../../auto-complete';
import MultiInput from '../../multiInput';
import DateRange from '../../date-range';
import InputSelect from '../../input-select';

const itemConfig = {
  number: props => <InputNumber {...props} />,
  input: (props) => {
    if (props.maxLength === -1) {
      return <Input {...props} />;
    }
    return <Input maxLength={128} {...props} />;
  },
  layedit: props => <Layedit {...props} />,
  textarea: (props) => {
    if (props.maxLength === -1) {
      return <Input.TextArea {...props} />;
    }
    return <Input.TextArea maxLength={1000} {...props} />;
  },
  batchInput: props => <MultiInput {...props} />,
  datePicker: props => <DatePicker {...props} getPopupContainer={n => n.parentNode} />,
  dateRange: props => <DatePicker.RangePicker {...props} getPopupContainer={n => n.parentNode} />,
  timestampRange: props => <DateRange {...props} getPopupContainer={n => n.parentNode} />,
  timePicker: props => <TimePicker {...props} getPopupContainer={n => n.parentNode} />,
  timeRange: props => <TimePicker.RangePicker {...props} getPopupContainer={n => n.parentNode} />,
  select: props => <Select {...props} getPopupContainer={n => n.parentNode} />,
  inputSelect: props => <InputSelect {...props} getPopupContainer={n => n.parentNode} />,
  radio: props => <Radio.Group {...props} />,
  autoComplate: props => <AutoComplete {...props} getPopupContainer={n => n.parentNode} />,
};

export const makerFun = (m) => {
  const { type = '', render = '', props = {} } = m;
  if (!type && render) {
    if (typeof render === 'function' && !/[A-Z]/.test(render.name[0])) { // 组件
      return render({ ...props });
    }
    return render;
  }
  const func = itemConfig[type];
  if (func) return func(props);
  return '';
};

const RenderFun = ({ model, ...props }) => <Form.Item {...props}>{makerFun(model)}</Form.Item>;

export default RenderFun;
