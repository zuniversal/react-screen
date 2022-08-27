import React, { useEffect } from 'react';
import './style.less';
import SmartEchart from '@/common/SmartEchart';
import { createIndexArr } from '@/utils';
import { connect } from 'umi';
import { mapStateToProps, mapDispatchToProps } from '@/models/home';
import { datas } from '@/configs/datas';
import { Tabs } from 'antd';
const { TabPane } = Tabs;

const monthArr = createIndexArr(24).map(v => `${v}`);

const todayColor = '#EBAE3E';
const workdayColor = 'rgb(5,252,253)';
const weekendColor = 'rgb(255,64,65)';

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
  working_day: {
    name: '工作日',
    color: workdayColor,
  },
  rest_day: {
    name: '周末',
    color: weekendColor,
  },
  today: {
    name: '今日',
    color: todayColor,
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

export const configs = [
  {
    tab: '能耗曲线',
    key: powerConfigMap.POWER_CURVE,
    yAxisName: 'kWh',
  },
  {
    tab: '电压',
    key: powerConfigMap.POWER_VOLTAGE,
    yAxisName: 'V',
  },
  {
    tab: '电流',
    key: powerConfigMap.POWER_CURRENT,
    yAxisName: 'A',
  },
  {
    tab: '负荷',
    key: powerConfigMap.POWER_LOAD,
    yAxisName: 'KW',
  },
];

const createSeries = ({ data, params }) => {
  console.log(' createSeries   ,   ： ', data, params);
  const seriesItem = {
    type: 'line',
    yAxisIndex: 0,
    // showSymbol: false,
    // symbolSize: 4,
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
      // symbolSize: 6,
      lineStyle: {
        width: 2,
      },
      // splitLine: {
      //   show: true,
      //   lineStyle: {
      //     color: 'red'
      //   }
      // },
      min: value => value.min,
      max: value => value.max,
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
          symbol: 'circle',
          name: key,
          data: datas[key],
          lineStyle: {
            width: 2,
          },
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
          symbol: 'circle',
          name: key,
          data: datas[key],
          lineStyle: {
            width: 2,
          },
          // areaStyle: areaColors[i],
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
          symbol: 'circle',
          name: key,
          data: datas[key],
          color: todayArea,
          lineStyle: {
            width: 4,
          },
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
    query,
  } = params;
  console.log(' optionHandleoptionHandleoptionHandle ： ', params); //
  return {
    grid: {
      top: '18%',
      left: '40px',
      right: '2%',
      bottom: '25%',
    },
    legend: {
      bottom: -5,
      right: 0,
      itemGap: 40,
      itemWidth: 10,
      itemHeight: 10,
      selected: {
        今日: true,
        工作日: true,
        周末: true,
      },
      data: [
        {
          name: '今日',
          icon:
            'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAALhJREFUGBmNkDsOwjAMhm2rA11Rj8JKyxFyAm7BAoKhQoiKW3AAlCNQWDlKxFoGFGNHtVQYAA+JH1/+2Ebo7e6raWRYMPNEU4h4I4TD2LXXFOsRfLUE5i0zoMZmEkQgXBeu3WFSinyW4hMINvkoPyrYPbq5YLW4GRHOsvQdyDuBCndpFOqtCb4EjrBXhqwnUzJKb8spQ8PCN590OgVSTx+k5ZT5e5i0jnAqVyJWsww1FH1bjxV+LfwFfsZeQpKLo6sAAAAASUVORK5CYII=',
        },
        {
          name: '工作日',
          icon:
            'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAI9JREFUGBmNkIEJwzAMBEUgJnSDDtNVukYh2apzdA7vELCk6pSmEENDDcLS//tlSeRzJvdbafYsajUjcrCdz7uoz6OajU39EGoKlyJehUgj1gAfF/crQQ4Gl860wwXi0CaKFMOFJgqrCHHphWCbidWhJ3/Vg7i8IJvJvRd9MTR/D4NLfHrJyc/Ws7fD+Wzhb4FFqS8uIKsnAAAAAElFTkSuQmCC',
        },
        {
          name: '周末',
          icon:
            'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAKtJREFUGBmNkDsOwjAMhv2XIi7EihSae3CLLiA6IISouAX3CFRizYUQNMZ5VYWFerBs58vvBygZa72inmsiXsYSLM1wgTEPn8M7XustsTvm3NeCAU6QPe7mhKDkuJOHNzE1tJhfA/R8bUTmIHFJBVSZ2hXys0F3awMUXcuqkojP1FMtQJopK43IQV0YAaeZb2kD6mf6taEGO3mZeB5V7cKGzN+jjM+Tu/07+Acd2kyRiHTNUwAAAABJRU5ErkJggg==',
        },
      ],
      textStyle: {
        color: '#ffffff',
      },
    },
    tooltip: {
      trigger: 'axis',
      ...(query === powerConfigMap.POWER_CURVE
        ? {
            formatter: params => {
              console.log(' paramsparams ： ', params); //
              return params
                .map(v => `${v.marker} ${v.seriesName} ${v.value} kWh<br/>`)
                .join(' ');
            },
          }
        : {}),
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
        data:
          query === powerConfigMap.POWER_CURVE
            ? monthArr
            : data?.map(v => v.uptime.split(' ')[1].split('.')[0]),
        boundaryGap: false,
      },
    ],
    yAxis: {
      name: configs.find(v => v.key === query)?.yAxisName || 'kWh',
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
      splitLine: {
        lineStyle: {
          color: '#fff',
        },
      },
      min: value => value.min,
      max: value => value.max,
      // interval: query === powerConfigMap.POWER_VOLTAGE ? Math.max(...data.map((v) => Math.max(...data.map((v) => )))) : null,
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
    <Tabs defaultActiveKey="1" onChange={props.onChange}>
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
    ...powerlineParams,
  });
  console.log(' PowerLineChart optionoption  ： ', props, option); //

  const onChange = key => {
    console.log(' onChange ： ', key); //
    props.getPowerlineInfoAsync({
      ...powerlineParams,
      query: key,
    });
  };

  // useEffect(() => {
  //   props.getPowerlineInfoAsync({
  //     query: configs[0].key,
  //   });
  // }, []);

  return (
    <div className="rightBox powerLineChart">
      <ActionTabs onChange={onChange}></ActionTabs>
      <div className="powerLineChartWrapper">
        <SmartEchart {...props} option={option}></SmartEchart>;
      </div>
    </div>
  );
};

export default PowerLineChart;
// export default connect(mapStateToProps, mapDispatchToProps)(PowerLineChart);
