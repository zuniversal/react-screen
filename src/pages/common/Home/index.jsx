import React from 'react';
import './style.less';
import {
  recentPowerAxisConfig,
  powerMoneyAxisConfig,
  dayHoursNum,
} from '@/configs';
import LineEcharts from './LineEcharts';
import IncomeTrendChart from './IncomeTrendChart';
import PowerLineChart from './PowerLineChart';
import HistoryElecChart from './HistoryElecChart';
import PowerPie from './PowerPie';
import PowerLiquid from './PowerLiquid';
import EnergyCalc from './EnergyCalc';
import EnvInfo from './EnvInfo';
import PowerInfo from './PowerInfo';
import RealData from './RealData';
import ElectricPie from './ElectricPie';
import logo from '@/static/img/home/logo.png';
import sandglass from '@/static/img/home/left/sandglass.png';
import shine from '@/static/img/home/left/shine.png';
import pv from '@/static/img/home/left/pv.png';
import storedEnergy from '@/static/img/home/left/storedEnergy.png';

const IconTitle = props => {
  return (
    <div className='iconTitle'>
      <img src={props.logo} alt=""/>
      <img src={require('@/static/img/home/left/pv.png')} alt=""/>
      <div className='title'>{props.title}</div>
      {/* <div className='subTitle'>{props.subTitle}</div> */}
    </div>
  );
};

const Home = props => {

  return (
    <div className="home">
      <div className='systemTitle'>
        <img src={logo} alt=""/>
        <div className='title'>
          中宇清能 安钒达光储碳系统
        </div>
      </div>
      <div className='left'>
        <div className='borderBox calcInfo'>
          <div className='leftBox energyCalc'>
            <EnergyCalc></EnergyCalc>
          </div>
          <div className='leftBox carbonAssets'>
            <img src={sandglass} className="sandglass"/>
            <div className='chartTitle'>累计碳资产</div>
            <div className='carbonValWrapper'>
              <div className='carbonVal'>566854</div>
              <img src={shine} className="shine"/>
            </div>
          </div>
        </div>
        <div className='leftBox installCapacity'>
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
        </div>
        <div className='leftBox historyElecCalc'>
          <div className='iconTitle'>
            <div className=''>
              <img src={require('@/static/img/home/left/historyElecCalc.png')} className="icon"/>
              <div className='chartTitle'>历史7天电量统计</div>
            </div>
          </div>
          <HistoryElecChart></HistoryElecChart>
        </div>
      </div>
      
      {/* <div className='center'>
        <div className='centerBox powerInfoWrapper'>
          <div className='machineCircleWrapper '>
            <div className='machineCircle '>
              <PowerInfo></PowerInfo> 
            </div>
          </div>
          <EnvInfo></EnvInfo>
          <div className='factoryTitle '>来宾市城东污水处理厂</div>
        </div>
      </div>

      <div className='right'>
        <div className='rightBox electricCalc'>
          <RealData></RealData>
        </div>
        <div className='rightBox electricPie'>
          <ElectricPie></ElectricPie>
        </div>
        <div className='rightBox incomeTrendChart'>
          <div className='iconTitle'>
            <div className='chartTitle'>当月收益趋势</div>
            <div className='iconRight'>
              <div className='text'>创造收益总值</div>
              <div className='val'>655224</div>
            </div>
          </div>
          <IncomeTrendChart></IncomeTrendChart>
        </div>
        <div className='rightBox powerLineChart'>
          <PowerLineChart></PowerLineChart>
        </div>

      </div> */}
    </div>
  );
};

export default Home;
