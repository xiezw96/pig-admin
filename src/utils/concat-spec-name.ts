import { isNil } from 'lodash';

export function concatSpecName(specNames: string[]) {
  if (Array.isArray(specNames)) {
    return specNames.filter(val => !isNil(val)).join('-');
  }
}
