import { PriceEntity } from './price.entity';

export class GoodsEntity {
  /**
   * 名称
   */
  name: string;

  /**
   * 商品编码
   */
  code: string;

  /**
   * 分享标题
   */
  title: string;

  /**
   * 图片
   */
  image: string[];

  /**
   * 利润比
   */
  profitRatio: number;

  /**
   * 销量
   */
  sales: number;

  /**
   * 商品类型
   */
  caterogy: number;

  /**
   * 商品分组
   */
  group: number[];

  /**
   * 商品卖点
   */
  sellingPoint: string;

  /**
   * 库存
   */
  stock: number;

  /**
   * 是否上架
   */
  putawayed: boolean;

  /**
   * 价格列表
   */
  price: PriceEntity[];
}
