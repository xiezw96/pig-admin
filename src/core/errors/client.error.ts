import { BizError } from './biz.error';

/**
 * 通用的客户端错误类型，一般在只需要简单展示错误信息时使用
 */
export class ClientError extends BizError {
  name = '客户端错误';

  constructor(message: string = '客户端发生未知错误') {
    super(message);
  }
}
