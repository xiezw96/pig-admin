import { WrappedFormUtils } from 'ant-design-vue/types/form/form';
import axios from 'axios';
import { Component, Mixins } from 'vue-property-decorator';

import { PAGINATION } from '@/constants';
import { Layout } from '@/mixins';
import { agentService, goodsService } from '@/services';
import { toFormGroup } from '@/utils';

import ButtonForAddAddress from './button-for-add-address.vue';
import ButtonForAddGoods from './button-for-add-goods.vue';
import { columns } from './button-for-create.columns';

@Component<ButtonForCreate>({
  components: {
    ButtonForAddGoods,
    ButtonForAddAddress,
  },
  async created() {
    this.form = this.$form.createForm(this);
    const [agents, goodsList] = await Promise.all([
      agentService.find(),
      goodsService.find(),
    ]);
    this.agents = agents;
    this.goodsList = goodsList;
  },
})
export default class ButtonForCreate extends Mixins(Layout) {
  form: WrappedFormUtils;

  columns = columns;

  visible = false;

  goodsList: any[] = [];

  agents: any[] = [];

  addresses: any[] = [];

  selectedAddress: any = {};

  selectedGoodsList = new Set<any>();

  get list() {
    return Array.from(this.selectedGoodsList);
  }

  formGroup = toFormGroup({
    agentId: { rules: [{ required: true, message: '请选择一个代理商' }] },
    addressId: {
      preserve: true,
      rules: [{ required: true, message: '请选择一个地址' }],
    },
  });

  async onClick() {
    this.visible = true;
    await this.$nextTick();
    this.form.resetFields();
    this.selectedGoodsList = new Set();
  }

  async onSelectAgent(val) {
    const data = await this.fetchAddressByAgentId(val);
    this.addresses = data || [];
    this.form.resetFields(['addressId']);
    const defaultAddress = this.addresses.find(item => item.isDefault === 1);
    await this.$nextTick();
    if (defaultAddress) {
      this.form.setFieldsValue({
        addressId: defaultAddress.id,
      });
      this.selectedAddress = defaultAddress;
    } else {
      this.selectedAddress = {};
    }
  }

  onSelectGoods(goods) {
    this.selectedGoodsList.add(goods);
    this.selectedGoodsList = new Set(Array.from(this.selectedGoodsList));
  }

  onSelectAddress(id) {
    const target = this.addresses.find(address => address.id === id);
    this.selectedAddress = target;
  }

  async onAddedAddress() {
    const agentId = this.form.getFieldValue('agentId');
    const data = await this.fetchAddressByAgentId(agentId);
    this.addresses = data || [];
    const defaultAddress = this.addresses.find(item => item.isDefault === 1);
    await this.$nextTick();
    if (defaultAddress) {
      this.form.setFieldsValue({
        addressId: defaultAddress.id,
      });
      this.selectedAddress = defaultAddress;
    } else {
      this.selectedAddress = {};
    }
  }

  onDelete(goods) {
    this.selectedGoodsList.delete(goods);
    this.selectedGoodsList = new Set(Array.from(this.selectedGoodsList));
  }

  async onConfirm() {
    this.form.validateFields(async (errors, values) => {
      if (errors) return;
      if (this.selectedGoodsList.size === 0) {
        this.$message.error('请添加要采购的商品');
        return;
      }

      await this.createOrder({
        agentId: values.agentId,
        addressId: this.selectedAddress.id,
        goods: this.list.map(item => ({
          goodsId: item.goodsId,
          goodsSpeId: item.goodsSpeId,
          spePriceKey: item.spePriceKey,
          num: item.goodNum,
        })),
      });

      this.$emit('created');
      this.visible = false;
    });
  }

  atob(val) {
    if (!val) return '';
    return window.atob(val);
  }

  private async fetchAddressByAgentId(id) {
    const {
      data: {
        data: { records },
      },
    } = await axios.get('api/admin/shoppingaddress/admin/page', {
      params: { ...PAGINATION, creatorId: id },
    });

    return records;
  }

  private async fetchGoodsList() {
    const data = await goodsService.find();
    return data;
  }

  private async createOrder(dto) {
    await axios.post('api/admin/order/admin/bygoods', dto);
  }
}
