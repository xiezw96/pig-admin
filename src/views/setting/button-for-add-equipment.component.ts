import { WrappedFormUtils } from 'ant-design-vue/types/form/form';
import { Component, Mixins, Prop } from 'vue-property-decorator';

import { Layout } from '@/mixins';
import { equipmentService } from '@/services';
import { toFormGroup } from '@/utils';

@Component<ButtonForAddEquipmentComponent>({
  async created() {
    this.form = this.$form.createForm(this);
  },
})
export default class ButtonForAddEquipmentComponent extends Mixins(Layout) {
  @Prop({ default: [] })
  equipmentTypes: any[];

  form: WrappedFormUtils;
  formGroup = toFormGroup({
    machineSpecId: { rules: [{ required: true, message: '请选择柜子型号' }] },
    num: { rules: [{ required: true, message: '请输入柜子数量' }] },
  });

  visible = false;

  async onClick() {
    this.visible = true;
    await this.$nextTick();
    this.form.resetFields();
  }

  onConfirm() {
    this.form.validateFields(async (errors, values) => {
      if (errors) return;
      this.$emit('select', values);
      this.visible = false;
    });
  }
}
