import React, { useState, useEffect } from 'react';
import './style.less';
import { connect } from 'umi';
import { mapStateToProps, mapDispatchToProps } from '@/models/home';
import PowerPie from './PowerPie';

const configs = [
  {
    title: '峰平谷电量',
    unit: '度',
    dataKey: 'ep',
    infos: [
      {
        text: '总电费 : ',
        val: '2294.47',
        unit: '元',
      },
      {
        text: ' ',
        val: ' ',
        unit: ' ',
      },
    ],
  },
  {
    title: '峰平谷电费',
    unit: '元',
    dataKey: 'fee',
    infos: [
      {
        text: '总电量 : ',
        val: '2916.00',
        unit: '度',
      },
      {
        text: '平均电费 : ',
        val: '0.79',
        unit: '元/度',
      },
    ],
  },
];

const ElectricPie = props => {
  const { electricFee } = props;
  console.log(' electricFee ： ', electricFee); //

  useEffect(() => {
    console.log(' ElectricPie useEffect  ： ', props);
    props.getElectricFeeAsync({
      sn: '00018469010327',
    });
  }, []);

  return (
    <div className="rightBox electricPie">
      {configs.map((item, index) => (
        <div className="flexBorderBox electricPieItemWrapper" key={index}>
          <div className="electricPieItem">
            <div className="chartTitle">{item.title}</div>
            <PowerPie
              {...props}
              data={electricFee[item.dataKey]}
              unit={item.unit}
            ></PowerPie>
          </div>
          <div className="electricPieInfoWrapper">
            {item.infos.map((v, i) => (
              <div className="electricPieInfoRow" key={i}>
                <div className="text">{v.text}</div>
                <div className="val">
                  {v.val} {v.unit}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// export default ElectricPie;
export default connect(mapStateToProps, mapDispatchToProps)(ElectricPie);
