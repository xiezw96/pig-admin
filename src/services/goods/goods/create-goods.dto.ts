import { GoodsSpec } from '@/interfaces';

export interface CreateGoodsDto {
  category: number;

  code: string;

  name: string;

  sellingPoints: string;

  status: number;

  title: string;

  groupRelList: Array<{ goodsGroupId: number }>;

  picList: Array<{ attId: number }>;

  sepPriceList: GoodsSpec[];
}
