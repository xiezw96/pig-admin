import { WrappedFormUtils } from 'ant-design-vue/types/form/form';
import axios from 'axios';
import { Component, Mixins, Prop } from 'vue-property-decorator';

import { areas } from '@/constants';
import { Layout } from '@/mixins';
import { toFormGroup } from '@/utils';

@Component<ButtonForAddAddressComponent>({
  beforeCreate() {
    this.area = areas;
  },
  async created() {
    this.form = this.$form.createForm(this);
  },
})
export default class ButtonForAddAddressComponent extends Mixins(Layout) {
  @Prop()
  agent: any;

  form: WrappedFormUtils;

  visible = false;

  area: any;

  formGroup = toFormGroup({
    name: { rules: [{ required: true, message: '请输入姓名' }] },
    phone: { rules: [{ required: true, message: '请输入电话号码' }] },
    location: { rules: [{ required: true, message: '请选择地区' }] },
    detail: { rules: [{ required: true, message: '请输入详细地址' }] },
  });

  async onAdd() {
    this.visible = true;
    await this.form.resetFields();
  }

  onConfirm() {
    this.form.validateFields(async (errors, values) => {
      if (errors) return;
      const { location, detail, name, phone } = values;
      const [privince, city, area] = location;
      await this.addAddress({
        address: detail,
        area,
        city,
        creatorId: this.agent,
        isDefault: 1,
        name,
        phone,
        privince,
      });
      this.$emit('added');
      this.visible = false;
    });
  }

  async addAddress(dto) {
    await axios.post('api/admin/shoppingaddress/admin', dto);
  }
}
