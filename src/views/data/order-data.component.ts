import { Pagination } from 'ant-design-vue';
import { WrappedFormUtils } from 'ant-design-vue/types/form/form';
import axios from 'axios';
import { Moment } from 'moment';
import { Component, Vue } from 'vue-property-decorator';

import { GoodsCategoryEntity, GoodsGroupEntity } from '@/entities';
import { FormGroup } from '@/interfaces';
import { categoryService, groupService } from '@/services';
import { toFormGroup } from '@/utils';
import { columns } from './order-data.columns';

@Component<OrderDataComponent>({
  beforeCreate() {
    this.queryingForm = this.$form.createForm(this);
    this.queryingFormGroup = toFormGroup([
      ['orderCode'],
      ['goodsName'],
      ['groupRelId'],
      ['category'],
      ['machineName'],
      ['belongsUser'],
      ['creatorName'],
      ['payWay'],
      ['orderCreateTime', { initialValue: [] }],
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

  loading = false;

  list: any[] = [];

  pagination: Partial<Pagination> = {
    current: 1,
    pageSize: 5,
    total: 0,
  };

  categories: GoodsCategoryEntity[] = [];

  groups: GoodsGroupEntity[] = [];

  queryingForm: WrappedFormUtils;

  queryingFormGroup: FormGroup;

  prevFindParams: any = {};

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
      const { orderCreateTime, ...rest } = values;
      if (orderCreateTime.length === 2) {
        const [start, end] = orderCreateTime;
        rest.orderCreateStartTime = (start as Moment)
          .startOf('day')
          .format('YYYY-MM-DD HH:mm:ss');
        rest.orderCreateEndTime = (end as Moment)
          .endOf('day')
          .format('YYYY-MM-DD HH:mm:ss');
      }
      const dto = { ...this.prevFindParams, ...rest, current: 1 };
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

  onReset() {
    this.queryingForm.resetFields();
  }

  getMainImage(goodsAttId) {
    return atob(goodsAttId);
  }

  private async find(dto?: any) {
    this.loading = true;
    try {
      const { total, records } = await this.fetchOrderData(dto);
      this.list = records;
      this.pagination.total = total;
      this.prevFindParams = dto;
    } finally {
      this.loading = false;
    }
  }

  private async fetchOrderData(dto) {
    const {
      data: { data },
    } = await axios.get('api/admin/order/goods/page', {
      params: dto,
    });

    return data;
  }
}
