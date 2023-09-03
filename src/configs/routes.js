import React from 'react';
import { TabletOutlined, ScheduleFilled } from '@ant-design/icons';
import Icon from '@/components/Widgets/Icons';
import { LogoutOutlined, SwapOutlined } from '@ant-design/icons';
import SearchForm from '@/common/SearchForm';
import { isDev } from '@/constants';
import { getItem } from '@/utils';

const placeIcon = <Icon icon={''} className={'subIcon'} />;

export const CRM = 'crm';
export const PLATFORM = 'base';
export const DEF_BUSSNIESS_TAB = 'bp';

export const isPlatform = platform => getItem('platform') === platform;
export const isPlatformCRM = (platform = CRM) => isPlatform(platform);

export const platformMap = {
  manager: DEF_BUSSNIESS_TAB,
  customer: 'cs',
};

export const carManage = {
  platform: 'base',
  path: '/om/carManage',
  authKey: 'carManageModel',
  authKey: 'carInfoModel',
  name: '车辆管理',
  icon: <Icon icon={'systemManage'} />,
};

export const systemRoutes = [
  // carManage,
  {
    path: '/om/equipmentAcount',
    component: '@/pages/common/EquipmentAcount',
    name: '设备台账',
    icon: <Icon icon={'shiftsManage'} />,
  },
  {
    path: '/om/alarmStrategy',
    component: '@/pages/common/AlarmStrategy',
    name: '告警策略',
    icon: <Icon icon={'shiftsManage'} />,
  },
  {
    platform: 'iot',
    authKey: 'alarmRecord',
    path: '/om/alarmRecord',
    name: '告警记录',
    icon: <Icon icon={'shiftsManage'} />,
  },
];

export const homeRoutes = [
  {
    hideInMenu: isPlatformCRM,
    cb: isPlatformCRM,
    noAuth: true,
    path: '/om/home',
    name: '首页',
    icon: <Icon icon={'home'} />,
  },
];

export const managerRoutes = [
  // {
  //   path: '/dashBoard',
  //   name: '大屏展示',
  // },
  // {
  //   path: '/om/test',
  //   name: '开发测试',
  //   icon: <Icon icon={'test'} />,
  // },

  // {
  //   path: '/login',
  //   name: '登录页',
  //   icon: <Icon icon={'home'} />,
  // },

  // ...homeRoutes,
  ...systemRoutes,
];

export const customerRoutes = [
  // {
  //   noAuth: true,
  //   path: '/cs/home',
  //   name: '首页',
  //   icon: <Icon icon={'csHome'} />,
  // },
  {
    noAuth: true,
    path: '/cs/energyInfo',
    name: '用能概况',
    name: '首页',
    icon: <Icon icon={'home'} />,
  },
  {
    noAuth: true,
    hideInMenu: false,
    name: '能源监控',
    icon: <Icon icon={'alarmManage'} />,
    routes: [
      {
        noAuth: true,
        path: '/cs/electricInfo',
        name: '电气信息',
        // icon: <Icon icon={'csOrganize'} />,
      },
      {
        noAuth: true,
        path: '/cs/alarmNotify',
        name: '告警通知',
        name: '监控告警',
        // icon: <Icon icon={'msgList'} />,
      },
    ],
  },
  {
    noAuth: true,
    hideInMenu: false,
    name: '电站管理',
    icon: <Icon icon={'systemManage'} />,
    routes: [
      {
        noAuth: true,
        path: '/cs/powerStation',
        name: '我的电站',
        // icon: <Icon icon="powerStation" />,
      },
      {
        noAuth: true,
        path: '/cs/assets',
        name: '资产管理',
        // icon: <Icon icon={'csOrganize'} />,
      },
      {
        noAuth: true,
        path: '/cs/inspectRecord',
        name: '巡检记录',
        // icon: <Icon icon={'csInspectRecord'} />,
      },
      {
        noAuth: true,
        path: '/cs/bussniessRecord',
        name: '业务记录',
        // icon: <Icon icon={'bussniessRecord'} />,
      },
    ],
  },

  // {
  //   noAuth: true,
  //   path: '/cs/msgList',
  //   authKey: '',
  //   name: '消息列表',
  //   icon: <Icon icon={'msgList'} />,
  //   routes: [
  //   ],
  // },
  {
    noAuth: true,
    path: '/cs/clientReport',
    name: '客户报告',
    name: '我的报告',
    name: '分析报告',
    icon: <Icon icon={'csClientReport'} />,
  },
  {
    noAuth: true,
    path: '/cs/userCenter',
    path: '/om/userCenter',
    name: '个人中心',
    icon: <Icon icon={'csUserCenter'} />,
  },
  // {
  //   noAuth: true,
  //   path: '/cs/organize',
  //   name: '组织管理',
  //   icon: <Icon icon={'csOrganize'} />,
  // },
  // {
  //   path: '/cs/systemNotify',
  //   name: '系统通知',
  //   icon: <Icon icon={'msgList'} />,
  // },
];

export const csRoutes = {
  route: {
    path: '/',
    routes: customerRoutes,
  },
  location: {
    pathname: '/',
  },
};

export const routeTabConfig = [
  {
    value: 'bp',
    label: '智慧运维',
  },
  {
    value: 'smartEfficiency',
    label: '智慧能效',
    disable: 'cs',
  },
  {
    value: 'powerGrid',
    label: '微电网',
    disable: 'cs',
  },
];

export const isSmartOMS = val => routeTabConfig.some(v => v.value == val);
export const plaformFormat = val => (isSmartOMS(val) ? DEF_BUSSNIESS_TAB : val);

export default {
  route: {
    path: '/',
    routes: [],
  },
  location: {
    pathname: '/',
  },
};
