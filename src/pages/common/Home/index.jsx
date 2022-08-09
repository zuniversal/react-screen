import React, { useState, useEffect } from 'react';
import './style.less';
import { connect } from 'umi';
import { mapStateToProps, mapDispatchToProps } from '@/models/home';
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
  const [isMobile, setIsMobile] = useState('');
  const [isShowRealData, setIsShowRealData] = useState(false);
  const [isShowCom, setIsShowCom] = useState(false);
  // const [isShowRealData, setIsShowRealData] = useState(true);

  const toggleShowRealData = params => setIsShowRealData(!isShowRealData);
  useEffect(() => {
    console.log(' useEffect  ： ');
    // setIsShowCom(!isShowCom)
    let userAgent = navigator.userAgent.toLowerCase();
    if (
      /ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(
        userAgent,
      )
    ) {
      console.log('前端是移动端');
      setIsMobile('mobile');
    } else {
      console.log('前端是pc端');
      window.addEventListener('resize', resize);
      return () => {
        console.log(' useEffect 卸载 ： ');
        window.removeEventListener('resize', resize);
      };
    }
    setTimeout(() => {
      console.log('  延时器 ： ',  )
      setIsShowCom(!isShowCom)
    }, 5000)
  }, []);

  useEffect(() => {
    console.log(' useEffect  ： ');
    props.getTemperatureHumidityAsync();
    props.getRealDataAsync();
    props.getElectricFeeAsync({
      sn: '00018469010327',
    });
    props.getStatisticsAsync();
    props.getPVStatisticsAsync();
    props.getEle7daysAsync();
    // props.getGe30daysAsync();
    props.getRealStatusAsync();
  }, []);

  return (
    <div className={`home ${isMobile}`}>
      <SystemTitle></SystemTitle>

      {isShowCom && <div className="left">
        <EnergyCalc statistics={props.statistics}></EnergyCalc>
        <CarbonAssets></CarbonAssets>
        <PowerInstallLiquid powerInstallInfo={props.powerInstallInfo}></PowerInstallLiquid>
        <HistoryElecCalc historyElecCalc={props.historyElecCalc}></HistoryElecCalc>
      </div>}

      <div className="center">
        <div className="centerBox powerInfoWrapper">
          <PowerInfo realStatus={props.realStatus}></PowerInfo>
          <EnvInfo
            temperatureHumidityInfo={props.temperatureHumidityInfo}
          ></EnvInfo>
          <div className="factoryTitle ">来宾市城东污水处理厂</div>
        </div>
      </div>
      
      {isShowCom && <div className="right">
        <RealData toggleShowRealData={toggleShowRealData}></RealData>
        {isShowRealData ? (
          <RealDataDesc realData={props.realData}></RealDataDesc>
        ) : (
          <div className="righBlock">
            <ElectricPie electricFee={props.electricFee}></ElectricPie>
            <IncomeTrendChart incomeTrendInfo={props.incomeTrendInfo}>></IncomeTrendChart>
            <PowerLineChart></PowerLineChart>
          </div>
        )}
      </div>}
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
