import React from 'react';
import './style.less';
import PowerPie from '../PowerPie';

const configs = [
  {
    title: '峰平谷电量', 
    unit: '度',
    infos: [
      {
        text: '总电费 : ',
        val: '2294.47',
        unit: '元',
      },
      {
        text: ' ',
        val: ' ',
        unit: ' ',
      },
    ]
  },
  {
    title: '峰平谷电费',  
    unit: '元',
    infos: [
      {
        text: '总电量 : ',
        val: '2916.00',
        unit: '度',
      },
      {
        text: '平均电费 : ',
        val: '0.79',
        unit: '元/度',
      },
    ]
  },
]

const ElectricPie = props => {
  return configs.map((item, index) => (<div className='flexBorderBox' key={index}>
      <div className='electricPieItem'>
        <div className='chartTitle'>{item.title}</div>
        <PowerPie {...props} unit={item.unit}></PowerPie>
      </div>
      <div className='electricPieInfoWrapper'>
        {item.infos.map((v, i) => (<div className='electricPieInfoRow' key={i}>
          <div className='text'>{v.text}</div>
          <div className='val'>{v.val} {v.unit}</div>
        </div>))}
      </div>
    </div>))
};

export default ElectricPie;
