import React, { useEffect } from 'react';
import './style.less';
import SmartEchart from '@/common/SmartEchart';
import { createIndexArr } from '@/utils';
import { connect } from 'umi';
import { mapStateToProps, mapDispatchToProps } from '@/models/home';
import { Tabs } from 'antd';
const { TabPane } = Tabs;

const datas = [
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
];

const monthArr = createIndexArr(24).map(v => `${v}`);

const todayColor = 'rgba(255, 64, 65, .8)';
const workdayColor = 'rgb(31, 114, 220)';
const weekendColor = 'rgb(19, 208, 208)';

const todayArea = 'rgba(255, 64, 65, .2)';
const workdayArea = 'rgba(236, 78, 81,0.5)';
const weekendArea = 'rgba(19, 208, 208,0.5)';
const colors = [todayColor, workdayColor, weekendColor];
const areaColors = [todayArea, workdayArea, weekendArea];

export const POWER_CURVE = 'power_curve';
export const POWER_VOLTAGE = 'ua,ub,uc';
export const POWER_CURRENT = 'ia,ib,ic';
export const POWER_LOAD = 'p';
export const powerConfigMap = {
  POWER_CURVE,
  POWER_VOLTAGE,
  POWER_CURRENT,
  POWER_LOAD,
};

export const powerCurveMap = {
  today: {
    name: '今日',
    color: todayColor,
  },
  working_day: {
    name: '工作日',
    color: workdayColor,
  },
  rest_day: {
    name: '周末',
    color: weekendColor,
  },
};

export const voltageMap = {
  ua: {
    name: 'ua',
    color: todayColor,
  },
  ub: {
    name: 'ub',
    color: workdayColor,
  },
  uc: {
    name: 'uc',
    color: weekendColor,
  },
};

export const currentMap = {
  ia: {
    name: 'ia',
    color: todayColor,
  },
  ib: {
    name: 'ib',
    color: workdayColor,
  },
  ic: {
    name: 'ic',
    color: weekendColor,
  },
};

export const loadMap = {
  p: {
    name: 'p',
    color: todayColor,
  },
};

// export const powerChartMap = {
//   [POWER_CURVE]: {
//     color: todayColor
//   },
//   [POWER_VOLTAGE]: {
//     color: todayColor
//   },
//   [POWER_CURRENT]: {
//     color: workdayColor
//   },
//   [POWER_LOAD]: {
//     color: weekendColor
//   },
// }

export const configs = [
  {
    tab: '能耗曲线',
    key: powerConfigMap.POWER_CURVE,
  },
  {
    tab: '电压',
    key: powerConfigMap.POWER_VOLTAGE,
  },
  {
    tab: '电流',
    key: powerConfigMap.POWER_CURRENT,
  },
  {
    tab: '负荷',
    key: powerConfigMap.POWER_LOAD,
  },
];

const createSeries = ({ data, params }) => {
  console.log(' createSeries   ,   ： ', data, params);
  const seriesItem = {
    type: 'line',
    yAxisIndex: 0,
    showSymbol: false,
    symbolSize: 4,
    showBackground: true,
  };
  let series = [];
  if (params.query === powerConfigMap.POWER_CURVE) {
    console.log(' series Array.isArray(data) ： ', Array.isArray(data), data); //
    series = Object.keys(powerCurveMap).map((key, i) => ({
      ...seriesItem,
      ...powerCurveMap[key],
      data: data[key],
      symbol: 'circle',
      // symbolSize: 8,
      // areaStyle: {
      //   color: areaColors[i],
      // },
    }));
    console.log(' createSeries series ： ', series); //
  }
  if (params.query === powerConfigMap.POWER_VOLTAGE) {
    const datas = {};
    series = Object.keys(voltageMap)
      .map((key, i) => {
        datas[key] = [];
        return key;
      })
      .map((key, i) => {
        datas[key] = data.map((item, i) => item[key]);
        console.log(' datas seriesseries ： ', datas); //
        return {
          ...seriesItem,
          name: key,
          data: datas[key],
        };
      });
    console.log(' datas seriesseries  series ： ', datas, series); //
  }
  if (params.query === powerConfigMap.POWER_CURRENT) {
    const datas = {};
    series = Object.keys(currentMap)
      .map((key, i) => {
        datas[key] = [];
        return key;
      })
      .map((key, i) => {
        datas[key] = data.map((item, i) => item[key]);
        return {
          ...seriesItem,
          name: key,
          data: datas[key],
        };
      });
  }
  if (params.query === powerConfigMap.POWER_LOAD) {
    const datas = {};
    series = Object.keys(loadMap)
      .map((key, i) => {
        datas[key] = [];
        return key;
      })
      .map((key, i) => {
        datas[key] = data.map((item, i) => item[key]);
        return {
          ...seriesItem,
          name: key,
          data: datas[key],
          color: todayArea,
          areaStyle: {
            color: todayArea,
          },
        };
      });
  }
  console.log(' datas series ： ', series);
  return series;
};

