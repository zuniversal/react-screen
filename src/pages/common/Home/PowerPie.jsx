import React from 'react';
import SmartEchart from '@/common/SmartEchart';
import { gridZero } from '@/common/SmartEchart/common';

const optionHandle = props => {
  const { data, title = '' } = props;
  return {
    ...gridZero,
    animation: false,
    title: {
      text: title,
      x: 'center',
    },
    color: [
      'rgba(236, 78, 81)',
      'rgba(19, 208, 208)',
      'rgba(231, 178, 69)',
      'rgba(12, 235, 163)',
    ],
    // legend: {
    //   orient: 'vertical',
    //   left: 'left',
    //   data: legend,
    // },
    series: [
      {
        name: 'Country Visit',
        type: 'pie',
        radius: '55%',
        center: ['55%', '60%'],
        label: {
          color: "#fff"
        },
        data,
        data: [
          { value: 335, name: '访问直接' },
          { value: 310, name: '邮件营销' },
          { value: 234, name: '联盟广告' },
          { value: 135, name: '视频广告' },
        ],
      },
    ],
  };
};

const PowerPie = props => {
  const option = optionHandle(props);
  console.log(' PowerPie optionoption  ： ', props, option); //
  return <SmartEchart {...props} option={option}></SmartEchart>;
};

PowerPie.defaultProps = {};

export default PowerPie;
