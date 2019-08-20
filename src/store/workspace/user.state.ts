import { UserEntity } from '@/entities';

export interface UserState {
  accessToken: string | null;
  refreshToken: string | null;
  expiresIn: Date | null;
  profile: UserEntity | null;
  role: any;
  permissions: any[] | null;
}
