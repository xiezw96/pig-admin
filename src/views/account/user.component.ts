import { WrappedFormUtils } from 'ant-design-vue/types/form/form';
import { get } from 'lodash';
import { Component, Mixins } from 'vue-property-decorator';

import { EditingMode } from '@/enums';
import { FormControl, FormGroup } from '@/interfaces';
import { Creatable, Deletable, Editable, Layout, Queryable } from '@/mixins';
import { roleService, userService } from '@/services';

import { columns } from './user.columns';

const passwordRules = [
  { required: true, message: '请输入密码' },
  {
    message: '密码至少包含数字和字母的组合',
    validator(rule, value) {
      if (value && value.length >= 6 && value.length <= 10) {
        return /^(?=.*?[a-z])(?=.*?[0-9]).{6,10}$/.test(value);
      }
      return true;
    },
  },
  {
    min: 6,
    max: 10,
    message: '密码长度必须为6-10个字符',
  },
];

@Component<UserComponent>({
  beforeCreate() {
    this.formForCreating = this.$form.createForm(this);
    this.formForUpdating = this.$form.createForm(this);
    this.passwordForm = this.$form.createForm(this);
  },
  created() {
    this.findRoles();
  },
})
export default class UserComponent extends Mixins(
  Layout,
  Queryable,
  Editable,
  Creatable,
  Deletable,
) {
  queryingFormGroup: FormGroup = {
    username: ['username'],
  };

  formForCreating: WrappedFormUtils;
  formForUpdating: WrappedFormUtils;

  editingFormGroup: FormGroup = {
    username: [
      'username',
      { rules: [{ required: true, message: '请输入用户名称' }] },
    ],
    showName: ['showName'],
    password: ['password', { rules: passwordRules }],
    roleId: [
      'roleId',
      { rules: [{ required: true, message: '请指定一个角色' }] },
    ],
  };

  passwordForm: WrappedFormUtils;
  passwordControl: FormControl = [
    'password',
    {
      rules: passwordRules,
    },
  ];

  columns = columns;

  service = userService;

  roles: any[] = [];

  passwordModalVisible = false;

  get creatingModalVisible() {
    return this.mode === EditingMode.新增;
  }
  set creatingModalVisible(visible) {
    if (visible) return;
    this.mode = EditingMode.无;
  }

  get updatingModalVisible() {
    return this.mode === EditingMode.编辑;
  }
  set updatingModalVisible(visible) {
    if (visible) return;
    this.mode = EditingMode.无;
  }

  initialCreatingFieldsValue = {
    username: undefined,
    showName: undefined,
    roleId: undefined,
  };

  async onCreate() {
    this.mode = EditingMode.新增;
    this.editingModal = {
      title: '新增',
    };
    await this.$nextTick();
    this.formForCreating.setFieldsValue(this.initialCreatingFieldsValue);
  }

  async onUpdate(record: any) {
    this.mode = EditingMode.编辑;
    this.record = record;
    this.editingModal = {
      title: '编辑',
    };
    console.log(this.record);
    await this.$nextTick();
    this.formForUpdating.setFieldsValue({
      ...this.record,
      roleId: get(this.record.roleList[0], 'roleId'),
    });
  }

  onConfirm() {
    switch (this.mode) {
      case EditingMode.新增:
        this.formForCreating.validateFields(async (errors, values) => {
          if (errors) return;
          const { roleId, ...rest } = values;
          await userService.create({ ...rest, role: [roleId] });
          this.refresh();
          this.mode = EditingMode.无;
        });
        break;
      case EditingMode.编辑:
        this.formForUpdating.validateFields(async (errors, values) => {
          if (errors) return;
          const { roleId, ...rest } = values;
          await userService.update(this.record.userId, {
            ...rest,
            role: [roleId],
          });
          this.refresh();
          this.mode = EditingMode.无;
          this.record = null;
        });
        break;
    }
  }

  onChangePassword(record) {
    this.record = record;

    this.passwordModalVisible = true;
  }

  onConfirmChangePassword() {
    this.passwordForm.validateFields(async (errors, values) => {
      if (errors) return;
      await userService.changePassword(this.record.userId, {
        ...values,
        username: this.record.username,
        role: null,
      });
      this.passwordModalVisible = false;
    });
  }

  async findRoles() {
    const data = await roleService.find();
    this.roles = data;
  }
}