const optionHandle = params => {
  const {
    // data = [],
    // data = datas,
    data,
    powerlineParams,
  } = params;
  console.log(' optionoptionoptionoption ： ', params); //
  return {
    // grid: {
    //   top: '20%',
    // },
    tooltip: {
      trigger: 'axis',
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
        boundaryGap: false,
      },
    ],
    yAxis: {
      name: 'kWh',
      nameTextStyle: {
        color: 'rgba(255, 255, 255, 0.2)',
      },
      type: 'value',
      axisLabel: {
        fontSize: 10,
        textStyle: {
          color: 'rgba(255, 255, 255, 0.2)',
        },
      },
    },
    // series: [
    //   {
    //     name: '超负荷告警',
    //     type: 'line',
    //     yAxisIndex: 0,
    //     // symbol: 'none',
    //     showSymbol: false,
    //     symbolSize: 4,
    //     showBackground: true,
    //     data,
    //     color: '#FC7154',
    //     areaStyle: {
    //       color: '#FC7154',
    //       color: 'rgba(180, 94, 74,0.7)',
    //     },
    //   },
    //   {
    //     name: '超负荷告警',
    //     type: 'line',
    //     yAxisIndex: 0,
    //     // symbol: 'none',
    //     showSymbol: false,
    //     symbolSize: 4,
    //     showBackground: true,
    //     data: data.map(v => v + 100),
    //     color: workdayArea,
    //     areaStyle: {
    //       color: workdayArea,
    //     },
    //   },
    //   {
    //     name: '超负荷告警',
    //     type: 'line',
    //     yAxisIndex: 0,
    //     // symbol: 'none',
    //     showSymbol: false,
    //     symbolSize: 4,
    //     showBackground: true,
    //     data: data.map(v => v - 50),
    //     color: weekendColor,
    //     areaStyle: {
    //       color: weekendColor,
    //     },
    //   },
    // ],
    series: createSeries({ data, params: powerlineParams }),
  };
};

const ActionTabs = props => {
  return (
    <Tabs
      defaultActiveKey="1"
      onChange={key =>
        props.onChange({
          query: key,
        })
      }
    >
      {configs.map((v, i) => (
        <TabPane {...v}></TabPane>
      ))}
    </Tabs>
  );
};

const PowerLineChart = props => {
  const { powerlineInfo, powerlineParams } = props;
  const option = optionHandle({
    ...props,
    data: powerlineInfo,
  });
  console.log(' PowerLineChart optionoption  ： ', props, option); //

  useEffect(() => {
    props.getPowerlineInfoAsync({
      query: configs[0].key,
    });
  }, []);

  return (
    <div className="rightBox powerLineChart">
      <ActionTabs onChange={props.getPowerlineInfoAsync}></ActionTabs>
      <div className="powerLineChartWrapper">
        <SmartEchart {...props} option={option}></SmartEchart>;
      </div>
    </div>
  );
};

// export default PowerLineChart;
export default connect(mapStateToProps, mapDispatchToProps)(PowerLineChart);
