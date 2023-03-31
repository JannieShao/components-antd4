import React, { useState, useImperativeHandle, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Drawer } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { callFun, cloneElement } from '../utils';
import { rootPrefix } from '../style/config';

const prefix = `${rootPrefix}-drawer`;

const DrawerOver = forwardRef(({
  container,
  children,
  placement,
  title,
  beforePop,
  afterClose,
  zIndex,
  getContainer,
  ...moreProps
}, ref) => {
  const [visible, setVisible] = useState(false);
  const [showContainer, setShowContainer] = useState(false);
  const handleShow = () => {
    setShowContainer(true);
    callFun(() => beforePop(), () => setVisible(true));
  };
  const handleClose = () => {
    setVisible(false);
    afterClose();
  };
  useImperativeHandle(ref, () => ({
    handleShow,
    handleClose,
    handleShowContainer: () => setShowContainer(true),
  }));
  return (
    <>
      { cloneElement(children, { onClick: handleShow }) }
      <Drawer
        {...moreProps}
        className={`${prefix} ${moreProps.className || ''}`}
        getContainer={getContainer}
        width="100%"
        zIndex={zIndex}
        push={false}
        closable={false}
        placement={placement}
        open={visible}
        title={(
          <div className={`${prefix}-top-bar`}>
            <a onClick={handleClose}><LeftOutlined />Return</a>
            {title}
          </div>
        )}
      >
        {showContainer && cloneElement(container)}
      </Drawer>
    </>
  );
});

DrawerOver.propTypes = {
  container: PropTypes.node,
  children: PropTypes.node,
  placement: PropTypes.string,
  title: PropTypes.string,
  beforePop: PropTypes.func,
  afterClose: PropTypes.func,
  zIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  getContainer: PropTypes.any,
};

DrawerOver.defaultProps = {
  container: <></>,
  children: <></>,
  placement: 'right',
  title: '',
  beforePop: () => {},
  afterClose: () => {},
  zIndex: 9,
  getContainer: false,
};

export default DrawerOver;
