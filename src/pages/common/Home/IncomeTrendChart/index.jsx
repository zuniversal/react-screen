import React from 'react';
import './style.less';
import SmartEchart from '@/common/SmartEchart';
import { createIndexArr } from '@/utils';
import moment from 'moment';

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
  313.6,
  253.2,
  313.7,
  383.8,
  233.0,
  213.0,
  163.3,
].map(v => v * 420);

const monthArr = createIndexArr(31)
  .reverse()
  .map(
    // v => `${v + 1}`
    v =>
      `${moment()
        .subtract(v, 'days')
        .format('MM-DD')}`,
  );

const Title = () => 'Title';

const optionHandle = params => {
  const {
    // data = [],
    data = datas,
  } = params;
  console.log(' optionoption ： ', params); //
  return {
    // title: {
    //   // text: <Title></Title>,
    //   text: '当月收益趋势',
    //   fontSize: 12,
    //   textStyle: {
    //     color: '#fff',
    //   },
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
        name: '有功电量:kWh',
        type: 'line',
        yAxisIndex: 0,
        symbol: 'circle',
        showSymbol: false,
        symbolSize: 4,
        showBackground: true,
        smooth: true,
        showBackground: true,
        data,
        areaStyle: {
          color: '#00B460',
          color: 'rgba(3, 143, 84,0.7)',
        },
      },
    ],
  };
};

const IncomeTrendChart = props => {
  const option = optionHandle(props);
  console.log(' IncomeTrendChart optionoption  ： ', props, option); //
  return <div className="rightBox incomeTrendChart">
    <div className="iconTitle">
      <div className="chartTitle">近30天绿能收益趋势</div>
      <div className="iconRight">
        <div className="text">创造收益总值</div>
        <div className="val">655224</div>
      </div>
    </div>
    <SmartEchart {...props} option={option}></SmartEchart>
  </div>
};

export default IncomeTrendChart;