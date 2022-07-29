import { init } from '@/utils/createAction';
import * as services from '@/services/home';

const namespace = 'home';
const { createAction, createDispatch, } = init(namespace);

const model = {
  namespace,

  state: {
    temperatureHumidityInfo: {},
    electricFee: {},
    powerLineInfo: {},
  },

  reducers: {
    getTemperatureHumidity(state, { payload, data, dtp, }) {
      console.log(' getTemperatureHumidity ： ', state, payload, data, dtp);
      return {
        ...state,
        temperatureHumidityInfo: data,
      };
    },
    getElectricFee(state, { payload, data, }) {
      console.log(' getElectricFee ： ', state, payload, data, );
      return {
        ...state,
        electricFee: {
          ep: [
            { value: data.ep.valley, name: '谷时电量', },
            { value: data.ep.usual, name: '平时电量', },
            { value: data.ep.peak, name: '峰时电量', },
          ],
          fee: [
            { value: data.fee.valley, name: '谷时电量', },
            { value: data.fee.usual, name: '平时电量', },
            { value: data.fee.peak, name: '峰时电量', },
          ]
        },
      };
    },
    getPowerlineInfo(state, { payload, data, dtp, }) {
      console.log(' getPowerlineInfo ： ', state, payload, data, dtp);
      return {
        ...state,
        powerLineInfo: data,
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
      console.log(' getTemperatureHumidityAsync resresres ： ', res,  )// 
      yield put({
        type: 'getTemperatureHumidity',
        ...res,
        payload,
      });
    },
    *getElectricFeeAsync(
      { payload, action, type },
      { call, put },
    ) {
      console.log(' getElectricFeeAsync ： ', payload, action, type);
      const res = yield call(services.getElectricFee, payload);
      console.log(' getElectricFeeAsync resresres ： ', res,  )// 
      yield put({
        type: 'getElectricFee',
        ...res,
        payload,
      });
    },
    *getPowerlineInfoAsync(
      { payload, action, type },
      { call, put },
    ) {
      console.log(' getPowerlineInfoAsync ： ', payload, action, type);
      const res = yield call(services.getPowerlineInfo, payload);
      console.log(' getPowerlineInfoAsync resresres ： ', res,  )// 
      yield put({
        type: 'getPowerlineInfo',
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
