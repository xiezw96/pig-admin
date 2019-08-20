import { DeviceStatus } from '@/enums';

/**
 * 设备
 */
export class DeviceEntity {
  id: number;

  /**
   * 设备码
   */
  code: string;

  /**
   * 所有人/使用人
   */
  owner: number;

  /**
   * 当前地址
   */
  address: string;

  /**
   * 激活地址
   */
  activeAddress: string;

  /**
   * 状态
   */
  status: DeviceStatus;
}
