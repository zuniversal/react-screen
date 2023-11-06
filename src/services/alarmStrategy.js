import { req } from '@/utils/request';

export const getList = p => req.noTipsGet(`monitor/template`, p);
export const getItem = p => req.noTipsGet(`monitor/template/${p.id}`, p);
export const addItem = p => req.post(`monitor/template`, p);
export const editItem = p => req.put(`monitor/template/${p.id}`, p);
export const removeItem = p => req.remove(`monitor/template/${p}`, p);
export const removeItems = p => req.remove(`monitor/template/`, p);
