import { init } from '@/utils/createAction';
import * as services from '@/services/home';
import { nowYearMonthDayFull } from '@/utils';
import moment from 'moment'// 
// import { powerConfigMap } from '@/pages/common/Home/PowerLineChart';

const namespace = 'home';
const { createAction, createDispatch } = init(namespace);

const model = {
  namespace,

  state: {
    temperatureHumidityInfo: {},
    electricFee: {},
    powerlineInfo: {},
    powerlineInfo: [],
    powerlineParams: {},
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
    },
    realStatus: {
      pv: {},
      ps: {},
      ld: {},
      gd: {},
    },
  },

  reducers: {
    getTemperatureHumidity(state, { payload, data, dtp }) {
      console.log(' getTemperatureHumidity ： ', state, payload, data, dtp);
      return {
        ...state,
        temperatureHumidityInfo: data,
      };
    },
    getElectricFee(state, { payload, data }) {
      console.log(' getElectricFee ： ', state, payload, data);
      const c1 = { itemsTyle: { normal: { color: 'rgba(236, 78, 81)' } } };
      const c2 = { itemsTyle: { normal: { color: 'rgba(231, 178, 69)' } } };
      const c3 = { itemsTyle: { normal: { color: 'rgba(19, 208, 208)' } } };

      return {
        ...state,
        electricFee: {
          ep: [
            { value: data.ep.valley, name: '谷时电量', ...c1 },
            { value: data.ep.usual, name: '平时电量', ...c2 },
            { value: data.ep.peak, name: '峰时电量', ...c3 },
          ],
          fee: [
            { value: data.fee.valley, name: '谷时电量', ...c1 },
            { value: data.fee.usual, name: '平时电量', ...c2 },
            { value: data.fee.peak, name: '峰时电量', ...c3 },
          ],
        },
      };
    },
    getPowerlineInfo(state, { payload, data, dtp }) {
      console.log(' getPowerlineInfo ： ', state, payload, data, dtp);
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
        powerlineInfo: data,
        powerlineParams: payload,
      };
    },
    getRealData(state, { payload, data, dtp }) {
      console.log(' getRealData ： ', state, payload, data, dtp);
      return {
        ...state,
        realData: {
          ...data,
          upTime: moment(data.uptime).format('YYYY-MM-DD HH:mm:ss'),
        },
      };
    },
    getStatistics(state, { payload, data, dtp }) {
      console.log(' getStatistics ： ', state, payload, data, dtp);
      return {
        ...state,
        statistics: data,
      };
    },
    getPVStatistics(state, { payload, data, dtp }) {
      console.log(' getPVStatistics ： ', state, payload, data, dtp);
      return {
        ...state,
        powerInstallInfo: data,
      };
    },
    getEle7days(state, { payload, data, dtp }) {
      console.log(' getEle7days ： ', state, payload, data, dtp);
      return {
        ...state,
        historyElecCalc: {
          storagEnergy: data.map((v) => v.ps),
          cityEnergy: data.map((v) => v.se),
          greenEnergy: data.map((v) => v.ge),
          xAxisData: data.map((v) => v.date),
        },
      };
    },
    getGe30days(state, { payload, data, dtp }) {
      console.log(' getGe30days ： ', state, payload, data, dtp);
      return {
        ...state,
        incomeTrendInfo: {
          incomeData: data.map((v) => v.fee),
          xAxisData: data.map((v) => v.date),
        },
      };
    },
    getRealStatus(state, { payload, data, dtp }) {
      console.log(' getRealStatus ： ', state, payload, data, dtp);
      return {
        ...state,
        realStatus: data ?? state.realStatus,
      };
    },
  },

  effects: {
    *getTemperatureHumidityAsync(
      { payload = {}, action, type },
      { call, put },
    ) {
      console.log(' getTemperatureHumidityAsync ： ', payload, action, type);
      const res = yield call(services.getTemperatureHumidity, payload);
      console.log(' getTemperatureHumidityAsync resresres ： ', res); //
      yield put({
        type: 'getTemperatureHumidity',
        ...res,
        payload,
      });
    },
    *getElectricFeeAsync({ payload, action, type }, { call, put }) {
      console.log(' getElectricFeeAsync ： ', payload, action, type);
      const res = yield call(services.getElectricFee, payload);
      console.log(' getElectricFeeAsync resresres ： ', res); //
      yield put({
        type: 'getElectricFee',
        ...res,
        payload,
      });
    },
    *getPowerlineInfoAsync({ payload, action, type }, { call, put }) {
      console.log(' getPowerlineInfoAsync ： ', payload, action, type);
      const params = {
        start_time: `${nowYearMonthDayFull} 00:00:00`,
        end_time: `${nowYearMonthDayFull} 23:59:59`,
        ...payload,
      };
      const res = yield call(services.getPowerlineInfo, params);
      console.log(' getPowerlineInfoAsync resresres ： ', res); //
      yield put({
        type: 'getPowerlineInfo',
        ...res,
        payload,
      });
    },
    *getRealDataAsync({ payload, action, type }, { call, put }) {
      console.log(' getRealDataAsync ： ', payload, action, type);
      const res = yield call(services.getRealData, payload);
      console.log(' getRealDataAsync resresres ： ', res); //
      yield put({
        type: 'getRealData',
        ...res,
        payload,
      });
    },
    *getStatisticsAsync({ payload, action, type }, { call, put }) {
      console.log(' getStatisticsAsync ： ', payload, action, type);
      const res = yield call(services.getStatistics, payload);
      console.log(' getStatisticsAsync resresres ： ', res); //
      yield put({
        type: 'getStatistics',
        ...res,
        payload,
      });
    },
    *getPVStatisticsAsync({ payload, action, type }, { call, put }) {
      console.log(' getPVStatisticsAsync ： ', payload, action, type);
      const res = yield call(services.getPVStatistics, payload);
      console.log(' getPVStatisticsAsync resresres ： ', res); //
      yield put({
        type: 'getPVStatistics',
        ...res,
        payload,
      });
    },
    *getEle7daysAsync({ payload, action, type }, { call, put }) {
      console.log(' getEle7daysAsync ： ', payload, action, type);
      const res = yield call(services.getEle7days, payload);
      console.log(' getEle7daysAsync resresres ： ', res); //
      yield put({
        type: 'getEle7days',
        ...res,
        payload,
      });
    },
    *getGe30daysAsync({ payload, action, type }, { call, put }) {
      console.log(' getGe30daysAsync ： ', payload, action, type);
      const res = yield call(services.getGe30days, payload);
      console.log(' getGe30daysAsync resresres ： ', res); //
      yield put({
        type: 'getGe30days',
        ...res,
        payload,
      });
    },
    *getRealStatusAsync({ payload, action, type }, { call, put }) {
      console.log(' getRealStatusAsync ： ', payload, action, type);
      const res = yield call(services.getRealStatus, payload);
      console.log(' getRealStatusAsync resresres ： ', res); //
      yield put({
        type: 'getRealStatus',
        ...res,
        payload,
      });
    },
  },
};

export const actions = createAction(model);
export const mapStateToProps = state => state[namespace];
export const mapDispatchToProps = createDispatch(model);

export default model;
