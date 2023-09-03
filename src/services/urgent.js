import { req } from '@/utils/request';

// 获取最新电表数据
export const getRealData = p => req.noTipsGet(`/ele_meter/real/`, p);
// 获取当月峰平谷电量及费用
export const getPowerlineInfo = p => req.noTipsGet(`/ele_meter/list/`, p);
// 获取当月峰平谷电量及费用
export const getElectricFee = p => req.noTipsGet(`/ele_meter/fee/`, p);
// 统计数据
export const getRealDataStatistics = p =>
  req.noTipsGet(`/ele_meter/statistics/`, p);
// 获取最新温湿度数据
export const getTemperatureHumidity = p => req.noTipsGet(`/ots/th/record/`, p);
// 获取光储统计数据
export const getStatistics = p => req.noTipsGet(`/pv/statistics/`, p);
// 获取光伏、储能比例数据
export const getPVStatistics = p => req.noTipsGet(`/pv/pv_statistics/`, p);
// 历史7天电量统计
export const getEle7days = p => req.noTipsGet(`/pv/ele_7days/`, p);
// 近30天绿能收益趋势
export const getGe30days = p => req.noTipsGet(`/pv/ge_30days/`, p);
// 光储实时状态
export const getRealStatus = p => req.noTipsGet(`/pv/real_status/`, p);
// 累计碳资产
export const getCarbonAssets = p => req.noTipsGet(`/pv/carbon_assets/`, p);
