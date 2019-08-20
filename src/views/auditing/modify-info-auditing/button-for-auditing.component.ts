import { WrappedFormUtils } from 'ant-design-vue/types/form/form';
import { Component, Mixins, Prop } from 'vue-property-decorator';

import { AuditedStatus } from '@/enums';
import { Column, FormGroup } from '@/interfaces';
import { Layout } from '@/mixins';
import { modifyInfoAuditingService } from '@/services';
import { a2b, toFormGroup } from '@/utils';

@Component<ButtonForAuditingComponent>({
  beforeCreate() {
    this.form = this.$form.createForm(this);
    this.layout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
  },
  created() {
    this.formGroup = toFormGroup([
      [
        'auditStatus',
        {
          initialValue: this.record.updateAuditStatus,
          rules: [{ required: true, message: '请选择一个审核意见' }],
        },
      ],
      ['remark', { initialValue: this.record.updateAuditRemark }],
    ]);
  },
})
export class ButtonForAuditingComponent extends Mixins(Layout) {
  @Prop()
  record: any;

  // #region 组件状态
  visible = false;
  preview = false;
  previewUrl: string | null = null;
  // #endregion

  form: WrappedFormUtils;
  formGroup: FormGroup;
  columns: Column[];
  layout: any;

  atob = a2b;

  async onAudit() {
    this.visible = true;
  }

  onPreview(url: string) {
    this.preview = true;
    this.previewUrl = url;
  }

  onConfirm() {
    if (this.record.updateAuditStatus !== AuditedStatus.待处理) {
      this.visible = false;
      return;
    }
    this.form.validateFields(async (errors, values) => {
      if (errors) return;
      const dto = { ...values, agentId: this.record.agentId };
      await modifyInfoAuditingService.audit(dto);
      this.visible = false;
      this.$emit('afteraudit');
    });
  }
}
export { ButtonForAuditingComponent as default };
