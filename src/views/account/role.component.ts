import { Component, Mixins } from 'vue-property-decorator';

import { EditingMode } from '@/enums';
import { FormGroup } from '@/interfaces';
import { Creatable, Deletable, Editable, Layout, Queryable } from '@/mixins';
import { permissionService, roleService } from '@/services';

import { columns } from './role.columns';

@Component<RoleComponent>({
  created() {
    permissionService.find().then(data => {
      this.permissions = data;
    });
  },
})
export default class RoleComponent extends Mixins(
  Layout,
  Queryable,
  Editable,
  Creatable,
  Deletable,
) {
  permissions: any[] | null = null;
  rolePermissions: any[] | null = null;

  queryingFormGroup: FormGroup = {
    roleName: ['roleName'],
  };
  editingFormGroup: FormGroup = {
    roleName: [
      'roleName',
      { rules: [{ required: true, message: '请输入名称' }] },
    ],
  };

  columns = columns;

  service = roleService;

  initialCreatingFieldsValue = { roleName: undefined };

  permissionModalVisible = false;

  get permissionTreeData(): any[] {
    if (!this.permissions) return [];
    return this.transformTreeData(this.permissions);
  }

  checkedKeys: any[] = [];

  onConfirm() {
    switch (this.mode) {
      case EditingMode.新增:
        this.editingForm.validateFields(async (errors, values) => {
          if (errors) return;
          await this.service.create(values);
          this.refresh();
          this.mode = EditingMode.无;
        });
        break;
      case EditingMode.编辑:
        this.editingForm.validateFields(async (errors, values) => {
          if (errors) return;
          await this.service.update(this.record!.roleId, values);
          this.refresh();
          this.mode = EditingMode.无;
          this.record = undefined;
        });
        break;
    }
  }

  async onSetPermission(record: any) {
    this.checkedKeys = [];
    this.record = record;
    this.permissionModalVisible = true;
    const data = await roleService.findPermissions(record.roleId);
    this.checkedKeys = data;
  }

  async onConfirmSetPermission() {
    await roleService.updatePermissions(this.record.roleId, this.checkedKeys);
    this.permissionModalVisible = false;
  }

  private transformTreeData(items: any[]) {
    return items.map(item => ({
      title: item.name,
      key: item.id,
      children: item.children
        ? this.transformTreeData(item.children)
        : undefined,
    }));
  }

  private getRolePermissionKeys(items: any[]) {
    if (!this.rolePermissions) return [];
    const keys = items.map(item => item.id);

    const childKeys = items
      .map(item => this.getRolePermissionKeys(item.children))
      .flat();

    return keys.concat(childKeys);
  }
}
