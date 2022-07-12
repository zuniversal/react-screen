import React from 'react';
import './style.less';
import PowerLiquid from '../PowerLiquid';

const configs = [
  {
    title: '光伏 累计总发电量kWh',
    src: require('@/static/img/home/left/pv.png'),
    val: '689.460',
    color: ['#31D4D5'],  
    colorIntro: [
      {
        class: 'introGreen', 
        text: '实时发电功率', 
      },
      {
        class: 'introOrange', 
        text: '总装机容量', 
      },
    ],  
  },
  {
    title: '储能 总装机容量kWh',
    src: require('@/static/img/home/left/storedEnergy.png'),
    val: '552',
    color: ['#FC7154'],  
    colorIntro: [
      {
        class: 'introGreen', 
        text: '实时电量', 
      },
      {
        class: 'introOrange', 
        text: '总装机容量', 
      },
    ],
  },
]

const PowerInstallLiquid = props => {
  return configs.map((item, index) => (<div className='flexBorderBox' key={index} >
      <div className='iconTitle'>
        <div className='df'>
          <img src={item.src} className="icon"/>
          <div className='chartTitle'>{item.title}</div>
        </div>
      </div>
      <div className='chartVal'>{item.val}</div>
      <PowerLiquid {...item} {...props} ></PowerLiquid>
      <div className='colorIntroWrapper'>
        {item.colorIntro.map((v, i) => (<div className={`colorIntroItem ${v.class}`} key={i} >{v.text}</div>))}
      </div>
    </div>))
};

PowerInstallLiquid.defaultProps = {};

export default PowerInstallLiquid;
