import { MenuState } from './menu.state';
import { UserState } from './user.state';

export interface WorkspaceState {
  user: UserState;
  menu: MenuState;
}
