import { connect } from 'umi';
import { mapStateToProps, mapDispatchToProps } from '@/models/urgent';
import React, { useState, useEffect } from 'react';
import '@/static/css/index.less';
import './style.less';
import IncomeTrendChart from '../IncomeTrendChart';
import PowerInstallLiquid from '../PowerInstallLiquid';
import HistoryElecCalc from '../HistoryElecCalc';
import EnergyCalc from '../EnergyCalc';
import CarbonAssets from '../../Home/CarbonAssets';
import { storedEnergyConfig } from '../EnergyCalc';

const LeftContent = props => {
  const ajax = () => {
    const req = params => {
      params.getStatisticsAsync();
      params.getPVStatisticsAsync();
      params.getEle7daysAsync();
      params.getGe30daysAsync();
      params.getCarbonAssetsAsync();
    };
    setInterval(() => {
      req(props);
    }, 10000);
    req(props);
  };

  useEffect(() => {
    ajax();
  }, []);

  return (
    <div className={`leftContent `}>
      <EnergyCalc
        statistics={props.statistics}
        config={[storedEnergyConfig]}
      ></EnergyCalc>
      <PowerInstallLiquid
        powerInstallInfo={props.powerInstallInfo}
      ></PowerInstallLiquid>
      <HistoryElecCalc
        historyElecCalc={props.historyElecCalc}
      ></HistoryElecCalc>
      <CarbonAssets carbonAssets={props.carbonAssets}></CarbonAssets>
      <IncomeTrendChart
        incomeTrendInfo={props.incomeTrendInfo}
      ></IncomeTrendChart>
    </div>
  );
};

// export default LeftContent;
export default connect(mapStateToProps, mapDispatchToProps)(LeftContent);
