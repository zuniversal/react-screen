import React from 'react';
import './style.less';
import SmartEchart from '@/common/SmartEchart';
import { createIndexArr } from '@/utils';
import { datas } from '@/configs/datas';
import moment from 'moment';

const { getDate, getMonth,  } = new Date()

const dayArr = createIndexArr(7).reverse().map(
  // v => `2022-${moment().subtract(v, 'days').format('YYYY-MM-DD')}-` + `${v + 1}`.padStart(2, '0'),
  v => `${moment().subtract(v, 'days').format('YYYY-MM-DD')}`
);

const seriesConfigs = [
  {
    name: '储能用电',
    key: 'storagEnergy',
  },
  {
    name: '市网用电',
    key: 'cityEnergy',
  },
  {
    name: '绿能用电',
    key: 'greenEnergy',
  },
]


const optionHandle = params => {
  const {
    // data = [],
    data = datas,
  } = params;
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
        data: params.historyElecCalc.xAxisData,
        axisLabel: {
          // rotate: 10,
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
    series: seriesConfigs.map((v) => ({
      type: 'bar',
      axisLabel: {
        fontSize: 10, 
        textStyle: {
          color: 'rgba(255, 255, 255, 0.2)',  
        },
      },
      barWidth: "5px",
      name: v.name,
      data: params.historyElecCalc[v.key],
    })),
  };
};

const HistoryElecChart = props => {
  const option = optionHandle(props);
  return <SmartEchart {...props} option={option}></SmartEchart>;
};

HistoryElecChart.defaultProps = {};

export default HistoryElecChart;
