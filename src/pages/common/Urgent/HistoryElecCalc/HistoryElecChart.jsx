import './style.less';
import SmartEchart from '@/common/SmartEchart';
import { createIndexArr } from '@/utils';
import { datas } from '@/configs/datas';
import moment from 'moment';

const dayArr = createIndexArr(7)
  .reverse()
  .map(
    // v => `2022-${moment().subtract(v, 'days').format('YYYY-MM-DD')}-` + `${v + 1}`.padStart(2, '0'),
    v =>
      `${moment()
        .subtract(v, 'days')
        .format('YYYY-MM-DD')}`,
  );

const seriesConfigs = [
  {
    name: '储能用电',
    key: 'storagEnergy',
  },
  {
    name: '绿能用电',
    key: 'greenEnergy',
  },
  {
    name: '市网用电',
    key: 'cityEnergy',
  },
];

const legend = {
  top: -10,
  right: 0,
  itemGap: 7,
  itemWidth: 10,
  itemHeight: 10,
  selected: {
    储能用电: true,
    绿能用电: true,
    市网用电: true,
  },
  data: [
    {
      name: '储能用电',
      icon:
        'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAAlUlEQVQYlY3PTQpBcRQF8B8zYgeMbEIykWcV9iFjI5swkGQRJkoZ6GUFPgayhaeMdOuv9Eycyenczj333EozP0ENU4zRxh1rzPEMUx1b9PzigFE1JYThhiGaiUPHfBJJZ3QwwO4rq489rpEUHQJ56dgxcStMUTLQLZk+HR9h2iSxQIZG4mWar/7+rkibM1zwShw6Q/EGouwjoMBcf9wAAAAASUVORK5CYII=',
    },
    {
      name: '市网用电',
      icon:
        'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAApUlEQVQYlW3QMWqCURAE4E9Jo5gbaOUlgm30BqmUWHgDG7FKYeUlUoiIhxAsLcQrSArJDeQPiEVY2B9FnGaYYfbt7Ktcxx9QwxQDtHDCCnP8vaCODTpuaOMLXfSq+UIEfvCO1+TQ4U8i1M/5EbY4Jw/T/4xQdAgc7tYF9snNCEXJwNtDqOz4G6F1iu8s2khepL+ML3h2XYldeV2RkzMccUkO3UXxD7JdILOOiy17AAAAAElFTkSuQmCC',
    },
    {
      name: '绿能用电',
      icon:
        'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAAlUlEQVQYlY3PPQ5BcRAE8B8deW5A5RIiGvGcwj1ErXIJhYg4hEYiUYgj+ChEpX8SlWzyl8jTmGYym9nZ2Ur2WEINE4zQwg0rzPAMUx0bdP1ij2E1JYThigEaiUPHfBxJJ7TRx/Yrq4cdLpEUHQLH0rFD4maYomSgUzJ9Ot7DtE5ijhxZ4kWaL//+rkibU5zxShw6R/EGdQMjbDfhHjkAAAAASUVORK5CYII=',
    },
  ],
  textStyle: {
    color: '#ffffff',
  },
};

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
    // title: {
    //   text: '历史7天电量统计',
    //   fontSize: 12,
    // },
    // legend,
    color: ['#0DC8CA', '#10E9A8', '#FC7154'],
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
        barWidth: '5px',
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
        data: data.map(v => 350),
        barWidth: '5px',
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
        data: data.map(v => 200),
        barWidth: '5px',
      },
    ],
    series: seriesConfigs.map(v => ({
      type: 'bar',
      axisLabel: {
        fontSize: 10,
        textStyle: {
          color: 'rgba(255, 255, 255, 0.2)',
        },
      },
      barWidth: '5px',
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
