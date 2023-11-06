import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { connect } from 'umi';
import { mapStateToProps, mapDispatchToProps } from '@/models/urgent';
import './style.less';
import './global.less';
import ClusterMarker from './ClusterMarker';
import MarkerIcon from './MarkerIcon';
import MapTools from './MapTools';
import LeftContent from './LeftContent';
import RightContent from './RightContent';
import SearchForm from './SearchForm';
import SystemTitle from './SystemTitle';
import DetailPopover from './components/DetailPopover';
import videoIcon from '@/static/img/urgent/video.png';
import CreatePortal from '@/components/Portal/CreatePortal';
import { CloseCircleOutlined } from '@ant-design/icons';

export let mapInstance;
let markerCluster;
let tableInfoWindow;
let popInfoWindow;
let markerList = [];
let defaultZoom = 5.5;
let defaultCenter = [105.397428, 34.3];

let indexes = 0;

const Urgent = props => {
  console.log(' Urgent ： ', props);
  const { dataList, customerList, pointList, customerItem } = props;
  const [isLoad, setIsLoad] = useState(false);
  const [isShowVideo, setIsShowVideo] = useState(false);

  /**
   * 移动到指定位置
   */
  const moveToPosition = (position = []) => {
    mapInstance.setZoomAndCenter(18, position);
  };

  const createMap = () => {
    // if (this.mapInstance) {
    //   return this.mapInstance;
    // }
    // if (!mapNode) return;
    // mapNode.style.width = `${this.props.width}px`;
    // const mapNode = document.createElement('div');
    // mapNode.className = 'mapBox'
    // document.body.appendChild(mapNode);
    // console.log(' mapNode ： ', mapNode,  )
    const mapNode = document.getElementsByClassName('mapBox')[0];
    mapInstance = new AMap.Map(mapNode, {
      zoom: defaultZoom,
      // zooms: [this.defaultZoom, 20],
      // center: this.defaultCenter,
      resizeEnable: true,
      pitch: 45, // 地图俯仰角度，有效范围 0 度- 83 度
      // rotation: 15,
      viewMode: '3D',
      mapStyle: 'amap://styles/852b41ec43aca7f9234571b282140fd2',
      mapStyle: 'amap://styles/a52a222ecfdcec6c6b10919738977a03',
    });
    setTimeout(() => {
      console.log('  延时器 ： ');
      props.setMapInstance(mapInstance);
    }, 2000);

    mapInstance.on('click', () => {
      console.log(' 点击了 ： ');
      clear();
    });
    // this.setState({
    //   inited: true,
    // });
    mapInstance;
    setIsLoad(true);
  };
  const renderDom = (content = <div />) => {
    const dom = document.createElement('div');
    render(content, dom);
    return dom;
  };
  const createInfoWindow = (content, offset = new AMap.Pixel(16, -45)) => {
    const infoWindow = new AMap.InfoWindow({
      isCustom: true, // 使用自定义窗体
      closeWhenClickMap: true,
      autoMove: false,
      anchor: 'bottom-left',
      content,
      offset,
    });
    return infoWindow;
  };
  const onHoverClusterMarker = (marker, markers) => {
    const position = marker.getPosition();
    const html = renderDom();
    // const html = renderDom(
    //   <div className="onHoverClusterMarker" style={{ background: 'red' }}>
    //     onHoverClusterMarker
    //     <div className="cell2 wave-ball"></div>
    //     <div className="cell2 active wave-ball-active"></div>
    //   </div>,
    // );
    if (!tableInfoWindow) {
      tableInfoWindow = createInfoWindow(html, new AMap.Pixel(25, -40));
    }
    tableInfoWindow.setContent(html);
    tableInfoWindow.open(mapInstance, position);
  };
  const renderClusterMarker = ({ count, marker, markers }) => {
    // console.log(' initMarkerCluster 2： ', count, marker, markers    )
    const infoMarkers = markers.map(item => item.getExtData());
    const content = renderDom(
      <ClusterMarker
        count={count}
        markers={infoMarkers}
        onMouseEnter={() => onHoverClusterMarker(marker, infoMarkers)}
        // onMouseLeave={this.delayCloseTableInfoWindow}
      />,
    );
    marker.setAnchor('center');
    marker.setzIndex(100);
    marker.setContent(content);
  };

  const closeTableInfoWindow = () => {
    tableInfoWindow && tableInfoWindow.close();
  };

  const closePopInfoWindow = () => {
    popInfoWindow && popInfoWindow.close();
  };
  const clear = () => {
    console.log(' clear ： ');
    closeTableInfoWindow();
    closePopInfoWindow();
  };
  /**
   * 初始化聚合插件
   */
  const initMarkerCluster = () => {
    console.log(' initMarkerCluster ： ');
    markerCluster = new AMap.MarkerClusterer(mapInstance, [], {
      gridSize: 90,
      renderClusterMarker: renderClusterMarker,
    });
    markerCluster.on('click', () => {
      clear();
    });
  };
  /**
   * 渲染地图标记点，人、车、户号
   */
  const renderDetailMarker = (item, selected = false) => {
    const { type, status } = item;
    let gray = false;
    const content = renderDom(
      <MarkerIcon
        {...item}
        selected={selected}
        gray={gray}
        type={type}
        error={false}
      />,
    );
    return content;
  };
  /**
   * 渲染地图点的弹窗
   */
  const renderPopInfoWindow = data => {
    console.log(' renderPopInfoWindow ： ', data, props.pointStatistics);
    // const { pointStatistics } = props;
    const { pointStatistics } = data;
    const { position } = data;
    let content = <div />;
    let offset = new AMap.Pixel(30, 100);
    let anchor = 'bottom-left';
    content = renderDom(
      // <div className="renderPopInfoWindow"  >
      //   <div className="wave-ball"></div>
      // </div>,
      <div className="renderPopInfoWindow">
        <DetailPopover
          pointStatistics={pointStatistics}
          data={data}
          key={pointStatistics}
        ></DetailPopover>
      </div>,
    );
    if (!popInfoWindow) {
      popInfoWindow = createInfoWindow(content, offset);
    }
    popInfoWindow.setContent(content);
    popInfoWindow.setAnchor(anchor);
    popInfoWindow.setOffset(offset);
    setTimeout(() => {
      popInfoWindow.open(mapInstance, position);
    }, 1000);
  };

  // 点击标记点居中定位
  const forcusMarker = marker => {
    marker.setTop(false);
    mapInstance.setCenter(marker.getPosition());
  };
  const onClickMarker = async record => {
    console.log(' onClickMarker ： ', record);
    const res = await props.getPointStatisticsAsync({ id: record.value });
    console.log('  onClickMarker await 结果  ：', res);
    renderPopInfoWindow({
      ...record,
      pointStatistics: res,
    });
    // renderPopInfoWindow(record);
  };
  /**
   * 基于数据创建标记点
   */
  const createMarkers = data => {
    return data.map(item => {
      const content = renderDetailMarker(item);
      // console.log(' content ： ', content,  )
      const marker = new AMap.Marker({
        position: item.position,
        anchor: 'center',
        extData: item,
        content,
      });

      marker.on('click', () => {
        forcusMarker(marker);
        onClickMarker(item);
      });
      return marker;
    });
  };
  /**
   * 初始化标记点
   */
  const initMarkerList = () => {
    const markers = createMarkers(props.customerList);
    console.log(
      'initMarkerList：',
      props.customerList,
      props.pointList,
      props.dataList,
      markers,
    );
    markerCluster.setMarkers(markers);
    markerList = markers;
  };
  const initMapUI = () => {
    const { scale = 1, isNormal = true } = props;
    // marker 聚合
    initMarkerCluster();

    const right = isNormal ? 850 : 690;
    // // 工具-罗盘
    // mapInstance.addControl(
    // 	new AMap.ControlBar({
    // 		theme: 'dark',
    // 		showZoomBar: false,
    // 		position: {
    // 			bottom: '110px',
    // 			right: `${right * scale}px`,
    // 			right: `100px`,
    // 		},
    // 	})
    // );

    // // 工具-缩放
    // AMapUI.loadUI(['control/BasicControl'], (BasicControl) => {
    // 	const right = isNormal ? 920 : 720;
    // 	mapInstance.addControl(
    // 		new BasicControl.Zoom({
    // 			//内置的dark主题
    // 			theme: 'dark',
    // 			//左下角
    // 			position: {
    // 				bottom: '106px',
    // 				right: `${right * scale}px`,
    // 				right: `120px`,
    // 			},
    // 			showZoomNum: false,
    // 		})
    // 	);
    // });
  };
  console.log(' useEffect1 ： ', props);
  useEffect(() => {
    console.log(' useEffect ： ');
    createMap();
    initMapUI();
    initMarkerList();
  }, []);
  useEffect(() => {
    if (props.customerList.length) {
      console.log(' 数据变化 customerList ： ', props.customerList);
      initMarkerList();
    }
  }, [props.customerList]);
  const setZoomAndCenter = position => {
    // mapInstance.setZoomAndCenter(18, ['121.429906', '31.181512']);
    mapInstance.setZoomAndCenter(18, position);
  };
  useEffect(() => {
    console.log(' useEffect ： ');
    props.setMapObj({
      renderPopInfoWindow,
      clear,
    });

    // setTimeout(() => {
    // 	console.log(' 移动 ： ');
    // 	mapInstance.setZoomAndCenter(18, ['121.429906', '31.181512']);
    // }, 5000);
  }, []);

  useEffect(() => {
    console.log(' useEffect ： ');
    props.getCustomerListAsync();
    // props.getPointListAsync();
    // props.getPointStatisticsAsync({ id: 1 });
    // props.getCustomerPointListAsync({ id: 1 });
    // props.getPointDetailAsync({ id: 1 });
    // props.registerAsync({
    //   username: 'zyb',
    //   password: '888',
    //   nickname: '庄宇彬',
    // });
    // props.loginAsync({
    //   username: 'zyb',
    //   password: '888',
    //   // scope: undefined,
    //   // client_id: undefined,
    //   // client_secret: undefined,
    // });
  }, []);

  return (
    <div className="mapBox amap-container urgentScreen">
      {isShowVideo && (
        <CreatePortal show={isShowVideo} className="fullScreenVideoWrapper">
          <video
            src="https://video.699pic.com/videos/33/75/00/a_xxGakty08C2R1589337500.mp4"
            className="fullScreenVideo"
            controls
          ></video>
          <div className="btnBlock">
            <CloseCircleOutlined
              onClick={() => setIsShowVideo(false)}
              style={{ fontSize: '60px' }}
            />
          </div>
        </CreatePortal>
      )}

      <div className="headerPic">
        <img
          src={videoIcon}
          className="videoIcon"
          onClick={() => setIsShowVideo(true)}
        />
      </div>
      {/* <DetailPopover></DetailPopover> */}
      <SystemTitle
        className="urgentSystemTitle"
        title={'中宇清能 安钒达楼宇数字应急储能系统'}
        title={' 安钒达楼宇数字应急储能系统'}
      ></SystemTitle>
      <LeftContent
        mapInstance={mapInstance}
        setZoomAndCenter={setZoomAndCenter}
      ></LeftContent>
      <RightContent></RightContent>
      <SearchForm
        dataList={dataList}
        customerList={customerList}
        pointList={pointList}
        getPointListAsync={props.getPointListAsync}
        getPointStatisticsAsync={props.getPointStatisticsAsync}
        onClickMarker={onClickMarker}
      ></SearchForm>
      {/* <MapTools
				scale={1}
				isNormal
				handleScale={() =>
					mapInstance.setZoomAndCenter(defaultZoom, defaultCenter)
				}
				handleLocation={() =>
					mapInstance.setZoomAndCenter(10, [121.555941, 31.178316])
				}
			/> */}
      <div className="bgPic"></div>
      {/* <div className="leftBox">bbb
				<div className="cell2"></div>
				<div className="cell2 active"></div>
			</div> */}
      <div id="mount"></div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Urgent);
