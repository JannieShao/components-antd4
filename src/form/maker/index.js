import React from 'react';
import { GRID_GAP } from '../const';
import RenderGroup from './render-group';
import RenderDependent from './render-dependent';
import RenderList from './render-list';
import RenderTable from './render-table';
import RenderFun from './render-fun';

const maker = (models = []) => models.map((m) => {
  if (!m) return null;
  const props = { ...(m.formProps || {}) };
  if (m.type === 'group') {
    props.key = props.key || m.items.map(i => i.name).join('-');
    return <RenderGroup {...props} model={m} itemRender={maker} />;
  }
  if (m.type === 'dependent') {
    props.key = props.key || `${m.dependencies.key}:${m.dependencies.val}`;
    return <RenderDependent {...props} model={m} itemRender={maker} />;
  }
  if (m.name) {
    props.name = m.name;
    props.key = m.name;
  } else if (!props.key) {
    props.key = Math.random().toString(36).substring(2);
  }
  if (m.type === 'list') {
    return <RenderList {...props} model={m} itemRender={maker} />;
  }
  if (m.type === 'table') {
    return <RenderTable {...props} model={m} />;
  }
  return <RenderFun {...props} model={m} />;
});

export default maker;

export const getRealCol = (dom = {}, perMax = 240, min = 1) => {
  const width = dom.clientWidth || 0;
  if (width === 0) return min;
  const now = parseInt((width - perMax) / (perMax + GRID_GAP), 10) + 1;
  return now < min ? min : now;
};
