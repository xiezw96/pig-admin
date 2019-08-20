import { PluginObject, VueConstructor } from 'vue';

import { GlobalErrorHandlerComponent } from './error-handler.component';

export class ComponentPlugin implements PluginObject<any> {
  install(Vue: VueConstructor) {
    Vue.component('global-error-handler', GlobalErrorHandlerComponent);
  }
}
