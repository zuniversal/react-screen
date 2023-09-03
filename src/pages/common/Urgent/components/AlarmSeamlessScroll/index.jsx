import ReactSeamlessScroll from 'react-seamless-scroll';
import { createIndexArr } from '@/utils';
import icon from '@/static/img/urgent/alarm.png';
import './style.less';

const config = [
  {
    point: 'A大楼',
    alarm: '监控设备告警',
    time: '5',
    type: '0',
  },
  {
    point: 'A大楼',
    alarm: '监控设备告警',
    time: '5',
    type: '0',
  },
  {
    point: 'B大楼',
    alarm: '设备告警',
    time: '5',
    type: '1',
  },
  {
    point: 'B大楼',
    alarm: '设备告警',
    time: '5',
    type: '0',
  },
  {
    point: 'A大楼',
    alarm: '监控设备告警',
    time: '5',
    type: '0',
  },
  {
    point: 'B大楼',
    alarm: '监控设备告警',
    time: '5',
    type: '1',
  },
];

const AlarmSeamlessItem = props => {
  return (
    <div className={`alarmSeamlessItem ${props.type == 1 ? 'warn' : 'error'}`}>
      <div className="label">
        点位： <span className="val">{props.point}</span>
      </div>
      <div className="label f2">
        告警： <span className="val">{props.alarm}</span>
      </div>
      <div className="label item3">
        时长： <span className="val">{props.time}分钟</span>
      </div>
    </div>
  );
};

const AlarmSeamlessScroll = props => {
  return (
    <div className="rightBox alarmSeamlessScroll">
      <div className="iconTitle">
        <div className="df">
          <img src={icon} className="icon" />
          <div className="chartTitle">监控告警</div>
        </div>
      </div>
      <div className="alarmSeamlessScrollWrapper">
        <ReactSeamlessScroll
          delay="0"
          singleWaitTime="0"
          list={createIndexArr(20)}
          direction={'up'}
          step={0.5}
          speed={20}
        >
          <div className={``}>
            {config.map((v, i) => (
              <AlarmSeamlessItem key={i} {...v}></AlarmSeamlessItem>
            ))}
          </div>
        </ReactSeamlessScroll>
      </div>
    </div>
  );
};

export default AlarmSeamlessScroll;
