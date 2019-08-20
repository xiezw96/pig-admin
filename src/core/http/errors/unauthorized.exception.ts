import { BizError } from '../../errors';

/**
 * 身份认证失败的错误类型
 *
 * 当用户身份信息认证失败时返回该错误类型
 *
 * 注意：当用户身份合法，但是用户权限不足时应返回 403 Forbidden
 */
export class UnauthorizedError extends BizError {
  name = '身份认证失败';

  constructor(message: string = '无效的身份信息') {
    super(message);
  }
}
