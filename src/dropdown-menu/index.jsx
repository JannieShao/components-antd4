import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Dropdown } from 'antd';
import { rootPrefix } from '../style/config';

const DropdownMenu = ({
  className = '', trigger, children, onClick, menuItems, ...props
}) => {
  const [visible, setVisible] = useState(false);
  const [itvId, setItvId] = useState(0);
  const handleClick = (e) => {
    setVisible(false);
    onClick(e.key);
  };
  const handleVisibleChange = (v) => {
    setVisible(v);
  };
  const handleLeave = () => {
    if (itvId) {
      clearTimeout(itvId);
    }
    const tempId = setTimeout(() => handleVisibleChange(false), 500);
    setItvId(tempId);
  };
  const handleEnter = () => {
    if (itvId) {
      clearTimeout(itvId);
      setItvId(0);
    }
  };
  return (
    <div
      className={classnames(`${rootPrefix}-dropdown-menu`, className)}
      onMouseLeave={handleLeave}
    >
      <Dropdown
        open={visible}
        onOpenChange={handleVisibleChange}
        menu={{
          onClick: handleClick,
          onMouseEnter: handleEnter,
          items: menuItems.map(m => ({
            key: m.value, label: m.label,
          }))
        }}
        trigger={trigger}
        {...props}
      >
        {children}
      </Dropdown>
    </div>
  );
};

DropdownMenu.propTypes = {
  trigger: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
  menuItems: PropTypes.array,
};

DropdownMenu.defaultProps = {
  trigger: 'hover',
  children: <></>,
  onClick: () => {},
  menuItems: [],
};

export default DropdownMenu;
