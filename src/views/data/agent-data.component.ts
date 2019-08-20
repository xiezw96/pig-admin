import { WrappedFormUtils } from 'ant-design-vue/types/form/form';
import axios from 'axios';
import moment, { Moment } from 'moment';
import { Component, Vue } from 'vue-property-decorator';

import { PAGINATION } from '@/constants';
import { FormGroup } from '@/interfaces';
import { agentService } from '@/services';
import { toFormGroup } from '@/utils';

import { columns } from './agent-data.columns';

@Component<OrderDataComponent>({
  beforeCreate() {
    this.queryingForm = this.$form.createForm(this);
    this.queryingFormGroup = toFormGroup({
      agentId: { rules: [{ required: true, message: '请选择一个代理商' }] },
      createDate: { initialValue: [moment().subtract(1, 'day'), moment()] },
    });
  },
  async created() {
    const [agents] = await Promise.all([agentService.find()]);

    this.agents = agents;
  },
})
export default class OrderDataComponent extends Vue {
  columns = columns;

  loading = false;

  list: any[] = [];

  queryingForm: WrappedFormUtils;

  queryingFormGroup: FormGroup;

  agents: any[] = [];

  sum: any = {};

  async onChange() {
    // 表单值是异步更新的
    await this.$nextTick();
    this.queryingForm.validateFields(async (errors, values) => {
      if (errors) return;
      const { createDate, ...dto } = values;

      const [start, end] = createDate;
      dto.createStartDate = (start as Moment)
        .startOf('day')
        .format('YYYY-MM-DD HH:mm:ss');
      dto.createEndDate = (end as Moment)
        .endOf('day')
        .format('YYYY-MM-DD HH:mm:ss');

      this.find(dto);
    });
  }

  onReset() {
    this.queryingForm.resetFields();
  }

  filterAgent(input, option) {
    return (
      option.componentOptions.children[0].text
        .toLowerCase()
        .indexOf(input.toLowerCase()) >= 0
    );
  }

  private async find(dto) {
    this.loading = true;
    try {
      const [agentData, agentSumData] = await Promise.all([
        this.fetchAgentData(dto),
        this.fetchAgentSumData(dto),
      ]);
      this.list = agentData;
      this.sum = agentSumData || {};
    } finally {
      this.loading = false;
    }
  }

  private async fetchAgentData(dto) {
    const {
      data: {
        data: { records },
      },
    } = await axios.get('api/admin/agentdayreport/page', {
      params: { ...PAGINATION, ...dto },
    });

    return records;
  }

  private async fetchAgentSumData(dto) {
    const {
      data: { data },
    } = await axios.get('api/admin/agentdayreport/sum', { params: dto });

    return data;
  }
}
