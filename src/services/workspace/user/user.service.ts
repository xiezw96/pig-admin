import axios from 'axios';

import { ResponseDataWrapper } from '@/interfaces';

import { GetUserInfoResponseData } from './get-user-info.response-data';
import { LoginDto } from './login.dto';
import { LoginResponseData } from './login.response-data';

export class CurrentUserService {
  async login(dto: LoginDto) {
    const { data } = await axios.post<LoginResponseData>(
      'api/auth/oauth/token',
      undefined,
      {
        headers: {
          Authorization: 'Basic cGlnOnBpZw==',
          'X-Token-Needed': false,
        },
        params: { ...dto, grant_type: 'password', scope: 'server' },
      },
    );

    return data;
  }

  async getUserInfo() {
    const { data } = await axios.get<
      ResponseDataWrapper<GetUserInfoResponseData>
    >('api/admin/user/info');
    return data.data;
  }

  async refreshToken(refreshToken: string) {
    const { data } = await axios.post('api/auth/oauth/token', undefined, {
      params: {
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
        scope: 'server',
      },
      headers: {
        Authorization: 'Basic cGlnOnBpZw==',
        'X-Token-Needed': false,
      },
    });

    return data;
  }

  async logout() {
    await axios.delete('api/auth/token/logout');
  }
}

export const currentUserService = new CurrentUserService();
