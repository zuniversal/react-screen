import React from 'react';
import './style.less';

const greenEnergyConfig = {
  title: '绿能统计',  
  infos: [
    {
      text: '今日发电量 kWh ',
      val: '2243.1',
    },
    {
      text: '今日并网电量 kWh ',
      val: '567.2',
    },
    {
      text: '今日消耗电量 kWh ',
      val: '584.7',
    },
    {
      text: '本月发电量 kWh',
      val: '2243.1',
    },
    {
      text: '本月并网电量 kWh',
      val: '567.2 ',
    },
    {
      text: '本月消耗电量 kWh',
      val: '584.7',
    },
  ],
}

const storedEnergyConfig = {
  title: '储能统计',  
  infos: [
    {
      text: '充电置 kWh',
      val: '2243.1',
    },
    {
      text: '放电量 kWh',
      val: '567.2',
    },
    {
      text: '充放电次数 kWh',
      val: '54',
    },
  ],
}

const configs = [
  greenEnergyConfig,
  storedEnergyConfig,
]

const EnergyCalc = props => {
  return <div className=''>
    {configs.map((item, index) => (<div className='content' key={index} >
      <div className='chartTitle'>{item.title}</div>
      <div className='itemBox'>
        {item.infos.map((v, i) => (<div className='item' key={i} >
          <div className='text'>{v.text}</div>
          <div className='val'>{v.val}</div>
        </div>))}
      </div>
    </div>))}
  </div>
};

export default EnergyCalc;
