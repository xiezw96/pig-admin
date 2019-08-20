import { Module } from 'vuex';

import { CreateLevelDto, GetLevelsDto, levelService } from '@/services';
import { RootState } from '@/store';

import { LevelState } from './level.state';

let prevGetLevelsDto: GetLevelsDto | undefined = {};

export const levelStore: Module<LevelState, RootState> = {
  namespaced: true,

  state: {
    loading: false,
    list: [],
    levels: [],
  },

  mutations: {
    set(state, list: any[]) {
      state.list = list;
    },
    loading(state, loading: boolean) {
      state.loading = loading;
    },
  },

  actions: {
    /**
     * 按查询条件获取商品分类
     */
    async search(context, payload?: GetLevelsDto) {
      context.commit('loading', true);
      try {
        const data = await levelService.get(payload);
        prevGetLevelsDto = payload;
        context.commit('set', data);
      } finally {
        context.commit('loading', false);
      }
    },

    /**
     * 获取所有商品分类
     */
    async getAll(context) {
      context.dispatch('search');
    },

    /**
     * 添加商品分类
     */
    async create(context, category: CreateLevelDto) {
      await levelService.create(category);

      context.dispatch('search', prevGetLevelsDto);
    },

    /**
     * 编辑指定商品分类的信息
     */
    async update(context, { id, ...category }) {
      await levelService.update(id, category);

      context.dispatch('search', prevGetLevelsDto);
    },

    /**
     * 删除指定商品分类
     */
    async remove(context, id: number) {
      await levelService.remove(id);

      context.dispatch('search', prevGetLevelsDto);
    },
  },
};
