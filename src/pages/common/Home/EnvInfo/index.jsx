import React, { useState, useEffect } from 'react';
import './style.less';
import smoke from '@/static/img/home/center/smoke.png'
import water from '@/static/img/home/center/water.png'
import temperature from '@/static/img/home/center/temperature.png'
import humidity from '@/static/img/home/center/humidity.png'

const configs1 = [
  {
    text: '烟感',
    val: '正常',
    src: smoke
  },
  {
    text: '水浸',
    val: '正常',
    src: water
  },
]

const configs2 = [
  {
    text: '环境温度°C ',
    val: '18',
    key: 'temperature',
    src: temperature
  },
  {
    text: '环境湿度%',
    val: '72',
    key: 'humidity',
    src: humidity
  },
]

const EnvInfo = props => {
  const {temperatureHumidityInfo, } = props
  // useEffect(() => {
  //   // props.dispatch({
  //   //   type: 'home/getTemperatureHumidityAsync',
  //   // })
  //   props.getTemperatureHumidityAsync();
  // }, []);

  return <div className='envInfo '>
    <div className='leftBox '>
      {configs1.map((v, i) => (<div className='envInfoItem' key={i}>
        <div className='envInfoIconWrapper'>
          <img src={v.src} className="envInfoIcon"/>
        </div>
        <div className='text'>{v.text}</div>
        <div className='val'>{v.val}</div>
        {/* <div className='val'>{temperatureHumidityInfo[v.key]}</div> */}
      </div>))}
    </div>
    <div className='rightBox '>
      {configs2.map((v, i) => (<div className='envInfoItem' key={i}>
        <div className='envInfoIconWrapper'>
          <img src={v.src} className="envInfoIcon"/>
        </div>
        <div className='text'>{v.text}</div>
        {/* <div className='val'>{v.val}</div> */}
        <div className='val'>{temperatureHumidityInfo[v.key]}</div>
      </div>))}
    </div>
  </div>
};

export default EnvInfo;
