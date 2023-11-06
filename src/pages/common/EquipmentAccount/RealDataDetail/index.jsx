import React, { useEffect } from 'react';
import './style.less';
import RealDataImei from '../RealDataImei';
import { Radio } from 'antd';
import RealDataChart from '../RealDataChart';

const infoConfig = [
  {
    label: '累计充电量（kWh）',
    value: 'pv_charge',
  },
  {
    label: '累计放电量（kWh）',
    value: 'pv_discharge',
  },
  // {
  //   label: '充放电次数',
  //   value: 'Orange',
  // },
];

const options = [
  {
    label: '近7日',
    value: '7',
  },
  {
    label: '近30日',
    value: '30',
  },
  {
    label: '近1年',
    value: '365',
  },
  {
    label: '全部',
    value: null,
  },
];

const RealDataDetail = props => {
  console.log(' RealDataDetail ： ', props);
  const onChange = ev => {
    console.log(' onChange   ev,   ： ', ev.target.value);
    props.getDataDetailAsync({
      action: 'getDataDetailAsync',
      extraData: props.itemDetail,
      id: props.itemDetail.id,
      query: ev.target.value,
    });
  };
  return (
    <div className={`realDataDetail`}>
      <div className={`title`}>应急储能设备</div>

      <Radio.Group
        className="timeRadioWrapper"
        defaultValue="7"
        buttonStyle="solid"
        onChange={onChange}
      >
        {options.map((v, i) => (
          <Radio.Button value={v.value} key={v.value}>
            {v.label}
          </Radio.Button>
        ))}
      </Radio.Group>

      <div className={`realDataInfo`}>
        <div className={`infoWrapper`}>
          <div className={`infoCol labelWrapper`}>
            {infoConfig.map((v, i) => (
              <div className={`infoItem`} key={v.value}>
                {v.label}
              </div>
            ))}
          </div>
          <div className={`infoCol valueWrapper`}>
            {infoConfig.map((v, i) => (
              <div className={`infoItem`} key={v.value}>
                {props.dataInfo[v.value]}
              </div>
            ))}
          </div>
        </div>

        <div className={`realDataChartWrapper`}>
          <RealDataChart chartData={props.chartData}></RealDataChart>
        </div>
      </div>
      <div className={`title`}>电力监控信息</div>
      <RealDataImei />
    </div>
  );
};

export default RealDataDetail;
