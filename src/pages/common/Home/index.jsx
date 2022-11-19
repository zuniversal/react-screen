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
import { POWER_CURVE, configs } from './PowerLineChart';
import '@/static/css/index.less'

// const mapStateToProps = ({ home }) => home;

const resize = debounce(() => {
  window.location.reload();
}, 500);

let reqInterval, getPowerlineInfoAsyncInterval, isShowComTimer, query = POWER_CURVE;

const Home = props => {
  console.log(' Home ： ', props, props.powerlineParams.query); //
  // const [isMobile, setIsMobile] = useState('');
  const { isMobile, } = usePlatform()
  console.log(' isMobile ： ', isMobile,  )// 
  const [isShowRealData, setIsShowRealData] = useState(false);
  const [isShowCom, setIsShowCom] = useState(true);

  const toggleShowRealData = params => setIsShowRealData(!isShowRealData);

  const getPowerlineInfoAsyncReq = () => {
    // const loopIndex = configs.findIndex(v => v.key === props.powerlineParams.query)
    const loopIndex = configs.findIndex(v => v.key === query)
    const nextIndex = loopIndex < configs.length - 1 ? loopIndex + 1 : 0
    console.log('  loopIndex ： ', query, loopIndex, nextIndex, configs, configs[nextIndex].key, props.powerlineParams, props, props.powerlineParams.query, )
    query = configs[nextIndex].key
    props.getPowerlineInfoAsync({
      ...props.powerlineParams,
      query: configs[nextIndex].key,
    });
  }
  const ajax = () => {
    const req = (props) => {
      props.getRealDataAsync();
      props.getElectricFeeAsync(props.electricFeeParams);
      props.getRealDataStatisticsAsync();
      props.getTemperatureHumidityAsync();
      props.getStatisticsAsync();
      props.getPVStatisticsAsync();
      props.getEle7daysAsync();
      props.getGe30daysAsync();
      props.getRealStatusAsync();
      props.getCarbonAssetsAsync();
    }

    reqInterval = setInterval(() => {
      req(props)
    // }, 300000)
    }, 10000)
    getPowerlineInfoAsyncInterval = setInterval(getPowerlineInfoAsyncReq, 5000)
    req(props)
  }

  useEffect(() => {
    console.log(' useEffectuseEffect  ： ', props);
    props.getPowerlineInfoAsync();
    ajax()
    setIsShowCom(!isShowCom)
    isShowComTimer = setTimeout(() => {
      console.log('  延时器 ： ',  )
      setIsShowCom(!isShowCom)
    }, 5000)
    return () => {
      clearInterval(reqInterval);
      clearInterval(getPowerlineInfoAsyncInterval);
      clearTimeout(isShowComTimer);
    }
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
