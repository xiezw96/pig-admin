import axios from 'axios';
import { Component, Mixins, Prop } from 'vue-property-decorator';

import { FormGroup } from '@/interfaces';
import { Layout } from '@/mixins';
import { toFormGroup } from '@/utils';

import { WrappedFormUtils } from 'ant-design-vue/types/form/form';

@Component<ButtonForChangePasswordComponent>({
  created() {
    this.form = this.$form.createForm(this);
    this.formGroup = toFormGroup({
      pwd: {
        rules: [
          { required: true, message: '请输入新密码' },
          { min: 6, message: '请输入至少6位字符' },
        ],
      },
    });
  },
})
export default class ButtonForChangePasswordComponent extends Mixins(Layout) {
  @Prop()
  id: any;

  visible = false;

  form: WrappedFormUtils;

  formGroup: FormGroup;

  onChangePassword() {
    this.visible = true;
  }

  onConfirm() {
    this.form.validateFields(async (errors, values) => {
      if (errors) return;

      await this.changePassword(this.id, values.pwd);
      this.$emit('changed');
      this.visible = false;
      this.$message.success('密码修改成功');
    });
  }

  private async changePassword(id, pwd) {
    await axios.put('api/admin/agent/modifyPwd', { agentId: id, pwd });
  }
}
