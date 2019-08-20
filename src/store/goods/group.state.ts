import { GoodsGroupEntity } from '@/entities';

export interface GroupState {
  loading: boolean;
  groups: GoodsGroupEntity[];
}
