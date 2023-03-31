import React from 'react';
import moment from 'moment';

const EMPTY_FUN = () => {};
export const callFun = (fun = EMPTY_FUN, resolve = EMPTY_FUN, reject = EMPTY_FUN) => {
  const res = fun();
  if (res && res.then && typeof res.then === 'function') {
    res.then(resolve, reject);
    return;
  }
  resolve(res);
};

export const getNodeType = (node) => {
  // 列表节点
  if (Array.isArray(node)) {
    for (const n of node) {
      const type = getNodeType(n);
      if (type !== '_') {
        return 'arrayElement';
      }
    }
    return '_';
  }
  // function 组件
  if (typeof node === 'function' && !/[A-Z]/.test(node.name?.[0])) {
    return 'functionElement';
  }
  // React 单节点
  if (typeof node === 'object' && node.type) {
    return 'reactElement';
  }
  return '_';
};

export const makeNode = (node) => {
  const nodeType = getNodeType(node);
  if (['arrayElement'].includes(nodeType)) {
    return <div className="__element_maker__">{node}</div>;
  }
  if (['functionElement', 'reactElement'].includes(nodeType)) {
    return node;
  }
  return <span>{node}</span>;
};

export const cloneElement = (node, ...other) => {
  if (!node) return <></>;
  return React.cloneElement(makeNode(node), ...other);
};

export const filterEmptyString = values => (values || [])
  .map(v => String(v || '').trim())
  .filter(Boolean);

export const filterEmptyObj = (obj) => {
  if (Object.prototype.toString.call(obj) === '[object Object]') {
    if (obj._isAMomentObject) {
      return obj;
    }
    const keys = Object.keys(obj);
    if (keys.length === 0) return undefined;
    const newObj = {};
    keys.forEach((k) => {
      const v = filterEmptyObj(obj[k]);
      if (v !== undefined) {
        newObj[k] = v;
      }
    });
    return newObj;
  }
  if (Object.prototype.toString.call(obj) === '[object Array]') {
    return obj.map(o => filterEmptyObj(o));
  }
  if (Object.prototype.toString.call(obj) === '[object String]') {
    const v = obj.trim();
    if (v) return v;
    return undefined;
  }
  return obj;
};

export const timestamp = (time, format = '') => {
  if (format === 'startOfDay') return moment(time).startOf('day').valueOf();
  if (format === 'endOfDay') return moment(time).endOf('day').valueOf();
  if (format === 'endOfDaySecond') return parseInt(moment(time).endOf('day').valueOf() / 1000, 10) * 1000;
  return moment(time).valueOf();
};

export const randomString = (len = 32) => {
  const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  const maxPos = chars.length;
  let pwd = '';
  for (let i = 0; i < len; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
};
