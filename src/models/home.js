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
    getTemperatureHumidity(state, { payload, type, data, dtp, }) {
      console.log(' getTemperatureHumidityAsync ： ', state, payload, data, dtp);
      return {
        ...state,
        temperatureHumidityInfo: data,
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
      console.log(' resresres ： ', res,  )// 
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
