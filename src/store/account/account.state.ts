import { AgentState } from './agent.state';
import { RoleState } from './role.state';
import { UserState } from './user.state';

export interface AccountState {
  role: RoleState;
  user: UserState;
  agent: AgentState;
}
