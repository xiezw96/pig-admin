import { Module } from 'vuex';

import { RootState } from '@/store';

import { categoryStore } from './category.store';
import { deviceStore } from './device.store';
import { GoodsState } from './goods.state';
import { groupStore } from './group.store';

export const goodsStore: Module<GoodsState, RootState> = {
  namespaced: true,
  modules: {
    device: deviceStore,
    category: categoryStore,
    group: groupStore,
  },
};
