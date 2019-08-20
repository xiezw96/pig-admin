import { Pagination } from 'ant-design-vue';
import { WrappedFormUtils } from 'ant-design-vue/types/form/form';
import axios from 'axios';
import { Component, Vue } from 'vue-property-decorator';

import { PAGINATION } from '@/constants';
import { GoodsCategoryEntity, GoodsGroupEntity } from '@/entities';
import { FormGroup } from '@/interfaces';
import { categoryService, groupService } from '@/services';
import { toFormGroup } from '@/utils';

import { columns } from './agent-purchase-data.columns';
import ButtonForCreate from './button-for-create.vue';
import { goodsColumns } from './goods.columns';

@Component<OrderDataComponent>({
  components: {
    ButtonForCreate,
  },
  beforeCreate() {
    this.queryingForm = this.$form.createForm(this);
    this.queryingFormGroup = toFormGroup([
      ['agentName'],
      ['code'],
      ['sourceType'],
    ]);
  },
  async created() {
    const { current, pageSize } = this.pagination;
    const [categories, groups] = await Promise.all([
      categoryService.find(),
      groupService.find(),
      this.find({ current, size: pageSize }),
    ]);

    this.categories = categories;
    this.groups = groups;
  },
})
export default class OrderDataComponent extends Vue {
  columns = columns;
  goodsColumns = goodsColumns;

  loading = false;

  list: any[] = [];
  goodsList: any[] = [];

  visible = false;

  address: any = {};

  pagination: Partial<Pagination> = {
    current: 1,
    pageSize: 10,
    total: 0,
  };

  categories: GoodsCategoryEntity[] = [];

  groups: GoodsGroupEntity[] = [];

  queryingForm: WrappedFormUtils;

  queryingFormGroup: FormGroup;

  prevFindParams: any = {};

  record: any = null;

  layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
  };

  get categoriesDict() {
    return this.categories.reduce(
      (dict, category) => {
        dict[category.id] = category.name;
        return dict;
      },
      {} as any,
    );
  }

  onSearch() {
    this.queryingForm.validateFields(async (errors, values) => {
      if (errors) return;

      const dto = { ...this.prevFindParams, ...values, current: 1 };
      await this.find(dto);
      this.pagination.current = 1;
    });
  }

  async onChangePage(pagination) {
    const { current } = pagination;
    const dto = { ...this.prevFindParams, current };
    await this.find(dto);
    this.pagination.current = current;
  }

  async onView(record) {
    this.record = record;
    const { detailList, ...address } = await this.fetchOrderDetail(record.id);

    this.goodsList = detailList;
    this.address = address;
    this.visible = true;
  }

  onReset() {
    this.queryingForm.resetFields();
  }

  onCreatedOrder() {
    this.find(this.prevFindParams);
  }

  atob(val) {
    if (!val) return '';
    return window.atob(val);
  }

  private async find(dto?: any) {
    this.loading = true;
    try {
      const { total, records } = await this.fetchAgentPurchaseData(dto);
      this.list = records;
      this.pagination.total = total;
      this.prevFindParams = dto;
    } finally {
      this.loading = false;
    }
  }

  private async fetchAgentPurchaseData(dto) {
    const {
      data: { data },
    } = await axios.get('api/admin/order/allagent/page', {
      params: { ...PAGINATION, ...dto },
    });

    return data;
  }

  private async fetchOrderDetail(id) {
    const {
      data: { data },
    } = await axios.get(`api/admin/orderdetail/agentorder/${id}`);

    return data;
  }
}
