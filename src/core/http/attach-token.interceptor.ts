import axios from 'axios';

import { store } from '@/store';

import { TOKEN_NEEDED } from './headers';

export function attachToken() {
  axios.interceptors.request.use(config => {
    if (config.headers[TOKEN_NEEDED] === false) return config;

    config.headers.Authorization = `Bearer ${
      store!.state.workspace.user.accessToken
    }`;

    return config;
  });
}
