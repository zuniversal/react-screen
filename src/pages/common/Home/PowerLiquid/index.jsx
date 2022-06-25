import React from 'react';
import './style.less';
import SmartEchart from '@/common/SmartEchart';
import { createIndexArr } from '@/utils';

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
const value1 = 75.2
const value2 = 75.2
const data = [value, value, value, ];

const optionHandle = params => {
  const {
    // data = [],
    data = datas,
  } = params;
  console.log(' optionoption ： ', params); //
  return {
    colors: ['#C1232B', '#4bffa4', '#FCCE10', '#f50'],
    series: [
      {
        type: 'liquidFill',
        radius: '70%',
        z: 6,
        center: ['50%', '50%'],
        amplitude: 20,
        backgroundStyle: {
          borderWidth: 1,
          color: 'rgba(201,219,252, 1)', // 球体
        },
        color: [
          {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 1,
                color: '#133480',
              },
              {
                offset: 0,
                color: '#5F8EE8',
              },
            ],
            globalCoord: false,
          },
          {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 1,
                color: '#133480',
              },
              {
                offset: 0,
                color: '#5F8EE8',
              },
            ],
            globalCoord: false,
          },
          {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 1,
                color: '#5F8DE8',
              },
              {
                offset: 0,
                color: '#5F8DE8',
              },
            ],
            globalCoord: false,
          },
        ],
        data: [
          value + 0.02,
          {
            value: value - 0.01,
            direction: 'left',
          },
          value - 0.01,
        ],
        label: {
          normal: {
            formatter: '',
          },
        },
        outline: {
          show: true,
          itemStyle: {
            borderWidth: 0,
          },
          borderDistance: 0,
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
