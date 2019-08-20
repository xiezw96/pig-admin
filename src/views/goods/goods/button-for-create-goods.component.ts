import { omit } from 'lodash';
import { Component, Prop, Vue } from 'vue-property-decorator';

import { GoodsCategoryEntity, GoodsGroupEntity } from '@/entities';
import { goodsService } from '@/services';

import { EditingFormComponent } from './editing-form.component';
import EditingForm from './editing-form.vue';

@Component({
  components: {
    'app-editing-form': EditingForm,
  },
})
export class ButtonForCreateGoodsComponent extends Vue {
  @Prop()
  readonly categories: GoodsCategoryEntity[];

  @Prop()
  readonly groups: GoodsGroupEntity[];

  service = goodsService;

  visible = false;

  onCreate() {
    this.visible = true;
  }

  onConfirm() {
    this.$refs.form.form.validateFields(async (errors, values) => {
      if (errors) return;

      if (this.$refs.form.fileList.length === 0) {
        this.$message.error('至少需要一张商品图片');
        return;
      }

      if (this.$refs.form.sepPriceList.length === 0) {
        this.$message.error('请添加价格列表');
        return;
      }

      const { groupRelList, ...rest } = values;

      const [mainImage, ...restImage] = [...this.$refs.form.images.values()];
      const detailImages = [...this.$refs.form.detailImages.values()];

      await goodsService.create({
        ...rest,
        groupRelList: groupRelList.map(id => ({ goodsGroupId: id })),
        sepPriceList: this.$refs.form.sepPriceList.map(item =>
          omit(item, 'id'),
        ),
        picList: [
          {
            type: 0,
            attId: mainImage,
          },
          ...[...restImage].map(src => ({ type: 1, attId: src })),
          ...[...detailImages].map(src => ({ type: 2, attId: src })),
        ],
      });

      this.visible = false;
      this.$emit('create');
    });
  }
}

export interface ButtonForCreateGoodsComponent {
  $refs: {
    form: EditingFormComponent;
  };
}

export default ButtonForCreateGoodsComponent;
