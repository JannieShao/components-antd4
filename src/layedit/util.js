const REG_PLACEHOLDER = /\$\{[a-zA-Z_-]{1,}\}/g;
const REG_SPACE = new RegExp(String.fromCharCode(8203), 'g');

export const getValue = ele => ele.innerText.replace(REG_SPACE, '').trim();

export const formatPlaceholder = val => val.replace(REG_PLACEHOLDER, w => `<label contentEditable="false">${w}</label>&#8203;`);

export const formatVal = (val = '') => {
  const placeholderStr = formatPlaceholder(val);
  return placeholderStr;
};

export const getNextLength = (valNow, length = 0) => {
  if (length === 0) return -1;
  if (valNow.length >= length) return 0;
  return length - valNow.length;
};

export const getRange = (win = window) => {
  if (win.getSelection) {
    const sel = win.getSelection();
    return sel.anchorNode.parentNode;
  }
  return win.document;
};

export const setRange = (ele, win = window) => {
  if (win.getSelection) {
    const sel = win.getSelection();
    sel.selectAllChildren(ele);
    sel.collapseToEnd();
  } else if (win.document.selection) {
    const sel = win.document.selection.createRange();
    sel.moveToElementText(ele);
    sel.collapse(false);
    sel.select();
  }
};

export const insertRange = (val = '', win = window) => {
  if (win.getSelection) {
    const sel = win.getSelection();
    if (sel.getRangeAt && sel.rangeCount) {
      const range = sel.getRangeAt(0);
      range.deleteContents();
      const el = document.createElement('div');
      el.innerHTML = val;
      const frag = document.createDocumentFragment();
      const childList = el.childNodes;
      let lastNode;
      childList.forEach((n) => {
        lastNode = frag.appendChild(n);
      });
      range.insertNode(frag);
      if (lastNode) {
        const rangeNew = range.cloneRange();
        rangeNew.setStartAfter(lastNode);
        rangeNew.collapse(true);
        sel.removeAllRanges();
        sel.addRange(rangeNew);
      }
    }
  } else if (win.document.selection && win.document.selection.type !== 'Control') {
    win.document.selection.createRange().pasteHTML(val);
  }
};

export const pasteRange = (e, len = 0, win = window) => {
  const clp = (e.originalEvent || e).clipboardData;
  const text = (clp ? clp.getData('text/plain') : win.clipboardData.getData('text')) || '';
  if (text && len !== 0) {
    const textNow = len > 0 ? text.substring(0, len) : text;
    insertRange(textNow, win);
  }
};
