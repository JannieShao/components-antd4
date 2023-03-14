import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AutoComplete } from 'antd';

const { Option } = AutoComplete;

// autoList: { key: 'sellerId', label: 'Seller Id', rule: /^[0-9]*$/, forceType: 'number' }
const _rule = {
  number: /^[0-9]*$/,
  empId: /^(([Ww][Bb])|\d)\d*$/,
};

const _funcForceType = {
  number: v => Number(v),
};

const CompAutoComplete = ({
  value, onChange, autoList, placeholder, getPopupContainer, ...props
}) => {
  const [valueNow, setValueNow] = useState('');
  const [list, setList] = useState([]);

  const initValue = (v) => {
    const labelStr = v.match(/^\[.{1,}\] /);
    if (!labelStr || labelStr.length === 0) return {};
    const label = labelStr[0].substring(1, labelStr[0].length - 2);
    const temp = autoList.filter(l => l.label === label)[0] || {};
    const key = temp?.key || label;
    const tempVal = v.substring(labelStr[0].length);
    const vNow = (tempVal && _funcForceType[temp.forceType]) ? _funcForceType[temp.forceType](tempVal) : tempVal;
    if (vNow) {
      return { key, value: vNow };
    }
    return {};
  };

  const handleSearch = (val = '') => {
    const v = (val || '').trim();
    if (/^\[.{1,}\]$/.test(v)) {
      setValueNow('');
      setList([]);
      return;
    }
    setValueNow(v);
    if (/^\[.{1,}\] /.test(v)) {
      setList([v]);
      return;
    }
    const labels = [];
    autoList.forEach((item) => {
      const label = item.label || item.key;
      const ruleTemp = item.rule || _rule[item.ruleType || item.forceType] || '';
      if (!ruleTemp || !val) {
        labels.push(label);
        return;
      }
      const reg = new RegExp(ruleTemp);
      if (reg.test(v)) {
        labels.push(label);
      }
    });
    setList(labels.map(l => `[${l}] ${v}`));
  };

  const handleChange = (val = '') => {
    if (!/^\[.{1,}\] /.test(val)) {
      setValueNow('');
      onChange({});
      return;
    }

    const v = initValue(val);
    const tempList = autoList.filter(l => l.key === v.key);
    if (tempList.length === 0 || !new RegExp(tempList[0]?.rule).test(v.value)) {
      setValueNow('');
      onChange({});
      return;
    }

    setValueNow(val);
    onChange(v);
  };

  useEffect(() => {
    if (!value || Object.prototype.toString.call(value) !== '[object Object]') return;
    if (!value.key) return;
    const v = `[${autoList.filter(l => l.key === value.key)[0]?.label || value.key}] ${value.value}`;
    setValueNow(v);
  }, [value, autoList]);

  return (
    <AutoComplete
      {...props}
      getPopupContainer={getPopupContainer}
      placeholder={placeholder || autoList.map(l => l.label || l.key).join(' / ')}
      onFocus={() => handleSearch(valueNow)}
      onSearch={handleSearch}
      onChange={handleChange}
      onBlur={() => handleChange(valueNow)}
      value={valueNow}
    >
      {list.map(l => (
        <Option key={l} value={l}>{l}</Option>
      ))}
    </AutoComplete>
  );
};

CompAutoComplete.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func,
  autoList: PropTypes.array,
  placeholder: PropTypes.string,
  getPopupContainer: PropTypes.any,
};

CompAutoComplete.defaultProps = {
  value: { key: '', value: '' },
  onChange: () => {},
  autoList: [],
  placeholder: '',
  getPopupContainer: n => n.parentNode,
};


export default CompAutoComplete;
