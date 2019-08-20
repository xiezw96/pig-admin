export interface GoodsSpec {
  speId1: string;
  speName1: string;
  speId2: string;
  speName2: string;

  /**
   * 零售价
   */
  salePrice: number;

  /**
   * 统批价
   */
  tradePrice: number;

  /**
   * 库存
   */
  inventoryNum: number;

  /**
   * 销量
   */
  salesVolume: number;

  /**
   * 重量
   */
  weight: number;
}
