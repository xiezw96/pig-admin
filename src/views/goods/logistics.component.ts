import { WrappedFormUtils } from 'ant-design-vue/types/form/form';
import { Component, Mixins } from 'vue-property-decorator';

import { Column, FormGroup } from '@/interfaces';
import { Layout } from '@/mixins';

import { columns } from './logistics.columns';

@Component<LogisticsComponent>({
  beforeCreate() {
    this.columns = columns;

    this.queryingForm = this.$form.createForm(this);
    this.queryingFormGroup = {
      name: ['name', { rules: [{ required: true, message: '请输入名称' }] }],
      sort: ['sort', { rules: [{ required: true, message: '请输入序号' }] }],
    };
    this.editingForm = this.$form.createForm(this);
    this.editingFormGroup = {
      name: ['name'],
      account: ['account'],
      status: ['status'],
      order: ['order'],
      returned: ['returned'],
      time: ['time'],
    };
  },
})
export class LogisticsComponent extends Mixins(Layout) {
  record: any = null;

  columns: Column[];
  queryingForm: WrappedFormUtils;
  queryingFormGroup: FormGroup;
  editingForm: WrappedFormUtils;
  editingFormGroup: FormGroup;

  onSearch() {
    this.queryingForm.validateFields(errors => {
      if (errors) return;
    });
  }
}
export { LogisticsComponent as default };
