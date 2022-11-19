import React from 'react';
import './style.less';
import p00 from "@/static/img/home/center/00.png";
import p01 from "@/static/img/home/center/01.png";
import p02 from "@/static/img/home/center/02.png";
import p10 from "@/static/img/home/center/10.png";
import p11 from "@/static/img/home/center/11.png";
import p12 from "@/static/img/home/center/12.png";
import p20 from "@/static/img/home/center/20.png";
import p21 from "@/static/img/home/center/21.png";
import p22 from "@/static/img/home/center/22.png";
import battery from "@/static/img/home/center/battery.png";
import water from "@/static/img/home/center/water.png";
import { createIndexArr } from "@/utils";
import ReactSeamlessScroll from "react-seamless-scroll";

const configs1 = [
  {
    text: "PV1电压",
    val: "127.3V",
    key: "pv1_voltage",
    unit: "V",
  },
  {
    text: "PV1电流",
    val: "11.OA",
    key: "pv1_current",
    unit: "A",
  },
  {
    text: "PV2电压",
    val: "125.4V",
    key: "pv2_voltage",
    unit: "V",
  },
  {
    text: "PV2电流",
    val: "10.9A",
    key: "pv2_current",
    unit: "A",
  },
];

const configs2 = [
  {
    text: "负载功率",
    val: "227.0W",
    key: "pe",
    unit: "W",
  },
];

const configs3 = [
  {
    text: "电池电流",
    val: "-16.0A",
    key: "current",
    unit: "A",
  },
  {
    text: "电池电压",
    val: "52.5V",
    key: "voltage",
    unit: "V",
  },
];

const configs4 = [
  {
    text: "电网电流",
    val: "6.5A",
    key: "current",
    unit: "A",
  },
  {
    text: "电网电压",
    val: "232.6V",
    key: "voltage",
    unit: "V",
  },
];

const configs = [
  {
    infos: configs1,
    // src: require('@/static/img/home/center/pvBlue.png'),
    key: "pv",
    class: "pvBlue",
  },
  {
    infos: configs2,
    // src: require('@/static/img/home/center/house.png'),
    key: "ld",
    class: "house",
  },
  {
    infos: configs3,
    // src: require('@/static/img/home/center/batteryBlue.png'),
    key: "ps",
    class: "batteryBlue",
  },
  {
    infos: configs4,
    // src: require('@/static/img/home/center/tower.png'),
    key: "gd",
    class: "tower",
  },
];

const statusMap = {
  "00": p00,
  "01": p01,
  "02": p02,
  10: p10,
  11: p11,
  12: p12,
  20: p20,
  21: p21,
  22: p22,
};

const LightDots = ({ noLightBg }) => (
  <div className="lightDotWrapper ">
    {createIndexArr(10).map((v, i) => (
      <div key={i} className={`${noLightBg ? "noLightBg" : ""} lightDot`}></div>
    ))}
  </div>
);
const InfiniteLight = ({ direction, noAnimate, data }) => {
  const lightDots = (
    <>
      {/* <marquee
        className="lightMarquee "
        width="100%"
        scrolldelay="0"
        scrollamount="5"
        loop="infinite"
        direction={data == 1 ? "left" : "right"}
      >
        <LightDots noLightBg={data == 0} />
      </marquee> */}
      {data == 0 && <div className="dashLine"></div>}
    </>
  );
  return data == 0 ? (
    lightDots
  ) : (
    <ReactSeamlessScroll
      delay="0"
      singleWaitTime="0"
      list={createIndexArr(20)}
      className="lightMarquee"
      direction={data == 1 ? "left" : "right"}
      reverse={data != 1}
      mode="horizontal"
    >
      {createIndexArr(20).map((v, i) => (
        <div key={i} className={`${""} lightDot`}></div>
      ))}
    </ReactSeamlessScroll>
  );
  return (
    <>
      <marquee
        className="lightMarquee "
        width="100%"
        scrolldelay="0"
        scrollamount="5"
        loop="infinite"
        direction={data == 1 ? "left" : "right"}
      >
        <LightDots noLightBg={data == 0} />
      </marquee>
      {data == 0 && <div className="dashLine"></div>}
    </>
  );
  // return data == 0 ? lightDots : <><marquee className="lightMarquee " width="100%" scrolldelay="0" scrollamount="5" loop="infinite" direction={data == 1 ? 'left' : 'right'}>{lightDots}</marquee><div className="dashLine"></div></>
};

// 光伏 只有电压没有电流，说明不发电了，所以虚线就不动。(有电流就流向中间  光伏电流需要同时判断 pv1、pv2. 都为0就不动了，否则流向中心)
// 储能 充电1，放电2，待机0  放电 储能流向中间，充电 中间流向储能
// 负载 负载不为0中间流向负载，否则不动
// 电网 电流 >0中间流向电网 0线不动，<0时电网流向中间

