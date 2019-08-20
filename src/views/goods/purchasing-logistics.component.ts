import { WrappedFormUtils } from 'ant-design-vue/types/form/form';
import axios from 'axios';
import { Moment } from 'moment';
import { Component, Mixins } from 'vue-property-decorator';

import { logisticsStatusOptions, PAGINATION } from '@/constants';
import { Column, FormGroup } from '@/interfaces';
import { Layout } from '@/mixins';
import { toFormGroup } from '@/utils';

import { columns as orderColumns } from './order.columns';
import { columns } from './purchasing-logistics.columns';

@Component<PurchasingLogisticsComponent>({
  beforeCreate() {
    this.queryingForm = this.$form.createForm(this);
    this.logisticsForm = this.$form.createForm(this);
    this.queryingFormGroup = toFormGroup({
      code: {},
      agentName: {},
      status: {},
      sendTime: { initialValue: [] },
    });
    this.logisticsFormGroup = toFormGroup({
      logisticsCompany: {
        rules: [{ required: true, message: '请输入物流公司名称' }],
      },
      logisticsCode: {},
    });
    this.logisticsStatusOptions = logisticsStatusOptions;
    this.columns = columns;
    this.orderColumns = orderColumns;
  },
  created() {
    this.getLogistics();
  },
})
export class PurchasingLogisticsComponent extends Mixins(Layout) {
  // #region 状态
  loading = false;

  list: any[] = [];

  record: any = null;

  visible = false;
  // #endregion

  queryingForm: WrappedFormUtils;
  logisticsForm: WrappedFormUtils;

  queryingFormGroup: FormGroup;
  logisticsFormGroup: FormGroup;

  logisticsStatusOptions: any[];

  columns: Column[];
  orderColumns: Column[];

  prevFindParams: any;

  onSearch() {
    this.queryingForm.validateFields((errors, values) => {
      if (errors) return;
      const { sendTime, ...dto } = values;

      if (sendTime.length === 2) {
        const [start, end] = sendTime;
        dto.sendStartTime = (start as Moment)
          .startOf('day')
          .format('YYYY-MM-DD HH:mm:ss');
        dto.sendEndTime = (end as Moment)
          .endOf('day')
          .format('YYYY-MM-DD HH:mm:ss');
      }

      this.getLogistics(dto);
    });
  }

  onSend(record) {
    this.record = record;
    this.logisticsForm.resetFields();
    this.visible = true;
  }

  async onUpdate(record) {
    this.record = record;
    this.visible = true;
    await this.$nextTick();
    this.logisticsForm.setFieldsValue({
      logisticsCompany: record.logisticsCompany,
      logisticsCode: record.logisticsCode,
    });
  }

  onConfirm() {
    this.logisticsForm.validateFields(async (errors, values) => {
      if (errors) return;
      await this.send(this.record.id, values);
      this.getLogistics(this.prevFindParams);
      this.visible = false;
    });
  }

  atob(value) {
    if (typeof value !== 'string') return '';
    return window.atob(value);
  }

  private async getLogistics(dto?) {
    this.loading = true;
    try {
      const data = await this.fetchLogistics(dto);
      this.list = data;
      this.prevFindParams = dto;
    } finally {
      this.loading = false;
    }
  }

  private async fetchLogistics(dto?) {
    const {
      data: {
        data: { records },
      },
    } = await axios.get('api/admin/order/logistics/page', {
      params: { ...PAGINATION, ...dto },
    });

    return records;
  }

  private async send(id, dto) {
    await axios.put('api/admin/order/logistics/send', {
      id,
      ...dto,
    });
  }
}
export { PurchasingLogisticsComponent as default };
