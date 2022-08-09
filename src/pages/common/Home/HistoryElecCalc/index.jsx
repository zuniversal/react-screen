import React from 'react';
import './style.less';
import HistoryElecChart from './HistoryElecChart';
  
const HistoryElecCalc = props => {
  return <div className='leftBox historyElecCalc'>
    <div className='iconTitle'>
      <div className=''>
        <img src={require('@/static/img/home/left/historyElecCalc.png')} className="icon"/>
        <div className='chartTitle'>历史7天电量统计</div>
      </div>
      <div className='colorIntroWrapper'>
        {[
          {
            class: 'introBlue', 
            text: '储能用电', 
          },
          {
            class: 'introOrange', 
            text: '市网用电', 
          },
          {
            class: 'introGreen', 
            text: '绿能用电', 
          },
        ].map((v, i) => (<div className={`colorIntroItem ${v.class}`} key={i} >{v.text}</div>))}
      </div>
    </div>
    <HistoryElecChart {...props}></HistoryElecChart>
  </div>
};

HistoryElecCalc.defaultProps = {};

export default HistoryElecCalc;
