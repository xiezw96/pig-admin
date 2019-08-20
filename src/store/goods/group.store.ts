import axios from 'axios';
import { Module } from 'vuex';

import { GoodsGroupEntity } from '@/entities';
import { RootState } from '@/store';

import { GroupState } from './group.state';

export const groupStore: Module<GroupState, RootState> = {
  namespaced: true,
  state: {
    loading: false,
    groups: [],
  },
  mutations: {
    set(state, groups: GoodsGroupEntity[]) {
      state.groups = groups;
    },
    loading(sate, loding) {
      sate.loading = loding;
    },
  },
  actions: {
    /**
     * 获取所有商品分组
     */
    async fetchAll(context, payload: any) {
      context.commit('loading', true);
      const { data } = await axios.get('api/goods-groups', {
        params: payload,
      });
      context.commit('set', data);
      context.commit('loading', false);
    },

    /**
     * 添加商品分组
     */
    async add(context, category: any) {
      await axios.post('api/goods-groups', category);

      context.dispatch('fetchAll');
    },

    /**
     * 编辑指定商品分组的信息
     */
    async update(context, { id, ...group }: any) {
      await axios.patch(`api/goods-groups/${id}`, group);

      context.dispatch('fetchAll');
    },

    /**
     * 删除指定商品分组
     */
    async delete(context, id: any) {
      await axios.delete(`api/goods-groups/${id}`);

      context.dispatch('fetchAll');
    },
  },
};
