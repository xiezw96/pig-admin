import { PluginObject, VueConstructor } from 'vue';

import AnnouncementStatus from './announcement-status.vue';
import { AuditedStatusComponent } from './audited-status.component';
import ButtonForDelete from './button-for-delete.vue';
import ButtonForUpdate from './button-for-update.vue';
import CouponIssuanceType from './coupon-issuance-type.vue';
import DictName from './dict-name.vue';
import EditButton from './edit-button.vue';
import InputPercent from './input-percent.vue';
import TableEditableCell from './table-editable-cell.vue';
import TableHeaderCell from './table-header-cell.vue';
import { WithdrawAuditedStatusComponent } from './withdraw-audited-status.component';

export class ComponentPlugin implements PluginObject<any> {
  install(Vue: VueConstructor) {
    Vue.component('app-audited-status', AuditedStatusComponent);
    Vue.component('app-button-for-delete', ButtonForDelete);
    Vue.component('app-button-for-update', ButtonForUpdate);
    Vue.component('app-coupon-issuance-type', CouponIssuanceType);
    Vue.component('app-dict-name', DictName);
    Vue.component('app-edit-button', EditButton);
    Vue.component('app-input-percent', InputPercent);
    Vue.component('app-table-header-cell', TableHeaderCell);
    Vue.component('app-table-editable-cell', TableEditableCell);
    Vue.component(
      'app-withdraw-audited-status',
      WithdrawAuditedStatusComponent,
    );
  }
}
