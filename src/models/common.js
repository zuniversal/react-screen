import { init, action } from '@/utils/createAction';

import { tips } from '@/utils';
import moment from 'moment';

const namespace = 'common';
const { createActions } = init(namespace, true);

const otherActions = [
  // 'getEnumListAsync',
  // 'powerStationAsync',
  // 'clientAsync',
  // 'houseNoAsync',
  // 'powerStationDetailAsync',
  // 'houseNoDetailAsync',
  // 'clientDetailAsync',
  'showItemAsync',
];

const batchTurnActions = ['closeCommonModal'];

// export const commonActions = transferActions(otherActions,)
export const commonActions = {
  ...createActions(otherActions, batchTurnActions),
};

const serviceConfigMap = {};

const removeParams = (params, keys = []) => {
  console.log(' removeParams   ,   ： ');
  keys.forEach((v, i) => {
    delete params[v];
  });
};

const getService = params => {
  const {
    action,
    dettailSuffix = 'DetailAsync',
    serviceSuffix = 'Services',
    serviceKey,
  } = params;
  // const dettailSuffix = 'DetailAsync';
  // const serviceSuffix = 'Services';
  const actionSlice = action.split(dettailSuffix)[0];
  const serviceStr =
    serviceKey || action.split(dettailSuffix)[0] + serviceSuffix;
  console.log(
    ' getService   action,   ： ',
    params,
    action,
    actionSlice,
    serviceStr,
    serviceConfigMap,
    serviceConfigMap[serviceStr],
  );
  removeParams(params, ['dettailSuffix', 'serviceSuffix', 'serviceKey']);
  return serviceConfigMap[serviceStr];
};

// console.log(' actions ： ', actions,  )//
export const mapStateToProps = state => state[namespace];

const model = {
  namespace,

  state: {
    action: '',
    isShowCommonModal: false,
    itemDetail: {},
    commonModalContent: null,
    extraData: {},
  },

  reducers: {
    showCommonModal(state, { payload, type }) {
      console.log(' showCommonModal 修改  ： ', state, payload, type);
      return {
        ...state,
        isShowCommonModal: true,
        action: payload.action,
        commonModalContent: payload.content,
      };
    },
    closeCommonModal(state, { payload, type }) {
      console.log(' closeCommonModal 修改  ： ', state, payload, type);
      return {
        ...state,
        isShowCommonModal: false,
        itemDetail: {},
        commonModalContent: null,
      };
    },
  },

  effects: {
    *showItemAsync({ payload = {}, action, type }, { call, put }) {
      // const service = getService(payload.action);
      const service = getService(payload);
      console.log(' showItemAsync service ： ', service, payload);
      if (!payload.action || !service) {
        tips('请传入对应详情的action参数！', 2);
        return;
      }
      const res = !payload.noReq ? yield call(service.getItem, payload) : {};
      console.log(' showItemAsync service ： ', res, payload);
      let extraReqData;
      if (payload.extraReq) {
        extraReqData = yield call(
          service[payload.extraReq.url],
          payload.extraReq.params,
        );
      }

      yield put({
        type: `${payload.action.split('Async')[0]}`,
        payload: {
          ...res,
          payload,
          extraReqData,
        },
      });
    },
  },
};

export default model;
