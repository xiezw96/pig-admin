import { WrappedFormUtils } from 'ant-design-vue/types/form/form';
import { Component, Mixins } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

import { areas } from '@/constants';
import { EditingMode } from '@/enums';
import { FormGroup } from '@/interfaces';
import { Creatable, Deletable, Editable, Layout, Queryable } from '@/mixins';
import { agentService } from '@/services';
import { a2b, toFormGroup } from '@/utils';

import { columns } from './agent.columns';
import ButtonForChangePassword from './button-for-change-password.vue';

const User = namespace('workspace/user');

@Component<AgentComponent>({
  components: {
    'button-for-change-password': ButtonForChangePassword,
  },
  beforeCreate() {
    this.area = areas;
    this.editingForm = this.$form.createForm(this);
  },
})
export default class AgentComponent extends Mixins(
  Layout,
  Queryable,
  Creatable,
  Deletable,
) {
  area: any;

  @User.State
  accessToken: string;

  queryingFormGroup: FormGroup = {
    name: ['name'],
  };

  editingForm: WrappedFormUtils;
  editingFormGroup: FormGroup = this.buildFormGroup();

  record: any = null;

  service = agentService;

  mode = EditingMode.无;

  columns = columns;

  editingModal: any = null;

  get editingModalVisible() {
    return !!this.mode;
  }
  set editingModalVisible(visible: boolean) {
    if (visible) return;
    this.mode = EditingMode.无;
  }

  get authorization() {
    return `Bearer ${this.accessToken}`;
  }

  async onCreate() {
    this.mode = EditingMode.新增;
    this.editingFormGroup = this.buildFormGroup();
    this.editingModal = {
      title: '新增',
    };
    await this.$nextTick();
    this.editingForm.resetFields();
    this.$forceUpdate();
  }

  async onUpdate(record: any) {
    this.mode = EditingMode.编辑;
    // this.record = record;
    this.record = await agentService.getAgentInfo(record.agentId);
    this.editingFormGroup = this.buildFormGroup(record);
    this.editingModal = {
      title: '编辑',
    };
    await this.$nextTick();
    this.editingForm.resetFields();
    this.$forceUpdate();
  }

  onConfirm() {
    this.editingForm.validateFields(async (errors, values) => {
      if (errors) {
        console.error(errors);
        return;
      }

      const {
        location,
        identityCardFront,
        identityCardVerso,
        bankCardFront,
        bankCardVerso,
        ...rest
      } = values;

      const [privince, city, area] = location || ([] as any[]);

      const params = {
        ...rest,
        privince,
        city,
        area,
        identityCardFront: this.toBaseUrl(identityCardFront),
        identityCardVerso: this.toBaseUrl(identityCardVerso),
        bankCardFront: this.toBaseUrl(bankCardFront),
        bankCardVerso: this.toBaseUrl(bankCardVerso),
      };

      switch (this.mode) {
        case EditingMode.新增: {
          await agentService.create(params);
          this.mode = EditingMode.无;
          this.refresh();
        }
        case EditingMode.编辑: {
          await agentService.update(this.record.agentId, params);
          this.mode = EditingMode.无;
          this.refresh();
        }
      }
    });
  }

  checkUploaded(name: string) {
    const fieldValue = this.editingForm.getFieldValue(name);
    if (!fieldValue) return false;
    if (fieldValue.length === 0) return false;
    return true;
  }

  private buildFormGroup(record: any = {}) {
    return toFormGroup([
      [
        'name',
        {
          initialValue: record.name,
          rules: [{ required: true, message: '请输入姓名' }],
        },
      ],
      [
        'phone',
        {
          initialValue: record.phone,
          rules: [{ required: true, message: '请输入手机号' }],
        },
      ],
      ['wechatId', { initialValue: record.wechatId }],
      [
        'idCard',
        {
          initialValue: record.idCard,
          rules: [{ required: true, message: '请输入身份证号' }],
        },
      ],
      [
        'identityCardFront',
        {
          initialValue: this.toUploadFileList(record.identityCardFront),
          valuePropName: 'fileList',
          getValueFromEvent: this.getUploadValue,
          rules: [{ required: true, message: '请上传证件照' }],
        },
      ],
      [
        'identityCardVerso',
        {
          initialValue: this.toUploadFileList(record.identityCardVerso),
          valuePropName: 'fileList',
          getValueFromEvent: this.getUploadValue,
          rules: [{ required: true, message: '请上传证件照' }],
        },
      ],
      [
        'bankCardFront',
        {
          initialValue: this.toUploadFileList(record.bankCardFront),
          valuePropName: 'fileList',
          getValueFromEvent: this.getUploadValue,
          rules: [{ required: true, message: '请上传银行卡' }],
        },
      ],
      [
        'bankCardVerso',
        {
          initialValue: this.toUploadFileList(record.bankCardVerso),
          valuePropName: 'fileList',
          getValueFromEvent: this.getUploadValue,
          rules: [{ required: true, message: '请上传银行卡' }],
        },
      ],
      ['referrerCode', { initialValue: record.referrerName }],
      [
        'level',
        {
          initialValue: record.level,
          rules: [{ required: true, message: '请选择代理商等级' }],
        },
      ],
      [
        'location',
        { initialValue: [record.privince, record.city, record.area] },
      ],
      ['company', { initialValue: record.company }],
      ['auditStatus', {
          initialValue: record.activeStatus,
          rules: [{ required: true, message: '请选择一个审核结果' }],
        }
      ],
      [
        'pwd',
        {
          rules: [
            { required: this.mode === EditingMode.新增, message: '请输入密码' },
          ],
        },
      ],
    ]);
  }

  private toUploadFileList(base64) {
    if (!base64) return;

    return [
      {
        uid: base64,
        name: base64,
        status: 'done',
        url: a2b(base64),
        original: false,
      },
    ];
  }

  private toBaseUrl(value) {
    if (!value) return;
    const [file] = value;
    if (file.original === false) {
      return file.uid;
    } else {
      return file.response.data;
    }
  }

  private getUploadValue(e) {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
}
