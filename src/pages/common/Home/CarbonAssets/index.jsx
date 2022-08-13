import React from 'react';
import './style.less';
import sandglass from '@/static/img/home/left/sandglass.gif';
import shine from '@/static/img/home/left/shine.png';
  
const CarbonAssets = props => {
  return <div className="leftBox carbonAssets">
    <div className="sandglassWrapper">
      <img src={sandglass} className="sandglass" />
    </div>
    <div className="chartTitle">累计碳资产</div>
    <div className="carbonValWrapper">
      <div className="carbonVal">{props.carbonAssets.carbon_assets}</div>
      <img src={shine} className="shine" />
    </div>
  </div>
};

export default CarbonAssets;
