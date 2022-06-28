import React from 'react';
import './style.less';
import SmartEchart from '@/common/SmartEchart';
import { createIndexArr } from '@/utils';

const datas = [
  // 0,
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

const dayArr = createIndexArr(6).map(
  v => '2022-04-' + `${v}`.padStart(2, '0'),
);

const optionHandle = params => {
  const {
    // data = [],
    data = datas,
  } = params;
  console.log(' optionoption ： ', params); //
  return {
    // legend: {
    //   data: [
    //     '储能用电',
    //     '市网用电',
    //     '绿能用电',
    //   ]
    // },
    // title: {
    //   text: '历史7天电量统计',
    //   fontSize: 12,
    // },
    // legend: {
    //   icon: "circle",
    //   right: "0",
    // },
    color: [
      '#0DC8CA',
      '#10E9A8',
      '#FC7154',
    ],
    xAxis: [
      {
        type: 'category',
        axisPointer: {
          type: 'shadow',
        },
        data: dayArr,
        axisLabel: {
          rotate: 10,
          fontSize: 10, 
          textStyle: {
            color: 'rgba(255, 255, 255, 0.2)',  
          },
        },
      },
    ],
    yAxis: {
      type: 'value',
      axisLabel: {
        fontSize: 10, 
        textStyle: {
          color: 'rgba(255, 255, 255, 0.2)',  
        },
      },
    },
    series: [
      {
        name: '储能用电',
        type: 'bar',
        axisLabel: {
          fontSize: 10, 
          textStyle: {
            color: 'rgba(255, 255, 255, 0.2)',  
          },
        },
        data,
        barWidth: "5px",
      },
      {
        name: '市网用电',
        type: 'bar',
        axisLabel: {
          fontSize: 10, 
          textStyle: {
            color: 'rgba(255, 255, 255, 0.2)',  
          },
        },
        data: data.map((v) => 350),
        barWidth: "5px",
      },
      {
        name: '绿能用电',
        type: 'bar',
        axisLabel: {
          fontSize: 10, 
          textStyle: {
            color: 'rgba(255, 255, 255, 0.2)',  
          },
        },
        data: data.map((v) => 200),
        barWidth: "5px",
      },
    ],
  };
};

const HistoryElecChart = props => {
  const option = optionHandle(props);
  console.log(' HistoryElecChart optionoption  ： ', props, option); //
  return <SmartEchart {...props} option={option}></SmartEchart>;
};

HistoryElecChart.defaultProps = {};

export default HistoryElecChart;
