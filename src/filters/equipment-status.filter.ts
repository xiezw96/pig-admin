import { isFinite, toNumber } from 'lodash';

import { DeviceStatus } from '@/enums';

export function equipmentStatus(val) {
  const num = toNumber(val);
  if (!isFinite(num)) return '';
  return DeviceStatus[val];
}
