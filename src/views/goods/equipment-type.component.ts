import { WrappedFormUtils } from 'ant-design-vue/types/form/form';
import axios from 'axios';
import { Component, Mixins } from 'vue-property-decorator';

import { EditingMode } from '@/enums';
import { Column, FormGroup } from '@/interfaces';
import { Layout } from '@/mixins';
import { toFormGroup } from '@/utils';

import { equipmentService } from '@/services';
import { columns } from './equipment-type.columns';

@Component<MachineTypeComponent>({
  beforeCreate() {
    this.columns = columns;
    this.queryingForm = this.$form.createForm(this);
    this.queryingFormGroup = toFormGroup([['spec']]);

    this.editingForm = this.$form.createForm(this);
    this.editingFormGroup = toFormGroup([
      ['spec', { rules: [{ required: true, message: '请输入设备型号' }] }],
      ['protocol', { rules: [{ required: true, message: '请输入协议' }] }],
      ['provider', { rules: [{ required: true, message: '请输入厂家' }] }],
      [
        'aisleCount',
        { rules: [{ required: true, message: '请输入货道数量' }] },
      ],
      [
        'tradePrice',
        { rules: [{ required: true, message: '请输入采购价格' }] },
      ],
    ]);
  },
  created() {
    this.refresh();
  },
})
export class MachineTypeComponent extends Mixins(Layout) {
  // #region 状态
  mode = EditingMode.无;

  loading = false;

  machineTypes: any[] = [];

  editingModal: any = null;
  // #endregion

  columns: Column[];

  queryingForm: WrappedFormUtils;
  queryingFormGroup: FormGroup;

  editingForm: WrappedFormUtils;
  editingFormGroup: FormGroup;

  record: any;
  prevFetchParams: any;

  onSearch() {
    this.queryingForm.validateFields((errors, values) => {
      if (errors) return;

      this.find(values);
    });
  }

  async onCreate() {
    this.mode = EditingMode.新增;
    this.editingModal = {
      title: '新增',
    };
    await this.$nextTick();
    this.editingForm.setFieldsValue({
      spec: undefined,
      protocol: undefined,
      provider: undefined,
      aisleCount: undefined,
      tradePrice: undefined,
    });
  }

  async onUpdate(record) {
    this.record = record;
    this.mode = EditingMode.编辑;
    this.editingModal = {
      title: '编辑',
    };
    await this.$nextTick();
    this.editingForm.setFieldsValue({
      spec: this.record.spec,
      protocol: this.record.protocol,
      provider: this.record.provider,
      aisleCount: this.record.aisleCount,
      tradePrice: this.record.tradePrice,
    });
  }

  async onDelete(record) {
    await this.deleteType(record.id);
    this.refresh();
  }

  async onConfirm() {
    this.editingForm.validateFields(async (errors, values) => {
      if (errors) return;

      switch (this.mode) {
        case EditingMode.新增:
          await this.addType(values);
          this.refresh();
          this.finishEdit();
          break;
        case EditingMode.编辑:
          await this.updateType(this.record.id, values);
          this.refresh();
          this.finishEdit();
      }
    });
  }

  async onCancel() {
    this.finishEdit();
  }

  async find(dto?) {
    this.loading = true;

    try {
      const data = await equipmentService.fetchTypes(dto);
      this.machineTypes = data;
      this.prevFetchParams = dto;
    } finally {
      this.loading = false;
    }
  }

  async refresh() {
    this.find(this.prevFetchParams);
  }

  private async addType(dto) {
    return axios.post('api/admin/salesmachinespec', dto);
  }

  private async updateType(id, dto) {
    return axios.put('api/admin/salesmachinespec', { id, ...dto });
  }

  private async deleteType(id) {
    return axios.delete(`api/admin/salesmachinespec/${id}`);
  }

  private finishEdit() {
    this.mode = EditingMode.无;
    this.record = undefined;
  }
}
export default MachineTypeComponent;
