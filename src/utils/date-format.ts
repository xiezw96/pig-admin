import moment from 'moment';

export function dateFormat(val) {
  if (typeof val !== 'string') return '';

  return moment(val).format('YYYY-MM-DD');
}
