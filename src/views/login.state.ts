import { WrappedFormUtils } from 'ant-design-vue/types/form/form';

export class LoginState {
  loading = false;

  constructor(public form: WrappedFormUtils) {}
}
