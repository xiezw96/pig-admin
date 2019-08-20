import { Module } from 'vuex';

import { RootState } from '@/store';

import { AgentState } from './agent.state';

export const agentStore: Module<AgentState, RootState> = {
  namespaced: true,
  state: {
    agents: [],
  },
};
