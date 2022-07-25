import React, { useState, useEffect } from 'react';
import './style.less';
import { connect } from 'umi';

const mapStateToProps = ({ home }) => home;

const configs1 = [
  {
    text: '烟感',
    val: '正常',
    src: require('@/static/img/home/center/smoke.png')
  },
  {
    text: '水浸',
    val: '正常',
    src: require('@/static/img/home/center/water.png')
  },
]

const configs2 = [
  {
    text: '环境温度°C ',
    val: '18',
    src: require('@/static/img/home/center/temperature.png')
  },
  {
    text: '环境湿度%',
    val: '72',
    src: require('@/static/img/home/center/humidity.png')
  },
]

const EnvInfo = props => {
  useEffect(() => {
    console.log(' useEffect  ： ', props, );
    // props.dispatch({
    //   type: 'home/getTemperatureHumidityAsync',
    // })
    props.getTemperatureHumidityAsync();
  }, []);

  return <div className='envInfo '>
    <div className='leftBox '>
      {configs1.map((v, i) => (<div className='envInfoItem' key={i}>
        <div className='envInfoIconWrapper'>
          <img src={v.src} className="envInfoIcon"/>
        </div>
        <div className='text'>{v.text}</div>
        <div className='val'>{v.val}</div>
      </div>))}
    </div>
    <div className='rightBox '>
      {configs2.map((v, i) => (<div className='envInfoItem' key={i}>
        <div className='envInfoIconWrapper'>
          <img src={v.src} className="envInfoIcon"/>
        </div>
        <div className='text'>{v.text}</div>
        <div className='val'>{v.val}</div>
      </div>))}
    </div>
  </div>
};

// export default EnvInfo;
export default connect(mapStateToProps, dispatch => {
  return {
    getTemperatureHumidityAsync: () => {
      dispatch({ type: 'home/getTemperatureHumidityAsync' });
    },
  };
})(EnvInfo);

