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

const monthArr = createIndexArr(24).map(
  v => `${v}`
);

const optionHandle = params => {
  const {
    // data = [],
    data = datas,
  } = params;
  console.log(' optionoption ： ', params); //
  return {
    title: {
      text: '当月收益趋势',
      fontSize: 12,
    },
    xAxis: [
      {
        type: 'category',
        axisPointer: {
          type: 'shadow',
        },
        data: monthArr,
        boundaryGap: false,
      },
    ],
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '有功电量:kWh',
        type: 'line',
        yAxisIndex: 0,
        symbol: 'circle',
        symbolSize: 4,
        smooth: true,
        showBackground: true,
        axisLabel: {
          fontSize: 10, 
        },
        data: [120, 200, 150, 80, 70, 110, 130],
        data,
        type: 'line',
        showBackground: true,
      },
    ],
  };
};

const LineEcharts = props => {
  const option = optionHandle(props);
  console.log(' LineEcharts optionoption  ： ', props, option); //
  return <SmartEchart {...props} option={option}></SmartEchart>;
};

LineEcharts.defaultProps = {};

export default LineEcharts;
