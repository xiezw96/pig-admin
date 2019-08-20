import { PluginObject, VueConstructor } from 'vue';

import { ComponentPlugin } from './components';
import { HttpPlugin } from './http';

export class CorePlugin implements PluginObject<any> {
  install(Vue: VueConstructor) {
    Vue.use(new ComponentPlugin());
    Vue.use(new HttpPlugin());
  }
}
