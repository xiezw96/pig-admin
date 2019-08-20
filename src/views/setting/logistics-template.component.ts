import { WrappedFormUtils } from 'ant-design-vue/types/form/form';
import axios from 'axios';
import { Component, Mixins } from 'vue-property-decorator';

import { areas } from '@/constants';
import { FormGroup } from '@/interfaces';
import { Layout } from '@/mixins';
import { toFormGroup } from '@/utils';

@Component<LogisticsTemplateComponent>({
  created() {
    this.form = this.$form.createForm(this);
    this.areaForm = this.$form.createForm(this);
    this.formGroup = toFormGroup({
      startingWeight: {
        rules: [{ required: true, message: '请输入首重重量' }],
      },
      startingPrice: { rules: [{ required: true, message: '请输入起步价' }] },
      increment: { rules: [{ required: true, message: '请输入续重费用' }] },
      farawayStartingPrice: {
        rules: [{ required: true, message: '请输入偏远地区起步价' }],
      },
      farawayIncrement: {
        rules: [{ required: true, message: '偏远地区续重费用' }],
      },
    });
    this.areaFormGroup = toFormGroup({
      province: { rules: [{ required: true, message: '请选择一个省份' }] },
    });
    this.areas = areas;
  },
  mounted() {
    this.fetchSetting();
  },
})
export default class LogisticsTemplateComponent extends Mixins(Layout) {
  form: WrappedFormUtils;
  formGroup: FormGroup;

  areaForm: WrappedFormUtils;
  areaFormGroup: FormGroup;

  loading = false;

  areas: any[];

  visible = false;
  remoteAreas = new Set<string>();

  async onAdd() {
    this.visible = true;
    await this.areaForm.resetFields();
  }

  async onConfirm() {
    this.areaForm.validateFields(async (errors, values) => {
      if (errors) return;

      this.remoteAreas.add(values.province);
      this.visible = false;
    });
  }

  async onSubmit() {
    this.form.validateFields(async (errors, values) => {
      if (errors) return;

      await axios.post('api/admin/logisticstemplate', {
        ...values,
        farawayProvinceList: Array.from(this.remoteAreas),
      });

      this.$message.success('修改完成');
    });
  }

  onClose(e) {
    this.remoteAreas.delete(e);
  }

  private async fetchSetting() {
    this.loading = true;

    try {
      const {
        data: { data },
      } = await axios.get('api/admin/logisticstemplate');

      if (data === null) return;

      this.form.setFieldsValue({
        startingWeight: data.startingWeight,
        startingPrice: data.startingPrice,
        increment: data.increment,
        farawayStartingPrice: data.farawayStartingPrice,
        farawayIncrement: data.farawayIncrement,
      });

      this.remoteAreas = new Set(data.farawayProvinceList);
    } finally {
      this.loading = false;
    }
  }
}
