import { GoodsCategoryEntity } from '@/entities';

export interface GoodsCaterogy extends GoodsCategoryEntity {
  /**
   * 商品数量
   */
  goods: number;
}
