import React from 'react';
import './style.less';
import PowerPie from '../PowerPie';

const configs = [
  {
    title: '峰平谷电量', 
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
  return configs.map(item => (<div className='flexBorderBox'>
      <div className='electricPieItem'>
        <div className='chartTitle'>{item.title}</div>
        <PowerPie></PowerPie>
      </div>
      <div className='electricPieInfoWrapper'>
        {item.infos.map(v => (<div className='electricPieInfoRow'>
          <div className='text'>{v.text}</div>
          <div className='val'>{v.val} {v.unit}</div>
        </div>))}
      </div>
    </div>))
};

export default ElectricPie;
