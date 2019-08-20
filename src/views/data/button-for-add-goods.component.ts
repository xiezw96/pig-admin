import { WrappedFormUtils } from 'ant-design-vue/types/form/form';
import { Component, Mixins, Prop } from 'vue-property-decorator';

import { Layout } from '@/mixins';
import { toFormGroup } from '@/utils';

@Component<ButtonForAddGoodsComponent>({
  async created() {
    this.form = this.$form.createForm(this);
  },
})
export default class ButtonForAddGoodsComponent extends Mixins(Layout) {
  form: WrappedFormUtils;

  visible = false;

  formGroup = toFormGroup({
    goods: { rules: [{ required: true, message: '请选择一个商品' }] },
    spec: { rules: [{ required: true, message: '请选择一个规格' }] },
    num: { rules: [{ required: true, message: '请输入数量' }] },
  });

  @Prop({ default: [] })
  goodsList: any[];

  specs: any[] = [];

  async onAdd() {
    this.visible = true;
    await this.$nextTick();
    this.form.resetFields();
    this.specs = [];
  }

  onChangeGoods(value) {
    const selected = this.goodsList.find(goods => goods.id === value)!;
    this.form.resetFields(['spec']);
    this.specs = selected.sepPriceList;
  }

  onConfirm() {
    this.form.validateFields((errors, values) => {
      if (errors) return;
      const selectedGoods = this.goodsList.find(
        goods => goods.id === values.goods,
      )!;
      const selectedSpec = this.specs.find(spec => spec.id === values.spec)!;
      this.$emit('select', {
        goodsId: selectedGoods.id,
        goodsSpeId: selectedSpec.id,
        goodsAttId: selectedGoods.attId,
        goodsName: selectedGoods.name,
        goodsSpe1: selectedSpec.speId1,
        goodsSpe2: selectedSpec.speId2,
        tradePrice: selectedSpec.tradePrice,
        salePrice: selectedSpec.salePrice,
        goodNum: values.num,
        totalPrice: selectedSpec.tradePrice * values.num,
        spePriceKey: selectedSpec.spePriceKey,
      });
      this.visible = false;
    });
  }
}
