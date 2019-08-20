import { Pagination } from 'ant-design-vue';
import { WrappedFormUtils } from 'ant-design-vue/types/form/form';
import axios from 'axios';
import { Moment } from 'moment';
import { Component, Vue } from 'vue-property-decorator';

import { FormGroup } from '@/interfaces';
import { toFormGroup } from '@/utils';

import { columns } from './agent-activated-data.columns';

@Component<OrderDataComponent>({
  beforeCreate() {
    this.queryingForm = this.$form.createForm(this);
    this.queryingFormGroup = toFormGroup({
      orderCode: {},
      agentName: {},
      comboName: {},
      comboType: {},
      createDate: { initialValue: [] },
    });
  },
  async created() {
    const { current, pageSize } = this.pagination;
    this.find({ current, size: pageSize });
  },
})
export default class OrderDataComponent extends Vue {
  columns = columns;

  loading = false;

  list: any[] = [];

  pagination: Partial<Pagination> = {
    current: 1,
    pageSize: 10,
    total: 0,
  };

  queryingForm: WrappedFormUtils;

  queryingFormGroup: FormGroup;

  prevFindParams: any = {};

  onSearch() {
    this.queryingForm.validateFields(async (errors, values) => {
      if (errors) return;

      const { createDate, ...rest } = values;

      if (createDate.length === 2) {
        const [start, end] = createDate;
        rest.startCreateDate = (start as Moment)
          .startOf('day')
          .format('YYYY-MM-DD HH:mm:ss');
        rest.endCreateDate = (end as Moment)
          .endOf('day')
          .format('YYYY-MM-DD HH:mm:ss');
      }

      const dto = { ...this.prevFindParams, ...rest, current: 1 };
      await this.find(dto);
      this.pagination.current = 1;
    });
  }

  async onChangePage(pagination) {
    const { current } = pagination;
    const dto = { ...this.prevFindParams, current };
    await this.find(dto);
    this.pagination.current = current;
  }

  onReset() {
    this.queryingForm.resetFields();
  }

  private async find(dto?: any) {
    this.loading = true;
    try {
      const { total, records } = await this.fetchAgentActivedData(dto);
      this.list = records;
      this.pagination.total = total;
      this.prevFindParams = dto;
    } finally {
      this.loading = false;
    }
  }

  private async fetchAgentActivedData(dto) {
    const {
      data: { data },
    } = await axios.get('api/admin/agentcombo/page', {
      params: dto,
    });

    return data;
  }
}
