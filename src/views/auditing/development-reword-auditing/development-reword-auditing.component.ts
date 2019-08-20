import { WrappedFormUtils } from 'ant-design-vue/types/form/form';
import { Moment } from 'moment';
import { Component, Vue } from 'vue-property-decorator';

import { Column, FormGroup } from '@/interfaces';
import { developmentRewordAuditingService } from '@/services';
import { toFormGroup } from '@/utils';

import ButtonForAuditingComponent from './button-for-auditing.vue';
import { columns } from './development-reword-auditing.columns';

@Component<DevelopmentRewordAuditingComponent>({
  components: {
    'app-button-for-auditing': ButtonForAuditingComponent,
  },
  beforeCreate() {
    this.queryingForm = this.$form.createForm(this);
    this.queryingFormGroup = toFormGroup([
      ['agentName'],
      ['dateRange', { initialValue: [] }],
      ['auditStatus'],
    ]);
    this.columns = columns;
  },
  created() {
    this.find();
  },
})
export class DevelopmentRewordAuditingComponent extends Vue {
  // #region 组件状态
  loading = false;
  visible = false;
  list: any[] = [];
  // #endregion

  queryingForm: WrappedFormUtils;
  queryingFormGroup: FormGroup;
  columns: Column[];
  prevFindParams: any;

  /**
   * 搜索
   */
  onSearch() {
    this.queryingForm.validateFields((errors, values) => {
      if (errors) return;
      const { dateRange, ...rest } = values;
      const dto: any = { ...rest };

      if (dateRange.length === 2) {
        const [start, end] = dateRange as [Moment, Moment];
        dto.reqStartTime = start.startOf('day').format('YYYY-MM-DD HH:mm:ss');
        dto.reqEndTime = end.endOf('day').format('YYYY-MM-DD HH:mm:ss');
      }
      this.find(dto);
    });
  }

  async onAudit({ values, close }) {
    await developmentRewordAuditingService.update(values);
    close();
    this.refresh();
  }

  async find(dto?) {
    this.loading = true;
    try {
      const data = await developmentRewordAuditingService.find(dto);
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
export { DevelopmentRewordAuditingComponent as default };
