import React from 'react';
import './style.less';
import logo from '@/static/img/home/logo.png';

const SystemTitle = props => {
  return <div className="systemTitle">
    <img src={logo} className="logo" />
    <div className="title">中宇清能 安钒达光储碳系统</div>
  </div>
};

export default SystemTitle;
