import React from 'react';
import './style.less';
import SmartEchart from '@/common/SmartEchart';
import { createIndexArr } from '@/utils';
import { connect } from 'umi';
import { mapStateToProps, mapDispatchToProps, } from '@/models/home';
import { datas } from '@/configs/datas';
import { Tabs,  } from 'antd';
const { TabPane } = Tabs;

const monthArr = createIndexArr(24).map(
  v => `${v}`
);

const optionHandle = params => {
  const {
    // data = [],
    data = datas,
  } = params;
  return {
    color: ['#EBAE3E', color2Day, color5Day],
    xAxis: [
      {
        type: 'category',
        axisPointer: {
          type: 'shadow',
        },
        axisLabel: {
          fontSize: 10, 
          textStyle: {
            color: 'rgba(255, 255, 255, 0.2)',   
          },
        },
        data: monthArr,
        boundaryGap: false,
      },
    ],
    yAxis: {
      name: "kWh",
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
        name: '超负荷告警',
        type: 'line',
        yAxisIndex: 0,
        // symbol: 'none',
        showSymbol: false,
        symbolSize: 4,
        showBackground: true,
        data,
        color: '#FC7154',  
        areaStyle: {
          color: '#FC7154', 
          color: 'rgba(180, 94, 74,0.7)',
        },
      },
    ],
  };
};

const PowerLineChart = props => {
  const option = optionHandle(props);
  console.log(' PowerLineChart optionoption  ： ', props, option); //
  return <SmartEchart {...props} option={option}></SmartEchart>;
};

export default PowerLineChart;
