import { WrappedFormUtils } from 'ant-design-vue/types/form/form';
import { Component, Mixins } from 'vue-property-decorator';

import { EditingMode } from '@/enums';
import { Column, FormGroup, GoodsCaterogy } from '@/interfaces';
import { Layout } from '@/mixins';
import { categoryService, FindCategoriesDto } from '@/services';

import { columns } from './category.columns';

@Component<CategoryComponent>({
  beforeCreate() {
    this.queryingForm = this.$form.createForm(this);
    this.queryingFormGroup = {
      name: ['name'],
    };
    this.editingForm = this.$form.createForm(this);
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
export class CategoryComponent extends Mixins(Layout) {
  // #region 状态
  loading = false;
  mode = EditingMode.无;
  list: any[] = [];
  editingModal: any = null;
  // #endregion

  queryingForm: WrappedFormUtils;
  queryingFormGroup: FormGroup;
  editingForm: WrappedFormUtils;
  editingFormGroup: FormGroup;
  record: any;
  prevFindParams: any;
  columns: Column[];

  onReset() {
    this.queryingForm.resetFields();
  }

  onSearch() {
    this.queryingForm.validateFields((errors, values) => {
      if (errors) return;
      this.$store.dispatch('goods/category/search', values);
    });
  }

  async onCreate() {
    this.mode = EditingMode.新增;
    this.editingModal = {
      title: '新增',
    };
    await this.$nextTick();
    this.editingForm.setFieldsValue({ name: undefined, sort: undefined });
  }

  async onUpdate(record: GoodsCaterogy) {
    this.mode = EditingMode.编辑;
    this.record = record;
    this.editingModal = {
      title: '编辑',
    };
    await this.$nextTick();
    this.editingForm.setFieldsValue({ name: record.name, sort: record.sort });
  }

  async onDelete(record: GoodsCaterogy) {
    await categoryService.remove(record.id);
    this.refresh();
  }

  onConfirm() {
    switch (this.mode) {
      case EditingMode.新增:
        this.editingForm.validateFields(async (errors, values) => {
          if (errors) return;
          await categoryService.create(values);
          this.refresh();
          this.mode = EditingMode.无;
        });
        break;
      case EditingMode.编辑:
        this.editingForm.validateFields(async (errors, values) => {
          if (errors) return;
          await categoryService.update(this.record!.id, values);
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

  async find(dto?: FindCategoriesDto) {
    this.loading = true;
    try {
      const data = await categoryService.find(dto);
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
export { CategoryComponent as default };
