import { get } from 'lodash';
import moment from 'moment';
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

import { menus } from '@/constants';
import { UserEntity } from '@/entities';
import { currentUserService } from '@/services';

const Menu = namespace('workspace/menu');
const User = namespace('workspace/user');

@Component<HomeComponent>({
  beforeCreate() {
    this.refreshLocked = false;
    this.refreshTime = setInterval(async () => {
      if (!this.accessToken) return;
      // 如果 Token 过期时间 - 当前时间 > 15分钟，则不刷新 Token
      if (moment(this.expiresIn!).diff(moment(), 'minutes') > 15) return;
      if (this.refreshLocked) return;
      this.refreshLocked = true;
      const data = await currentUserService.refreshToken(this.refreshToken!);
      this.setTokenInfo(data);
      this.refreshLocked = false;
    }, 5000);
  },
  created() {
    this.getUserInfo();
  },
  destroyed() {
    clearInterval(this.refreshTime);
  },
})
export class HomeComponent extends Vue {
  refreshTime: number;

  refreshLocked: boolean;

  @Menu.State
  openKeys: string[];

  @Menu.State
  selectedKeys: string[];

  @User.State
  accessToken: string | null;

  @User.State
  refreshToken: string | null;

  @User.State
  expiresIn: Date | null;

  @User.State
  profile: UserEntity | null;

  @User.State
  permissions: any[];

  get menus() {
    if (!this.profile) return [];
    const validMenus = [...menus].filter(
      menu => !menu.permission || this.permissions.includes(menu.permission),
    );

    validMenus.forEach(menu => {
      menu.children = [...menu.children].filter(
        subMenu =>
          !subMenu.permission || this.permissions.includes(subMenu.permission),
      );
    });

    return validMenus;
  }

  get name() {
    return get(this.profile, 'showName');
  }

  @Menu.Mutation
  setOpenedKeys: (payload: string[]) => void;

  @User.Mutation
  setTokenInfo: (payload: any) => void;

  @User.Action
  getUserInfo: () => void;

  @User.Mutation
  clear: () => void;

  onSelectMenu({ key }: any) {
    this.$router.push({ name: key });
  }

  onOpenChange(openedKeys: string[]) {
    this.setOpenedKeys(openedKeys);
  }

  async onLogout() {
    await currentUserService.logout();
    this.clear();
    this.$router.push({ name: 'login' });
  }
}
export { HomeComponent as default };
