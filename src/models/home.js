import { init } from '@/utils/createAction';
import * as services from '@/services/home';
import { nowYearMonthDayFull, toFixed } from '@/utils';
import moment from 'moment'// 
import { POWER_CURVE } from '@/pages/common/Home/PowerLineChart';

const namespace = 'home';
const { createAction, createDispatch } = init(namespace);

const model = {
  namespace,

  state: {
    realData: {},
    electricFeeParams: {
      sn: '00018469010327',
    },
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
    powerlineInfo: {},
    powerlineInfo: [],
    realDataStatistics: {
      ep: 0,
      ep: 0,
    },
    temperatureHumidityInfo: {},
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
    realStatus: {
      pv: {},
      ps: {},
      ld: {},
      gd: {},
      status: 11,
    },
    carbonAssets: {},
  },

  reducers: {
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
        powerlineParams: payload,
        powerlineInfo: data,
      };
    },
    getElectricFee(state, { payload, data }) {
      console.log(' getElectricFee ： ', state, payload, data);
      const c1 = { itemsTyle: { normal: { color: 'rgba(236, 78, 81)' } } };
      const c2 = { itemsTyle: { normal: { color: 'rgba(231, 178, 69)' } } };
      const c3 = { itemsTyle: { normal: { color: 'rgba(19, 208, 208)' } } };
      const c4 = { itemsTyle: { normal: { color: '#a1ce63' } } };
      const epSum = toFixed(data.ep.valley + data.ep.usual + data.ep.peak)
      const feeSum = toFixed(data.fee.valley + data.fee.usual + data.fee.peak)
      const feeAvg = toFixed(feeSum / epSum)

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
    getRealDataStatistics(state, { payload, data, dtp }) {
      console.log(' getRealDataStatistics ： ', state, payload, data, dtp);
      return {
        ...state,
        realDataStatistics: data,
      };
    },
    getTemperatureHumidity(state, { payload, data, dtp }) {
      console.log(' getTemperatureHumidity ： ', state, payload, data, dtp);
      return {
        ...state,
        temperatureHumidityInfo: data,
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
      const storagEnergy = []
      const cityEnergy = []
      const greenEnergy = []
      const xAxisData = []
      data.forEach((v, i) => {
        storagEnergy.push(v.ps)
        cityEnergy.push(v.se)
        greenEnergy.push(v.ge)
        xAxisData.push(v.date)
      })
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
    getGe30days(state, { payload, data, dtp }) {
      console.log(' getGe30days ： ', state, payload, data, dtp);
      const incomeData = []
      const xAxisData = []
      data.forEach((v, i) => {
        incomeData.push(v.fee)
        xAxisData.push(v.date)
      })
      const sum = toFixed(data.reduce((total, cuv) => total + cuv.fee, 0) * 0.9419)
      return {
        ...state,
        incomeTrendInfo: {
          incomeData,
          xAxisData,
          sum,
        },
      };
    },
    getRealStatus(state, { payload, data, dtp }) {
      console.log(' getRealStatus ： ', state, payload, data, dtp);
      let pvStatus = 0
      if (data.pv.pv2_current > 0) {
        pvStatus = 1
      } else if (data.pv.pv2_current < 0) {
        pvStatus = 2
      } else {
        pvStatus = 0
      }
      
      return {
        ...state,
        realStatus: {
          ...data,
          pvStatus: data.pv.pv2_current > 0 ,
          psStatus: data.ps.status,
          status: `${pvStatus}${data.ps.status}`,
        },
      };
    },
    getCarbonAssets(state, { payload, data, dtp }) {
      console.log(' getCarbonAssets ： ', state, payload, data, dtp);
      return {
        ...state,
        carbonAssets: data,
      };
    },
  },

  effects: {
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
    *getPowerlineInfoAsync({ payload, action, type }, { call, put, select, }) {
      console.log(' getPowerlineInfoAsync ： ', payload, action, type);
      const { powerlineParams } = yield select(state => state[namespace]);
      const params = {
        ...powerlineParams,
        ...payload,
      }
      const res = yield call(services.getPowerlineInfo, params);
      console.log(' getPowerlineInfoAsync resresres ： ', res, params, ); //
      yield put({
        type: 'getPowerlineInfo',
        ...res,
        payload: params,
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
    *getRealDataStatisticsAsync({ payload, action, type }, { call, put }) {
      console.log(' getRealDataStatisticsAsync ： ', payload, action, type);
      const res = yield call(services.getRealDataStatistics, payload);
      console.log(' getRealDataStatisticsAsync resresres ： ', res); //
      yield put({
        type: 'getRealDataStatistics',
        ...res,
        payload,
      });
    },
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
    *getCarbonAssetsAsync({ payload, action, type }, { call, put }) {
      console.log(' getCarbonAssetsAsync ： ', payload, action, type);
      const res = yield call(services.getCarbonAssets, payload);
      console.log(' getCarbonAssetsAsync resresres ： ', res); //
      yield put({
        type: 'getCarbonAssets',
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
