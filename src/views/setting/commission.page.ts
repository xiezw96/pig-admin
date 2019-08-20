import { WrappedFormUtils } from 'ant-design-vue/types/form/form';
import axios from 'axios';
import { Component, Mixins } from 'vue-property-decorator';

import { FormGroup } from '@/interfaces';
import { Layout } from '@/mixins';
import { toFormGroup } from '@/utils';

@Component<CommissionPage>({
  created() {
    this.form = this.$form.createForm(this);
    this.formGroup = toFormGroup({
      commission: {
        rules: [{ required: true, message: '请输入通道比例' }],
      },
    });
  },
  mounted() {
    this.fetchSetting();
  },
})
export default class CommissionPage extends Mixins(Layout) {
  form: WrappedFormUtils;
  formGroup: FormGroup;

  loading = false;

  async onSubmit() {
    this.form.validateFields(async (errors, values) => {
      if (errors) return;
      await axios.post('api/admin/commission', {
        ...values,
        commission: values.commission / 100,
      });

      this.$message.success('修改完成');
    });
  }

  private async fetchSetting() {
    this.loading = true;

    try {
      const {
        data: { data },
      } = await axios.get('api/admin/commission');

      if (data === null) return;

      this.form.setFieldsValue({
        commission: data.commission * 100,
      });
    } finally {
      this.loading = false;
    }
  }
}
