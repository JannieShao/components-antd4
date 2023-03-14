import React from 'react';

export default function useBlockDefaultEnter() {
  const handleKeyDown = React.useCallback((ev) => {
    if (ev.keyCode === 13) {
      ev.preventDefault();
    }
  }, []);

  const extProps = {
    onInputKeyDown: handleKeyDown,
  };

  return [extProps];
}
