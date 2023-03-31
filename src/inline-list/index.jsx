import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Card } from 'antd';
import { rootPrefix } from '../style/config';

const prefix = `${rootPrefix}-inline-list`;

const InlineList = ({
  className = '', columns, columnsMore, dataSource,
}) => {
  const makeEle = items => items.map((item) => {
    // 校验当前场景，是否需要展示信息
    if (item.checkShow && !item.checkShow(dataSource)) {
      return null;
    }
    let val = dataSource[item.dataIndex];
    if (item.render) {
      val = item.render(val, dataSource);
    }
    // 校验值为空时，是否需要展示信息
    if (item.hideEmpty && !val) {
      return null;
    }
    return (
      <div key={item.dataIndex} className={`${prefix}-item`}>
        <div className={`${prefix}-item-key`}>{item.title} :</div>
        <div className={`${prefix}-item-value`}>{val}</div>
      </div>
    );
  });
  return (
    <Card className={classnames(prefix, className)}>
      <div className={`${prefix}-info`}>
        {makeEle(columns)}
      </div>
      <div className={`${prefix}-more`}>
        {makeEle(columnsMore)}
      </div>
    </Card>
  );
};

InlineList.propTypes = {
  columns: PropTypes.array,
  columnsMore: PropTypes.array,
  dataSource: PropTypes.object,
};

InlineList.defaultProps = {
  columns: [],
  columnsMore: [],
  dataSource: {},
};

export default InlineList;
