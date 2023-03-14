import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { cloneElement } from '../utils';
import { rootPrefix } from '../style/config';

const getClass = {
  txtSuccess: `${rootPrefix}-text-success`,
  txtWarning: `${rootPrefix}-text-warning`,
  txtDanger: `${rootPrefix}-text-danger`,
  txtPrimary: `${rootPrefix}-text-primary`,
  inline: `${rootPrefix}-ele-inline`,
  toInput: `${rootPrefix}-ele-to-input-style`,
};

const Styling = ({
  type, children, className = '',
}) => cloneElement(children, { className: classnames(`${rootPrefix}-styling`, getClass[type] || '', className, children?.props?.className || '') });

Styling.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node,
};

Styling.defaultProps = {
  type: '',
  children: <></>,
};

export default Styling;
