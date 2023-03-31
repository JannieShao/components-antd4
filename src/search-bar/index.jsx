import React, {
  useImperativeHandle, forwardRef, useEffect, useRef, useState,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { merge } from 'lodash';
import { Card } from 'antd';
import Form from '../form';
import { rootPrefix } from '../style/config';
import { timestamp } from '../utils';

const prefix = `${rootPrefix}-search-bar`;

const SearchBar = forwardRef(({
  className = '', isLoading, model, defaultFilter,
  layout, btnGroup,
  onFilterChange, onSearch, autoSearch, resetAutoSearch,
  ...formProps
}, ref) => {
  const compSearchForm = useRef();
  const [modelNow, setModelNow] = useState([]);
  const [dateRange, setDateRange] = useState([]);

  const initFilter = (formData) => {
    const filter = { ...formData };
    if (dateRange.length > 0) {
      dateRange.forEach((d) => {
        if (formData[d.name]) {
          formData[d.name][0] && (filter[d.keys[0]] = timestamp(formData[d.name][0], 'startOfDay'));
          formData[d.name][1] && (filter[d.keys[1]] = timestamp(formData[d.name][1], 'endOfDay'));
          delete filter[d.name];
        }
      });
    }
    return filter;
  };

  const handleFilterChange = (changedKeys, all) => {
    const filterAll = initFilter(all);
    onFilterChange(changedKeys, filterAll);
  };

  const handleSearch = (formData = {}) => {
    onSearch(initFilter(formData), 1);
  };

  useEffect(() => {
    const tempDateRange = [];
    setModelNow(model.map((m) => {
      if (m.type === 'dateRange') {
        if (m.keys) {
          tempDateRange.push({ name: m.name, keys: m.keys });
        }
        const mNew = { formProps: { className: `${rootPrefix}-search-bar-fix` } };
        return merge(mNew, m);
      }
      return m;
    }));
    setDateRange(tempDateRange);
  }, [model]);

  useEffect(() => {
    autoSearch && compSearchForm.current && compSearchForm.current.handleSubmit();
  }, [autoSearch]);
  useImperativeHandle(ref, () => ({ ...(compSearchForm.current || {}) }));
  return (
    <Card className={classnames(prefix, className, { [`${prefix}-flex`]: layout === 'flex' })}>
      <div className={`${prefix}-content`}>
        <Form
          {...formProps}
          ref={compSearchForm}
          className={`${prefix}-form`}
          isLoading={isLoading}
          layout={['horizontal', 'vertical'].includes(layout) ? layout : 'inline'}
          onChange={handleFilterChange}
          onSubmit={handleSearch}
          model={modelNow}
          btnGroup={btnGroup || [
            { opType: 'submit', btnText: 'Search' },
            ((autoSearch || resetAutoSearch) ? 'resetSubmit' : 'reset'),
          ]}
          initialValues={defaultFilter}
        />
      </div>
    </Card>
  );
});

SearchBar.propTypes = {
  isLoading: PropTypes.bool,
  model: PropTypes.array,
  defaultFilter: PropTypes.object,
  layout: PropTypes.string,
  onFilterChange: PropTypes.func,
  onSearch: PropTypes.func,
  autoSearch: PropTypes.bool,
  resetAutoSearch: PropTypes.bool,
};

SearchBar.defaultProps = {
  isLoading: false,
  model: [],
  defaultFilter: {},
  layout: 'auto',
  onFilterChange: () => {},
  onSearch: () => {},
  autoSearch: false,
  resetAutoSearch: false,
};

export default SearchBar;
