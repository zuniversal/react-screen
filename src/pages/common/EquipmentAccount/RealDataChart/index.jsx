import React from 'react';
import SmartEchart from '@/common/SmartEchart';

import { createIndexArr } from '@/utils';

const dayHoursArr = createIndexArr(24).map(
  v => `${v}`.padStart(2, '0') + ':00',
);

const weekArr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

const option = params => {
  const { data = [], chartData = {} } = params;
  console.log(' option ： ', params);
  return {
    legend: {
      data: ['充电量（kWh）', '放电量（kWh）'],
    },
    xAxis: [
      {
        type: 'category',
        axisPointer: {
          type: 'shadow',
        },
        data: chartData.xAxis,
        // data: [],
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: '能耗（kWh）',
        axisLabel: {
          formatter: '{value}',
        },
      },
    ],
    series: [
      {
        name: '充电量（kWh）',
        type: 'line',
        yAxisIndex: 0,
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          normal: {
            color: '#00c0ff',
            borderWidth: 3,
            borderColor: '#00c0ff', //拐点边框颜色
          },
        },
        data: chartData.data[0],
        // data: [],
      },
      {
        name: '放电量（kWh）',
        type: 'line',
        yAxisIndex: 0,
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          normal: {
            color: '#fc6205',
            borderWidth: 3,
            borderColor: '#fc6205', //拐点边框颜色
          },
        },
        data: chartData.data[1],
        // data: [],
      },
    ],
  };
};

const RealDataChart = props => {
  console.log(' RealDataChart ： ', props);
  return <SmartEchart {...props} option={option(props)}></SmartEchart>;
};

export default RealDataChart;
