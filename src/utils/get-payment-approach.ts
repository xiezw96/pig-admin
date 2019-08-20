import { isFinite, toNumber } from 'lodash';

import { PaymentApproach } from '@/enums';

export function getPaymentApproach(code: string | number) {
  const num = toNumber(code);
  if (!isFinite(num)) return '';
  return PaymentApproach[code];
}
