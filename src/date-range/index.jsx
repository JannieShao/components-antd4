import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'antd';
import moment from 'moment';

const DateRange = ({
  keys, value, onChange, maxDay, disabledDate, disabledStart, disabledEnd, ...props
}) => {
  const [dates, setDates] = useState([]);
  const [hackValue, setHackValue] = useState();
  const [val, setVal] = useState([]);
  const handleChange = (dateNow = ['', '']) => {
    const startDate = dateNow[0] ? moment(dateNow[0]).startOf('day').valueOf() : undefined;
    const endDate = dateNow[1] ? parseInt(moment(dateNow[1]).endOf('day').valueOf() / 1000, 10) * 1000 : undefined;
    setVal(dateNow);
    onChange({ [keys[0]]: startDate, [keys[1]]: endDate });
  };

  const handleDisabled = (current) => {
    if (disabledDate(current)) return true;

    if (!dates || dates.length === 0 || !maxDay) {
      return false;
    }

    const tooLate = dates[0] && (current.diff(dates[0], 'days') > maxDay || disabledEnd(current));
    const tooEarly = dates[1] && (dates[1].diff(current, 'days') > maxDay || disabledStart(current));
    return tooEarly || tooLate;
  };

  const onOpenChange = (open) => {
    if (open) {
      setHackValue([]);
      setDates([]);
    } else {
      setHackValue(undefined);
    }
  };

  useEffect(() => {
    if (!value) return;
    const startDate = value?.[keys[0]] ? moment(value[keys[0]]) : '';
    const endDate = value?.[keys[1]] ? moment(value[keys[1]]) : '';
    setVal([startDate, endDate]);
  }, [value, keys]);

  return (
    <DatePicker.RangePicker
      {...props}
      getPopupContainer={n => n.parentNode}
      value={hackValue || val}
      disabledDate={handleDisabled}
      onCalendarChange={v => setDates(v)}
      onChange={handleChange}
      onOpenChange={onOpenChange}
    />
  );
};

DateRange.propTypes = {
  keys: PropTypes.array,
  maxDay: PropTypes.number,
  disabledDate: PropTypes.func,
  disabledStart: PropTypes.func,
  disabledEnd: PropTypes.func,
};

DateRange.defaultProps = {
  keys: ['startTime', 'endTime'],
  maxDay: 0,
  disabledDate: () => false,
  disabledStart: () => false,
  disabledEnd: () => false,
};

export default DateRange;
