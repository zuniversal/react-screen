import { init } from '@/utils/createAction';
import {
  setItem,
  getItem,
  removeItem,
  getItems,
  setItems,
  dataURLtoFile,
} from '@/utils';
// import * as services from '@/services/user';
import * as commonServices from '@/services/common';
import * as alarmRecordServices from '@/services/alarmRecord';
import { history } from 'umi';
import {
  HOME,
  CRM_HOME,
  CS_HOME,
  isDev,
  homeMap,
  guestModeRedirectMap,
  LOGIN,
  DEF_PALTFORM,
  ASSET_DETAIL,
  noGetUserInfoPath,
} from '@/constants';
import defaultProps, {
  managerRoutes,
  customerRoutes,
  PLATFORM,
  platformMap,
  isPlatformCRM,
} from '@/configs/routes';
import { AUTH_FAIL } from '@/utils/request';
// import authData from '@/configs/auth';
const namespace = 'user';
const { createAction, createDispatch } = init(namespace);

const otherActions = [];

const batchTurnActions = ['onPlatformChange'];

export const userActions = actions;

// console.log(' actions ： ', actions,  )//
export const mapStateToProps = state => state[namespace];

const userInfo = getItem('userInfo') ? getItem('userInfo') : {};
// console.log(' userInfo ： ', userInfo);

export const getClientId = props => {
  const userInfo = getItem('userInfo');
  // const customer_id = getItem('guestModeId') || userInfo.id;
  const customer_id =
    getItem('guestModeId') || userInfo.enterprises[0]?.customers[0]?.id;
  return customer_id;
};

export const flatAuthTest = (data = []) => {
  // console.log(' flatAuthTest   ,   ： ', data, authData);
  const authConfig = {};
  data.forEach(v => {
    if (v.authKey) {
      authConfig[v.authKey] = v.authInfo;
    }
  });
  return authConfig;
};
// flatAuthTest(authData)

export const flatAuth = (authData = {}, authConfig = {}) => {
  // console.log(
  //   '  getRoutes(authData) flatAuthflatAuth   ,   ： ',
  //   authData,
  //   authConfig,
  // );
  Object.keys(authData).forEach(authKey => {
    authConfig[authKey] = authData[authKey].perms;
    // if (Object.keys(authData[authKey].sub).length) {
    if (authData[authKey].sub && Object.keys(authData[authKey].sub).length) {
      flatAuth(authData[authKey].sub, authConfig);
    }
  });
  return authConfig;
};

export const recursiveAuth = (data = [], authData = {}) => {
  // console.log(' Layouts  recursiveAuth   ,   ： ', data, authData);
  return data.map(v => ({
    // hideInMenu: isDev
    //   ? false
    //   : !(v.authKey ? authData[v.authKey]?.perms.module : true),
    // hideInMenu: !(v.authKey && authData[v.authKey]
    //   ? authData[v.authKey]?.module
    //   : false),
    // hideInMenu: false,
    authInfo: authData[v.authKey] ?? {},
    ...v,
    // routes: recursiveAuth(v.routes, authData[v.authKey]?.sub),
    routes:
      v.routes && v.routes.length > 0
        ? recursiveAuth(v.routes, authData)
        : v.routes,
  }));
};

const routesMap = {
  manager: managerRoutes,
  // manager: [...managerRoutes, ...customerRoutes],
  customer: customerRoutes,
};

const getRoutesMap = (text, dataMap) => {
  const val = dataMap[text];
  return val ? val : [];
};

// const getRoutesAuthMap = (routes, routesAuthMap = []) => {
//   return routes.forEach(v => {
//     [v.authKey]: v.authKey,
//     routes: recursiveAuth(v.routes, authData[v.authKey]?.sub),
//   });
// };

const getRoutes = (props = {}) => {
  const userInfo = getItem('userInfo') ?? {};
  // console.log(' userInfo ： ', userInfo, props); //
  // const routes = isDev
  //   ? [...managerRoutes, ...customerRoutes]
  //   : // ? [...customerRoutes]
  //     getRoutesMap(userInfo.accountType, routesMap);
  // const routes = getRoutesMap(userInfo.accountType, routesMap);
  const routes = getRoutesMap('manager', routesMap);
  // console.log(
  //   ' getRoutes   userInfo,   ： ',
  //   userInfo,
  //   userInfo.accountType,
  //   routes,
  //   props,
  // );
  const { platform = PLATFORM } = props; //
  // console.log(' platform ： ', platform); //
  // const routesConfig = recursiveAuth(routes, authData);
  const routesConfig = recursiveAuth(routes, flatAuth(props?.perms)).map(v => ({
    ...v,
    hideInMenu: v.cb
      ? v.cb()
      : v.platform
      ? (v.platform && v.platform !== platform) || v.hideInMenu
      : // : false,
        v.hideInMenu,
    // hideInMenu: false,
  }));
  const routesData = {
    route: {
      path: '/',
      // routes: routes,
      routes: routesConfig,
    },
    location: {
      pathname: '/',
    },
  };
  return routesData;
};

