import { Module } from 'vuex';

import { RootState } from '@/store';

import { RoleState } from './role.state';

export const roleStore: Module<RoleState, RootState> = {
  namespaced: true,
  state: {
    roles: [
      {
        name: '管理员',
        operator: 1,
        updateTime: new Date().toISOString(),
      },
    ],
  },
};
