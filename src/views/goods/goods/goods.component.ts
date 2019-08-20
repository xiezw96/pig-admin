import { isFinite } from 'lodash';
import { Component, Mixins } from 'vue-property-decorator';

import { GoodsCategoryEntity, GoodsGroupEntity } from '@/entities';
import { Queryable } from '@/mixins';
import { categoryService, goodsService, groupService } from '@/services';
import { a2b, toFormGroup } from '@/utils';

import ButtonForCreateGoodsComponent from './button-for-create-goods.vue';
import ButtonForUpdateGoodsComponent from './button-for-update-goods.vue';
import { columns } from './goods.columns';

@Component<GoodsComponent>({
  components: {
    'app-button-for-create-goods': ButtonForCreateGoodsComponent,
    'app-button-for-update-goods': ButtonForUpdateGoodsComponent,
  },
  beforeCreate() {
    this.queryingForm = this.$form.createForm(this);
    this.queryingFormGroup = toFormGroup([
      ['name'],
      ['category'],
      ['groupRelId'],
      ['status'],
    ]);
  },
  async created() {
    const [categories, groups] = await Promise.all([
      categoryService.find(),
      groupService.find(),
    ]);

    this.categories = categories;
    this.groups = groups;
  },
})
export default class GoodsComponent extends Mixins(Queryable) {
  columns = columns;

  service = goodsService;

  categories: GoodsCategoryEntity[] = [];

  groups: GoodsGroupEntity[] = [];

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

  onUpdate() {
    this.refresh();
  }

  onCreate() {
    this.refresh();
  }

  sumSalesVolume(record) {
    return record.sepPriceList.reduce(
      (sum, item) => (sum += item.salesVolume),
      0,
    );
  }

  sumInventory(record) {
    return record.sepPriceList.reduce(
      (sum, item) => (sum += item.inventoryNum),
      0,
    );
  }

  getMainImage(record) {
    const mainImage = record.picList.find(pic => pic.type === 0);
    if (!mainImage) return '';
    return a2b(mainImage.attId);
  }

  getMinPrice(record, priceName) {
    const { sepPriceList } = record;
    if (sepPriceList.length === 0) return '';
    return Math.min(
      ...sepPriceList.map(item => item[priceName]).filter(isFinite),
    );
  }
  /**
   * 上架/下架
   * @param record
   */
  async soldOutOrPutaway(record, type) {
    await goodsService.updateStatus(record.id, type);
    this.$message.info('操作成功');
    this.onSearch();
  }

}
