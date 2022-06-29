import React from 'react';
import './style.less';

const configs = [
  {
    label: 'AB线电压',
    key: 'uab',
    val: '17981.2V',
  },
  {
    label: 'BC线电压',
    key: 'ubc',
    val: '0.000 V',
  },
  {
    label: 'CA线电压',
    key: 'uca',
    val: '1787V',
  },
  {
    label: 'A相电压',
    key: 'ua',
    val: '1381.8V',
  },
  {
    label: 'B相电压',
    key: 'ub',
    val: '0V',
  },
  {
    label: 'C相电压',
    key: 'uc',
    val: '10324.6V',
  },
  {
    label: 'A相电流',
    key: 'ia',
    val: '0.675V',
  },
  {
    label: 'B相电流',
    key: 'ib',
    val: '0.608A',
  },
  {
    label: 'C相电流',
    key: 'ic',
    val: '0.6A',
  },
  {
    label: 'A相有功功率',
    key: 'pa',
    val: '3.705KW',
  },
  {
    label: 'B相有功功率',
    key: 'pb',
    val: '0kW ',
  },
  {
    label: 'C相有功功率',
    key: 'pc',
    val: '5.07KW',
  },
  {
    label: 'A相无功功率',
    key: 'qa',
    val: '5.58Kvar',
  },
  {
    label: 'B相无功功率',
    key: 'qb',
    val: '0Kvar',
  },
  {
    label: 'C相无功功率',
    key: 'qc',
    val: '3.51Kvar',
  },
  {
    label: 'A相功率因数',
    key: 'pfa',
    val: '0.528',
  },
  {
    label: 'B相功率因数',
    key: 'pfb',
    val: '1',
  },
  {
    label: 'C相功率因数',
    key: 'pfc',
    val: '0.813',
  },
  {
    label: '总有功功率',
    key: 'p',
    val: '8.775kW',
  },
  {
    label: '总无功功率',
    key: 'q',
    val: '2.34Kvar',
  },
  {
    label: '总功率因数',
    key: 'pf',
    val: '1',
  },
  {
    label: '总有功电度',
    key: '',
    val: '7250kWh',
  },
  {
    label: '感性无功电度',
    key: '',
    val: '4108Kvarh',
  },
  {
    label: '电容性',
    key: '',
    val: '21.6Kvarh',
  },
  {
    label: '无功电度环境温度',
    key: '',
    val: '24.107°C',
  },
  {
    label: '环境湿度',
    key: '',
    val: '46.7%',
  },
  {
    label: '温度(柜体)',
    key: '',
    val: '21.4°C',
  },
  {
    label: '电网频率',
    key: '',
    val: '49.95HZ',
  },
  {
    label: '有功需量',
    key: '',
    val: '8.19kW',
  },
  {
    label: '数据时间',
    key: '',
    val: '2021-01-01 10:21:11',
  },
];

const RealDataDesc = props => {
  return <div className='rightBox realDataDesc' >
    {configs.map((v, i) => (<div className='itemBox' key={i} >
      <div className='label'>{v.label}</div>
      <div className='val'>{v.val}</div>
    </div>))}
  </div>
};

export default RealDataDesc;
