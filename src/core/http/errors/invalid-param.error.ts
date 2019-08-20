import { BizError } from '../../errors';

/**
 * 无效参数的异常
 *
 * 当用户使用非接口约定的参数名，参数类型，参数值等请求参数访问接口时返回该错误
 */
export class InvalidParamError extends BizError {
  name = '无效的请求参数';

  constructor(
    message: string = '请求参数不符合要求',
    public detail?: InvalidParamErrorDetail,
  ) {
    super(message);
  }
}

export interface InvalidParamErrorDetail {
  /**
   * 参数名
   */
  [property: string]: {
    /**
     * 参数值
     */
    value: unknown;

    /**
     * 错误信息
     */
    error: { [constraint: string]: string };
  };
}
