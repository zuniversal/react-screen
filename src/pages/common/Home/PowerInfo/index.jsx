import React from 'react';
import './style.less';

const configs1 = [
  {
    text: 'PV1电压',
    val: '127.3V',
    src: require('@/static/img/home/center/pvBlue.png'),
  },
  {
    text: 'PV1电流',
    val: '11. OA',
    src: require('@/static/img/home/center/pvBlue.png'),
  },
  {
    text: 'PV2电压',
    val: '125.4V',
    src: require('@/static/img/home/center/pvBlue.png'),
  },
  {
    text: 'PV2电流',
    val: '10.9A',
    src: require('@/static/img/home/center/pvBlue.png'),
  },
]

const configs2 = [
  {
    text: '负载功率',
    val: '227.0W',
    src: require('@/static/img/home/center/house.png'),
  },
]

const configs3 = [
  {
    text: '电池电流',
    val: '-16. OA',
    src: require('@/static/img/home/center/batteryBlue.png'),
  },
  {
    text: '电网电流',
    val: '6.5A',
    src: require('@/static/img/home/center/batteryBlue.png'),
  },
]

const configs4 = [
  {
    text: '电池电压',
    val: '52.5V',
    src: require('@/static/img/home/center/tower.png'),
  },
  {
    text: '电网电压',
    val: '232.6V',
    src: require('@/static/img/home/center/tower.png'),
  },
]

const configs = [
  { infos: configs1, src: require('@/static/img/home/center/pvBlue.png'), },
  { infos: configs2, src: require('@/static/img/home/center/batteryBlue.png'), },
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
  return configs.map(item => (<div className='powerInfoItem '>
      <div className='powerInfoIconWrapper'>
        <img src={item.src} className="powerInfoIcon"/>
      </div>
      {item.infos.map(v => (<div className='powerInfoRow'>
        <div className='text'>{v.text}</div>
        <div className='val'>{v.val}</div>
      </div>))}
    </div>))
};

export default PowerInfo;