const PowerInfo = (props) => {
  const { realStatus } = props;

  const isPVZero =
    realStatus.pv.pv1_current == 0 && realStatus.pv.pv2_current == 0;
  const isPVCls = isPVZero ? "noAnimate" : "";
  // const isEnergyCls = realStatus.ps.status == 0 ? 'noAnimate' : ''
  const textBgIndex = realStatus.ps.status;
  const isEnergyCls = {
    0: "noAnimate",
    1: "",
    2: "energyReverse",
  }[textBgIndex];
  const isLoadCls = realStatus.ld.pe != 0 ? "" : "noAnimate";
  const isElectricCls = realStatus.gd.current > 0 ? "" : "noAnimate";

  const pvStatus = isPVZero ? 0 : 2;
  const energyStatus = realStatus.ps.status;
  const loadStatus = realStatus.ld.pe != 0 ? 2 : 0;
  const electricStatus =
    realStatus.gd.current == 0 || realStatus.gd.current < 0 ? 0 : realStatus.gd.current > 0 ? 2 : 1;

  return (
    <div className="machineCircleWrapper ">
      {configs.map((item, index) => (
        <div className="powerInfoItem " key={index}>
          {/* <div className='powerInfoIconWrapper'>
        <img src={item.src} className="powerInfoIcon"/>
      </div> */}
          {item.infos.map((v, i) => (
            <div className="powerInfoRow" key={i}>
              <div className="text">{v.text}</div>
              {/* <div className="val">{v.val}</div> */}
              <div className="val">
                {props.realStatus[item.key][v.key] || 0}
                {v.unit}
              </div>
            </div>
          ))}
        </div>
      ))}
      <div className="machineCircle ">
        {/* <div className="innerWrapper">
          <div className={`inner inner1 ${isPVCls}`}></div>
          <div className={`inner inner2 ${isEnergyCls}`}></div>
          <div className={`inner inner3 ${isLoadCls}`}></div>
          <div className={`inner inner4 ${isElectricCls}`}></div>
          <div className={`inner inner1bg `}></div>
          <div className={`inner inner2bg `}></div>
          <div className={`inner inner3bg `}></div>
          <div className={`inner inner4bg `}></div>
        </div> */}
        <div className="innerWrapper lightWrapper">
          {/* <div className={`lightsBox lightsBox1 ${isPVCls}`}><InfiniteLight data={pvStatus} /></div>
          <div className={`lightsBox lightsBox2 ${isEnergyCls}`}><InfiniteLight data={energyStatus} /></div>
          <div className={`lightsBox lightsBox3 ${isLoadCls}`}><InfiniteLight data={loadStatus} /></div>
          <div className={`lightsBox lightsBox4 ${isElectricCls}`}><InfiniteLight data={electricStatus} /></div> */}
          <div className={`lightsBox lightsBox1`}>
            <InfiniteLight data={pvStatus} />
          </div>
          <div className={`lightsBox lightsBox2`}>
            <InfiniteLight data={loadStatus} />
          </div>
          <div className={`lightsBox lightsBox3`}>
            <InfiniteLight data={energyStatus} />
          </div>
          <div className={`lightsBox lightsBox4`}>
            <InfiniteLight data={electricStatus} />
          </div>
        </div>
        {/* <div className='circleRingWrapper2'>
      <div className='circleRingWrapper3'>
      <div className='circleRingWrapper'>
        <img src={require('@/static/img/home/center/circle1.png')} className="circleRing"/></div></div></div> */}

        {/* <img src={require('@/static/img/home/center/circle1.png')} className="circleRing"/></div> */}
        <div
          className={`circleRingWrapper circleRingWrapper2 textBg${textBgIndex}`}
        >
          <img
            src={statusMap[props.realStatus.status]}
            className="circleRing2"
          />
        </div>
        {/* <div className="centerMachineIcon">
          开机
        </div>  */}
        {/* <div className='circleRingWrapper circleRingWrapper3'><img src={require('@/static/img/home/center/circle1.png')} className="circleRing"/></div> */}
        <div className="centerMachineIcon">
          <img src={battery} className="centerIcon" />
          开机
        </div>
        {/* <div className="iconName iconName1">光伏</div>
        <div className="iconName iconName2">负载</div>
        <div className="iconName iconName3">储能</div>
        <div className="iconName iconName4">电网</div> */}
      </div>
    </div>
  );
  return (
    <div className="machineCircle ">
      {configs.map((item, index) => (
        <div className="powerInfoItem " key={index}>
          {/* <div className='powerInfoIconWrapper'>
        <img src={item.src} className="powerInfoIcon"/>
      </div> */}
          {item.infos.map((v, i) => (
            <div className="powerInfoRow" key={i}>
              <div className="text">{v.text}</div>
              <div className="val">{v.val}</div>
            </div>
          ))}
        </div>
      ))}
      {/* <img src={require('@/static/img/home/center/circle.png')} className="circleRing"/> */}
      <div className="centerMachineIcon">
        <img src={water} className="centerIcon" />
        开机
      </div>
    </div>
  );
};

export default PowerInfo;
