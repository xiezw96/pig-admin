import { WrappedFormUtils } from 'ant-design-vue/types/form/form';
import { defaultTo, groupBy, map } from 'lodash';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

import { GoodsCategoryEntity, GoodsGroupEntity } from '@/entities';
import { Column, FormGroup, GoodsSpec } from '@/interfaces';
import { a2b, toFormGroup } from '@/utils';

import { columns } from './spec.columns';
import SpecComponent from './spec.vue';

const User = namespace('workspace/user');

@Component<EditingFormComponent>({
  components: {
    'app-button-for-spec': SpecComponent,
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
    this.layout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
    };
  },
  created() {
    this.formGroup = toFormGroup([
      [
        'name',
        {
          initialValue: this.record.name,
          rules: [{ required: true, message: '请输入商品名称' }],
        },
      ],
      [
        'code',
        {
          initialValue: this.record.code,
        },
      ],
      [
        'title',
        {
          initialValue: this.record.title,
        },
      ],
      [
        'category',
        {
          initialValue: this.record.category,
        },
      ],
      [
        'groupRelList',
        {
          initialValue: map(
            this.record.groupRelList,
            group => group.goodsGroupId,
          ),
        },
      ],
      [
        'sellingPoints',
        {
          initialValue: this.record.sellingPoints,
        },
      ],
      ['status', { initialValue: this.record.status || 1 }],
      ['logisticsType', { initialValue: this.record.logisticsType || 0 }],
    ]);

    this.fileList.forEach(item => {
      this.images.set(item.uid, item.uid);
    });
    this.detailFileList.forEach(item => {
      this.detailImages.set(item.uid, item.uid);
    });
  },
})
export class EditingFormComponent extends Vue {
  form: WrappedFormUtils;
  formGroup: FormGroup;
  layout: any;

  @Prop({
    default: () => ({}),
  })
  readonly record: any;

  @Prop()
  readonly categories: GoodsCategoryEntity[];

  @Prop()
  readonly groups: GoodsGroupEntity[];

  fileList: any[] = defaultTo<any[], any[]>(this.record.picList, [])
    .filter(item => item.type === 0 || item.type === 1)
    .map(item => ({
      uid: item.attId,
      name: item.attId,
      status: 'done',
      url: a2b(item.attId),
    }));
  images = new Map<string, string>();

  detailFileList: any[] = defaultTo<any[], any[]>(this.record.picList, [])
    .filter(item => item.type === 2)
    .map(item => ({
      uid: item.attId,
      name: item.attId,
      status: 'done',
      url: a2b(item.attId),
    }));
  detailImages = new Map<string, string>();

  sepPriceList: GoodsSpec[] = defaultTo(this.record.sepPriceList, []);

  get specs() {
    if (this.sepPriceList && this.sepPriceList.length > 0) {
      const { speName1, speName2 } = this.sepPriceList[0];
      const groupedSpe1 = groupBy(this.sepPriceList, 'speId1');
      const groupedSpe2 = groupBy(this.sepPriceList, 'speId2');
      return {
        speName1,
        speName2,
        specs1: Object.keys(groupedSpe1),
        specs2: Object.keys(groupedSpe2),
      };
    }
    return {};
  }

  get columns(): Column[] {
    const columns_ = [...columns];
    if (this.specs.speName2) {
      columns_.unshift({
        title: this.specs.speName2,
        key: '规格值',
        dataIndex: 'speId2',
      });
    }

    if (this.specs.speName1) {
      columns_.unshift({
        title: this.specs.speName1,
        key: '规格值  ',
        dataIndex: 'speId1',
      });
    }

    return columns_;
  }

  @User.State
  accessToken: string;

  get authorization() {
    return `Bearer ${this.accessToken}`;
  }

  onRegenerate(specs: any) {
    let list: any[] = [];

    specs.specs1.forEach(spec => {
      list.push({
        id: spec,
        speId1: spec,
        speName1: specs.speName1,
        inventoryNum: 0,
        weight: 0,
        salePrice: 0,
        salesVolume: 0,
        tradePrice: 0,
      });
    });

    if (specs.speName2) {
      const temp: any[] = [];
      list.forEach(item => {
        specs.specs2.forEach(spec => {
          temp.push({
            ...item,
            speId2: spec,
            speName2: specs.speName2,
            id: item.id + spec,
          });
        });
      });
      list = temp;
    }

    this.sepPriceList = list;
  }

  onChangeFileList(info: any) {
    const { fileList, file } = info;
    this.fileList = fileList;

    this.updateImages(file, this.images);
  }

  onChangeDetailFileList(info: any) {
    const { fileList, file } = info;
    this.detailFileList = fileList;

    this.updateImages(file, this.detailImages);
  }

  onConfirmBatchEdit(value: number, field: string) {
    this.sepPriceList = this.sepPriceList.map(item => ({
      ...item,
      [field]: value,
    }));
  }

  onConfirmEdit(index: number, field: string, value: number) {
    this.sepPriceList.splice(index, 1, {
      ...this.sepPriceList[index],
      [field]: value,
    });
  }

  private updateImages(file: any, collection: Map<string, string>) {
    // 按上传顺序进行排序，而不是上传完成时间
    // 由于不同图片上传的耗时不同，所以上传开始时就进行占位
    // 上传完成后再更新实际的图片值，避免顺序错乱
    if (file.status === 'uploading') {
      collection.set(file.uid, '');
    }

    if (file.status === 'done') {
      collection.set(file.uid, file.response.data);
    }

    if (['error', 'removed'].includes(file.status)) {
      collection.delete(file.uid);
    }
  }
}

export default EditingFormComponent;
