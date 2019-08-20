import { WrappedFormUtils } from 'ant-design-vue/types/form/form';
import { ModalOptions } from 'ant-design-vue/types/modal';
import { pick } from 'lodash';
import { Component, Mixins, Vue } from 'vue-property-decorator';

import { EditingMode } from '@/enums';
import { FormGroup, GoodsCaterogy } from '@/interfaces';
import { Layout } from '@/mixins';
import {
  activingComboService,
  equipmentService,
  goodsService,
} from '@/services';

import { bundleColumns, columns } from './activing-combo.columns';
import { columns as addedEquipmentColumns } from './added-equipment.columns';
import ButtonForAddEquipment from './button-for-add-equipment.vue';

@Component<ActivingComboComponent>({
  components: {
    ButtonForAddEquipment,
  },
  beforeCreate() {
    this.queryingForm = this.$form.createForm(this);
    this.editingForm = this.$form.createForm(this, {
      onValuesChange: (props: any, fields: any) => {
        if (Object.prototype.hasOwnProperty.call(fields, 'type')) {
          this.selectedType = fields.type;
        }
      },
    });
    this.goodsForm = this.$form.createForm(this);
  },

  created() {
    this.find();
    activingComboService.findAvalibleCoupons().then(data => {
      this.coupons = data;
    });
    goodsService.find().then(data => {
      this.goodsList = data;
    });
    equipmentService.fetchTypes().then(data => {
      this.equipmentTypes = data;
    });
  },
})
export default class ActivingComboComponent extends Mixins(Layout) {
  queryingForm: WrappedFormUtils;
  queryingFormGroup: FormGroup = {
    name: ['name'],
  };
  editingForm: WrappedFormUtils;
  editingFormGroup: FormGroup = {
    name: ['name', { rules: [{ required: true, message: '请输入套餐名称' }] }],
    type: [
      'type',
      { rules: [{ required: true, message: '请选择一个套餐类型' }] },
    ],
    goodPrice: [
      'goodPrice',
      { rules: [{ required: true, message: '请输入金额' }] },
    ],
    voucherId: ['voucherId'],
  };
  goodsForm: WrappedFormUtils;
  goodsFormGroup: FormGroup = {
    goods: [
      'goods',
      { rules: [{ required: true, message: '请选择一个商品' }] },
    ],
    spec: ['spec', { rules: [{ required: true, message: '请选择一个规格' }] }],
    num: ['num', { rules: [{ required: true, message: '请输入数量' }] }],
  };

  loading = false;

  mode = EditingMode.无;

  goodsModalVisible = false;

  list: any[] = [];

  record: any = null;

  columns = columns;

  bundleColumns = bundleColumns;

  addedEquipmentColumns = addedEquipmentColumns;

  editingModal: Partial<ModalOptions> | null = null;

  prevFindParams: any;

  selectedType: number | null = null;

  coupons: any[] = [];

  goodsList: any[] = [];

  specs: any[] = [];

  selectedGoodsList: any[] = [];

  equipmentTypes: any[] = [];