// const routesData = getRoutes(authData);
// console.log(
//   ' getRoutes(authData) ： ',
//   routesData,
//   recursiveAuth(routesData.route.routes, authData),
//   flatAuth(authData),
// );

const model = {
  namespace,

  state: {
    action: '',
    isShowModal: false,
    dataList: [],
    count: 0,
    itemDetail: {},
    // userInfo: userInfo
    //   ? {
    //       ...userInfo,
    //       logo: userInfo.logo
    //         ? 'data:image/jpeg;base64,' + userInfo.logo
    //         : userInfo.logo,
    //     }
    //   : userInfo,
    userInfo,
    authInfo: {},
    accountType: 'customer',
    accountType: 'manager',
    // getRoutes: getRoutes()[0],
    getRoutes: getRoutes(getItem('userInfo') || {}),
    system: 'OM',
    userMsg: [],
  },

  reducers: {
    showFormModal(state, { payload, type }) {
      console.log(' showFormModal 修改  ： ', state, payload, type);
      return {
        ...state,
        isShowModal: true,
        action: payload.action,
      };
    },
    onCancel(state, { payload, type }) {
      console.log(' onCancel 修改  ： ', state, payload, type);
      return {
        ...state,
        isShowModal: false,
        itemDetail: {},
      };
    },
    getList(state, { payload, type }) {
      return {
        ...state,
        dataList: payload.list,
        count: payload.rest.count,
        isShowModal: false,
      };
    },
    getItem(state, { payload, type }) {
      console.log(' getItemgetItem ： ', payload);
      return {
        ...state,
        action: payload.payload.action,
        isShowModal: true,
        d_id: payload.payload.d_id,
        itemDetail: payload.bean,
      };
    },
    addItem(state, { payload, type }) {
      return {
        ...state,
        dataList: [payload.bean, ...state.dataList],
        isShowModal: false,
        count: state.count + 1,
      };
    },
    editItem(state, { payload, type }) {
      return {
        ...state,
        dataList: state.dataList.map(v => ({
          ...(v.id !== payload.payload.d_id ? payload : v),
        })),
        isShowModal: false,
      };
    },
    removeItem(state, { payload, type }) {
      const removeList = payload.payload.filter(v => v.id);
      return {
        ...state,
        dataList: state.dataList.filter(v =>
          removeList.some(item => v.id === item),
        ),
      };
    },
    getAlarmRecordList(state, { payload, type }) {
      console.log(' payload ： ', payload);
      return {
        ...state,
        userMsg: payload.data.map(v => ({
          ...v,
          // formatDuring: formatDuring(v.duration),
        })),
      };
    },
    getUserInfo(state, { payload, type }) {
      console.log(' getUserInfo ： ', payload, payload.data.logo);
      setItem('userInfo', payload.data);
      // const { logo } = payload.data;

      return {
        ...state,
        userInfo: payload.data,
        // userInfo: {
        //   ...payload.data,
        //   // logo: dataURLtoFile(
        //   //   'data:image/jpeg;base64,' + payload.data.logo,
        //   //   'logo',
        //   // ),
        //   // logo: window.atob(payload.data.logo),
        //   logo: logo ? 'data:image/jpeg;base64,' + logo : logo,
        // },
      };
    },
  },

  effects: {
    *loginAsync({ payload, action, type }, { call, put }) {
      console.log(' loginAsync ： ');
      const res = yield call(commonServices.login, payload);
      console.log(' loginAsync ： ', res, payload, action);
      if (res.data) {
        setItem('token', res.data.token, true);
        yield put({
          type: 'login',
          payload: res.data,
        });
        yield put({
          type: 'getUserInfoAsync',
          payload: { id: res.data.user_id },
        });
        history.push('/om/equipmentAccount');
      }
    },
    *changePwdAsync({ payload, action, type }, { call, put }) {
      console.log(' changePwdAsync ： ', res, payload, action);
      const res = yield call(commonServices.changePwd, payload);
      if (res.data) {
        history.push('/om/equipmentAccount');
      }
    },
    *getUserInfoAsync({ payload, action, type }, { call, put }) {
      console.log(' getUserInfoAsync ： ', res, payload, action);
      const res = yield call(commonServices.getUserInfo, payload);
      yield put({ type: 'getUserInfo', payload: { ...res, payload } });
    },
    *editUserInfoAsync({ payload, action, type }, { call, put }) {
      console.log(' editUserInfoAsync ： ', res, payload, action);
      const res = yield call(commonServices.editUserInfo, payload);
      yield put({ type: 'getUserInfoAsync', payload: { id: payload.id } });
    },
    *getAlarmRecordListAsync({ payload, action, type }, { call, put }) {
      const res = yield call(alarmRecordServices.getList, payload);
      yield put({ type: 'getAlarmRecordList', payload: { ...res, payload } });
    },
  },

  subscriptions: {
    setup: props => {
      const { dispatch, history } = props;
    },
  },
};

export const actions = createAction(model);

export const mapDispatchToProps = createDispatch(model);

export default model;
