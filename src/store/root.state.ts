import { AccountState } from './account';
import { GoodsState } from './goods';
import { SettingState } from './setting';
import { WorkspaceState } from './workspace';

export interface RootState {
  workspace: WorkspaceState;
  account: AccountState;
  goods: GoodsState;
  setting: SettingState;
}
