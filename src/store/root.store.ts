import { Store } from 'vuex';

import { accountStore } from './account';
import { goodsStore } from './goods';
import { RootState } from './root.state';
import { settingStore } from './setting';
import { workspaceStore } from './workspace';

export let rootStore: Store<RootState> | null = null;

/**
 * 延迟生成 Store 实例，避免在 Vuex 初始化完成前实例化
 */
export function buildStore() {
  if (!rootStore) {
    rootStore = new Store<RootState>({
      modules: {
        workspace: workspaceStore,
        account: accountStore,
        goods: goodsStore,
        setting: settingStore,
      },
    });
  }

  return rootStore;
}
