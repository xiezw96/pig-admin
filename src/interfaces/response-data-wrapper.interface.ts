export interface ResponseDataWrapper<T> {
  code: number;
  data: T;
  msg: string;
}
