import React from 'react';
import './style.less';

const configs1 = [
  {
    text: 'PV1电压',
    val: '127.3V',
  },
  {
    text: 'PV1电流',
    val: '11. OA',
  },
  {
    text: 'PV2电压',
    val: '125.4V',
  },
  {
    text: 'PV2电流',
    val: '10.9A',
  },
]

const configs2 = [
  {
    text: '负载功率',
    val: '227.0W',
  },
]

const configs3 = [
  {
    text: '电池电流',
    val: '-16. OA',
  },
  {
    text: '电网电流',
    val: '6.5A',
  },
]

const configs4 = [
  {
    text: '电池电压',
    val: '52.5V',
  },
  {
    text: '电网电压',
    val: '232.6V',
  },
]

const configs = [
  { infos: configs1, src: require('@/static/img/home/center/pvBlue.png'), },
  { infos: configs2, src: require('@/static/img/home/center/house.png'), },
  { infos: configs3, src: require('@/static/img/home/center/batteryBlue.png'), },
  { infos: configs4, src: require('@/static/img/home/center/tower.png'), },
]


// const PowerInfo = props => {
//   return <div className='powerInfo '>
//     {configs.map(item => (<div className='powerInfoItem '>
//       <div className='powerInfoIconWrapper'>
//         <img src={item.src} className="powerInfoIcon"/>
//       </div>
//       {item.infos.map(v => (<div className='powerInfoRow'>
//         <div className='text'>{v.text}</div>
//         <div className='val'>{v.val}</div>
//       </div>))}
//     </div>))}
//   </div>
// };

const PowerInfo = props => {
  return <div className='machineCircleWrapper '>
    {configs.map((item, index) => (<div className='powerInfoItem ' key={index} >
      {/* <div className='powerInfoIconWrapper'>
        <img src={item.src} className="powerInfoIcon"/>
      </div> */}
      {item.infos.map((v, i) => (<div className='powerInfoRow' key={i} >
        <div className='text'>{v.text}</div>
        <div className='val'>{v.val}</div>
      </div>))}
    </div>))}
    <div className='machineCircle '>
      {/* <img src={require('@/static/img/home/center/circle1.png')} className="circleRing"/> */}
      <div className='centerMachineIcon'>
        {/* <img src={require('@/static/img/home/center/water.png')} className="centerIcon"/>  */}
        开机
      </div>
    </div>
  </div>
  return <div className='machineCircle '>
    {configs.map((item, index) => (<div className='powerInfoItem ' key={index} >
      {/* <div className='powerInfoIconWrapper'>
        <img src={item.src} className="powerInfoIcon"/>
      </div> */}
      {item.infos.map((v, i) => (<div className='powerInfoRow' key={i} >
        <div className='text'>{v.text}</div>
        <div className='val'>{v.val}</div>
      </div>))}
    </div>))}
    {/* <img src={require('@/static/img/home/center/circle.png')} className="circleRing"/> */}
    <div className='centerMachineIcon'>
      <img src={require('@/static/img/home/center/water.png')} className="centerIcon"/> 
      开机
    </div>
  </div>
  
};

export default PowerInfo;
