import { Module } from 'vuex';

import { RootState } from '@/store';

import { MenuState } from './menu.state';

export const menuStore: Module<MenuState, RootState> = {
  namespaced: true,
  state: new MenuState(),
  mutations: {
    collapse(state) {
      state.openKeys = [];
      state.selectedKeys = [];
    },
    select(state, [openedKey, selectedKey]: [string, string]) {
      const set = new Set(state.openKeys);
      set.add(openedKey);
      state.openKeys = [...set];
      state.selectedKeys = [selectedKey];
    },
    setOpenedKeys(state, openedKeys) {
      state.openKeys = openedKeys;
    },
  },
};
