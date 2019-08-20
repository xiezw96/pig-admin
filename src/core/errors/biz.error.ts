/**
 * 在业务代码中需要主动抛出一个异常时使用该错误类型
 *
 * 与 `TypeError`, `SyntaxError`, `ReferenceError` 属于同一层次的错误类型
 *
 * 为了区分 JS 内置的错误类型，以便进行统一的异常处理，特别设置此类错误类型
 *
 * 具体错误应根据实际的错误种类进行扩展
 */
export abstract class BizError extends Error {
  constructor(message?: string) {
    super(message);
  }
}
