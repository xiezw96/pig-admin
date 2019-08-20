import { message } from 'ant-design-vue';
import { WrappedFormUtils } from 'ant-design-vue/types/form/form';
import { ModalOptions } from 'ant-design-vue/types/modal';
import { invoke } from 'lodash';
import moment from 'moment';
import { Component, Mixins } from 'vue-property-decorator';

import { EditingMode } from '@/enums';
import { FormGroup } from '@/interfaces';
import { Layout } from '@/mixins';
import { couponService } from '@/services';

import { columns } from './coupon.columns';

const initialValues = {
  name: undefined,
  price: undefined,
  minPrice: undefined,
  timeRange: [undefined, undefined],
};

@Component
export default class CouponComponent extends Mixins(Layout) {
  queryingForm!: WrappedFormUtils;
  queryingFormGroup: FormGroup = {
    name: ['name'],
    status: ['status'],
  };
  editingForm!: WrappedFormUtils;
  editingFormGroup: FormGroup = {
    name: ['name', { rules: [{ required: true, message: '请输入名称' }] }],
    price: ['price', { rules: [{ required: true, message: '请输入面额' }] }],
    minPrice: [
      'minPrice',
      { rules: [{ required: true, message: '最低消费' }] },
    ],
    timeRange: [
      'timeRange',
      { rules: [{ required: true, message: '有效时候' }] },
    ],
  };

  loading = false;

  list: any[] = [];

  mode = EditingMode.无;

  record: any = null;

  columns = columns;

  editingModal: Partial<ModalOptions> | null = null;

  prevFindParams: any;

  beforeCreate() {
    this.queryingForm = this.$form.createForm(this);
    this.editingForm = this.$form.createForm(this);
  }

  created() {
    this.find();
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
    this.mode = EditingMode.新增;
    this.record = {};
    this.editingModal = {
      title: '新增',
    };
    await this.$nextTick();
    this.editingForm.setFieldsValue(initialValues);
  }

  /**
   * 更新
   */
  async onUpdate(record: any) {
    this.mode = EditingMode.编辑;
    this.record = record;
    this.editingModal = {
      title: '编辑',
    };
    await this.$nextTick();
    const { startTime, endTime, ...rest } = record;
    this.editingForm.setFieldsValue({
      ...rest,
      timeRange: [moment(startTime), moment(endTime)],
    });
  }
  async onDelete(record: any) {
    const success = couponService.remove(record.id);

    if (success) {
      this.refresh();
      return;
    }
    message.warn('删除失败，代金券已发放');
  }

  /**
   * 确认编辑
   */
  onConfirm() {
    switch (this.mode) {
      case EditingMode.新增:
        this.editingForm.validateFields(async (errors, values) => {
          if (errors) return;
          const { timeRange, ...rest } = values;
          const [startTime, endTime] = timeRange || ([] as any);
          await couponService.create({
            ...rest,
            startTime: invoke(startTime, 'format', 'YYYY-MM-DD hh:mm:ss'),
            endTime: invoke(endTime, 'format', 'YYYY-MM-DD hh:mm:ss'),
          });
          this.refresh();
          this.mode = EditingMode.无;
        });
        break;
      case EditingMode.编辑:
        this.editingForm.validateFields(async (errors, values) => {
          if (errors) return;
          const { timeRange, ...rest } = values;
          const [startTime, endTime] = timeRange || ([] as any);
          await couponService.update(this.record!.id, {
            ...rest,
            startTime: invoke(startTime, 'format', 'YYYY-MM-DD hh:mm:ss'),
            endTime: invoke(endTime, 'format', 'YYYY-MM-DD hh:mm:ss'),
          });
          this.refresh();
          this.mode = EditingMode.无;
          this.record = undefined;
        });
        break;
    }
  }

  /**
   * 取消编辑
   */
  onCancel() {
    this.mode = EditingMode.无;
  }

  onReset() {
    this.queryingForm.resetFields();
  }

  async find(dto?: any) {
    this.loading = true;
    try {
      const data = await couponService.find(dto);
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
