import React, { useState, useEffect } from 'react';
import './style.less';
import { connect } from 'umi';
import { mapStateToProps, mapDispatchToProps, } from '@/models/home';
import SystemTitle from './SystemTitle';
import IncomeTrendChart from './IncomeTrendChart';
import PowerLineChart from './PowerLineChart';
import PowerInstallLiquid from './PowerInstallLiquid';
import HistoryElecCalc from './HistoryElecCalc';
import EnergyCalc from './EnergyCalc';
import CarbonAssets from './CarbonAssets';
import EnvInfo from './EnvInfo';
import PowerInfo from './PowerInfo';
import RealData from './RealData';
import RealDataDesc from './RealDataDesc';
import ElectricPie from './ElectricPie';
import debounce from 'lodash/debounce';

// const mapStateToProps = ({ home }) => home;

const resize = debounce(() => {
  console.log('useEffect resize debounce ： ');
  window.location.reload();
}, 500);

const Home = props => {
  console.log(' Home ： ', props); //
  const [isShowRealData, setIsShowRealData] = useState(false);
  // const [isShowRealData, setIsShowRealData] = useState(true);

  const toggleShowRealData = params => setIsShowRealData(!isShowRealData);

  useEffect(() => {
    console.log(' useEffect  ： ');
    props.getTemperatureHumidityAsync();
  }, []);

  useEffect(() => {
    console.log(' useEffect 更新 ： ');
    window.addEventListener('resize', resize);
    return () => {
      console.log(' useEffect 卸载 ： ');
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="home">
      <SystemTitle></SystemTitle>

      <div className="left">
        <EnergyCalc></EnergyCalc>
        <CarbonAssets></CarbonAssets>
        <PowerInstallLiquid></PowerInstallLiquid>
        <HistoryElecCalc></HistoryElecCalc>
      </div>

      <div className="center">
        <div className="centerBox powerInfoWrapper">
          <PowerInfo></PowerInfo>
          <EnvInfo temperatureHumidityInfo={props.temperatureHumidityInfo} ></EnvInfo>
          <div className="factoryTitle ">来宾市城东污水处理厂</div>
        </div>
      </div>

      <div className="right">
        <RealData toggleShowRealData={toggleShowRealData}></RealData>
        {isShowRealData ? (
          <RealDataDesc></RealDataDesc>
        ) : (
          <div className="righBlock">
            <ElectricPie></ElectricPie>
            <IncomeTrendChart></IncomeTrendChart>
            <PowerLineChart></PowerLineChart>
          </div>
        )}
      </div>
    </div>
  );
};

// export default connect(mapStateToProps, dispatch => {
//   return {
//     getTemperatureHumidityAsync: () => {
//       dispatch({ type: 'home/getTemperatureHumidityAsync' });
//     },
//   };
// })(Home);
export default connect(mapStateToProps, mapDispatchToProps)(Home);
