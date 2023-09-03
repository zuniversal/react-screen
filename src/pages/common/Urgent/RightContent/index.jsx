import { connect } from 'umi';
import { mapStateToProps, mapDispatchToProps } from '@/models/urgent';
import React, { useState, useEffect } from 'react';
import '@/static/css/index.less';
import './style.less';
import PowerLineChart from '../../Home/PowerLineChart';
import RealData from '../../Home/RealData';
import RealDataDesc from '../../Home/RealDataDesc';
import ElectricPie from '../ElectricPie';
import AlarmSeamlessScroll from '../components/AlarmSeamlessScroll';

const RightContent = props => {
  const [isShowRealData, setIsShowRealData] = useState(false);
  const ajax = () => {
    const req = params => {
      params.getCarbonAssetsAsync();
      params.getRealDataStatisticsAsync();
      params.getElectricFeeAsync();
      params.getPowerlineInfoAsync();
    };
    setInterval(() => {
      req(props);
    }, 10000);
    req(props);
  };
  const getPowerlineInfoAsync = params => {
    props.getPowerlineInfoAsync(params);
  };
  const toggleShowRealData = () => {
    console.log(' toggleShowRealData ： ', isShowRealData);
    setIsShowRealData(!isShowRealData);
  };

  useEffect(() => {
    ajax();
  }, []);

  return (
    <div className={`rightContent `}>
      <RealData
        realDataStatistics={props.realDataStatistics}
        toggleShowRealData={toggleShowRealData}
      ></RealData>
      {isShowRealData ? (
        <RealDataDesc realData={props.realData}></RealDataDesc>
      ) : (
        <div className="righBlock">
          <ElectricPie electricFee={props.electricFee}></ElectricPie>
          <PowerLineChart
            powerlineInfo={props.powerlineInfo}
            powerlineParams={props.powerlineParams}
            getPowerlineInfoAsync={getPowerlineInfoAsync}
          ></PowerLineChart>
          <AlarmSeamlessScroll></AlarmSeamlessScroll>
        </div>
      )}
    </div>
  );
};

// export default RightContent;
export default connect(mapStateToProps, mapDispatchToProps)(RightContent);
