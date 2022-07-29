import { req } from '@/utils/request';

export const get = p => req.noTipsGet(`/acrel/ADW300`, p);
// 物联网温湿度验证
export const getTemperatureHumidityverify = p => req.noTipsGet(`/ots/th`, p);
// 物联网温湿度接收
export const addTemperatureHumidity = p => req.post(`/ots/th`, p);
// 获取最新温湿度数据
export const getTemperatureHumidity = p => req.noTipsGet(`/ots/th/record/`, p);
// export const getTemperatureHumidity = p => req.noTipsGet(`/search/users?q=zuniversal`, p);
// 获取当月峰平谷电量及费用
export const getElectricFee = p => req.noTipsGet(`/ele_meter/fee/`, p);
// 获取当月峰平谷电量及费用
export const getPowerlineInfo = p => req.noTipsGet(`/ele_meter/list/`, p);