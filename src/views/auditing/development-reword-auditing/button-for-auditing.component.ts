import { WrappedFormUtils } from 'ant-design-vue/types/form/form';
import { Component, Mixins, Prop } from 'vue-property-decorator';

import { Column, FormGroup } from '@/interfaces';
import { Layout } from '@/mixins';
import { developmentRewordAuditingService } from '@/services';
import { toFormGroup } from '@/utils';

import { columns } from './reward-detail.columns';

@Component<ButtonForAuditingComponent>({
  beforeCreate() {
    this.form = this.$form.createForm(this);
    this.formGroup = toFormGroup([
      [
        'status',
        { rules: [{ required: true, message: '请选择一个审核意见' }] },
      ],
      ['remark'],
    ]);
    this.columns = columns;
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
    try {
      const {
        developAuditDetails,
      } = await developmentRewordAuditingService.findRewards(this.record.id);
      this.list = developAuditDetails;
    } finally {
      this.loading = false;
    }
  }

  onConfirm() {
    this.form.validateFields(async (errors, values) => {
      if (errors) return;
      this.$emit('audit', {
        values: { id: this.record.id, ...values },
        close: this.close,
      });
    });
  }

  private close() {
    this.visible = false;
  }
}
export { ButtonForAuditingComponent as default };
