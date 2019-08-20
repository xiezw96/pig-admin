import { Module } from 'vuex';

import { RootState } from '@/store';

import { levelStore } from './level.store';
import { SettingState } from './setting.state';

export const settingStore: Module<SettingState, RootState> = {
  namespaced: true,

  modules: {
    level: levelStore,
  },
};
