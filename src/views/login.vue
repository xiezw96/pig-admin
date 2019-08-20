<template>
  <div class="login">
    <a-card class="login-card">
      <h2 style="text-align: center;">登录</h2>
      <a-form :form="form" @submit.prevent="onSubmit()">
        <a-form-item>
          <a-input
            v-decorator="formGroup.username"
            size="large"
            placeholder="帐号"
          >
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-decorator="formGroup.password"
            size="large"
            type="password"
            placeholder="密码"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-button
          size="large"
          type="primary"
          html-type="submit"
          :loading="loading"
          block
        >
          登录
        </a-button>
      </a-form>
    </a-card>
  </div>
</template>

<script lang="ts">
import { WrappedFormUtils } from 'ant-design-vue/types/form/form';
import Vue from 'vue';

import { FormGroup } from '@/interfaces';
import { createNamespacedHelpers } from 'vuex';

import { LoginState } from './login.state';

const { mapActions } = createNamespacedHelpers('workspace/user');

export default Vue.extend({
  data() {
    return new LoginState(this.$form.createForm(this));
  },
  computed: {
    formGroup(): FormGroup {
      return {
        username: [
          'username',
          {
            rules: [{ required: true, message: '请输入用户名' }],
            validateTrigger: 'blur',
          },
        ],
        password: [
          'password',
          {
            rules: [
              { required: true, message: '请输入密码' },
              { min: 6, message: '密码长度最少为6位' },
            ],
            validateTrigger: 'blur',
          },
        ],
      };
    },
  },
  methods: {
    ...mapActions(['login', 'getUserInfo']),
    onSubmit(this: any) {
      (this.form as WrappedFormUtils).validateFields(async (errors, values) => {
        if (errors) return;
        this.loading = true;
        try {
          await this.login(values);
          await this.getUserInfo();
          this.loading = false;
          this.$router.push({ name: 'home' });
        } finally {
          this.loading = false;
        }
      });
    },
  },
});
</script>

<style lang="less" scoped>
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url('~@/assets/background-login-page.jpeg');
  background-size: cover;
}

.login-card {
  position: absolute;
  top: 40%;
  right: 10%;
  width: 350px;
  border-radius: 8px !important;
  transform: translate(0, -50%);
}
</style>


