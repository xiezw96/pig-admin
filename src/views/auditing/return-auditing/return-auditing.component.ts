import { WrappedFormUtils } from 'ant-design-vue/types/form/form';
import { Component, Vue } from 'vue-property-decorator';

import { Column, FormGroup } from '@/interfaces';

import { columns } from './return-auditing.columns';

@Component<ReturnAuditingComponent>({
  beforeCreate() {
    this.queryingForm = this.$form.createForm(this);
    this.editingForm = this.$form.createForm(this);
    this.columns = columns;
  },
})
export class ReturnAuditingComponent extends Vue {
  // #region
  loading = false;
  visible = false;
  list: any[] = [];
  // #endregion
  queryingForm: WrappedFormUtils;
  queryingFormGroup: FormGroup;
  editingForm: WrappedFormUtils;
  editingFormGroup: FormGroup;
  columns: Column[];
}
export { ReturnAuditingComponent as default };
