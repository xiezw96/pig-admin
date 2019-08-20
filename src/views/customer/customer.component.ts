import { WrappedFormUtils } from 'ant-design-vue/types/form/form';
import { invoke } from 'lodash';
import { Component, Mixins } from 'vue-property-decorator';

import { Column, FormGroup } from '@/interfaces';
import { Layout, Queryable } from '@/mixins';
import { customerService, CustomerService } from '@/services';

import { columns } from './customer.columns';

@Component<CustomerComponent>({
  beforeCreate() {
    this.form = this.$form.createForm(this);
    this.formGroup = {
      nickname: ['nickname'],
      phone: ['phone'],
      ofProxy: ['ofProxy'],
      registerDate: ['registerDate'],
    };
    this.columns = columns;
    this.service = customerService;
  },
})
export default class CustomerComponent extends Mixins(Layout, Queryable) {
  // #region 状态
  visible = false;
  record = null;
  // #endregion

  form: WrappedFormUtils;
  formGroup: FormGroup;
  columns: Column[];
  service: CustomerService;

  onSearch() {
    this.form.validateFields((errors, values) => {
      if (errors) return;
      const { registerDate, ...rest } = values;
      const dateString = invoke(registerDate, 'format', 'YYYY-MM-DD');
      this.find({ ...rest, registerDate: dateString });
    });
  }

  onRead(record) {
    this.record = record;
    this.visible = true;
  }

  onReset() {
    this.form.resetFields();
  }

  async onUpdateState(id, state) {
    await customerService.updateStatus(id, state);
    this.$message.info('操作成功');
    this.onSearch();
  }
}
