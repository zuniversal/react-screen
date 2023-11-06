import { req } from '@/utils/request';

export const getRegion = p =>
  req.noTipsGet(`/amap/district`, { subdistrict: '1', ...p });
