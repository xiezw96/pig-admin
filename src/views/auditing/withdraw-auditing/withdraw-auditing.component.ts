import { WrappedFormUtils } from 'ant-design-vue/types/form/form';
import { TableRowSelection } from 'ant-design-vue/types/table/table';
import { invoke } from 'lodash';
import { Component, Vue } from 'vue-property-decorator';

import { Column, FormGroup } from '@/interfaces';
import { withdrawAudtingService } from '@/services';
import { toFormGroup } from '@/utils';

import ButtonForAuditingComponent from './button-for-auditing.vue';
import { columns } from './withdraw-auditing.columns';

@Component<WithdrawAuditingComponent>({
  components: {
    'app-button-for-auditing': ButtonForAuditingComponent,
  },
  beforeCreate() {
    this.queryingForm = this.$form.createForm(this);
    this.queryingFormGroup = toFormGroup([['userName'], ['reqStartTime']]);
    this.layout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
    this.columns = columns;
    // this.rowSelection = {};
  },
  created() {
    this.find();
  },
})
export class WithdrawAuditingComponent extends Vue {
  // #region 组件状态
  loading = false;
  visible = false;
  list: any[] = [];
  // #endregion

  queryingForm: WrappedFormUtils;
  queryingFormGroup: FormGroup;
  columns: Column[];
  layout: any;
  prevFindParams: any;
  rowSelection: TableRowSelection;

  /**
   * 搜索
   */
  onSearch() {
    this.queryingForm.validateFields((errors, values) => {
      if (errors) return;
      const { reqStartTime, ...rest } = values;
      this.find({ ...rest, reqStartTime: invoke(reqStartTime, 'format', 'YYYY-MM-DD') });
    });
  }

  onAfterAudit() {
    this.refresh();
  }

  async onPay(id) {
    await withdrawAudtingService.pay(id);
    this.refresh();
  }

  async find(dto?: any) {
    this.loading = true;
    try {
      const data = await withdrawAudtingService.find(dto);
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
export { WithdrawAuditingComponent as default };
