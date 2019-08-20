import { isFinite, toNumber } from 'lodash';

import { TrackStatus } from '@/enums';

export function trackStatus(val) {
  const num = toNumber(val);
  if (!isFinite(num)) return '';
  return TrackStatus[val];
}
