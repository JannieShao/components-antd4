export const checkShow = (node, limit) => {
  const clonedNode = node.cloneNode(true);
  clonedNode.style.position = 'fixed';
  clonedNode.style.overflow = 'visible';
  clonedNode.style.display = 'inline-block';
  clonedNode.style.width = 'auto';
  clonedNode.style.whiteSpace = 'nowrap';
  clonedNode.style.visibility = 'hidden';

  const parentNode = node.parentNode || document.body;
  const newNode = parentNode.appendChild(clonedNode);
  const showNow = Math.ceil(newNode?.offsetWidth / node.offsetWidth) > Number(limit);
  parentNode.removeChild(newNode);
  return showNow;
};
