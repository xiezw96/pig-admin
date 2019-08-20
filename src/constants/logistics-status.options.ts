import { LogisticsStatus } from '@/enums';

export const logisticsStatusOptions = [
  {
    value: LogisticsStatus.未发货,
    label: LogisticsStatus[LogisticsStatus.未发货],
  },
  {
    value: LogisticsStatus.已发货,
    label: LogisticsStatus[LogisticsStatus.已发货],
  },
];
