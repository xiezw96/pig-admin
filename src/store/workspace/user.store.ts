import { defaultTo } from 'lodash';
import moment from 'moment';
import { Module } from 'vuex';

import {
  currentUserService,
  GetUserInfoResponseData,
  LoginDto,
  LoginResponseData,
} from '@/services';
import { RootState } from '@/store';
import { UserState } from './user.state';

function getExpiresIn() {
  const expiresIn = sessionStorage.getItem('expiresIn');
  if (expiresIn) {
    return moment(expiresIn).toDate();
  } else {
    return null;
  }
}

export const userStore: Module<UserState, RootState> = {
  namespaced: true,
  state: {
    profile: null,
    role: null,
    permissions: null,
    accessToken: defaultTo(sessionStorage.getItem('accessToken'), null),
    refreshToken: defaultTo(sessionStorage.getItem('refreshToken'), null),
    expiresIn: getExpiresIn(),
  },
  getters: {
    logined(state) {
      return !!state.accessToken;
    },
  },
  mutations: {
    setTokenInfo(state, tokenInfo: LoginResponseData) {
      const expiresIn = moment(new Date())
        .add(tokenInfo.expires_in, 'seconds')
        .toDate();
      sessionStorage.setItem('accessToken', tokenInfo.access_token);
      sessionStorage.setItem('refreshToken', tokenInfo.refresh_token);
      sessionStorage.setItem('expiresIn', expiresIn.toISOString());
      state.accessToken = tokenInfo.access_token;
      state.refreshToken = tokenInfo.refresh_token;
      state.expiresIn = expiresIn;
    },
    setUserInfo(state, userInfo: GetUserInfoResponseData) {
      state.profile = userInfo.sysUser;
      state.role = userInfo.roles;
      state.permissions = userInfo.permissions;
    },
    clear(state) {
      state.profile = null;
      state.role = null;
      state.permissions = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.expiresIn = null;
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('refreshToken');
      sessionStorage.removeItem('expiresIn');
    },
  },
  actions: {
    async login(context, payload: LoginDto) {
      const data = await currentUserService.login(payload);
      context.commit('setTokenInfo', data);
    },
    async logout(context) {
      context.commit('clear');
    },
    async getUserInfo(context) {
      const data = await currentUserService.getUserInfo();
      context.commit('setUserInfo', data);
    },
  },
};
