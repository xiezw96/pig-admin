// tslint:disable: no-bitwise
export enum Crud {
  Create = 1 << 3,
  Read = 1 << 2,
  Update = 1 << 1,
  Delete = 1 << 0,
  All = Create | Read | Update | Delete,
  None = 0,
}
