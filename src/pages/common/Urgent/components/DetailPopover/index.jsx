import temperature from '@/static/img/home/center/temperature.png';
import humidity from '@/static/img/home/center/humidity.png';
import './style.less';

const config1 = [
  {
    label: '当前电量',
    valKey: 'val1',
    unit: 'kWh',
  },
  {
    label: '当前电压',
    valKey: 'val2',
    unit: 'V',
  },
  {
    label: '当前电流',
    valKey: 'val3',
    unit: 'A',
  },
  {
    label: '累计充电量',
    valKey: 'val4',
    unit: 'kWh',
  },
];

const config2 = [
  {
    label: '状态',
    valKey: 'val①',
    valKey: 'val5',
  },
];

const config3 = [
  {
    text: '环境温度°C ',
    val: '18',
    valKey: 'temperature',
    key: 'temperature',
    src: temperature,
  },
  {
    text: '环境湿度%',
    val: '72',
    valKey: 'humidity',
    key: 'humidity',
    src: humidity,
  },
];

const DetailEnvInfo = props => {
  return (
    <div className="detailEnvInfo ">
      {props.config.map((v, i) => (
        <div className="envInfoItem" key={i}>
          <div className="envInfoIconWrapper">
            <img src={v.src} className="envInfoIcon" />
          </div>
          <div className="text">{v.text}</div>
          <div className="val">{props.data[v.valKey]}</div>
        </div>
      ))}
    </div>
  );
};

const InfoItem = props => {
  return (
    <div className={`infoItem`}>
      <div className="label">{props.label}</div>
      <span className="val">
        {props.data[props.valKey]}
        {props.unit}
      </span>
    </div>
  );
};

const DetailPopover = props => {
  const data = {
    val1: '120',
    val2: '120',
    val3: '120',
    val4: '120',
    val5: '充电中',
    temperature: '72',
    humidity: '18',
  };
  return (
    <div className="detailPopover">
      <div className="point">{props.data.label}</div>
      <div className="detailPopoverColWrapper">
        <div className="detailPopoverCol">
          {config1.map((v, i) => (
            <InfoItem key={i} {...v} data={data}></InfoItem>
          ))}
        </div>
        <div className="detailPopoverCol">
          {config2.map((v, i) => (
            <InfoItem key={i} {...v} data={data}></InfoItem>
          ))}
        </div>
      </div>
      <div className="divider"></div>
      <div className="detailPopoverCol">
        <DetailEnvInfo config={config3} data={data}></DetailEnvInfo>
      </div>
    </div>
  );
};

export default DetailPopover;
