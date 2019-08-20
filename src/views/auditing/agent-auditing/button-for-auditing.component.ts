import { WrappedFormUtils } from 'ant-design-vue/types/form/form';
import { Component, Mixins, Prop } from 'vue-property-decorator';

import { areas } from '@/constants';
import { Column, FormGroup } from '@/interfaces';
import { Layout } from '@/mixins';
import { agentAuditingService } from '@/services';
import { a2b, toFormGroup } from '@/utils';

@Component<ButtonForAuditingComponent>({
  created() {
    this.form = this.$form.createForm(this);
    const { privince, city, area, level, auditStatus, remark } = this.record;
    this.formGroup = toFormGroup([
      [
        'level',
        {
          initialValue: +level,
          rules: [{ required: true, message: '请指定一个代理类型' }],
        },
      ],
      [
        'area',
        {
          initialValue: [privince, city, area],
          rules: [{ required: true, message: '请指定负责片区' }],
        },
      ],
      [
        'auditStatus',
        {
          initialValue: auditStatus,
          rules: [{ required: true, message: '请选择一个审核结果' }],
        },
      ],
      ['remark', { initialValue: remark }],
    ]);
  },
})
export class ButtonForAuditingComponent extends Mixins(Layout) {
  @Prop()
  record: any;

  // #region 组件状态
  visible = false;
  preview = false;
  previewUrl = '';
  area = [];
  areas = areas;
  // #endregion

  form: WrappedFormUtils;
  formGroup: FormGroup;
  columns: Column[];

  a2b = a2b;

  async onAudit() {
    this.visible = true;
    this.form.resetFields();
  }

  onConfirm() {
    this.form.validateFields(async (errors, values) => {
      if (errors) return;
      const { area: areaDetial, ...rest } = values;
      const [privince, city, area] = areaDetial;
      await agentAuditingService.audit({
        ...rest,
        agentId: this.record.agentId,
        privince,
        city,
        area,
      });
      this.visible = false;
      this.$emit('afteraudit');
    });
  }

  onPreview(url) {
    this.preview = true;
    this.previewUrl = url;
  }
}
export { ButtonForAuditingComponent as default };
