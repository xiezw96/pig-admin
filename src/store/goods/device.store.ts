import axios from 'axios';
import { Module } from 'vuex';

import { DeviceEntity } from '@/entities';
import { RootState } from '@/store';

import { DeviceState } from './device.state';

export const deviceStore: Module<DeviceState, RootState> = {
  namespaced: true,
  state: {
    loading: false,
    devices: [],
  },
  mutations: {
    set(state, devices: DeviceEntity[]) {
      state.devices = devices;
    },
    loading(sate, loding) {
      sate.loading = loding;
    },
  },
  actions: {
    /**
     * 获取所有设备
     */
    async fetchAll(context, payload: any) {
      context.commit('loading', true);
      const { data } = await axios.get('api/devices', {
        params: payload,
      });
      context.commit('set', data);
      context.commit('loading', false);
    },

    /**
     * 编辑指定设备的信息
     */
    async update(context, { id, ...device }: any) {
      await axios.patch(`api/devices/${id}`, device);

      context.dispatch('fetchAll');
    },
  },
};
