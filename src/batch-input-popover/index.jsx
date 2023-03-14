import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import uniq from 'lodash/uniq';
import {
  Input, Popover, Button, message,
} from 'antd';
import IconFont from '../icon-font';
import { rootPrefix } from '../style/config';
import { filterEmptyString } from '../utils';

const { TextArea } = Input;
const prefix = `${rootPrefix}-batch-input`;

function BatchInputPopover({
  className = '',
  visible,
  max,
  popoverTitle,
  popoverPlaceholder,
  value,
  onConfirm,
  currentOptions,
}) {
  const [popVisible, setPopVisible] = useState(false);
  const [batchValue, setBatchValue] = useState('');

  const fillBatchInput = (v) => {
    let labels;
    if (currentOptions.length > 0) {
      labels = v.map(i => currentOptions.find(o => o.value === i).label);
    } else {
      labels = v;
    }
    setBatchValue(labels.join('\n'));
  };

  const handleConfirmBatchInput = () => {
    const splited = filterEmptyString(batchValue.split('\n'));
    const uniqed = uniq(splited);

    if (uniqed.length > max) {
      message.error(`Warning: You can only input up to ${max} values`);
    } else {
      setPopVisible(false);
      onConfirm(uniqed);
    }
  };

  const handleCancelBatchInput = () => {
    setPopVisible(false);
  };

  const handleBatchInputChange = e => setBatchValue(e.target.value);

  const handlePopVisibleChange = (v) => {
    setPopVisible(v);
    if (v) {
      fillBatchInput(value);
    }
  };

  return (
    <div
      className={classnames(prefix, className)}
      style={!visible ? { display: 'none' } : {}}
    >
      <Popover
        getPopupContainer={n => n.parentNode}
        content={(
          <div className={`${prefix}-popover-card`}>
            <TextArea
              placeholder={popoverPlaceholder}
              onChange={handleBatchInputChange}
              autoSize={{ minRows: 12, maxRows: 12 }}
              value={batchValue}
            />
            <Button onClick={handleConfirmBatchInput} type="primary">OK</Button>
            <Button onClick={handleCancelBatchInput}>Cancel</Button>
          </div>
        )}
        title={popoverTitle}
        placement="topRight"
        trigger="click"
        open={popVisible}
        onOpenChange={handlePopVisibleChange}
      >
        <IconFont.FileAdd className={`${prefix}-icon`} />
      </Popover>
    </div>
  );
}

BatchInputPopover.propTypes = {
  visible: PropTypes.bool,
  max: PropTypes.number,
  popoverTitle: PropTypes.string,
  popoverPlaceholder: PropTypes.string,
  value: PropTypes.array.isRequired,
  onConfirm: PropTypes.func,
  currentOptions: PropTypes.array,
};

BatchInputPopover.defaultProps = {
  visible: false,
  max: 20,
  popoverTitle: 'Batch Input',
  popoverPlaceholder: 'one each line, up to 20',
  onConfirm: () => {},
  currentOptions: [],
};

export default BatchInputPopover;
