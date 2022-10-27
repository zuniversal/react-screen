import React from 'react';
import './style.less';
import SmartEchart from '@/common/SmartEchart';
import { createIndexArr, vh, } from '@/utils';
import { datas } from '@/configs/datas';

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
  const percent = params.dataInfo[params.topDataKey] / params.dataInfo.capacity
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
        text: 'kWp',
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
        text: 'kW',
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
        data: [percent],
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
  return <SmartEchart {...props} option={option}></SmartEchart>;
};

PowerLiquid.defaultProps = {};

export default PowerLiquid;
