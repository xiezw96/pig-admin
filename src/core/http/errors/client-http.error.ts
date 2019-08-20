import { BizError } from '../../errors';

/**
 * 客户端网络错误类型
 */
export class ClientHttpError extends BizError {
  name = '本地网络异常';

  constructor(message: string = '网络异常，请求发送失败') {
    super(message);
  }
}
