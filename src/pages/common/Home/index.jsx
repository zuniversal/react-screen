import React, { useState, useEffect } from 'react';
import './style.less';
import {
  recentPowerAxisConfig,
  powerMoneyAxisConfig,
  dayHoursNum,
} from '@/configs';
import IncomeTrendChart from './IncomeTrendChart';
import PowerLineChart from './PowerLineChart';
import HistoryElecChart from './HistoryElecChart';
import PowerInstallLiquid from './PowerInstallLiquid';
import HistoryElecCalc from './HistoryElecCalc';
import EnergyCalc from './EnergyCalc';
import EnvInfo from './EnvInfo';
import PowerInfo from './PowerInfo';
import RealData from './RealData';
import RealDataDesc from './RealDataDesc';
import ElectricPie from './ElectricPie';
import logo from '@/static/img/home/logo.png';
// import sandglass from '@/static/img/home/left/sandglass.png';
import sandglass from '@/static/img/home/left/sandglass.gif';
import shine from '@/static/img/home/left/shine.png';
import debounce from 'lodash/debounce';

const IconTitle = props => {
  return (
    <div className="iconTitle">
      <img src={props.logo} alt="" />
      <img src={require('@/static/img/home/left/pv.png')} alt="" />
      <div className="title">{props.title}</div>
      {/* <div className='subTitle'>{props.subTitle}</div> */}
    </div>
  );
};

const resize = debounce(() => {
  console.log('useEffect resize debounce ： ');
  window.location.reload();
}, 500);

const Home = props => {
  const [isShowRealData, setIsShowRealData] = useState(false);
  // const [isShowRealData, setIsShowRealData] = useState(true);

  const toggleShowRealData = params => setIsShowRealData(!isShowRealData);

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
      <div className="systemTitle">
        <img src={logo} className="logo" />
        <div className="title">中宇清能 安钒达光储碳系统</div>
      </div>
      <div className="left">
        {/* <div className="borderBox calcInfo">
        </div> */}
        <div className="leftBox energyCalc">
          <EnergyCalc></EnergyCalc>
        </div>
        <div className="leftBox carbonAssets">
          <div className="sandglassWrapper">
            <img src={sandglass} className="sandglass" />
          </div>
          <div className="chartTitle">累计碳资产</div>
          <div className="carbonValWrapper">
            <div className="carbonVal">566854</div>
            <img src={shine} className="shine" />
          </div>
        </div>
        {/* <div className='leftBox installCapacity'>
          <div className='flexBorderBox'>
            <div className='iconTitle'>
              <div className='df'>
                <img src={require('@/static/img/home/left/pv.png')} className="icon"/>
                <div className='chartTitle'>光伏 累计总发电量kWh</div>
              </div>
            </div>
            <div className='chartVal'>689.460</div>
          </div>
          <div className='flexBorderBox'>
            <div className='iconTitle'>
              <div className=''>
                <img src={require('@/static/img/home/left/storedEnergy.png')} className="icon"/>
                <div className='chartTitle'>储能 总装机容量kWh</div>
              </div>
            </div>
            <div className='chartVal'>552</div>
          </div>
        </div> */}
        <div className="leftBox installCapacity">
          <PowerInstallLiquid></PowerInstallLiquid>
        </div>
        <HistoryElecCalc></HistoryElecCalc>
      </div>

      <div className="center">
        <div className="centerBox powerInfoWrapper">
          {/* <div className='machineCircleWrapper '>
            <PowerInfo></PowerInfo> 
          </div> */}
          <PowerInfo></PowerInfo>
          <EnvInfo></EnvInfo>
          <div className="factoryTitle ">来宾市城东污水处理厂</div>
        </div>
      </div>

      <div className="right">
        <div className="rightBox electricCalc">
          <RealData toggleShowRealData={toggleShowRealData}></RealData>
        </div>
        {isShowRealData ? (
          <RealDataDesc></RealDataDesc>
        ) : (
          <div className="righBlock">
            <div className="rightBox electricPie">
              <ElectricPie></ElectricPie>
            </div>
            <div className="rightBox incomeTrendChart">
              <div className="iconTitle">
                <div className="chartTitle">近30天绿能收益趋势</div>
                <div className="iconRight">
                  <div className="text">创造收益总值</div>
                  <div className="val">655224</div>
                </div>
              </div>
              <IncomeTrendChart></IncomeTrendChart>
            </div>
            <div className="rightBox powerLineChart">
              <PowerLineChart></PowerLineChart>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
