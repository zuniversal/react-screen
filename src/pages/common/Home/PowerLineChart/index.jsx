import React from 'react';
import './style.less';
import SmartEchart from '@/common/SmartEchart';
import { createIndexArr } from '@/utils';
import { Tabs,  } from 'antd';
const { TabPane } = Tabs;

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
    // grid: {
    //   top: '20%',
    // },
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
      },
    ],
  };
};

const ActionTabs = props => {
  return <Tabs defaultActiveKey="1" onChange={() => {}}>
    {[
      {
        tab: '能耗曲线',
        key: '能耗曲线',
      },
      {
        tab: '电压',
        key: '电压',
      },
      {
        tab: '电流',
        key: '电流',
      },
      {
        tab: '负荷',
        key: '负荷',
      },
    ].map((v, i) => (
      <TabPane {...v}></TabPane>
    ))}
  </Tabs>
};

  
const PowerLineChart = props => {
  const option = optionHandle(props);
  console.log(' PowerLineChart optionoption  ： ', props, option); //
  return <div className="powerLineChart">
    <ActionTabs></ActionTabs>
    <div className="powerLineChartWrapper">
      <SmartEchart {...props} option={option}></SmartEchart>;
    </div>
  </div>
};

PowerLineChart.defaultProps = {};

export default PowerLineChart;
