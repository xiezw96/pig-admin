import { WrappedFormUtils } from 'ant-design-vue/types/form/form';
import { Component, Vue } from 'vue-property-decorator';

import { EditingMode } from '@/enums';
import { FormGroup } from '@/interfaces';

@Component<Editable>({
  beforeCreate() {
    this.editingForm = this.$form.createForm(this);
  },
})
export class Editable extends Vue {
  editingForm: WrappedFormUtils;
  editingFormGroup: FormGroup;

  mode = EditingMode.无;

  record: any = null;

  editingModal: any = null;

  readonly initialUpdatingFieldsValue: any;

  get editingModalVisible() {
    return !!this.mode;
  }
  set editingModalVisible(visible: boolean) {
    if (visible) return;
    this.mode = EditingMode.无;
  }

  async onUpdate(record: any) {
    this.mode = EditingMode.编辑;
    this.record = record;
    this.editingModal = {
      title: '编辑',
    };
    await this.$nextTick();
    this.editingForm.setFieldsValue(
      this.initialUpdatingFieldsValue || this.record,
    );
  }
}
