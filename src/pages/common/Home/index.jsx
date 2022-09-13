import React, { useState, useEffect } from 'react';
import './style.less';
import { connect } from 'umi';
import { mapStateToProps, mapDispatchToProps } from '@/models/home';
import usePlatform from '@/hooks/usePlatform';
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
  // const [isMobile, setIsMobile] = useState('');
  const { isMobile, } = usePlatform()
  console.log(' isMobile ： ', isMobile,  )// 
  const [isShowRealData, setIsShowRealData] = useState(false);
  const [isShowCom, setIsShowCom] = useState(true);
  // const [isShowRealData, setIsShowRealData] = useState(true);

  const toggleShowRealData = params => setIsShowRealData(!isShowRealData);
  useEffect(() => {
    console.log(' useEffect  ： ');
    setIsShowCom(!isShowCom)
    setTimeout(() => {
      console.log('  延时器 ： ',  )
      setIsShowCom(!isShowCom)
    }, 5000)
  }, []);

  useEffect(() => {
    console.log(' useEffectuseEffect  ： ', props);
    const req = (props) => {
      console.log(' useEffect req   ,   ： ', props,  )
      props.getRealDataAsync();
      props.getElectricFeeAsync(props.electricFeeParams);
      // props.getPowerlineInfoAsync(props.powerlineParams);
      props.getPowerlineInfoAsync();
      props.getRealDataStatisticsAsync();
      props.getTemperatureHumidityAsync();
      props.getStatisticsAsync();
      props.getPVStatisticsAsync();
      props.getEle7daysAsync();
      props.getGe30daysAsync();
      props.getRealStatusAsync();
      props.getCarbonAssetsAsync();
    }
    setInterval(() => {
      req(props)
    // }, 300000)
    }, 10000)
    req(props)
  }, []);

  const leftCom = <div className="left">
    <EnergyCalc statistics={props.statistics}></EnergyCalc>
    <CarbonAssets carbonAssets={props.carbonAssets}></CarbonAssets>
    <PowerInstallLiquid powerInstallInfo={props.powerInstallInfo}></PowerInstallLiquid>
    <HistoryElecCalc historyElecCalc={props.historyElecCalc}></HistoryElecCalc>
  </div>
  const rightCom = <div className="right">
    <RealData realDataStatistics={props.realDataStatistics} toggleShowRealData={toggleShowRealData}></RealData>
    {isShowRealData ? (
      <RealDataDesc realData={props.realData}></RealDataDesc>
    ) : (
      <div className="righBlock">
        <ElectricPie electricFee={props.electricFee}></ElectricPie>
        <IncomeTrendChart incomeTrendInfo={props.incomeTrendInfo}></IncomeTrendChart>
        <PowerLineChart loading={props.loading} powerlineInfo={props.powerlineInfo} powerlineParams={props.powerlineParams} getPowerlineInfoAsync={props.getPowerlineInfoAsync}></PowerLineChart>
      </div>
    )}
  </div>

  return (
    <div className={`home ${isMobile}`}>
      <SystemTitle></SystemTitle>

      {isShowCom && isMobile ? leftCom : leftCom}

      <div className="center">
        <div className="centerBox powerInfoWrapper">
          <PowerInfo realStatus={props.realStatus}></PowerInfo>
          <EnvInfo
            temperatureHumidityInfo={props.temperatureHumidityInfo}
          ></EnvInfo>
          <div className="factoryTitle ">来宾市城东污水处理厂</div>
        </div>
      </div>
      
      {isShowCom && isMobile ? rightCom : rightCom}
      {/* <PowerLineChart></PowerLineChart> */}
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
