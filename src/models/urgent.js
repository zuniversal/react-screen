import { init } from '@/utils/createAction';
import * as services from '@/services/urgent';
import { nowYearMonthDayFull, toFixed } from '@/utils';
import moment from 'moment';
import { POWER_CURVE } from '@/pages/common/Home/PowerLineChart';
import * as dataJson from '@/constants/data.json';

const namespace = 'urgent';
const { createAction, createDispatch } = init(namespace);

const dataList = [
  {
    position: [121.737959, 31.15069],
    title: '庄宇彬家',
    type: 'customer',
  },
  {
    position: [120.737959, 30.15069],
    title: '庄宇彬家',
    type: 'customer',
  },
  {
    position: [121.71, 31.15069],
    title: '庄宇彬家',
    type: 'customer',
  },
  {
    position: [121.75, 31.15069],
    title: '庄宇彬家',
    type: 'customer',
  },
  {
    position: [121.78, 31.15069],
    title: '庄宇彬家',
    type: 'customer',
  },
  {
    position: [121.79, 31.15069],
    title: '庄宇彬家',
    type: 'customer',
  },
];

const model = {
  namespace,

  state: {
    mapInstance: {},
    mapObj: {},
    dataList: [],
    dataList: dataJson.default.data.list.map(v => ({
      position: [v[3], v[4]],
      title: v[1],
      type: 'customer',
    })),
    // dataList: dataList,
    dataList2: dataList,
    statistics: {
      today: {},
      this_month: {},
      battery: {},
    },
    powerInstallInfo: {
      pv: {},
      ps: {},
    },
    historyElecCalc: {
      storagEnergy: [],
      cityEnergy: [],
      greenEnergy: [],
      xAxisData: [],
    },
    incomeTrendInfo: {
      incomeData: [],
      xAxisData: [],
      sum: 0,
    },
    carbonAssets: {},
    realDataStatistics: {
      ep: 0,
      ep: 0,
    },
    realData: {},
    electricFee: {
      ep: [],
      fee: [],
      epSum: 0,
      feeSum: 0,
      feeAvg: 0,
    },
    powerlineParams: {
      start_time: `${nowYearMonthDayFull} 00:00:00`,
      end_time: `${nowYearMonthDayFull} 23:59:59`,
      query: POWER_CURVE,
    },
    powerlineInfo: [],
  },

  reducers: {
    saveNames(state, { payload, data }) {
      console.log(' saveNames ： ', state, payload, data);
      return {
        ...state,
        name: data,
      };
    },
    setMapInstance(state, { payload, data }) {
      console.log(' setMapInstance ： ', state, payload, data);
      return {
        ...state,
        mapInstance: data,
      };
    },
    setMapObj(state, { payload, data }) {
      console.log(' setMapObj ： ', state, payload, data);
      return {
        ...state,
        mapObj: data,
      };
    },
    getDataList(state, { payload, data }) {
      console.log(' getDataList ： ', state, payload, data);
      return {
        ...state,
        dataList: data,
      };
    },
    getStatistics(state, { payload, data }) {
      console.log(' getStatistics ： ', state, payload, data);
      return {
        ...state,
        statistics: data,
      };
    },
    getPVStatistics(state, { payload, data }) {
      console.log(' getPVStatistics ： ', state, payload, data);
      return {
        ...state,
        powerInstallInfo: data,
      };
    },
    getEle7days(state, { payload, data }) {
      console.log(' getEle7days ： ', state, payload, data);
      const storagEnergy = [];
      const cityEnergy = [];
      const greenEnergy = [];
      const xAxisData = [];
      data.forEach((v, i) => {
        storagEnergy.push(v.ps);
        cityEnergy.push(v.se);
        greenEnergy.push(v.ge);
        xAxisData.push(v.date);
      });
      return {
        ...state,
        historyElecCalc: {
          storagEnergy,
          cityEnergy,
          greenEnergy,
          xAxisData,
        },
      };
    },
    getGe30days(state, { payload, data }) {
      console.log(' getGe30days ： ', state, payload, data);
      const incomeData = [];
      const xAxisData = [];
      data.forEach((v, i) => {
        incomeData.push(v.fee);
        xAxisData.push(v.date);
      });
      const sum = toFixed(
        data.reduce((total, cuv) => total + cuv.fee, 0) * 0.9419,
      );
      return {
        ...state,
        incomeTrendInfo: {
          incomeData,
          xAxisData,
          sum,
        },
      };
    },
    getCarbonAssets(state, { payload, data }) {
      console.log(' getCarbonAssets ： ', state, payload, data);
      return {
        ...state,
        carbonAssets: data,
      };
    },
    getRealData(state, { payload, data }) {
      console.log(' getRealData ： ', state, payload, data);
      return {
        ...state,
        realData: {
          ...data,
          upTime: moment(data.uptime).format('YYYY-MM-DD HH:mm:ss'),
        },
      };
    },
    getRealDataStatistics(state, { payload, data }) {
      console.log(' getRealDataStatistics ： ', state, payload, data);
      return {
        ...state,
        realDataStatistics: data,
      };
    },
    getElectricFee(state, { payload, data }) {
      console.log(' getElectricFee ： ', state, payload, data);
      const c1 = { itemsTyle: { normal: { color: 'rgba(236, 78, 81)' } } };
      const c2 = { itemsTyle: { normal: { color: 'rgba(231, 178, 69)' } } };
      const c3 = { itemsTyle: { normal: { color: 'rgba(19, 208, 208)' } } };
      const c4 = { itemsTyle: { normal: { color: '#a1ce63' } } };
      const epSum = toFixed(data.ep.valley + data.ep.usual + data.ep.peak);
      const feeSum = toFixed(data.fee.valley + data.fee.usual + data.fee.peak);
      const feeAvg = toFixed(feeSum / epSum);

      return {
        ...state,
        electricFeeParams: payload,
        electricFee: {
          ep: [
            { value: data.ep.valley, name: '谷时电量', ...c1 },
            { value: data.ep.usual, name: '平时电量', ...c2 },
            { value: data.ep.peak, name: '峰时电量', ...c3 },
            { value: data.ep.tip, name: '尖时电量', ...c4 },
          ],
          fee: [
            { value: data.fee.valley, name: '谷时电费', ...c1 },
            { value: data.fee.usual, name: '平时电费', ...c2 },
            { value: data.fee.peak, name: '峰时电费', ...c3 },
            { value: data.fee.tip, name: '尖时电费', ...c4 },
          ],
          epSum,
          feeSum,
          feeAvg,
        },
      };
    },
    getPowerlineInfo(state, { payload, data }) {
      console.log(' getPowerlineInfo ： ', state, payload, data);
      // const powerlineInfo = {}
      // if (payload.query === powerConfigMap.POWER_CURVEif) {
      //   // powerlineInfo = data
      // }
      // if (payload.query === powerConfigMap.POWER_VOLTAGEif) {
      //   // powerlineInfo = data
      // }
      // if (payload.query === powerConfigMap.POWER_CURRENTif) {
      //   // powerlineInfo = data
      // }
      // if (payload.query === powerConfigMap.POWER_LOADif) {
      //   // powerlineInfo = data
      // }

      return {
        ...state,
        powerlineParams: payload,
        powerlineInfo: data,
      };
    },

    getTemperatureHumidity(state, { payload, data }) {
      console.log(' getTemperatureHumidity ： ', state, payload, data);
      return {
        ...state,
        temperatureHumidityInfo: data,
      };
    },
    getRealStatus(state, { payload, data }) {
      console.log(' getRealStatus ： ', state, payload, data);
      let pvStatus = 0;
      if (data.pv.pv2_current > 0) {
        pvStatus = 1;
      } else if (data.pv.pv2_current < 0) {
        pvStatus = 2;
      } else {
        pvStatus = 0;
      }

      return {
        ...state,
        realStatus: {
          ...data,
          pvStatus: data.pv.pv2_current > 0,
          psStatus: data.ps.status,
          status: `${pvStatus}${data.ps.status}`,
        },
      };
    },
  },

  effects: {
    *getDataListAsync({ payload, action, type }, { call, put }) {
      // console.log(' getDataListAsync ： ', payload, action, type);
      // const res = yield call(services.getStatistics, payload);
      yield put({
        type: 'getDataList',
        ...res,
        payload,
      });
    },
    *getStatisticsAsync({ payload, action, type }, { call, put }) {
      // console.log(' getStatisticsAsync ： ', payload, action, type);
      const res = yield call(services.getStatistics, payload);
      yield put({
        type: 'getStatistics',
        ...res,
        payload,
      });
    },
    *getPVStatisticsAsync({ payload, action, type }, { call, put }) {
      // console.log(' getPVStatisticsAsync ： ', payload, action, type);
      const res = yield call(services.getPVStatistics, payload);
      yield put({
        type: 'getPVStatistics',
        ...res,
        payload,
      });
    },
    *getEle7daysAsync({ payload, action, type }, { call, put }) {
      // console.log(' getEle7daysAsync ： ', payload, action, type);
      const res = yield call(services.getEle7days, payload);
      yield put({
        type: 'getEle7days',
        ...res,
        payload,
      });
    },
    *getGe30daysAsync({ payload, action, type }, { call, put }) {
      // console.log(' getGe30daysAsync ： ', payload, action, type);
      const res = yield call(services.getGe30days, payload);
      yield put({
        type: 'getGe30days',
        ...res,
        payload,
      });
    },
    *getCarbonAssetsAsync({ payload, action, type }, { call, put }) {
      // console.log(' getCarbonAssetsAsync ： ', payload, action, type);
      const res = yield call(services.getCarbonAssets, payload);
      yield put({
        type: 'getCarbonAssets',
        ...res,
        payload,
      });
    },
    *getRealDataAsync({ payload, action, type }, { call, put }) {
      // console.log(' getRealDataAsync ： ', payload, action, type);
      const res = yield call(services.getRealData, payload);
      yield put({
        type: 'getRealData',
        ...res,
        payload,
      });
    },
    *getRealDataStatisticsAsync({ payload, action, type }, { call, put }) {
      // console.log(' getRealDataStatisticsAsync ： ', payload, action, type);
      const res = yield call(services.getRealDataStatistics, payload);
      yield put({
        type: 'getRealDataStatistics',
        ...res,
        payload,
      });
    },
    *getElectricFeeAsync({ payload, action, type }, { call, put }) {
      // console.log(' getElectricFeeAsync ： ', payload, action, type);
      const res = yield call(services.getElectricFee, payload);
      yield put({
        type: 'getElectricFee',
        ...res,
        payload,
      });
    },
    *getPowerlineInfoAsync({ payload, action, type }, { call, put, select }) {
      // console.log(' getPowerlineInfoAsync ： ', payload, action, type);
      const { powerlineParams } = yield select(state => state[namespace]);
      const params = {
        ...powerlineParams,
        ...payload,
      };
      const res = yield call(services.getPowerlineInfo, params);
      yield put({
        type: 'getPowerlineInfo',
        ...res,
        payload: params,
      });
    },

    *getTemperatureHumidityAsync(
      { payload = {}, action, type },
      { call, put },
    ) {
      // console.log(' getTemperatureHumidityAsync ： ', payload, action, type);
      const res = yield call(services.getTemperatureHumidity, payload);
      yield put({
        type: 'getTemperatureHumidity',
        ...res,
        payload,
      });
    },
    *getRealStatusAsync({ payload, action, type }, { call, put }) {
      // console.log(' getRealStatusAsync ： ', payload, action, type);
      const res = yield call(services.getRealStatus, payload);
      yield put({
        type: 'getRealStatus',
        ...res,
        payload,
      });
    },
  },
};

export const actions = createAction(model);
// export const mapStateToProps = state => state[namespace];
export const mapStateToProps = state => ({
  ...state[namespace],
  loading: state.loading,
});
export const mapDispatchToProps = createDispatch(model);

export default model;
