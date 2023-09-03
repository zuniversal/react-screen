import SmartEchart from '@/common/SmartEchart';
import { gridZero } from '@/common/SmartEchart/common';
import { vh } from '@/utils';

const optionHandle = props => {
  const { data, title = '' } = props;
  return {
    // ...gridZero,
    // animation: false,
    // title: {
    //   text: title,
    //   x: 'center',
    // },
    tooltip: {
      show: true,
      triggerOn: 'mousemove',
      trigger: 'item',
      formatter: '{b}\n{c}' + props.unit,
    },
    color: [
      'rgba(236, 78, 81)',
      'rgba(231, 178, 69)',
      'rgba(19, 208, 208)',
      'rgba(12, 235, 163)',
    ],
    // legend: {
    //   orient: 'vertical',
    //   left: 'left',
    //   data: legend,
    // },
    series: [
      {
        type: 'pie',
        radius: '45%',
        // center: ['55%', '60%'],
        label: {
          fontSize: vh(1.5),
          // fontSize: '8',
          color: '#fff',
          formatter: '{b}\n{c}' + props.unit,
          alignTo: 'labelLine',
          overflow: 'none',
        },
        labelLine: {
          length: 3,
          length2: 3,
        },
        data: [
          { value: 335, name: '谷时电量' },
          { value: 310, name: '平时电量' },
          { value: 234, name: '峰时电量' },
          // { value: 135, name: '其他电量', },
        ],
        data,
        // startAngle: 45
      },
    ],
  };
};

const PowerPie = props => {
  const option = optionHandle(props);
  return <SmartEchart {...props} option={option}></SmartEchart>;
};

PowerPie.defaultProps = {};

export default PowerPie;
