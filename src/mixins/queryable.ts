import { FormGroup } from '@/interfaces';
import { WrappedFormUtils } from 'ant-design-vue/types/form/form';
import { Component, Vue } from 'vue-property-decorator';

@Component<Queryable>({
  created() {
    this.find();
  },
  beforeCreate() {
    this.queryingForm = this.$form.createForm(this);
  },
})
export class Queryable extends Vue {
  queryingForm: WrappedFormUtils;
  queryingFormGroup: FormGroup;

  loading = false;

  list: any[] = [];

  prevFindParams: any;

  service: { find: (dto: any) => Promise<any[]> };

  onSearch() {
    this.queryingForm.validateFields((errors, values) => {
      if (errors) return;
      this.find(values);
    });
  }

  onReset() {
    this.queryingForm.resetFields();
  }

  async find(dto?: any) {
    this.loading = true;
    try {
      const data = await this.service.find(dto);
      this.list = data;
      this.prevFindParams = dto;
    } finally {
      this.loading = false;
    }
  }

  async refresh() {
    this.find(this.prevFindParams);
  }
}
