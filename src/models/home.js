import { init } from '@/utils/createAction';

const namespace = 'home';
const { createActions, createAction } = init(namespace);

export const mapStateToProps = state => state[namespace];

const model = {
  namespace,

  state: {},

  reducers: {},

  effects: {},
};

export const actions = createAction(model);

export default model;
