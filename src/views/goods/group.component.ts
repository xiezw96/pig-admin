import { WrappedFormUtils } from 'ant-design-vue/types/form/form';
import { Component, Mixins } from 'vue-property-decorator';

import { EditingMode } from '@/enums';
import { Column, FormGroup, GoodsGroup } from '@/interfaces';
import { Layout } from '@/mixins';
import { FindGroupsDto, groupService } from '@/services';

import { columns } from './group.columns';

@Component<GroupComponent>({
  beforeCreate() {
    this.queryingForm = this.$form.createForm(this);
    (this.queryingFormGroup = {
      name: ['name'],
    }),
      (this.editingForm = this.$form.createForm(this));
    this.editingFormGroup = {
      name: ['name', { rules: [{ required: true, message: '请输入名称' }] }],
      sort: ['sort', { rules: [{ required: true, message: '请输入序号' }] }],
    };
    this.columns = columns;
  },
  created() {
    this.find();
  },
})
export class GroupComponent extends Mixins(Layout) {
  // #region 状态
  loading = false;
  list: any[] = [];
  mode = EditingMode.无;
  editingModal: any = null;
  // #endregion

  queryingForm: WrappedFormUtils;
  queryingFormGroup: FormGroup;
  editingForm: WrappedFormUtils;
  editingFormGroup: FormGroup;
  prevFindParams: any;
  record: any;
  columns: Column[];

  onSearch() {
    this.queryingForm.validateFields((errors, values) => {
      if (errors) return;
      this.find(values);
    });
  }

  onReset() {
    this.queryingForm.resetFields();
  }

  async onCreate() {
    this.mode = EditingMode.新增;
    this.editingModal = {
      title: '新增',
    };
    await this.$nextTick();
    this.editingForm.setFieldsValue({ name: undefined, sort: undefined });
  }

  async onUpdate(this: any, record: GoodsGroup) {
    this.mode = EditingMode.编辑;
    this.record = record;
    this.editingModal = {
      title: '编辑',
    };
    await this.$nextTick();
    this.editingForm.setFieldsValue({ name: record.name, sort: record.sort });
  }

  async onDelete(record: GoodsGroup) {
    groupService.remove(record.id);
  }

  onConfirm() {
    switch (this.mode) {
      case EditingMode.新增:
        this.editingForm.validateFields(async (errors, values) => {
          if (errors) return;
          await groupService.create(values);
          this.refresh();
          this.mode = EditingMode.无;
        });
        break;
      case EditingMode.编辑:
        this.editingForm.validateFields(async (errors, values) => {
          if (errors) return;
          await groupService.update(this.record!.id, values);
          this.refresh();
          this.mode = EditingMode.无;
          this.record = undefined;
        });
        break;
    }
  }

  onCancel() {
    this.mode = EditingMode.无;
  }

  async find(dto?: FindGroupsDto) {
    this.loading = true;
    try {
      const data = await groupService.find(dto);
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
export { GroupComponent as default };