  selectedEquipments: any[] = [];

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
    this.editingModal = {
      title: '新增',
    };
    this.selectedType = null;
    this.selectedGoodsList = [];
    this.selectedEquipments = [];
    this.editingForm.resetFields();
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
    this.selectedGoodsList = this.record.detailList;
    this.selectedEquipments = this.record.machineList.map(
      ({ num, machineSpecId }) => {
        const type = this.equipmentTypes.find(
          item => item.id === machineSpecId,
        );
        return {
          ...type,
          num,
        };
      },
    );
    await this.$nextTick();
    this.editingForm.setFieldsValue({ name: record.name, type: record.type });
    await this.$nextTick();
    this.editingForm.setFieldsValue(record);
  }

  async onDelete(record: GoodsCaterogy) {
    await activingComboService.remove(record.id);
    this.refresh();
  }

  onSelectEquipment(info) {
    const eqp = this.equipmentTypes.find(
      item => item.id === info.machineSpecId,
    );
    if (!this.editingForm.getFieldValue('goodPrice')) {
      this.editingForm.setFieldsValue({goodPrice: (eqp.tradePrice * info.num).toFixed(2)});
    } else {
      const oldValue = this.editingForm.getFieldValue('goodPrice');
      const goodsPrice = eqp.tradePrice * info.num + Number(oldValue);
      this.editingForm.setFieldsValue({goodPrice: goodsPrice.toFixed(2)});
    }
    this.selectedEquipments.push({
      num: info.num,
      ...eqp,
    });
  }

  onDeleteEquipment(record) {
    const index = this.selectedEquipments.findIndex(
      item => item.id === record.id,
    );
    const oldValue = this.editingForm.getFieldValue('goodPrice');
    this.editingForm.setFieldsValue({goodPrice: (Number(oldValue) -
      (this.selectedEquipments[index].tradePrice * record.num)).toFixed(2)});
    this.selectedEquipments.splice(index, 1);
  }

  /**
   * 确认编辑
   */
  onConfirm() {
    switch (this.mode) {
      case EditingMode.新增:
        this.editingForm.validateFields(async (errors, values) => {
          if (errors) return;
          if (this.selectedType === 0 && this.selectedEquipments.length === 0) {
            this.$message.error('请添加柜子规格及数量');
            return;
          }
          console.log(this.selectedEquipments);
          await activingComboService.create({
            ...values,
            machineList: this.selectedEquipments.map(({ num, id }) => ({
              num,
              machineSpecId: id,
            })),
            detailList: [...this.selectedGoodsList],
          });
          this.refresh();
          this.selectedGoodsList = [];
          this.mode = EditingMode.无;
        });
        break;
      case EditingMode.编辑:
        this.editingForm.validateFields(async (errors, values) => {
          if (errors) return;
          if (this.selectedType === 0 && this.selectedEquipments.length === 0) {
            this.$message.error('请添加柜子规格及数量');
            return;
          }
          console.log(this.selectedEquipments);
          await activingComboService.update(this.record!.id, {
            ...values,
            machineList: this.selectedEquipments.map(({ num, id }) => ({
              num,
              machineSpecId: id,
            })),
            detailList: this.selectedGoodsList.map(goods =>
              pick(goods, 'goodsId', 'spePriceId', 'goodNum'),
            ),
          });
          this.refresh();
          this.selectedGoodsList = [];
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

  onAddGoods() {
    this.goodsForm.resetFields();
    this.goodsModalVisible = true;
  }

  onChangeGoods(value) {
    const selected = this.goodsList.find(goods => goods.id === value)!;
    this.specs = selected.sepPriceList;
  }

  onDeleteGoods(record) {
    const index = this.selectedGoodsList.findIndex(
      item => item.goodsId === record.goodsId,
    );
    this.selectedGoodsList.splice(index, 1);
  }

  onConfirmAddGoods() {
    this.goodsForm.validateFields((errors, values) => {
      if (errors) return;
      const selectedGoods = this.goodsList.find(
        goods => goods.id === values.goods,
      )!;
      const selectedSpec = this.specs.find(spec => spec.id === values.spec)!;
      this.selectedGoodsList.push({
        goodNum: values.num,
        goodsId: selectedGoods.id,
        goodsName: selectedGoods.name,
        salePrice: selectedSpec.salePrice,
        sepcValue1: selectedSpec.speId1,
        sepcValue2: selectedSpec.speId2,
        spePriceId: selectedSpec.id,
        totalPrice: selectedSpec.tradePrice * values.num,
        tradePrice: selectedSpec.tradePrice,
        spePriceKey: selectedSpec.spePriceKey,
      });
      this.specs = [];
      this.goodsModalVisible = false;
    });
  }

  async find(dto?: any) {
    this.loading = true;
    try {
      const data = await activingComboService.find(dto);
      this.list = data;
      this.prevFindParams = dto;
    } finally {
      this.loading = false;
    }
  }

  async refresh() {
    this.find(this.prevFindParams);
  }

  getGoodsListRowKey(record) {
    return String(record.goodsId) + record.spePriceId;
  }
}
