import { WrappedFormUtils } from 'ant-design-vue/types/form/form';
import axios from 'axios';
import { Component, Mixins } from 'vue-property-decorator';

import { WX_AUTHORIZATION_URL } from '@/constants';
import { DeviceStatus, EditingMode } from '@/enums';
import { Column, FormGroup } from '@/interfaces';
import { Layout } from '@/mixins';
import { agentService, equipmentService, FindEquipmentDto } from '@/services';
import { toFormGroup } from '@/utils';

import { columns } from './equipment.columns';

const activeStatusOptions = [
  {
    label: DeviceStatus[DeviceStatus.正常],
    value: DeviceStatus.正常,
  },
  {
    label: DeviceStatus[DeviceStatus.待激活],
    value: DeviceStatus.待激活,
  },
  {
    label: DeviceStatus[DeviceStatus.故障],
    value: DeviceStatus.故障,
  },
];

@Component<DeviceComponent>({
  beforeCreate() {
    this.queryingForm = this.$form.createForm(this);
    this.editingForm = this.$form.createForm(this);
    this.queryingFormGroup = toFormGroup([
      ['code'],
      ['name'],
      ['address'],
      ['status'],
      ['belongsType'],
    ]);
    this.editingFormGroup = toFormGroup([
      ['name', { rules: [{ required: true, message: '请输入设备名称' }] }],
      ['code', { rules: [{ required: true, message: '请输入设备码' }] }],
      ['specId', { rules: [{ required: true, message: '请选择设备型号' }] }],
      [
        'belongsType',
        { rules: [{ required: true, message: '请选择归属类型' }] },
      ],
      ['belongsUser', { rules: [{ required: true, message: '请选择代理商' }] }],
      [
        'currAddreaa',
        { rules: [{ required: true, message: '请输入当前地址' }] },
      ],
    ]);
    this.activeStatusOptions = activeStatusOptions;
    this.columns = columns;
    this.status = DeviceStatus;
    this.belongsTypes = {
      1: '所有权',
      2: '仅使用权',
    };
    this.statusColumns = [
      {
        title: '货道',
        dataIndex: 'code',
      },
      {
        title: '状态',
        dataIndex: 'status',
        scopedSlots: {
          customRender: 'status',
        },
      },
      {
        title: '二维码',
        scopedSlots: {
          customRender: 'qrcode',
        },
      },
    ];
  },
  async created() {
    const [agents, equipmentTypes] = await Promise.all([
      agentService.find(),
      equipmentService.fetchTypes(),
      this.refresh(),
    ]);

    this.agents = agents;
    this.equipmentTypes = equipmentTypes;
  },
})
export class DeviceComponent extends Mixins(Layout) {
  // #region 状态
  mode = EditingMode.无;

  loading = false;

  loadingStatus = false;

  list: any[] = [];

  record: any = null;

  recordDetail: any = null;

  editingModal: any = null;

  agents = [];

  equipmentTypes = [];

  shortUrls = new Map<number, string>();

  statusModalVisible = false;
  // #endregion

  queryingForm: WrappedFormUtils;
  queryingFormGroup: FormGroup;

  editingForm: WrappedFormUtils;
  editingFormGroup: FormGroup;

  prevFindParams: any;

  activeStatusOptions: any[];

  columns: Column[];

  statusColumns: Column[];

  status: typeof DeviceStatus;

  belongsTypes: any;

  get aisles() {
    if (!this.recordDetail) return [];

    return this.recordDetail.aisleDetails;
  }

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
      code: undefined,
      specId: undefined,
      belongsType: undefined,
      belongsUser: undefined,
      currAddreaa: undefined,
    });
  }

  async onUpdate(record: any) {
    this.record = record;
    this.mode = EditingMode.编辑;
    this.editingModal = {
      title: '编辑',
    };
    this.record = this.record;
    await this.$nextTick();
    this.editingForm.setFieldsValue({
      name: this.record.name,
      code: this.record.code,
      specId: this.record.specId,
      belongsType: this.record.belongsType,
      belongsUser: this.record.belongsUser,
      currAddreaa: this.record.currAddreaa,
    });
  }

  async onDelete(record) {
    await this.deleteEquipment(record.id);
    this.refresh();
  }

  async onConfirm() {
    this.editingForm.validateFields(async (errors, values) => {
      if (errors) return;

      switch (this.mode) {
        case EditingMode.新增:
          await this.addEquipment(values);
          this.refresh();
          this.finishEdit();
          break;
        case EditingMode.编辑:
          await this.updateEquipment(this.record.id, values);
          this.refresh();
          this.finishEdit();
      }
    });
  }

  onCopyed() {
    this.$message.success('已复制到剪贴板', 1);
  }

  async onCancel() {
    this.finishEdit();
  }

  async find(dto: FindEquipmentDto) {
    this.loading = true;
    try {
      const data = await equipmentService.find(dto);
      this.list = data;
      this.prevFindParams = dto;
    } finally {
      this.loading = false;
    }
  }

  async onShowStatus(record) {
    this.recordDetail = null;
    this.statusModalVisible = true;
    this.loadingStatus = true;
    this.shortUrls.clear();
    try {
      this.recordDetail = await this.getEquipment(record.id);
    } finally {
      this.loadingStatus = false;
    }
  }

  async onBatchGenerateShortUrl() {
    if (!this.aisles || this.aisles === []) return ;
    this.aisles.forEach(item => {
      this.onGenerateShortUrl(item);
    });
  }

  async onGenerateShortUrl(record) {
    const url = this.generateUrl(record);
    if (url === '') return;

    const short = await this.generateShortUrl(url);
    this.shortUrls.set(record.id, JSON.parse(short).short_url);
    this.$forceUpdate();
  }

  generateUrl(record) {
    console.log(this.recordDetail);
    if (!this.recordDetail) return '';
    if (!record) return '';

    const authUrl = `${WX_AUTHORIZATION_URL}?appid=${
      process.env.VUE_APP_WECHAT_APP_ID
    }&redirect_uri=${
      process.env.VUE_APP_PAYMENT_QRCODE_BASE_URL
    }&response_type=code&scope=snsapi_base&state=${this.recordDetail.code}-${
      record.code
    }#wechat_redirect`;

    return authUrl;
  }

  async refresh() {
    this.find(this.prevFindParams!);
  }

  private async getEquipment(id) {
    const {
      data: { data },
    } = await axios.get(`api/admin/salesmachine/${id}`);
    return data;
  }

  private async addEquipment(dto) {
    return axios.post('api/admin/salesmachine', dto);
  }

  private async updateEquipment(id, dto) {
    return axios.put('api/admin/salesmachine', { id, ...dto });
  }

  private async deleteEquipment(id) {
    return axios.delete(`api/admin/salesmachine/${id}`);
  }

  private finishEdit() {
    this.mode = EditingMode.无;
    this.record = undefined;
  }

  private async generateShortUrl(url) {
    const {
      data: { data },
    } = await axios.post('api/admin/wx/bin/shorturl', url, {
      headers: { 'Content-Type': 'text/plain' },
    });
    return data;
  }
}
export { DeviceComponent as default };
