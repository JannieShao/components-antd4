import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Select, message } from 'antd';
import BatchInputPopover from '../batch-input-popover';
import { rootPrefix } from '../style/config';
import { filterEmptyString } from '../utils';
import useBlockDefaultEnter from './hooks/useBlockDefaultEnter';

const MultiInput = ({
  className = '',
  value,
  max,
  isLimitShow,
  popoverProps,
  onChange,
  placeholder,
  disabled,
}) => {
  const [blockProps] = useBlockDefaultEnter();
  const handleChange = useCallback((v) => {
    if (v.length > max) {
      message.error(`Warning: You can only input up to ${max} values`);
    } else {
      onChange(filterEmptyString(v));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [max]);

  return (
    <div className={classnames(`${rootPrefix}-input-search`, className)}>
      <Select
        getPopupContainer={n => n.parentNode}
        mode="tags"
        maxTagCount={isLimitShow ? 'responsive' : false}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        style={{ width: '100%' }}
        onChange={handleChange}
        open={false}
        {...blockProps}
      />
      <BatchInputPopover
        {...popoverProps}
        visible={!disabled}
        max={max}
        value={value}
        onConfirm={handleChange}
      />
    </div>
  );
};

MultiInput.propTypes = {
  value: PropTypes.array,
  max: PropTypes.number,
  isLimitShow: PropTypes.bool,
  popoverProps: PropTypes.object,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

MultiInput.defaultProps = {
  value: [],
  max: 20,
  isLimitShow: true,
  popoverProps: {},
  onChange: () => {},
  placeholder: '',
  disabled: false,
};

export default MultiInput;
