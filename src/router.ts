import { message } from 'ant-design-vue';
import { get, isNil } from 'lodash';
import Vue from 'vue';
import Router, { Route } from 'vue-router';

import { menus } from '@/constants';
import { currentUserService } from '@/services';
import { store } from '@/store';

Vue.use(Router);

const menuRoutes = menus
  .map(({ permission, ...menu }) => ({
    ...menu,
    meta: { permission },
    children: (menu as any).children.map(
      ({ permission: subPermission, ...subMenu }: any) => ({
        ...subMenu,
        meta: { permission: subPermission },
        name: `${menu.name}/${subMenu.name}`,
      }),
    ),
  }))
  .map(menu => menu.children)
  .flat()
  .filter(menu => menu.component)
  .map<Route>(menu => ({
    ...menu,
    path: menu.name,
    async beforeEnter(to: Route, _from: Route, next) {
      const permission = get(to, 'meta.permission');
      if (isNil(permission)) return next();
      if (store!.state.workspace.user.permissions === null) {
        const data = await currentUserService.getUserInfo();
        store!.commit('workspace/user/setUserInfo', data);
      }

      if (store!.state.workspace.user.permissions!.includes(permission)) {
        return next();
      }
      return next(false);
    },
  }));

export const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'home',
      beforeEnter(_to, _from, next) {
        if (store!.getters['workspace/user/logined']) return next();
        return next({ name: 'login' });
      },
      component: () => import('@/views/home.vue'),
      redirect: `/home/${menuRoutes[0].path}`,
      children: [
        ...menuRoutes,
        {
          path: '*',
          component: () => import('@/views/not-found.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login.vue'),
      beforeEnter(_to, _from, next) {
        if (store!.getters['workspace/user/logined']) {
          message.info('已登陆，重新登录请先退出');
          return next({ name: 'home' });
        }

        return next();
      },
    },
    {
      path: '*',
      component: () => import('@/views/not-found.vue'),
    },
  ],
});

router.afterEach(to => {
  const matched = menuRoutes.find(route => route.name === to.name);
  if (!matched) {
    store!.commit('workspace/menu/collapse');
    return;
  }

  const parentMenu = matched.path.split('/')[0];

  store!.commit('workspace/menu/select', [parentMenu, matched.name]);
});
