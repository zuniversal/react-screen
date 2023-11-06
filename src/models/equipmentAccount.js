import { init, action } from '@/utils/createAction';
import * as services from '@/services/equipmentAccount';
import { getRegion } from '@/services/amap';
import { createIndexArr, formatSelectList } from '@/utils';
import moment from 'moment';

const namespace = 'equipmentAccount';
const { createActions, createAction } = init(namespace);

const otherActions = [];

const batchTurnActions = [];

// export const actions = {
//   ...createActions(otherActions, batchTurnActions),
// };

// console.log(' actions ： ', actions,  )//
export const mapStateToProps = state => state[namespace];

const createDay = num => {
  const dayArr = createIndexArr(num)
    .reverse()
    .map(
      v =>
        `${moment()
          .subtract(v + 1, 'days')
          .format('YYYY-MM-DD')}`,
    );
  return dayArr;
};
const create7Day = createDay(7);
const create30Day = createDay(30);
console.log(' create30Day ： ', create7Day, create30Day);

const formatRegion = (payload = {}, valueKey = 'adcode') => {
  return payload.data[0]?.districts.map(v => ({
    ...v,
    label: v.name,
    value: v[valueKey],
    value: v.name,
  }));
};

const model = {
  namespace,

  state: {
    action: '',
    isShowModal: false,
    dataList: [],
    count: 0,
    itemDetail: {},

    provinceList: [],
    cityList: [],
    countryList: [],
    isShowDetail: false,
    dataInfo: {},
    chartData: [],
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
      console.log(' payload ： ', payload);
      return {
        ...state,
        dataList: payload.data,
        count: payload.total,
        isShowModal: false,
      };
    },
    getItem(state, { payload, type }) {
      console.log(' getItemgetItem ： ', payload);
      return {
        ...state,
        action: !!payload.payload.isShowDetail
          ? 'detail'
          : payload.payload.action,
        isShowModal: true,
        itemDetail: payload.data,
        isShowDetail: !!payload.isShowDetail,
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
          ...(v.id !== payload.payload.id ? payload : v),
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
    setAttrs(state, { payload, type }) {
      console.log(' setAttrs ： ', payload, type);
      return {
        ...state,
        ...payload,
      };
    },
    getProvinceList(state, { payload, type }) {
      console.log(' getProvinceList ： ', payload, type);
      const provinceList = formatRegion(payload);
      return {
        ...state,
        provinceList,
      };
    },
    getCityList(state, { payload, type }) {
      console.log(' getCityList ： ', payload, type);
      const cityList = formatRegion(payload, 'citycode');
      return {
        ...state,
        cityList,
      };
    },
    getCountryList(state, { payload, type }) {
      console.log(' getCountryList ： ', payload, type);
      const countryList = formatRegion(payload, 'citycode');
      return {
        ...state,
        countryList,
      };
    },
    getDataDetail(state, { payload, type }) {
      console.log(' getDataDetail ： ', payload, type);
      const { info, list } = payload.data;
      const chartData = {
        xAxis: [],
        xAxis: [],
        pvDischarge: [],
      };
      const dayMap = {
        7: create7Day,
        30: create30Day,
      };
      const dayXAxisMap = dayMap[payload.payload.query];
      const xAxis = dayXAxisMap ? dayXAxisMap : list.map(v => v.uptime);
      console.log(' dayXAxisMap xAxis ： ', dayXAxisMap, xAxis);
      if (dayXAxisMap) {
        chartData.xAxis = dayXAxisMap;
        chartData.data = [
          dayXAxisMap.map(day => {
            const res = list.find(v => v.uptime == day);
            // console.log(' dayXAxisMap res ： ', res, list, day);
            return res ? res.pv_charge : 0;
          }),
          dayXAxisMap.map(day => {
            const res = list.find(v => v.uptime == day);
            return res ? res.pv_discharge : 0;
          }),
        ];
      } else {
        chartData.xAxis = list.map(v => v.uptime);
        chartData.data = [
          list.map(v => v.pv_charge),
          list.map(v => v.pv_discharge),
        ];
      }

      return {
        ...state,
        isShowModal: true,
        action: payload.payload.action,
        itemDetail: payload.payload.extraData,
        dataInfo: info,
        chartData,
      };
    },
  },

  effects: {
    *getListAsync({ payload, action, type }, { call, put, select }) {
      console.log(' getListAsync ： ', payload, action, type);
      const { searchInfo } = yield select(state => state[namespace]);
      const params = {
        ...searchInfo,
        ...payload,
      };
      console.log(
        ' getListAsync  payload ： ',
        payload,
        searchInfo,
        action,
        params,
      );
      const res = yield call(services.getList, params);
      yield put({ type: 'getList', payload: { ...res, searchInfo: params } });
    },
    *getItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.getItem, payload);
      yield put(action({ ...res, payload }));
    },
    *addItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.addItem, payload);
      yield put({ type: 'getListAsync' });
    },
    *editItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.editItem, payload);
      yield put({ type: 'getListAsync' });
    },
    *removeItemAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.removeItem, payload);
      yield put({ type: 'getListAsync' });
    },
    *getProvinceListAsync({ payload, action, type }, { call, put }) {
      const res = yield call(getRegion, payload);
      yield put({ type: 'getProvinceList', payload: { ...res, payload } });
    },
    *getCityListAsync({ payload, action, type }, { call, put }) {
      const res = yield call(getRegion, payload);
      yield put({ type: 'getCityList', payload: { ...res, payload } });
    },
    *getCountryListAsync({ payload, action, type }, { call, put }) {
      const res = yield call(getRegion, payload);
      yield put({ type: 'getCountryList', payload: { ...res, payload } });
    },
    *getDataDetailAsync({ payload, action, type }, { call, put }) {
      const res = yield call(services.getDataDetail, {
        id: payload.id,
        query: payload.query,
      });
      yield put({ type: 'getDataDetail', payload: { ...res, payload } });
    },
  },
};

export const actions = createAction(model);

export default model;
