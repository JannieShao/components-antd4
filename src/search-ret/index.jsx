import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Card } from 'antd';
import { randomString } from '../utils';
import Table from '../table';
import { rootPrefix } from '../style/config';

const SearchRet = ({
  className,
  topBar,
  layout,
  isLoading,
  showSizeChanger,
  dataList,
  columns,
  pagination,
  onPageChange,
  ...tableProps
}) => (
  <Card className={classnames(`${rootPrefix}-search-ret`, className)} title={topBar}>
    <Table
      rowKey={(r) => {
        if (r._rowKey !== undefined) return r._rowKey;
        if (r.id !== undefined) return r.id;
        return randomString();
      }}
      {...tableProps}
      tableLayout={layout}
      columns={columns}
      dataSource={dataList}
      loading={isLoading}
      pagination={pagination === false ? false : {
        showSizeChanger,
        showTotal: total => `${total} Total`,
        ...pagination,
      }}
      onChange={onPageChange}
    />
  </Card>
);

SearchRet.propTypes = {
  className: PropTypes.string,
  topBar: PropTypes.node,
  layout: PropTypes.string,
  isLoading: PropTypes.bool,
  showSizeChanger: PropTypes.bool,
  columns: PropTypes.array,
  dataList: PropTypes.array,
  pagination: PropTypes.any,
  onPageChange: PropTypes.func,
};

SearchRet.defaultProps = {
  className: '',
  topBar: '',
  layout: 'auto',
  isLoading: false,
  showSizeChanger: true,
  columns: [],
  dataList: [],
  pagination: {
    total: 0,
    current: 1,
    pageSize: 50,
  },
  onPageChange: () => {},
};

export default SearchRet;
