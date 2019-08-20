import { WrappedFormUtils } from 'ant-design-vue/types/form/form';
import { Component, Vue } from 'vue-property-decorator';

import { Column, FormGroup } from '@/interfaces';
import { agentAuditingService } from '@/services';
import { toFormGroup } from '@/utils';

import { columns } from './agent-auditing.columns';
import ButtonForAuditingComponent from './button-for-auditing.vue';

@Component<AgentAuditingComponent>({
  components: {
    AppButtonForAuditing: ButtonForAuditingComponent,
  },
  beforeCreate() {
    this.queryingForm = this.$form.createForm(this);
    this.queryingFormGroup = toFormGroup([
      ['name'],
      ['phone'],
      ['auditStatus'],
    ]);
    this.columns = columns;
  },
  created() {
    this.find();
  },
})
export class AgentAuditingComponent extends Vue {
  // #region 组件状态
  loading = false;
  visible = false;
  list: any[] = [];
  // #endregion

  queryingForm: WrappedFormUtils;
  queryingFormGroup: FormGroup;
  prevFindParams: any;
  columns: Column[];

  onSearch() {
    this.queryingForm.validateFields((errors, values) => {
      if (errors) return;

      this.find(values);
    });
  }

  onAfterAudit() {
    this.refresh();
  }

  async find(dto?: any) {
    this.loading = true;
    try {
      const data = await agentAuditingService.find(dto);
      this.list = data;
      this.prevFindParams = dto;
    } finally {
      this.loading = false;
    }
  }

  refresh() {
    this.find(this.prevFindParams);
  }
}
export { AgentAuditingComponent as default };
