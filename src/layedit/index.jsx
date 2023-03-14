import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { throttle } from 'lodash';
import { Space } from 'antd';
import DropdownMenu from '../dropdown-menu';
import { rootPrefix } from '../style/config';
import {
  getValue, formatPlaceholder, formatVal, getNextLength, insertRange, pasteRange,
} from './util';

const prefix = `${rootPrefix}-layedit`;

const Layedit = ({
  className = '', value, onChange, disabled, placeholder, rows, barList, showCount, maxLength,
}) => {
  const compIframe = useRef();
  // 解决回调函数里无法监听 value 变化
  const valRef = useRef(value);
  const handleChange = throttle(() => {
    if (!compIframe.current) return;
    const iframeWin = compIframe.current.contentWindow;
    const valNew = getValue(iframeWin.document.body);
    if (valNew !== valRef.current) {
      onChange(valNew);
    }
  }, 200);
  const handleInsertEle = (key) => {
    if (disabled || !compIframe.current) return;
    const iframeWin = compIframe.current.contentWindow;
    iframeWin.document.body.focus();
    const val = `$\{${key}}`;
    // 剩余长度不足
    const len = getNextLength(valRef.current, maxLength);
    if (len !== -1 && len < val.length) return;
    insertRange(formatPlaceholder(val), iframeWin);
    handleChange();
  };
  useEffect(() => {
    valRef.current = value;
    if (!compIframe.current) return;
    const iframeWin = compIframe.current.contentWindow;
    if (value === '') {
      iframeWin.document.body.innerHTML = '';
      return;
    }
    const text = getValue(iframeWin.document.body);
    if (text !== value) {
      iframeWin.document.body.innerHTML = formatVal(value);
    }
  }, [value]);
  useEffect(() => {
    if (!compIframe.current) return;
    const iframeWin = compIframe.current.contentWindow;
    iframeWin.document.body.contentEditable = Boolean(!disabled);
  }, [disabled]);
  useEffect(() => {
    if (!compIframe.current) return;
    const iframeWin = compIframe.current.contentWindow;
    // 写入样式
    const style = iframeWin.document.createElement('style');
    style.innerHTML = `
    html, body { margin: 0; padding: 0; }
    body { padding: 6px 11px; font-size: 12px; color: rgba(0, 0, 0, 0.25); }
    body[contenteditable=true] { color: rgba(0, 0, 0, 0.85); -webkit-user-modify: read-write-plaintext-only; }
    body:empty::before { content:'${placeholder}'; color: #ccc; font-size:12px; }
    body label { color: #3543ff; }`;
    iframeWin.document.head.append(style);
    iframeWin.document.body.addEventListener('keydown', (e) => {
      // 忽略组合键
      if (e.ctrlKey || e.metaKey) return;
      const valueNow = getValue(iframeWin.document.body);
      // 长度限制
      if (maxLength && e.keyCode !== 8 && e.key.length === 1 && valueNow.length >= Number(maxLength)) {
        e.preventDefault();
      }
    });
    // 粘贴纯文本
    iframeWin.document.body.addEventListener('paste', (e) => {
      e.preventDefault();
      const valueNow = getValue(iframeWin.document.body);
      const len = getNextLength(valueNow, maxLength);
      if (len === 0) return;
      pasteRange(e, len, iframeWin);
      handleChange();
    });
    // 监听输入内容
    iframeWin.document.body.addEventListener('input', () => handleChange());
  }, []);
  return (
    <div className={classnames(prefix, className, { [`${prefix}-disabled`]: disabled })}>
      <div className={`${prefix}-bar`}>
        <Space>
          {barList.map(b => (
            <div key={b.name} className={`${prefix}-bar-item`}>
              {b.type === 'placeholder' && (
                <DropdownMenu
                  getPopupContainer={n => n.parentNode}
                  trigger="click"
                  menuItems={b.options}
                  onClick={handleInsertEle}
                >
                  <span>{b.name}</span>
                </DropdownMenu>
              )}
            </div>
          ))}
        </Space>
      </div>
      <div className={`${prefix}-value`}>
        <iframe
          ref={compIframe}
          title="layedit"
          style={{ height: rows * 32 }}
        />
      </div>
      {showCount && (
        <div className={`${prefix}-show-count`}>
          {value.length > maxLength && (
            <span className={`${prefix}-show-count-warning`}>{value.length}</span>
          )}
          {value.length <= maxLength && value.length}/{maxLength}
        </div>
      )}
    </div>
  );
};

Layedit.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  barList: PropTypes.array,
  showCount: PropTypes.bool,
  maxLength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Layedit.defaultProps = {
  value: '',
  onChange: () => {},
  disabled: false,
  placeholder: '',
  rows: 1,
  barList: [],
  showCount: false,
  maxLength: 0,
};

export default Layedit;
