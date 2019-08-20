import { ActivateType } from '@/enums';

export const ActivateTypeOptions = [
  {
    value: ActivateType.自购柜子,
    label: ActivateType[ActivateType.自购柜子],
  },
  {
    value: ActivateType.购买指定商品组合,
    label: ActivateType[ActivateType.购买指定商品组合],
  },
  {
    value: ActivateType.购买指定金额商品,
    label: ActivateType[ActivateType.购买指定金额商品],
  },
];
