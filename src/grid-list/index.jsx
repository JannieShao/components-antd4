import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Row, Col } from 'antd';
import { rootPrefix } from '../style/config';

const prefix = `${rootPrefix}-grid-list`;

const GridList = ({
  className = '', col, columns, dataSource,
}) => (
  <Row className={classnames(prefix, className)}>
    {columns.map(c => (
      <Col key={c.dataIndex} span={parseInt(24 / col, 10)}>
        <Row>
          <Col className={`${prefix}-label`} span={8}>{c.title}</Col>
          <Col span={16}>
            {c.render ? c.render(dataSource[c.dataIndex], dataSource) : dataSource[c.dataIndex]}
          </Col>
        </Row>
      </Col>
    ))}
  </Row>
);

GridList.propTypes = {
  col: PropTypes.number,
  columns: PropTypes.array,
  dataSource: PropTypes.object,
};

GridList.defaultProps = {
  col: 2,
  columns: [],
  dataSource: {},
};

export default GridList;
