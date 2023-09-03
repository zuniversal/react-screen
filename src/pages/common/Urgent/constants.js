export const DispatchDataMap = {
  people: 'people',
  vehicle: 'vehicle',
  customer: 'customer',
};

export const DispatchDataList = [
  {
    label: '户号',
    value: DispatchDataMap.customer,
  },
  {
    label: '车辆',
    value: DispatchDataMap.vehicle,
  },
  {
    label: '人员',
    value: DispatchDataMap.people,
  },
];

export const RunStatusEnum = {
  normal: true,
  error: false,
};

export const RunStatusMap = {
  [RunStatusEnum.normal]: '正常',
  [RunStatusEnum.error]: '异常',
};

export const PeopleStatusEnum = {
  offline: 0,
  online: 1,
  // repairing: 2,
};

export const PeopleStatusMap = {
  [PeopleStatusEnum.offline]: '离线',
  [PeopleStatusEnum.online]: '在线',
  // [PeopleStatusEnum.empty]: '空闲',
  // [PeopleStatusEnum.checking]: '巡检中',
  // [PeopleStatusEnum.repairing]: '抢修中',
};

export const VehicleStatusEnum = {
  stop: 0,
  moving: 1,
  offline: 10,
  off: 20,
};

export const VehicleStatusMap = {
  [VehicleStatusEnum.stop]: '静止',
  [VehicleStatusEnum.moving]: '行驶',
  [VehicleStatusEnum.offline]: '离线',
  [VehicleStatusEnum.off]: '未启用',
};

export const RepairTaskEnum = {
  waiting_plan: {
    text: '待排期',
    key: 'waiting_plan',
  }, //
  waiting_confirm: {
    text: '待确认排期',
    key: 'waiting_confirm',
  },
  waiting_dispatch: {
    key: 'waiting_dispatch',
    text: '待派单',
  },
  in_process: {
    text: '处理中',
    key: 'in_process',
  },
  completed: {
    key: 'completed',
    text: '已完成',
  },
  hang_up: {
    key: 'hang_up',
    text: '挂起',
  },
  pending: {
    key: 'pending',
    text: '待处理',
  },
};

export const RepairTaskFilter = [
  RepairTaskEnum.pending.key,
  RepairTaskEnum.in_process.key,
  RepairTaskEnum.waiting_dispatch,
];

export const TabList = [
  {
    text: '抢修',
    value: 'repair',
  },
  {
    text: '告警',
    value: 'warning',
  },
  {
    text: '缺陷',
    value: 'defect',
  },
];

export const AlarmMap = {
  0: '',
  1: '三相电压过高',
  2: '三相电压过低',
  3: 'MD过高',
  4: '柜体温度过高',
  5: '环境温度过高',
  6: '环境湿度过高',
  7: '负载功率过高',
  8: '断电',
  9: '水浸',
  10: '累计功率因数过低',
  11: '三相电流过高',
  12: '断电报警(失联)',
};

export const AlarmLevel = { 0: '', 1: '黄色报警', 2: '红色报警' };

export const arrMapObj = arr => {
  const obj = {};
  arr.forEach(v => (obj[v.value] = v.label));
  return obj;
};

export const powerPointItemConfig = [
  {
    label: '线路号',
    value: 'line',
  },
  {
    label: 'A相电压',
    value: 'ua',
  },
  {
    label: 'B相电压',
    value: 'ub',
  },
  {
    label: 'C相电压',
    value: 'uc',
  },
  {
    label: 'A相电流',
    value: 'ia',
  },
  {
    label: 'B相电流',
    value: 'ib',
  },
  {
    label: 'C相电流',
    value: 'ic',
  },
  {
    label: 'A相功率',
    value: 'pa',
  },
  {
    label: 'B相功率',
    value: 'pb',
  },
  {
    label: 'C相功率',
    value: 'pc',
  },
  {
    label: '总功率',
    value: 'psum',
  },
  {
    label: 'A相无功功率',
    value: 'qa',
  },
  {
    label: 'B相无功功率',
    value: 'qb',
  },
  {
    label: 'C相无功功率',
    value: 'qc',
  },
  {
    label: '总无功功率',
    value: 'qsum',
  },
  {
    label: 'A相功率因数',
    value: 'pfa',
  },
  {
    label: 'B相功率因数',
    value: 'pfb',
  },
  {
    label: 'C相功率因数',
    value: 'pfc',
  },
  {
    label: '总功率因数',
    value: 'pfsum',
  },
  {
    label: '频率',
    value: 'fr',
  },
  {
    label: '有功需量',
    value: 'px',
  },
  {
    label: '感性无功',
    value: 'eq1',
  },
  {
    label: '容性无功',
    value: 'eq2',
  },
  {
    label: '总有功',
    value: 'ep',
  },
  {
    label: '线路温度',
    value: 'tc',
  },
  {
    label: '环境温度',
    value: 't',
  },
  {
    label: '环境湿度',
    value: 's',
  },
  {
    label: '时间',
    value: 'tm',
  },
];

export const powerPointItemMap = arrMapObj(powerPointItemConfig);

export const KeyTextMaps = {
  sumActiveEnergy: '累计有功电量',
  sumReactiveEnergy: '累计无功电量',
};

export const featureEnum = {
  aiops: '0', // 智慧运维
  aiEnergy: '1', // 智慧能效
  asset: '2', // 资产管理
  eleSafe: '8', // 电气安全
  bigData: '4', // 大数据分析
  eleNet: '6', // 微电网
};

export const LeftUrlMap = {
  account: 'https://epk.faladi.cn:31009/#/om/trustClient',
  station: 'https://epk.faladi.cn:31009/#/om/powerStation',
  monitor: 'https://epk.faladi.cn:31009/#/om/monitorManage',
  capacity: 'https://epk.faladi.cn:31009/#/om/assetsList',
  reach: 'https://epk.faladi.cn:31009/#/om/inspectRecord',
  exception: 'https://epk.faladi.cn:31009/#/om/missionsManage',
};
