import './style.less';
import PowerPie from './PowerPie';
import battery from '@/static/img/urgent/battery.png';
import money from '@/static/img/urgent/money.png';

const configs = [
  {
    icon: battery,
    title: '峰平谷电量',
    unit: '度',
    dataKey: 'ep',
    infos: [
      {
        text: '总电量 : ',
        val: '2916.00',
        key: 'epSum',
        unit: '度',
      },
      {
        text: ' ',
        val: ' ',
        unit: ' ',
      },
    ],
  },
  {
    icon: money,
    title: '峰平谷电费',
    unit: '元',
    dataKey: 'fee',
    infos: [
      {
        text: '总电费 : ',
        val: '2294.47',
        key: 'feeSum',
        unit: '元',
      },
      {
        text: '平均电费 : ',
        val: '0.79',
        key: 'feeAvg',
        unit: '元/度',
      },
    ],
  },
];

const ElectricPie = props => {
  const { electricFee } = props;
  // useEffect(() => {
  //   props.getElectricFeeAsync({
  //     sn: '00018469010327',
  //   });
  // }, []);

  return (
    <div className="rightBox electricPie">
      {configs.map((item, index) => (
        <div className="flexBorderBox electricPieItemWrapper" key={index}>
          <div className="electricPieItem">
            <div className="iconTitle">
              <div className="df">
                <img src={item.icon} className="icon" />
                <div className="chartTitle">{item.title}</div>
              </div>
            </div>
            <PowerPie
              {...props}
              data={electricFee[item.dataKey]}
              unit={item.unit}
            ></PowerPie>
          </div>
          <div className="electricPieInfoWrapper">
            {item.infos.map((v, i) => (
              <div className="electricPieInfoRow" key={i}>
                <div className="text">{v.text}</div>
                {/* <div className="val">{v.val} {v.unit}</div> */}
                <div className="val">
                  {props.electricFee[v.key]} {v.unit}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ElectricPie;
// export default connect(mapStateToProps, mapDispatchToProps)(ElectricPie);
