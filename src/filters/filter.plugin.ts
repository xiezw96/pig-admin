import { PluginObject, VueConstructor } from 'vue';

import {
  concatSpecName,
  dateFormat,
  getActivateTypeByCode,
  getAgentOrderStatusByCode,
  getAnnouncementStatusByCode,
  getLocation,
  getPaymentApproach,
  getProvinceByCode,
  getRemitStatusByCode,
  getSendStatusByCode,
  getSourceNameByCode,
} from '@/utils';

import { a2bFilter } from './a2b.filter';
import { activedStatus } from './actived-status.filter';
import { auditedStatus } from './audited-status.filter';
import { equipmentStatus } from './equipment-status.filter';
import { getGenderByCode } from './gender.filter';
import { image } from './image.filter';
import { trackStatus } from './track-status.filter';

export class FilterPlugin implements PluginObject<never> {
  install(Vue: VueConstructor) {
    Vue.filter('a2b', a2bFilter);
    Vue.filter('date', dateFormat);
    Vue.filter('image', image);
    Vue.filter('equipmentstatus', equipmentStatus);
    Vue.filter('gender', getGenderByCode);
    Vue.filter('trackstatus', trackStatus);
    Vue.filter('auditedstatus', auditedStatus);
    Vue.filter('activedstatus', activedStatus);
    Vue.filter('payway', getPaymentApproach);
    Vue.filter('spec', concatSpecName);
    Vue.filter('agent_order_status', getAgentOrderStatusByCode);
    Vue.filter('remit_status', getRemitStatusByCode);
    Vue.filter('location', getLocation);
    Vue.filter('source', getSourceNameByCode);
    Vue.filter('send_status', getSendStatusByCode);
    Vue.filter('activate_type', getActivateTypeByCode);
    Vue.filter('province', getProvinceByCode);
    Vue.filter('announcement_status', getAnnouncementStatusByCode);
  }
}
