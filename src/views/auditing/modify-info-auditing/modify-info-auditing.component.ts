import { WrappedFormUtils } from 'ant-design-vue/types/form/form';
import { Moment } from 'moment';
import { Component, Vue } from 'vue-property-decorator';

import { Column, FormGroup } from '@/interfaces';
import { modifyInfoAuditingService } from '@/services';
import { toFormGroup } from '@/utils';

import ButtonForAuditingComponent from './button-for-auditing.vue';
import { columns } from './modify-info-auditing.columns';

@Component<ModifyInfoAuditingComponent>({
  components: {
    'app-button-for-auditing': ButtonForAuditingComponent,
  },
  beforeCreate() {
    this.queryingForm = this.$form.createForm(this);
    this.queryingFormGroup = toFormGroup([
      ['name'],
      ['updateAuditReqTime', { initialValue: [] }],
      ['updateAuditStatus'],
    ]);
    this.columns = columns;
  },
  created() {
    this.find();
  },
})
export class ModifyInfoAuditingComponent extends Vue {
  // #region 组件状态
  loading = false;
  list: any[] = [];
  // #endregion

  queryingForm: WrappedFormUtils;
  queryingFormGroup: FormGroup;
  prevFindParams: any;
  columns: Column[];
  layout: any;

  onSearch() {
    this.queryingForm.validateFields((errors, values) => {
      if (errors) return;
      const { updateAuditReqTime, ...dto } = values;
      if (updateAuditReqTime.length === 2) {
        const [start, end] = updateAuditReqTime;
        dto.updateAuditReqStartTime = (start as Moment)
          .startOf('day')
          .format('YYYY-MM-DD HH:mm:ss');
        dto.updateAuditReqEndTime = (end as Moment)
          .endOf('day')
          .format('YYYY-MM-DD HH:mm:ss');
      }
      this.find(dto);
    });
  }

  onAfterAudit() {
    this.refresh();
  }

  async find(dto?: any) {
    this.loading = true;
    try {
      const data = await modifyInfoAuditingService.find(dto);
      this.list = data.filter(item => item.updateAuditStatus !== null);
      this.prevFindParams = dto;
    } finally {
      this.loading = false;
    }
  }

  async refresh() {
    this.find(this.prevFindParams);
  }
}
export default ModifyInfoAuditingComponent;
