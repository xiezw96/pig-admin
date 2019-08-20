import { CategoryState } from './category.state';
import { DeviceState } from './device.state';
import { GroupState } from './group.state';

export interface GoodsState {
  device: DeviceState;
  category: CategoryState;
  group: GroupState;
}
