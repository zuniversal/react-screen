import React from 'react';
import './style.less';
import SmartEchart from '@/common/SmartEchart';
import { createIndexArr } from '@/utils';
import { datas as datas2 } from '@/configs/datas';
import moment from 'moment';

const datas = datas2.map(v => v * 420);

const monthArr = createIndexArr(31)
  .reverse()
  .map(
    // v => `${v + 1}`
    v =>
      `${moment()
        .subtract(v, 'days')
        .format('MM-DD')}`,
  );

const optionHandle = params => {
  const {
    // data = [],
    data = datas,
  } = params;
  return {
    // title: {
    //   // text: <Title></Title>,
    //   text: '当月收益趋势',
    //   fontSize: 12,
    //   textStyle: {
    //     color: '#fff',
    //   },
    // },
    tooltip: {
      trigger: 'axis',
      formatter: params => {
        return `${params[0].marker} ${params[0].seriesName} ${params[0].value} kWh<br/>`
      },
    },
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
        data: params.incomeTrendInfo.xAxisData,
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
        name: '有功电量',
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
        data: params.incomeTrendInfo.incomeData,
      },
    ],
  };
};

const IncomeTrendChart = props => {
  const option = optionHandle(props);
  return <div className="rightBox incomeTrendChart">
    <div className="iconTitle">
      <div className="chartTitle">近30天绿能收益趋势</div>
      <div className="iconRight">
        <div className="text">创造收益总值</div>
        <div className="val">{props.incomeTrendInfo.sum}</div>
      </div>
    </div>
    <SmartEchart {...props} option={option}></SmartEchart>
  </div>
};

export default IncomeTrendChart;