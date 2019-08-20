import { isFinite, toNumber } from 'lodash';

import { ActiveStatus } from '@/enums';

export function activedStatus(val) {
  const num = toNumber(val);
  if (!isFinite(num)) return '';
  return ActiveStatus[val];
}
