import { GoodsCategoryEntity } from '@/entities';

export interface GoodsGroup extends GoodsCategoryEntity {
  /**
   * 商品数量
   */
  goods: number;
}
