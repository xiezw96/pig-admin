import { Module } from 'vuex';

import { RootState } from '@/store';

import { AccountState } from './account.state';
import { agentStore } from './agent.store';
import { roleStore } from './role.store';
import { userStore } from './user.store';

export const accountStore: Module<AccountState, RootState> = {
  namespaced: true,
  modules: {
    role: roleStore,
    user: userStore,
    agent: agentStore,
  },
};
