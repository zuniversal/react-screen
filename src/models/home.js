import { init } from '@/utils/createAction';
import * as services from '@/services/home';

const namespace = 'home';
const { createAction } = init(namespace);

export const mapStateToProps = state => state[namespace];

const model = {
  namespace,

  state: {
    temperatureHumidityInfo: {},
  },

  reducers: {
    getTemperatureHumidity(state, { payload, type }) {
      console.log(' getTemperatureHumidityAsync ： ', state, payload);
      return {
        ...state,
        temperatureHumidityInfo: payload.data,
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
      yield put({
        type: 'home/getTemperatureHumidity',
        ...res,
        payload,
      });
    },
  },
};

export const actions = createAction(model);

export default model;
