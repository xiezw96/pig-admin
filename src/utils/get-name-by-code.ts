import { has, isFinite, isPlainObject, toNumber } from 'lodash';

import { areas } from '@/constants';
import {
  ActivateType,
  AgentOrderStatus,
  AnnouncementStatus,
  LogisticsStatus,
  RemitdStatus,
  SourceStatus,
} from '@/enums';

export function getNameByCode(enumeration, code: string | number) {
  if (!isPlainObject(enumeration)) return '';

  const num = toNumber(code);

  if (!isFinite(num)) return '';

  if (!has(enumeration, num)) return '';

  return enumeration[num];
}

export function getAgentOrderStatusByCode(code: string | number) {
  return getNameByCode(AgentOrderStatus, code);
}

export function getRemitStatusByCode(code: string | number) {
  return getNameByCode(RemitdStatus, code);
}

export function getSourceNameByCode(code: string | number) {
  return getNameByCode(SourceStatus, code);
}

export function getSendStatusByCode(code: string | number) {
  return getNameByCode(LogisticsStatus, code);
}

export function getActivateTypeByCode(code: string | number) {
  return getNameByCode(ActivateType, code);
}

export function getProvinceByCode(code: string | number) {
  const target = areas.find(province => province.value === code);
  if (!target) return '';
  return target.label;
}

export function getAnnouncementStatusByCode(code: string | number) {
  return getNameByCode(AnnouncementStatus, code);
}
