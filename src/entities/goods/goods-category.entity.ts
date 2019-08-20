import { UserEntity } from '../user.entity';

/**
 * 商品分类
 */
export class GoodsCategoryEntity {
  id: number;

  /**
   * 名称
   */
  name: string;

  /**
   * 排序值
   */
  sort: number;

  /**
   * 操作人
   */
  creatorId: UserEntity;

  /**
   * 操作时间
   */
  createDate: string;
}
