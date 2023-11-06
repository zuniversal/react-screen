import React from 'react';
import './style.less';
import logo from '@/static/img/home/logo.png';
import logos from '@/static/img/home/logos.png';

const MenuHeader = props => {
  return (
    <div className={`menuHeaderWrapper`}>
      <img src={logos} className="logo" />
      {!props.collapsed && <div className={`menuHeaderTitle`}>中宇清能</div>}
    </div>
  );
};

export default MenuHeader;
