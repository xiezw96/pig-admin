import { PluginObject, VueConstructor } from 'vue';

import { attachToken } from './attach-token.interceptor';
import { normalizeError } from './normalize-error.interceptor';

export class HttpPlugin implements PluginObject<any> {
  install(Vue: VueConstructor) {
    normalizeError();
    attachToken();
  }
}
