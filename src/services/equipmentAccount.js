import { req } from '@/utils/request';

export const getList = p => req.noTipsGet(`device`, p);
export const getItem = p => req.noTipsGet(`device/${p.id}`, p);
export const addItem = p => req.post(`device`, p);
export const editItem = p => req.put(`device/${p.id}`, p);
export const removeItem = p => req.remove(`device/${p}`, p);
export const removeItems = p => req.remove(`device/`, p);

export const getDataDetail = p => req.noTipsGet(`device/${p.id}/info`, p);
