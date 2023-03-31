import React, {
  useImperativeHandle, forwardRef, useRef, useEffect, useState,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { merge, isEqual } from 'lodash';
import { Modal, Button } from 'antd';
import Form from '../form';
import { callFun, cloneElement } from '../utils';
import { rootPrefix } from '../style/config';

const prefix = `${rootPrefix}-pop-form`;

const PopForm = forwardRef(({
  btnText,
  btnGroup,
  title,
  addonBefore,
  model,
  beforePop,
  afterPopSubmit,
  afterClose,
  onSubmit,
  className,
  initialValues,
  values,
  children,
  useChildren,
  getContainer,
  formProps,
  ...moreProps
}, ref) => {
  const compForm = useRef();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lastValues, setLastValues] = useState(values);
  const handleShowForm = () => callFun(
    () => beforePop(),
    (res) => {
      setVisible(true);
      if (res && compForm.current) {
        compForm.current.setFieldsValue(res);
      }
    },
  );
  const handleCancel = () => {
    setVisible(false);
    setLoading(false);
  };
  const handleAfterClose = () => {
    compForm.current && compForm.current.resetFields();
    afterClose();
  };
  const handleSubmit = (data) => {
    setLoading(true);
    callFun(
      () => onSubmit(data),
      () => {
        handleCancel();
        afterPopSubmit();
      },
      () => setLoading(false),
    );
  };
  useEffect(() => {
    if (!isEqual(values, lastValues) && compForm.current) {
      compForm.current.setFieldsValue(values);
      setLastValues(values);
    }
  }, [values]);
  useEffect(() => {
    compForm.current && compForm.current.setFieldsValue(merge({}, initialValues, values));
  }, []);
  useImperativeHandle(ref, () => ({
    handleShowForm,
  }));
  return (
    <>
      {(function () {
        if (children) {
          return cloneElement(children, { onClick: handleShowForm });
        }
        if (useChildren) {
          return <Button type="primary" onClick={handleShowForm}>{btnText}</Button>;
        }
        return '';
      }())}
      <Modal
        className={classnames(prefix, className)}
        getContainer={getContainer}
        maskClosable={false}
        title={title}
        width={690}
        footer={null}
        {...moreProps}
        open={visible}
        onCancel={handleCancel}
        afterClose={handleAfterClose}
      >
        <div className={`${prefix}-addon-before`}>{addonBefore}</div>
        <div className={`${prefix}-content`}>
          <Form
            ref={compForm}
            layout="horizontal"
            colon={false}
            model={model}
            btnGroup={btnGroup}
            {...formProps}
            isLoading={loading}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </div>
      </Modal>
    </>
  );
});

PopForm.propTypes = {
  btnText: PropTypes.string,
  btnGroup: PropTypes.array,
  title: PropTypes.string,
  addonBefore: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  model: PropTypes.array,
  beforePop: PropTypes.func,
  afterPopSubmit: PropTypes.func,
  afterClose: PropTypes.func,
  onSubmit: PropTypes.func,
  className: PropTypes.string,
  initialValues: PropTypes.object,
  values: PropTypes.object,
  useChildren: PropTypes.bool,
  getContainer: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func,
    PropTypes.node,
  ]),
  formProps: PropTypes.object,
};

PopForm.defaultProps = {
  btnText: 'Create',
  btnGroup: [{ opType: 'submit', btnText: 'Ok' }, 'cancel'],
  addonBefore: <></>,
  model: [],
  title: 'New',
  beforePop: () => {},
  afterPopSubmit: () => {},
  afterClose: () => {},
  onSubmit: () => {},
  className: '',
  initialValues: {},
  values: {},
  useChildren: true,
  getContainer: () => document.body,
  formProps: {},
};

export default PopForm;
