import React from 'react';
import { Card } from 'antd';
import { rootPrefix } from '../../style/config';

const prefix = `${rootPrefix}-form-item`;

const RenderCard = ({ model, itemRender }) => (
  <Card {...(model.props || {})}>
    <div className={`${prefix}-card`}>
      {itemRender(model.items || [])}
    </div>
  </Card>
);

export default RenderCard;
