import {
  get,
  post,
  put,
  remove,
  noTipsGet,
  noTipsPost,
  noTipsPut,
  noTipsRemove,
} from '@/utils/request';

export const getList = p => noTipsGet(`alarm`, p);
export const getItem = p => noTipsGet(`alarm/${p.id}`, p);
export const addItem = p => post(`alarm`, p);
export const editItem = p => put(`alarm/${p.id}`, p);
export const removeItem = p => remove(`alarm/${p}`, p);
export const removeItems = p => remove(`alarm/`, p);

export const handleAlarm = p => put(`alarm/${p.id}`, p);
