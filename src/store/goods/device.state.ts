import { DeviceEntity } from '@/entities';

export interface DeviceState {
  loading: boolean;
  devices: DeviceEntity[];
}
