import React, { useEffect, useState } from 'react';
import { Select } from 'antd';

const check = (type = 'equal', a = '', b = '', force = false) => {
  const aNow = force ? a : a.toLowerCase();
  const bNow = force ? b : b.toLowerCase();
  if (type === 'in') {
    return aNow.indexOf(bNow) >= 0;
  }
  return a.toLowerCase() === b.toLowerCase();
};

const InputSelect = ({
  options = [], forceMatch = false, ...props
}) => {
  const [optionsNow, setOptionsNow] = useState([]);

  const handleSearch = (v) => {
    const flag = v ? options.filter(o => check('equal', o.label, v, forceMatch)).length === 0 : false;
    setOptionsNow(flag ? [{ label: v, value: v }].concat(options) : options);
  };

  useEffect(() => {
    setOptionsNow(options || []);
  }, [options]);
  return (
    <Select
      {...props}
      options={optionsNow}
      showSearch
      filterOption={(input, option) => check('in', option.label, input, forceMatch)}
      onSearch={handleSearch}
    />
  );
};

export default InputSelect;
