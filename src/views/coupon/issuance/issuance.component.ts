import { WrappedFormUtils } from 'ant-design-vue/types/form/form';
import { Component } from 'vue-property-decorator';
import { Mixins } from 'vue-property-decorator';

import { CouponIssuanceType } from '@/enums';
import { FormGroup } from '@/interfaces';
import { issuanceService } from '@/services';
import { Layout } from '@/views/mixins';

import { columns } from './issuance.columns';

@Component
export default class IssuanceComponent extends Mixins(Layout) {
  queryingForm: WrappedFormUtils;
  queryingFormGroup: FormGroup = {
    name: ['name'],
    grantType: ['grantType'],
  };
  editingForm: WrappedFormUtils;
  editingFormGroup: FormGroup = {
    voucherId: [
      'voucherId',
      { rules: [{ required: true, message: '请选择一个代金券' }] },
    ],
    userId: [
      'userId',
      { rules: [{ required: true, message: '请选择一个代理商' }] },
    ],
  };

  prevFindParams: any;

  CouponIssuanceType = CouponIssuanceType;

  loading = false;

  visible = false;

  list: any[] = [];

  coupons: any[] = [];

  agents: any[] = [];

  columns = columns;

  selectedCoupon: any = null;

  beforeCreate() {
    this.queryingForm = this.$form.createForm(this);
    this.editingForm = this.$form.createForm(this, {
      onValuesChange: (_props, fields) => {
        if (Object.prototype.hasOwnProperty.call(fields, 'voucherId')) {
          const selected = this.coupons.find(
            coupon => coupon.id === fields.voucherId,
          );
          if (!selected) return;
          this.selectedCoupon = selected;
        }
      },
    });
  }

  created() {
    this.find();
    issuanceService.findAllAvailableCoupons().then(data => {
      this.coupons = data;
    });
    issuanceService.findAllAgents().then(data => {
      this.agents = data;
    });
  }

  /**
   * 搜索
   */
  onSearch() {
    this.queryingForm.validateFields((errors, values) => {
      if (errors) return;
      this.find(values);
    });
  }

  /**
   * 新增
   */
  async onCreate() {
    this.editingForm.resetFields();
    this.visible = true;
  }

  /**
   * 确认编辑
   */
  onConfirm() {
    this.editingForm.validateFields(async (errors, values) => {
      if (errors) return;
      await issuanceService.create({
        ...values,
        grantType: CouponIssuanceType.手动发放,
      });
      this.visible = false;
      this.refresh();
    });
  }

  /**
   * 取消编辑
   */
  onCancel() {
    this.visible = false;
  }

  onReset() {
    this.queryingForm.resetFields();
  }

  onValuesChange(_props: any, fields: any) {
    console.log(fields);
    if (Object.prototype.hasOwnProperty.call(fields, 'voucherId')) {
      const selected = this.coupons.find(
        coupon => coupon.id === fields.voucherId,
      );
      if (!selected) return;

      return selected;
    }
  }

  async find(dto?: any) {
    this.loading = true;
    try {
      const data = await issuanceService.find(dto);
      this.list = data.data;
      this.prevFindParams = dto;
    } finally {
      this.loading = false;
    }
  }

  refresh() {
    this.find(this.prevFindParams);
  }
}
