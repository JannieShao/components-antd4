import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { isEmpty, pull } from 'lodash';
import { Table } from 'antd';
import { rootPrefix } from '../style/config';

const getClass = {
  tabMore: `${rootPrefix}-table-use-tab-more`,
  tabExpand: `${rootPrefix}-table-in-expand`,
};

const CompTable = ({
  className, type, dataSource, expandable, columns, ...tableProps
}) => {
  const [expandedKeys, setExpandedKeys] = useState([]);
  const {
    defaultExpandAllRows, expandedRowKeys, ...expandMore
  } = expandable;

  const handleExpand = (expanded, { _rowKey }) => {
    if (expanded && !expandedKeys.includes(_rowKey)) {
      setExpandedKeys([...expandedKeys, _rowKey]);
    } else if (!expanded && expandedKeys.includes(_rowKey)) {
      setExpandedKeys(pull([...expandedKeys], _rowKey));
    }
  };

  useEffect(() => {
    if (defaultExpandAllRows) {
      setExpandedKeys(dataSource.map(d => d._rowKey));
    } else {
      setExpandedKeys(expandedRowKeys || []);
    }
  }, [defaultExpandAllRows, expandedRowKeys, dataSource]);
  return (
    <Table
      className={classnames(getClass[type] || '', className)}
      expandable={isEmpty(expandable) ? {} : {
        ...expandMore,
        expandedRowKeys: expandedKeys,
        onExpand: handleExpand,
      }}
      columns={columns.map((c) => {
        const cNow = { ...c };
        if (!isEmpty(c._expandable)) {
          const { show = 'Show', hide = 'Hide' } = c._expandable;
          cNow.render = (_, record) => (
            <>
              {expandedKeys.includes(record._rowKey) && (
                <a onClick={() => handleExpand(false, record)}>{hide}</a>
              )}
              {!expandedKeys.includes(record._rowKey) && (
                <a onClick={() => handleExpand(true, record)}>{show}</a>
              )}
            </>
          );
        }
        return cNow;
      })}
      dataSource={dataSource}
      {...tableProps}
    />
  );
};

CompTable.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  dataSource: PropTypes.array,
  expandable: PropTypes.object,
};

CompTable.defaultProps = {
  className: '',
  type: '',
  dataSource: [],
  expandable: {},
};

export default CompTable;
