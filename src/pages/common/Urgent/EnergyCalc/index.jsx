import './style.less';
import icon from '@/static/img/urgent/storeEnergyCalc.png';

export const greenEnergyConfig1 = {
  title: '绿能统计',
  key: 'today',
  infos: [
    {
      text: '今日发电量 kWh ',
      val: '2243.1',
      key: 'pv',
    },
    {
      text: '今日并网电量 kWh ',
      val: '567.2',
      key: 'gd',
    },
    {
      text: '今日消耗电量 kWh ',
      val: '584.7',
      key: 'ld',
    },
  ],
};

export const greenEnergyConfig2 = {
  title: '',
  key: 'this_month',
  infos: [
    {
      text: '本月发电量 kWh',
      val: '2243.1',
      key: 'pv',
    },
    {
      text: '本月并网电量 kWh',
      val: '567.2 ',
      key: 'gd',
    },
    {
      text: '本月消耗电量 kWh',
      val: '584.7',
      key: 'ld',
    },
  ],
};

export const storedEnergyConfig = {
  title: '储能统计',
  key: 'battery',
  infos: [
    {
      text: '充电量 kWh',
      val: '2243.1',
      key: 'charge',
    },
    {
      text: '放电量 kWh',
      val: '567.2',
      key: 'discharge',
    },
    {
      text: '充放电次数',
      val: '54',
      key: 'charge_nums',
    },
  ],
};

export const configs = [
  greenEnergyConfig1,
  greenEnergyConfig2,
  storedEnergyConfig,
];

const EnergyCalc = props => {
  console.log(' EnergyCalc props ： ', props);
  const { config = configs } = props;
  return (
    <div className="leftBox energyCalc">
      {config.map((item, index) => (
        <div className="content" key={index}>
          <div className="iconTitle">
            <div className="df">
              <img src={icon} className="icon" />
              <div className="chartTitle">{item.title}</div>
            </div>
          </div>
          <div className="itemBox">
            {item.infos.map((v, i) => (
              <div className="item" key={i}>
                <div className="text">{v.text}</div>
                {/* <div className='val'>{v.val}</div> */}
                <div className="val">
                  {props.statistics[item.key][v.key] || 0}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EnergyCalc;
