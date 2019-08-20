import { notification } from 'ant-design-vue';
import { Component, Vue } from 'vue-property-decorator';

import { BizError } from '@/core';
import { UnauthorizedError } from '../http';

@Component<GlobalErrorHandlerComponent>({
  beforeCreate() {
    window.addEventListener('unhandledrejection', ev => {
      this.handleHttpError(ev.reason);
    });
  },
  created() {
    this.$router.onError(this.handleHttpError);
  },
  errorCaptured(err) {
    this.handleHttpError(err);
  },
  render(h) {
    return h(
      'div',
      {
        staticStyle: {
          height: '100%',
          width: '100%',
        },
      },
      this.$slots.default,
    );
  },
})
export class GlobalErrorHandlerComponent extends Vue {
  handleHttpError(err: Error) {
    if (err instanceof UnauthorizedError) {
      this.$store.commit('workspace/user/clear');
      this.$router.push({ name: 'login' });
    }

    if (err instanceof BizError) {
      notification.error({
        message: err.name,
        description: err.message,
      });
      return;
    }
  }
}
