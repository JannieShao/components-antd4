import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';
import classnames from 'classnames';
import { rootPrefix } from '../style/config';
import { checkShow } from './util';

const prefix = `${rootPrefix}-tab-more`;

const TabMore = ({
  className = '', children, lineClamp = 1, iconToShow = '+ Show More', iconToHide = '- Hide More',
}) => {
  const compDropContent = useRef();
  const [show, setShow] = useState(false);
  const [drop, setDrop] = useState(false);

  const resetShow = useCallback((entry) => {
    const showNow = checkShow(entry.target, lineClamp);
    setShow(showNow);
    !showNow && setDrop(false);
  }, [lineClamp]);

  useEffect(() => {
    if (compDropContent?.current) {
      const obser = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          resetShow(entry);
        });
      });
      obser.observe(compDropContent?.current);
      return function cleanUp() {
        obser.disconnect();
      };
    }
    return null;
  }, [children]);
  return (
    <div className={classnames(prefix, className)}>
      <div ref={compDropContent} className={`${prefix}-content ${drop ? '' : 'hidden'}`} style={{ WebkitLineClamp: lineClamp }}>{children}</div>
      {(show && !drop) && <div className={`${prefix}-btn`} onClick={() => setDrop(true)}>{iconToShow}</div>}
      {drop && <div className={`${prefix}-btn`} onClick={() => setDrop(false)}>{iconToHide}</div>}
    </div>
  );
};

export default TabMore;
