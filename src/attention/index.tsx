import React from 'react';
import classnames from 'classnames';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { rootPrefix } from '../style/config';

export interface AttentionProps {
  className?: string;
  /** 标题 */
  title?: string;
  /** 列表 */
  ul: Array<React.ReactNode>,
  /** 子节点，在列表前 */
  children?: React.ReactNode;
}

const Attention = (props:AttentionProps) => {
  const {
    className = '',
    title = 'Instruction:',
    ul = [],
    children = <></>,
  } = props;
  return (
    <div className={classnames(`${rootPrefix}-attention-content`, className)}>
      <p><ExclamationCircleFilled />{title}</p>
      { children}
      { ul.map((l, idx) => {
        const temp = { _rowKey: idx, node: l };
        return <p key={temp._rowKey}>{temp.node}</p>;
      })}
    </div>
  );
};

export default Attention;
