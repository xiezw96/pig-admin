import { find, get } from 'lodash';

import { areas } from '@/constants';

export function getLocation(codes: [string, string, string]) {
  const [provinceCode, cityCode, areaCode] = codes;
  const location: any[] = [];
  const province = areas.find(item => item.value === provinceCode);
  location.push(province);
  const city = find(get(province, 'children'), item => item.value === cityCode);
  location.push(city);
  const area = find(get(city, 'children'), item => item.value === areaCode);
  location.push(area);
  return location
    .filter(item => !!item)
    .map(item => item.label)
    .join('');
}
