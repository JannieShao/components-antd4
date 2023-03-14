import React, {
  useImperativeHandle, forwardRef, useEffect, useState, useMemo, useRef,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { debounce } from 'lodash';
import { Form, Space, Button } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { rootPrefix } from '../style/config';

import { filterEmptyObj } from '../utils';
import { SPEC_ITEM_KV, SPEC_ITEM_OBJ, GRID_GAP } from './const';
import maker, { getRealCol } from './maker/index';

const prefix = `${rootPrefix}-form`;

const CompForm = forwardRef(({
  className, isLoading,
  layout, col, row, perMaxWidth, initialCol, minCol,
  model, btnGroup,
  onChange, onSubmit, onReset, onCancel,
  onValuesChange, ...more
}, ref) => {
  const [form] = Form.useForm();
  const compForm = useRef();
  const [itemObj, setItemObj] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [realCol, setRealCol] = useState(col || initialCol || getRealCol(compForm?.current, perMaxWidth, minCol));
  const ifUseHideShow = useMemo(() => (layout === 'horizontal' && col > -1 && row > 0), [layout, col, row]);
  const ifShowMoreA = useMemo(() => (
    ifUseHideShow && realCol * row <= model.length
  ), [ifUseHideShow, realCol, row, model]);
  const customStyle = useMemo(() => {
    if (!ifUseHideShow) return {};
    const c = Number(realCol);
    const spaceWidth = (c - 1) * GRID_GAP;
    return {
      gridTemplateColumns: `repeat(${realCol}, calc(calc(100% - ${spaceWidth}px) / ${c})`,
    };
  }, [ifUseHideShow, realCol]);

  const formatFields = (formData) => {
    const dataNow = filterEmptyObj(formData) || {};
    let dataCall = {};
    Object.keys(dataNow).forEach((k) => {
      const v = dataNow[k];
      const temp = itemObj.filter(i => i.name === k)[0] || {};
      if (temp.type === 'KV' && Object.prototype.toString.call(v) === '[object Object]') {
        dataCall[v.key || k] = v.value || v;
      } else if (temp.type === 'OBJ' && Object.prototype.toString.call(v) === '[object Object]') {
        dataCall = { ...dataCall, ...v };
      } else {
        dataCall[k] = v;
      }
    });
    return filterEmptyObj(dataCall) || {};
  };
  const handleValueChange = (changed = {}, all = {}) => {
    onValuesChange(changed, all);
    // 字段值更新，格式化数据
    const keysChanged = Object.keys(changed);
    const valueAll = formatFields(all);
    onChange(keysChanged, valueAll);
  };
  const doSubmit = () => setTimeout(() => form.submit());
  const handleSubmit = (formData = {}) => {
    onSubmit(formatFields(formData));
  };
  const handleResetSubmit = () => {
    form.resetFields();
    doSubmit();
  };
  const handleReset = () => {
    form.resetFields();
    onReset();
  };
  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };
  const doGetRealCol = debounce(() => {
    setRealCol(getRealCol(compForm?.current, perMaxWidth, minCol));
  }, 300);
  useEffect(() => {
    const temp = [];
    model.forEach((m) => {
      if (SPEC_ITEM_KV.includes(m.type)) {
        temp.push({ name: m.name, type: 'KV' });
      } else if (SPEC_ITEM_OBJ.includes(m.type)) {
        temp.push({ name: m.name, type: 'OBJ' });
      }
    });
    setItemObj(temp);
  }, [model]);
  useEffect(() => {
    if (layout === 'horizontal' && col === 0) {
      doGetRealCol();
      window.addEventListener('resize', doGetRealCol);
      return () => {
        window.removeEventListener('resize', doGetRealCol);
      };
    }
    return () => {};
  }, []);
  useImperativeHandle(ref, () => ({
    ...form,
    getFieldsValue: keys => formatFields(form.getFieldsValue(keys)),
    handleSubmit: () => doSubmit(),
    handleReset,
    handleResetSubmit,
  }));
  return (
    <div className={`${prefix}-parent`} ref={compForm}>
      <Form
        {...more}
        className={classnames(prefix, className, {
          [`${prefix}-grid`]: ifUseHideShow,
          [`${prefix}-grid-hide-${realCol * row}`]: (ifUseHideShow && !showMore),
        })}
        form={form}
        layout={layout}
        onFinish={handleSubmit}
        scrollToFirstError
        onValuesChange={handleValueChange}
        style={{ ...(more.style || {}), ...customStyle }}
      >
        {maker(model)}
        {btnGroup.length > 0 && (
          <Form.Item
            className={`${prefix}-actions`}
            style={ifUseHideShow ? {
              gridColumnStart: realCol,
            } : {}}
            label={layout === 'horizontal' ? ' ' : ''}
            colon={false}
          >
            <div className={`${prefix}-actions-content`}>
              {ifShowMoreA && (
                <a onClick={() => setShowMore(!showMore)}>
                  <Space size={5}>
                    {showMore ? (
                      <>
                        <span>Collapse</span>
                        <UpOutlined />
                      </>
                    ) : (
                      <>
                        <span>Expand</span>
                        <DownOutlined />
                      </>
                    )}
                  </Space>
                </a>
              )}
              <div className={`${prefix}-btns`}>
                {
                  btnGroup.map((btn) => {
                    const b = typeof btn === 'string' ? { opType: btn } : btn;
                    if (b.opType === 'submit') {
                      return <Button key="submit" type={b.type || 'primary'} htmlType="submit" loading={isLoading}>{b.btnText || 'Submit'}</Button>;
                    }
                    if (b.opType === 'resetSubmit') {
                      return <Button key="resetSubmit" type={b.type || 'link'} onClick={handleResetSubmit} loading={isLoading}>{b.btnText || 'Reset'}</Button>;
                    }
                    if (b.opType === 'reset') {
                      return <Button key="reset" type={b.type || 'link'} onClick={handleReset} loading={isLoading}>{b.btnText || 'Reset'}</Button>;
                    }
                    if (b.opType === 'cancel') {
                      return <Button key="cancel" type={b.type || 'default'} onClick={handleCancel} disabled={isLoading}>{b.btnText || 'Cancel'}</Button>;
                    }
                    if (b.render && typeof b.render === 'function' && !/[A-Z]/.test(b.render.name[0])) {
                      return b.render({ loading: isLoading });
                    }
                    return '';
                  })
                }
              </div>
            </div>
          </Form.Item>
        )}
      </Form>
    </div>
  );
});

CompForm.propTypes = {
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  layout: PropTypes.string,
  col: PropTypes.number,
  row: PropTypes.number,
  perMaxWidth: PropTypes.number,
  initialCol: PropTypes.number,
  minCol: PropTypes.number,
  model: PropTypes.array,
  btnGroup: PropTypes.array,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  onCancel: PropTypes.func,
  onValuesChange: PropTypes.func,
};

CompForm.defaultProps = {
  className: '',
  isLoading: false,
  layout: 'inline',
  col: -1,
  row: 1,
  perMaxWidth: 240,
  initialCol: 0,
  minCol: 1,
  model: [],
  btnGroup: ['submit', 'cancel'],
  onChange: () => {},
  onSubmit: () => {},
  onReset: () => {},
  onCancel: () => {},
  onValuesChange: () => {},
};

export default CompForm;
