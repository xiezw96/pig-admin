import { PluginObject, VueConstructor } from 'vue';
import VueClipboards from 'vue-clipboards';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

import { ComponentPlugin } from '@/components';
import { CorePlugin } from '@/core';
import { FilterPlugin } from '@/filters';

import { AntDesignPlugin } from './ant-design.plugin';

export class AppPlugin implements PluginObject<any> {
  install(Vue: VueConstructor) {
    Vue.use(VueRouter);
    Vue.use(Vuex);
    Vue.use(VueClipboards);
    Vue.use(new AntDesignPlugin());
    Vue.use(new CorePlugin());
    Vue.use(new ComponentPlugin());
    Vue.use(new FilterPlugin());
  }
}
