import React, { useState, useEffect } from 'react';
import debounce from 'lodash/debounce';

const resize = debounce(() => {
  console.log('useEffect resize debounce ： ');
  window.location.reload();
}, 500);

const usePlatform = (config = {}) => {
  const {
    mobileCb = () => {},
  } = config;
  const [isMobile, setIsMobile] = useState('');

  useEffect(() => {
    let userAgent = navigator.userAgent.toLowerCase();
    if (
      /ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(
        userAgent,
      )
    ) {
      console.log('前端是移动端');
      setIsMobile('mobile');
      mobileCb()
    } else {
      console.log('前端是pc端');
      window.addEventListener('resize', resize);
      return () => {
        console.log(' useEffect 卸载 ： ');
        window.removeEventListener('resize', resize);
      };
    }
  }, []);

  return {
    isMobile,
    setIsMobile,
  };
};

export default usePlatform;
