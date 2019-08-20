import { WrappedFormUtils } from 'ant-design-vue/types/form/form';
import { Component, Mixins, Prop } from 'vue-property-decorator';

import { Column, FormGroup } from '@/interfaces';
import { Layout } from '@/mixins';
import { settlementAuditingService } from '@/services';
import { toFormGroup } from '@/utils';

import { columns } from './order.columns';

@Component<ButtonForAuditingComponent>({
  beforeCreate() {
    this.form = this.$form.createForm(this);
    this.columns = columns;
  },
  created() {
    this.formGroup = toFormGroup([
      [
        'status',
        {
          initialValue: this.record.status,
          rules: [{ required: true, message: '请选择一个审核意见' }],
        },
      ],
      ['remark', { initialValue: this.record.remark }],
    ]);
  },
})
export class ButtonForAuditingComponent extends Mixins(Layout) {
  @Prop()
  record: any;

  // #region 组件状态
  loading = false;
  visible = false;
  list: any[] = [];
  // #endregion

  form: WrappedFormUtils;
  formGroup: FormGroup;
  columns: Column[];

  async onAudit() {
    this.list = [];
    this.loading = true;
    this.visible = true;
    this.find();
  }

  onConfirm() {
    this.form.validateFields(async (errors, values) => {
      if (errors) return;
      await settlementAuditingService.audit({ id: this.record.id, ...values });
      this.visible = false;
      this.$emit('afteraudit');
    });
  }

  atob(val) {
    if (!val) return '';
    return window.atob(val);
  }

  private async find() {
    this.loading = true;
    try {
      const data = await settlementAuditingService.findDetail({
        settlementId: this.record.id,
        descs: 'detail.pay_time',
      });
      this.list = data;
    } finally {
      this.loading = false;
    }
  }
}
export { ButtonForAuditingComponent as default };
