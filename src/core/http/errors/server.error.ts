import { BizError } from '../../errors';

/**
 * 服务端错误类型
 */
export class ServerError extends BizError {
  name = '服务端错误';

  constructor(message: string = '服务端发生未知错误') {
    super(message);
  }
}
