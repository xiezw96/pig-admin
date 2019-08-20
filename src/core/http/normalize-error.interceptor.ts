import axios, { AxiosError } from 'axios';

import { ClientError } from '../errors';
import {
  ClientHttpError,
  InvalidParamError,
  ServerError,
  UnauthorizedError,
} from './errors';

export function normalizeError() {
  axios.interceptors.request.use(
    config => config,
    (error: AxiosError) => {
      // 请求已发送，但是没有收到响应的异常
      // 一般是网络错误
      if (error.request) {
        throw new ClientHttpError();
      }

      // 在构造请求的阶段收到的异常，请求还未发送
      throw new ClientError();
    },
  );

  axios.interceptors.response.use(
    res => {
      if (res.data.code === 0 && res.data.data === false) {
        throw new InvalidParamError(res.data.msg);
      }

      return res;
    },
    (error: AxiosError) => {
      const { status, data } = error.response!;

      if (status === 401) throw new UnauthorizedError(data.data);

      if (status >= 500) {
        throw new ServerError(data.msg);
      }

      throw new InvalidParamError(data.msg, data);
    },
  );
}
