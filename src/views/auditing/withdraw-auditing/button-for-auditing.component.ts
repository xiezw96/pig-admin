import { WrappedFormUtils } from 'ant-design-vue/types/form/form';
import { Component, Prop, Vue } from 'vue-property-decorator';

import { FormGroup } from '@/interfaces';
import { withdrawAudtingService } from '@/services';
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
          initialValue: this.record.auditStatus,
          rules: [{ required: true, message: '请选择一个审核意见' }],
        },
      ],
      ['remark', { initialValue: this.record.remark }],
    ]);
  },
})
export class ButtonForAuditingComponent extends Vue {
  @Prop()
  record: any;

  // #region 组件状态
  visible = false;
  preview = false;
  previewUrl = '';
  isReadonly = false;
  // #endregion

  form: WrappedFormUtils;
  formGroup: FormGroup;
  layout: any;

  atob = a2b;

  async onAudit() {
    this.visible = true;
  }

  onRead() {
    this.isReadonly = true;
    this.visible = true;
  }

  onPreview(url: string) {
    this.preview = true;
    this.previewUrl = url;
  }

  onConfirm() {
    this.form.validateFields(async (errors, values) => {
      if (errors) return;
      console.log(this.record.id);
      const dto = { ...values, id: this.record.id };
      await withdrawAudtingService.audit(dto);
      this.visible = false;
      this.$emit('afteraudit');
    });
  }
}
export default ButtonForAuditingComponent;
