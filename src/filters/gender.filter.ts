import { isFinite, toNumber } from 'lodash';

import { Gender } from '@/enums';

export function getGenderByCode(code: string | number) {
  const num = toNumber(code);
  if (!isFinite(num)) return '';
  return Gender[code];
}
