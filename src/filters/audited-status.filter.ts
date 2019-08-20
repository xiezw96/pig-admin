import { isFinite, toNumber } from 'lodash';

import { AuditedStatus } from '@/enums';

export function auditedStatus(val) {
  const num = toNumber(val);
  if (!isFinite(num)) return '';
  return AuditedStatus[val];
}
