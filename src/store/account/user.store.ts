import { Module } from 'vuex';

import { RootState } from '@/store';

import { UserState } from './user.state';

export const userStore: Module<UserState, RootState> = {
  namespaced: true,
  state: {
    users: undefined,
  },
};
