import { Component, Vue } from 'vue-property-decorator';

import { EditingMode } from '@/enums';
import { WrappedFormUtils } from 'ant-design-vue/types/form/form';

@Component
export class Creatable extends Vue {
  editingForm: WrappedFormUtils;

  mode: EditingMode;

  editingModal: any;

  readonly initialCreatingFieldsValue: any;

  async onCreate() {
    this.mode = EditingMode.新增;
    this.editingModal = {
      title: '新增',
    };
    await this.$nextTick();
    this.editingForm.setFieldsValue(this.initialCreatingFieldsValue);
  }
}
