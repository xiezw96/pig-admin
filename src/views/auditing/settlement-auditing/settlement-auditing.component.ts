import { WrappedFormUtils } from 'ant-design-vue/types/form/form';
import { invoke } from 'lodash';
import { Component, Vue } from 'vue-property-decorator';

import { Column, FormGroup } from '@/interfaces';
import { toFormGroup } from '@/utils';

import { settlementAuditingService } from '@/services/auditing/settlement-auditing.service';
import ButtonForAuditingComponent from './button-for-auditing.vue';
import { columns } from './settlement-auditing.columns';

@Component<SettlementAuditingComponent>({
  components: {
    'app-button-for-auditing': ButtonForAuditingComponent,
  },
  beforeCreate() {
    this.queryingForm = this.$form.createForm(this);
    this.queryingFormGroup = toFormGroup([['name'], ['status'], ['timeRange']]);
    this.columns = columns;
  },
  created() {
    this.find();
  },
})
export class SettlementAuditingComponent extends Vue {
  // #region 组件状态
  loading = false;
  list: any[] = [];
  // #endregion

  queryingForm: WrappedFormUtils;
  queryingFormGroup: FormGroup;
  prevFindParams: any;
  columns: Column[];

  onSearch() {
    this.queryingForm.validateFields((errors, values) => {
      if (errors) return;
      const { timeRange, ...rest } = values;
      const [startTime, endTime] = timeRange || ([] as any);
      this.find({
        ...rest,
        reqStartTime: invoke(startTime, 'format', 'YYYY-MM-DD HH:mm:ss'),
        reqEndTime: invoke(endTime, 'format', 'YYYY-MM-DD HH:mm:ss'),
      });
    });
  }

  onAfterAudit() {
    this.refresh();
  }

  private async find(dto?: any) {
    this.loading = true;
    try {
      const data = await settlementAuditingService.find(dto);
      this.prevFindParams = dto;
      this.list = data;
    } finally {
      this.loading = false;
    }
  }

  private refresh() {
    this.find(this.prevFindParams);
  }
}
export { SettlementAuditingComponent as default };
