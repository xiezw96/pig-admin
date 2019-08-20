import { WrappedFormUtils } from 'ant-design-vue/types/form/form';
import { Component, Prop, Vue } from 'vue-property-decorator';

import { FormGroup } from '@/interfaces';
import { toFormGroup } from '@/utils';

@Component<SpecComponent>({
  beforeCreate() {
    this.form = this.$form.createForm(this);
    this.layout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
  },
})
export default class SpecComponent extends Vue {
  @Prop()
  specs: any;

  form: WrappedFormUtils;
  layout: any;

  visible = false;

  get formGroup(): FormGroup {
    return toFormGroup([
      [
        'speName1',
        {
          initialValue: this.specs.speName1,
          rules: [{ required: true, message: '请输入规则名称' }],
        },
      ],
      [
        'specs1',
        {
          initialValue: this.specs.specs1,
          rules: [{ required: true, message: '请输入规格值' }],
        },
      ],
      [
        'speName2',
        {
          initialValue: this.specs.speName2,
        },
      ],
      [
        'specs2',
        {
          initialValue: this.specs.specs2,
        },
      ],
    ]);
  }

  onClick() {
    this.visible = true;
  }

  onConfirm() {
    this.form.validateFields((errors, values) => {
      if (errors) return;
      if (!values.speName2 || !values.specs2) {
        delete values.speName2;
        delete values.specs2;
      }
      this.$emit('regenerate', values);
      this.visible = false;
    });
  }
}
