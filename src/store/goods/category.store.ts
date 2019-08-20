import { Module } from 'vuex';

import { GoodsCaterogy } from '@/interfaces';
import { categoryService, CreateCategoryDto, FindCategoriesDto } from '@/services';
import { RootState } from '@/store';

import { CategoryState } from './category.state';

let prevGetCategoryDto: FindCategoriesDto | undefined = {};

export const categoryStore: Module<CategoryState, RootState> = {
  namespaced: true,
  state: {
    list: [],
  },
  mutations: {
    set(state, categories: GoodsCaterogy[]) {
      state.list = categories;
    },
  },
  actions: {
    /**
     * 按查询条件获取商品分类
     */
    async search(context, payload?: FindCategoriesDto) {
      context.commit('loading', true);
      const data = await categoryService.find(payload);
      prevGetCategoryDto = payload;
      context.commit('set', data);
      context.commit('loading', false);
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
    async create(context, category: CreateCategoryDto) {
      await categoryService.create(category);

      context.dispatch('search', prevGetCategoryDto);
    },

    /**
     * 编辑指定商品分类的信息
     */
    async update(context, { id, ...category }) {
      await categoryService.update(id, category);

      context.dispatch('search', prevGetCategoryDto);
    },

    /**
     * 删除指定商品分类
     */
    async remove(context, id: number) {
      await categoryService.remove(id);

      context.dispatch('search', prevGetCategoryDto);
    },
  },
};
