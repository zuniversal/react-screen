import React from 'react';
import './style.less';
import SmartEchart from '@/common/SmartEchart';
import { createIndexArr, vh, } from '@/utils';

const datas = [
  121.6,
  151.9,
  191.0,
  201.7,
  231.4,
  261.7,
  281.6,
  221.2,
  284.3,
  321.7,
  371.0,
  351.8,

  353.6,
  323.9,
  283.0,
  213.4,
  253.7,
  243.7,
  213.6,
  253.2,
  113.7,
  183.8,
  133.0,
  163.3,
];

const monthArr = createIndexArr(24).map(v => `${v}`);

const value = 0.5;
const value1 = 75.2;
const value2 = 75.2;
const data = [value, value, value];

const optionHandle = params => {
  const {
    // data = [],
    data = datas,
  } = params;
  console.log(' optionoption ： ', params); //
  return {
    title: [
      {
        text: '564252.5',
        text: params.dataInfo[params.topDataKey],
        left: '48%',
        top: '15%',
        textAlign: 'center',
        textStyle: {
          fontSize: vh(1.5),
          fontWeight: '400',
          color: '#fff',
        },
      },
      {
        text: 'KWp',
        left: '48%',
        top: '30%',
        textAlign: 'center',
        textStyle: {
          fontSize: vh(1.5),
          fontWeight: '400',
          color: '#fff',
        },
      },
      {
        text: '112850.5',
        text: params.dataInfo.capacity,
        left: '48%',
        top: '55%',
        textAlign: 'center',
        textStyle: {
          fontSize: vh(1.5),
          fontWeight: '400',
          color: '#fff',
        },
      },
      {
        text: 'KW',
        left: '48%',
        top: '70%',
        textAlign: 'center',
        textStyle: {
          fontSize: vh(1.5),
          fontWeight: '400',
          color: '#fff',
        },
      },
    ],
    series: [
      {
        type: 'liquidFill',
        radius: '100%',
        center: ['50%', '50%'],
        backgroundStyle: {
          borderWidth: 1,
          color: '#104347',
        },
        color: ['#31D4D5'],
        color: params.color,
        // data个数代表波浪数
        data: [value],
        label: {
          normal: {
            formatter: '',
          },
        },
        outline: {
          itemStyle: {
            borderWidth: 1,
            borderColor: '#104347',
          },
          borderDistance: 3,
        },
      },
    ],
  };
};

const PowerLiquid = props => {
  const option = optionHandle(props);
  console.log(' PowerLiquid optionoption  ： ', props, option); //
  return <SmartEchart {...props} option={option}></SmartEchart>;
};

PowerLiquid.defaultProps = {};

export default PowerLiquid;
